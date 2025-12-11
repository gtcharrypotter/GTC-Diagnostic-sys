/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import ActionBtn from './buttons/ActionBtn';
import { Dialog, Transition } from '@headlessui/react';
import { toast } from 'react-toastify';
import ReactSelectInputField from './inputs/ReactSelectInputField';
import { dateYYYYMMDD, doctorName, doctorSpecialty, timeHHII } from '../libs/helpers';
import useNoBugUseEffect from '../hooks/useNoBugUseEffect';
import TextInputField from './inputs/TextInputField';
import ReactQuillField from './inputs/ReactQuillField';
import Axios from '../libs/axios';
import { useAuth } from '../hooks/useAuth';

const ReferToDoctorModal = (props, ref) => {
    const { onSuccess, healthUnits = [], patient } = props;
	const { user } = useAuth();
	const {
		register,
		getValues,
		setValue,
		control,
		reset,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();

    const [loading, setLoading] = useState(false);
	const [mount, setMount] = useState(0);
	const [modalData, setModalData] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
    const [doctorList, setDoctorList] = useState([]);
    const [isSelectorLoading, setIsSelectorLoading] = useState(false);
	const [roomList, setRoomList] = useState([]);
	
	useEffect(() => {
		let t = setTimeout(() => {
			setMount(1);
		}, 400);
		return () => {
			clearTimeout(t);
		};
	}, []);
	useNoBugUseEffect({
		functions: () => {
			if (user?.health_unit_id) {
				setValue("rhu_id", user?.health_unit_id);
			}
		},
		params: [user?.health_unit_id],
	});

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (showData = null) => {
		setModalOpen(true);
		if (showData) {
			setModalData(showData);
		}
		setValue("order_date", dateYYYYMMDD());
		setValue("order_time", timeHHII());
	};
	const hide = () => {
		setModalOpen(false);
	};
    useNoBugUseEffect({
		functions: () => {
			if (getValues("rhu_id")) {
				getDoctors();
			}
		},
		params: [watch("rhu_id")],
	});
    const getDoctors = () => {
		Axios.get(
			`v1/clinic/doctors-by-location?health_unit_id=${getValues(
				"rhu_id"
			)}`
		).then((res) => {
			setDoctorList(res.data.data);
		});
	};
	const nohide = () => {};
    const submitRefer = (data) => {
		let formData = new FormData();
		if (modalData.fn) {
			modalData.fn();
			formData.append("rhu_id", data?.rhu_id);
			formData.append("doctor_id", data?.doctor_id);
			hide();
		}
	};
  return (
   <Transition appear show={modalOpen} as={Fragment}>
			<Dialog as="div" className="" onClose={hide}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur z-20" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto !z-[1000]">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full lg:max-w-3xl transform overflow-visible rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className="py-3 px-4 flex flex-col border-b "
								>
									<span className="text-xl font-bold  text-blue-900">
										PATIENT REFER TO DOCTOR
									</span>
									<span className="text-sm font-light text-blue-900 ">
										Complete form to Refer Patient to Doctor
									</span>
								</Dialog.Title>
								<div className="px-6 pt-5 pb-7 grid grid-cols-1 gap-5 relative">
									{console.log(
										"modalData?.appointment",
										modalData?.data
									)}
									<div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
							<TextInputField
										label="Date"
										type="date"
										error={errors?.order_date?.message}
										placeholder="Enter order date"
										{...register("order_date", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
							<TextInputField
										label="Time"
										type="time"
										error={errors?.order_time?.message}
										placeholder="Enter order date"
										{...register("order_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
						</div>
                                <Controller
								name="doctor_id"
								control={control}
								rules={{
									required: {
										value: true,
										message: "This field is required",
									},
								}}
								render={({
									field: {
										onChange,
										onBlur,
										value,
										name,
										ref,
									},
									fieldState: {
										invalid,
										isTouched,
										isDirty,
										error,
									},
								}) => (
									<ReactSelectInputField
										isClearable={true}
										label="Select Doctor"
										isLoading={isSelectorLoading}
										onChangeGetData={(data) => {}}
										inputClassName=" "
										ref={ref}
										value={value}
										onChange={onChange}
										onData
										onBlur={onBlur} // notify when input is touched
										error={error?.message}
										placeholder={`Select Doctor`}
										options={doctorList
											?.filter((doctor) => doctorSpecialty(doctor) === 'Medical Doctor')
											.map((doctor) => ({
												label: `${doctorName(doctor)}`,
												value: doctor?.id,
												descriptionClassName: " !opacity-100",
												description: (
													<div className="flex text-xs flex-col gap-1">
														<span>{doctorSpecialty(doctor)}</span>
														<span className="flex items-center gap-1">
															Status:
															<span className="text-green-900 drop-shadow-[0px_0px_1px_#ffffff] text-xs font-bold">
																ONLINE
															</span>
														</span>
													</div>
												),
											}))}
											
									/>
								)}
								/>
									<Controller
										name="refer_notes"
										control={control}
										rules={{
											required: {
												value: true,
												message:
													"This field is required",
											},
										}}
										render={({
											field: {
												onChange,
												onBlur,
												value,
												name,
												ref,
											},
											fieldState: {
												invalid,
												isTouched,
												isDirty,
												error,
											},
										}) => (
											<ReactQuillField
												name={name}
												error={error}
												label="REFER NOTES"
												value={value}
												onChange={onChange}
											/>
										)}
                                        {...register("rhu_xray_remarks", {
											required: "The Remarks is required.",
										})}
										errors={errors?.rhu_xray_remarks?.message}
									/>
								</div>

								<div className="px-4 py-4 flex items-center justify-end bg-slate- border-t">
									<ActionBtn
										type="success"
										className="ml-4 !px-10 !rounded-3xl"
										size="xl"
										onClick={handleSubmit(submitRefer)}
									>
										SEND TO DOCTOR
									</ActionBtn>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
  )
}

export default forwardRef(ReferToDoctorModal)

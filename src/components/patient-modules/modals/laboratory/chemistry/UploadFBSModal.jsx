/* eslint-disable react/prop-types */
import React, { Fragment, forwardRef, useImperativeHandle, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import useNoBugUseEffect from '../../../../../hooks/useNoBugUseEffect';
import { Dialog, Transition } from '@headlessui/react';
import TextInputField from '../../../../inputs/TextInputField';
import ActionBtn from '../../../../buttons/ActionBtn';
import TextAreaField from '../../../../inputs/TextAreaField';
import Axios from '../../../../../libs/axios';
import { toast } from 'react-toastify';
import ReactSelectInputField from '../../../../inputs/ReactSelectInputField';
import { laboratoryStatus } from '../../../../../libs/appointmentOptions';
import { doctorName, doctorSpecialty, formatDateMMDDYYYYHHIIA } from '../../../../../libs/helpers';
import { useAuth } from '../../../../../hooks/useAuth';

const UploadFBSModal = (props, ref) => {
    const { patient, appointment, onSuccess } = props;
	const {user} = useAuth();
	const {
        register,
		getValues,
		watch,
		control,
		setValue,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm();
    const [showData, setShowData] = useState(null);
	const [saving, setSaving] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [HUList, setHUList] = useState([]);
	const [isSelectorLoading, setIsSelectorLoading] = useState(false);
	const [doctorList, setDoctorList] = useState([]);
    useNoBugUseEffect({
		functions: () => {},
	});
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));
	useNoBugUseEffect({
			functions: () => {
				getHUList("SA");
			},
			params: [appointment?.id],
		});
		useNoBugUseEffect({
			functions: () => {
				if (user?.health_unit_id) {
					setValue("rhu_id", user?.health_unit_id);
				}
			},
			params: [user?.health_unit_id],
		});
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
		const getHUList = (type) => {
			Axios.get(`v1/health-unit/list?type=${type}`)
				.then((res) => {
					setHUList(res.data.data);
				})
				.finally(() => {
					setIsSelectorLoading(false);
				});
		};
	const show = (data) => {
		console.log("patient", patient?.id);
		console.log("/v1/laboratory/tests/list");
		setShowData(data);
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};
	const submit = (data) => {
		setSaving(true);

		let formdata = new FormData();

		formdata.append("_method", "PATCH");
		formdata.append("fbs", data?.fbs);
		formdata.append("fbs_mmol", data?.fbs_mmol);
		formdata.append("patient_fbs_remarks", data?.patient_fbs_remarks);
		formdata.append("pathologist_id", data?.pathologist_id);
		Axios.post(`v1/laboratory/fbs-lab-result/${showData?.id}`, formdata)
			.then((res) => {
				reset();
				toast.success("Laboratory result submitted successfully!");
				onSuccess();
				hide();
			})
			.finally(() => {
				setTimeout(() => {
					setSaving(false);
				}, 1000);
			});
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
					<div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur z-[300]" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto !z-[350]">
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
							<Dialog.Panel className="w-full lg:max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									<span className="text-xl text-center font-bold  text-blue-900">
										Chemistry Examination Result
									</span>
                                    <span className="text-sm text-center font-bold  text-blue-600 mt-2">
										Fasting Blood Sugar Test Result
									</span>
								</Dialog.Title>
								<div className="flex flex-col gap-2 p-6">
									<div className="font-semibold">{formatDateMMDDYYYYHHIIA(new Date())}</div>
								<div className="font-semibold justify-center items-center text-center">With in The Facility</div>
								</div>
								<div className="p-6 flex flex-col gap-y-4 relative">
									<div className="w-1/2">
										<Controller
											name="patient_fbs_remarks"
											control={control}
											rules={{
												required: {
													value: true,
													message: "This field is required",
												},
											}}
											render={({
												field: { onChange, onBlur, value, name, ref },
												fieldState: { error },
											}) => (
												<ReactSelectInputField
													className="mb-3"
													isClearable={true}
													labelClassName="font-bold"
													label={
														<>
															<span className="text-black text-lg ml-1">
																Status
															</span>
															<span className="text-danger ml-1">
																*
															</span>
														</>
													}
													inputClassName=""
													ref={ref}
													value={
													value
												}
												onChange={(
													val
												) => {
													console.log(
														"onChangeonChange",
														val
													);
													if (
														onChange
													) {
														onChange(
															val
														);
													}
												}}
													onBlur={onBlur}
													error={error?.message}
													placeholder="Status"
													options={laboratoryStatus?.map((data) => ({
																	label: data?.label,
																	value: data?.value,
																}))}
												/>
											)}
										/>
									</div>
									<TextInputField
										label="mg/dL"
										placeholder="70-110mg/dL"
										{...register("fbs", {
											required:
												"The fbs is required.",
										})}
										errors={errors?.fbs?.message}
									/>
									<TextInputField
										label="mmol/L"
										placeholder="70-110mg/dL"
										{...register("fbs_mmol", {
											required:
												"The fbs is required.",
										})}
										errors={errors?.fbs?.message}
									/>
									<Controller
											name="pathologist_id"
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
													label="Select Pathologist"
													isLoading={isSelectorLoading}
													onChangeGetData={(data) => {}}
													inputClassName=" "
													ref={ref}
													value={value}
													onChange={onChange}
													onData
													onBlur={onBlur} // notify when input is touched
													error={error?.message}
													placeholder={`Select Pathologist`}
													options={doctorList
														?.filter((doctor) => doctorSpecialty(doctor) === 'Pathologist')
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
								</div>

								<div className="px-4 py-4 border-t flex items-center justify-end bg-slate-">
									<ActionBtn
										// size="lg"
										type="success"
										loading={saving}
										className="px-5"
										onClick={handleSubmit(submit)}
									>
										SUBMIT
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

export default forwardRef(UploadFBSModal)

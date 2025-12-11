/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import {
	Fragment,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import ActionBtn from "../buttons/ActionBtn";
import FlatIcon from "../FlatIcon";
import useClinic from "../../hooks/useClinic";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Img from "../Img";
import ReactSelectInputField from "../inputs/ReactSelectInputField";
import Axios from "../../libs/axios";
import TextInputField from "../inputs/TextInputField";
import { doctorName } from "../../libs/helpers";
import useReferralQueue from "../../hooks/useReferralQueue";
import useNoBugUseEffect from "../../hooks/useNoBugUseEffect";

const AcceptPatientModal = (props, ref) => {
	const { isOnline } = props;
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

	const { data } = useClinic();
	const [mount, setMount] = useState(0);
	const [doctor, setDoctor] = useState(null);
	const [doctors, setDoctors] = useState([]);
	const [referral, setReferral] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const { mutatePending } = useReferralQueue();

	const { mutateProfile } = useClinic();
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
			if (!isOnline) {
				hide();
			}
		},
		params: [isOnline],
	});

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		console.log("Accept Patient Referral", data);
		setReferral(() => data);
		getDoctors();
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};

	const getDoctors = () => {
		Axios.get(`/v1/clinic/his-doctors`).then((res) => {
			setDoctors(res.data.data);
		});
	};

	const submit = (data) => {
		let formData = new FormData();
		console.log("datadatadatadatadatadatadatadata", data);
		formData.append("_method", "PATCH");
		formData.append("doctor_id", doctor?.id);
		// formData.append("room_number", doctor?.room?.name);
		let url = `v1/hospital/accept-patient/${referral?.id}`;
		if (referral.reading) {
			url = `v1/accept-doctor-case/${referral?.id}`;
		}
		Axios.post(url, formData)
			.then((res) => {
				reset();
				toast.success("Patient accepted successfully!");
				mutateProfile();
				mutatePending();
				hide();
			})
			.catch((error) => {
				if (error?.response?.data?.message == "Case already accepted") {
					reset();
					toast.success("Patient accepted successfully!");
					mutateProfile();
					mutatePending();
					hide();
				}
			});
		Axios.patch(`v1/hospital/update-referral-time-in/${referral?.id}`, {
				start_time_in: new Date(),
			})
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

				<div className="fixed inset-0 overflow-y-auto !z-[100]">
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
							<Dialog.Panel className="w-full lg:max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all z-50">
								{/* <Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									
								</Dialog.Title> */}

								{!referral?.reading ? (
									<div className="p-4 flex flex-col gap-y-4 relative">
										<div className="flex flex-col">
											<span className="text-xl font-bold  text-blue-900">
												Accept Patient Referral
											</span>
											<span className="text-sm font-light text-blue-900 ">
												Assign patient to room number
												and physician.
											</span>
										</div>
										{/* <div>{dateOnlyToday()}</div> */}
										<div className="flex flex-col gap-6 px-6 pb-6">
											{/* {JSON.stringify(errors)} */}
											<Controller
												name="doctor_id"
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
													<ReactSelectInputField
														isClearable={false}
														label={
															<>
																Assign To Doctor
																<span className="text-danger ml-1">
																	*
																</span>
															</>
														}
														inputClassName=" "
														ref={ref}
														value={value}
														onChange={onChange}
														onChangeGetData={(
															data
														) => {
															setDoctor(
																data?.doctor
															);
														}} // send value to hook form
														onBlur={onBlur} // notify when input is touched
														error={error?.message}
														placeholder="Select Doctor"
														options={doctors?.map(
															(doctor) => ({
																doctor: doctor,
																value: doctor?.id,
																label: `${
																	doctor
																		?.title
																		?.length
																		? doctor?.title
																		: "Dr."
																} ${
																	doctor?.firstname
																}
																${
																	doctor?.lastname
																}`,
															})
														)}
													/>
												)}
											/>
											{doctor ? (
												<div className="flex flex-col gap-5">
													<div
														className={`flex flex-col py-4 bg-yellow-100`}
													>
														<h4 className="text-lg text-center  font-bold text-black -mb-1">
															{doctorName(doctor)}
														</h4>

														<span className=" text-center font-light text-sm text-slate-700">
															{doctor?.specialty
																?.name?.length
																? doctor
																		?.specialty
																		?.name
																: "General Practitioner"}
														</span>
													</div>

													<div className="grid grid-cols-1 lg:grid-cols-1 gap-5">
														{/*<div
															className={`flex flex-col py-4 bg-slate-100`}
														>
															<h4 className="text-lg text-center  font-bold text-black -mb-1">
																{
																	doctor?.room
																		?.name
																}
															</h4>

															<span className=" text-center font-light text-sm text-slate-700">
																Room Number
															</span>
														</div>*/}
														<div
															className={`flex flex-col py-4 bg-slate-100`}
														>
															<h4 className="text-lg text-center  font-bold text-black -mb-1">
																{
																	doctor
																		?.healthUnit
																		?.name
																}
															</h4>

															<span className=" text-center font-light text-sm text-slate-700">
																Health Unit
															</span>
														</div>
													</div>
												</div>
											) : (
												""
											)}
										</div>
									</div>
								) : (
									<>
										<div className="flex flex-col p-4">
											<span className="text-xl font-bold  text-blue-900">
												Accept Reading
											</span>
											<span className="text-sm font-light text-blue-900 pt-5 ">
												Click DONE to continue...
											</span>
										</div>
									</>
								)}

								<div className="px-4 pb-3 flex items-center justify-end bg-slate-">
									{/* <ActionBtn
										type="foreground-dark"
										className="ml-auto uppercase"
										onClick={hide}
									>
										Read more...
									</ActionBtn> */}
									<ActionBtn
										type="success"
										className="ml-4"
										onClick={handleSubmit(submit)}
									>
										DONE
									</ActionBtn>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default forwardRef(AcceptPatientModal);

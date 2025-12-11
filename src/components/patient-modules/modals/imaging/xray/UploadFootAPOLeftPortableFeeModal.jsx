import React, { Fragment, forwardRef, useImperativeHandle, useState } from 'react'
import upload from "../../../../../assets/images/camera.png";
import { Controller, useForm } from 'react-hook-form';
import useLabQueue from '../../../../../hooks/useLabQueue';
import useNoBugUseEffect from '../../../../../hooks/useNoBugUseEffect';
import Axios from '../../../../../libs/axios';
import { toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import ImagePicker from '../../../../inputs/ImagePicker';
import { dataURItoBlob, doctorName, doctorSpecialty, radiologyName, radiologySpecialty } from '../../../../../libs/helpers';
import ReactQuillField from '../../../../inputs/ReactQuillField';
import ActionBtn from '../../../../buttons/ActionBtn';
import { useAuth } from '../../../../../hooks/useAuth';
import ReactSelectInputField from '../../../../inputs/ReactSelectInputField';

const UploadFootAPOLeftPortableFeeModal = (props, ref) => {
    const { patient, appointment, onSuccess } = props;
	// const {user} = useAuth();
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

	const { pending } = useLabQueue();
	const [image, setImage] = useState(null);
	const [showData, setShowData] = useState(null);
	const [saving, setSaving] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	// const [HUList, setHUList] = useState([]);
	// const [isSelectorLoading, setIsSelectorLoading] = useState(false);
	// const [doctorList, setDoctorList] = useState([]);
	useNoBugUseEffect({
		functions: () => {},
	});
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));
	// useNoBugUseEffect({
	// 	functions: () => {
	// 		getHUList("SA");
	// 	},
	// 	params: [appointment?.id],
	// });
	// useNoBugUseEffect({
	// 	functions: () => {
	// 		if (user?.health_unit_id) {
	// 			setValue("rhu_id", user?.health_unit_id);
	// 		}
	// 	},
	// 	params: [user?.health_unit_id],
	// });
	// useNoBugUseEffect({
	// 	functions: () => {
	// 		if (getValues("rhu_id")) {
	// 			getDoctors();
	// 		}
	// 	},
	// 	params: [watch("rhu_id")],
	// });
	// const getDoctors = () => {
	// 	Axios.get(
	// 		`v1/clinic/doctors-by-location?health_unit_id=${getValues(
	// 			"rhu_id"
	// 		)}`
	// 	).then((res) => {
	// 		setDoctorList(res.data.data);
	// 	});
	// };
	// const getHUList = (type) => {
	// 	Axios.get(`v1/health-unit/list?type=${type}`)
	// 		.then((res) => {
	// 			setHUList(res.data.data);
	// 		})
	// 		.finally(() => {
	// 			setIsSelectorLoading(false);
	// 		});
	// };
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
		let formData = new FormData();
		let config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		formData.append("_method", "PATCH");
		// formData.append("radiology_id", data?.radiology_id);
		console.log("imageimageimage", image);
		if (image) {
			formData.append("foot_apo_left_pf", dataURItoBlob(image));
		}
		// return "";
		Axios.post(
			`v1/imaging/foot-apo-left-pf-img-result/${showData?.id}`,
			formData,
			config
		)
			.then((res) => {
				reset();
				toast.success("Imaging result uploaded successfully!");
				onSuccess();
				hide();
			})
			.finally(() => {
				setTimeout(() => {
					setSaving(false);
				}, 1000);
			});
	};
	const hasError = (name) => {
		return errors[name]?.message;
	};
	const noHide = () => {};
	const filteredPending = pending?.data.filter(order => order.type?.name === "Ultrasound");
  return (
    <Transition appear show={modalOpen} as={Fragment}>
			<Dialog as="div" className="" onClose={noHide}>
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
										Upload Imaging Result
									</span>
								</Dialog.Title>
								<div className="p-6 flex flex-col gap-y-4 relative">
									<div className="border-b">
										<span className="text-xl text-center font-bold  text-blue-500">
                                         FOOT APO LEFT + PORTABLE FEE
                                            </span>
									</div>
									<Controller
										name="image"
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
											<div className="flex flex-col">
												<span
													className={`text-sm mb-1 font-medium text-dark ${
														hasError("attachment")
															? "text-red-500"
															: ""
													}`}
												>
													Upload Image
												</span>
												<ImagePicker
													onChange={(data) => {
														onChange(data);
														setImage(data);
													}}
                                        // {...register("rhu_xray_result", {
										// 	required: "The Remarks is required.",
										// })}
										// errors={errors?.rhu_xray_result?.message}
												>
													{({ imagePreview }) => {
														return (
															<div className="border border-slate-300 aspect-video relative ">
																<img
																	src={
																		imagePreview
																			? imagePreview
																			: upload
																	}
																	className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300"
																/>
																{imagePreview ? (
																	""
																) : (
																	<span className="absolute w-full text-center bottom-3 uppercase font-bold text-slate-500">
																		Upload
																		Image
																	</span>
																)}
															</div>
														);
													}}
                                                    
												</ImagePicker>
												{hasError("image") ? (
													<p className="mt-0 text-xs text-red-600 dark:text-red-500 mb-0">
														{hasError("image")}
													</p>
												) : (
													""
												)}
											</div>
										)}
									/>
									<div className="p-6 border-t flex flex-col gap-y-4 relative">
								{/* <Controller
								name="radiology_id"
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
										label="Select Radiologist"
										isLoading={isSelectorLoading}
										onChangeGetData={(data) => {}}
										inputClassName=" "
										ref={ref}
										value={value}
										onChange={onChange}
										onData
										onBlur={onBlur} // notify when input is touched
										error={error?.message}
										placeholder={`Select Radiologist`}
										options={doctorList
											?.filter((doctor) => doctorSpecialty(doctor) === 'Radiologist')
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
							/> */}
								</div>
								</div>

								<div className="px-4 py-4 border-t flex items-center justify-end bg-slate-">
									<ActionBtn
										// size="lg"
										type="danger"
										// loading={saving}
										className="px-5 mr-auto"
										onClick={hide}
									>
										CLOSE
									</ActionBtn>
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

export default forwardRef(UploadFootAPOLeftPortableFeeModal)
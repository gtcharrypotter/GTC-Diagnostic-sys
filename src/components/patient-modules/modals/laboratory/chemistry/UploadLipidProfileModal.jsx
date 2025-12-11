/* eslint-disable react/prop-types */

import { Fragment, forwardRef, useImperativeHandle, useState } from "react";
import useNoBugUseEffect from "../../../../../hooks/useNoBugUseEffect";
import { Controller, useForm } from "react-hook-form";
import Axios from "../../../../../libs/axios";
import { toast } from "react-toastify";
import ActionBtn from "../../../../buttons/ActionBtn";
import { Dialog, Transition } from "@headlessui/react";
import TextInputField from "../../../../inputs/TextInputField";
import { laboratoryStatus } from "../../../../../libs/appointmentOptions";
import ReactSelectInputField from "../../../../inputs/ReactSelectInputField";
import { formatDateMMDDYYYYHHIIA } from "../../../../../libs/helpers";

const UploadLipidProfileModal = (props, ref) => {
    const { patient, onSuccess } = props;
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
    useNoBugUseEffect({
		functions: () => {},
	});
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

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
		formdata.append("cholesterol", data?.cholesterol);
		formdata.append("triglyceride", data?.triglyceride);
		formdata.append("hdl", data?.hdl);
		formdata.append("ldl", data?.ldl);
		formdata.append("hbac", data?.hbac);
		formdata.append("patient_lipid_remarks", data?.patient_lipid_remarks);
		Axios.post(`v1/laboratory/lipid-lab-result/${showData?.id}`, formdata)
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
										Lipid Profile
									</span>
								</Dialog.Title>
								<div className="flex flex-col gap-2 p-6">
									<div className="font-semibold">{formatDateMMDDYYYYHHIIA(new Date())}</div>
								<div className="font-semibold justify-center items-center text-center">With in The Facility</div>
								</div>
								<div className="p-6 flex flex-col gap-y-4 relative">
									<div className="w-1/2">
										<Controller
											name="patient_lipid_remarks"
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
										label="Cholesterol"
										placeholder="0-200mg/dL"
										{...register("cholesterol", {
											required:
												"The Cholesterol is required.",
										})}
										errors={errors?.cholesterol?.message}
									/>
									<TextInputField
										label="Triglyceride"
										placeholder="0-150mg/dL"
										{...register("triglyceride", {
											required:
												"The Triglyceride is required.",
										})}
										errors={errors?.triglyceride?.message}
									/>
									<TextInputField
										label="HDL"
										placeholder=">60mg/dL"
										{...register("hdl", {
											required: "The HDL is required.",
										})}
										errors={errors?.hdl?.message}
									/>
									
									<TextInputField
										label="LDL"
										placeholder="0-150mg/dL"
										{...register("ldl", {
											required: "The LDL is required.",
										})}
										errors={errors?.ldl?.message}
									/>
									<TextInputField
										label="HbA1C"
										placeholder="4.0-5.7 %"
										{...register("hbac", {
											required: "The HbA1C is required.",
										})}
										errors={errors?.hbac?.message}
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

export default forwardRef(UploadLipidProfileModal)

import React, { Fragment, forwardRef, useImperativeHandle, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import useNoBugUseEffect from '../../../../../hooks/useNoBugUseEffect';
import Axios from '../../../../../libs/axios';
import { toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import TextInputField from '../../../../inputs/TextInputField';
import TextAreaField from '../../../../inputs/TextAreaField';
import ActionBtn from '../../../../buttons/ActionBtn';
import ReactSelectInputField from '../../../../inputs/ReactSelectInputField';
import { laboratoryStatus } from '../../../../../libs/appointmentOptions';
import { formatDateMMDDYYYYHHIIA } from '../../../../../libs/helpers';

const UploadCompleteBloodCountModal = (props, ref) => {
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
		formdata.append("hemoglobin_g", data?.hemoglobin_g);
		formdata.append("hemoglobin_l", data?.hemoglobin_l);
		formdata.append("mch_x", data?.mch_x);
		formdata.append("mch_l", data?.mch_l);
		formdata.append("mchc_x", data?.mchc_x);
		formdata.append("mchc_l", data?.mchc_l);
		formdata.append("mcv_x", data?.mcv_x);
		formdata.append("mcv_l", data?.mcv_l);
		formdata.append("wbc_x", data?.wbc_x);
		formdata.append("wbc_l", data?.wbc_l);
		formdata.append("hematocrit", data?.hematocrit);
		formdata.append("leukocyte", data?.leukocyte);
		formdata.append("neutrophils_bands", data?.neutrophils_bands);
		formdata.append("neutrophils_segmenters", data?.neutrophils_segmenters);
		formdata.append("lymphocytes", data?.lymphocytes);
		formdata.append("monocytes", data?.monocytes);
		formdata.append("eosinophils", data?.eosinophils);
		formdata.append("basophils", data?.basophils);
		formdata.append("platelet", data?.platelet);
		formdata.append("patient_cbc_remarks", data?.patient_cbc_remarks);
		Axios.post(`v1/laboratory/cbc-lab-result/${showData?.id}`, formdata)
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
										Hematology Examination Result
									</span>
                                    <span className="text-sm text-center font-bold  text-blue-600 mt-2">
										Complete Blood Count - (CBC) Test Result
									</span>
								</Dialog.Title>
								<div className="flex flex-col gap-2 p-6">
									<div className="font-semibold">{formatDateMMDDYYYYHHIIA(new Date())}</div>
								<div className="font-semibold justify-center items-center text-center">With in The Facility</div>
								</div>
								<div className="p-6">
									<div className="w-1/2">
										<Controller
											name="patient_cbc_remarks"
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
								</div>
								<div className="flex relative">
								<div className="p-6 flex flex-col gap-y-4 relative">
									<TextInputField
										label="Hemoglobin"
										placeholder="g/L"
										{...register("hemoglobin_g", {
											required:
												"The hemoglobin is required.",
										})}
										errors={errors?.hemoglobin_g?.message}
									/>
									<TextInputField
										placeholder="L/L"
										{...register("hemoglobin_l", {
											required:
												"The hematocrit is required.",
										})}
										errors={errors?.hemoglobin_l?.message}
									/>
									
									<TextInputField
										label="MCH"
										placeholder="x10¹²/L"
										{...register("mch_x", {
											required: "The rcbc is required.",
										})}
										errors={errors?.mch_x?.message}
									/>
									<TextInputField
										placeholder="L/L"
										{...register("mch_l", {
											required:
												"The hematocrit is required.",
										})}
										errors={errors?.mch_l?.message}
									/>
									<TextInputField
										label="MCHC"
										placeholder="x10⁹/L"
										{...register("mchc_x", {
											required: "The wbc is required.",
										})}
										errors={errors?.mchc_x?.message}
									/>
									<TextInputField
										placeholder="L/L"
										{...register("mchc_l", {
											required:
												"The hematocrit is required.",
										})}
										errors={errors?.mchc_l?.message}
									/>
									<TextInputField
										label="MCV"
										placeholder="x10⁹/L"
										{...register("mcv_x", {
											required: "The wbc is required.",
										})}
										errors={errors?.mcv_x?.message}
									/>
									<TextInputField
										placeholder="L/L"
										{...register("mcv_l", {
											required:
												"The hematocrit is required.",
										})}
										errors={errors?.mcv_l?.message}
									/>
									<TextInputField
										label="WBC"
										placeholder="x10⁹/L"
										{...register("wbc_x", {
											required: "The wbc is required.",
										})}
										errors={errors?.wbc_x?.message}
									/>
									<TextInputField
										placeholder="L/L"
										{...register("wbc_l", {
											required:
												"The hematocrit is required.",
										})}
										errors={errors?.wbc_l?.message}
									/>
									
								</div>
								<div className="p-6 flex flex-col gap-y-4 relative">
								<TextInputField
										label="Hematocrit"
										placeholder="L/L"
										{...register("hematocrit", {
											required:
												"The hematocrit is required.",
										})}
										errors={errors?.hematocrit?.message}
									/>
									<TextInputField
										label="Leukocyte differential Myelocyte"
										placeholder="x10⁹/L"
										{...register("leukocyte", {
											required: "The wbc is required.",
										})}
										errors={errors?.leukocyte?.message}
									/>
									<TextInputField
										label="Neutrophils (bands)"
										placeholder="g/L"
										{...register("neutrophils_bands", {
											required:
												"The hemoglobin is required.",
										})}
										errors={errors?.neutrophils_bands?.message}
									/>
									<TextInputField
										label="Neutrophils (segmenters)"
										placeholder="L/L"
										{...register("neutrophils_segmenters", {
											required:
												"The hematocrit is required.",
										})}
										errors={errors?.neutrophils_segmenters?.message}
									/>
									<TextInputField
										label="Lymphocytes"
										placeholder="x10¹²/L"
										{...register("lymphocytes", {
											required: "The rcbc is required.",
										})}
										errors={errors?.lymphocytes?.message}
									/>
									<TextInputField
										label="Monocytes"
										placeholder="x10⁹/L"
										{...register("monocytes", {
											required: "The wbc is required.",
										})}
										errors={errors?.monocytes?.message}
									/>
									<TextInputField
										label="Eosinophils"
										placeholder="x10⁹/L"
										{...register("eosinophils", {
											required: "The wbc is required.",
										})}
										errors={errors?.eosinophils?.message}
									/>
									<TextInputField
										label="Basophils"
										placeholder="x10⁹/L"
										{...register("basophils", {
											required: "The wbc is required.",
										})}
										errors={errors?.basophils?.message}
									/>
									<TextInputField
										label="Platelet"
										placeholder="x10⁹/L"
										{...register("platelet", {
											required: "The wbc is required.",
										})}
										errors={errors?.platelet?.message}
									/>
								</div>
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

export default forwardRef(UploadCompleteBloodCountModal)

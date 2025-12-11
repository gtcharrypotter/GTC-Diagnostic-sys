
import React, { Fragment, forwardRef, useImperativeHandle, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import useNoBugUseEffect from '../../../../../../hooks/useNoBugUseEffect';
import Axios from '../../../../../../libs/axios';
import { toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import TextInputField from '../../../../../inputs/TextInputField';
import ActionBtn from '../../../../../buttons/ActionBtn';
import ReactSelectInputField from '../../../../../inputs/ReactSelectInputField';
import { laboratoryStatus } from '../../../../../../libs/appointmentOptions';
import { formatDateMMDDYYYY, formatDateMMDDYYYYHHIIA } from '../../../../../../libs/helpers';

const UploadMacroscopicExamModal = (props, ref) => {
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
		formdata.append("gravity_urine", data?.gravity_urine);
		formdata.append("appearance_urine", data?.appearance_urine);
		formdata.append("color_urine", data?.color_urine);
		formdata.append("glucose_urine", data?.glucose_urine);
		formdata.append("protein_urine", data?.protein_urine);
		formdata.append("ketones_urine", data?.ketones_urine);
		formdata.append("ph_urine", data?.ph_urine);
		formdata.append("pus_cells_urine", data?.pus_cells_urine);
		formdata.append("albumin_urine", data?.albumin_urine);
		formdata.append("rbc_urine", data?.rbc_urine);
		formdata.append("wbc_urine", data?.wbc_urine);
		formdata.append("bacteria_urine", data?.bacteria_urine);
		formdata.append("crystals_urine", data?.crystals_urine);
		formdata.append("bladder_cells_urine", data?.bladder_cells_urine);
		formdata.append("squamous_cells_urine", data?.squamous_cells_urine);
		formdata.append("tubular_cells_urine", data?.tubular_cells_urine);
		formdata.append("broad_casts_urine", data?.broad_casts_urine);
		formdata.append("epithelial_cells_urine", data?.epithelial_cells_urine);
		formdata.append("granular_cast_urine", data?.granular_cast_urine);
		formdata.append("hyaline_cast_urine", data?.hyaline_cast_urine);
		formdata.append("rbc_cast_urine", data?.rbc_cast_urine);
		formdata.append("wbc_cast_urine", data?.wbc_cast_urine);
		formdata.append("waxy_cast_urine", data?.waxy_cast_urine);
		formdata.append("patient_urinalysis_remarks", data?.patient_urinalysis_remarks);
		Axios.post(`v1/laboratory/urinalysis-lab-result/${showData?.id}`, formdata)
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
							<Dialog.Panel className="w-full lg:max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									<span className="text-xl text-center font-bold  text-blue-900">
										Urinalysis Examination Result
									</span>
                                    <span className="text-sm text-center font-bold  text-blue-600 mt-2">
										Urinalysis
									</span>
								</Dialog.Title>
								<div className="flex flex-col gap-2 p-6">
									<div className="font-semibold">{formatDateMMDDYYYYHHIIA(new Date())}</div>
								<div className="font-semibold justify-center items-center text-center">With in The Facility</div>
								</div>
								<div className="w-1/2 pl-6">
										<Controller
											name="patient_urinalysis_remarks"
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
								<div className="flex relative">
								<div className="p-6 flex flex-col gap-y-4 relative"> 
									
									<TextInputField
										label="Specific Gravity"
										placeholder="0"
										{...register("gravity_urine", {
											required:
												"The Specimen Type is required.",
										})}
										errors={errors?.gravity_urine?.message}
									/>
									<TextInputField
										label="Appearance"
										placeholder="0"
										{...register("appearance_urine", {
											required:
												"The Specimen Source is required.",
										})}
										errors={errors?.appearance_urine?.message}
									/>
									<TextInputField
										label="Color"
										placeholder="0"
										{...register("color_urine", {
											required:
												"The Specimen Type is required.",
										})}
										errors={errors?.color_urine?.message}
									/>
									<TextInputField
										label="Glucose"
										placeholder="0"
										{...register("glucose_urine", {
											required:
												"The Specimen Source is required.",
										})}
										errors={errors?.glucose_urine?.message}
									/>
									<TextInputField
										label="Proteins"
										placeholder="0"
										{...register("protein_urine", {
											required:
												"The Specimen Type is required.",
										})}
										errors={errors?.protein_urine?.message}
									/>
									<TextInputField
										label="Ketones"
										placeholder="0"
										{...register("ketones_urine", {
											required:
												"The Specimen Source is required.",
										})}
										errors={errors?.ketones_urine?.message}
									/>
									<TextInputField
										label="pH"
										placeholder="0"
										{...register("ph_urine", {
											required:
												"The Specimen Type is required.",
										})}
										errors={errors?.ph_urine?.message}
									/>
									<TextInputField
										label="Pus Cells"
										placeholder="0"
										{...register("pus_cells_urine", {
											required:
												"The Specimen Source is required.",
										})}
										errors={errors?.pus_cells_urine?.message}
									/>
								</div>
								<div className="p-6 flex flex-col gap-y-4 relative"> 
									<TextInputField
										label="Albumin"
										placeholder="0"
										{...register("albumin_urine", {
											required:
												"The Specimen Type is required.",
										})}
										errors={errors?.albumin_urine?.message}
									/>
									<TextInputField
										label="Red Blood Cells"
										placeholder="0"
										{...register("rbc_urine", {
											required:
												"The Specimen Source is required.",
										})}
										errors={errors?.rbc_urine?.message}
									/>
									<TextInputField
										label="White Blood Cells"
										placeholder="0"
										{...register("wbc_urine", {
											required:
												"The Specimen Type is required.",
										})}
										errors={errors?.wbc_urine?.message}
									/>
									<TextInputField
										label="Bacteria"
										placeholder="0"
										{...register("bacteria_urine", {
											required:
												"The Specimen Source is required.",
										})}
										errors={errors?.bacteria_urine?.message}
									/>
									<TextInputField
										label="Crystals"
										placeholder="0"
										{...register("crystals_urine", {
											required:
												"The Specimen Type is required.",
										})}
										errors={errors?.crystals_urine?.message}
									/>
									<TextInputField
										label="Bladder Cells"
										placeholder="0"
										{...register("bladder_cells_urine", {
											required:
												"The Specimen Source is required.",
										})}
										errors={errors?.bladder_cells_urine?.message}
									/>
									<TextInputField
										label="Squamous Cells"
										placeholder="0"
										{...register("squamous_cells_urine", {
											required:
												"The Specimen Type is required.",
										})}
										errors={errors?.squamous_cells_urine?.message}
									/>
									<TextInputField
										label="Tubular Cells"
										placeholder="0"
										{...register("tubular_cells_urine", {
											required:
												"The Specimen Type is required.",
										})}
										errors={errors?.tubular_cells_urine?.message}
									/>
								</div>
								<div className="p-6 flex flex-col gap-y-4 relative"> 
									<TextInputField
										label="Broad Casts"
										placeholder="0"
										{...register("broad_casts_urine", {
											required:
												"The Specimen Type is required.",
										})}
										errors={errors?.broad_casts_urine?.message}
									/>
									<TextInputField
										label="Epithelial Cell Casts"
										placeholder="0"
										{...register("epithelial_cells_urine", {
											required:
												"The Specimen Source is required.",
										})}
										errors={errors?.epithelial_cells_urine?.message}
									/>
									<TextInputField
										label="Granular Casts"
										placeholder="0"
										{...register("granular_cast_urine", {
											required:
												"The Specimen Type is required.",
										})}
										errors={errors?.granular_cast_urine?.message}
									/>
									<TextInputField
										label="Hyaline Casts"
										placeholder="0"
										{...register("hyaline_cast_urine", {
											required:
												"The Specimen Source is required.",
										})}
										errors={errors?.hyaline_cast_urine?.message}
									/>
									<TextInputField
										label="Red Blood Cells Casts"
										placeholder="0"
										{...register("rbc_cast_urine", {
											required:
												"The Specimen Type is required.",
										})}
										errors={errors?.rbc_cast_urine?.message}
									/>
									<TextInputField
										label="Waxy Casts"
										placeholder="0"
										{...register("wbc_cast_urine", {
											required:
												"The Specimen Source is required.",
										})}
										errors={errors?.wbc_cast_urine?.message}
									/>
									<TextInputField
										label="White Cell Casts"
										placeholder="0"
										{...register("waxy_cast_urine", {
											required:
												"The Specimen Type is required.",
										})}
										errors={errors?.waxy_cast_urine?.message}
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

export default forwardRef(UploadMacroscopicExamModal)

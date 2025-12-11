import React, { Fragment, forwardRef, useImperativeHandle, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import useNoBugUseEffect from '../../../../../hooks/useNoBugUseEffect';
import Axios from '../../../../../libs/axios';
import { toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import TextInputField from '../../../../inputs/TextInputField';
import ActionBtn from '../../../../buttons/ActionBtn';
import { laboratoryStatus } from '../../../../../libs/appointmentOptions';
import ReactSelectInputField from '../../../../inputs/ReactSelectInputField';
import { formatDateMMDDYYYYHHIIA } from '../../../../../libs/helpers';

const UploadGramStainModal = (props, ref) => {
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
		// formdata.append("specimen_gram", data?.specimen_gram);
		formdata.append("result_gram", data?.result_gram);
		formdata.append("epithelial_cells", data?.epithelial_cells);
		// formdata.append("polymorphonuclears", data?.polymorphonuclears);
        // formdata.append("remarks_gram", data?.remarks_gram);
		formdata.append("patient_afb_remarks", data?.patient_afb_remarks);
		Axios.post(`v1/laboratory/gram-lab-result/${showData?.id}`, formdata)
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
										Microbiology Examination Result
									</span>
                                    <span className="text-sm text-center font-bold  text-blue-600 mt-2">
										Sputum Result
									</span>
								</Dialog.Title>
								<div className="flex flex-col gap-2 p-6">
									<div className="font-semibold">{formatDateMMDDYYYYHHIIA(new Date())}</div>
								<div className="font-semibold justify-center items-center text-center">With in The Facility</div>
								</div>
								<div className="p-6 flex flex-col gap-y-4 relative">
									<div className="w-1/2">
										<Controller
											name="patient_afb_remarks"
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
									{/* <TextInputField
										label="Specimen"
										placeholder=""
										{...register("specimen_gram", {
											required:
												"The Specimen Type is required.",
										})}
										errors={errors?.specimen_gram?.message}
									/> */}
									<TextInputField
										label="Result"
										placeholder=""
										{...register("result_gram", {
											required:
												"The Specimen Source is required.",
										})}
										errors={errors?.result_gram?.message}
									/>
									<TextInputField
										label="Number of Plusses"
										placeholder=""
										{...register("epithelial_cells")}
									/>
                                    {/* <TextInputField
										label="Polymorphonuclears"
										placeholder=""
										{...register("polymorphonuclears", {
											required: "The Remarks is required.",
										})}
										errors={errors?.polymorphonuclears?.message}
									/>
                                    <TextInputField
										label="Remarks"
										placeholder=""
										{...register("remarks_gram", {
											required: "The Remarks is required.",
										})}
										errors={errors?.remarks_gram?.message}
									/> */}
									
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

export default forwardRef(UploadGramStainModal)

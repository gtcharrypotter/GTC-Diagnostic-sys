import React, { Fragment, forwardRef, useImperativeHandle, useState } from 'react'
import { useForm } from 'react-hook-form';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import { toast } from 'react-toastify';
import Axios from '../../../../libs/axios';
import { Dialog, Transition } from '@headlessui/react';
import TextInputField from '../../../inputs/TextInputField';
import ActionBtn from '../../../buttons/ActionBtn';

const UploadCrossMatchingModal = (props, ref) => {
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
		formdata.append("blood_type_crossmatch", data?.blood_type_crossmatch);
		formdata.append("method_crossmatch", data?.method_crossmatch);
		formdata.append("serial_number_crossmatch", data?.serial_number_crossmatch);
		formdata.append("donor_blood_type", data?.donor_blood_type);
		formdata.append("source_crossmatch", data?.source_crossmatch);
		formdata.append("component_crossmatch", data?.component_crossmatch);
		formdata.append("content_crossmatch", data?.content_crossmatch);
		formdata.append("extract_date_crossmatch", data?.extract_date_crossmatch);
		formdata.append("expiry_date_crossmatch", data?.expiry_date_crossmatch);
		formdata.append("cossmatching_result_crossmatch", data?.cossmatching_result_crossmatch);
		Axios.post(`v1/clinic/tb-lab-result/${showData?.id}`, formdata)
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
										Cross Matching Examination Result
									</span>
                                    {/* <span className="text-sm text-center font-bold  text-blue-600 mt-2">
										Fasting Blood Sugar Test Result
									</span> */}
								</Dialog.Title>
								<div className="p-6 flex flex-col gap-y-4 relative">
									<TextInputField
										label="Patient Blood Type"
										placeholder="70-110mg/dL"
										{...register("blood_type_crossmatch", {
											required:
												"The Alkaline Phos. is required.",
										})}
										errors={errors?.blood_type_crossmatch?.message}
									/>
                                    <TextInputField
										label="Method"
										placeholder="70-110mg/dL"
										{...register("method_crossmatch", {
											required:
												"The Alkaline Phos. is required.",
										})}
										errors={errors?.method_crossmatch?.message}
									/>
                                    <div className="px-4 py-4 border-t flex items-center justify-end bg-slate-"></div>
									<TextInputField
										label="Serial Number"
										placeholder="70-110mg/dL"
										{...register("serial_number_crossmatch", {
											required:
												"The Alkaline Phos. is required.",
										})}
										errors={errors?.serial_number_crossmatch?.message}
									/>
                                    <TextInputField
										label="Donor's Blood Type"
										placeholder="70-110mg/dL"
										{...register("donor_blood_type", {
											required:
												"The Alkaline Phos. is required.",
										})}
										errors={errors?.donor_blood_type?.message}
									/>
                                    <TextInputField
										label="Source"
										placeholder="70-110mg/dL"
										{...register("source_crossmatch", {
											required:
												"The Alkaline Phos. is required.",
										})}
										errors={errors?.source_crossmatch?.message}
									/>
                                    <TextInputField
										label="Component"
										placeholder="70-110mg/dL"
										{...register("component_crossmatch", {
											required:
												"The Alkaline Phos. is required.",
										})}
										errors={errors?.component_crossmatch?.message}
									/>
                                    <TextInputField
										label="Content"
										placeholder="70-110mg/dL"
										{...register("content_crossmatch", {
											required:
												"The Alkaline Phos. is required.",
										})}
										errors={errors?.content_crossmatch?.message}
									/>
                                    <TextInputField
										label="Extract Date"
                                        type="date"
										placeholder="70-110mg/dL"
										{...register("extract_date_crossmatch", {
											required:
												"The Alkaline Phos. is required.",
										})}
										errors={errors?.extract_date_crossmatch?.message}
									/>
                                    <TextInputField
										label="Expiry Date"
                                        type="date"
										placeholder="70-110mg/dL"
										{...register("expiry_date_crossmatch", {
											required:
												"The Alkaline Phos. is required.",
										})}
										errors={errors?.expiry_date_crossmatch?.message}
									/>
                                    <TextInputField
										label="Crossmatching Result"
										placeholder="70-110mg/dL"
										{...register("cossmatching_result_crossmatch", {
											required:
												"The Alkaline Phos. is required.",
										})}
										errors={errors?.cossmatching_result_crossmatch?.message}
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

export default forwardRef(UploadCrossMatchingModal)

/* eslint-disable react/prop-types */
import React, { Fragment, forwardRef, useImperativeHandle, useState } from 'react'
import { useForm } from 'react-hook-form';
import ActionBtn from '../../../../buttons/ActionBtn';
import TextInputField from '../../../../inputs/TextInputField';
import { Dialog, Transition } from '@headlessui/react';
import useNoBugUseEffect from '../../../../../hooks/useNoBugUseEffect';
import TextAreaField from '../../../../inputs/TextAreaField';
import Axios from '../../../../../libs/axios';
import { toast } from 'react-toastify';

const UploadCultureSensitiveInitialModal = (props, ref) => {
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
		formdata.append("csir_specimen_type", data?.csir_specimen_type);
		formdata.append("csir_specimen_source", data?.csir_specimen_source);
		formdata.append("csir_result", data?.csir_result);
		formdata.append("csir_remarks", data?.wbc);
		Axios.post(`v1/laboratory-order/csir-lab-result/${showData?.id}`, formdata)
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
										Culture and Sensitivity Initial Result
									</span>
								</Dialog.Title>
								<div className="p-6 flex flex-col gap-y-4 relative">
									<TextInputField
										label="Specimen Type"
										placeholder=""
										{...register("csir_specimen_type", {
											required:
												"The Specimen Type is required.",
										})}
										errors={errors?.csir_specimen_type?.message}
									/>
									<TextInputField
										label="Source of Specimen"
										placeholder=""
										{...register("csir_specimen_source", {
											required:
												"The Specimen Source is required.",
										})}
										errors={errors?.csir_specimen_source?.message}
									/>
									<TextAreaField
										label="Result"
										placeholder=""
                                        rows={3}
										{...register("csir_result", {
											required: "The Result is required.",
										})}
										errors={errors?.csir_result?.message}
									/>
									<TextInputField
										label="Remarks"
										placeholder=""
										{...register("csir_remarks", {
											required: "The Remarks is required.",
										})}
										errors={errors?.csir_remarks?.message}
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

export default forwardRef(UploadCultureSensitiveInitialModal)

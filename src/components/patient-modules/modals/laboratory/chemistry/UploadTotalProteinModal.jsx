import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, forwardRef, useImperativeHandle, useState } from 'react'
import { toast } from 'react-toastify';
import Axios from '../../../../../libs/axios';
import useNoBugUseEffect from '../../../../../hooks/useNoBugUseEffect';
import { useForm } from 'react-hook-form';
import TextInputField from '../../../../inputs/TextInputField';
import TextAreaField from '../../../../inputs/TextAreaField';
import ActionBtn from '../../../../buttons/ActionBtn';

const UploadTotalProteinModal = (props, ref) => {
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
		formdata.append("total_protein", data?.total_protein);
		formdata.append("albumin", data?.albumin);
		formdata.append("globulin", data?.globulin);
		formdata.append("ag_ratio", data?.ag_ratio);
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
										Chemistry Examination Result
									</span>
                                    <span className="text-sm text-center font-bold  text-blue-600 mt-2">
										TP A/G (Total Protein A/G Ratio) Test Result
									</span>
								</Dialog.Title>
								<div className="p-6 flex flex-col gap-y-4 relative">
									<TextInputField
										label="Total Protein"
										placeholder="g/dL"
										{...register("total_protein", {
											required:
												"The Total Protein is required.",
										})}
										errors={errors?.total_protein?.message}
									/>
                                    <TextInputField
										label="Albumin"
										placeholder="g/dL"
										{...register("albumin", {
											required:
												"The Albumin is required.",
										})}
										errors={errors?.albumin?.message}
									/>
                                    <TextInputField
										label="Globulin"
										placeholder="g/dL"
										{...register("globulin", {
											required:
												"The Globulin is required.",
										})}
										errors={errors?.globulin?.message}
									/>
                                    <TextInputField
										label="A/G Ratio"
										placeholder=""
										{...register("ag_ratio", {
											required:
												"The A/G Ratio is required.",
										})}
										errors={errors?.ag_ratio?.message}
									/>
									{/* <TextAreaField
										label="Remarks"
										placeholder=""
                                        rows={3}
										{...register("rcbc", {
											required: "The rcbc is required.",
										})}
										errors={errors?.rcbc?.message}
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

export default forwardRef(UploadTotalProteinModal)


import React, { Fragment, forwardRef, useImperativeHandle, useState } from 'react'
import { useForm } from 'react-hook-form';
import useNoBugUseEffect from '../../../../../../hooks/useNoBugUseEffect';
import Axios from '../../../../../../libs/axios';
import { toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import TextInputField from '../../../../../inputs/TextInputField';
import ActionBtn from '../../../../../buttons/ActionBtn';

const UploadCrystalsModal = (props, ref) => {
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
		formdata.append("amorphous_urates_urine", data?.amorphous_urates_urine);
		formdata.append("amorphous_phosphates_urine", data?.amorphous_phosphates_urine);
		formdata.append("calciun_oxalates_urine", data?.calciun_oxalates_urine);
		formdata.append("triple_phosphates_urine", data?.triple_phosphates_urine);
		formdata.append("uric_acid_urine", data?.uric_acid_urine);
		formdata.append("others_urine", data?.others_urine);
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
										Microscopy Examination Result
									</span>
                                    <span className="text-sm text-center font-bold  text-blue-600 mt-2">
										Crystals Result
									</span>
								</Dialog.Title>
								<div className="p-6 flex flex-col gap-y-4 relative">
									<TextInputField
										label="Amorphous Urates"
										placeholder=""
										{...register("amorphous_urates_urine", {
											required:
												"The Specimen Type is required.",
										})}
										errors={errors?.amorphous_urates_urine?.message}
									/>
									<TextInputField
										label="Amorphous Phosphates"
										placeholder=""
										{...register("amorphous_phosphates_urine", {
											required:
												"The Specimen Source is required.",
										})}
										errors={errors?.amorphous_phosphates_urine?.message}
									/>
									<TextInputField
										label="Calcium Oxalates"
										placeholder=""
										{...register("calciun_oxalates_urine", {
											required: "The Remarks is required.",
										})}
										errors={errors?.calciun_oxalates_urine?.message}
									/>
                                    <TextInputField
										label="Triple Phosphates"
										placeholder=""
										{...register("triple_phosphates_urine", {
											required: "The Remarks is required.",
										})}
										errors={errors?.triple_phosphates_urine?.message}
									/>
                                    <TextInputField
										label="Uric Acid"
										placeholder=""
										{...register("uric_acid_urine", {
											required: "The Remarks is required.",
										})}
										errors={errors?.uric_acid_urine?.message}
									/>
                                    <TextInputField
										label="Others"
										placeholder=""
										{...register("others_urine", {
											required: "The Remarks is required.",
										})}
										errors={errors?.others_urine?.message}
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

export default forwardRef(UploadCrystalsModal)

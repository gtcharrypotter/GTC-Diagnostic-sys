import React, { forwardRef, Fragment, useImperativeHandle, useState } from 'react'
import ActionBtn from '../../../../buttons/ActionBtn';
import TextInputField from '../../../../inputs/TextInputField';
import { Dialog, Transition } from '@headlessui/react';
import { toast } from 'react-toastify';
import Axios from '../../../../../libs/axios';
import useNoBugUseEffect from '../../../../../hooks/useNoBugUseEffect';
import { useForm } from 'react-hook-form';

const UploadProthrombinTimeModal = (props, ref) => {
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
		formdata.append("pt_protime_hematology", data?.pt_protime_hematology);
        formdata.append("control_protime_hematology", data?.control_protime_hematology);
        formdata.append("activity_protime_hematology", data?.activity_protime_hematology);
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
										Hematology Examination Result
									</span>
                                    <span className="text-sm text-center font-bold  text-blue-600 mt-2">
										PROTHROMBIN TIME
									</span>
								</Dialog.Title>
								<div className="p-6 flex flex-col gap-y-4 relative">
									<div className='mt-2'>
                                        <h2 className='mb-2'>PROTHROMBIN TIME (PROTIME)</h2>
                                            <TextInputField
										label="PT"
										placeholder="Seconds"
										{...register("pt_protime_hematology", {
											required:
												"The FBS is required.",
										})}
										errors={errors?.pt_protime_hematology?.message}
									/>
                                    <TextInputField
										label="Control"
										placeholder="Seconds"
										{...register("control_protime_hematology", {
											required:
												"The 1st Hour is required.",
										})}
										errors={errors?.control_protime_hematology?.message}
									/>
                                    <TextInputField
										label="% Activity"
										placeholder="%"
										{...register("activity_protime_hematology", {
											required:
												"The 2nd Hour is required.",
										})}
										errors={errors?.activity_protime_hematology?.message}
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

export default forwardRef(UploadProthrombinTimeModal)

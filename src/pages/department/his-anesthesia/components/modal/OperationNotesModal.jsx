/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { toast } from 'react-toastify';
import Axios from '../../../../../libs/axios';
import { useForm } from 'react-hook-form';
import ActionBtn from '../../../../../components/buttons/ActionBtn';
import useNoBugUseEffect from '../../../../../hooks/useNoBugUseEffect';

const OperationNotesModal = (props, ref) => {
    const { patient, onSuccess } = props;
	console.log('patient------------------------>', patient)
	const {
		control,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [showData, setShowData] = useState(null);
	const [saving, setSaving] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [operation, setOperation] = useState(null);
	const [loading, setLoading] = useState(false);

	useNoBugUseEffect({
		functions: () => {},
	});
	// useEffect(()=> {
	// 	axios.get('/v1/anesthesia/operation-procedure/list')
	// 	.then(res => setOperation(res.operation))
	// 	.catch(err => console.log(err));
	// })
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setShowData(data);
		console.log("procedure ID---------------->>>", showData?.id);
		// console.log("/v1/anesthesia/operation-procedure/list");
		setModalOpen(true);
		getOperationProcedure(data);
		
	};
	
	const hide = () => {
		setModalOpen(false);
	};
	

	const submit = (data) => {
		setSaving(true);
		console.log("dataaaa---------------- submit", showData?.id);
		let formData = new FormData();
		formData.append("_method", "PATCH");
		formData.append("operation_status", data?.operation_status);
		formData.append("operation_notes", data?.operation_notes);
		Axios.post(`v1/anesthesia/operation-procedure/update/${showData?.id}`, formData)
			.then((res) => {
				if (onSuccess) onSuccess();
				setTimeout(() => {
					setLoading(false);
					toast.success("Operation Procedure updated successfully!");
				}, 400);
				hide();
			})
			.catch((error) => {
				console.error("Error updating operation procedure:", error);
				toast.error("Error updating operation procedure.");
			})
			.finally(() => {
				setSaving(false);
			});
	};
	const getOperationProcedure = (operationData) => {
    Axios.get(`v1/anesthesia/operation-procedure/updated-procedure/${operationData?.id}`)
        .then((res) => {
            const responseData = res.data.data;
            if (responseData) {
                setOperation(responseData);
                setValue("operation_status", responseData?.operation_status);
				setValue("operation_notes", responseData?.operation_notes);
				
            } else {
                console.error("No data found for the operation procedure.");
            }
        })
        .catch((error) => {
            console.error("Error fetching operation procedure:", error);
        });
};
	
	
	const hasError = (name) => {
		return errors[name]?.message;
	};
	
	const noHide = () => {};
	
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
										Operating Procedure Notes
									</span>
								</Dialog.Title>
								<div className="p-6 flex flex-col gap-y-4 relative">
									<div className="flex items-center gap-16 mb-2">
													<span className="text-lg ">
														NOTES
													</span>		
										</div>
                                        <span className="font-light text-sm text-slate-700 justify-normal italic">
										{showData?.operation_notes}
										</span>
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
									{/* <ActionBtn
										// size="lg"
										type="success"
										loading={saving}
										className="px-5"
										onClick={handleSubmit(submit)}
									>
										Ok
									</ActionBtn> */}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
  )
}

export default forwardRef(OperationNotesModal)

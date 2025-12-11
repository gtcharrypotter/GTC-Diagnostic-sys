/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react'
import ActionBtn from '../../../components/buttons/ActionBtn';
import { Dialog, Transition } from '@headlessui/react';
import Axios from '../../../libs/axios';
import useClinic from '../../../hooks/useClinic';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ReferToHISModal = (props, ref) => {
    const { appointment, setAppointment } = props;
	const {
		register,
		getValues,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { data } = useClinic();
	const [mount, setMount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	useEffect(() => {
		let t = setTimeout(() => {
			setMount(1);
		}, 400);
		return () => {
			clearTimeout(t);
		};
	}, []);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setModalOpen(true);
		setAppointment(data);
	};
	const hide = () => {
		setModalOpen(false);
	};

	const submit = (data) => {
		setLoading(true);
		let formData = new FormData();
		formData.append("appointment_id", appointment?.id);
		
		formData.append("_method", "PATCH");
		Axios.post(`/v1/opd-standalone/er-refer-to-his/${appointment?.id}`, formData)
			.then((res) => {
				// addToList(data);
				setTimeout(() => {
					setLoading(false);
					// onSuccess();
                    
					toast.success("Patient successfully referred to Emergency Hospital!");
				}, 400);
				hide();
                 if (props.onCloseParentModal) {
                    props.onCloseParentModal(); // Call method to hide PatientProfileModal
                }
			})
			.finally(() => {
				setLoading(false);
			});
	};
    console.log('REFER APPOINTMENT DETAILS', appointment);
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
					<div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur z-20" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto !z-[100]">
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
							<Dialog.Panel className="w-full lg:max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<div className="p-4 flex flex-col gap-y-4 relative">
									<div className="flex flex-col">
										<span className="text-xl font-bold  text-blue-900">
											Refer to Emergency Hospital
										</span>
									</div>
									<div className="text-center p-5 text-lg text-indigo-700=">
										Confirm patient Refer to Emergency Hospital?
									</div>
								</div>

								<div className="px-4 pb-3 flex items-center justify-end bg-slate-">
									
									<ActionBtn
										type="danger"
										className="mr-auto"
										onClick={hide}
									>
										Cancel
									</ActionBtn>
									<ActionBtn
										type="success"
										loading={loading}
										className="ml-auto"
										onClick={submit}
									>
										Yes, CONFIRM!
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

export default forwardRef(ReferToHISModal)

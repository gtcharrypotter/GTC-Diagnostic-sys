import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useForm } from 'react-hook-form';

const EmergencyChoiceModal = (props, ref) => {
    const {
		onClickOPDEmergency,
		onClickOperationEmergency,
		healthUnits = [],
	} = props;
    const {
		register,
		getValues,
		setValue,
		control,
		reset,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [mount, setMount] = useState(0);
	const [modalData, setModalData] = useState(null);
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

	const show = (showData = null) => {
		setModalOpen(true);
		if (showData) {
			setModalData(showData);
		}
	};
	const hide = () => {
		setModalOpen(false);
	};
	const nohide = () => {};

	const submit = (data) => {};
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
							<Dialog.Panel className="w-full lg:max-w-sm transform overflow-visible rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className="py-3 px-4 flex flex-col border-b "
								>
									<span className="text-xl font-bold text-center text-blue-900">
										Choose Emergency Appointment
									</span>
								</Dialog.Title>
								<div className="px-6 pt-5 pb-7 grid grid-cols-1 gap-5 relative">
									
									<div
										className="h-[88px] flex items-center justify-center text-2xl rounded-3xl bg-cyan-200 hover:bg-cyan-600 hover:text-white duration-200 cursor-pointer flex-col"
										onClick={() => {
											onClickOPDEmergency();
											hide();
										}}
									>
										<span className="font-bold">OPD EMERGENCY</span>
										<span className="text-xs">
											OPD Emergency Patient Form
										</span>
									</div>
									<div
										className="h-[88px] flex items-center justify-center text-2xl rounded-3xl bg-red-200 hover:bg-red-600 hover:text-white duration-200 cursor-pointer flex-col"
										onClick={() => {
											onClickOperationEmergency();
											hide();
										}}
									>
										<span className="font-bold">OPERATION EMERGENCY</span>
										<span className="text-xs">
											Operation Emergency Patient Form
										</span>
									</div>
									
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
  )
}

export default forwardRef(EmergencyChoiceModal)

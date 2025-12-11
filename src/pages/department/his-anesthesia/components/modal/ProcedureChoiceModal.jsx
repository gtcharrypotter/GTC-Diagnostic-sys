/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useForm } from 'react-hook-form';

const ProcedureChoiceModal = (props, ref) => {
    const {
		onClickDelivery,
		onClickSurgery,
		// onClickEmergency,
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
										Choose Appointment Procedure
									</span>
								</Dialog.Title>
								<div className="px-6 pt-5 pb-7 grid grid-cols-1 gap-5 relative">
									
									{/* <div
										className="h-[88px] flex items-center justify-center text-2xl rounded-3xl bg-red-200 hover:bg-red-600 hover:text-white duration-200 cursor-pointer flex-col"
										onClick={() => {
											onClickEmergency();
											hide();
										}}
									>
										<span className="font-bold">EMERGENCY</span>
										<span className="text-xs">
											Emergency Patient Form
										</span>
									</div> */}
									<div
										className="h-[88px] flex items-center justify-center text-2xl rounded-3xl bg-indigo-200 hover:bg-indigo-600 hover:text-white duration-200 cursor-pointer flex-col"
										onClick={() => {
											onClickDelivery();
											hide();
										}}
									>
										<span className="font-bold">
											DELIVERY
										</span>
										<span className="text-xs">
											Patient Delivery Form
										</span>
									</div>
									<div
										className="h-[88px] flex items-center justify-center text-2xl rounded-3xl bg-green-200 hover:bg-green-600 hover:text-white duration-200 cursor-pointer flex-col"
										onClick={() => {
											onClickSurgery();
											hide();
										}}
									>
										<span className="font-bold">SURGERY</span>
										<span className="text-xs">
											Patient Surgery Form
										</span>
									</div>
									
									{/* <div
										className="h-[88px] flex items-center justify-center text-2xl rounded-3xl bg-red-200 hover:bg-red-600 hover:text-white duration-200 cursor-pointer flex-col"
										onClick={() => {
											onClickTelemedicine();
											hide();
										}}
									>
										<span className="font-bold">
											Teleconsult
										</span>
										<span className="text-xs">
											GTC Telemedicine appointment
										</span>
									</div> */}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
  )
}

export default forwardRef(ProcedureChoiceModal)

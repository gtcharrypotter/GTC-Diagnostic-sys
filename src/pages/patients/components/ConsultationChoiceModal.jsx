/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import React, { forwardRef, Fragment, useImperativeHandle, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth';
import { Dialog, Transition } from '@headlessui/react';

const ConsultationChoiceModal = (props, ref) => {
    const {
		onClickConsultation,
		onClickTelemedicine,
		appointment,
		patient
	} = props;
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    useImperativeHandle(ref, () => ({
            show: show,
            hide: hide,
        }));
        const { checkUserType } = useAuth();
        const show = (showData = null) => {
            setModalOpen(true);
            if (showData) {
                setModalData(showData);
            }
        };
        const hide = () => {
            setModalOpen(false);
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
										CONSULTATION TYPE
									</span>
								</Dialog.Title>
								<div className="px-6 pt-5 pb-7 grid grid-cols-1 gap-5 relative">
									{checkUserType("NURSE") ? (
									<>
                                     <div
										className="h-[88px] flex items-center justify-center text-2xl rounded-3xl bg-teal-200 hover:bg-teal-600 hover:text-white duration-200 cursor-pointer flex-col"
										onClick={() => {
											onClickConsultation();
											hide();
										}}
									>
										<span className="text-xs">Second Tranche</span>
										<span className="font-bold">
											New Consultation
										</span>
										<span className="text-xs">
											Create new consultation Appointment
										</span>
									</div>
									<div
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
									</div>
									</>
								) : (
									""
								)}
									
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
  )
}

export default forwardRef(ConsultationChoiceModal)

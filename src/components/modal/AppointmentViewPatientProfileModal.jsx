import React, { forwardRef, Fragment, useImperativeHandle, useState } from 'react'
import PatientProfile from '../../pages/patients/PatientProfile';
import FlatIcon from '../FlatIcon';
import { Dialog, Transition } from '@headlessui/react';

const AppointmentViewPatientProfileModal = (props, ref) => {
    const [modalOpen, setModalOpen] = useState(false);
	const [modalData, setModalData] = useState(null);
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
  return (
    <Transition appear show={modalOpen} as={Fragment}>
			<Dialog as="div" className="" onClose={nohide}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur z-[500]" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto !z-[600]">
					<div className="flex min-h-[90vh] items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full lg:max-w-[80vw] transform overflow-visible rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<div>
									<div className="p-4 bg-blue-600 rounded-t-xl text-lg font-bold text-white flex items-center">
										<FlatIcon
											icon="rr-user"
											className="w-5 mr-2"
										/>
										PATIENT PROFILE
										<div
											className="bg-white flex items-center rounded-xl ml-auto gap-1 p-2 text-red-600 text-base font-normal cursor-pointer"
											onClick={() => {
												hide();
											}}
										>
											<FlatIcon icon="rr-cross-small" />
											Close
										</div>
									</div>
									<div className="bg-blue-600 px-1">
										<div className="bg-white">
											<PatientProfile
												patient={modalData}
											/>
										</div>
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

export default forwardRef(AppointmentViewPatientProfileModal)

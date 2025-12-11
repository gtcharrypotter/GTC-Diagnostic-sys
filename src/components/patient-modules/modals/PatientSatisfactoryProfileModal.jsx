import { Dialog, Transition } from '@headlessui/react';
import React, { forwardRef, Fragment, useImperativeHandle, useState } from 'react'
import ActionBtn from '../../buttons/ActionBtn';
import FlatIcon from '../../FlatIcon';
import PatientInfo from '../../../pages/patients/components/PatientInfo';
import PatientSatisfactionInfo from '../../../pages/PatientSatisfactionInfo';

const PatientSatisfactoryProfileModal = (props, ref) => {
    const { appointment } = props;
    const [patient, setPatient] = useState(null);
    const [showData, setShowData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    useImperativeHandle(ref, () => ({
            show: show,
            hide: hide,
        }));
    
    const show = (data) => {
		setModalOpen(true);
        setShowData(data);
        setPatient(data?.patient);
	};
	const hide = () => {
		setModalOpen(false);
	};
    const getSatisfactionImage = (satisfaction) => {
        switch (satisfaction) {
            case 'very satisfied':
                return '/happy.png';
            case 'neutral':
                return '/neutral.png';
            case 'unsatisfied':
                return '/sad.png';
            default:
                return '';
        }
    };
console.log("satisfactio profile modal:", showData);
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
					<div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur z-[1000]" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto !z-[1000]">
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
							<Dialog.Panel className="w-full lg:max-w-4xl transform overflow-visible rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className="py-3 px-4 flex flex-col border-b "
								>
									<span className="text-xl font-bold  text-blue-900">
										Patient Satisfactory Data
									</span>
                                    <ActionBtn
										type="danger"
										size="sm"
										className="absolute top-4 right-4 "
										onClick={hide}
									>
										<FlatIcon icon="br-cross-small" /> Close
									</ActionBtn>
								</Dialog.Title>
								<div className="flex flex-col gap-y-4 relative min-h-[calc(100dvh-152px)]">
                                    <div className="flex flex-col">
                                        <div className="flex flex-col gap-4 items-center px-4 pt-4 justify-center md:justify-center p-4 h-full">
                                            <PatientSatisfactionInfo appointment={showData} />
                                            
                                        </div>
                                    <div className="items-center justify-center flex flex-col md:justify-center border-t gap-3">
                                        {showData?.satisfaction && (
                                            <img
                                                src={getSatisfactionImage(showData.satisfaction)}
                                                alt="Satisfaction"
                                                className="w-24 h-24 mt-4 mx-auto"
                                            />
                                        )}
                                    <span 
                                            className={`italic capitalize text-xl font-extralight mt-2 
                                                ${showData?.satisfaction === 'very satisfied' ? 'text-green-500' : ''}
                                                ${showData?.satisfaction === 'neutral' ? 'text-yellow-500' : ''}
                                                ${showData?.satisfaction === 'unsatisfied' ? 'text-red-500' : ''}
                                            `}
                                        >
                                            {showData?.satisfaction}
                                    </span>
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

export default forwardRef(PatientSatisfactoryProfileModal)

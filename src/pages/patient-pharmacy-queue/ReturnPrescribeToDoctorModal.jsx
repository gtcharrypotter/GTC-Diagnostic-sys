/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import React, { forwardRef, Fragment, useImperativeHandle, useState } from 'react'
import { useForm } from 'react-hook-form';
import ActionBtn from '../../components/buttons/ActionBtn';
import { Dialog, Transition } from '@headlessui/react';
import TextAreaField from '../../components/inputs/TextAreaField';
import InfoText from '../../components/InfoText';
import { doctorName } from '../../libs/helpers';

const ReturnPrescribeToDoctorModal = (props, ref) => {
    const { appointment, setAppointment } = props;
    const {
		register,
		getValues,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();
    const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

    useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));
    const show = (data) => {
		setModalOpen(true);
		// setAppointment(data);
	};
	const hide = () => {
		setModalOpen(false);
	};
	const submit = () => {
		
	}
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
							<Dialog.Panel className="w-full lg:max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<div className="p-4 flex flex-col gap-y-4 relative">
									<div className="flex flex-col">
										<span className="text-xl font-bold  text-blue-900">
											Return Prescriptions
										</span>
									</div>
									<div className="p-5 text-lg text-indigo-700=">
										<InfoText
                                            className="w-full"
                                            title="Prescribed By"
                                            value={doctorName(appointment?.prescribedByDoctor)}
                                        />
                                        <div className="">
                                            <h4 className="text-md text-red-800  font-bold mb-2">
                                                Return Notes
                                            </h4>
                                            
                                            <TextAreaField
                                                error={
                                                    errors?.treatment_plan
                                                        ?.message
                                                }
                                                className="rounded-xl"
                                                rows="3"
                                                placeholder="return notes..."
                                                {...register("return_notes", {
                                                    required:
                                                        "This field is required!",
                                                })}
                                            />
                                            
                                            
                                        </div>
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
										// onClick={submit}
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

export default forwardRef(ReturnPrescribeToDoctorModal)

import React, { forwardRef, Fragment, useImperativeHandle, useState } from 'react'
import ActionBtn from '../buttons/ActionBtn';
import { Dialog, Transition } from '@headlessui/react';

const IsolatePatientModal = (props, ref) => {
    const { isOnline } = props;
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
        const [isolate, setIsolate] = useState(null);
        const [modalOpen, setModalOpen] = useState(false);
        useImperativeHandle(ref, () => ({
                show: show,
                hide: hide,
            }));
            const show = (data) => {
                console.log("Accept Patient Referral", data);
                setIsolate(() => data);
                setModalOpen(true);
            };
            const hide = () => {
                setModalOpen(false);
            };
            const submit = (data) => {}
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
							<Dialog.Panel className="w-full lg:max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all z-50">
								{/* <Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									
								</Dialog.Title> */}

								{!isolate?.reading ? (
									<div className="p-4 flex flex-col gap-y-4 relative">
										<div className="flex flex-col">
											<span className="text-xl font-bold  text-blue-900">
												Send Patient to Isolation
											</span>
											<span className="text-sm font-light text-blue-900 ">
												Assign patient to room number
												and physician.
											</span>
										</div>
										{/* <div>{dateOnlyToday()}</div> */}
										<div className="flex flex-col gap-6 px-6 pb-6">
											{/* {JSON.stringify(errors)} */}
											
									
										</div>
									</div>
								) : (
									<>
										<div className="flex flex-col p-4">
											<span className="text-xl font-bold  text-blue-900">
												Accept Reading
											</span>
											<span className="text-sm font-light text-blue-900 pt-5 ">
												Click DONE to continue...
											</span>
										</div>
									</>
								)}

								<div className="px-4 pb-3 flex items-center justify-end bg-slate-">
									{/* <ActionBtn
										type="foreground-dark"
										className="ml-auto uppercase"
										onClick={hide}
									>
										Read more...
									</ActionBtn> */}
									<ActionBtn
										type="success"
										className="ml-4"
										onClick={handleSubmit(submit)}
									>
										DONE
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

export default forwardRef(IsolatePatientModal)

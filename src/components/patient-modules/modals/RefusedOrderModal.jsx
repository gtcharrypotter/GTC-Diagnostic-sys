import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react'
import ActionBtn from '../../buttons/ActionBtn';
import { Dialog, Transition } from '@headlessui/react';
import { toast } from 'react-toastify';
import Axios from '../../../libs/axios';
import { useForm } from 'react-hook-form';

const RefusedOrderModal = (props, ref) => {
    const { onSuccess } = props;
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
		setModalData(showData);
	};
	const hide = () => {
		setModalOpen(false);
	};

    const submit = (data) => {
        let formData = new FormData();

        // Change status to 'refused'
        formData.append("order_status", "refused");

        let url = `v1/doctor/laboratory-order/refuse-order/${modalData?.id}`;
        formData.append("_method", "PATCH");
        
        Axios.post(url, formData).then((res) => {
            setTimeout(() => {
                toast.success("Order Refused successfully!");
                if (onSuccess) {
                    onSuccess();
                }
            }, 200);

            hide();
        }).catch(error => {
            // Add any necessary error handling
            toast.error("An error occurred while refusing the order.");
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
							<Dialog.Panel className="w-full lg:max-w-md transform overflow-visible rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className="py-3 px-4 flex flex-col border-b "
								>
									
								</Dialog.Title>
								<div className="px-4 pt-11 pb-11 grid grid-cols-1 gap-6 relative">
									<p className="text-lg text-teal-600 text-center">
                                        <div className="flex flex-col">
                                            Are you sure to refused{" "}
										<b className="underline">
											{modalData?.type?.name}{" "}
										</b>
										order?
                                        </div>
										
									</p>
								</div>

								<div className="px-4 py-4 flex items-center justify-end bg-slate- border-t">
									<ActionBtn
										type="foreground"
										className="mr-auto"
										onClick={hide}
									>
										Cancel
									</ActionBtn>
									<ActionBtn
										type="teal"
										className="ml-4"
										onClick={handleSubmit(submit)}
									>
										Yes, Refused!
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

export default forwardRef(RefusedOrderModal)

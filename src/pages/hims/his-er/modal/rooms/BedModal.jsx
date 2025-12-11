import React, { Fragment, forwardRef, useImperativeHandle, useState } from 'react'
import { useForm } from 'react-hook-form';
import ActionBtn from '../../../../../components/buttons/ActionBtn';
import { Dialog, Transition } from '@headlessui/react';
import { bedRoom } from '../../../../../libs/appointmentOptions';
import { keyByValue } from '../../../../../libs/helpers';

const BedModal = (props, ref) => {
  const { patient, onSuccess } = props;
  const {
		register,
		getValues,
		watch,
		control,
		setValue,
		reset,
		trigger,
		handleSubmit,
		formState: { errors },
	} = useForm();
    const [modalOpen, setModalOpen] = useState(false);

    useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));
    const show = () => {

		// console.log(
		// 	"patient appointmentData xx",
		// 	appointmentData?.id,
		// 	patient?.id,
		// 	appointmentData
		// );
		// console.log("/v1/anesthesia/operation-procedure/list");
		// setShowData(data);
		// setTimeout(() => {
		// 	if (appointmentData?.id) {
		// 		setValue("appointment_id", appointmentData?.id);
		// 	}
		// 	setValue("operation_date", dateYYYYMMDD());
		// }, 200);
		// getDoctors().then((res) => {
		// 	setDoctors(res.data.data);
		// });
	setModalOpen(true);
};
    const hide = () => {
		setModalOpen(false);
		// reset({
		// 	procedure: "",
		// 	operation_data: "",
		// 	patient_id: "",
		// 	appointment_id: "",
		// });
	};
    const noHide = () => {};
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
							<Dialog.Panel className="w-full lg:max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									<span className="text-xl text-center font-bold  text-blue-900">
										Bed
									</span>
									<span className="text-sm font-light text-blue-900 ">
										Choose Bed 
									</span>
									{/* <ActionBtn
										type="danger"
										size="sm"
										className="absolute top-4 right-4 "
										onClick={hide}
									>
										<FlatIcon icon="br-cross-small" /> Close
									</ActionBtn> */}
								</Dialog.Title>
								<div className="p-6 flex flex-col gap-y-4 relative">
									
							<div className="lg:col-span-12">
												<h4 className="border-y-2 text-base font-bold p-2 mb-4">
													General History
												</h4>

												<div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4 px-2 w-full">
													<div className="flex flex-col lg:col-span-4">
														{bedRoom?.map(
															(data, index) => {
																if (index <= 4)
																	return (
																		<div
																			className="flex flex-col"
																			key={`${keyByValue(
																				data?.value
																			)}`}
																		>
																			<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																				<input
																					type="checkbox"
																					{...register(
																						data?.name
																					)}
																				/>
																				<span>
																					{
																						data?.label
																					}
																				</span>
																			</label>
																		</div>
																	);
															}
														)}
													</div>
													<div className="flex flex-col lg:col-span-3">
														{bedRoom?.map(
															(data, index) => {
																if (
																	index > 4 &&
																	index <= 9
																)
																	return (
																		<div
																			className="flex flex-col"
																			key={`${keyByValue(
																				data?.value
																			)}`}
																		>
																			<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																				<input
																					type="checkbox"
																					{...register(
																						data?.name
																					)}
																				/>
																				<span className="">
																					{
																						data?.label
																					}
																				</span>
																			</label>
																		</div>
																	);
															}
														)}
													</div>
													<div className="flex flex-col lg:col-span-5">
														{bedRoom?.map(
															(data, index) => {
																if (index > 9)
																	return (
																		<div
																			className="flex flex-col"
																			key={`${keyByValue(
																				data?.label
																			)}`}
																		>
																			<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																				<input
																					type="checkbox"
																					{...register(
																						data?.name
																					)}
																				/>
																				<span>
																					{
																						data?.label
																					}
																				</span>
																			</label>
																			
																		</div>
																	);
															}
														)}
													</div>
												</div>
											</div>
									
								</div>

								<div className="px-4 py-4 border-t flex items-center justify-end bg-slate-">
									<ActionBtn
										// size="lg"
										type="danger"
										className="px-5 mr-auto"
										onClick={hide}
									>
										CLOSE
									</ActionBtn>
									<ActionBtn
										// size="lg"
										type="success"
										className="px-5"
										// onClick={handleSubmit(submit)
											
										// }

										
									>
										SUBMIT
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

export default forwardRef(BedModal)

import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import TextInputField from '../../../../../components/inputs/TextInputField';
import ReactSelectInputField from '../../../../../components/inputs/ReactSelectInputField';
import ActionBtn from '../../../../../components/buttons/ActionBtn';
import useClinic from '../../../../../hooks/useClinic';
import Axios from '../../../../../libs/axios';
import { toast } from 'react-toastify';

const InventoryCSRModal = (props, ref) => {
	const {patient} = props;
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
    const { title, children, size = "modal-md", onSuccessCallBack,} = props;
	const [mount, setMount] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
		const [doctor, setDoctor] = useState(null);
	const [doctors, setDoctors] = useState([]);
    const { getDoctors, getDoctorsByHealthUnit, getTimeSlots } = useClinic();

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
		// setTimeout(() => {
		// 	setValue("status", "active");
		// 	setValue("type", "RHU");

		// 	if (showData?.id) {
		// 		setValue("name", showData?.name);
		// 		setValue("type", showData?.type);
		// 		setValue("region", showData?.region);
		// 		setValue("province", showData?.province);
		// 		setValue("municipality", showData?.municipality);
		// 		setValue("barangay", showData?.barangay);
		// 		setValue("status", showData?.status);
		// 	}
		// }, 500);
		// setHealthUnit(showData);
	};
	const hide = () => {
		setModalOpen(false);
	};
	const nohide = () => {};

	const submit = (data) => {
		let formData = new FormData();

		formData.append("csr_date", data?.csr_date);
		formData.append("csr_code", data?.csr_code);
		formData.append("csr_name", data?.csr_name);
		formData.append("csr_supplier", data?.csr_supplier);
		formData.append("csr_unit", data?.csr_unit);
		formData.append("csr_stocks", data?.csr_stocks);
		formData.append("csr_price", data?.csr_price);
	

		Axios.post(`v1/inventory-csr/store`, formData).then((res) => {
			setTimeout(() => {
				toast.success("CSR Supplies Added successfully!");
				if (onSuccessCallBack) onSuccessCallBack();
			}, 200);
			hide();
		});
	};
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
							<Dialog.Panel className="w-full lg:max-w-lg transform overflow-visible rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className="py-3 px-4 flex flex-col border-b "
								>
									<span className="text-xl font-bold  text-blue-900">
										Add CSR Supplies
									</span>
									<span className="text-xs text-gray-500">
										Complete form to Add Supplies
									</span>
									
								</Dialog.Title>
								<div className="px-4 pt-5 pb-6 grid grid-cols-1 gap-2 relative">
									<TextInputField
                                        type="date"
										label="Date"
										placeholder="Enter date of procedure"
										{...register("csr_date", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
                                       
										label="Item Code"
										placeholder="Item Code"
										{...register("csr_code", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
                                       
										label="Item Name"
										placeholder="Item Name"
										{...register("csr_name", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
                                       
										label="Supplier"
										placeholder="supplier"
										{...register("csr_supplier", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
                                       
										label="Unit of Measurement"
										placeholder="Unit"
										{...register("csr_unit", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
                                      
                                    <TextInputField
                                       
										label="Stocks"
										placeholder="Enter Stocks"
										{...register("csr_stocks", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>	
									<TextInputField
                                       
										label="Price"
										placeholder="Price"
										{...register("csr_price", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>		
								</div>

								<div className="px-4 py-4 flex items-center justify-end bg-slate- border-t">
									<ActionBtn
										type="danger"
										className="mr-auto"
										onClick={hide}
									>
									Cancel
									</ActionBtn>
									<ActionBtn
										type="success"
										className="ml-auto"
										onClick={handleSubmit(submit)}
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

export default forwardRef(InventoryCSRModal)

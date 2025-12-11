/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import {
	Fragment,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ActionBtn from "../../../components/buttons/ActionBtn";
import TextInputField from "../../../components/inputs/TextInputField";
import ReactSelectInputField from "../../../components/inputs/ReactSelectInputField";
import Axios from "../../../libs/axios";
import FlatIcon from "../../../components/FlatIcon";

import { v4 as uuidv4 } from "uuid";
import { dateMMDDYYYY, dateToday, dateYYYYMMDD } from "../../../libs/helpers";
import useNoBugUseEffect from "../../../hooks/useNoBugUseEffect";
import { useAuth } from "../../../hooks/useAuth";

const uniq_id = uuidv4();
const CreateCOFModal = (props, ref) => {
	const { onSuccess, healthUnits = [] } = props;
	const { user } = useAuth();
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
	const [isSelectorLoading, setIsSelectorLoading] = useState(false);

	const [locations, setLocations] = useState([]);

	const [type, setType] = useState(null);
	const [HUList, setHUList] = useState([]);

	const [items, setItems] = useState([]);
	const [selectedItems, setSelectedItems] = useState([
		{
			id: uniq_id,
			item: null,
			quantity: 1,
		},
	]);
	useNoBugUseEffect({
		functions: () => {
			if (watch("location_type")) getHUList(watch("location_type"));
		},
		params: [watch("location_type")],
	});
	useNoBugUseEffect({
		functions: () => {
			setTimeout(() => {
				setValue("location_type", user?.healthUnit?.type);
				setValue("health_unit_id", user?.health_unit_id);
			}, 200);
		},
		params: [user, modalOpen],
	});

	const getHUList = (type) => {
		Axios.get(`v1/health-unit/list?type=${type}`)
			.then((res) => {
				setHUList(res.data.data);
			})
			.finally(() => {
				setIsSelectorLoading(false);
			});
	};
	useEffect(() => {
		let t = setTimeout(() => {
			setMount(1);
			getItems();
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
		setTimeout(() => {
			setValue("status", "active");
		}, 300);
		if (showData?.id) {
			setModalData(showData);
		} else {
			let date = new Date();
			setModalData(null);
			setSelectedItems([
				{
					id: uniq_id,
					item: null,
					quantity: 1,
				},
			]);
			reset({
				location_type: "",
				cof_number: date.getTime(),
				consignor: "",
				date: dateYYYYMMDD(),
				hci_name: "",
				hci_number: "",
				term: "",
				address: "",
			});
		}
	};
	const hide = () => {
		setModalOpen(false);
	};
	const nohide = () => {};

	const submit = (data) => {
		let formData = new FormData();

		formData.append("cof_number", data?.cof_number);
		formData.append("consignor", data?.consignor);
		formData.append("date", data?.date);
		formData.append("hci_name", data?.hci_name || "");
		formData.append("hci_number", data?.hci_number || "");
		formData.append("term", data?.term || "");
		formData.append("address", data?.address);

		formData.append(`location[0][type]`, data.location_type);
		formData.append(`location[0][location_id]`, data?.health_unit_id);
		selectedItems?.map((item, itemIndex) => {
			formData.append(
				`location[0][items][${itemIndex}][item_id]`,
				item.item?.id
			);
			formData.append(
				`location[0][items][${itemIndex}][qty]`,
				item.quantity || 1
			);
			formData.append(
				`location[0][items][${itemIndex}][price]`,
				item.price || 0
			);
		});

		let url = `v1/consignment/store`;

		Axios.post(url, formData).then((res) => {
			setTimeout(() => {
				if (modalData?.id) {
					toast.success("Room updated successfully!");
				} else {
					toast.success("Room created successfully!");
				}
				if (onSuccess) {
					onSuccess();
				}
			}, 200);
			reset({
				name: "",
				status: "active",
			});
			hide();
		});
	};
	const getItems = () => {
		Axios.get(`v1/management/items`).then((res) => {
			setItems(res.data.data);
		});
	};
	const addNewSelectedItem = () => {
		setSelectedItems((prevItems) => [
			...prevItems,
			{
				id: uuidv4(),
				item: null,
				quantity: 0,
			},
		]);
	};
	const removeSelectedItem = (id) => {
		setSelectedItems((prevItems) =>
			prevItems.filter((item) => item.id != id)
		);
	};
	const updateItemInSelected = (id, itemData) => {
		setSelectedItems((items) =>
			items.map((item) => {
				if (item.id == id) {
					return {
						...item,
						item: itemData,
					};
				}
				return item;
			})
		);
	};
	const updateItemQty = (id, qty) => {
		setSelectedItems((items) =>
			items.map((item) => {
				if (item.id == id) {
					return {
						...item,
						quantity: qty,
					};
				}
				return item;
			})
		);
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
							<Dialog.Panel className="w-full lg:max-w-3xl transform overflow-visible rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className="py-3 px-4 flex flex-col border-b bg-slate-200 rounded-t-xl"
								>
									<span className="text-xl font-bold  text-indigo-700">
										{modalData?.id
											? "Update "
											: "Create New "}{" "}
										Consignment orders
									</span>
									<span className="text-sm font-light text-indigo-600 ">
										Complete form to{" "}
										{modalData?.id
											? "update "
											: "create new "}{" "}
										Consignment orders
									</span>
								</Dialog.Title>
								<div className="px-4 pt-3 pb-7 grid grid-cols-1 lg:grid-cols-12 gap-y-2 gap-x-4 relative">
									<TextInputField
										className="lg:col-span-6"
										label="Date"
										type="date"
										error={errors?.date?.message}
										placeholder="Enter date"
										{...register("date", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
										className="lg:col-span-6"
										label="COF Number"
										error={errors?.cof_number?.message}
										placeholder="Enter cof number"
										{...register("cof_number", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
										className="lg:col-span-6"
										label="Consignor"
										error={errors?.consignor?.message}
										placeholder="Enter consignor"
										{...register("consignor", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
										className="lg:col-span-6"
										label="Term"
										error={errors?.term?.message}
										placeholder="Enter term"
										{...register("term", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>

									<TextInputField
										className="lg:col-span-12"
										label="Address"
										error={errors?.address?.message}
										placeholder="Enter address (Street Address, Purok, Barangay, Muncipal, Province)"
										{...register("address", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
										className="lg:col-span-6"
										label="HCI Name"
										error={errors?.hci_name?.message}
										placeholder="Enter HCI name"
										{...register("hci_name", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>

									<TextInputField
										className="lg:col-span-6"
										label="HCI Number"
										error={errors?.hci_number?.message}
										placeholder="Enter HCI number"
										{...register("hci_number", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<div className="lg:col-span-12 pt-4">
										<h4 className="text-md text-indigo-800 border-b border-b-indigo-600 pb-1 font-bold mb-6">
											Receiver Location Information
										</h4>
										<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
											<Controller
												name="location_type"
												control={control}
												rules={{
													required: {
														value: true,
														message:
															"This field is required",
													},
												}}
												render={({
													field: {
														onChange,
														onBlur,
														value,
														name,
														ref,
													},
													fieldState: {
														invalid,
														isTouched,
														isDirty,
														error,
													},
												}) => (
													<ReactSelectInputField
														isClearable={false}
														inputClassName=" "
														ref={ref}
														value={value}
														onChange={onChange}
														onBlur={onBlur} // notify when input is touched
														error={error?.message}
														placeholder="Select type"
														options={[
															{
																label: "Rural Health Unit",
																value: "RHU",
															},
														]}
													/>
												)}
											/>
											<div
												className={` pointer-events-none`}
											>
												<Controller
													name="health_unit_id"
													control={control}
													rules={{
														required: {
															value: true,
															message:
																"This field is required",
														},
													}}
													render={({
														field: {
															onChange,
															onBlur,
															value,
															name,
															ref,
														},
														fieldState: {
															invalid,
															isTouched,
															isDirty,
															error,
														},
													}) => (
														<ReactSelectInputField
															isClearable={false}
															isLoading={
																isSelectorLoading
															}
															onChangeGetData={(
																data
															) => {}}
															inputClassName=" "
															ref={ref}
															value={value}
															onChange={onChange}
															onData
															onBlur={onBlur} // notify when input is touched
															error={
																error?.message
															}
															placeholder={`Select Health Unit`}
															options={HUList?.map(
																(unit) => ({
																	label: unit?.name,
																	value: unit?.id,
																	rooms: unit?.rooms,
																})
															)}
														/>
													)}
												/>
											</div>
										</div>
										<h4 className="text-md text-indigo-800 border-b border-b-indigo-600 pb-1 font-bold mb-4">
											Select Items
										</h4>
										<div className="flex flex-col">
											<div className="table">
												<table>
													<thead>
														<tr>
															<th>Item Code</th>
															<th>
																Item Information
															</th>
															<th className="text-center">
																Unit
															</th>
															<th className="text-center">
																Qty
															</th>
															<th className="text-center w-[100px]">
																Action
															</th>
														</tr>
													</thead>
													<tbody>
														{selectedItems?.map(
															(selectedItem) => {
																return (
																	<tr
																		key={`selectedItem-${selectedItem?.id}`}
																	>
																		<td>
																			{
																				selectedItem
																					?.item
																					?.code
																			}
																		</td>
																		<td className="w-2/5">
																			<ReactSelectInputField
																				isClearable={
																					true
																				}
																				isLoading={
																					isSelectorLoading
																				}
																				inputClassName=" "
																				value={
																					selectedItem
																						?.item
																						?.id
																				}
																				onChangeGetData={(
																					data
																				) => {
																					console.log(
																						"data",
																						data
																					);
																					updateItemInSelected(
																						selectedItem?.id,
																						data?.item
																					);
																				}}
																				placeholder={`Select Health Unit`}
																				options={items?.map(
																					(
																						item
																					) => ({
																						label: item?.name,
																						value: item?.id,
																						description:
																							item?.description,
																						item: item,
																					})
																				)}
																			/>
																		</td>
																		<td className="text-center">
																			{
																				selectedItem
																					?.item
																					?.unit_measurement
																			}
																		</td>

																		<td className="w-[88px] text-center">
																			<TextInputField
																				inputClassName="text-center !py-0 pl-1 !pr-0 h-10 !rounded"
																				defaultValue={
																					1
																				}
																				type="number"
																				placeholder="QTY"
																				onChange={(
																					e
																				) => {
																					updateItemQty(
																						selectedItem?.id,
																						e
																							.target
																							.value
																					);
																				}}
																			/>
																		</td>
																		<td>
																			<div className="flex items-center justify-center gap-2">
																				<ActionBtn
																					type="danger"
																					size="sm"
																					onClick={() => {
																						removeSelectedItem(
																							selectedItem?.id
																						);
																					}}
																				>
																					<FlatIcon icon="rr-trash" />
																					Remove
																				</ActionBtn>
																			</div>
																		</td>
																	</tr>
																);
															}
														)}
														<tr>
															<td
																colSpan={9999}
																className="text-center"
															>
																<div className="flex items-center justify-center">
																	<ActionBtn
																		className="px-4 !rounded-2xl"
																		type="success"
																		size="lg"
																		onClick={
																			addNewSelectedItem
																		}
																	>
																		<FlatIcon icon="rr-layer-plus" />
																		Click to
																		add more
																		items
																	</ActionBtn>
																</div>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>

								<div className="px-4 py-4 flex items-center justify-end bg-slate- border-t">
									<ActionBtn
										type="danger"
										className="ml-4"
										onClick={hide}
									>
										CLOSE
									</ActionBtn>
									<ActionBtn
										type="success"
										className="ml-4"
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
	);
};

export default forwardRef(CreateCOFModal);

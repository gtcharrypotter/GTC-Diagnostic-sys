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
import { dataURItoBlob } from "../../../libs/helpers";
import Axios from "../../../libs/axios";
import ActionBtn from "../../../components/buttons/ActionBtn";
import { useAuth } from "../../../hooks/useAuth";
import Img from "../../../components/Img";
import QRCode from "qrcode.react";
import FlatIcon from "../../../components/FlatIcon";

const ItemRow = ({ item }) => {
	return (
		<tr>
			<td>{item?.item?.code}</td>
			<td>{item?.item?.name}</td>
			<td>{item?.quantity}</td>
			<td>{item?.item?.unit_measurement}</td>
			{/* <td>{parseFloat(item?.price).toFixed(2)}</td>
			<td>{parseFloat(item?.amount).toFixed(2)}</td> */}
		</tr>
	);
};
const LMISViewItemsList = ({ location }) => {
	const new_item = {
		item_code: "",
		item_name: "",
		qty: "",
		unit: "",
		price: "",
		amount: "",
		location: "",
	};
	return (
		<div className="table mb-0">
			<table>
				<thead>
					<tr>
						<th>Item Code</th>
						<th>Item Name</th>
						<th style={{ width: 128 }}>Qty</th>
						<th style={{ width: 144 }}>Unit</th>
						{/* <th style={{ width: 188 }}>Unit Price</th>
						<th style={{ width: 128 }}>Amount</th> */}
					</tr>
				</thead>
				<tbody>
					{location?.items?.map((item) => {
						return (
							<ItemRow item={item} key={`item-row-${item?.id}`} />
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

const UserPosition = ({ position }) => {
	switch (position) {
		case "PHO":
			return "Provincial Health Admin";
		case "PHO-HO":
			return "Provincial Health Officer";
		case "LMIS-RHU":
			return "Rural Health Officer";
		case "LMIS-BHS":
			return "Barangay Health Officer";
		case "LMIS-WH":
			return "PHO Warehouse";
		case "LMIS-CNOR":
			return "Consignor";
		default:
			return "System user";
	}
};
const ViewConsignmentModal = (props, ref) => {
	const { user } = useAuth();
	const { patient, onSuccess } = props;
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

	const [showData, setShowData] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (showData) => {
		setShowData(showData);
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};

	const checkOrder = () => {
		Axios.post(`v1/consignment/check/${showData?.id}`, {
			_method: "PATCH",
		}).then((res) => {
			if (onSuccess) {
				onSuccess();
			}
			setTimeout(() => {
				hide();
			}, 200);
			toast.success("Consignment checked successfully!");
		});
	};
	const approve = () => {
		Axios.post(`v1/consignment/approve/${showData?.id}`, {
			_method: "PATCH",
		}).then((res) => {
			if (onSuccess) {
				onSuccess();
			}
			setTimeout(() => {
				hide();
			}, 200);
			toast.success("Consignment approved successfully!");
		});
	};

	const deliver = () => {
		Axios.post(`v1/consignment/deliver-order/${showData?.id}`, {
			_method: "PATCH",
		}).then((res) => {
			if (onSuccess) {
				onSuccess();
			}
			setTimeout(() => {
				hide();
			}, 200);
			toast.success("Consignment delivered successfully!");
		});
	};
	const receive = () => {
		Axios.post(`v1/consignment/receive-order/${showData?.id}`, {
			_method: "PATCH",
		}).then((res) => {
			if (onSuccess) {
				onSuccess();
			}
			setTimeout(() => {
				hide();
			}, 200);
			toast.success("Consignment received successfully!");
		});
	};

	const process = () => {
		Axios.post(`v1/consignment/process-order/${showData?.id}`, {
			_method: "PATCH",
		}).then((res) => {
			if (onSuccess) {
				onSuccess();
			}
			setTimeout(() => {
				hide();
			}, 200);
			toast.success("Consignment processed successfully!");
		});
	};
	const hasError = (name) => {
		return errors[name]?.message;
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
							<Dialog.Panel className="w-full lg:max-w-[75dvw] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									<span className="text-xl text-center font-bold  text-blue-900">
										View Consigment
									</span>
								</Dialog.Title>
								<div className="p-6 flex flex-col gap-y-4 relative">
									<h6 className="text-black border-b pb-2 mb-2 font-bold text-base ">
										Consignment Information
									</h6>
									<div className="grid grid-cols-1 lg:grid-cols-4 gap- mb-6 w-full !text-base">
										<div className="flex items-center gap-4 border-b p-2">
											Date: <b>{showData?.date}</b>
										</div>
										<div className="flex items-center gap-4 border-b p-2">
											COF Number:
											<b> {showData?.cof_number}</b>
										</div>
										<div className="flex items-center gap-4 border-b p-2">
											Consignor:
											<b> {showData?.consignor}</b>
										</div>
										<div className="flex items-center gap-4 border-b p-2">
											Term: <b>{showData?.term}</b>
										</div>
										<div className="flex items-center gap-4 border-b p-2">
											Address: <b>{showData?.address}</b>
										</div>
										<div className="flex items-center gap-4 border-b p-2">
											HCI Name:{" "}
											<b>{showData?.hci_name}</b>
										</div>
										<div className="flex items-center gap-4 border-b p-2">
											HCI Number:
											<b> {showData?.hci_number}</b>
										</div>
									</div>
									<h6 className="text-black font-bold text-base -mb-2">
										Item List
									</h6>
									<LMISViewItemsList
										location={showData?.locations[0]}
									/>
									<div className="grid grid-cols-1 lg:grid-cols-12 pt-3 gap-3">
										<div className="lg:col-span-3 flex flex-col">
											<span className="text-sm mb-1">
												Prepared by:{" "}
											</span>
											<div className="flex items-center gap-3 mb-1">
												<div>
													<Img
														className="w-[44px] h-[44px] rounded-full"
														type="user"
														src={
															showData
																?.scheduledBy
																?.avatar
														}
														name={
															showData
																?.scheduledBy
																?.name?.length >
															0
																? showData
																		?.scheduledBy
																		?.name
																: showData
																		?.scheduledBy
																		?.username
														}
														alt=""
													/>
												</div>
												<QRCode
													value={`user-${showData?.scheduledBy?.username}`}
													level="H"
													size={44}
												/>
											</div>
											<b className="text-sm">
												{showData?.scheduledBy?.name
													?.length > 0
													? showData?.scheduledBy
															?.name
													: showData?.scheduledBy
															?.username}
											</b>
											<span className="italic border-t text-xs  w-1/2 mt-1">
												<UserPosition
													position={
														showData?.scheduledBy
															?.type
													}
												/>
											</span>
										</div>
										{showData?.checkedBy ? (
											<div className="lg:col-span-3 flex flex-col">
												<span className="text-sm mb-1">
													Checked by:{" "}
												</span>
												<div className="flex items-center gap-3 mb-1">
													<div>
														<Img
															className="w-[44px] h-[44px] rounded-full"
															type="user"
															src={
																showData
																	?.checkedBy
																	?.avatar
															}
															name={
																showData
																	?.checkedBy
																	?.name
																	?.length > 0
																	? showData
																			?.checkedBy
																			?.name
																	: showData
																			?.checkedBy
																			?.username
															}
															alt=""
														/>
													</div>
													<QRCode
														value={`user-${showData?.checkedBy?.username}`}
														level="H"
														size={44}
													/>
												</div>
												<b className="text-sm">
													{showData?.checkedBy?.name
														?.length > 0
														? showData?.checkedBy
																?.name
														: showData?.checkedBy
																?.username}
												</b>
												<span className="italic border-t text-xs  w-1/2 mt-1">
													<UserPosition
														position={
															showData?.checkedBy
																?.type
														}
													/>
												</span>
											</div>
										) : (
											""
										)}
										{showData?.approvedBy ? (
											<div className="lg:col-span-3 flex flex-col items-start justify-start">
												<span className="text-sm mb-1">
													Approved by:{" "}
												</span>
												<div className="flex items-center gap-3 mb-1">
													<div>
														<Img
															className="w-[44px] h-[44px] rounded-full"
															type="user"
															src={
																showData
																	?.approvedBy
																	?.avatar
															}
															name={
																showData
																	?.approvedBy
																	?.name
																	?.length > 0
																	? showData
																			?.approvedBy
																			?.name
																	: showData
																			?.approvedBy
																			?.username
															}
															alt=""
														/>
													</div>
													<QRCode
														value={`user-${showData?.approvedBy?.username}`}
														level="H"
														size={44}
													/>
												</div>
												<b className="text-sm">
													{showData?.approvedBy?.name
														?.length > 0
														? showData?.approvedBy
																?.name
														: showData?.approvedBy
																?.username}
												</b>
												<span className="italic border-t text-xs  w-1/2 mt-1">
													<UserPosition
														position={
															showData?.approvedBy
																?.type
														}
													/>
												</span>
											</div>
										) : (
											""
										)}

										{showData?.processedBy ? (
											<div className="lg:col-span-3 flex flex-col">
												<span className="text-sm mb-1">
													Processed by:{" "}
												</span>
												<div className="flex items-center gap-3 mb-1">
													<div>
														<Img
															className="w-[44px] h-[44px] rounded-full"
															type="user"
															src={
																showData
																	?.processedBy
																	?.avatar
															}
															name={
																showData
																	?.processedBy
																	?.name
																	?.length > 0
																	? showData
																			?.processedBy
																			?.name
																	: showData
																			?.processedBy
																			?.username
															}
															alt=""
														/>
													</div>
													<QRCode
														value={`user-${showData?.processedBy?.username}`}
														level="H"
														size={44}
													/>
												</div>
												<b className="text-sm">
													{showData?.processedBy?.name
														?.length > 0
														? showData?.processedBy
																?.name
														: showData?.processedBy
																?.username}
												</b>

												<span className="italic border-t text-xs  w-1/2 mt-1">
													<UserPosition
														position={
															showData
																?.processedBy
																?.type
														}
													/>
												</span>
											</div>
										) : (
											""
										)}
										{showData?.deliveredBy ? (
											<div className="lg:col-span-3 flex flex-col">
												<span className="text-sm mb-1">
													Delivered by:{" "}
												</span>

												<div className="flex items-center gap-3 mb-1">
													<div>
														<Img
															className="w-[44px] h-[44px] rounded-full"
															type="user"
															src={
																showData
																	?.deliveredBy
																	?.avatar
															}
															name={
																showData
																	?.deliveredBy
																	?.name
																	?.length > 0
																	? showData
																			?.deliveredBy
																			?.name
																	: showData
																			?.deliveredBy
																			?.username
															}
															alt=""
														/>
													</div>
													<QRCode
														value={`user-${showData?.deliveredBy?.username}`}
														level="H"
														size={44}
													/>
												</div>
												<b className="text-sm">
													{showData?.deliveredBy?.name
														?.length > 0
														? showData?.deliveredBy
																?.name
														: showData?.deliveredBy
																?.username}
												</b>

												<span className="italic border-t text-xs  w-1/2 mt-1">
													<UserPosition
														position={
															showData
																?.deliveredBy
																?.type
														}
													/>
												</span>
											</div>
										) : (
											""
										)}
										{showData?.receivedBy ? (
											<div className="lg:col-span-3 flex flex-col">
												<span className="text-sm mb-1">
													Received by:{" "}
												</span>

												<div className="flex items-center gap-3 mb-1">
													<div>
														<Img
															className="w-[44px] h-[44px] rounded-full"
															type="user"
															src={
																showData
																	?.receivedBy
																	?.avatar
															}
															name={
																showData
																	?.receivedBy
																	?.name
																	?.length > 0
																	? showData
																			?.receivedBy
																			?.name
																	: showData
																			?.receivedBy
																			?.username
															}
															alt=""
														/>
													</div>
													<QRCode
														value={`user-${showData?.receivedBy?.username}`}
														level="H"
														size={44}
													/>
												</div>
												<b className="text-sm">
													{showData?.receivedBy?.name
														?.length > 0
														? showData?.receivedBy
																?.name
														: showData?.receivedBy
																?.username}
												</b>

												<span className="italic border-t text-xs  w-1/2 mt-1">
													<UserPosition
														position={
															showData?.receivedBy
																?.type
														}
													/>
												</span>
											</div>
										) : (
											""
										)}
									</div>
									<div className="pt-3 mt-3 border-t flex justify-end items-center">
										<span className="text-white">
											{user?.type}---{showData?.status}
										</span>
										{showData?.status == "pending" &&
										user?.type?.includes("PHO") ? (
											<ActionBtn
												size="md"
												type="primary"
												className="w-full lg:w-1/4 gap-2 !font-bold !text-lg"
												onClick={() => {
													checkOrder();
												}}
											>
												<FlatIcon icon="rr-check-circle" />
												Check order
											</ActionBtn>
										) : (
											""
										)}
										{showData?.status == "checked" &&
										user?.type?.includes("PHO") ? (
											<ActionBtn
												size="md"
												type="primary"
												className="w-full lg:w-1/4 gap-2 !font-bold !text-lg"
												onClick={() => {
													approve();
												}}
											>
												<FlatIcon icon="rr-check-circle" />
												Approve order
											</ActionBtn>
										) : (
											""
										)}

										{showData?.status == "approved" &&
										user?.type == "LMIS-CNOR" ? (
											<ActionBtn
												size="md"
												type="warning"
												className="w-full lg:w-1/4 gap-2 !font-bold !text-lg"
												onClick={() => {
													process();
												}}
											>
												<FlatIcon icon="rr-check-circle" />
												Process order
											</ActionBtn>
										) : (
											""
										)}
										{showData?.status == "processed" &&
										user?.type == "LMIS-WH" ? (
											<ActionBtn
												size="md"
												type="success"
												className="w-full lg:w-1/4 gap-2 !font-bold !text-lg"
												onClick={() => {
													deliver();
												}}
											>
												<FlatIcon icon="rr-check-circle" />
												Deliver order
											</ActionBtn>
										) : (
											""
										)}
										{showData?.status == "delivered" &&
										(user?.type == "LMIS-RHU" ||
											user?.type == "SPH-PHAR" ||
											user?.type == "RHU-PHARMACY" ||
											user?.type == "RHU-PHARMA" ||
											user?.type == "RHU-PHAR" ||
											user?.type == "LMIS-BHS" ||
											user?.type == "BHS-BHW") ? (
											<ActionBtn
												size="md"
												type="success"
												className="w-full lg:w-1/4 gap-2 !font-bold !text-lg"
												onClick={() => {
													receive();
												}}
											>
												<FlatIcon icon="rr-check-circle" />
												Receive order
											</ActionBtn>
										) : (
											""
										)}
									</div>
								</div>

								<div className="px-4 py-4 border-t flex items-center justify-end bg-slate-">
									<ActionBtn
										// size="lg"
										type="foreground"
										className="px-5"
										onClick={hide}
									>
										CLOSE
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

export default forwardRef(ViewConsignmentModal);

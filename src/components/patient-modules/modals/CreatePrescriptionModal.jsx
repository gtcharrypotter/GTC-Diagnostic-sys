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
import {
	calculateAge,
	calculateAgeV3,
	dataURItoBlob,
	formatDateMMDDYYYY,
	formatDateMMDDYYYYHHIIA,
	formatDateYYYYMMDD,
	patientFullName,
} from "../../../libs/helpers";
import ActionBtn from "../../buttons/ActionBtn";
import Axios from "../../../libs/axios";
import TextInputField from "../../inputs/TextInputField";
import ReactSelectInputField from "../../inputs/ReactSelectInputField";
import useNoBugUseEffect from "../../../hooks/useNoBugUseEffect";
import ReactQuillField from "../../inputs/ReactQuillField";
import ImagePicker from "../../inputs/ImagePicker";
import { v4 as uuidv4 } from "uuid";
import Table from "../../table/Table";
import FlatIcon from "../../FlatIcon";

const ItemInformation = ({ item, updateQty }) => {
	return (
		<div className="flex items-start">
			<div className="flex flex-col w-1/2">
				<b className="text-sm font-medium text-indigo-700 w-full mb-1 tracking-tight">
					{item?.name}
				</b>
				<span className="flex items-center gap-2 mb-2 text-sm font-light text-slate-700">
					<span className="whitespace-nowrap text-xs">
						Item Code:{" "}
					</span>
					<b className="whitespace-nowrap"> {item?.code}</b>
				</span>
			</div>
			<div className="ml-auto flex flex-col gap-1 whitespace-nowrap w-[128px]">
				<span className="text-xs font-medium">
					Prescribed Quantity:
				</span>
				<div className="w-full">
					<ItemQuantity
						onChange={(val) => {
							updateQty(val);
						}}
					/>
				</div>
			</div>
			<span className="flex flex-col justify-start items-center gap-0 text-sm font-light text-slate-700 ml-6">
				<span className="font- mb-2">Stock On-hand</span>
				<span className="font-medium text-slate-800 whitespace-nowrap mb-2">
					{item?.qty_left} {item?.unit_measurement}
				</span>
				{/* <span>{JSON.stringify(item)}</span> */}
			</span>
		</div>
	);
};
const ItemQuantity = ({ onChange }) => {
	const [qty, setQty] = useState(0);
	useNoBugUseEffect({
		functions: () => {
			onChange(qty);
		},
		params: [qty],
	});
	return (
		<TextInputField
			value={qty}
			onChange={(e) => {
				setQty(e.target.value);
			}}
			placeholder="Quantity"
			type="number"
			min={1}
			inputClassName="!px-1 py-0 !h-8 bg-slate-300 text-center"
		/>
	);
};
const CreatePrescriptionModal = (props, ref) => {
	const { selecItemRef, onSuccess } = props;
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
	const [items, setItems] = useState([]);
	const [prescriptions, setPrescriptions] = useState([
		{
			id: uuidv4(),
			qty: 0,
		},
	]);
	const [modalOpen, setModalOpen] = useState(false);
	const [tests, setTests] = useState([]);
	useNoBugUseEffect({
		functions: () => {
			getItems();
		},
	});
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setShowData(data);
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};
	const getItems = () => {
		Axios.get(`/v1/management/items`).then((res) => {
			setItems(res.data.data);
		});
	};

	const updateItem = (data, item) => {
		setPrescriptions((presc) =>
			presc?.map((x) =>
				x.id == data?.id
					? {
							...x,
							item: item,
					  }
					: x
			)
		);
	};
	const updateQty = (data, qty) => {
		setPrescriptions((presc) =>
			presc?.map((x) =>
				x.id == data?.id
					? {
							...x,
							qty: qty,
					  }
					: x
			)
		);
	};
	const updateNotes = (data, notes) => {
		setPrescriptions((presc) =>
			presc?.map((x) =>
				x.id == data?.id
					? {
							...x,
							notes: notes,
					  }
					: x
			)
		);
	};
	const removeItem = (data) => {
		setPrescriptions((presc) => presc.filter((x) => x?.id != data?.id));
	};
	return (
		<Transition appear show={modalOpen} as={Fragment}>
			<Dialog as="div" className="" onClose={() => {}}>
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
							<Dialog.Panel className="w-full lg:max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									<span className="text-xl text-center font-bold  text-blue-900">
										Create Prescription
									</span>
								</Dialog.Title>
								<div className="px-4 pb-6 flex flex-col gap-y-4 relative">
									<div className="flex flex-col p- border-">
										<span className="font-semibold text-blue-800 mb-3 py-2 border-b">
											Patient Information
										</span>
										<div className="grid grid-cols-1 lg:grid-cols-3">
											<span className="flex text-sm items-center gap-2 mb-1">
												<span className="font-light w-2/5">
													Patient:
												</span>
												<span className="font-bold">
													{patientFullName(
														showData?.patient
													)}
												</span>
											</span>
											<span className="flex text-sm items-center gap-2 mb-1">
												<span className="font-light w-2/5">
													Gender:
												</span>
												<span className="font-bold">
													{showData?.patient?.gender}
												</span>
											</span>
											<span className="flex text-sm items-center gap-2 mb-1">
												<span className="font-light w-2/5">
													Birthday:
												</span>
												<span className="font-bold">
													{formatDateMMDDYYYY(
														new Date(
															showData?.patient?.birthday
														)
													)}
												</span>
											</span>
											<span className="flex text-sm items-center gap-2 mb-1">
												<span className="font-light w-2/5">
													Age:
												</span>
												<span className="font-bold">
													{calculateAgeV3(
														showData?.patient
															?.birthday
													)}
												</span>
											</span>
											<span className="flex text-sm items-center gap-2 mb-1">
												<span className="font-light w-2/5">
													Chief complaint:
												</span>
												<span className="font-bold">
													{showData?.pre_notes ||
														"Test"}
												</span>
											</span>
										</div>

										<span className="font-semibold text-blue-800 mt-6 mb-3 py-2 border-y">
											Prescription
										</span>
										{prescriptions?.map((data) => {
											return data?.item?.id ? (
												<div
													key={`psctns-${data?.item?.id}`}
													className="rounded-xl border relative border-green-500 shadow-md p-4 mb-4"
												>
													<span
														className="absolute -top-[14px] border border-red-300 text-xs font-light rounded-xl px-2 py-[2px] right-0 bg-red-500 hover:bg-red-900 duration-200 text-white flex items-center gap-1 cursor-pointer"
														onClick={() => {
															removeItem(data);
														}}
													>
														<FlatIcon icon="br-cross-small" />
														<span className="mb-[2px]">
															remove item
														</span>
													</span>
													<ItemInformation
														item={data?.item}
														updateQty={(val) => {
															updateQty(
																data,
																val
															);
														}}
													/>
													<div className="mt-4">
														<ReactQuillField
															placeholder="Sig.:"
															onChange={(val) => {
																updateNotes(
																	data,
																	val
																);
															}}
														/>
													</div>
												</div>
											) : (
												<div className="flex items-center justify-center pt-3 pb-11">
													<ActionBtn
														type="accent"
														className="w-2/3 !rounded-3xl"
														onClick={() => {
															selecItemRef.current.show(
																{
																	items: items,
																	onChangeFn:
																		(
																			itemSelected
																		) => {
																			updateItem(
																				data,
																				itemSelected
																			);
																		},
																}
															);
														}}
													>
														Select Item
													</ActionBtn>
												</div>
											);
										})}
										<div className="flex items-center justify-center">
											<ActionBtn
												type="secondary"
												className="border !rounded-3xl px-6"
												onClick={() => {
													setPrescriptions(
														(prevP) => [
															...prevP,
															{
																id: uuidv4(),
																qty: 0,
															},
														]
													);
												}}
											>
												<FlatIcon
													icon="br-square-plus"
													className="mr-2"
												/>
												Add more item
											</ActionBtn>
										</div>
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
									<ActionBtn
										// size="lg"
										type="success"
										className="ml-auto px-5"
										onClick={hide}
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

export default forwardRef(CreatePrescriptionModal);

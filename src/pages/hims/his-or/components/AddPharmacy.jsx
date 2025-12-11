/* eslint-disable react/prop-types */

import { v4 as uuidv4 } from "uuid";
import FlatIcon from '../../../../components/FlatIcon';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import ReactQuillField from '../../../../components/inputs/ReactQuillField';
import TextInputField from '../../../../components/inputs/TextInputField';
import ReactSelectInputField from '../../../../components/inputs/ReactSelectInputField';
import { useState } from "react";
import Axios from "../../../../libs/axios";
import { Controller, useForm } from "react-hook-form";
import { doctorName, doctorSpecialty } from "../../../../libs/helpers";
import useNoBugUseEffect from "../../../../hooks/useNoBugUseEffect";
import { useAuth } from "../../../../hooks/useAuth";

const uniq_id = uuidv4();
const AddPharmacy = ({
	pharmacyItem,
	selectedItemsPharmacy = [],
	setSelectedItemsPharmacy,
	items = [],
	setItems,
	loading,
}) => {
	const [doctors, setDoctors] = useState([]);
	const [doctorList, setDoctorList] = useState([]);
	const [isSelectorLoading, setIsSelectorLoading] = useState(false);
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
	const { user } = useAuth();
	const getDoctors = () => {
		Axios.get(
			`v1/clinic/doctors-by-location?health_unit_id=${getValues(
				"rhu_id"
			)}`
		).then((res) => {
			setDoctorList(res.data.data);
		});
	};
	const [HUList, setHUList] = useState([]);
	useNoBugUseEffect({
		functions: () => {
			setTimeout(() => {
				setValue("location_type", user?.healthUnit?.type);
				setValue("health_unit_id", user?.health_unit_id);
			}, 200);
		},
		params: [user?.id],
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
    const addNewSelectedItemPharmacy = () => {
		setSelectedItemsPharmacy((prevItems) => [
			...prevItems,
			{
				id: uuidv4(),
				inventory_pharmacies: null,
				quantity: 0,
			},
		]);
	};
	const removeSelectedItem = (id) => {
		setSelectedItemsPharmacy((prevItems) =>
			prevItems.filter((inventory_pharmacies) => inventory_pharmacies.id != id)
		);
	};
	const updateItemInSelected = (id, data) => {
		setSelectedItemsPharmacy((items) =>
			items.map((inventory_pharmacies) => {
				if (inventory_pharmacies.id == id) {
					return {
						...inventory_pharmacies,
						inventory_id: data?.inventory?.id,
						inventory_pharmacies: data?.inventory_pharmacies,
					};
				}
				return item;
			})
		);
	};
	const updateItemQty = (id, qty) => {
		setSelectedItemsPharmacy((items) =>
			items.map((item) => {
				if (item.id == id) {
					console.log("updateItemQty ==", item, id, qty);
					return {
						...item,
						quantity: qty,
					};
				} else {
					return item;
				}
			})
		);
	};
	const updateItemSig = (id, text) => {
		setSelectedItemsPharmacy((items) =>
			items.map((item) => {
				if (item.id == id) {
					return {
						...item,
						notes: text,
					};
				}
				return item;
			})
		);
	};
  return (
    <>
			<div className="flex flex-col w-full gap-4 pb-2">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
					
				</div>
				<div className="p-5 rounded-xl flex flex-col">
					<div className="flex">
						<div>
						<h4 className="text-md text-indigo-800  font-bold mb-0">
							Add Pharmacy
						</h4>
						<span className="text-slate-500 text-sm">
							Select items to add medicine
						</span>
						
					</div>
					{/* <ActionBtn
							className="px-4 !rounded-2xl ml-auto mb-2"
							type="success"
							size="md"
							onClick={() => {
                                prescribeItemsPharmacy();
                            }}
						>
							<FlatIcon icon="rr-check" />
							Done
						</ActionBtn> */}
					</div>
					<div className="flex flex-col">
						<div className="table">
							<table className="mb-5">
								<thead>
									<tr>
										<td className="font-medium">
											Date
										</td>
										<td className="font-medium">
											
											Ordered by
										</td>
										{/* <td className="font-medium">
											Item Code
										</td> */}
										<td className="font-medium">
											Item Information
										</td>
										<td className="font-medium">
											Packaging
										</td>
										{/* <td className="text-center">Unit</td> */}
										{/* <td className="text-center">Stock</td> */}
										<td className="text-center">Qty</td>
										<td className="text-center w-[100px]">
											Action
										</td>
									</tr>
								</thead>
								<tbody>
									{selectedItemsPharmacy?.map((selectedItem) => {
										return (
											<>
												<tr
													key={`selectedItem-${selectedItem?.id}`}
												>
													<td className="w-[88px] text-center">
														<TextInputField
															inputClassName="text-center !py-0 pl-1 !pr-0 h-10 !rounded"
															defaultValue={1}
															type="date"
															
														/>
													</td>
													<td className="w-3/5 text-center">
														<Controller
															name="doctor_id"
															control={control}
															rules={{
																required: {
																	value: true,
																	message: "This field is required",
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
																	isClearable={true}
																	// label="Select Surgeon"
																	isLoading={isSelectorLoading}
																	onChangeGetData={(data) => {}}
																	inputClassName=" "
																	ref={ref}
																	value={value}
																	onChange={onChange}
																	onData
																	onBlur={onBlur} // notify when input is touched
																	error={error?.message}
																	placeholder={`Select Doctor`}
																	options={doctorList?.map((doctor) => ({
																		label: `${doctorName(doctor)}`,
																		value: doctor?.id,
																		descriptionClassName:
																			" !opacity-100",
																		description: (
																			<div className="flex text-xs flex-col gap-1">
																				<span>
																					{doctorSpecialty(
																						doctor
																					)}
																				</span>
																				<span className="flex items-center gap-1">
																					Status:
																					<span className="text-green-900 drop-shadow-[0px_0px_1px_#ffffff] text-xs font-bold">
																						ONLINE
																					</span>
																				</span>
																			</div>
																		),
																	}))}
																/>
															)}
														/>
													</td>
													<td className="w-3/5">
														<ReactSelectInputField
															isClearable={true}
															// isLoading={
															// 	isSelectorLoading
															// }
															inputClassName=" "
															value={
																selectedItem
																	?.item?.id
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
																	data
																);
															}}
															label="Select Item"
															placeholder={`Select Item`}
															options={items?.map(
																(item) => ({
																	label: item?.name,
																	value: item?.id,
																	description:
																		(
																			<div className="flex flex-col">
																				<span>
																					CODE:{" "}
																					{
																						item?.code
																					}
																				</span>
																				<span>
																					DESCRIPTION:{" "}
																					{
																						item?.name
																					}
																				</span>
																			</div>
																		),
																	item: item,
																})
															)}
														/>
														<div className="flex items-center gap-4 p-4 divide-x">
															<div className="flex flex-col mt-2">
																<span className="font-bold mb-1">
																	Item Code
																</span>
																<span>
																	{
																		selectedItem
																			?.item
																			?.code
																	}
																</span>
															</div>
															<div className="flex flex-col mt-2 pl-4">
																<span className="font-bold mb-1">
																	Item
																	Description
																</span>
																<span>
																	{
																		selectedItem
																			?.item
																			?.description
																	}
																</span>
															</div>
														</div>
													</td>
													<td className="w-[88px] text-center">
														<TextInputField
															inputClassName="text-center !py-0 pl-1 !pr-0 h-10 !rounded"
															defaultValue={1}
															type="number"
															placeholder="QTY"
															onChange={(e) => {
																updateItemQty(
																	selectedItem?.id,
																	e.target
																		.value
																);
															}}
														/>
													</td>
													<td className="w-[88px] text-center">
														<TextInputField
															inputClassName="text-center !py-0 pl-1 !pr-0 h-10 !rounded"
															defaultValue={1}
															type="number"
															placeholder="QTY"
															onChange={(e) => {
																updateItemQty(
																	selectedItem?.id,
																	e.target
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
												<tr>
													<td
														colSpan={6}
														className="!pb-6 "
													>
														{/* <ReactQuillField
															className="bg-white"
															placeholder="Sig.:"
															onChange={(val) => {
																console.log(
																	"onChange sig",
																	val
																);
																updateItemSig(
																	selectedItem?.id,
																	val
																);
																// updateNotes(
																// 	data,
																// 	val
																// );
															}}
														/> */}
														
													</td>
												</tr>
											</>
										);
									})}
									<tr>
										
										<td
											colSpan={9999}
											className="text-center"
										>
											
											<div className="flex items-center justify-center">
												<ActionBtn
													className="px-4 !rounded-2xl"
													type="secondary"
													size="md"
													onClick={addNewSelectedItemPharmacy}
												>
													<FlatIcon icon="rr-square-plus" />
													Click to add more items
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
    </>
  )
}

export default AddPharmacy

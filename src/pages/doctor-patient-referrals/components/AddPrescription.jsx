/* eslint-disable react/prop-types */

import { v4 as uuidv4 } from "uuid";
import ReactSelectInputField from "../../../components/inputs/ReactSelectInputField";
import ActionBtn from "../../../components/buttons/ActionBtn";
import FlatIcon from "../../../components/FlatIcon";
import TextInputField from "../../../components/inputs/TextInputField";
import ReactQuillField from "../../../components/inputs/ReactQuillField";
import { procedureRates } from "../../../libs/procedureRates";
import { caseCodes } from "../../../libs/caseCodes";
import { formatCurrency, keyByValue } from "../../../libs/helpers";
import { useState } from "react";
import CaseDetails from "../../doctor-patient-queue/components/CaseDetails";
import TextAreaField from "../../../components/inputs/TextAreaField";
import { useForm } from "react-hook-form";
import OrderPlans from "../../appointments/components/OrderPlans";
import { abdomenLib, chestLib, digitalRectalLib, disposition, genitourinaryLib, heartLib, heentLib, neuroLib, planAndManagement, skinLib } from "../../../libs/appointmentOptions";

const uniq_id = uuidv4();
const AddPrescription = ({
	appointment,
	patient,
	prescribeItems,
	noPrescribeItems,
	selectedItems = [],
	setSelectedItems,
	items = [],
	caseCode = [],
	selectedDiagnosis = [],
	setSelectedDiagnosis,
	// setItems,
	// setDiagnosis,
	setDisposition,
	loading,
}) => {
	const [selectedDisposition, setSelectedDisposition] = useState(null);
	
	const {
		register,
		watch,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const essentiallyNormalAbdomen = watch('essentially_normal_abodomen');
	const essentiallyNormalChest = watch('essentially_normal_chest');
	const essentiallyNormalDigitalRectal= watch('essentially_normal_digital');
	const essentiallyNormalGenitou = watch('essentially_normal_genitourinary');
	const essentiallyNormalHeart = watch('essentially_normal_heart');
	const essentiallyNormalHeent = watch('essentially_normal_heent');
	const essentiallyNormalNeuro = watch('essentially_normal_neuro');
	const essentiallyNormalSkin = watch('essentially_normal_skin');
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
	// Function to add a new diagnosis
	const addNewDiagnosis = () => {
		setSelectedDiagnosis((prevList) => [
			...prevList,
			{
				id: uuidv4(),
				diagnosis: null,
			},
		]);
	};

	// Function to remove a diagnosis
	const removeDiagnosis = (id) => {
		setSelectedDiagnosis((prevList) => prevList.filter((diagnosis) => diagnosis.id !== id));
	};

	// Function to update a diagnosis
	const updateDiagnosis = (id, data) => {
		setSelectedDiagnosis((caseCodes) =>
			caseCodes.map((diag) => {
				if (diag.id == id) {
					return {
						...diag,
						diag: data?.diag,
						case_code: data?.diagnosis_code,
						case_description: data?.diagnosis_desc,
						case_rate: data?.case_rate,
						professional_fee: data?.professional_fee,
					};
				}
				return diag;
			})
		);
	};
	const removeSelectedItem = (id) => {
		setSelectedItems((prevItems) =>
			prevItems.filter((item) => item.id != id)
		);
	};
	const updateItemInSelected = (id, data) => {
		setSelectedItems((items) =>
			items.map((item) => {
				if (item.id == id) {
					return {
						...item,
						inventory_id: data?.inventory?.id,
						item: data?.item,
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
		setSelectedItems((items) =>
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
	const onSubmit = (data) => {
		prescribeItems({...data,
		// disposition: selectedDisposition?.value,
		});

	}
	const onSubmitWithoutPrescription = (dataWithoutPres) => {
		noPrescribeItems({...dataWithoutPres,
		});

	}
	console.log("Laboratory Data", caseCode)
	return (
		<>
			<div className="flex flex-col w-full gap-4 pb-2">
					
					<div className="p-5 rounded-xl flex flex-col border">
						<div>
						<h4 className="text-md text-indigo-800 font-bold mb-0">
						Pertinent Findings Per System
						</h4>
						<span className="text-slate-500 text-sm">
						Select Pertinent Findings Per System
						</span>
						</div>
						<div className="lg:col-span-12">
										<div className="grid grid-cols-3">
											<table className="">
												<div>
												<thead>
													<tr>
														<th className="w-1/4">
															A. HEENT
															<span className="text-danger ml-1">
																				*
															</span>
															{heentLib.some((data) => errors[data?.name]) && (
																<p className="text-red-500 text-xs mt-1">
																This field is required
																</p>
															)}
														</th>
													</tr>
												</thead>
												<tbody>
													{heentLib?.map(
														(data) => {
															const watchedValues = watch(heentLib.map((item) => item.name));
															const isDisabled = watchedValues.some((val, idx) => val && heentLib[idx].name !== data.name);
															return (
																<tr
																	key={`${keyByValue(
																		data?.value
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				disabled={isDisabled}
																				{...register(data?.name, {
																				validate: () =>
																					heentLib.some((item) => getValues(item?.name)) ||
																					"At least one must be selected",
																				})}
																			/>
																			<span>
																				{
																					data?.label
																				}
																			</span>
																		</label>
																		{data.name === 'others_heent' ? (
																			<TextInputField
																				labelClassName="whitespace-nowrap"
																				className="flex items-center gap-4 w-1/2"
																				inputClassName="!p-2 !h-8"
																				placeholder="Please specify"
																				disabled={
																					!watch(
																						data?.name
																					)
																				}
																				{...register('specify_heent')}
																			/>
																		) : (
																			""
																		)}
																	</td>
																</tr>
															);
														}
													)}
												</tbody>
												</div>
												<div className='mt-2'>
												<thead>
													<tr>
														<th className="w-1/4 ">
															D. GENITOURINARY
															<span className="text-danger ml-1">
																				*
															</span>
															{genitourinaryLib.some((data) => errors[data?.name]) && (
																<p className="text-red-500 text-xs mt-1">
																This field is required
																</p>
															)}
														</th>
													</tr>
												</thead>
												<tbody>
													{genitourinaryLib?.map(
														(data) => {
															const watchedValues = watch(genitourinaryLib.map((item) => item.name));
															const isDisabled = watchedValues.some((val, idx) => val && genitourinaryLib[idx].name !== data.name);
															return (
																<tr
																	key={`${keyByValue(
																		data?.value
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				disabled={isDisabled}
																				{...register(data?.name, {
																				validate: () =>
																					genitourinaryLib.some((item) => getValues(item?.name)) ||
																					"At least one must be selected",
																				})}
																			/>
																			<span>
																				{
																					data?.label
																				}
																			</span>
																		</label>
																		{data.name === 'others_genitourinary' ? (
																			<TextInputField
																				labelClassName="whitespace-nowrap"
																				className="flex items-center gap-4 w-1/2"
																				inputClassName="!p-2 !h-8"
																				placeholder="Please specify"
																				disabled={
																					!watch(
																						data?.name
																					)
																				}
																				{...register(
																								'specify_genitourinary'
																							)}
																			/>
																		) : (
																			""
																		)}
																	</td>
																</tr>
															);
														}
													)}
												</tbody>
												</div>
												<div className='mt-2'>
													<thead>
														<tr>
															<th className="w-1/4 ">
																G. ABDOMEN
																<span className="text-danger ml-1">
																					*
																</span>
																{abdomenLib.some((data) => errors[data?.name]) && (
																	<p className="text-red-500 text-xs mt-1">
																	This field is required
																	</p>
																)}
															</th>
														</tr>
													</thead>
													<tbody>
														{abdomenLib?.map(
															(data) => {
																const watchedValues = watch(abdomenLib.map((item) => item.name));
																const isDisabled = watchedValues.some((val, idx) => val && abdomenLib[idx].name !== data.name);
																return (
																	<tr
																		key={`${keyByValue(
																			data?.value
																		)}`}
																	>
																		<td className="!py-0 align-middle">

																			<label className=" mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																				<input
																					type="checkbox"
																					disabled={isDisabled}
																					{...register(data?.name, {
																					validate: () =>
																						abdomenLib.some((item) => getValues(item?.name)) ||
																						"At least one must be selected",
																					})}
																				/>
																				<span>
																					{
																						data?.label
																					}

																				</span>
																			</label>
																				{data.name === 'other_abdomen' ? (
																						<TextInputField
																							labelClassName="whitespace-nowrap"
																							className="flex items-center gap-4 w-1/2"
																							inputClassName="!p-2 !h-8"
																							placeholder="Please specify"
																							disabled={
																								!watch(
																									data?.name
																								)
																							}
																							{...register(
																								'specify_abdomen'
																							)}
																						/>
																					) : (
																						""
																					)}
																		</td>
																	</tr>
																);
															}
														)}
													</tbody>
													</div>
											</table>
											<table className="">
												<div>
												<thead>
													<tr>
														<th className="w-1/4">
															B. CHEST/BREAST/LUNGS
															<span className="text-danger ml-1">
																				*
															</span>
															{chestLib.some((data) => errors[data?.name]) && (
																<p className="text-red-500 text-xs mt-1">
																This field is required
																</p>
															)}
														</th>
													</tr>
												</thead>
												<tbody>
													{chestLib?.map(
														(data) => {
															const watchedValues = watch(chestLib.map((item) => item.name));
															const isDisabled = watchedValues.some((val, idx) => val && chestLib[idx].name !== data.name);

															return (
																<tr
																	key={`${keyByValue(
																		data?.value
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				disabled={isDisabled}
																				{...register(data?.name, {
																				validate: () =>
																					chestLib.some((item) => getValues(item?.name)) ||
																					"At least one must be selected",
																				})}
																			/>
																			<span>
																				{
																					data?.label
																				}
																			</span>
																		</label>
																		{data.name === 'others_chest' ? (
																			<TextInputField
																				labelClassName="whitespace-nowrap"
																				className="flex items-center gap-4 w-1/2"
																				inputClassName="!p-2 !h-8"
																				placeholder="Please specify"
																				disabled={
																					!watch(
																						data?.name
																					)
																				}
																				{...register(
																								'specify_chest'
																							)}
																			/>
																		) : (
																			""
																		)}
																	</td>
																</tr>
															);
														}
													)}
												</tbody>
												</div>
												<div className='mt-2'>
												<thead>
													<tr>
														<th className="w-1/4 ">
															E. DIGITAL RECTAL EXAMINATION
															<span className="text-danger ml-1">
																				*
															</span>
															{digitalRectalLib.some((data) => errors[data?.name]) && (
																<p className="text-red-500 text-xs mt-1">
																This field is required
																</p>
															)}
														</th>
													</tr>
												</thead>
												<tbody>
													{digitalRectalLib?.map(
														(data) => {
															const watchedValues = watch(digitalRectalLib.map((item) => item.name));
															const isDisabled = watchedValues.some((val, idx) => val && digitalRectalLib[idx].name !== data.name);
															return (
																<tr
																	key={`${keyByValue(
																		data?.value
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				disabled={isDisabled}
																				{...register(data?.name, {
																				validate: () =>
																					digitalRectalLib.some((item) => getValues(item?.name)) ||
																					"At least one must be selected",
																				})}
																			/>
																			<span>
																				{
																					data?.label
																				}
																			</span>
																		</label>
																		{data.name === 'others_digital' ? (
																			<TextInputField
																				labelClassName="whitespace-nowrap"
																				className="flex items-center gap-4 w-1/2"
																				inputClassName="!p-2 !h-8"
																				placeholder="Please specify"
																				disabled={
																					!watch(
																						data?.name
																					)
																				}
																				{...register(
																								'specify_digital'
																							)}
																			/>
																		) : (
																			""
																		)}
																	</td>
																</tr>
															);
														}
													)}
												</tbody>
												</div>
												<div className='mt-2'>
													<thead>
														<tr>
															<th className="w-1/4 ">
																H. NEUROLOGY
																<span className="text-danger ml-1">
																					*
																</span>
																{neuroLib.some((data) => errors[data?.name]) && (
																	<p className="text-red-500 text-xs mt-1">
																	This field is required
																	</p>
																)}
															</th>
														</tr>
													</thead>
													<tbody>
														{neuroLib?.map(
															(data) => {
																const watchedValues = watch(neuroLib.map((item) => item.name));
																const isDisabled = watchedValues.some((val, idx) => val && neuroLib[idx].name !== data.name);
																return (
																	<tr
																		key={`${keyByValue(
																			data?.value
																		)}`}
																	>
																		<td className="!py-0 align-middle">
																			
																			<label className=" mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																				<input
																					type="checkbox"
																					disabled={isDisabled}
																					{...register(data?.name, {
																					validate: () =>
																						neuroLib.some((item) => getValues(item?.name)) ||
																						"At least one must be selected",
																					})}
																				/>
																				<span>
																					{
																						data?.label
																					}
																					
																				</span>
																			</label>
																			{data.name === 'others_neuro' ? (
																				<TextInputField
																					labelClassName="whitespace-nowrap"
																					className="flex items-center gap-4 w-1/2"
																					inputClassName="!p-2 !h-8"
																					placeholder="Please specify"
																					disabled={
																						!watch(
																							data?.name
																						)
																					}
																					{...register(
																								'specify_neuro'
																							)}
																				/>
																			) : (
																				""
																			)}
																		</td>
																	</tr>
																);
															}
														)}
													</tbody>
													</div>
											</table>
											<table className="">
												<div>
												<thead>
													<tr>
														<th className="w-1/4">
															C. HEART
															<span className="text-danger ml-1">
																				*
															</span>
															{heartLib.some((data) => errors[data?.name]) && (
																<p className="text-red-500 text-xs mt-1">
																This field is required
																</p>
															)}
														</th>
													</tr>
												</thead>
												<tbody>
													{heartLib?.map(
														(data) => {
															const watchedValues = watch(heartLib.map((item) => item.name));
															const isDisabled = watchedValues.some((val, idx) => val && heartLib[idx].name !== data.name);
															return (
																<tr
																	key={`${keyByValue(
																		data?.value
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				disabled={isDisabled}
																				{...register(data?.name, {
																				validate: () =>
																					heartLib.some((item) => getValues(item?.name)) ||
																					"At least one must be selected",
																				})}
																			/>
																			<span>
																				{
																					data?.label
																				}
																			</span>
																		</label>
																		{data.name === 'others_heart' ? (
																			<TextInputField
																				labelClassName="whitespace-nowrap"
																				className="flex items-center gap-4 w-1/2"
																				inputClassName="!p-2 !h-8"
																				placeholder="Please specify"
																				disabled={
																					!watch(
																						data?.name
																					)
																				}
																				{...register(
																								'specify_heart'
																							)}
																			/>
																		) : (
																			""
																		)}
																	</td>
																</tr>
															);
														}
													)}
												</tbody>
												</div>
												<div className='mt-2'>
												<thead>
													<tr>
														<th className="w-1/4 ">
															D. SKIN/EXTREMITIES
															<span className="text-danger ml-1">
																				*
															</span>
															{skinLib.some((data) => errors[data?.name]) && (
																<p className="text-red-500 text-xs mt-1">
																This field is required
																</p>
															)}
														</th>
													</tr>
												</thead>
												<tbody>
													{skinLib?.map(
														(data) => {
															const watchedValues = watch(skinLib.map((item) => item.name));
															const isDisabled = watchedValues.some((val, idx) => val && skinLib[idx].name !== data.name);
															return (
																<tr
																	key={`${keyByValue(
																		data?.value
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		
																		<label className=" mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				disabled={isDisabled}
																				{...register(data?.name, {
																				validate: () =>
																					skinLib.some((item) => getValues(item?.name)) ||
																					"At least one must be selected",
																				})}
																			/>
																			<span>
																				{
																					data?.label
																				}
																				
																			</span>
																		</label>
																		{data.name === 'others_skin' ? (
																			<TextInputField
																				labelClassName="whitespace-nowrap"
																				className="flex items-center gap-4 w-1/2"
																				inputClassName="!p-2 !h-8"
																				placeholder="Please specify"
																				disabled={
																					!watch(
																						data?.name
																					)
																				}
																				{...register(
																								'specify_skin'
																							)}
																			/>
																		) : (
																			""
																		)}
																	</td>
																</tr>
															);
														}
													)}
												</tbody>
												</div>
											</table>
										</div>
						</div>
					</div>

					<div className="p-5 rounded-xl flex flex-col border">
					<div>
						<h4 className="text-md text-indigo-800 font-bold mb-0">
						Add Diagnosis
						</h4>
						<span className="text-slate-500 text-sm">
						Select diagnosis to add to patient
						</span>
					</div>
					
					<div className="flex flex-col">
						<div className="flex flex-col">
							<div className="table">
								<table className="mb-5">
									<thead>
										<tr>
											<td className="font-medium">
												Diagnosis Information
											</td>
											
											<td className="text-center w-[100px]">
												Action
											</td>
										</tr>
									</thead>
									<tbody>
										{selectedDiagnosis?.map((selectedDiagnos) => {
											return (
												<>
													<tr
														key={`selectedDiagnos-${selectedDiagnos?.id}`}
													>
														<td className="w-3/5">
															<ReactSelectInputField
																isClearable={true}
																// isLoading={
																// 	isSelectorLoading
																// }
																inputClassName=" "
																value={
																	selectedDiagnos
																		?.diag?.id
																}
																onChangeGetData={(
																	data
																) => {
																	console.log(
																		"data",
																		data
																	);
																	updateDiagnosis(
																		selectedDiagnos?.id,
																		data
																	);
																}}
																label="Select Diagnosis"
																placeholder={`Select Diagnosis`}
																options={caseCode?.map(
																	(diag) => ({
																		label: diag?.case_description,
																		value: diag?.id,
																		description:
																			(
																				<div className="flex flex-col">
																					<span>
																						CODE:{" "}
																						{
																							diag?.case_code
																						}
																					</span>
																					<span>
																						DESCRIPTION:{" "}
																						{
																							diag?.case_description
																						}
																					</span>
																				</div>
																			),
																		diag: diag,
																	})
																)}
															/>
															<div className="flex items-center gap-4 p-4 divide-x">
																<div className="flex flex-col mt-2">
																	<span className="font-bold mb-1">
																		ICD 10 Code
																	</span>
																	<span>
																		{
																			selectedDiagnos
																				?.diag
																				?.case_code
																		}
																	</span>
																</div>
																<div className="flex flex-col mt-2 pl-4">
																	<span className="font-bold mb-1">
																		ICD 10
																		Description
																	</span>
																	<span>
																		{
																			selectedDiagnos
																				?.diag
																				?.case_description
																		}
																	</span>
																</div>
															</div>
														</td>
														<td>
															<div className="flex items-center justify-center gap-2">
																<ActionBtn
																	type="danger"
																	size="sm"
																	onClick={() => {
																		removeDiagnosis(
																			selectedDiagnos?.id
																		);
																	}}
																>
																	<FlatIcon icon="rr-trash" />
																	Remove
																</ActionBtn>
															</div>
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
														onClick={addNewDiagnosis}
													>
														<FlatIcon icon="rr-square-plus" />
														Click to add more diagnosis
													</ActionBtn>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
								{selectedItems?.length == 0 ? (
									<p className="my-4 text-red-700 text-center">
										Please select Diagnosis to Add Cases.
									</p>
								) : (
									""
								)}
								
							</div>
						</div>
					</div>
					</div>
					<div className="p-5 rounded-xl flex flex-col border">
						<div className="mb-4">
							<h4 className="text-md text-indigo-800 font-bold mb-0">
							Management (Check if Done)
							</h4>
							<span className="text-slate-500 text-sm">
							Check management if Done
							</span>
						</div>
						<div className="flex flex-col">
						{planAndManagement?.map(
							(data) => {
								return (
									<tr
										key={`${keyByValue(
											data?.value
										)}`}
									>
										<td className="!py-0 align-middle">
											
											<label className=" mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
												<input
													type="checkbox"
													{...register(data?.name, {
													})}
												/>
												<span>
													{
														data?.label
													}
													
												</span>
											</label>
											{data.name === 'other_management' ? (
												<TextInputField
													labelClassName="whitespace-nowrap"
													className="flex items-center gap-4"
													inputClassName="!p-2 !h-8"
													placeholder="Please specify"
													disabled={
														!watch(
															data?.name
														)
													}
													{...register(
														`${data?.other_management}`
													)}
												/>
											) : (
												""
											)}
										</td>
									</tr>
								);
							}
						)}
						</div>
					</div>
					<div className="p-5 rounded-xl flex flex-col border">
						<div>
							<h4 className="text-md text-indigo-800  font-bold mb-0">
								Add Prescription
							</h4>
							<span className="text-slate-500 text-sm">
								Select items to add prescription to patient
							</span>
						</div>
						<div className="flex flex-col">
							<div className="table">
								<table className="mb-5">
									<thead>
										<tr>
											<td className="font-medium">
												Item Information
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
										{selectedItems?.map((selectedItem) => {
											return (
												<>
													<tr
														key={`selectedItem-${selectedItem?.id}`}
													>
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
															<div className="flex flex-col gap-2">
																<div className="flex items-center gap-4 p-4 divide-x">
																<div className="flex flex-col mt-2">
																	<span className="font-bold mb-1">
																		Drug Code
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
															<div className="flex items-center gap-4 p-4 divide-x">
																<div className="flex flex-col mt-2">
																	<span className="text-xs font-semibold mb-1">
																		Generic Code
																	</span>
																	<span>
																		{
																			selectedItem
																				?.item
																				?.gen_code
																		}
																	</span>
																</div>
																<div className="flex flex-col mt-2">
																	<span className="text-xs font-semibold mb-1">
																		Salt Code
																	</span>
																	<span>
																		{
																			selectedItem
																				?.item
																				?.salt_code
																		}
																	</span>
																</div>
																<div className="flex flex-col mt-2">
																	<span className="text-xs font-semibold mb-1">
																		Form Code
																	</span>
																	<span>
																		{
																			selectedItem
																				?.item
																				?.form_code
																		}
																	</span>
																</div>
																<div className="flex flex-col mt-2">
																	<span className="text-xs font-semibold mb-1">
																		Strength Code
																	</span>
																	<span>
																		{
																			selectedItem
																				?.item
																				?.strength_code
																		}
																	</span>
																</div>
																<div className="flex flex-col mt-2">
																	<span className="text-xs font-semibold mb-1">
																		Unit Code
																	</span>
																	<span>
																		{
																			selectedItem
																				?.item
																				?.unit_code
																		}
																	</span>
																</div>
																<div className="flex flex-col mt-2">
																	<span className="text-xs font-semibold mb-1">
																		Package Code
																	</span>
																	<span>
																		{
																			selectedItem
																				?.item
																				?.package_code
																		}
																	</span>
																</div>
																<div className="flex flex-col mt-2 pl-4">
																	<span className="text-xs font-semibold mb-1">
																		Price
																	</span>
																	<span>
																		{
																			selectedItem
																				?.item
																				?.price
																		}
																	</span>
																</div>
																<div className="flex flex-col mt-2 pl-4">
																	<span className="text-xs font-semibold mb-1">
																		Unit Measurement
																	</span>
																	<span>
																		{
																			selectedItem
																				?.item
																				?.unit_measurement
																		}
																	</span>
																</div>
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
															className="!pb-6"
														>
															<ReactQuillField
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
															/>
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
														onClick={addNewSelectedItem}
													>
														<FlatIcon icon="rr-square-plus" />
														Click to add more items
													</ActionBtn>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
								{selectedItems?.length == 0 ? (
									<p className="my-4 text-red-700 text-center">
										Please select items to add prescription.
									</p>
								) : (
									""
								)}
								
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-5 border p-5 rounded-xl">
						<div className="">
							<h4 className="text-md text-indigo-800  font-bold mb-4">
								Advice
							</h4>
							
							<TextAreaField
								error={
									errors?.treatment_plan
										?.message
								}
								className="rounded-xl"
								rows="4"
								placeholder="Treatment Plans..."
								{...register("treatment_plan", {
									required:
										"This field is required!",
								})}
							/>
							{/* <div className="mt-2">
							<OrderPlans 
							appointment={appointment}
							patient={patient}
							/>
							</div> */}
						</div>
					</div>
				
					{selectedItems?.length === 0 ? (
					<ActionBtn
						className="px-4 !rounded- mx-auto"
						type="success"
						disabled={loading}
						loading={loading}
						onClick={handleSubmit(onSubmitWithoutPrescription)}
					>
						<FlatIcon
						icon="br-check"
						className="mr-2 text-xl"
						/>
						SUBMIT WITHOUT PRESCRIPTION
					</ActionBtn>
					) : (
					<ActionBtn
						className="px-4 !rounded- mx-auto"
						type="success"
						disabled={loading}
						loading={loading}
						onClick={handleSubmit(onSubmit)}
					>
						<FlatIcon
						icon="br-check"
						className="mr-2 text-xl"
						/>
						SUBMIT
					</ActionBtn>
					)}
			</div>
		</>
	);
};

export default AddPrescription;

import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react'
import useNoBugUseEffect from '../../hooks/useNoBugUseEffect';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../libs/axios';
import { toast } from 'react-toastify';
import ActionBtn from '../buttons/ActionBtn';
import TextInputField from '../inputs/TextInputField';
import ReactSelectInputField from '../inputs/ReactSelectInputField';
import { geolocations, locations } from '../../libs/geolocations';
import PickMapLocation from '../PickMapLocation';
import CollapseDiv from '../CollapseDiv';
import { Dialog, Transition } from '@headlessui/react';

const UpdateAddressModal = (props, ref) => {
    const { patient, onSuccess } = props;
    const {
            register,
            getValues,
            setValue,
            control,
            reset,
            trigger,
            watch,
            handleSubmit,
            formState: { errors },
        } = useForm();
        const [mount, setMount] = useState(0);
        const [isSameAsPermanent, setIsSameAsPermanent] = useState(false);
        const [displayDelayed, setDisplayDelayed] = useState(false);
        const [modalOpen, setModalOpen] = useState(false);
        const [HUList, setHUList] = useState([]);
        const [loading, setLoading] = useState(false);
        const [provinceList, setProvinceList] = useState([]);
        const [municipalityList, setMunicipalityList] = useState([]);
        const [brgys, setBrgys] = useState([]);
        const [puroks, setPuroks] = useState([]);
        const permanentRegion = watch("region");
        const permanentProvince = watch("province");
        const permanentMunicipality = watch("municipality");
        const permanentBarangay = watch("barangay");
        const permanentPurok = watch("purok");
        const permanentZip = watch("zip_code");
        const permanentUnit = watch("unit");
        const permanentLot = watch("house_number");
        const permanentStreet = watch("street");
        const permanentSubdivision = watch("subdivision");
        const permanentCountry = watch("country");

        const [position, setPosition] = useState({
                lat: 6.0498006,
                lng: 125.15,
            });
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
        
            const show = (data) => {
                setTimeout(() => {
                    setDisplayDelayed(true);
                }, 1000);
                setModalOpen(true);
            };
            const hide = () => {
                setModalOpen(false);
            };
        const submit = (data) => {
            let formdata = new FormData();
            formdata.append("_method", "PATCH");
            formdata.append("barangay", data?.barangay || " ");
            formdata.append("city", data?.municipality || " ");
            formdata.append("province", data?.province || " ");
            formdata.append("municipality", data?.municipality || " ");
            formdata.append("zip_code", data?.zip_code || "");
            formdata.append("street", data?.street || " ");
            formdata.append("floor", data?.floor || " ");
            formdata.append("subdivision", data?.subdivision || " ");
            formdata.append("house_number", data?.house_number || " ");
            formdata.append("purok", data?.purok || " ");
            formdata.append("mobile", data?.mobile || " ");
            formdata.append("lat", data?.lat || " ");
            formdata.append("lng", data?.lng || " ");
            formdata.append("region", data?.region || " ");
            formdata.append("unit", data?.unit || " ");
            
            formdata.append("mailing_region", data?.mailing_region || " ");
            formdata.append("mailing_province", data?.mailing_province || " ");
            formdata.append("mailing_municipality", data?.mailing_municipality || "");
            formdata.append("mailing_barangay", data?.mailing_barangay || " ");
            formdata.append("mailing_purok", data?.mailing_purok || " ");
            formdata.append("mailing_zip", data?.mailing_zip || " ");
            formdata.append("mailing_unit", data?.mailing_unit || " ");
            formdata.append("mailing_house_number", data?.mailing_house_number || " ");
            formdata.append("mailing_street", data?.mailing_street || " ");
            formdata.append("mail_subdivision", data?.mail_subdivision || " ");
            formdata.append("mailing_country", data?.mailing_country || " ");
            
            Axios.post(`v1/opd-standalone/update-address/${patient?.id}`, formdata, {})
			.then((res) => {
				// return resolve(res.data);
				setTimeout(() => {
					toast.success("Update successfully!");
					hide();
				}, 400);

				if (onSuccess) {
					onSuccess();
				} 
				setLoading(false);
				
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				// return reject(err);
			});
        }
        console.log("Patient Data", patient)
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
							<Dialog.Panel className="w-full lg:max-w-6xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<div className="flex flex-col gap-y-4 relative">
									<div className="flex flex-col p-4 border-b">
										<span className="text-xl font-bold  text-blue-900">
											Update ADDRESS AND CONTACT DETAILS
										</span>
										<span className="text-sm font-light text-blue-900 ">
											Complete form to update the address
										</span>
									</div>
									<div className="px-4 pb-4">
										<div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
											<div className="col-span-12 flex items-center justify-center">
											</div>
											<div className="flex flex-col lg:col-span-12 gap-6">
												<CollapseDiv
													defaultOpen={true}
													title="II. ADDRESS DETAILS"
												>
													<div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4">
														<div className="lg:col-span-12">
															{displayDelayed ? (
																<PickMapLocation
																	position={
																		position
																	}
																	setPosition={(
																		pos
																	) => {
																		setPosition(
																			{
																				lat: pos.lat,
																				lng: pos.lng,
																			}
																		);
																		setValue(
																			"lat",
																			pos?.lat
																		);
																		setValue(
																			"lng",
																			pos?.lng
																		);
																	}}
																/>
															) : (
																""
															)}
														</div>
														<TextInputField
															label={
																<>
																	Latitude
																	<span className="text-danger ml-1">
																		*
																	</span>
																</>
															}
															placeholder="Latitude"
															className="lg:col-span-6"
															error={
																errors?.latitude
																	?.message
															}
															{...register(
																"lat",
																{
																	required:
																		"This field is required",
																}
															)}
														/>
														<TextInputField
															label={
																<>
																	Longitude
																	<span className="text-danger ml-1">
																		*
																	</span>
																</>
															}
															placeholder="Longitude"
															className="lg:col-span-6"
															error={
																errors
																	?.longitude
																	?.message
															}
															{...register(
																"lng",
																{
																	required:
																		"This field is required",
																}
															)}
														/>
														<div className="lg:col-span-12">
															<div className="lg:max-w-5xl mx-auto border m-4 mb-6 rounded-xl shadow">
																<div className="border-b p-4 font-bold bg-slate-100 rounded-t-xl">
																	<span>Permanent Address</span>
																</div>
																<div className="px-4">
																<div
																	className="p-4 gap-4 grid grid-cols-1 lg:grid-cols-12"
																>
																<div className="lg:col-span-4">
																	<Controller
																		name="region"
																		control={
																			control
																		}
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
																			fieldState:
																				{
																					invalid,
																					isTouched,
																					isDirty,
																					error,
																				},
																		}) => (
																			<ReactSelectInputField
																				isClearable={
																					false
																				}
																				label={
																					<>
																						Select
																						Region
																						<span className="text-danger ml-1">
																							*
																						</span>
																					</>
																				}
																				inputClassName=" "
																				ref={
																					ref
																				}
																				value={
																					value
																				}
																				onChange={
																					onChange
																				}
																				onChangeGetData={(
																					data
																				) => {
																					setProvinceList(
																						Object.keys(
																							data.province_list
																						).map(
																							(
																								key
																							) => {
																								return {
																									name: key,
																									...data
																										.province_list[
																										key
																									],
																								};
																							}
																						)
																					);
																				}} // send value to hook form
																				onBlur={
																					onBlur
																				} // notify when input is touched
																				error={
																					error?.message
																				}
																				placeholder="Select Region"
																				options={Object.values(
																					geolocations
																				).map(
																					(
																						loc
																					) => ({
																						value: loc?.region_name,
																						label: loc?.region_name,
																						province_list:
																							loc?.province_list,
																					})
																				)}
																			/>
																		)}
																	/>
																</div>
																<div className="lg:col-span-4">
																	<Controller
																		name="province"
																		control={
																			control
																		}
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
																			fieldState:
																				{
																					invalid,
																					isTouched,
																					isDirty,
																					error,
																				},
																		}) => (
																			<ReactSelectInputField
																				isClearable={
																					false
																				}
																				label={
																					<>
																						Select
																						Province
																						<span className="text-danger ml-1">
																							*
																						</span>
																					</>
																				}
																				inputClassName=" "
																				ref={
																					ref
																				}
																				value={
																					value
																				}
																				onChange={
																					onChange
																				} // send value to hook form
																				onChangeGetData={(
																					data
																				) => {
																					setMunicipalityList(
																						Object.keys(
																							data.municipality_list
																						).map(
																							(
																								key
																							) => {
																								return {
																									name: key,
																									...data
																										.municipality_list[
																										key
																									],
																								};
																							}
																						)
																					);
																				}}
																				onBlur={
																					onBlur
																				} // notify when input is touched
																				error={
																					error?.message
																				}
																				placeholder="Select Province"
																				options={provinceList.map(
																					(
																						province
																					) => ({
																						label: province?.name,
																						value: province?.name,
																						municipality_list:
																							province?.municipality_list,
																					})
																				)}
																			/>
																		)}
																	/>
																</div>
																<div className="lg:col-span-4">
																	<Controller
																		name="municipality"
																		control={
																			control
																		}
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
																			fieldState:
																				{
																					invalid,
																					isTouched,
																					isDirty,
																					error,
																				},
																		}) => (
																			<ReactSelectInputField
																				isClearable={
																					false
																				}
																				label={
																					<>
																						Select
																						Municipality
																						<span className="text-danger ml-1">
																							*
																						</span>
																					</>
																				}
																				placeholder="Select Municipality"
																				inputClassName="normal-case"
																				ref={
																					ref
																				}
																				value={
																					value
																				}
																				onChange={(
																					data
																				) => {
																					let selected_ =
																						locations?.find(
																							(
																								x
																							) =>
																								String(
																									x.name
																								).toLowerCase() ==
																								String(
																									data
																								).toLowerCase()
																						);
																					console.log(
																						"selected_selected_",
																						String(
																							data
																						).toLowerCase(),
																						selected_
																					);
																					// setBrgys(
																					// 	selected_?.barangays
																					// );
																					setValue(
																						"zip_code",
																						selected_?.zipcode ||
																							""
																					);
																					onChange(
																						data
																					);
																				}} // send value to hook form
																				onChangeGetData={(
																					data
																				) => {
																					setBrgys(
																						data.barangay_list.map(
																							(
																								key
																							) => {
																								return {
																									name: key,
																								};
																							}
																						)
																					);
																				}}
																				onBlur={
																					onBlur
																				} // notify when input is touched
																				error={
																					error?.message
																				}
																				options={municipalityList.map(
																					(
																						municipality
																					) => ({
																						label: municipality?.name,
																						value: municipality?.name,
																						barangay_list:
																							municipality?.barangay_list,
																					})
																				)}
																			/>
																		)}
																	/>
																</div>
																<div className="lg:col-span-4">
																	<Controller
																		name="barangay"
																		control={
																			control
																		}
																		rules={{
																			required: {
																				value: true,
																				message:
																					"This field is required",
																			},
																		}}
																		onChange={(
																			data
																		) => {}}
																		render={({
																			field: {
																				onChange,
																				onBlur,
																				value,
																				name,
																				ref,
																			},
																			fieldState:
																				{
																					invalid,
																					isTouched,
																					isDirty,
																					error,
																				},
																		}) => (
																			<ReactSelectInputField
																				isClearable={
																					false
																				}
																				label={
																					<>
																						Select
																						Barangay
																						<span className="text-danger ml-1">
																							*
																						</span>
																					</>
																				}
																				inputClassName=" "
																				ref={
																					ref
																				}
																				value={
																					value
																				}
																				onChange={(
																					data
																				) => {
																					let selected_ =
																						brgys?.find(
																							(
																								x
																							) =>
																								x.name ==
																								data
																						);
																					setPuroks(
																						selected_?.puroks
																					);
																					onChange(
																						data
																					);
																				}} // send value to hook form
																				onBlur={
																					onBlur
																				} // notify when input is touched
																				error={
																					error?.message
																				}
																				placeholder="Select Barangay"
																				options={brgys.map(
																					(
																						data
																					) => ({
																						label: data?.name,
																						value: data?.name,
																					})
																				)}
																			/>
																		)}
																	/>
																</div>
										
																<TextInputField
																	label={<>Purok</>}
																	placeholder="Enter Purok"
																	className="lg:col-span-4"
																	error={
																		errors?.zip_code
																			?.message
																	}
																	{...register(
																		"purok",
																		{
																			required:
																				"This field is required",
																		}
																	)}
																/>
																<TextInputField
																	label={<>ZIPCODE</>}
																	placeholder="ZIPCODE"
																	className="lg:col-span-4"
																	error={
																		errors?.zip_code
																			?.message
																	}
																	{...register(
																		"zip_code",
																		{
																			required:
																				"This field is required",
																		}
																	)}
																/>
																<TextInputField
																	label={
																		<>
																			UNIT/Room
																			No./Floor
																		</>
																	}
																	placeholder="UNIT/Room No./Floor"
																	className="lg:col-span-6"
																	
																	{...register(
																		"unit",
																		
																	)}
																/>
																<TextInputField
																	label={
																		<>
																			Lot/Blk/phase/House
																			No.
																		</>
																	}
																	placeholder="Lot/Blk/phase/House No."
																	className="lg:col-span-6"
																	
																	{...register(
																		"house_number",
																	
																	)}
																/>

																<TextInputField
																	label={<>Street</>}
																	placeholder="Street"
																	className="lg:col-span-6"
																	
																	{...register(
																		"street",
																		
																	)}
																/>

																<TextInputField
																	label={
																		<>Subdivision</>
																	}
																	placeholder="Subdivision"
																	className="lg:col-span-6"

																	{...register(
																		"subdivision",

																	)}
																/>

																<TextInputField
																	label={
																		<>
																			State in /
																			Country (if
																			abroad)
																		</>
																	}
																	placeholder="State in / Country"
																	className="lg:col-span-6"
																	defaultValue={
																		"Philippines"
																	}
																	error={
																		errors?.country
																			?.message
																	}
																	{...register(
																		"country",
																		{
																			required:
																				"This field is required",
																		}
																	)}
																/>
																</div>
																</div>
															</div>
															<div className="lg:max-w-5xl mx-auto m-4 mb-6">
																<label className="flex items-center gap-1 font-light text-sm">
																	<input
																	type="checkbox"
																	checked={isSameAsPermanent}
																	onChange={(e) => {
																		setIsSameAsPermanent(e.target.checked);
																		if (e.target.checked) {
																		// Manually update form state with permanent address values
																		setValue("mailing_region", permanentRegion);
																		setValue("mailing_province", permanentProvince);
																		setValue("mailing_municipality", permanentMunicipality);
																		setValue("mailing_barangay", permanentBarangay);
																		setValue("mailing_purok", permanentPurok);
																		setValue("mailing_zip", permanentZip);
																		setValue("mailing_unit", permanentUnit);
																		setValue("mailing_house_number", permanentLot);
																		setValue("mailing_street", permanentStreet);
																		setValue("mail_subdivision", permanentSubdivision);
																		setValue("mailing_country", permanentCountry);
																		} else {
																		// Clear the mailing address fields when unchecked
																		setValue("mailing_region", null);
																		setValue("mailing_province", null);
																		setValue("mailing_municipality", null);
																		setValue("mailing_barangay", null);
																		setValue("mailing_purok", null);
																		setValue("mailing_zip", null);
																		setValue("mailing_unit", null);
																		setValue("mailing_house_number", null);
																		setValue("mailing_street", null);
																		setValue("mail_subdivision", null);
																		setValue("mailing_country", null);
																		}
																	}}
																	/>
																	Same as Permanent Address
																</label>
																</div>
															
														
															<div className="lg:max-w-5xl mx-auto border m-4 mb-6 rounded-xl shadow">
															<div className="border-b p-4 font-bold bg-slate-100 rounded-t-xl">
																<span>Mailing Address</span>
															</div>
															<div className="px-4">
															<div
																className="p-4 gap-4 grid grid-cols-1 lg:grid-cols-12"
															>
															<div className="lg:col-span-4">
																<Controller
																	name="mailing_region"
																	control={
																		control
																	}
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
																		fieldState:
																			{
																				invalid,
																				isTouched,
																				isDirty,
																				error,
																			},
																	}) => (
																		<ReactSelectInputField
																			isClearable={
																				false
																			}
																			label={
																				<>
																					Select
																					Region
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			inputClassName=" "
																			ref={
																				ref
																			}
																			value={
																				value
																			}
																			onChange={
																				onChange
																			}
																			onChangeGetData={(
																				data
																			) => {
																				setProvinceList(
																					Object.keys(
																						data.province_list
																					).map(
																						(
																							key
																						) => {
																							return {
																								name: key,
																								...data
																									.province_list[
																									key
																								],
																							};
																						}
																					)
																				);
																			}} // send value to hook form
																			onBlur={
																				onBlur
																			} // notify when input is touched
																			error={
																				error?.message
																			}
																			placeholder="Select Province"
																			options={Object.values(
																				geolocations
																			).map(
																				(
																					loc
																				) => ({
																					value: loc?.region_name,
																					label: loc?.region_name,
																					province_list:
																						loc?.province_list,
																				})
																			)}
																		/>
																	)}
																/>
															</div>
															<div className="lg:col-span-4">
																<Controller
																	name="mailing_province"
																	control={
																		control
																	}
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
																		fieldState:
																			{
																				invalid,
																				isTouched,
																				isDirty,
																				error,
																			},
																	}) => (
																		<ReactSelectInputField
																			isClearable={
																				false
																			}
																			label={
																				<>
																					Select
																					Province
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			inputClassName=" "
																			ref={
																				ref
																			}
																			value={
																				value
																			}
																			onChange={
																				onChange
																			} // send value to hook form
																			onChangeGetData={(
																				data
																			) => {
																				setMunicipalityList(
																					Object.keys(
																						data.municipality_list
																					).map(
																						(
																							key
																						) => {
																							return {
																								name: key,
																								...data
																									.municipality_list[
																									key
																								],
																							};
																						}
																					)
																				);
																			}}
																			onBlur={
																				onBlur
																			} // notify when input is touched
																			error={
																				error?.message
																			}
																			placeholder="Select Province"
																			options={provinceList.map(
																				(
																					province
																				) => ({
																					label: province?.name,
																					value: province?.name,
																					municipality_list:
																						province?.municipality_list,
																				})
																			)}
																		/>
																	)}
																/>
															</div>
															<div className="lg:col-span-4">
																<Controller
																	name="mailing_municipality"
																	control={
																		control
																	}
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
																		fieldState:
																			{
																				invalid,
																				isTouched,
																				isDirty,
																				error,
																			},
																	}) => (
																		<ReactSelectInputField
																			isClearable={
																				false
																			}
																			label={
																				<>
																					Select
																					Municipality
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			placeholder="Select Municipality"
																			inputClassName="normal-case"
																			ref={
																				ref
																			}
																			value={
																				value
																			}
																			onChange={(
																				data
																			) => {
																				let selected_ =
																					locations?.find(
																						(
																							x
																						) =>
																							String(
																								x.name
																							).toLowerCase() ==
																							String(
																								data
																							).toLowerCase()
																					);
																				console.log(
																					"selected_selected_",
																					String(
																						data
																					).toLowerCase(),
																					selected_
																				);
																				// setBrgys(
																				// 	selected_?.barangays
																				// );
																				setValue(
																					"mailing_zip",
																					selected_?.zipcode ||
																						""
																				);
																				onChange(
																					data
																				);
																			}} // send value to hook form
																			onChangeGetData={(
																				data
																			) => {
																				setBrgys(
																					data.barangay_list.map(
																						(
																							key
																						) => {
																							return {
																								name: key,
																							};
																						}
																					)
																				);
																			}}
																			onBlur={
																				onBlur
																			} // notify when input is touched
																			error={
																				error?.message
																			}
																			options={municipalityList.map(
																				(
																					municipality
																				) => ({
																					label: municipality?.name,
																					value: municipality?.name,
																					barangay_list:
																						municipality?.barangay_list,
																				})
																			)}
																		/>
																	)}
																/>
															</div>
															<div className="lg:col-span-4">
																<Controller
																	name="mailing_barangay"
																	control={
																		control
																	}
																	rules={{
																		required: {
																			value: true,
																			message:
																				"This field is required",
																		},
																	}}
																	onChange={(
																		data
																	) => {}}
																	render={({
																		field: {
																			onChange,
																			onBlur,
																			value,
																			name,
																			ref,
																		},
																		fieldState:
																			{
																				invalid,
																				isTouched,
																				isDirty,
																				error,
																			},
																	}) => (
																		<ReactSelectInputField
																			isClearable={
																				false
																			}
																			label={
																				<>
																					Select
																					Barangay
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			inputClassName=" "
																			ref={
																				ref
																			}
																			value={
																				value
																			}
																			onChange={(
																				data
																			) => {
																				let selected_ =
																					brgys?.find(
																						(
																							x
																						) =>
																							x.name ==
																							data
																					);
																				setPuroks(
																					selected_?.puroks
																				);
																				onChange(
																					data
																				);
																			}} // send value to hook form
																			onBlur={
																				onBlur
																			} // notify when input is touched
																			error={
																				error?.message
																			}
																			placeholder="Select Barangay"
																			options={brgys.map(
																				(
																					data
																				) => ({
																					label: data?.name,
																					value: data?.name,
																				})
																			)}
																		/>
																	)}
																/>
															</div>
									
															<TextInputField
																label={<>Purok</>}
																placeholder="Enter Purok"
																className="lg:col-span-4"
																error={
																	errors?.mailing_purok
																		?.message
																}
																{...register(
																	"mailing_purok",
																	{
																		required:
																			"This field is required",
																	}
																)}
															/>
															<TextInputField
																label={<>ZIPCODE</>}
																placeholder="ZIPCODE"
																className="lg:col-span-4"
																error={
																	errors?.mailing_zip
																		?.message
																}
																{...register(
																	"mailing_zip",
																	{
																		required:
																			"This field is required",
																	}
																)}
															/>
															<TextInputField
																label={
																	<>
																		UNIT/Room
																		No./Floor
																	</>
																}
																placeholder="UNIT/Room No./Floor"
																className="lg:col-span-6"
																
																{...register(
																	"mailing_unit",
																	
																)}
															/>
															<TextInputField
																label={
																	<>
																		Lot/Blk/phase/House
																		No.
																	</>
																}
																placeholder="Lot/Blk/phase/House No."
																className="lg:col-span-6"
																
																{...register(
																	"mailing_house_number",
																	
																)}
															/>

															<TextInputField
																label={<>Street</>}
																placeholder="Street"
																className="lg:col-span-6"
																
																{...register(
																	"mailing_street",
																	
																)}
															/>

															<TextInputField
																label={
																	<>Subdivision</>
																}
																placeholder="Subdivision"
																className="lg:col-span-6"
																
																{...register(
																	"mail_subdivision",
																	
																)}
															/>

															<TextInputField
																label={
																	<>
																		State in /
																		Country (if
																		abroad)
																	</>
																}
																placeholder="State in / Country"
																className="lg:col-span-6"
																defaultValue={
																	"Philippines"
																}
																error={
																	errors?.mailing_country
																		?.message
																}
																{...register(
																	"mailing_country",
																	{
																		required:
																			"This field is required",
																	}
																)}
															/>
															</div>
															</div>
															</div>
															
														</div>
													
													</div>
												</CollapseDiv>
												
										
											</div>
										</div>
									</div>
								</div>
								<div className="px-4 py-2 flex items-center justify-center bg-slate-100 border-t">
									{/* <ActionBtn
										type="foreground-dark"
										className="ml-auto uppercase"
										onClick={hide}
									>
										Read more...
									</ActionBtn> */}
									<ActionBtn
										// type="danger"
										loading={loading}
										className="ml-4 "
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

export default forwardRef(UpdateAddressModal)

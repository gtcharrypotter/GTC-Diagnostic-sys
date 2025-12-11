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
import { geolocations, locations } from "../../../libs/geolocations";
import Axios from "../../../libs/axios";

const RHUListFormModal = (props, ref) => {
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
	const [healthUnit, setHealthUnit] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const [provinceList, setProvinceList] = useState([]);
	const [municipalityList, setMunicipalityList] = useState([]);
	const [brgys, setBrgys] = useState([]);
	const [puroks, setPuroks] = useState([]);

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
		setTimeout(() => {
			setValue("status", "active");
			setValue("type", "RHU");

			if (showData?.id) {
				setValue("name", showData?.name);
				setValue("type", showData?.type);
				setValue("region", showData?.region);
				setValue("province", showData?.province);
				setValue("municipality", showData?.municipality);
				setValue("barangay", showData?.barangay);
				setValue("status", showData?.status);
			}
		}, 500);
		setHealthUnit(showData);
	};
	const hide = () => {
		setModalOpen(false);
	};
	const nohide = () => {};

	const submit = (data) => {
		let formData = new FormData();

		formData.append("name", data?.name);
		formData.append("type", data?.type);
		formData.append("region", data?.region);
		formData.append("province", data?.province);
		formData.append("municipality", data?.municipality);
		formData.append("barangay", data?.barangay);
		formData.append("status", data?.status);

		let url = `v1/health-unit/store`;
		if (healthUnit?.id) {
			url = `v1/health-unit/update/${healthUnit?.id}`;
			formData.append("_method", "PATCH");
		}
		Axios.post(url, formData).then((res) => {
			setTimeout(() => {
				if (healthUnit?.id) {
					toast.success("Health Unit updated successfully!");
				} else {
					toast.success("Health Unit created successfully!");
				}
				if (onSuccess) {
					onSuccess();
				}
			}, 200);
			reset({
				name: "",
				type: "",
				region: "",
				province: "",
				municipality: "",
				barangay: "",
				status: "active",
			});
			hide();
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
							<Dialog.Panel className="w-full lg:max-w-xl transform overflow-visible rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className="py-3 px-4 flex flex-col border-b "
								>
									<span className="text-xl font-bold  text-blue-900">
										{healthUnit?.id
											? "Update "
											: "Create New "}{" "}
										Health Unit
									</span>
									<span className="text-sm font-light text-blue-900 ">
										Complete form to{" "}
										{healthUnit?.id
											? "update "
											: "create new "}{" "}
										Health Unit
									</span>
								</Dialog.Title>
								<div className="px-4 pt-5 pb-6 grid grid-cols-2 gap-6 relative">
									<TextInputField
										className="col-span-2"
										label="Name"
										placeholder="Enter health unit name"
										{...register("name", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<Controller
										name="type"
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
												label={
													<>
														Select Health Unit Type
														<span className="text-danger ml-1">
															*
														</span>
													</>
												}
												inputClassName=" "
												ref={ref}
												value={value}
												onChange={onChange}
												onBlur={onBlur} // notify when input is touched
												error={error?.message}
												placeholder="Select Health Unit Type"
												options={[
													// {
													// 	label: "Provincial Hospital (PH)",
													// 	value: "PH",
													// },
													{
														label: "Rural Health Unit (RHU)",
														value: "RHU",
													},
													// {
													// 	label: "Barangay Health Station (BHS)",
													// 	value: "BHS",
													// },
												]}
											/>
										)}
									/>

									<Controller
										name="status"
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
												label={
													<>
														Status
														<span className="text-danger ml-1">
															*
														</span>
													</>
												}
												inputClassName=" "
												ref={ref}
												value={value}
												onChange={onChange}
												onBlur={onBlur} // notify when input is touched
												error={error?.message}
												placeholder="Select Status"
												options={[
													{
														label: "Active",
														value: "active",
													},
													{
														label: "Inactive",
														value: "inactive",
													},
												]}
											/>
										)}
									/>

									<div className="">
										<Controller
											name="region"
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
													label={
														<>
															Select Region
															<span className="text-danger ml-1">
																*
															</span>
														</>
													}
													inputClassName=" "
													ref={ref}
													value={value}
													onChange={onChange}
													onChangeGetData={(data) => {
														setProvinceList(
															Object.keys(
																data.province_list
															).map((key) => {
																return {
																	name: key,
																	...data
																		.province_list[
																		key
																	],
																};
															})
														);
													}} // send value to hook form
													onBlur={onBlur} // notify when input is touched
													error={error?.message}
													placeholder="Select Province"
													options={Object.values(
														geolocations
													).map((loc) => ({
														value: loc?.region_name,
														label: loc?.region_name,
														province_list:
															loc?.province_list,
													}))}
												/>
											)}
										/>
									</div>
									<div className="">
										<Controller
											name="province"
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
													label={
														<>
															Select Province
															<span className="text-danger ml-1">
																*
															</span>
														</>
													}
													inputClassName=" "
													ref={ref}
													value={value}
													onChange={onChange} // send value to hook form
													onChangeGetData={(data) => {
														setMunicipalityList(
															Object.keys(
																data.municipality_list
															).map((key) => {
																return {
																	name: key,
																	...data
																		.municipality_list[
																		key
																	],
																};
															})
														);
													}}
													onBlur={onBlur} // notify when input is touched
													error={error?.message}
													placeholder="Select Province"
													options={provinceList.map(
														(province) => ({
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
									<div className="">
										<Controller
											name="municipality"
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
													label={
														<>
															Select Municipality
															<span className="text-danger ml-1">
																*
															</span>
														</>
													}
													placeholder="Select Municipality"
													inputClassName="normal-case"
													ref={ref}
													value={value}
													onChange={(data) => {
														let selected_ =
															locations?.find(
																(x) =>
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
														onChange(data);
													}} // send value to hook form
													onChangeGetData={(data) => {
														setBrgys(
															data.barangay_list.map(
																(key) => {
																	return {
																		name: key,
																	};
																}
															)
														);
													}}
													onBlur={onBlur} // notify when input is touched
													error={error?.message}
													options={municipalityList.map(
														(municipality) => ({
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
									<div className="">
										{/* <Controller
											name="barangay"
											control={control}
											rules={{
												required: {
													value: true,
													message:
														"This field is required",
												},
											}}
											onChange={(data) => {}}
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
													label={
														<>
															Select Barangay
															<span className="text-danger ml-1">
																*
															</span>
														</>
													}
													inputClassName=" "
													ref={ref}
													value={value}
													onChange={(data) => {
														let selected_ =
															brgys?.find(
																(x) =>
																	x.name ==
																	data
															);
														setPuroks(
															selected_?.puroks
														);
														onChange(data);
													}} // send value to hook form
													onBlur={onBlur} // notify when input is touched
													error={error?.message}
													placeholder="Select Barangay"
													options={brgys.map(
														(data) => ({
															label: data?.name,
															value: data?.name,
														})
													)}
												/>
											)}
										/> */}
									</div>
								</div>

								<div className="px-4 py-4 flex items-center justify-end bg-slate- border-t">
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

export default forwardRef(RHUListFormModal);

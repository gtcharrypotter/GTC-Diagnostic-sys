/* eslint-disable react/jsx-key */
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
import ActionBtn from "../buttons/ActionBtn";
import FlatIcon from "../FlatIcon";
import useClinic from "../../hooks/useClinic";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Img from "../Img";
import TextInput from "../inputs/TextInput";
import TextInputField from "../inputs/TextInputField";
import ReactSelectInputField from "../inputs/ReactSelectInputField";
import { calculateBMI, calculateBPMeasurement } from "../../libs/helpers";
import { useAuth } from "../../hooks/useAuth";
import Axios from "../../libs/axios";

const inputFields = [
	{
		label: "Body Temperature",
		name: "temperature",
		placeholder: "°C",
		className: "lg:col-span-4",
		type: "text",
		required: {
			value: true,
			message: "This field is required.",
		},
	},
	{
		name: "filler",
		className: "lg:col-span-8",
	},

	{
		label: "Blood Pressure (SYSTOLIC)",
		name: "blood_systolic",
		placeholder: "SYSTOLIC",
		className: "lg:col-span-4",
		type: "text",
		required: {
			value: true,
			message: "This field is required.",
		},
	},
	{
		label: "Blood Pressure (DIASTOLIC)",
		name: "blood_diastolic",
		placeholder: "DIASTOLIC",
		className: "lg:col-span-4",
		type: "text",
		required: {
			value: true,
			message: "This field is required.",
		},
	},
	{
		label: "BP Measurement",
		name: "bp_measurement",
		placeholder: "BP Measurement",
		className: "lg:col-span-4",
		type: "text",
	},
	{
		label: "Pulse Rate",
		name: "pulse",
		placeholder: "Enter Pulse Rate",
		className: "lg:col-span-4",
		type: "text",
	},

	{
		label: "Respiratory Rate",
		name: "respiratory",
		placeholder: "Enter Respiratory Rate",
		className: "lg:col-span-4",
		type: "text",
	},
	{
		name: "filler",
		className: "lg:col-span-4",
	},
	{
		label: "Patient height in cm",
		name: "height",
		placeholder: "Enter Patient height in CM",
		className: "lg:col-span-4",
		type: "text",
		required: {
			value: true,
			message: "This field is required.",
		},
	},
	{
		label: "Patient weight in KG",
		name: "weight",
		placeholder: "Enter Patient weight in KG",
		className: "lg:col-span-4",
		type: "text",
		required: {
			value: true,
			message: "This field is required.",
		},
	},
	{
		label: "BMI",
		name: "bmi",
		placeholder: "Enter BMI",
		className: "lg:col-span-4",
		type: "text",
	},
	{
		label: "Left Vision",
		name: "left_vision",
		placeholder: "Left Vision",
		className: "lg:col-span-4",
		type: "text",
	},
	{
		label: "Right Vision",
		name: "right_vision",
		placeholder: "Right Vision",
		className: "lg:col-span-4",
		type: "text",
	},
	{
		name: "filler",
		className: "lg:col-span-4",
	},
	{
		label: "Blood Type",
		name: "blood_type",
		placeholder: "Enter Blood Type",
		className: "lg:col-span-4",
		type: "text",
	},
	{
		label: "Oxygen saturation",
		name: "oxygen_saturation",
		placeholder: "Enter Oxygen saturation",
		className: "lg:col-span-4",
		type: "text",
	},
	{
		label: "Heart Rate",
		name: "heart_rate",
		placeholder: "Enter Heart Rate",
		className: "lg:col-span-4",
		type: "text",
	},
	{
		label: "Regular Rhythm",
		name: "regular_rhythm",
		placeholder: "Enter Regular Rhythm",
		className: "lg:col-span-4",
		type: "text",
	},
	{
		label: "Covid 19",
		name: "covid_19",
		placeholder: "Enter Covid 19",
		className: "lg:col-span-4",
		type: "select",
		options: [
			{
				label: "Positive",
				value: "positive",
			},
			{
				label: "Negative",
				value: "negative",
			},
		],
	},
	{
		label: "TB",
		name: "tb",
		placeholder: "Enter TB",
		className: "lg:col-span-4",
		type: "select",
		options: [
			{
				label: "Positive",
				value: "positive",
			},
			{
				label: "Negative",
				value: "negative",
			},
		],
	},
];
const UpdatePatientVitalsModal = (props, ref) => {
	const { logout, onSuccess } = props;
	const { user } = useAuth();
	const {
		register,
		getValues,
		setValue,
		control,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [mount, setMount] = useState(0);
	const [appointment, setAppointment] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [vitals, setVitals] = useState(null);
	const [loading, setLoading] = useState(false);
	const [patient, setPatient] = useState(null);
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

	const show = (data, appointmentData) => {
		setModalOpen(true);
		setPatient(data);

		setAppointment(appointmentData);
		getPatientVitals(data);
	};
	const hide = () => {
		setModalOpen(false);
	};

	const submit = (data) => {
		// if (appointment == null) {
		// 	callBack?.fn(data);
		// 	hide();
		// 	return;
		// }
		console.log("dataaaa", vitals, data);
		setLoading(true);
		let formData = new FormData();
		formData.append("patient_id", patient?.id);

		formData.append("temperature", data?.temperature);
		formData.append("pulse", data?.pulse);
		formData.append("blood_systolic", data?.blood_systolic);
		formData.append("blood_diastolic", data?.blood_diastolic);
		formData.append("respiratory", data?.respiratory);
		formData.append("height", data?.height);
		formData.append("weight", data?.weight);
		formData.append("bmi", data?.bmi);
		formData.append("height_for_age", data?.height_for_age || " ");
		formData.append("weight_for_age", data?.weight_for_age || " ");
		formData.append("blood_type", data?.blood_type || " ");
		formData.append("bloody_type", data?.blood_type || " ");
		formData.append("oxygen_saturation", data?.oxygen_saturation || " ");
		formData.append("heart_rate", data?.heart_rate || " ");
		formData.append("regular_rhythm", data?.regular_rhythm || " ");
		formData.append("covid_19", data?.covid_19 || " ");
		formData.append("tb", data?.tb);
		formData.append("right_vision", data?.right_vision);
		formData.append("left_vision", data?.left_vision);
		//pediatric
		formData.append("length", data?.length || " ");
		formData.append("head", data?.head || " ");
		formData.append("skinfold", data?.skinfold || " ");
		formData.append("waist", data?.waist || " ");
		formData.append("hip", data?.hip || " ");
		formData.append("limbs", data?.limbs || " ");
		formData.append("arm", data?.arm || " ");
		formData.append("added_by_id", user?.id);
		// console.log("submit", data);
		let last_vital_id = vitals?.data?.id || 0;
		let url = `v1/patient-vitals/store`;
		// ${vitals?.length == 0 ? "store" : ""}${
		// 	last_vital_id ? `/last_vital_id` : ""
		// }`;

		if (appointment?.id) {
			formData.append("appointment_id", appointment?.id);
		}
		if (last_vital_id) {
			// formData.append("_method", "PATCH");
		}
		console.log("FormData Object", formData); 
		Axios.post(url, formData)
			.then((res) => {
				// addToList(data);
				if (onSuccess) onSuccess();
				setTimeout(() => {
					setLoading(false);
					// onSucce ss();
					if (onSuccess) onSuccess();
					toast.success("Vitals updated successfully!");
				}, 400);
				hide();
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const getPatientVitals = (patientData) => {
		Axios.get(`v1/patient-vitals/vital-signs/${patientData?.id}`).then(
			(res) => {
				setVitals(res.data.data || []);
				console.log("ressss", res.data);
				let _vitals = res.data.data;
				if (_vitals) {
					console.log("ressss _vitals", _vitals);
					setValue("temperature", _vitals?.temperature);
					setValue("blood_systolic", _vitals?.blood_systolic);
					setValue("blood_diastolic", _vitals?.blood_diastolic);
					setValue("weight", _vitals?.weight, {
						shouldTouch: true,
						shouldValidate: true,
						shouldDirty: true,
					});
					setValue("height", _vitals?.height, {
						shouldTouch: true,
						shouldValidate: true,
						shouldDirty: true,
					});
					let bmi_ = calculateBMI(_vitals?.height, _vitals?.weight);
					setValue("respiratory", _vitals?.respiratory);
					setValue("uric_acid", _vitals?.uric_acid);
					setValue("cholesterol", _vitals?.cholesterol);
					setValue("glucose", _vitals?.glucose);
					setValue("pulse", _vitals?.pulse);

					setValue(
						"bmi",
						`${parseFloat(bmi_?.bmi || 0).toFixed(2)} - ${
							bmi_?.status || ""
						}`
					);
					setTimeout(() => {
						setValue("weight", _vitals?.weight, {
							shouldTouch: true,
							shouldValidate: true,
							shouldDirty: true,
						});
						setValue("height", _vitals?.height, {
							shouldTouch: true,
							shouldValidate: true,
							shouldDirty: true,
						});
						// setReady(true);
					}, 200);
					setValue("height_for_age", _vitals?.height_for_age);
					setValue("weight_for_age", _vitals?.weight_for_age);
					setValue("blood_type", _vitals?.bloody_type);
					setValue("bloody_type", _vitals?.bloody_type);
					setValue("oxygen_saturation", _vitals?.oxygen_saturation);
					setValue("heart_rate", _vitals?.heart_rate);
					setValue("regular_rhythm", _vitals?.regular_rhythm);
					setValue("covid_19", _vitals?.covid_19);
					setValue("tb", _vitals?.tb);
					setValue("right_vision", _vitals?.right_vision);
					setValue("left_vision", _vitals?.left_vision);
				}
			}
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
							<Dialog.Panel className="w-full lg:max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<div className="flex flex-col pt-5 px-4 border-b p-4">
									<span className="text-xl font-bold  text-blue-900">
										Patient Vitals Form
									</span>
									<span className="text-sm font-light text-blue-900 ">
										Update patient vitals
									</span>
								</div>
								<div className="pb-4 flex flex-col gap-y-4 relative">
									<div className="grid grid-cols-1 lg:grid-cols-12 p-4 gap-4">
										{inputFields?.map((data) => {
											if (data?.name == "bmi") {
												// calculateBMI
												console.log(
													'bmi_bmi_bmi_ watch("height")',
													watch("height"),
													watch("weight")
												);
												let bmi_ =
													calculateBMI(
														watch("height"),
														watch("weight")
													) || {};
												console.log(
													"bmi_bmi_bmi_",
													bmi_
												);
												return (
													<TextInputField
														type={"text"}
														inputClassName={`${bmi_?.bmi_color}`}
														className={`${data?.className} lg:!w-full ${bmi_?.bmi_color}`}
														label={<>BMI</>}
														value={`${parseFloat(
															bmi_?.bmi || 0
														).toFixed(2)} - ${
															bmi_?.status || ""
														}`}
														placeholder={
															data?.placeholder
														}
														error={
															errors[data?.name]
																?.message
														}
														helperText={""}
														{...register("bmi", {
															// required: true,
														})}
													/>
												);
											}
											//

											if (
												data?.name == "bp_measurement"
											) {
												// calculateBMI
												let bp_measurement =
													watch("blood_systolic")
														?.length &&
													watch("blood_diastolic")
														?.length
														? calculateBPMeasurement(
																watch(
																	"blood_systolic"
																),
																watch(
																	"blood_diastolic"
																)
														  )
														: {};
												console.log(
													"bp_measurement",
													bp_measurement
												);
												return (
													<TextInputField
														type={"text"}
														inputClassName={`${bp_measurement?.color}`}
														className={`${data?.className} lg:!w-full ${bp_measurement?.color}`}
														label={
															<>BP Measurement</>
														}
														value={`${
															bp_measurement?.result ||
															""
														}`}
														placeholder={
															data?.placeholder
														}
														error={
															errors[data?.name]
																?.message
														}
														helperText={""}
														{...register(
															"bp_measurement",
															{
																// required: true,
															}
														)}
													/>
												);
											}
											if (data?.name == "filler") {
												return (
													<div
														className={
															data?.className
														}
													></div>
												);
											}
											if (data?.type == "select") {
												return (
													<div
														className={
															data?.className
														}
													>
														<Controller
															name={data?.name}
															control={control}
															rules={{
																required:
																	data?.required
																		? data?.required
																		: false,
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
																fieldState: {
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
																			{
																				data?.label
																			}
																		</>
																	}
																	inputClassName=" "
																	ref={ref}
																	value={
																		value
																	}
																	onChange={(
																		val
																	) => {
																		onChange(
																			val
																		);
																	}} // send value to hook form
																	onBlur={
																		onBlur
																	} // notify when input is touched
																	error={
																		error?.message
																	}
																	placeholder={
																		data?.label
																	}
																	options={data?.options?.map(
																		(
																			option
																		) => ({
																			label: option?.label,
																			value: option?.value,
																		})
																	)}
																/>
															)}
														/>
													</div>
												);
											}
											return (
												<TextInputField
													type={data?.type}
													className={`${data?.className} lg:!w-full`}
													label={
														<>
															{data?.label}:{""}
														</>
													}
													placeholder={
														data?.placeholder
													}
													options={data?.options}
													error={
														errors[data?.name]
															?.message
													}
													helperText={""}
													{...register(data?.name, {
														required: data?.required
															? data?.required
															: false,
													})}
												/>
											);
										})}
									</div>
								</div>

								<div className="px-4 py-2 flex items-center justify-end bg-slate-100 border-t">
									<ActionBtn
										// type="danger"
										className="ml-4"
										onClick={handleSubmit(submit)}
									>
										Submit
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

export default forwardRef(UpdatePatientVitalsModal);

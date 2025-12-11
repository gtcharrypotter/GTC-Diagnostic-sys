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
import useNoBugUseEffect from "../../hooks/useNoBugUseEffect";

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
		label: "Height for Age",
		name: "height_for_age",
		placeholder: "Enter Height for Age",
		className: "lg:col-span-4",
		type: "text",
	},
	{
		label: "Weight for Age",
		name: "weight_for_age",
		placeholder: "Enter Weight for Age",
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
	{
		label: "Glucose",
		name: "glucose",
		placeholder: "Enter Glucose",
		className: "lg:col-span-4",
		type: "text",
	},
	{
		label: "Cholesterol",
		name: "cholesterol",
		placeholder: "Enter Cholesterol",
		className: "lg:col-span-4",
		type: "text",
	},
	{
		label: "Uric Acid",
		name: "uric_acid",
		placeholder: "Enter Uric Acid",
		className: "lg:col-span-4",
		type: "text",
	},
];
const UpdateVitalModalReferral = (props, ref) => {
	const { logout, isOnline, onSuccess } = props;
	const { user } = useAuth();
	const {
		register,
		getValues,
		setValue,
		control,
		watch,
		handleSubmit,
		reset,
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

	useNoBugUseEffect({
		functions: () => {
			if (!isOnline) {
				hide();
			}
		},
		params: [isOnline],
	});

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data, appointmentData) => {


		if(props.referralListRef){
			props.referralListRef.current.hide();
		}

		setModalOpen(true);

		setAppointment({
			id: data.id,
		});
		//getPatientVitals(data);

		console.log("vitall data", data.id);

		reset({
			temperature: data?.temperature,
			pulse: data?.pulse,
			blood_systolic: data?.blood_systolic,
			blood_diastolic: data?.blood_diastolic,
			respiratory: data?.respiratory,
			height: data?.height,
			weight: data?.weight,
			glucose: data?.glucose,
			uric_acid: data?.uric_acid,
			cholesterol: data?.cholesterol,
			bmi: data?.bmi,
			height_for_age: data?.height_for_age,
			weight_for_age: data?.weight_for_age,
			blood_type: data?.blood_type,
			bloody_type: data?.blood_type,
			oxygen_saturation: data?.oxygen_saturation,
			heart_rate: data?.heart_rate,
			regular_rhythm: data?.regular_rhythm,
			covid_19: data?.covid_19,
			tb: data?.tb,
		});
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
		console.log("dataaaa", appointment, data);
		setLoading(true);
		let formData = new FormData();

		formData.append("temperature", data?.temperature);
		formData.append("pulse", data?.pulse);
		formData.append("blood_systolic", data?.blood_systolic);
		formData.append("blood_diastolic", data?.blood_diastolic);
		formData.append("respiratory", data?.respiratory);
		formData.append("height", data?.height);
		formData.append("weight", data?.weight);
		formData.append("glucose", data?.glucose || 0);
		formData.append("uric_acid", data?.uric_acid || 0);
		formData.append("cholesterol", data?.cholesterol || 0);
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
		formData.append("update_by", user?.username);
		formData.append("_method", "PATCH");

		let url = `v1/update-vitals/${appointment?.id}`;

		Axios.post(url, formData)
			.then((res) => {
				// addToList(data);
				setTimeout(() => {
					setLoading(false);
					// onSucce ss();
					if (onSuccess) onSuccess();
					toast.success("Vitals updated successfully!");
				}, 400);
				hide();
				if(props.referralListRef){
					props.referralListRef.current.show();
				}
			})
			.finally(() => {
				setLoading(false);
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
							<Dialog.Panel className="w-full lg:max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all z-auto">
								<div className="flex flex-col pt-5 px-4 border-b p-4">
									<span className="text-xl font-bold  text-blue-900">
										Patient Vitals Form
									</span>
									<span className="text-sm font-light text-blue-900 ">
										Update patient vitals {appointment?.id}
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
														value={`${bp_measurement?.result}`}
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

export default forwardRef(UpdateVitalModalReferral);

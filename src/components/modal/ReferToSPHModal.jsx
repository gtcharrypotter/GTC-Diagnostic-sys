/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import {
	Fragment,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import ActionBtn from "../buttons/ActionBtn";
import FlatIcon from "../FlatIcon";
import useClinic from "../../hooks/useClinic";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Img from "../Img";
import { calculateBMI, calculateBPMeasurement, dataURItoBlob, dateOnlyToday, doctorName, doctorSpecialty } from "../../libs/helpers";
import ReferralListItem from "../../pages/patient-referrals/components/ReferralListItem";
import Axios from "../../libs/axios";
import TextInputField from "../inputs/TextInputField";
import ReactSelectInputField from "../inputs/ReactSelectInputField";
import PatientInfo from "../../pages/patients/components/PatientInfo";
import TextAreaField from "../inputs/TextAreaField";
import RadioInput from "../inputs/RadioInput";
import useNoBugUseEffect from "../../hooks/useNoBugUseEffect";
import { useAuth } from "../../hooks/useAuth";
import ReferralPrintingFormModal from "./ReferralPrintingFormModal";
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
		label: "BP (SYSTOLIC)",
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
		label: "BP (DIASTOLIC)",
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
const ReferToSPHModal = (props, ref) => {
	const { patient, setPatient, acceptPatientRef } = props;
	const { getDoctors, getDoctorsByHealthUnit, getTimeSlots } = useClinic();
	const printReferralRef = useRef();
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
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [isSelectorLoading, setIsSelectorLoading] = useState(false);
	const [HUList, setHUList] = useState([]);
	const [doctors, setDoctors] = useState([]);
	const coverage = watch("coverage");
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
                if (watch("location_type")) getHUList(watch("location_type"));
            },
            params: [watch("location_type")],
        });
	useNoBugUseEffect({
		functions: () => {
			if (watch("health_unit_id")) {
			setDoctors([]);
			getDoctorsByHealthUnit(watch("health_unit_id")).then((res) => {
				setDoctors(res.data.data ?? []); // keep this as is
			});
			}
		},
		params: [watch("health_unit_id")],
		});
	
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const getHUList = (type) => {
		Axios.get(`v1/health-unit/list?type=${type}`)
			.then((res) => {
				setHUList(res.data.data);
			})
			.finally(() => {});
	};
	const show = (data) => {
		setModalOpen(true);
		setPatient(data);
		getDoctors().then((res) => {
            setDoctors(res.data.data);
        });
	};
	const hide = () => {
		setModalOpen(false);
		reset();
	};

	const submit = (data) => {
		setLoading(true);
		console.log('Submit Referral', data)
		let formData = new FormData();
		formData.append("patient_id", patient?.id);
		formData.append("health_unit_id", data?.health_unit_id);
		formData.append("refer_by", data?.doctor_id || " ");
		formData.append("date_refer", data?.date_refer || " ");
		formData.append("time_refer", data?.time_refer || " ");
		formData.append("chief_complaint", data?.chief_complaint || " ");
		formData.append("brief_clinical", data?.brief_clinical || " ");
		formData.append("laboratory_findings", data?.laboratory_findings || " ");
		formData.append("impression", data?.impression || " ");
		formData.append("action_taken", data?.action_taken || " ");
		formData.append("coverage", data?.coverage || " ");
		formData.append("type_of_coverage", data?.type_of_coverage || " ");
		formData.append("reason_for_refer", data?.reason_for_refer || " ");

		formData.append("blood_type", data?.blood_type || " ");
        formData.append("blood_systolic", data?.blood_systolic);
		formData.append("blood_diastolic", data?.blood_diastolic);
		formData.append("temperature", data?.temperature);
		formData.append("pulse", data?.pulse);
		formData.append("respiratory", data?.respiratory);
        formData.append("glucose", data?.glucose || 0);
        formData.append("uric_acid", data?.uric_acid || 0);
        formData.append("cholesterol", data?.cholesterol || 0);
		formData.append("height", data?.height);
		formData.append("weight", data?.weight);
        formData.append("covid_19", data?.covid_19 || " ");
        formData.append("tuberculosis", data?.tb);
		formData.append("bmi", data?.bmi);
		formData.append("oxygen_saturation", data?.oxygen_saturation || " ");
		formData.append("heart_rate", data?.heart_rate || " ");
		formData.append("regular_rhythm", data?.regular_rhythm || " ");

		Axios.post(`/v1/opd-standalone/refer-to-sph`, formData)
		.then((res) => {
			toast.success("Patient successfully referred to SPH!");
			hide();
		})
		.catch((err) => {
			console.error(err);
			toast.error("Referral failed. Please try again.");
		})
		.finally(() => {
			setLoading(false);
		});
	};
	//  console.log('REFER APPOINTMENT DETAILS SPH', patient);
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
							<Dialog.Panel className="w-full lg:max-w-7xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<div className="p-4 flex flex-col gap-y-4 relative">
									<div className="flex flex-col border-b-2">
										<span className="text-xl font-bold  text-blue-900 ">
											Referral Form
										</span>
										<span className="text-xs  ">
											Complete Form to Refer the Patient to SPH
										</span>
									</div>
									<div className="flex flex-col gap-2">
										
										<div className="flex flex-col gap-4 border-b-2">
										<PatientInfo patient={patient} />	
										</div>	
										<div className="grid grid-cols-1 lg:grid-cols-2">
											<div className="lg:col-span-1">
												<h4 className=" text-base font-bold p-2 mb-4 lg:col-span-12">
													<span className='text-red-700 animate-none'>REFER TO FACILITY</span>
												</h4>
												<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
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
															label="Select Location Type"
															onChange={onChange}
															onBlur={onBlur} // notify when input is touched
															error={error?.message}
															placeholder="Select type"
															options={[
																{
																	label: "Rural Health Unit",
																	value: "RHU",
																	
																},
																{
																	label: "Sarangani Provincial Hospital",
																	value: "SPH",
																	
																},
															]}
														/>
													)}
												/>
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
															onChangeGetData={(
																data
															) => {}}
															inputClassName=" "
															ref={ref}
															value={value}
															onChange={onChange}
															onData
															label="Select Health Unit"
															onBlur={onBlur} // notify when input is touched
															error={error?.message}
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
										</div>

										<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 divide-x border-t-2">
											<div className="flex flex-col gap-4  p-2">
											<h4 className=" text-base font-semibold ">
												Patient Information
												</h4>
												<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
												<Controller
													name="doctor_id"
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
															isClearable={true}
															label={
																<>
																	Assign To Doctor
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
																setDoctor(data?.doctor);
															}} // send value to hook form
															onBlur={onBlur} // notify when input is touched
															error={error?.message}
															placeholder="Select Doctor"
															options={doctors?.map(
																(doctor) => ({
																	label: `${doctorName(
																		doctor
																	)}`,
																	value: doctor?.id,
																	doctor: doctor,
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
																})
															)}
														/>
													)}
												/>
												</div>
												<div className="flex gap-4">
												<TextInputField
													label="Date"
													type="date"
													className="w-1/2"
													error={errors?.date_refer?.message}
													{...register("date_refer", {
														required: "This field is required",
													})}
												/>
												<TextInputField
													label="Time"
													type="time"
													className="w-1/2"
													error={errors?.time_refer?.message}
													{...register("time_refer", {
														required: "This field is required",
													})}
												/>
												</div>
												<div className="flex flex-col mb-2">
													<label className="text-sm font-bold mb-2">
														Chief complaint
													</label>
													<TextAreaField
														error={
															errors?.chief_complaint
																?.message
														}
														className="rounded-xl"
														rows="2"
														placeholder="Enter reason for appointment..."
														{...register("chief_complaint", {
															required:
																"This field is required!",
														})}
													/>
												</div>
												<div className="flex flex-col mb-2">
													<label className="text-sm font-bold mb-2">
														Brief Clinical History and Pertinent Physical Examination
													</label>
													<TextAreaField
														error={
															errors?.brief_clinical
																?.message
														}
														className="rounded-xl"
														rows="2"
														placeholder="Enter reason for appointment..."
														{...register("brief_clinical", {
															required:
																"This field is required!",
														})}
													/>
												</div>
												<div className="flex flex-col mb-2">
													<label className="text-sm font-bold mb-2">
														Laboratory Findings (Including ECG, X-ray, and other diagnostic procedure)
													</label>
													<TextAreaField
														error={
															errors?.laboratory_findings
																?.message
														}
														className="rounded-xl"
														rows="2"
														placeholder="Enter reason for appointment..."
														{...register("laboratory_findings", {
															required:
																"This field is required!",
														})}
													/>
												</div>
												<div className="flex flex-col mb-2">
													<label className="text-sm font-bold mb-2">
														Impression
													</label>
													<TextAreaField
														error={
															errors?.impression
																?.message
														}
														className="rounded-xl"
														rows="2"
														placeholder="Enter reason for appointment..."
														{...register("impression", {
															required:
																"This field is required!",
														})}
													/>
												</div>
												<div className="flex flex-col mb-2">
													<label className="text-sm font-bold mb-2">
														Action Taken
													</label>
													<TextAreaField
														error={
															errors?.action_taken
																?.message
														}
														className="rounded-xl"
														rows="2"
														placeholder="Enter reason for appointment..."
														{...register("action_taken", {
															required:
																"This field is required!",
														})}
													/>
												</div>
												<div className="flex gap-4">
												<div className="flex flex-col">
													<h4 className=" text-base font-semibold ">
													Health Insurance Coverage
													</h4>
													<RadioInput

													>
														{[
															{
																label: "Yes",
																value: "yes",
															},
															{
																label: "No",
																value: "no",
															},
														]?.map(
															(
																option,
																indx
															) => {
																return (
																	<label
																		className="flex items-center gap-1 font-light text-sm"
																		key={`rdio-${option?.value}`}
																	>
																		<input
																			type="radio"
																			value={
																				option?.value
																			}
																			id={`irdio-${option?.value}`}
																			{...register(
																				"coverage",
																				
																			)}
																		/>
																		{
																			option?.label
																		}
																	</label>
																);
															}
														)}
													</RadioInput>
													</div>
													{coverage === "yes" && (
														<TextInputField
														label="If YES, state type of Coverage"
														className=" lg:col-span-6"
														{...register("type_of_coverage", {
															required: "This field is required when coverage is Yes",
														})}
														/>
													)}
												</div>
												<div className="flex flex-col mb-2">
													<label className="text-sm font-bold mb-2">
														Reason for Referral 
													</label>
													<TextAreaField
														error={
															errors?.reason_for_refer
																?.message
														}
														className="rounded-xl"
														rows="2"
														placeholder="Enter reason for appointment..."
														{...register("reason_for_refer", {
															required:
																"This field is required!",
														})}
													/>
												</div>
											</div>
											<div className="flex flex-col gap-4 p-2">
												<h4 className=" text-base font-semibold ">
												Patient Vitals
												</h4>
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
																<>
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
																</>
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
																<>
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
																</>
															);
														}
														if (data?.name == "filler") {
															return (
																<>
																<div
																	className={
																		data?.className
																	}
																></div>
																</>
															);
														}
														if (data?.type == "select") {
															return (
																<>
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
																</>
															);
														}
														return (
															<>
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
															</>
														);
													})}
													</div>
											</div>
											</div>
									</div>
									
								</div>

								<div className="px-4 pb-3 flex items-center justify-end bg-slate-">
									{/* <ActionBtn
										type="foreground-dark"
										className="ml-auto uppercase"
										onClick={hide}
									>
										Read more...
									</ActionBtn> */}
									<ActionBtn
										type="danger"
										className="mr-auto"
										onClick={hide}
									>
										Cancel
									</ActionBtn>
									<ActionBtn
									type="success"
									loading={loading}
									className="ml-auto"
									onClick={handleSubmit((formData) => {
										printReferralRef.current.show({
										...formData,
										patient, // include patient details
										});
									})}
									>
									Yes, CONFIRM!
									</ActionBtn>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
				<ReferralPrintingFormModal 
				ref={printReferralRef} 
				patient={patient} 
				onSubmit={(data) => {
					submit(data);
				}}/>
			</Dialog>
		</Transition>
	);
};

export default forwardRef(ReferToSPHModal);

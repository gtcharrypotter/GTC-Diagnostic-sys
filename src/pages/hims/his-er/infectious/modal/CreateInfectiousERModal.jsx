import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react'
import { useAuth } from '../../../../../hooks/useAuth';
import { Controller, useForm } from 'react-hook-form';
import { dataURItoBlob, getPhilHealth, keyByValue } from '../../../../../libs/helpers';
import Axios from '../../../../../libs/axios';
import { toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import FlatIcon from '../../../../../components/FlatIcon';
import PatientInfo from '../../../../patients/components/PatientInfo';
import ReactSelectInputField from '../../../../../components/inputs/ReactSelectInputField';
import ActionBtn from '../../../../../components/buttons/ActionBtn';
import { accessWasteOptions, covidSymptoms, ebolaSymptoms, environmentalHistories, generalHistories, influenzaSymptoms, medicalSurgicalHistories, meningococcalAdultSymptoms, rsvSymptoms, sanitaryOptions, symptoms, symptoms2, varicellaSymptoms } from '../../../../../libs/appointmentOptions';
import TextAreaField from '../../../../../components/inputs/TextAreaField';
import TextInputField from '../../../../../components/inputs/TextInputField';

const symtoms2_names = symptoms2?.map((data) => data?.name);
const CreateInfectiousERModal = (props, ref) => {
   const { onSuccess, patientSelfie} = props;
	const { user, checkUserType } = useAuth();
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
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [selected, setSelected] = useState(null);
	const [hasSymptoms, setHasSymptoms] = useState(0);
	const [selectedSymptoms, setSelectedSymptoms] = useState([]);
	// const operationProcedureRef = useRef(null);
	// const operationDeliveryRef = useRef(null);
	// const procedureChoiceRef = useRef(null);
  console.log("DATAAAAAAAAAAAAAAAAAAAAAAAAAA", modalData)
	const [selectedHU, setSelectedHU] = useState(null);
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
		// {patient: {}, appointment: {}}
		setModalOpen(true);
		setTimeout(() => {
			setValue("status", "active");
			setValue("mode_of_consultation", "walk-in-phic-member");
		}, 300);
		if (showData) {
			getHUList("RHU");
			setModalData(showData);
		} else {
			setModalData(null);
			reset({
				name: "",
			});
		}
	};
	const hide = () => {
		setModalOpen(false);
	};
	const nohide = () => {};

	const submit = (data) => {
		console.log("SUBMIT DATAAA---------------------------->>>>>>", data);
		// return;
		setLoading(true);
		const formData1 = new FormData();
		const formData = new FormData();
		formData1.append("rhu_id", user?.health_unit_id);
		formData1.append("for_infectious", user?.health_unit_id);
		formData1.append("notes", data?.notes);
		formData1.append("patient_id", modalData?.data?.patient?.id);
		formData1.append("disease", data?.disease);
		formData1.append("update_selfie", modalData?.update_selfie);
		formData1.append(
			"cough_for_3_weeks_or_longer",
			data?.cough_for_3_weeks_or_longer
		);
		formData1.append(
			"coughing_up_blood_or_mucus",
			data?.coughing_up_blood_or_mucus
		);
		formData1.append("chest_pain", data?.chest_pain);
		formData1.append(
			"pain_with_breathing_or_coughing",
			data?.pain_with_breathing_or_coughing
		);
		formData1.append("fever", data?.fever);
		formData1.append("chills", data?.chills);
		formData1.append("night_sweats", data?.night_sweats);
		formData1.append("weight_loss", data?.weight_loss);
		formData1.append("not_wanting_to_eat", data?.not_wanting_to_eat);
		formData1.append("tiredness", data?.tiredness);
		formData1.append(
			"not_feeling_well_in_general",
			data?.not_feeling_well_in_general
		);
		formData1.append(
			"chest_pain_discomfort_heaviness",
			data?.chest_pain_discomfort_heaviness
		);
		formData1.append("difficulty_breathing", data?.difficulty_breathing);
		formData1.append("seizure_convulsion", data?.seizure_convulsion);
		formData1.append(
			"unconscious_restless_lethargic",
			data?.unconscious_restless_lethargic
		);
		formData1.append(
			"not_oriented_to_time_person_place",
			data?.not_oriented_to_time_person_place
		);
		formData1.append(
			"bluish_discoloration_of_skin_lips",
			data?.bluish_discoloration_of_skin_lips
		);
		formData1.append(
			"act_of_self_harm_suicide",
			data?.act_of_self_harm_suicide
		);
		formData1.append(
			"acute_fracture_dislocation_injuries",
			data?.acute_fracture_dislocation_injuries
		);
		formData1.append("signs_of_abuse", data?.signs_of_abuse);
		formData1.append("severe_abdominal_pain", data?.severe_abdominal_pain);
		formData1.append("persistent_vomiting", data?.persistent_vomiting);
		formData1.append("persistent_diarrhea", data?.persistent_diarrhea);
		formData1.append(
			"unable_to_tolerate_fluids",
			data?.unable_to_tolerate_fluids
		);
		formData1.append("notes", data?.notes);
		formData1.append("history", data?.history);
		formData1.append("hypertension", data?.hypertension);
		formData1.append("stroke", data?.stroke);
		formData1.append("heart_disease", data?.heart_disease);
		formData1.append("high_cholesterol", data?.high_cholesterol);
		formData1.append("bleeding_disorders", data?.bleeding_disorders);
		formData1.append("diabetes", data?.diabetes);
		formData1.append("kidney_disease", data?.kidney_disease);
		formData1.append("liver_disease", data?.liver_disease);
		formData1.append("copd", data?.copd);
		formData1.append("asthma", data?.asthma);
		formData1.append(
			"mental_neurological_substance_abuse",
			data?.mental_neurological_substance_abuse
		);
		formData1.append("cancer", data?.cancer);
		formData1.append("others", data?.others);
		formData1.append("asthma_history", data?.asthma_history);
		formData1.append("allergies", data?.allergies);
		formData1.append("allergies_to_medicine", data?.allergies_to_medicine);
		formData1.append("immunization", data?.immunization);
		formData1.append("injuries_accidents", data?.injuries_accidents);
		formData1.append("hearing_problems", data?.hearing_problems);
		formData1.append("vision_problems", data?.vision_problems);
		formData1.append("heart_disease_history", data?.heart_disease_history);
		formData1.append(
			"neurological_substance_use_conditions",
			data?.neurological_substance_use_conditions
		);
		formData1.append("cancer_history", data?.cancer_history);
		formData1.append("other_organ_disorders", data?.other_organ_disorders);
		formData1.append(
			"previous_hospitalizations",
			data?.previous_hospitalizations
		);
		formData1.append("previous_surgeries", data?.previous_surgeries);
		formData1.append(
			"other_medical_surgical_history",
			data?.other_medical_surgical_history
		);
		formData1.append("intake_high_sugar", data?.intake_high_sugar);
		formData1.append("take_supplements", data?.take_supplements);
		formData1.append("deworming_6months", data?.deworming_6months);
		formData1.append("flouride_toothpaste", data?.flouride_toothpaste);
		formData1.append("physical_activity", data?.physical_activity);
		formData1.append("daily_screen_time", data?.daily_screen_time);
		formData1.append("violence_injuries", data?.violence_injuries);
		formData1.append("bully_harassment", data?.bully_harassment);
		formData1.append("safe_water", data?.safe_water);
		formData1.append(
			"access_to_sanitary_toilet",
			data?.access_to_sanitary_toilet
		);
		formData1.append(
			"satisfactory_waste_disposal",
			data?.satisfactory_waste_disposal
		);
		formData1.append(
			"prolong_exposure_biomass_fuel",
			data?.prolong_exposure_biomass_fuel
		);
		formData1.append("exposure_tabacco_vape", data?.exposure_tabacco_vape);
		formData1.append(
			"exposure_tabacco_vape_details",
			data?.exposure_tabacco_vape_details
		);
		formData1.append("disease", data?.disease);
		formData1.append("mode_of_consultation", data?.mode_of_consultation);
		formData1.append("phic_no", data?.phic_no);

		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
			// onUploadProgress: progressEvent => onProgress(progressEvent),
		};
		if (patientSelfie) {
			const file = dataURItoBlob(patientSelfie);

			formData1.append("patient_selfie", file);
		}
		if (selected == "tuberculosis") {
			formData.append(
				"cough_for_3_weeks_or_longer",
				data?.cough_for_3_weeks_or_longer
			);
			formData.append(
				"coughing_up_blood_or_mucus",
				data?.coughing_up_blood_or_mucus
			);
			formData.append(
				"pain_with_breathing_or_coughing",
				data?.pain_with_breathing_or_coughing
			);

			formData.append("chest_pain", data?.chest_pain);
			formData.append("fever", data?.fever);
			formData.append("chills", data?.chills);
			formData.append("night_sweats", data?.night_sweats);
			formData.append("weight_loss", data?.weight_loss);
			formData.append("not_wanting_to_eat", data?.not_wanting_to_eat);
			formData.append(
				"not_feeling_well_in_general",
				data?.not_feeling_well_in_general
			);
			formData.append("tiredness", data?.tiredness);
			formData.append("_method", "PATCH");
		}
		Axios.post(`/v1/clinic/appointments`, formData1, config)
			.then((res) => {
				if (selected == "tuberculosis") {
					Axios.post(
						`/v1/clinic/tb-symptoms/${res.data.data?.id}`,
						formData
					);
				}
				setTimeout(() => {
					setLoading(false);
					onSuccess && onSuccess();
					toast.success("New appointment successfully created!");
				}, 300);
				// setNewAppointment(false);
				hide();
			})
			.finally(() => {});
	};

	const [HUList, setHUList] = useState([]);
	const getHUList = (type) => {
		Axios.get(`v1/health-unit/list?type=${type}`)
			.then((res) => {
				setHUList(res.data.data);
			})
			.finally(() => {});
	};
	const openReferToRhu = () => {
		if (referToRHURef) {
			hide();
			referToRHURef.current.show({
				health_unit_id: watch("health_unit_id"),
				healthUnit: selectedHU,
				// appointment:
			});
		}
	};
	// const openReferToERInfectious = () => {
	// 	if (referToERInfectiousRef) {
	// 		hide();
	// 		referToERInfectiousRef.current.show({
	// 			health_unit_id: watch("health_unit_id"),
	// 			healthUnit: selectedHU,
	// 			// appointment:
	// 		});
	// 	}
	// };
  const handleCovidsymptomChange = (covidSymptoms, isChecked) => {
    let updatedSymptoms;
    if (isChecked) {
      updatedSymptoms = [...selectedSymptoms, covidSymptoms];
    } else {
      updatedSymptoms = selectedSymptoms.filter(s => s !== covidSymptoms);
    }
    setSelectedSymptoms(updatedSymptoms);
    // Update the TextAreaField with selected symptoms
    setValue("notes", updatedSymptoms.join(", "));
  };
  const handleInfluenzaSymptomChange = (influenzaSymptoms, isChecked) => {
    let updatedSymptoms;
    if (isChecked) {
      updatedSymptoms = [...selectedSymptoms, influenzaSymptoms];
    } else {
      updatedSymptoms = selectedSymptoms.filter(s => s !== influenzaSymptoms);
    }
    setSelectedSymptoms(updatedSymptoms);
    // Update the TextAreaField with selected symptoms
    setValue("notes", updatedSymptoms.join(", "));
  };
  const handleMeningococcalSymptomChange = (meningococcalAdultSymptoms, isChecked) => {
    let updatedSymptoms;
    if (isChecked) {
      updatedSymptoms = [...selectedSymptoms, meningococcalAdultSymptoms];
    } else {
      updatedSymptoms = selectedSymptoms.filter(s => s !== meningococcalAdultSymptoms);
    }
    setSelectedSymptoms(updatedSymptoms);
    // Update the TextAreaField with selected symptoms
    setValue("notes", updatedSymptoms.join(", "));
  };
  const handleTuberculosisSymptomChange = (tuberculosisSymptoms, isChecked) => {
    let updatedSymptoms;
    if (isChecked) {
      updatedSymptoms = [...selectedSymptoms, tuberculosisSymptoms];
    } else {
      updatedSymptoms = selectedSymptoms.filter(s => s !== tuberculosisSymptoms);
    }
    setSelectedSymptoms(updatedSymptoms);
    // Update the TextAreaField with selected symptoms
    setValue("notes", updatedSymptoms.join(", "));
  };
  const handleVaricellaSymptomChange = (varicellaSymptoms, isChecked) => {
    let updatedSymptoms;
    if (isChecked) {
      updatedSymptoms = [...selectedSymptoms, varicellaSymptoms];
    } else {
      updatedSymptoms = selectedSymptoms.filter(s => s !== varicellaSymptoms);
    }
    setSelectedSymptoms(updatedSymptoms);
    // Update the TextAreaField with selected symptoms
    setValue("notes", updatedSymptoms.join(", "));
  };
  const handleRSVSymptomChange = (rsvSymptoms, isChecked) => {
    let updatedSymptoms;
    if (isChecked) {
      updatedSymptoms = [...selectedSymptoms, rsvSymptoms];
    } else {
      updatedSymptoms = selectedSymptoms.filter(s => s !== rsvSymptoms);
    }
    setSelectedSymptoms(updatedSymptoms);
    // Update the TextAreaField with selected symptoms
    setValue("notes", updatedSymptoms.join(", "));
  };
  const handleEbolaSymptomChange = (ebolaSymptoms, isChecked) => {
    let updatedSymptoms;
    if (isChecked) {
      updatedSymptoms = [...selectedSymptoms, ebolaSymptoms];
    } else {
      updatedSymptoms = selectedSymptoms.filter(s => s !== ebolaSymptoms);
    }
    setSelectedSymptoms(updatedSymptoms);
    // Update the TextAreaField with selected symptoms
    setValue("notes", updatedSymptoms.join(", "));
  };
  return (
    <Transition appear show={modalOpen} as={Fragment}>
			<Dialog as="div" className="" onClose={nohide}>
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

				<div className="fixed inset-0 overflow-y-auto !z-[100] pb-[144px]">
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
							<Dialog.Panel className="w-full lg:max-w-[75vw] transform overflow-visible rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className="py-3 px-4 flex flex-col border-b "
								>
									<span className="text-xl font-bold  text-blue-900">
										Patient Infectious Triage Form
									</span>
									<span className="text-sm font-light text-blue-900 ">
										Complete form to create patient infectious appointment
									</span>

									<span
										className="bg-red-600 text-white h-12 px-4 gap-2 rounded-lg flex items-center justify-center right-4 absolute cursor-pointer hover:bg-red-800 duration-500"
										onClick={hide}
									>
										<FlatIcon icon="rr-cross" />
										CLOSE
									</span>
								</Dialog.Title>
								<div className="px-6 pt-5 pb-7 grid grid-cols-1 lg:grid-cols-12 gap-5 relative">
									<div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12">
										{modalData?.data?.patient ? (
											<div className="lg:col-span-12 flex flex-col pb-4">
												<h4 className="border-y-2 text-base font-bold p-2 mb-4">
													Patient Information
												</h4>
												<div className="flex !text-center gap-1">
													<PatientInfo
														patientSelfie={
															patientSelfie
														}
														patient={
															modalData?.data?.patient
														}
													/>
													{/* {checkUserType("ER") ? (
														<ActionBtn
															type="secondary"
															className="ml-auto h-14 !rounded-[30px] font-medium gap-2 px-4"
															onClick={() => {
																procedureChoiceRef.current.show();
															}}
														>
															<FlatIcon icon="bs-add-folder" />
															Create Operation
														</ActionBtn>
														// <ActionBtn
														// 	type="secondary"
														// 	className="ml-auto h-14 !rounded-[30px] font-medium gap-2 px-4"
														// 	onClick={() => {
														// 		operationProcedureRef.current.show(
														// 			patient,
														// 			appointment,
														// 		);
														// 		//privacyRef.current.show({ patient: patient });
														// 	console.log("patient id::", patient);
														// 	}}
														// >
														// 	<FlatIcon icon="rr-add" />
														// 	Create Operation Procedure
														// </ActionBtn>

													) : (
														""
													)} */}
													
												<div className="flex gap-4 ml-auto">
													<div className="flex flex-col items-center">
													
													<span className="text-gray-900 text-center text-sm font-bold">PHILHEALTH IDENTIFICATION NUMBER (PIN)</span>
														
													<span className="text-gray-900 text-center">{modalData?.data?.patient?.philhealth}</span>
													<span className="text-gray-900 text-center text-sm font-bold">({modalData?.patient?.patient_member_phic_type})</span>
													</div>
											</div>
										
												</div>
											</div>
										) : (
											""
										)}
										
									</div>
									
										<>
											<div className="lg:col-span-12">
												<h4 className="border-y-2 text-base font-bold p-2 mb-0">
													Appointment Information
												</h4>
											</div>
											<div className="lg:col-span-6">
												<div className="flex items-center mb-3">
													<div className="w-full">
														<Controller
															name="disease"
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
																	labelClassName="font-bold"
																	isClearable={
																		false
																	}
																	label={
																		<>
																			Infectious Type
																			<span className="text-danger ml-1">
																				*
																			</span>
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
																		console.log(
																			"onChangeonChange",
																			val
																		);
																		setSelected(
																			String(
																				val
																			).toLowerCase()
																		);
																		if (
																			onChange
																		) {
																			onChange(
																				val
																			);
																		}
																	}}
																	onBlur={
																		onBlur
																	} // notify when input is touched
																	error={
																		error?.message
																	}
																	placeholder="Infectious Type"
																	options={[
																		{
																			label: "COVID-19 (SARS-CoV-2)",
																			value: "Covid 19",
																		},
																		{
																			label: "Influenza (Seasonal)",
																			value: "Influenza",
																		},
																		{
																			label: "Meningococcal Meningitis (confirmed or suspected)",
																			value: "Meningococcal Meningitis",
																		},
																		{
																			label: "Tuberculosis (Pulmonary)",
																			value: "Tuberculosis",
																		},
																		{
																			label: "Varicella (Chickenpox/Disseminated Zoster/Single Dermatome Zoster in Immunocompromised Patient)",
																			value: "Varicella",
																		},
																		{
																			label: "Respiratory Syncytial Virus (RSV)",
																			value: "Respiratory Syncytial Virus",
																		},
																		{
																			label: "Ebola Virus",
																			value: "Ebola Virus",
																		}
																	]}
																/>
															)}
														/>
													</div>
												</div>
												
													{selected === "covid 19" ? (
														<div className="flex-col gap-3 pl-3">
														<h5 className="font-bold text-base mb-2">COVID-19 (SARS-CoV-2)</h5>
														<div className="flex flex-col gap-y-1 pl-2">
															{covidSymptoms?.map((data) => {
															const key = `${data?.value}`;
															return (
																<div className="flex flex-col" key={key}>
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																	type="checkbox"
																	{...register(key)}
																	onChange={(e) => handleCovidsymptomChange(data?.label, e.target.checked)}
																	/>
																	<span>{data?.label}</span>
																</label>
																</div>
															);
															})}
														</div>
														</div>
													) : (
														""
													)}
													{selected === "influenza" ? (
														<div className="flex-col gap-3 pl-3">
														<h5 className="font-bold text-base mb-2">Influenza (Seasonal)</h5>
														<div className="flex flex-col gap-y-1 pl-2">
															{influenzaSymptoms?.map((data) => {
															const key = `${data?.value}`;
															return (
																<div className="flex flex-col" key={key}>
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																	type="checkbox"
																	{...register(key)}
																	onChange={(e) => handleInfluenzaSymptomChange(data?.label, e.target.checked)}
																	/>
																	<span>{data?.label}</span>
																</label>
																</div>
															);
															})}
														</div>
														</div>
													) : (
														""
													)}
													{selected === "meningococcal meningitis" ? (
														<div className="flex-col gap-3 pl-3">
														<h5 className="font-bold text-base mb-2">Meningococcal Meningitis (confirmed or suspected)</h5>
														<div className="flex flex-col gap-y-1 pl-2">
															{meningococcalAdultSymptoms?.map((data) => {
															const key = `${data?.value}`;
															return (
																<div className="flex flex-col" key={key}>
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																	type="checkbox"
																	{...register(key)}
																	onChange={(e) => handleMeningococcalSymptomChange(data?.label, e.target.checked)}
																	/>
																	<span>{data?.label}</span>
																</label>
																</div>
															);
															})}
														</div>
														</div>
													) : (
														""
													)}
                          {selected === "tuberculosis" ? (
														<div className="flex-col gap-3 pl-3">
														<h5 className="font-bold text-base mb-2">Tuberculosis (Pulmonary)</h5>
														<div className="flex flex-col gap-y-1 pl-2">
															{symptoms?.map((data) => {
															const key = `${data?.value}`;
															return (
																<div className="flex flex-col" key={key}>
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																	type="checkbox"
																	{...register(key)}
																	onChange={(e) => handleTuberculosisSymptomChange(data?.label, e.target.checked)}
																	/>
																	<span>{data?.label}</span>
																</label>
																</div>
															);
															})}
														</div>
														</div>
													) : (
														""
													)}

													{selected === "varicella" ? (
														<div className="flex-col gap-3 pl-3">
														<h5 className="font-bold text-base mb-2">Varicella (Chickenpox/Disseminated Zoster/Single Dermatome Zoster in Immunocompromised Patient)</h5>
														<div className="flex flex-col gap-y-1 pl-2">
															{varicellaSymptoms?.map((data) => {
															const key = `${data?.value}`;
															return (
																<div className="flex flex-col" key={key}>
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																	type="checkbox"
																	{...register(key)}
																	onChange={(e) => handleVaricellaSymptomChange(data?.label, e.target.checked)}
																	/>
																	<span>{data?.label}</span>
																</label>
																</div>
															);
															})}
														</div>
														</div>
													) : (
														""
													)}
													{selected === "respiratory syncytial virus" ? (
														<div className="flex-col gap-3 pl-3">
														<h5 className="font-bold text-base mb-2">Respiratory Syncytial Virus (RSV)</h5>
														<div className="flex flex-col gap-y-1 pl-2">
															{rsvSymptoms?.map((data) => {
															const key = `${data?.value}`;
															return (
																<div className="flex flex-col" key={key}>
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																	type="checkbox"
																	{...register(key)}
																	onChange={(e) => handleRSVSymptomChange(data?.label, e.target.checked)}
																	/>
																	<span>{data?.label}</span>
																</label>
																</div>
															);
															})}
														</div>
														</div>
													) : (
														""
													)}
													{selected === "ebola virus" ? (
														<div className="flex-col gap-3 pl-3">
														<h5 className="font-bold text-base mb-2">Ebola Virus</h5>
														<div className="flex flex-col gap-y-1 pl-2">
															{ebolaSymptoms?.map((data) => {
															const key = `${data?.value}`;
															return (
																<div className="flex flex-col" key={key}>
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																	type="checkbox"
																	{...register(key)}
																	onChange={(e) => handleEbolaSymptomChange(data?.label, e.target.checked)}
																	/>
																	<span>{data?.label}</span>
																</label>
																</div>
															);
															})}
														</div>
														</div>
													) : (
														""
													)}
												
											</div>
											<div className="lg:col-span-6">
											
												<div className="flex flex-col mb-2">
													<label className="text-sm font-bold mb-2">
														Chief complaint
													</label>
													<TextAreaField
														error={
															errors?.notes
																?.message
														}
														className="rounded-xl"
														rows="2"
														disabled
														placeholder="Enter reason for appointment..."
														{...register("notes", {
															required:
																"This field is required!",
														})}
													/>
												</div>
											</div>
											
											<div className="lg:col-span-12">
												<div className="flex flex-col mb-3">
													<label className="text-base font-bold mb-1">
														History of present
														illness / Health problem
													</label>
													<TextAreaField
														error={
															errors?.history
																?.message
														}
														className="rounded-xl"
														rows="3"
														placeholder="Enter History of present illness / Health problem..."
														{...register(
															"history",
															{
																required:
																	"This field is required!",
															}
														)}
													/>
												</div>
											</div>
											<div className="lg:col-span-12">
												<h4 className="border-y-2 text-base font-bold p-2 mb-4">
													General History
												</h4>

												<div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4 px-2 w-full">
													<div className="flex flex-col lg:col-span-4">
														{generalHistories?.map(
															(data, index) => {
																if (index <= 4)
																	return (
																		<div
																			className="flex flex-col"
																			key={`${keyByValue(
																				data?.value
																			)}`}
																		>
																			<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																				<input
																					type="checkbox"
																					{...register(
																						data?.name
																					)}
																				/>
																				<span>
																					{
																						data?.label
																					}
																				</span>
																			</label>
																		</div>
																	);
															}
														)}
													</div>
													<div className="flex flex-col lg:col-span-3">
														{generalHistories?.map(
															(data, index) => {
																if (
																	index > 4 &&
																	index <= 9
																)
																	return (
																		<div
																			className="flex flex-col"
																			key={`${keyByValue(
																				data?.value
																			)}`}
																		>
																			<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																				<input
																					type="checkbox"
																					{...register(
																						data?.name
																					)}
																				/>
																				<span className="">
																					{
																						data?.label
																					}
																				</span>
																			</label>
																		</div>
																	);
															}
														)}
													</div>
													<div className="flex flex-col lg:col-span-5">
														{generalHistories?.map(
															(data, index) => {
																if (index > 9)
																	return (
																		<div
																			className="flex flex-col"
																			key={`${keyByValue(
																				data?.label
																			)}`}
																		>
																			<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																				<input
																					type="checkbox"
																					{...register(
																						data?.name
																					)}
																				/>
																				<span>
																					{
																						data?.label
																					}
																				</span>
																			</label>
																			{data?.specify ? (
																				<TextInputField
																					labelClassName="whitespace-nowrap"
																					className="flex items-center gap-4"
																					inputClassName="!p-2 !h-8"
																					label={`${data?.specify}:`}
																					placeholder="Please specify"
																					disabled={
																						!watch(
																							data?.name
																						)
																					}
																					{...register(
																						`${data?.name}_details`
																					)}
																				/>
																			) : (
																				""
																			)}
																		</div>
																	);
															}
														)}
													</div>
												</div>
											</div>

											{/* <div className="lg:col-span-12">
												<h4 className="border-y-2 text-base font-bold p-2 mb-3">
													Medical and Surgical History
												</h4>
												<div className="table table-bordered">
													<table className="bordered">
														<thead>
															<tr>
																<th className="w-1/3">
																	Click if
																	patient has
																	an
																	experience
																</th>
																<th>
																	Details
																	(i.e.
																	medications
																	taken, year
																	diagnosed,
																	year of
																	surgery or
																	injury,
																	etc.)
																</th>
															</tr>
														</thead>
														<tbody>
															{medicalSurgicalHistories?.map(
																(data) => {
																	return (
																		<tr
																			key={`${keyByValue(
																				data?.label
																			)}`}
																		>
																			<td className="!py-0 align-middle">
																				<label className=" mb-0 p-2 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																					<input
																						type="checkbox"
																						{...register(
																							data?.name,
																							{}
																						)}
																					/>
																					<span>
																						{
																							data?.label
																						}
																					</span>
																				</label>
																			</td>
																			<td className="p-1">
																				<TextInputField
																					inputClassName="bg-white"
																					placeholder={`${data?.label} details...`}
																					disabled={
																						!watch(
																							data?.name
																						)
																					}
																					{...register(
																						`${data?.name}_details`,
																						{}
																					)}
																				/>
																			</td>
																		</tr>
																	);
																}
															)}
														</tbody>
													</table>
												</div>
											</div> */}

											<div className="lg:col-span-12">
												<h4 className="border-y-2 text-base font-bold p-2 mb-4">
													Personal / Social history
												</h4>

												<div className="table table-bordered mb-4">
													<table>
														<tbody>
															<tr>
																<th
																	colSpan={3}
																	className="!text-blue-600"
																>
																	Diet,
																	feeding,
																	nutrition
																	(in most
																	days of the
																	week)
																</th>
															</tr>
															<tr>
																<td>
																	Intake of
																	high sugar
																	(chocolates,
																	pastries,
																	cakes,
																	softdrinks,
																	etc):
																</td>
																<td className="lg:w-1/4">
																	<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																		<input
																			type="radio"
																			value="no"
																			{...register(
																				"intake_high_sugar",
																				{}
																			)}
																		/>
																		<span>
																			No,
																			patient
																			follows
																			balanced
																			diet
																		</span>
																	</label>
																</td>
																<td className="lg:w-1/4">
																	<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																		<input
																			type="radio"
																			value="yes"
																			{...register(
																				"intake_high_sugar",
																				{}
																			)}
																		/>
																		<span>
																			Yes
																		</span>
																	</label>
																</td>
															</tr>

															<tr>
																<td>
																	Takes
																	supplements
																</td>
																<td colSpan={2}>
																	<div className="flex items-center gap-10">
																		<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="radio"
																				value="no"
																				{...register(
																					"take_supplements",
																					{}
																				)}
																			/>
																			<span>
																				No
																			</span>
																		</label>
																		<div className="flex items-center gap-2">
																			<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																				<input
																					type="radio"
																					value="yes"
																					{...register(
																						"take_supplements",
																						{}
																					)}
																				/>
																				<span>
																					Yes
																				</span>
																			</label>
																			<TextInputField
																				{...register(
																					"take_supplements_details",
																					{}
																				)}
																				disabled={
																					watch(
																						"take_supplements"
																					) !=
																					"yes"
																				}
																				inputClassName="bg-white"
																				placeholder="Specify..."
																			/>
																		</div>
																	</div>
																</td>
															</tr>
															<tr>
																<td>
																	Deworming
																	every 6
																	months (only
																	until age
																	12)
																</td>
																<td colSpan={2}>
																	<div className="flex items-center gap-10">
																		<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="radio"
																				value="no"
																				{...register(
																					"deworming_6months",
																					{}
																				)}
																			/>
																			<span>
																				No
																			</span>
																		</label>
																		<div className="flex items-center gap-2">
																			<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																				<input
																					type="radio"
																					value="yes"
																					{...register(
																						"deworming_6months",
																						{}
																					)}
																				/>
																				<span>
																					Yes
																				</span>
																			</label>
																			<TextInputField
																				inputClassName="bg-white"
																				disabled={
																					watch(
																						"deworming_6months"
																					) !=
																					"yes"
																				}
																				placeholder="Specify..."
																				{...register(
																					"deworming_6months_details",
																					{}
																				)}
																			/>
																		</div>
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
												</div>

												<div className="table table-bordered mb-4">
													<table>
														<tbody>
															<tr>
																<th
																	colSpan={3}
																	className="!text-blue-600"
																>
																	Oral health
																</th>
															</tr>

															<tr>
																<td>
																	Use of
																	flouride
																	toothpaste
																</td>
																<td>
																	<div className="flex items-center gap-10">
																		<label className="cursor-pointer mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="radio"
																				value="no"
																				{...register(
																					"flouride_toothpaste",
																					{}
																				)}
																			/>
																			<span>
																				No
																			</span>
																		</label>
																		<label className="cursor-pointer mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="radio"
																				value="yes"
																				{...register(
																					"flouride_toothpaste",
																					{}
																				)}
																			/>
																			<span>
																				Yes
																			</span>
																		</label>
																		<TextInputField
																			disabled={
																				watch(
																					"flouride_toothpaste"
																				) !=
																				"yes"
																			}
																			labelClassName="!mb-0 whitespace-nowrap"
																			className="flex flex-row items-center gap-2"
																			type="date"
																			label="Last dental check-up:"
																			inputClassName="bg-white"
																		/>
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
												</div>

												<div className="table table-bordered mb-4">
													<table>
														<tbody>
															<tr>
																<th
																	colSpan={3}
																	className="!text-blue-600"
																>
																	Physical
																	activity
																</th>
															</tr>
															<tr>
																<td>
																	<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																		<input
																			type="radio"
																			value="Sedentary"
																			{...register(
																				"physical_activity",
																				{}
																			)}
																		/>
																		<span>
																			Sedentary
																		</span>
																	</label>
																</td>
															</tr>
															<tr>
																<td>
																	<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																		<input
																			type="radio"
																			value="With supervised moderate"
																			{...register(
																				"physical_activity",
																				{}
																			)}
																		/>
																		<span>
																			With
																			supervised
																			moderate
																			to
																			vigorous
																			physical
																			activites
																			(brisk
																			walk,
																			jogging,
																			running,
																			bicycling,
																			etc.)
																			for
																			at
																			least
																			1
																			hour/day
																		</span>
																	</label>
																</td>
															</tr>
															<tr>
																<td>
																	<div className="flex flex-col">
																		<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="radio"
																				value="With vigorous-intensity"
																				{...register(
																					"physical_activity",
																					{}
																				)}
																			/>
																			<span>
																				With
																				vigorous-intensity
																				activities,
																				including
																				those
																				which
																				strengthen
																				the
																				muscle
																				and
																				bones,
																				at
																				least
																				3х
																				/
																				week
																			</span>
																		</label>
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
												</div>

												<div className="table table-bordered mb-4">
													<table>
														<tbody>
															<tr>
																<th
																	colSpan={3}
																	className="!text-blue-600"
																>
																	Daily screen
																	time
																</th>
															</tr>
															<tr>
																<td>
																	<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																		<input
																			type="radio"
																			value="no screen time"
																			{...register(
																				"daily_screen_time",
																				{}
																			)}
																		/>
																		<span>
																			No
																			screen
																			time
																		</span>
																	</label>
																</td>
																<td>
																	<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																		<input
																			type="radio"
																			value="less 1 hour"
																			{...register(
																				"daily_screen_time",
																				{}
																			)}
																		/>
																		<span>
																			{`< 1 hour sedentary screen time`}
																		</span>
																	</label>
																</td>
																<td>
																	<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																		<input
																			type="radio"
																			value="more 1 hour"
																			{...register(
																				"daily_screen_time",
																				{}
																			)}
																		/>
																		<span>
																			{`> 1 hour sedentary screen time`}
																		</span>
																	</label>
																</td>
															</tr>
														</tbody>
													</table>
												</div>

												<div className="table table-bordered mb-4">
													<table>
														<tbody>
															<tr>
																<th
																	colSpan={5}
																	className="!text-blue-600"
																>
																	Violence and
																	injuries
																</th>
															</tr>
															<tr>
																<td>
																	<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																		<input
																			type="radio"
																			value="none"
																			{...register(
																				"violence_injuries",
																				{}
																			)}
																		/>
																		<span>
																			None
																		</span>
																	</label>
																</td>
																<td>
																	<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																		<input
																			type="radio"
																			value="electrocution"
																			{...register(
																				"violence_injuries",
																				{}
																			)}
																		/>
																		<span>
																			Electrocution
																		</span>
																	</label>
																</td>
																<td>
																	<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																		<input
																			type="radio"
																			value="falls"
																			{...register(
																				"violence_injuries",
																				{}
																			)}
																		/>
																		<span>
																			Falls
																		</span>
																	</label>
																</td>
																<td>
																	<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																		<input
																			type="radio"
																			value="mauling"
																			{...register(
																				"violence_injuries",
																				{}
																			)}
																		/>
																		<span>
																			Mauling
																		</span>
																	</label>
																</td>
																<td>
																	<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																		<input
																			type="radio"
																			value="others"
																			{...register(
																				"violence_injuries",
																				{}
																			)}
																		/>
																		<span>
																			Others
																		</span>
																		<TextInputField
																			disabled={
																				watch(
																					"violence_injuries"
																				) !=
																				"others"
																			}
																			inputClassName="bg-white"
																			placeholder="Others..."
																			{...register(
																				"violence_injuries_details",
																				{}
																			)}
																		/>
																	</label>
																</td>
															</tr>
														</tbody>
													</table>
												</div>

												<div className="table table-bordered mb-4">
													<table>
														<tbody>
															<tr>
																<th
																	colSpan={5}
																	className="!text-blue-600"
																>
																	Bullying and
																	harassment
																</th>
															</tr>
															<tr>
																<td>
																	<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																		<input
																			type="radio"
																			value="none"
																			{...register(
																				"bully_harassment",
																				{}
																			)}
																		/>
																		<span>
																			None
																		</span>
																	</label>
																</td>
																<td>
																	<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																		<input
																			type="radio"
																			value="at home"
																			{...register(
																				"bully_harassment",
																				{}
																			)}
																		/>
																		<span>
																			At
																			home
																		</span>
																	</label>
																</td>
																<td>
																	<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																		<input
																			type="radio"
																			value="in school"
																			{...register(
																				"bully_harassment",
																				{}
																			)}
																		/>
																		<span>
																			In
																			school
																		</span>
																	</label>
																</td>
																<td>
																	<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																		<input
																			type="radio"
																			value="online"
																			{...register(
																				"bully_harassment",
																				{}
																			)}
																		/>
																		<span>
																			Online
																		</span>
																	</label>
																</td>
																<td>
																	<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																		<input
																			type="radio"
																			value="others"
																			{...register(
																				"bully_harassment",
																				{}
																			)}
																		/>
																		<span>
																			Others
																		</span>
																		<TextInputField
																			disabled={
																				watch(
																					"bully_harassment"
																				) !=
																				"others"
																			}
																			inputClassName="bg-white"
																			placeholder="Others..."
																			{...register(
																				"bully_harassment_details",
																				{}
																			)}
																		/>
																	</label>
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
											<div className="lg:col-span-12">
												<h4 className="border-y-2 text-base font-bold p-2 mb-4">
													Environmental History
												</h4>

												<span className="text-blue-600 text-sm font-bold px-2">
													Access to safe water
												</span>
												<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
													{environmentalHistories?.map(
														(data) => {
															return (
																<label
																	className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600"
																	key={`${keyByValue(
																		data?.label
																	)}`}
																>
																	<input
																		type="radio"
																		{...register(
																			"safe_water",
																			{}
																		)}
																		value={
																			data?.label
																		}
																	/>
																	<span>
																		{
																			data?.label
																		}
																	</span>
																</label>
															);
														}
													)}
												</div>

												<span className="text-blue-600 text-sm font-bold px-2">
													Access to sanitary toilet
												</span>
												<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
													{sanitaryOptions?.map(
														(data) => {
															return (
																<label
																	className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600"
																	key={`${keyByValue(
																		data?.label
																	)}`}
																>
																	<input
																		type="radio"
																		value={String(
																			data?.label
																		)
																			.toLowerCase()
																			.replace(
																				/\s/g,
																				""
																			)}
																		{...register(
																			"access_to_sanitary_toilet",
																			{}
																		)}
																	/>
																	<span>
																		{
																			data?.label
																		}
																	</span>
																</label>
															);
														}
													)}
												</div>
												<span className="text-blue-600 text-sm font-bold px-2">
													Access to satisfactory waste
													disposal
												</span>
												<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
													{accessWasteOptions?.map(
														(data) => {
															return (
																<label
																	className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600"
																	key={`${keyByValue(
																		data?.label
																	)}`}
																>
																	<input
																		type="radio"
																		{...register(
																			"satisfactory_waste_disposal",
																			{}
																		)}
																		value={String(
																			data?.label
																		)
																			.toLowerCase()
																			.replace(
																				/\s/g,
																				""
																			)}
																	/>
																	<span>
																		{
																			data?.label
																		}
																	</span>
																</label>
															);
														}
													)}
												</div>
												<span className="text-blue-600 text-sm font-bold px-2">
													Prolonged exposure to
													biomass fuel for cooking
													(charcoal, firewood,
													sawdust, animal manure, or
													crop residue)
												</span>
												<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
													<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
														<input
															type="radio"
															value="no"
															{...register(
																"prolong_exposure_biomass_fuel",
																{}
															)}
														/>
														<span>No</span>
													</label>
													<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
														<input
															type="radio"
															value="yes"
															{...register(
																"prolong_exposure_biomass_fuel",
																{}
															)}
														/>
														<span>Yes</span>
													</label>
												</div>
												<span className="text-blue-600 text-sm font-bold px-2">
													Exposure to tobacco or vape
												</span>
												<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
													<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
														<input
															type="radio"
															value="yes"
															{...register(
																"exposure_tabacco_vape",
																{}
															)}
														/>
														<span>No</span>
													</label>
													<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
														<input
															type="radio"
															value="yes"
															{...register(
																"exposure_tabacco_vape",
																{}
															)}
														/>
														<span>
															Yes, by whom?
														</span>
														<TextInputField
															placeholder="by whom?"
															{...register(
																"exposure_tabacco_vape_details",
																{}
															)}
														/>
													</label>
												</div>
											</div>
										</>
									
								</div>

								<div className="px-4 py-4 flex items-center justify-end bg-slate- border-t">
										<ActionBtn
											type="success"
											size="xl"
											loading={loading}
											className="ml-4"
											onClick={handleSubmit(submit)}
										>
											SUBMIT
										</ActionBtn>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
					{/* <ProcedureChoiceModal 
						ref={procedureChoiceRef}
						onClickSurgery={() => {
							operationProcedureRef.current.show({
							patient,
							// appointment,
						});
						}}
						onClickDelivery={() => {
							operationDeliveryRef.current.show({
							patient,
							// appointment,
						});
						}}
							
						/>
					<AddPatientOperation
						patient={patient}
						ref={operationProcedureRef}	
						// onSuccess={() => {
						// 	reloadData();
						// }}
					/>
					<AddPatientForDeliveryModal
						patient={patient}
						ref={operationDeliveryRef}	
						// onSuccess={() => {
						// 	reloadData();
						// }}
					/> */}
				</div>
			</Dialog>
		</Transition>
  )
}

export default forwardRef(CreateInfectiousERModal)

/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */

import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react'
import Axios from '../../../libs/axios';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import { v4 as uuidv4 } from "uuid";
import { chestLib, diabetesSymptoms, diarrheaSymptoms, digitalRectalLib, generalConsultation, genitourinaryLib, heartLib, heentLib, hypertensionSymptoms, infectiousSymptoms, lRISymptoms, malariaSymptoms, OthersSymptoms, skinLib, symptoms, uRISymptoms } from '../../../libs/appointmentOptions';
import { dataURItoBlob, dateYYYYMMDD, keyByValue } from '../../../libs/helpers';
import ActionBtn from '../../../components/buttons/ActionBtn';
import FlatIcon from '../../../components/FlatIcon';
import { Dialog, Transition } from '@headlessui/react';
import PatientInfo from '../../patients/components/PatientInfo';
import ReactSelectInputField from '../../../components/inputs/ReactSelectInputField';
import TextInputField from '../../../components/inputs/TextInputField';
import TextAreaField from '../../../components/inputs/TextAreaField';
import CollapseDiv from '../../../components/CollapseDiv';
import { toast } from 'react-toastify';

const infectiousSymptoms_names = infectiousSymptoms?.map((data) => data?.name);
const NewConsultationModal = (props, ref) => {
    const { screening, onSuccess, patientSelfie, referToSPHRef, } = props;
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
    const [HUList, setHUList] = useState([]);
	const [mount, setMount] = useState(0);
	
	const [modalData, setModalData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [consultDate, setConsultDate] = useState(dateYYYYMMDD());
	
	const [selectedMode, setSelectedMode] = useState(null);
	const [selected, setSelected] = useState(null);
	const [hasSymptoms, setHasSymptoms] = useState(0);
	const [selectedSymptoms, setSelectedSymptoms] = useState([]);
	const [selectedHU, setSelectedHU] = useState(null);
	const [isOthersSelected, setIsOthersSelected] = useState(false);
	const [atc, setATC] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
	const chunkedData = [[], [], []];
	const showOthers =  watch("Others") === true;
	generalConsultation?.forEach((item, index) => {
		const colIndex = Math.floor(index / 13);
		if (colIndex < 3) chunkedData[colIndex].push(item);
	  });
	useEffect(() => {
		let t = setTimeout(() => {
			setValue("atc_date", dateYYYYMMDD());
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
			// setValue("mode_of_consultation", "walk-in-phic-member");
		}, 300);
		if (showData) {
			getHUList('SA');
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

	const handleValidateATC = (data) => {
		setLoading(true);
		setValidationMessage("");

		Axios.post(`/v1/diagnostic/validate-atc`, { atc: data })
        .then((response) => {
            setValidationMessage("Validation Result: YES");
        })
        .catch((error) => {
            setValidationMessage(error.response?.data?.message || "Validation Result: NO");
        })
        .finally(() => {
            setLoading(false);
        });
	};
    const onSymptomsChecked = (name) => {
		console.log("onSymptomsChecked");
		setHasSymptoms(
			getValues(infectiousSymptoms_names).filter((x) => x == true).length
		);
	};
	const getHUList = (type) => {
		Axios.get(`v1/health-unit/list?type=${type}`)
			.then((res) => {
				setHUList(res.data.data);
			})
			.finally(() => {});
	};
    const handleSymptomChange = (symptom, isChecked) => {
    let updatedSymptoms;
    if (isChecked) {
      updatedSymptoms = [...selectedSymptoms, symptom];
    } else {
      updatedSymptoms = selectedSymptoms.filter(s => s !== symptom);
    }
    setSelectedSymptoms(updatedSymptoms);
    // Update the TextAreaField with selected symptoms
    setValue("notes", updatedSymptoms.join(", "));
    };
    const handleGeneralConsultChange = (GeneralConsult, isChecked) => {
        let updatedSymptoms;
        if (isChecked) {
        updatedSymptoms = [...selectedSymptoms, GeneralConsult];
        } else {
        updatedSymptoms = selectedSymptoms.filter(s => s !== GeneralConsult);
        }
        setSelectedSymptoms(updatedSymptoms);
        // Update the TextAreaField with selected symptoms
        setValue("notes", updatedSymptoms.join(", "));
		if (GeneralConsult.toLowerCase() === "others") {
        setIsOthersSelected(isChecked);
    }
    };
    const handleMalariaSymptomChange = (malariaSymptom, isChecked) => {
        let updatedSymptoms;
        if (isChecked) {
        updatedSymptoms = [...selectedSymptoms, malariaSymptom];
        } else {
        updatedSymptoms = selectedSymptoms.filter(s => s !== malariaSymptom);
        }
        setSelectedSymptoms(updatedSymptoms);
        // Update the TextAreaField with selected symptoms
        setValue("notes", updatedSymptoms.join(", "));
    };
    const handleDiabetesSymptomChange = (diabetesSymptom, isChecked) => {
        let updatedSymptoms;
        if (isChecked) {
        updatedSymptoms = [...selectedSymptoms, diabetesSymptom];
        } else {
        updatedSymptoms = selectedSymptoms.filter(s => s !== diabetesSymptom);
        }
        setSelectedSymptoms(updatedSymptoms);
        // Update the TextAreaField with selected symptoms
        setValue("notes", updatedSymptoms.join(", "));
    };
    const handleHypertensionSymptomChange = (hypertensionSymptom, isChecked) => {
        let updatedSymptoms;
        if (isChecked) {
        updatedSymptoms = [...selectedSymptoms, hypertensionSymptom];
        } else {
        updatedSymptoms = selectedSymptoms.filter(s => s !== hypertensionSymptom);
        }
        setSelectedSymptoms(updatedSymptoms);
        // Update the TextAreaField with selected symptoms
        setValue("notes", updatedSymptoms.join(", "));
    };
    const handleURISymptomChange = (uRISymptom, isChecked) => {
        let updatedSymptoms;
        if (isChecked) {
        updatedSymptoms = [...selectedSymptoms, uRISymptom];
        } else {
        updatedSymptoms = selectedSymptoms.filter(s => s !== uRISymptom);
        }
        setSelectedSymptoms(updatedSymptoms);
        // Update the TextAreaField with selected symptoms
        setValue("notes", updatedSymptoms.join(", "));
    };
    const handleLRISymptomChange = (lRISymptom, isChecked) => {
        let updatedSymptoms;
        if (isChecked) {
        updatedSymptoms = [...selectedSymptoms, lRISymptom];
        } else {
        updatedSymptoms = selectedSymptoms.filter(s => s !== lRISymptom);
        }
        setSelectedSymptoms(updatedSymptoms);
        // Update the TextAreaField with selected symptoms
        setValue("notes", updatedSymptoms.join(", "));
    };
    const handleDiarrheaSymptomChange = (diarrheaSymptom, isChecked) => {
        let updatedSymptoms;
        if (isChecked) {
        updatedSymptoms = [...selectedSymptoms, diarrheaSymptom];
        } else {
        updatedSymptoms = selectedSymptoms.filter(s => s !== diarrheaSymptom);
        }
        setSelectedSymptoms(updatedSymptoms);
        // Update the TextAreaField with selected symptoms
        setValue("notes", updatedSymptoms.join(", "));
    };

      const submit = (data) => {
		console.log("SUBMIT DATAAA---------------------------->>>>>>", modalData);
		setLoading(true);
		const formData1 = new FormData();
		const formData = new FormData();
		formData1.append("rhu_id", user?.health_unit_id);
		formData1.append("patient_id", modalData?.patient?.id);
		formData1.append("health_screening_assessment_id", modalData?.patient?.id);
		formData1.append("disease", data?.disease);
		formData1.append("pain_notes", data?.pain_notes);
		formData1.append("others_notes", data?.others_notes);
		formData1.append("general_survey_remarks", data?.general_survey_remarks);

		// formData1.append("notes", data?.notes);
		let notes = "";
	if (selected === "general consultation") {
		const checkedItems = generalConsultation
			.filter((item) => getValues(item.value))
			.map((item) => item.label);
		if (checkedItems.length > 0) {
			notes += `${checkedItems.join(", ")}`;
		}
	}

	if (data?.others) {
		notes += `${data.others}`;
	}

	formData1.append("notes", notes.trim());
		formData1.append("history", data?.history);
		
		formData1.append("mode_of_consultation", data?.mode_of_consultation);
		formData1.append("atc_consultation", data?.atc_consultation);
		formData1.append("atc_date", data?.atc_date);
		formData1.append("co_payment", data?.co_payment);
		formData1.append("consultation_date", data?.consultation_date);
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
		Axios.post(`/v1/diagnostic/second-tranch`, formData1, config)
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
					toast.success("successfully created!");
				}, 300);
				hide();
			})
			.finally(() => {});
	};
	const openReferToSPH = () => {
		if (referToSPHRef) {
			hide();
			referToSPHRef.current.show({
				health_unit_id: watch("health_unit_id"),
				healthUnit: selectedHU,
				// appointment:
			});
		}
	};
    console.log("for Consultation", screening)
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
										Consultation (Tranche 2)
									</span>
									<span className="text-sm font-light text-blue-900 ">
										Complete form for new Consultation
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
										{modalData?.patient ? (
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
															modalData?.patient
														}
													/>
													
                                                        
                                                    <div className="flex gap-4 ml-auto">
                                                        <div className="flex flex-col items-center">
                                                        
                                                        <span className="text-gray-900 text-center text-sm font-bold">PHILHEALTH IDENTIFICATION NUMBER (PIN)</span>
														<span className="text-gray-900 text-center">{modalData?.patient?.philhealth?.replace(/(\d{2})(\d{9})(\d{1})/, '$1-$2-$3')}</span>
														<span className="text-gray-900 text-center text-sm font-bold">({modalData?.patient?.patient_member_phic_type})</span>
                                                        </div>
														
                                                    </div>
										
												</div>
											</div>
										) : (
											""
										)}
										
										<div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4">
											<h4 className="border-y-2 text-base font-bold p-2 mb-0 lg:col-span-12">
												Patient Symptoms
											</h4>
											<div className="lg:col-span-6 flex flex-col gap-y-2">
												{infectiousSymptoms?.map(
													(data, index) => {
														if (index % 2 == 0)
															return (
																<label
																	className="mb-2 flex items-center text-base gap-2 text-gray-600 hover:bg-blue-100 duration-200 "
																	key={`${keyByValue(
																		data?.name
																	)}`}
																	onClick={() => {
																		setTimeout(
																			() => {
																				onSymptomsChecked(
																					data?.name
																				);
																			},
																			50
																		);
																	}}
																>
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
															);
													}
												)}
											</div>
											<div className="lg:col-span-6 flex flex-col gap-y-2">
												{infectiousSymptoms?.map(
													(data, index) => {
														if (index % 2 != 0)
															return (
																<label
																	className="mb-2 flex items-center text-base gap-2 text-gray-600 hover:bg-blue-100 duration-200 "
																	key={`${keyByValue(
																		data?.name
																	)}`}
																	onClick={() => {
																		setTimeout(
																			() => {
																				onSymptomsChecked(
																					data?.name
																				);
																			},
																			50
																		);
																	}}
																>
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
															);
													}
												)}
											</div>
											{showOthers && (
												<div className="lg:col-span-12 mt-4 border-t border-gray-300 pt-3">
												<h3 className="text-lg font-semibold mb-2 text-gray-700">
													Other Symptoms
												</h3>
												<div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
													{OthersSymptoms.map((item) => (
													<label
														key={item.value}
														className="flex items-center gap-2 text-gray-600 hover:bg-blue-100 duration-200"
													>
														<input type="checkbox" {...register(item.value)} />
														<span>{item.label}</span>
													</label>
													))}
												</div>
												</div>
											)}
										</div>
									</div>
									{hasSymptoms >= 1 ? (
										""
									) : (
										<>
											<div className="lg:col-span-12">
												<h4 className="border-y-2 text-base font-bold p-2 mb-0">
													Appointment Information
												</h4>
												
											</div>
											{/* <TextInputField
												label={
													<>
													<span className="text-danger">Tranche</span>
													<span className="text-danger ml-1">*</span>
													</>
												}
												placeholder="tranche"
												className="lg:col-span-2"
												error={
													errors
														?.tranche
														?.message
												}
												   disabled
												{...register("tranche", { required: true })}
												/> */}
											{/* <div className="lg:col-span-4">
												
											 <RadioInput
												error={errors?.tranche}
												label={
												<>
													<span className="text-danger">Tranche</span>
													<span className="text-danger ml-1">*</span>
												</>
												}
											>
												{[
												{ label: "First Tranche", value: "First Tranche" },
												{ label: "Second Tranche", value: "Second Tranche" },
												].map((option) => (
												<label
													className="flex items-center gap-1 font-light text-sm"
													key={`radio-${option.value}`}
												>
													<input
													type="radio"
													value={option.value}
													id={`radio-${option.value}`}
													{...register("tranche", {
														required: {
														value: true,
														message: "This field is required.",
														},
													})}
													/>
													{option.label}
												</label>
												))}
											</RadioInput> 
											</div> */}
											<div className="lg:col-span-9">
												<div className="grid grid-cols-2 lg:grid-cols-12">
													
													<div className="lg:col-span-4">
														<div className="flex flex-col gap-4">
															<Controller
																name="mode_of_consultation"
																control={control}
																rules={{
																	required: {
																		value: true,
																		message: "This field is required",
																	},
																}}
																render={({
																	field: { onChange, onBlur, value, name, ref },
																	fieldState: { error },
																}) => (
																	<ReactSelectInputField
																		className="mb-3"
																		isClearable={true}
																		labelClassName="font-bold"
																		label={
																			<>
																				Client Type
																				<span className="text-danger ml-1">
																					*
																				</span>
																			</>
																		}
																		inputClassName=""
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
																		setSelectedMode(
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
																		onBlur={onBlur}
																		error={error?.message}
																		placeholder="Client Type"
																		options={[
																			{
																				label: "Walk-in (With ATC)",
																				value: "walk-in-with-atc",
																			},
																			{
																				label: "Walk-in (Without ATC)",
																				value: "walk-in-without-atc",
																			},
																		]}
																	/>
																)}
															/>
															{selectedMode === "walk-in-with-atc" ? (
																<div className="flex flex-col gap-2">
																	<div className="flex gap-2">
																		<TextInputField
																			placeholder="Authorization Transaction Code (ATC)"
																			onChange={(e) => setATC(e.target.value)}
																			{...register("atc")}
																		/>
																		<ActionBtn type="primary" 
																		onClick={() => handleValidateATC(watch("atc"))} 
																		disabled={loading}>
																		{loading ? "Validating..." : "Validate"}
																		</ActionBtn>
																		
																	</div>
																	<span>
																	{validationMessage && <p className="mt-2 text-sm text-gray-700">{validationMessage}</p>}
																	</span>
																</div>
															
															) : (
																""
															)}
															<div className="flex flex-col">
																<TextInputField
																	label="Co-payment"
																	error={errors?.co_payment?.message}
																	iconRight={"brands-php"}
																	{...register("co_payment", {
																	})}
																	/>
																<TextInputField
																	label="Consultation Date"
																	type="date"
																	defaultValue={new Date().toISOString().split("T")[0]}
																	error={errors?.consultation_date?.message}
																	{...register("consultation_date", {
																	})}
																	/>
															</div>
														</div>
														
													</div>
												
												</div>
												
											</div>
											<div className="lg:col-span-12">
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
																			Chief Complaint
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
																	placeholder="Chief Complaint"
																	options={[
																		{
																			label: "General Consultation",
																			value: "general consultation",
																		},
																		// {
																		// 	label: "Immunization",
																		// 	value: "immunizations",
																		// },
																		{
																			label: "Malaria",
																			value: "malaria",
																		},
																		{
																			label: "Diabetes",
																			value: "diabetes",
																		},
																		{
																			label: "Tuberculosis",
																			value: "tuberculosis",
																		},
																		{
																			label: "Hypertension",
																			value: "hypertension",
																		},
																		{
																			label: "Urinary Tract Infection",
																			value: "urinary tract infection",
																		},
																		{
																			label: "Upper Respiratory Tract Infection",
																			value: "upper respiratory tract infection",
																		},
																		{
																			label: "Lower Respiratory Tract Infection",
																			value: "lower respiratory tract infection",
																		},
																		{
																			label: "Diarrhea",
																			value: "diarrhea",
																		},
																		{
																			label: "Wound, all forms Skin Diseases",
																			value: "wound all forms skin diseases",
																		},

																		
																	]}
																/>
															)}
														/>
													</div>
												</div>
												{selected === "tuberculosis" ? (
														<div className="flex-col gap-3 pl-3">
														<h5 className="font-bold text-base mb-2">TB Symptoms Checklist</h5>
														<div className="flex flex-col gap-y-1 pl-2">
															{symptoms?.map((data) => {
															const key = `${data?.value}`;
															return (
																<div className="flex flex-col" key={key}>
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																	type="checkbox"
																	{...register(key)}
																	onChange={(e) => handleSymptomChange(data?.label, e.target.checked)}
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

													{selected === "general consultation" ? (
														<div className="flex-col gap-3 pl-3">
														<h5 className="font-bold text-base mb-2">General Consultation Checklist</h5>
														<div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4">
															{chunkedData.map((columnData, colIdx) => (
															<div key={colIdx} className="flex flex-col gap-y-1 pl-2">
																{columnData.map((data, index) => (
																<div key={index} className="flex flex-col">
																	<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																		type="checkbox"
																		{...register(data?.value)}
																	/>
																	<span>{data?.label}</span>
																	</label>

																	{/* Conditionally render TextAreaField below PAIN checkbox */}
																	{data.value === "PAIN" && watch("PAIN") && (
																	<div className="mt-1 pl-6">
																		<TextAreaField
																		error={errors?.pain?.message}
																		className="rounded-xl"
																		rows="1"
																		placeholder="Enter Pain..."
																		{...register("pain_notes", {
																			required: "This field is required!",
																		})}
																		/>
																	</div>
																	)}
																	{data.value === "ALTER MENTAL SENSORIUM" && watch("ALTER MENTAL SENSORIUM") && (
																	<div className="mt-1 pl-6">
																		<TextAreaField
																		error={errors?.pain?.message}
																		className="rounded-xl"
																		rows="1"
																		placeholder="General Survey Remarks..."
																		{...register("general_survey_remarks", {
																			required: "This field is required!",
																		})}
																		/>
																	</div>
																	)}
																	{data.value === "OTHERS" && watch("OTHERS") && (
																	<div className="mt-1 pl-6">
																		<TextAreaField
																		error={errors?.pain?.message}
																		className="rounded-xl"
																		rows="1"
																		placeholder="Enter Others..."
																		{...register("others_notes")}
																		/>
																	</div>
																	)}
																</div>
																))}
															</div>
															))}
														</div>
														
														</div>
													) : (
														""
													)}
												
													{selected === "malaria" ? (
														<div className="flex-col gap-3 pl-3">
														<h5 className="font-bold text-base mb-2">Malaria Symptoms Checklist</h5>
														<div className="flex flex-col gap-y-1 pl-2">
															{malariaSymptoms?.map((data) => {
															const key = `${data?.value}`;
															return (
																<div className="flex flex-col" key={key}>
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																	type="checkbox"
																	{...register(key)}
																	onChange={(e) => handleMalariaSymptomChange(data?.label, e.target.checked)}
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
													{selected === "diabetes" ? (
														<div className="flex-col gap-3 pl-3">
														<h5 className="font-bold text-base mb-2">Diabetes Symptoms Checklist</h5>
														<div className="flex flex-col gap-y-1 pl-2">
															{diabetesSymptoms?.map((data) => {
															const key = `${data?.value}`;
															return (
																<div className="flex flex-col" key={key}>
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																	type="checkbox"
																	{...register(key)}
																	onChange={(e) => handleDiabetesSymptomChange(data?.label, e.target.checked)}
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
													{selected === "hypertension" ? (
														<div className="flex-col gap-3 pl-3">
														<h5 className="font-bold text-base mb-2">Hypertension Symptoms Checklist</h5>
														<div className="flex flex-col gap-y-1 pl-2">
															{hypertensionSymptoms?.map((data) => {
															const key = `${data?.value}`;
															return (
																<div className="flex flex-col" key={key}>
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																	type="checkbox"
																	{...register(key)}
																	onChange={(e) => handleHypertensionSymptomChange(data?.label, e.target.checked)}
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
													{selected === "upper respiratory tract infection" ? (
														<div className="flex-col gap-3 pl-3">
														<h5 className="font-bold text-base mb-2">Upper Respiratory Infection Symptoms Checklist</h5>
														<div className="flex flex-col gap-y-1 pl-2">
															{uRISymptoms?.map((data) => {
															const key = `${data?.value}`;
															return (
																<div className="flex flex-col" key={key}>
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																	type="checkbox"
																	{...register(key)}
																	onChange={(e) => handleURISymptomChange(data?.label, e.target.checked)}
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
													{selected === "lower respiratory tract infection" ? (
														<div className="flex-col gap-3 pl-3">
														<h5 className="font-bold text-base mb-2">Lower Respiratory Infiction Symptoms Checklist</h5>
														<div className="flex flex-col gap-y-1 pl-2">
															{lRISymptoms?.map((data) => {
															const key = `${data?.value}`;
															return (
																<div className="flex flex-col" key={key}>
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																	type="checkbox"
																	{...register(key)}
																	onChange={(e) => handleLRISymptomChange(data?.label, e.target.checked)}
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
													{selected === "diarrhea" ? (
														<div className="flex-col gap-3 pl-3">
														<h5 className="font-bold text-base mb-2">Diarrhea Symptoms Checklist</h5>
														<div className="flex flex-col gap-y-1 pl-2">
															{diarrheaSymptoms?.map((data) => {
															const key = `${data?.value}`;
															return (
																<div className="flex flex-col" key={key}>
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																	type="checkbox"
																	{...register(key)}
																	onChange={(e) => handleDiarrheaSymptomChange(data?.label, e.target.checked)}
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
											
											{/* {watch("OTHERS") && (
											<div className="lg:col-span-12">
												<div className="flex flex-col mb-2">
													<label className="text-sm font-bold mb-2">
														Others
													</label>
													<TextAreaField
														error={
															errors?.notes
																?.message
														}
														className="rounded-xl"
														rows="3"
														disabled={!isOthersSelected}
														placeholder="Enter reason for appointment..."
														{...register("others", {
															required:
																"This field is required!",
														})}
													/>
												</div>
											</div>
											)} */}
											
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
										</>
									)}
									

								</div>
								
								<div className="px-4 py-4 flex items-center justify-end bg-slate- border-t">
									
									{hasSymptoms ? (
										<ActionBtn
											type="success"
											size="xl"
											loading={loading}
											className=" !rounded-[30px] ml-4 gap-4 px-6"
											onClick={openReferToSPH}
										>
											<FlatIcon icon="rr-paper-plane" />
											REFER
										</ActionBtn>
									) : (
										<ActionBtn
											type="success"
											size="xl"
											loading={loading}
											className="ml-4"
											onClick={handleSubmit(submit)}
										>
											SUBMIT
										</ActionBtn>
									)}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
  )
}

export default forwardRef(NewConsultationModal)

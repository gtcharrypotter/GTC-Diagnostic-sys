/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */

import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useRef, useState } from 'react'
import ActionBtn from '../../../components/buttons/ActionBtn';
import FlatIcon from '../../../components/FlatIcon';
import TextInputField from '../../../components/inputs/TextInputField';
import { dataURItoBlob, dateYYYYMMDD, getPhilHealth, keyByValue } from '../../../libs/helpers';
import { accessWasteOptions, alcoholHist, chestLib, diabetesSymptoms, diarrheaSymptoms, digitalRectalLib, drugsHist, environmentalHistories, familyHistory, generalConsultation, generalHistories, genitourinaryLib, heartLib, heentLib, hypertensionSymptoms, immunizationAdult, immunizationChildren, immunizationElder, immunizationPregnant, infectiousSymptoms, lRISymptoms, malariaSymptoms, medicalSurgicalHistories, sanitaryOptions, sexualHist, skinLib, smokingHist, symptoms, symptoms2, uRISymptoms } from '../../../libs/appointmentOptions';
import TextAreaField from '../../../components/inputs/TextAreaField';
import { Controller, useForm } from 'react-hook-form';
import ReactSelectInputField from '../../../components/inputs/ReactSelectInputField';
import PatientInfo from '../../patients/components/PatientInfo';
import { Dialog, Transition } from '@headlessui/react';
import Axios from '../../../libs/axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks/useAuth';
import RadioInput from '../../../components/inputs/RadioInput';
import { typeOfDelivery } from '../../../libs/patientFormOptions';
import CollapseDiv from '../../../components/CollapseDiv';
import PhilhealthMasterlistModal from '../../../components/modal/PhilhealthMasterlistModal';
import { v4 as uuidv4 } from "uuid";
import PatientVitals from '../../../components/PatientVitals';
const infectiousSymptoms_names = infectiousSymptoms?.map((data) => data?.name);
const NewOPDAppointmentModal = (props, ref) => {
    const { onSuccess, patientSelfie, referToSPHRef, } = props;
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
	const [selectedMode, setSelectedMode] = useState(null);
	const [selected, setSelected] = useState(null);
	const [hasSymptoms, setHasSymptoms] = useState(0);
	const [selectedSymptoms, setSelectedSymptoms] = useState([]);
	const [selectedHU, setSelectedHU] = useState(null);
	const phicMembersListRef = useRef(null);	
	const [isOthersSelected, setIsOthersSelected] = useState(false);
	const [atc, setATC] = useState("");
  	const [validationMessage, setValidationMessage] = useState("");
	useEffect(() => {
		let t = setTimeout(() => {
			setValue("atc_date", dateYYYYMMDD());
			setMount(1);
		}, 400);
		return () => {
			clearTimeout(t);
		};
		
	}, []);
	useEffect(() => {
    const hasAppointments = modalData?.patient?.appointments?.length > 0;
    setValue("tranche", hasAppointments ? "Second Tranche" : "First Tranche");
  }, [modalData?.patient?.appointments, setValue]);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));
	
	const [members, setMembers] = useState([{
			id: uuidv4(),
			m_pin: "",
		}])
		const [dependents, setDependents] = useState([{
			id: uuidv4(),
			philhealth: "",
		}])
		const handlePinClick = (data) => {
			setMembers((prev) => ({
				...prev,
				m_pin: data?.mem_pin || '',
			}));
			setDependents({
				philhealth: '',
				lastname: '',
				firstname: '',
				middle: '',
				suffix: '',
				birthday: '',
			});
			};

			const handleDepPinClick = (data) => {
			setMembers((prev) => ({
				...prev,
				m_pin: data?.mem_pin || '', // Use the dependents's `pen` value here
			}));
			setDependents((prev) => ({
				...prev,
				philhealth: data?.pen || '',
			}));
			};
	const show = (showData = null) => {
		// {patient: {}, appointment: {}}
		setModalOpen(true);
		setTimeout(() => {
			setValue("status", "active");
			// setValue("mode_of_consultation", "walk-in-phic-member");
		}, 300);
		if (showData) {
			getHUList("OPD");
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

		 Axios.post(`/v1/diagnostic/validate-atc`, { atc_consultation: data })
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
	const handleImmunizationChange = (immunizations, isChecked) => {
        let updatedSymptoms;
        if (isChecked) {
        updatedSymptoms = [...selectedSymptoms, immunizations];
        } else {
        updatedSymptoms = selectedSymptoms.filter(s => s !== immunizations);
        }
        setSelectedSymptoms(updatedSymptoms);
        // Update the TextAreaField with selected symptoms
        setValue("notes", updatedSymptoms.join(", "));
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
		formData1.append("notes", data?.notes);
		formData1.append("patient_id", modalData?.patient?.id);
		formData1.append("created_by", user?.id);
		formData1.append("tranche", data?.tranche);
		formData1.append("disease", data?.disease);
		formData1.append("update_selfie", modalData?.update_selfie);
		// formData.append("philhealth", data.philhealth || "");
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

		//family history
		formData1.append("asthma", data?.asthma);
		formData1.append("cerebrovascular_disease", data?.cerebrovascular_disease);
		formData1.append("coronary_artery_disease", data?.coronary_artery_disease);
		formData1.append("diabetes_mellitus", data?.diabetes_mellitus);
		formData1.append("emphysema", data?.emphysema);
		formData1.append("epilepsy_seizure_disorder", data?.epilepsy_seizure_disorder);
		formData1.append("hyperlipidemia", data?.hyperlipidemia);
		formData1.append("hypertension", data?.hypertension);
		formData1.append("peptic_ulcer", data?.peptic_ulcer);
		formData1.append("pneumonia", data?.pneumonia);
		formData1.append("tyroid_disease",data?.tyroid_disease);
		formData1.append("urinary_tract_infection", data?.urinary_tract_infection);
		formData1.append("mental_illness", data?.mental_illness);
		formData1.append("none", data?.none);
		formData1.append("allergy", data?.allergy);
		formData1.append("cancer", data?.cancer);
		formData1.append("hepatitis", data?.hepatitis);
		formData1.append("pulmunary_tuberculosis",data?.pulmunary_tuberculosis);
		formData1.append("extrapulmunary_tuberculosis", data?.extrapulmunary_tuberculosis);
		formData1.append("others", data?.others);
		
		//personal/social history
		formData1.append("smoker", data?.smoker);
		formData1.append("alcohol_drinker", data?.alcohol_drinker);
		formData1.append("drug_user", data?.drug_user);
		formData1.append("sexually_active", data?.sexually_active);

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
		formData1.append("atc_consultation", data?.atc_consultation);
		formData1.append("atc_date", data?.atc_date);
		formData1.append("phic_no", data?.phic_no);
		//immunizations

			formData1.append("bcg", data?.bcg);
			formData1.append("opv_1", data?.opv_1);
			formData1.append("opv_2", data?.opv_2);
			formData1.append("opv_3", data?.opv_3);
			formData1.append("dpt_1", data?.dpt_1);
			formData1.append("dpt_2", data?.dpt_2);
			formData1.append("dpt_3", data?.dpt_3);
			formData1.append("measles", data?.measles);
			formData1.append("hepatitis_b1", data?.hepatitis_b1);
			formData1.append("hepatitis_b2", data?.hepatitis_b2);
			formData1.append("hepatitis_b3", data?.hepatitis_b3);
			formData1.append("hepatitis_a", data?.hepatitis_a);
			formData1.append("varicella", data?.varicella);

			formData1.append("hpv", data?.hpv);
			formData1.append("mmr", data?.mmr);

			formData1.append("tetanus_toxoid", data?.tetanus_toxoid);

			formData1.append("pneumococcal_vaccine", data?.pneumococcal_vaccine);
			formData1.append("flu_vaccine", data?.flu_vaccine);

			//pregnant
			formData1.append("family_planning", data?.family_planning);
			formData1.append("menstrual_history", data?.menstrual_history);
			formData1.append("menarche", data?.menarche);
			formData1.append("last_menstrual_period", data?.last_menstrual_period);
			formData1.append("period_duration", data?.period_duration);
			formData1.append("pads_per_menstual", data?.pads_per_menstual);
			formData1.append("sexual_intercourse", data?.sexual_intercourse);
			formData1.append("birth_control", data?.birth_control);
			formData1.append("interval_cycle", data?.interval_cycle);
			formData1.append("menopause", data?.menopause);
			formData1.append("age_menopause", data?.age_menopause);
			formData1.append("pregnancy_history", data?.pregnancy_history);
			formData1.append("gravidity", data?.gravidity);
			formData1.append("parity", data?.parity);
			formData1.append("type_delivery", data?.type_delivery);
			formData1.append("full_term", data?.full_term);
			formData1.append("premature", data?.premature);
			formData1.append("abortion", data?.abortion);
			formData1.append("living_children", data?.living_children);
			formData1.append("induced_hypertension", data?.induced_hypertension);

			formData1.append("anicteric_sclerae", data?.anicteric_sclerae);
			formData1.append("exudates", data?.exudates);
			formData1.append("essentially_normal_heent", data?.essentially_normal_heent);
			formData1.append("abnormal_pupillary", data?.abnormal_pupillary);
			formData1.append("cervical_lympadenopathy", data?.cervical_lympadenopathy);
			formData1.append("dry_mucous_membrane", data?.dry_mucous_membrane);
			formData1.append("icteric_sclerae", data?.icteric_sclerae);
			formData1.append("pale_conjunctivae", data?.pale_conjunctivae);
			formData1.append("sunken_eyeballs", data?.sunken_eyeballs);
			formData1.append("sunken_fontanelle", data?.sunken_fontanelle);
			formData1.append("intact_tympanic", data?.intact_tympanic);
			formData1.append("pupils_brisky", data?.pupils_brisky);
			formData1.append("tonsillopharyngeal", data?.tonsillopharyngeal);
			formData1.append("hypertropic_tonsils", data?.hypertropic_tonsils);
			formData1.append("alar_flaring", data?.alar_flaring);
			formData1.append("nasal_discharge", data?.nasal_discharge);
			formData1.append("aural_discharge", data?.aural_discharge);
			formData1.append("palpable_mass", data?.palpable_mass);
			formData1.append("others_heent", data?.others_heent);
			
			//chest
			formData1.append("symmetrical", data?.symmetrical);
			formData1.append("lumps_over_breast", data?.lumps_over_breast);
			formData1.append("clear_breath_sounds", data?.clear_breath_sounds);
			formData1.append("retractions", data?.retractions);
			formData1.append("crackles", data?.crackles);
			formData1.append("wheezes", data?.wheezes);
			formData1.append("essentially_normal_chest", data?.essentially_normal_chest);
			formData1.append("asymmetrical_chest_expansion", data?.asymmetrical_chest_expansion);
			formData1.append("decreased_breath_sounds", data?.decreased_breath_sounds);
			formData1.append("enlarge_axillary", data?.enlarge_axillary);
			formData1.append("others_chest", data?.others_chest);
		
			//heart
			formData1.append("adynamic_precordium", data?.adynamic_precordium);
			formData1.append("regular_rhythm", data?.regular_rhythm);
			formData1.append("heaves", data?.heaves);
			formData1.append("murmurs", data?.murmurs);
			formData1.append("essentially_normal_heart", data?.essentially_normal_heart);
			formData1.append("apex_beat", data?.apex_beat);
			formData1.append("irregular_rhythm", data?.irregular_rhythm);
			formData1.append("muffled_heart", data?.muffled_heart);
			formData1.append("pericardial_bulge", data?.pericardial_bulge);
			formData1.append("others_heart", data?.others_heart);
			
			
			//genitourinary
			formData1.append("essentially_normal_genitourinary", data?.essentially_normal_genitourinary);
			formData1.append("blood_stained", data?.blood_stained);
			formData1.append("cervical_dilatation", data?.cervical_dilatation);
			formData1.append("abnormal_discharge", data?.abnormal_discharge);
			formData1.append("others_genitourinary", data?.others_genitourinary);
			
			//digital
			formData1.append("essentially_normal_digital", data?.essentially_normal_digital);
			formData1.append("enlarge_prospate", data?.enlarge_prospate);
			formData1.append("mass", data?.mass);
			formData1.append("hemorrhoids", data?.hemorrhoids);
			formData1.append("pus", data?.pus);
			formData1.append("not_applicable", data?.not_applicable);
			formData1.append("others_digital", data?.others_digital);
			
			//skin
			formData1.append("essentially_normal_skin", data?.essentially_normal_skin);
			formData1.append("weak_pulses", data?.weak_pulses);
			formData1.append("clubbing", data?.clubbing);
			formData1.append("cold_clammy", data?.cold_clammy);
			formData1.append("cyanosis", data?.cyanosis);
			formData1.append("edema_swelling", data?.edema_swelling);
			formData1.append("decreased_mobility", data?.decreased_mobility);
			formData1.append("pale_nailbeds", data?.pale_nailbeds);
			formData1.append("poor_skin_turgor", data?.poor_skin_turgor);
			formData1.append("rashes_petechiae", data?.rashes_petechiae);
			formData1.append("others_skin", data?.others_skin);
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
					toast.success("New Appointment successfully created!");
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
	console.log("FOr obgyne", modalData)
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
										Health Screening & Assessment
									</span>
									<span className="text-sm font-light text-blue-900 ">
										Complete form for health screening & assessment
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
																				Mode of consultation
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
																		placeholder="Mode of consultation"
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
																			{...register("atc_consultation")}
																		/>
																		<ActionBtn type="primary" 
																		onClick={() => handleValidateATC(watch("atc_consultation"))} 
																		disabled={loading}>
																		{loading ? "Validating..." : "Validate"}
																		</ActionBtn>
																		
																	</div>
																	<span>
																	{validationMessage && <p className="mt-2 text-sm text-gray-700">{validationMessage}</p>}
																	</span>
																<div className="flex flex-col">
																	<TextInputField
																		label="Assessment Date"
																		type="date"
																		error={errors?.order_date?.message}
																		placeholder="Enter order date"
																		{...register("atc_date", {
																		})}
																		/>
																<span className='italic text-red-600 text-xs'>Note: ATC should be used within the Screening & Assessment Date.</span>
																</div>
																
																</div>
															
															) : (
																""
															)}
														
														</div>
														
													</div>
												
												</div>
												
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
																			Consultation
																			type
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
																	placeholder="Consultation type"
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

																		{
																			label: "Animal Bite - RHU",
																			value: "animal Bite - RHU",
																		},
																		{
																			label: "Human Immunodeficiency Virus - SPH",
																			value: "human immunodeficiency virus - SPH",
																		},
																		{
																			label: "High Risk Pregnancy - SPH",
																			value: "high risk pregnancy - SPH",
																		},
																		{
																			label: "Cancer, all forms - SPH",
																			value: "cancer all forms - SPH",
																		},
																		{
																			label: "Dengue Hemorrhagic Fever - SPH",
																			value: "dengue hemorrhagic fever - SPH",
																		},
																		{
																			label: "Typhoid Fever - SPH",
																			value: "typhoid fever - SPH",
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
														<div className="flex flex-col gap-y-1 pl-2">
															{generalConsultation?.map((data) => {
															const key = `${data?.value}`;
															return (
																<div className="flex flex-col" key={key}>
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																	type="checkbox"
																	{...register(key)}
																	onChange={(e) => handleGeneralConsultChange(data?.label, e.target.checked)}
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
													{/* {selected === "immunizations" ? (
														<div className="flex flex-col gap-4 pl-3">
														<h5 className="font-bold text-base mb-2">Immunization Checklist</h5>
														<div className="grid grid-cols-2">
															<div className="">
																<h5 className="font-bold text-base mb-2">For Children</h5>
																<div className="flex flex-col gap-y-1 pl-2">
																	{immunizationChildren?.map((data) => {
																	const key = `${data?.name}`;
																	return (
																		<div className="flex flex-col" key={key}>
																		<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																			type="checkbox"
																			{...register(key)}
																			onChange={(e) => handleImmunizationChange(data?.label, e.target.checked)}
																			/>
																			<span>{data?.label}</span>
																		</label>
																		</div>
																	);
																	})}
																	
																</div>
															</div>
															<div className="flex flex-col gap-4">
																<div className="flex flex-col">
																<h5 className="font-bold text-base mb-2">For Adult</h5>
																<div className="flex flex-col gap-y-1 pl-2">
																	{immunizationAdult?.map((data) => {
																	const key = `${data?.name}`;
																	return (
																		<div className="flex flex-col" key={key}>
																		<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																			type="checkbox"
																			{...register(key)}
																			onChange={(e) => handleImmunizationChange(data?.label, e.target.checked)}
																			/>
																			<span>{data?.label}</span>
																		</label>
																		</div>
																	);
																	})}
																	
																</div>
																</div>
																<div className="flex flex-col">
																	<h5 className="font-bold text-base mb-2">For Pregnant Women</h5>
																	<div className="flex flex-col gap-y-1 pl-2">
																	{immunizationPregnant?.map((data) => {
																	const key = `${data?.name}`;
																	return (
																		<div className="flex flex-col" key={key}>
																		<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																			type="checkbox"
																			{...register(key)}
																			onChange={(e) => handleImmunizationChange(data?.label, e.target.checked)}
																			/>
																			<span>{data?.label}</span>
																		</label>
																		</div>
																	);
																	})}
																	
																</div>
																</div>
																<div className="flex flex-col">
																	<h5 className="font-bold text-base mb-2">For Elderly & Immunocompromised</h5>
																	<div className="flex flex-col gap-y-1 pl-2">
																	{immunizationElder?.map((data) => {
																	const key = `${data?.name}`;
																	return (
																		<div className="flex flex-col" key={key}>
																		<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																			type="checkbox"
																			{...register(key)}
																			onChange={(e) => handleImmunizationChange(data?.label, e.target.checked)}
																			/>
																			<span>{data?.label}</span>
																		</label>
																		</div>
																	);
																	})}
																	
																</div>
																</div>
																
															</div>
														</div>
														</div>
													) : (
														""
													)} */}
													
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
														 disabled={!isOthersSelected}
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
											<CollapseDiv
													defaultOpen={true}
													title="Medical and Surgical History"
												>
													<div className="lg:col-span-12">
												
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
											</div>
											</CollapseDiv>
											</div>
											<div className="lg:col-span-12">
											<CollapseDiv
													defaultOpen={true}
													title="Family History"
												>
												{/* family history */}
											<div className="lg:col-span-12">
												

												<div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4 px-2 w-full">
													<div className="flex flex-col lg:col-span-4">
														{familyHistory?.map(
															(data, index) => {
																if (index <= 6)
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
														{familyHistory?.map(
															(data, index) => {
																if (
																	index > 6 &&
																	index <=13
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
														{familyHistory?.map(
															(data, index) => {
																if (index > 13)
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
											</CollapseDiv>
											</div>
											<div className="lg:col-span-12">
											<CollapseDiv
													defaultOpen={true}
													title="Personal / Social history"
												>
													{/* personal/social history */}
											<div className="lg:col-span-12">
											
												<>
												<div className="">
														<span className="text-blue-600 text-sm font-bold px-2">
													Smoking
												</span>
												<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
													{smokingHist?.map(
														(data) => {
															return (
																<label
																	className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600"
																	key={`${keyByValue(
																		data?.label
																	)}`}
																>
																	<input
																		type="checkbox"
																		{...register(
																			"smoker",
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
												</div>
												<div className="">
													<span className="text-blue-600 text-sm font-bold px-2">
													Alcohol
												</span>
												<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
													{alcoholHist?.map(
														(data) => {
															return (
																<label
																	className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600"
																	key={`${keyByValue(
																		data?.label
																	)}`}
																>
																	<input
																		type="checkbox"
																		{...register(
																			"alcohol_drinker",
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
												</div>
												<div className="">
													<span className="text-blue-600 text-sm font-bold px-2">
													Ilicit Drugs
												</span>
												<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
													{drugsHist?.map(
														(data) => {
															return (
																<label
																	className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600"
																	key={`${keyByValue(
																		data?.label
																	)}`}
																>
																	<input
																		type="checkbox"
																		{...register(
																			"drug_user",
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
												</div>
												<div className="">
													<span className="text-blue-600 text-sm font-bold px-2">
													Sexual History Screening
												</span>
												<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
													{sexualHist.map(
														(data) => {
															return (
																<label
																	className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600"
																	key={`${keyByValue(
																		data?.label
																	)}`}
																>
																	<input
																		type="checkbox"
																		{...register(
																			"sexually_active",
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
												</div>
												
												</>
											</div>
											</CollapseDiv>
											</div>
											<div className="lg:col-span-12">
												<CollapseDiv
													defaultOpen={true}
													title="Immunization "
												>
												<div className="grid grid-cols-3">
													<table className="">
														<div>
														<thead>
															<tr>
																<th className="w-1/4">
																	For Children
																	
																</th>
															</tr>
														</thead>
														<tbody>
															{immunizationChildren?.map(
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
																						{...register(data?.name)}
																					/>
																					<span>
																						{
																							data?.label
																						}
																					</span>
																				</label>
																					
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
																	For Adult
																	
																</th>
															</tr>
														</thead>
														<tbody>
															{immunizationAdult?.map(
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
																						{...register(data?.name)}
																					/>
																					<span>
																						{
																							data?.label
																						}
																					</span>
																				</label>
																					
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
																<th className="w-1/4">
																	For Adult
																	
																</th>
															</tr>
														</thead>
														<tbody>
															{immunizationElder?.map(
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
																						{...register(data?.name)}
																					/>
																					<span>
																						{
																							data?.label
																						}
																					</span>
																				</label>
																					
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
																	For Pregnant
																	
																</th>
															</tr>
														</thead>
														<tbody>
															{immunizationPregnant?.map(
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
																						{...register(data?.name)}
																					/>
																					<span>
																						{
																							data?.label
																						}
																					</span>
																				</label>
																					
																			</td>
																		</tr>
																	);
																}
															)}
														</tbody>
														</div>
														
													</table>
												</div>

												</CollapseDiv>
											</div>
											<div className="lg:col-span-12">
												<CollapseDiv
													defaultOpen={true}
													title="Pertinent Physical Examination"
												>
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
																														</td>
																													</tr>
																												);
																											}
																										)}
																									</tbody>
																									</div>
																								</table>
													</div>
												</CollapseDiv>
											</div>
											<div className="lg:col-span-12">
											</div>
											<div className="lg:col-span-12">
											{modalData?.patient?.gender == "Female" ? (
												<CollapseDiv
													defaultOpen={true}
													title="OB-Gyne History"
													
												>
													
												<h4 className="border-y-2 text-base font-bold p-2 mb-4">
													OB-Gyne History
												</h4>
												<>
												<div className="lg:col-span-12 flex flex-col mb-4">
													<h4 className="text-base font-semibold ">
														Family Planning
													</h4>
													<RadioInput
																			
														label={
															<>
															With access to family planning counseling?
															
															</>
														}
													>
														{[
															{
																label: "Yes",
																value: "Yes",
															},
															{
																label: "No",
																value: "No",
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
																				"family_planning",
																				
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
												<div className="grid grid-cols-2 gap-2 divide-x-2 divide-gray-200">
												<div className="mb-4 p-2">
												<div className="flex flex-col">
																<h4 className="text-base font-semibold ">
													Menstrual History
												</h4>
												<RadioInput
																		
													label={
														<>
														With access to family planning counseling?
														
														</>
													}
												>
													{[
														{
															label: "Applicable",
															value: "Applicable",
														},
														{
															label: "Not Applicable",
															value: "Not Applicable",
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
																			"menstrual_history",
																			
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
										
												<div className="grid grid-cols-1 lg:grid-cols-12 gap-2 mt-8 ">
													<TextInputField
														label="Menarche"
														className=" lg:col-span-6"
														{...register(
															"menarche",
														)}
													/>
													<TextInputField
														label="Birth Control Method"
														className=" lg:col-span-6"
														{...register(
															"birth_control",
														)}
													/>
													<TextInputField
														label="Last Menstrual Period"
														className=" lg:col-span-6"
														type="date"
														{...register(
															"last_menstrual_period",
										
														)}
													/>
													<TextInputField
														label="Interval Cycle"
														className=" lg:col-span-6"
														{...register(
															"interval_cycle",
															
														)}
													/>
													<TextInputField
														label="Period Duration"
														className=" lg:col-span-6"
														{...register(
															"period_duration",
															
														)}
													/>
													<RadioInput
														
														label={
															<>
															Menopause
															
															</>
														}
													>
														{[
															{
																label: "Yes",
																value: "Yes",
															},
															{
																label: "No",
																value: "No",
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
																				"menopause",
																				
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
													<TextInputField
														label="No. of Pads/Day During Menstruation"
														className=" lg:col-span-6"
														{...register(
															"pads_per_menstual",
															
														)}
													/>
													<TextInputField
														label="if yes, what age?"
														className=" lg:col-span-6"
														{...register(
															"age_menopause",
															
														)}
													/>
													<TextInputField
														label="Onset of Sexual Intercourse"
														className=" lg:col-span-6"
														{...register(
															"sexual_intercourse",
															
														)}
													/>
												</div>
												</div>
												<div className="mb-4 p-2">
													<div className="flex flex-col">
															<h4 className=" text-base font-semibold ">
														Pregnancy History
													</h4>
													<RadioInput
																			
														label={
															<>
															With access to family planning counseling?
															
															</>
														}
													>
														{[
															{
																label: "Applicable",
																value: "Applicable",
															},
															{
																label: "Not Applicable",
																value: "Not Applicable",
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
																				"pregnancy_history",
																				
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
													
													<div className="grid grid-cols-1 lg:grid-cols-12 gap-2 mt-8">
														<TextInputField
															label="Gravidity (No. of Pregnancy)"
															className=" lg:col-span-6"
															{...register(
																"gravidity",
																
															)}
														/>
														<TextInputField
															label="No. of Premature"
															className=" lg:col-span-6"
															{...register(
																"premature",
																
															)}
														/>
														<TextInputField
															label="Parity (No. of Delivery)"
															className=" lg:col-span-6"
															{...register(
																"parity",
																
															)}
														/>
														<TextInputField
															label="No. of Abortion"
															className=" lg:col-span-6"
															{...register(
																"abortion",
																
															)}
														/>
														<div className=" lg:col-span-6">
														<RadioInput
																			
														label={
															<>
															Type of Delivery
															
															</>
														}
													>
														{[
															{
																label: "Applicable",
																value: "Applicable",
															},
															{
																label: "Not Applicable",
																value: "Not Applicable",
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
																				"type_delivery",
																				
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
														
														<TextInputField
															label="No. of Living Children"
															className=" lg:col-span-6"
															{...register(
																"living_children",
																
															)}
														/>
														<TextInputField
															label="No. of Full Term"
															className=" lg:col-span-6"
															{...register(
																"full_term",
																
															)}
														/>
														<div className=" lg:col-span-6 mt-6">
															<RadioInput
			
														label={
															<>
															Pregnancy-induced hypertension(Pre-eclampsia)
															</>
														}
													>
														{[
															{
																label: "YES",
																value: "YES",
															},
														]?.map(
															(
																option,
																indx
															) => {
																return (
																	<label
																		className="flex items-center gap-2 font-light text-sm"
																		key={`rdio-${option?.value}`}
																	>
																		<input
																			type="checkbox"
																			value={
																				option?.value
																			}
																			id={`irdio-${option?.value}`}
																			{...register(
																				"induced_hypertension",
																				
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
														
														
													</div>
												</div>
												</div>
												</>
												</CollapseDiv>
											) : (
												""
											)}
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
				<PhilhealthMasterlistModal 
									// appointment={order}
									ref={phicMembersListRef}
									onPinClick={handlePinClick}
									onDepPinClick={handleDepPinClick}
									/>
				</div>
			</Dialog>
		</Transition>
  )
}

export default forwardRef(NewOPDAppointmentModal)

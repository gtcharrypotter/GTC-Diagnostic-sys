/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react'
import { abdomenLib, alcoholHist, bloodTypes, chestLib, digitalRectalLib, drugsHist, familyHistory, genitourinaryLib, heartLib, heentLib, immunizationAdult, immunizationChildren, immunizationElder, immunizationPregnant, infectiousSymptoms, medicalHistories, medicalSurgicalHistories, ncdAssessment, neuroLib, presenceDiabetes, sexualHist, skinLib, smokingHist } from '../../../libs/appointmentOptions';
import { useAuth } from '../../../hooks/useAuth';
import { Controller, useForm } from 'react-hook-form';
import Axios from '../../../libs/axios';
import ActionBtn from '../../../components/buttons/ActionBtn';
import FlatIcon from '../../../components/FlatIcon';
import RadioInput from '../../../components/inputs/RadioInput';
import TextInputField from '../../../components/inputs/TextInputField';
import CollapseDiv from '../../../components/CollapseDiv';
import { calculateBMI, calculateBPMeasurement, dateYYYYMMDD, keyByValue } from '../../../libs/helpers';
import ReactSelectInputField from '../../../components/inputs/ReactSelectInputField';
import PatientInfo from '../../patients/components/PatientInfo';
import { Dialog, Transition } from '@headlessui/react';
import { toast } from 'react-toastify';

const infectiousSymptoms_names = infectiousSymptoms?.map((data) => data?.name);
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
        label: "Heart Rate",
        name: "heart_rate",
        placeholder: "Enter Heart Rate",
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
        label: "Visual Acuity",
        name: "visual_acuity",
        placeholder: "Enter Visual Acuity",
        className: "lg:col-span-4",
        type: "text",
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
];
const pediatricClient = [
    {
        label: "Length",
        name: "length",
        placeholder: "cm",
        className: "lg:col-span-3",
        type: "text",
    },
    {
        label: "Head",
        name: "head",
        placeholder: "cm",
        className: "lg:col-span-3",
        type: "text",
    },
    {
        label: "Skinfold",
        name: "skinfold",
        placeholder: "cm",
        className: "lg:col-span-3",
        type: "text",
    },
    {
        label: "Waist",
        name: "waist",
        placeholder: "cm",
        className: "lg:col-span-3",
        type: "text",
    },
	{
        label: "Hip",
        name: "hip",
        placeholder: "cm",
        className: "lg:col-span-3",
        type: "text",
    },
    {
        label: "Limbs",
        name: "limbs",
        placeholder: "cm",
        className: "lg:col-span-3",
        type: "text",
    },
	{
        label: "Arm",
        name: "arm",
        placeholder: "cm",
        className: "lg:col-span-3",
        type: "text",
    }
];

const UpdateHealthScreeningModal = (props, ref) => {
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
    const [mount, setMount] = useState(0);
    const [modalData, setModalData] = useState(null);
    const [HUList, setHUList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMode, setSelectedMode] = useState(null);
    const [selected, setSelected] = useState(null);
    const [hasSymptoms, setHasSymptoms] = useState(0);
    const [selectedHU, setSelectedHU] = useState(null);
    const [atc, setATC] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
	const essentiallyNormalAbdomen = watch('essentially_normal_abodomen');
	const essentiallyNormalChest = watch('essentially_normal_chest');
	const essentiallyNormalDigitalRectal= watch('essentially_normal_digital');
	const essentiallyNormalGenitou = watch('essentially_normal_genitourinary');
	const essentiallyNormalHeart = watch('essentially_normal_heart');
	const essentiallyNormalHeent = watch('essentially_normal_heent');
	const essentiallyNormalNeuro = watch('essentially_normal_neuro');
	const essentiallyNormalSkin = watch('essentially_normal_skin');
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
        const show = (showData = null) => {
            // {patient: {}, appointment: {}}
            setModalOpen(true);
            setTimeout(() => {
                setValue("status", "active");
                // setValue("mode_of_consultation", "walk-in-phic-member");
            }, 300);
            if (showData) {
                getHUList("SA");
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
        const submit = (data) => {
		console.log("SUBMIT DATAAA---------------------------->>>>>>", modalData);
		setLoading(true);
		const formData1 = new FormData();
		const formData = new FormData();
		formData1.append("patient_id", modalData?.patient?.id);
		formData1.append("disease", data?.disease);
        formData1.append("client_type", data?.client_type);
        formData1.append("atc", data?.atc);
		formData1.append("atc_date", data?.atc_date);
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
		formData1.append("cig_pack", data?.cig_pack);
		formData1.append("alcohol_drinker", data?.alcohol_drinker);
		formData1.append("number_of_bottle", data?.number_of_bottle);
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

			//abdomen
			formData1.append("flat", data?.flat);
			formData1.append("hyperactive_bowel", data?.hyperactive_bowel);
			formData1.append("tympanitic", data?.tympanitic);
			formData1.append("uterine_contraction", data?.uterine_contraction);
			formData1.append("flabby", data?.flabby);
			formData1.append("globullar", data?.globullar);
			formData1.append("muscle_guarding", data?.muscle_guarding);
			formData1.append("tenderness_abdomen", data?.tenderness_abdomen);
			formData1.append("palpable_mass", data?.palpable_mass);
			formData1.append("essentially_normal_abodomen", data?.essentially_normal_abodomen);
			formData1.append("abdomen_rigidity", data?.abdomen_rigidity);
			formData1.append("abdominal_tenderness", data?.abdominal_tenderness);
			formData1.append("other_abdomen", data?.other_abdomen);

			//neuro
			formData1.append("developmental_delay", data?.developmental_delay);
			formData1.append("abnormal_reflex", data?.abnormal_reflex);
			formData1.append("poor_altered", data?.poor_altered);
			formData1.append("poor_muscle_tone", data?.poor_muscle_tone);
			formData1.append("poor_coordination", data?.poor_coordination);
			formData1.append("seizures", data?.seizures);
			formData1.append("normal", data?.normal);
			formData1.append("motor_deficit", data?.motor_deficit);
			formData1.append("sensory_deficit", data?.sensory_deficit);
			formData1.append("essentially_normal_neuro", data?.essentially_normal_neuro);
			formData1.append("abnormal_gait", data?.abnormal_gait);
			formData1.append("abnormal_position", data?.abnormal_position);
			formData1.append("abnormal_sensation", data?.abnormal_sensation);
			formData1.append("others_neuro", data?.others_neuro);

			// formData2.append("patient_id", modalData?.patient?.id);
            
            formData1.append("blood_type", data?.blood_type || " ");
            formData1.append("blood_systolic", data?.blood_systolic);
			formData1.append("blood_diastolic", data?.blood_diastolic);
			formData1.append("temperature", data?.temperature);
			formData1.append("pulse", data?.pulse);
			formData1.append("respiratory", data?.respiratory);
            formData1.append("glucose", data?.glucose || 0);
            formData1.append("uric_acid", data?.uric_acid || 0);
            formData1.append("cholesterol", data?.cholesterol || 0);
			formData1.append("height", data?.height);
			formData1.append("weight", data?.weight);
            formData1.append("covid_19", data?.covid_19 || " ");
            formData1.append("tuberculosis", data?.tb);
			formData1.append("bmi", data?.bmi);
			formData1.append("oxygen_saturation", data?.oxygen_saturation || " ");
			formData1.append("heart_rate", data?.heart_rate || " ");
			formData1.append("regular_rhythm", data?.regular_rhythm || " ");
		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
			// onUploadProgress: progressEvent => onProgress(progressEvent),
		};
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
		formData1.append("_method", "PATCH");
		Axios.post(`/v1/diagnostic/update-first-tranch/${modalData?.patient?.id}`, formData1, config)
			.then((res) => {
				if (selected == "tuberculosis") {
					Axios.post(
						`/v1/clinic/tb-symptoms/${res.data.data?.id}`,
						formData
					);
				}
				toast.success("Update successfully!");
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
										Update Health Screening & Assessment (Tranche 1)
									</span>
									<span className="text-sm font-light text-blue-900 ">
										Complete form to update health screening & assessment
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
													Health Screeaning & Assessment Information
												</h4>
												
											</div>
											<div className="lg:col-span-9">
												<div className="grid grid-cols-2 lg:grid-cols-12">
													
													<div className="lg:col-span-4">
														<div className="flex flex-col gap-4">
															<Controller
																name="client_type"
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
											<div className="lg:col-span-12">
											<CollapseDiv
													defaultOpen={true}
													title="Medical/Surgical History"
												>
													<div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
														<div className="table table-bordered col-span-6">
															<span className='font-bold'>Past Medical History</span>
																<table className="bordered">
																	<thead>
																		<tr>
																			<th className="">
																				Click if
																				patient has
																				an
																				experience
																			</th>
																			<th>
																				{/* Details
																				(i.e.
																				medications
																				taken, year
																				diagnosed,
																				year of
																				surgery or
																				injury,
																				etc.) */}
																				Specify
																			</th>
																		</tr>
																	</thead>
																	<tbody>
																		{medicalHistories?.map(
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
														<div className="col-span-2"></div>
														<div className="col-span-4">
															<span className='font-bold'>Past Surgical History</span>
															<div className="flex gap-2">
																<TextInputField
																	label={
																		<>
																			Date
																		</>
																	}
																	className=""
																	type="date"
																	{...register(
																		"date_surgical",
																	
																	)}
																/>
																<TextInputField
																	label={
																		<>
																			Operation
																		</>
																	}
																	className=""
																	error={
																		errors
																			?.effective_year
																			?.message
																	}
																	{...register(
																		"effective_year",
																		{
																			required:
																				"This field is required",
																		}
																	)}
																/>
															</div>
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
																			{/* {data?.specify ? (
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
																			)} */}
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
																		type="radio"
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
												<div className="px-2 mb-3">
													<label className="text-sm text-gray-600">Number of packs per day: &nbsp;</label>
													<input
														type="text"
														className="mt-1 p-2 border rounded-md w-28 text-sm"
														placeholder="No. of packs"
														disabled
														{...register(
															"cig_pack",
															{}
														)}
													/>
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
																		type="radio"
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
												<div className="px-2 mb-3">
													<label className="text-sm text-gray-600">Number. of bottles per day:&nbsp;</label>
													<input
														type="text"
														className="mt-1 p-2 border rounded-md w-28 text-sm"
														placeholder="No. of bottles"
														disabled
														{...register(
															"number_of_bottle",
															{}
														)}
													/>
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
																		type="radio"
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
																		type="radio"
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
													title="Pertinent Physical Examination Findings"
												>
													<div className="pb-4 flex flex-col gap-y-4 relative">
														<div className="grid grid-cols-1 lg:grid-cols-2 divide-x">
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
															<div className="flex flex-col gap-4 px-2">
																<div className="text-base">
																<span className='font-semibold'>Blood Type</span>
																<div className="gap-4">
																{bloodTypes.map(
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
																						"blood_type",
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
																<div className="text-base">
																	<span className='font-semibold'>Pediatric Client Aged 0-24 Months</span>
																	<div className="grid grid-cols-1 lg:grid-cols-12 p-4 gap-4">
																	{pediatricClient?.map((data) => {
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
															</div>
														</div>
														
													</div>
												</CollapseDiv>
											</div>
											<div className="lg:col-span-12">
												<CollapseDiv
													defaultOpen={true}
													title="Pertinent Findings Per System"
												>
													<div className="grid grid-cols-3 lg:grid-cols-3">
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
																												const isDisabled = essentiallyNormalHeent && data.name !== 'essentially_normal_heent';
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
																																	{...register(
																																		`${data?.others_heent}`
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
																												const isDisabled = essentiallyNormalGenitou && data.name !== 'essentially_normal_genitourinary';
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
																																		`${data?.others_genitourinary}`
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
																												const isDisabled = essentiallyNormalAbdomen && data.name !== 'essentially_normal_abodomen';
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
																																		`${data?.other_abdomen}`
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
																												const isDisabled = essentiallyNormalChest && data.name !== 'essentially_normal_chest';
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
																																		`${data?.others_chest}`
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
																												const isDisabled = essentiallyNormalDigitalRectal && data.name !== 'essentially_normal_digital';
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
																																		`${data?.others_digital}`
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
																												const isDisabled = essentiallyNormalNeuro && data.name !== 'essentially_normal_neuro';
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
																																		`${data?.others_neuro}`
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
																												const isDisabled = essentiallyNormalHeart && data.name !== 'essentially_normal_heart';
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
																																		`${data?.others_heart}`
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
																												F. SKIN/EXTREMITIES
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
																												const isDisabled = essentiallyNormalSkin && data.name !== 'essentially_normal_skin';
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
																																		`${data?.others_skin}`
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
												</CollapseDiv>
											</div>
											
											<div className="lg:col-span-12">
												<CollapseDiv
														defaultOpen={true}
														title="NCD High-Risk Assessment (for 25 years old and above)"
													>
														<div className="grid grid-cols-3 lg:grid-cols-3 gap-8 divide-x">
														<div className="flex flex-col gap-4">
															<div className="flex flex-col gap-2">
																<span className='text-sm font-semibold'>High Fat/High Salt Food Intake</span>
																<span className='text-xs'>Eats processed/fast food (e..g, instant noodles, humburgers, fries, fried chicken skin etc.) and ihaw-ihaw (e.g, isaw, adidas, etc.) weekly</span>
																<RadioInput
																	name="high_fat"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "Yes", value: "Yes" },
																		{ label: "No", value: "No" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("high_fat", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
															</div>
															<div className="flex flex-col gap-2">
																<span className='text-sm font-semibold'>Dietary Fiber Intake</span>
																<div className="">
																<span className='text-xs'>3 Servings vegetables daily</span>
																<RadioInput
																	name="serving_vegetable"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "Yes", value: "Yes" },
																		{ label: "No", value: "No" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("serving_vegetable", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
																</div>
																<div className="">
																<span className='text-xs'>2-3 Servings of fruits daily</span>
																<RadioInput
																	name="serving_fruit"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "Yes", value: "Yes" },
																		{ label: "No", value: "No" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("serving_fruit", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
																</div>
															</div>
															<div className="flex flex-col gap-2">
																<span className='text-sm font-semibold'>Physical Activities</span>
																<span className='text-xs'>Does at least 2.5 hours a week of moderate-intensity physical activity</span>
																<RadioInput
																	name="moderate_intensity"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "Yes", value: "Yes" },
																		{ label: "No", value: "No" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("moderate_intensity", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
															</div>
															<div className="flex flex-col gap-2">
																<span className='text-sm font-semibold'>Presence or absence of Diabetes</span>
																<div className="">
																<RadioInput
																	name="high_fat"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "Yes", value: "Yes" },
																		{ label: "No", value: "No" },
																		{label: "We not Know", value: "We not Know"}
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("high_fat", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
																</div>
																<div className="">
																<RadioInput
																	name="medication_status"
																	label={<>If Yes,</>}
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "With Medication", value: "With Medication" },
																		{ label: "Without Medication", value: "Without Medication" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("medication_status", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
																<div className="flex flex-col gap-2">
																<span className='text-xs'>and perform Urine Test for kerones,</span>
																<span className='text-xs'>If No or Do not Know, proceed to question 2.</span>
																</div>
																</div>
																<div className="">
																<span className='text-sm'>2. Does patient have the following symptoms?</span>
																<div className="flex flex-col">
																<span className='text-sm font-semibold'>Polyphagia</span>
																<RadioInput
																	name="polyphagia"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "Yes", value: "Yes" },
																		{ label: "No", value: "No" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("polyphagia", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
																</div>
																<div className="flex flex-col">
																<span className='text-sm font-semibold'>Polydispsia</span>
																<RadioInput
																	name="polydispsia"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "Yes", value: "Yes" },
																		{ label: "No", value: "No" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("polydispsia", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
																</div>
																<div className="flex flex-col">
																<span className='text-sm font-semibold'>Polyuria</span>
																<RadioInput
																	name="polyuria"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "Yes", value: "Yes" },
																		{ label: "No", value: "No" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("polyuria", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
																</div>
																<span className='text-sm'>If two or more of the above symptoms are presents, perform a blood glucose test.</span>
																</div>
															</div>
															
														</div>
														<div className="flex flex-col gap-4">
																<div className="grid grid-cols-2 lg:grid-cols-2 gap-2 ml-1">
																<div className="flex flex-col gap-2">
																	<span className='text-sm font-semibold'>Raised Blood Glucose</span>
																	<RadioInput
																		name="blood_glucose"
																		error={errors?.medication_status}
																		register={register}
																	>
																		{[
																			{ label: "Yes", value: "Yes" },
																			{ label: "No", value: "No" },
																		].map((option) => (
																			<label
																				className="flex items-center gap-1 font-light text-sm"
																				key={`rdio-${option.value}`}
																			>
																				<input
																					type="radio"
																					value={option.value}
																					id={`irdio-${option.value}`}
																					{...register("blood_glucose", {
																						required: "This field is required",
																					})}
																				/>
																				{option.label}
																			</label>
																		))}
																	</RadioInput>
																	<span className='text-sm font-semibold mt-4'>FBS/RBS</span>
																	<div className="px-2 mb-2">
																	<input
																		type="text"
																		className="mt-1 p-2 border rounded-md w-24 text-sm"
																		{...register(
																			"cig_pack",
																			{}
																		)}
																	/>
																	<span className='text-sm'>&nbsp;mg/dL</span>
																	</div>
																	<div className="px-2 mb-2">
																	<input
																		type="text"
																		className="mt-1 p-2 border rounded-md w-24 text-sm"
																		{...register(
																			"cig_pack",
																			{}
																		)}
																	/>
																	<span className='text-sm'>&nbsp;mmol/L</span>
																	</div>
																	<div className="flex flex-col ">
																	<span className='text-sm'>Date Taken</span>
																	<input
																		type="date"
																		className="mt-1 p-2 border rounded-md w-32 text-sm"
																		{...register(
																			"cig_pack",
																			{}
																		)}
																	/>
																	
																	</div>
																</div>
																<div className="flex flex-col gap-2">
																	<span className='text-sm font-semibold'>Raised Blood Lipids</span>
																	<RadioInput
																		name="blood_glucose"
																		error={errors?.medication_status}
																		register={register}
																	>
																		{[
																			{ label: "Yes", value: "Yes" },
																			{ label: "No", value: "No" },
																		].map((option) => (
																			<label
																				className="flex items-center gap-1 font-light text-sm"
																				key={`rdio-${option.value}`}
																			>
																				<input
																					type="radio"
																					value={option.value}
																					id={`irdio-${option.value}`}
																					{...register("blood_glucose", {
																						required: "This field is required",
																					})}
																				/>
																				{option.label}
																			</label>
																		))}
																	</RadioInput>
																	<span className='text-sm font-semibold mt-4'>Total Cholesterol</span>
																	<div className="px-2 mb-3">
																	<input
																		type="text"
																		className="mt-1 p-2 border rounded-md w-24 text-sm"
																		{...register(
																			"cig_pack",
																			{}
																		)}
																	/>

																	</div>
																	<div className="px-2 mb-3">&nbsp;</div>
																	
																	<div className="flex flex-col mt-2">
																	<span className='text-sm'>Date Taken</span>
																	<input
																		type="date"
																		className="mt-1 p-2 border rounded-md w-32 text-sm"
																		{...register(
																			"cig_pack",
																			{}
																		)}
																	/>
																	
																	</div>
																</div>
																<div className="flex flex-col gap-2">
																	<span className='text-sm font-semibold'>Presence of Urine Ketones</span>
																	<RadioInput
																		name="blood_glucose"
																		error={errors?.medication_status}
																		register={register}
																	>
																		{[
																			{ label: "Yes", value: "Yes" },
																			{ label: "No", value: "No" },
																		].map((option) => (
																			<label
																				className="flex items-center gap-1 font-light text-sm"
																				key={`rdio-${option.value}`}
																			>
																				<input
																					type="radio"
																					value={option.value}
																					id={`irdio-${option.value}`}
																					{...register("blood_glucose", {
																						required: "This field is required",
																					})}
																				/>
																				{option.label}
																			</label>
																		))}
																	</RadioInput>
																	<span className='text-sm font-semibold mt-4'>Urine Ketone</span>
																	<div className="px-2 mb-3">
																	<input
																		type="text"
																		className="mt-1 p-2 border rounded-md w-24 text-sm"
																		{...register(
																			"cig_pack",
																			{}
																		)}
																	/>
																	</div>
																	
																	<div className="flex flex-col mt-2">
																	<span className='text-sm'>Date Taken</span>
																	<input
																		type="date"
																		className="mt-1 p-2 border rounded-md w-32 text-sm"
																		{...register(
																			"cig_pack",
																			{}
																		)}
																	/>
																	
																	</div>
																</div>
																<div className="flex flex-col gap-2">
																	<span className='text-sm font-semibold'>Presence of Urine Protein</span>
																	<RadioInput
																		name="blood_glucose"
																		error={errors?.medication_status}
																		register={register}
																	>
																		{[
																			{ label: "Yes", value: "Yes" },
																			{ label: "No", value: "No" },
																		].map((option) => (
																			<label
																				className="flex items-center gap-1 font-light text-sm"
																				key={`rdio-${option.value}`}
																			>
																				<input
																					type="radio"
																					value={option.value}
																					id={`irdio-${option.value}`}
																					{...register("blood_glucose", {
																						required: "This field is required",
																					})}
																				/>
																				{option.label}
																			</label>
																		))}
																	</RadioInput>
																	<span className='text-sm font-semibold mt-4'>Urine Protein</span>
																	<div className="px-2 mb-3">
																	<input
																		type="text"
																		className="mt-1 p-2 border rounded-md w-24 text-sm"
																		{...register(
																			"cig_pack",
																			{}
																		)}
																	/>
																	</div>
																	
																	<div className="flex flex-col mt-2">
																	<span className='text-sm'>Date Taken</span>
																	<input
																		type="date"
																		className="mt-1 p-2 border rounded-md w-32 text-sm"
																		{...register(
																			"cig_pack",
																			{}
																		)}
																	/>
																	
																	</div>
																</div>
																</div>
															
														</div>
														<div className="flex flex-col gap-4">
														<div className="flex flex-col gap-2 ml-2">
															<span className='text-xs font-semibold'>Questionnaire to Determine Probable Angina, Heart Attack, Stroke or Transient Ischemic Attack.</span>
															<div className="flex flex-col gap-2">
																<span className='text-xs'>Angina or Heart Attack</span>
																<RadioInput
																	name="high_fat"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "Yes", value: "Yes" },
																		{ label: "No", value: "No" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("high_fat", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
															</div>
															<div className="flex flex-col gap-2">
																<span className='text-xs'>1. Have you had any pain or comfort or any pressure or heaviness in your chest?</span>
																<RadioInput
																	name="high_fat"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "Yes", value: "Yes" },
																		{ label: "No", value: "No" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("high_fat", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
															</div>
															<div className="flex flex-col gap-2">
																<span className='text-xs'>2. Do you got the pain in the center of the chest or left arm?</span>
																<RadioInput
																	name="high_fat"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "Yes", value: "Yes" },
																		{ label: "No", value: "No" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("high_fat", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
															</div>
															<div className="flex flex-col gap-2">
																<span className='text-xs'>3. Do you get it when you walk uphill or hurry?</span>
																<RadioInput
																	name="high_fat"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "Yes", value: "Yes" },
																		{ label: "No", value: "No" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("high_fat", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
															</div>
															<div className="flex flex-col gap-2">
																<span className='text-xs'>4. Do you showdown if you get the pain while walking?</span>
																<RadioInput
																	name="high_fat"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "Yes", value: "Yes" },
																		{ label: "No", value: "No" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("high_fat", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
															</div>
															<div className="flex flex-col gap-2">
																<span className='text-xs'>5. Does the pain go away if you stand still or if you take a tablet under the tongue?</span>
																<RadioInput
																	name="high_fat"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "Yes", value: "Yes" },
																		{ label: "No", value: "No" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("high_fat", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
															</div>
															<div className="flex flex-col gap-2">
																<span className='text-xs'>6. Does the pain away in less than 10 minutes?</span>
																<RadioInput
																	name="high_fat"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "Yes", value: "Yes" },
																		{ label: "No", value: "No" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("high_fat", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
															</div>
															<div className="flex flex-col gap-2">
																<span className='text-xs'>7. Have you ever had a severe chest pain across the front of your chest lasting for half an hour or more?</span>
																<RadioInput
																	name="high_fat"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "Yes", value: "Yes" },
																		{ label: "No", value: "No" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("high_fat", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
																<span className='text-xs'>If the answer to Question 3 or 4 or 5 or 6 or 7 is Yes, patient have angina or heart attack and needs to see the doctor</span>
																<span className='text-xs font-semibold italic'>Stroke and TIA(Transient ischemic Attack)</span>
																<RadioInput
																	name="high_fat"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "Yes", value: "Yes" },
																		{ label: "No", value: "No" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("high_fat", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
															</div>
															<div className="flex flex-col gap-2">
																<span className='text-xs'>8. Have you ever had any of the following diggiculty in talking, weakness of arm and/or leg on one side of the body or numbness on one side of the body?</span>
																<RadioInput
																	name="high_fat"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "Yes", value: "Yes" },
																		{ label: "No", value: "No" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("high_fat", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
																<span className='text-xs'>If the answer to question 8 is YES, the patient may have a TIA or stroke and needs to see the doctor.</span>
																<span className='text-xs font-semibold italic'>Risk Level</span>
																<RadioInput
																	name="high_fat"
																	error={errors?.medication_status}
																	register={register}
																>
																	{[
																		{ label: "<10%", value: "<10%" },
																		{ label: "10% - <20%", value: "10% - <20%" },
																		{ label: "20% - <30%", value: "20% - <30%" },
																		{ label: "30% - <40%", value: "30% - <40%" },
																		{ label: "≥40%", value: "≥40%" },
																	].map((option) => (
																		<label
																			className="flex items-center gap-1 font-light text-sm"
																			key={`rdio-${option.value}`}
																		>
																			<input
																				type="radio"
																				value={option.value}
																				id={`irdio-${option.value}`}
																				{...register("high_fat", {
																					required: "This field is required",
																				})}
																			/>
																			{option.label}
																		</label>
																	))}
																</RadioInput>
															</div>
														</div>
														</div>
														</div>
												</CollapseDiv>
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

				</div>
			</Dialog>
		</Transition>
  )
}

export default forwardRef(UpdateHealthScreeningModal)

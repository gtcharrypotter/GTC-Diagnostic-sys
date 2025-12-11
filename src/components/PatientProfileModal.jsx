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

import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ActionBtn from "./buttons/ActionBtn";
import Axios from "../libs/axios";
import TabGroup from "./TabGroup";
import MenuTitle from "./buttons/MenuTitle";
import PatientProfileDetails from "./PatientProfileDetails";
import FlatIcon from "./FlatIcon";
import PatientPrescriptions from "./PatientPrescriptions";
import LaboratoryOrders from "./patient-modules/LaboratoryOrders";
import TBConfirmation from "../pages/doctor-patient-referrals/components/TBConfirmation";
import AppointmentDetails from "../pages/appointments/components/AppointmentDetails";
import PatientInfo from "../pages/patients/components/PatientInfo";
import useNoBugUseEffect from "../hooks/useNoBugUseEffect";
import PatientVitalCharts from "./PatientVitalCharts";
import ImagingOrder from "./patient-modules/ImagingOrder";
import AddEmergency from "../pages/doctor-patient-referrals/components/AddEmergency";
import ReferToHISModal from "../pages/opd-standalone/components/ReferToHISModal";
import AddPrescription from "../pages/doctor-patient-referrals/components/AddPrescription";
import PatientVitals from "./PatientVitals";
import PatientAppointments from "./PatientAppointments";
const AppointmentData = ({ mutateAll, appointment = null, patient = null}) => {
	const {
		register,
		setValue,
		handleSubmit,
		reset,
		trigger,
		control,
		watch,
		formState: { errors },
	} = useForm();
	const [itemsPharmacy, setItemsPharmacy] = useState([]);
	const [selectedDiagnosis, setSelectedDiagnosis] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);
	const [items, setItems] = useState([]);
	const [caseCode, setCaseCode] = useState([]);
	const [loading, setLoading] = useState(false);
	const [diagnosis, setDiagnosis] = useState(null);
	const [disposition, setDisposition] = useState(null);
	const [procedure, setProcedure] = useState(null);

	useNoBugUseEffect({
		functions: () => {
			getItems();
			getCaseCode();
		},
		params: [],
	});

	const getCaseCode = () => {
		let health_unit_id =
			appointment?.bhs_id > 0 ? appointment?.bhs_id : appointment?.rhu_id;
		Axios.get(`v1/case-code?location_id=${health_unit_id}`).then(
			(res) => {
				setCaseCode(res.data.data);
			}
		);
	};
	const getItems = () => {
		let health_unit_id =
			appointment?.bhs_id > 0 ? appointment?.bhs_id : appointment?.rhu_id;
		Axios.get(`v1/item-inventory?location_id=${health_unit_id}`).then(
			(res) => {
				setItems(res.data.data);
			}
		);
	};
	const prescribeItems = (data) => {
		setLoading(true);
		console.log("SUBMIT PRESCRIPTION", selectedDiagnosis);
		const formData = new FormData();
		if (appointment?.bhs_id > 0) {
			formData.append("type", "bhs");
		}
		if (appointment?.rhu_id > 0) {
			formData.append("type", "sa");
		}
		formData.append("appointment_id", appointment?.id);
		selectedDiagnosis.map((data) => {
			console.log("selectedItemsselectedDiagnosis", data);
			formData.append("diag[]", data?.diag?.id);
			formData.append("case_code[]", data?.diag?.case_code);
			formData.append("case_description[]", data?.diag?.case_description);
			formData.append("case_rate[]", data?.diag?.case_rate);
			formData.append("case_rate_code[]", data?.diag?.professional_fee);
			
		});
		formData.append("treatment_plan", data?.treatment_plan);
		
			formData.append("anicteric_sclerae", data?.anicteric_sclerae);
			formData.append("exudates", data?.exudates);
			formData.append("essentially_normal_heent", data?.essentially_normal_heent);
			formData.append("abnormal_pupillary", data?.abnormal_pupillary);
			formData.append("cervical_lympadenopathy", data?.cervical_lympadenopathy);
			formData.append("dry_mucous_membrane", data?.dry_mucous_membrane);
			formData.append("icteric_sclerae", data?.icteric_sclerae);
			formData.append("pale_conjunctivae", data?.pale_conjunctivae);
			formData.append("sunken_eyeballs", data?.sunken_eyeballs);
			formData.append("sunken_fontanelle", data?.sunken_fontanelle);
			formData.append("intact_tympanic", data?.intact_tympanic);
			formData.append("pupils_brisky", data?.pupils_brisky);
			formData.append("tonsillopharyngeal", data?.tonsillopharyngeal);
			formData.append("hypertropic_tonsils", data?.hypertropic_tonsils);
			formData.append("alar_flaring", data?.alar_flaring);
			formData.append("nasal_discharge", data?.nasal_discharge);
			formData.append("aural_discharge", data?.aural_discharge);
			formData.append("palpable_mass", data?.palpable_mass);
			formData.append("others_heent", data?.others_heent);
			formData.append("specify_heent", data?.specify_heent);
			
			//chest
			formData.append("symmetrical", data?.symmetrical);
			formData.append("lumps_over_breast", data?.lumps_over_breast);
			formData.append("clear_breath_sounds", data?.clear_breath_sounds);
			formData.append("retractions", data?.retractions);
			formData.append("crackles", data?.crackles);
			formData.append("wheezes", data?.wheezes);
			formData.append("essentially_normal_chest", data?.essentially_normal_chest);
			formData.append("asymmetrical_chest_expansion", data?.asymmetrical_chest_expansion);
			formData.append("decreased_breath_sounds", data?.decreased_breath_sounds);
			formData.append("enlarge_axillary", data?.enlarge_axillary);
			formData.append("others_chest", data?.others_chest);
			formData.append("specify_chest", data?.specify_chest);
		
			//heart
			formData.append("adynamic_precordium", data?.adynamic_precordium);
			formData.append("regular_rhythm", data?.regular_rhythm);
			formData.append("heaves", data?.heaves);
			formData.append("murmurs", data?.murmurs);
			formData.append("essentially_normal_heart", data?.essentially_normal_heart);
			formData.append("apex_beat", data?.apex_beat);
			formData.append("irregular_rhythm", data?.irregular_rhythm);
			formData.append("muffled_heart", data?.muffled_heart);
			formData.append("pericardial_bulge", data?.pericardial_bulge);
			formData.append("others_heart", data?.others_heart);
			formData.append("specify_heart", data?.specify_heart);
			
			
			//genitourinary
			formData.append("essentially_normal_genitourinary", data?.essentially_normal_genitourinary);
			formData.append("blood_stained", data?.blood_stained);
			formData.append("cervical_dilatation", data?.cervical_dilatation);
			formData.append("abnormal_discharge", data?.abnormal_discharge);
			formData.append("others_genitourinary", data?.others_genitourinary);
			formData.append("specify_genitourinary", data?.specify_genitourinary);
			
			//digital
			formData.append("essentially_normal_digital", data?.essentially_normal_digital);
			formData.append("enlarge_prospate", data?.enlarge_prospate);
			formData.append("mass", data?.mass);
			formData.append("hemorrhoids", data?.hemorrhoids);
			formData.append("pus", data?.pus);
			formData.append("not_applicable", data?.not_applicable);
			formData.append("others_digital", data?.others_digital);
			formData.append("specify_digital", data?.specify_digital);
			
			//skin
			formData.append("essentially_normal_skin", data?.essentially_normal_skin);
			formData.append("weak_pulses", data?.weak_pulses);
			formData.append("clubbing", data?.clubbing);
			formData.append("cold_clammy", data?.cold_clammy);
			formData.append("cyanosis", data?.cyanosis);
			formData.append("edema_swelling", data?.edema_swelling);
			formData.append("decreased_mobility", data?.decreased_mobility);
			formData.append("pale_nailbeds", data?.pale_nailbeds);
			formData.append("poor_skin_turgor", data?.poor_skin_turgor);
			formData.append("rashes_petechiae", data?.rashes_petechiae);
			formData.append("others_skin", data?.others_skin);
			formData.append("specify_skin", data?.specify_skin);

			//abdomen
			formData.append("flat", data?.flat);
			formData.append("hyperactive_bowel", data?.hyperactive_bowel);
			formData.append("tympanitic", data?.tympanitic);
			formData.append("uterine_contraction", data?.uterine_contraction);
			formData.append("flabby", data?.flabby);
			formData.append("globullar", data?.globullar);
			formData.append("muscle_guarding", data?.muscle_guarding);
			formData.append("tenderness_abdomen", data?.tenderness_abdomen);
			formData.append("palpable_mass", data?.palpable_mass);
			formData.append("essentially_normal_abodomen", data?.essentially_normal_abodomen);
			formData.append("abdomen_rigidity", data?.abdomen_rigidity);
			formData.append("abdominal_tenderness", data?.abdominal_tenderness);
			formData.append("other_abdomen", data?.other_abdomen);
			formData.append("specify_abdomen", data?.specify_abdomen);

			//neuro
			formData.append("developmental_delay", data?.developmental_delay);
			formData.append("abnormal_reflex", data?.abnormal_reflex);
			formData.append("poor_altered", data?.poor_altered);
			formData.append("poor_muscle_tone", data?.poor_muscle_tone);
			formData.append("poor_coordination", data?.poor_coordination);
			formData.append("seizures", data?.seizures);
			formData.append("normal", data?.normal);
			formData.append("motor_deficit", data?.motor_deficit);
			formData.append("sensory_deficit", data?.sensory_deficit);
			formData.append("essentially_normal_neuro", data?.essentially_normal_neuro);
			formData.append("abnormal_gait", data?.abnormal_gait);
			formData.append("abnormal_position", data?.abnormal_position);
			formData.append("abnormal_sensation", data?.abnormal_sensation);
			formData.append("others_neuro", data?.others_neuro);
			formData.append("specify_neuro", data?.specify_neuro);
			
			//management
			formData.append("not_applicable", data?.not_applicable);
			formData.append("breastfeeding_program", data?.breastfeeding_program);
			formData.append("counselling_for_smoking", data?.counselling_for_smoking);
			formData.append("counselling_for_lifestyle", data?.counselling_for_lifestyle);
			formData.append("oral_check", data?.oral_check);
			formData.append("other_management", data?.other_management);

		formData.append("_method", "PATCH");
		selectedItems.map((data) => {
			console.log("selectedItemsselectedItems", data);
			formData.append("inventory_id[]", data?.item?.inventory?.id);
			formData.append("quantity[]", data.quantity);
			formData.append("items[]", data?.item?.id);
			formData.append("sig[]", data?.notes || " ");
		});
		
		// return;
		Axios.post(`/v1/opd-standalone/prescribe/${appointment?.id}`, formData)
			.then((response) => {
				let data = response.data;
				// addToList(data);
				setTimeout(() => {
					// setAppointment(null);
				}, 100);
				setTimeout(() => {
					setLoading(false);
					toast.success("Prescription added successfully!");
					mutateAll();
				}, 400);
			})
			.finally(() => {
				setLoading(false);
			});
		
	};
	const noPrescribeItems = (data) => {
		setLoading(true);
		console.log("SUBMIT PRESCRIPTION", selectedDiagnosis);
		const formData = new FormData();
		if (appointment?.bhs_id > 0) {
			formData.append("type", "bhs");
		}
		if (appointment?.rhu_id > 0) {
			formData.append("type", "sa");
		}
		formData.append("appointment_id", appointment?.id);
		selectedDiagnosis.map((data) => {
			console.log("selectedItemsselectedDiagnosis", data);
			formData.append("diag[]", data?.diag?.id);
			formData.append("case_code[]", data?.diag?.case_code);
			formData.append("case_description[]", data?.diag?.case_description);
			formData.append("case_rate[]", data?.diag?.case_rate);
			formData.append("case_rate_code[]", data?.diag?.professional_fee);
			
		});
		formData.append("expire_date", data?.expire_date);
		formData.append("expired_time", data?.expired_time);

		formData.append("treatment_plan", data?.treatment_plan);
		
			formData.append("anicteric_sclerae", data?.anicteric_sclerae);
			formData.append("exudates", data?.exudates);
			formData.append("essentially_normal_heent", data?.essentially_normal_heent);
			formData.append("abnormal_pupillary", data?.abnormal_pupillary);
			formData.append("cervical_lympadenopathy", data?.cervical_lympadenopathy);
			formData.append("dry_mucous_membrane", data?.dry_mucous_membrane);
			formData.append("icteric_sclerae", data?.icteric_sclerae);
			formData.append("pale_conjunctivae", data?.pale_conjunctivae);
			formData.append("sunken_eyeballs", data?.sunken_eyeballs);
			formData.append("sunken_fontanelle", data?.sunken_fontanelle);
			formData.append("intact_tympanic", data?.intact_tympanic);
			formData.append("pupils_brisky", data?.pupils_brisky);
			formData.append("tonsillopharyngeal", data?.tonsillopharyngeal);
			formData.append("hypertropic_tonsils", data?.hypertropic_tonsils);
			formData.append("alar_flaring", data?.alar_flaring);
			formData.append("nasal_discharge", data?.nasal_discharge);
			formData.append("aural_discharge", data?.aural_discharge);
			formData.append("palpable_mass", data?.palpable_mass);
			formData.append("others_heent", data?.others_heent);
			
			//chest
			formData.append("symmetrical", data?.symmetrical);
			formData.append("lumps_over_breast", data?.lumps_over_breast);
			formData.append("clear_breath_sounds", data?.clear_breath_sounds);
			formData.append("retractions", data?.retractions);
			formData.append("crackles", data?.crackles);
			formData.append("wheezes", data?.wheezes);
			formData.append("essentially_normal_chest", data?.essentially_normal_chest);
			formData.append("asymmetrical_chest_expansion", data?.asymmetrical_chest_expansion);
			formData.append("decreased_breath_sounds", data?.decreased_breath_sounds);
			formData.append("enlarge_axillary", data?.enlarge_axillary);
			formData.append("others_chest", data?.others_chest);
		
			//heart
			formData.append("adynamic_precordium", data?.adynamic_precordium);
			formData.append("regular_rhythm", data?.regular_rhythm);
			formData.append("heaves", data?.heaves);
			formData.append("murmurs", data?.murmurs);
			formData.append("essentially_normal_heart", data?.essentially_normal_heart);
			formData.append("apex_beat", data?.apex_beat);
			formData.append("irregular_rhythm", data?.irregular_rhythm);
			formData.append("muffled_heart", data?.muffled_heart);
			formData.append("pericardial_bulge", data?.pericardial_bulge);
			formData.append("others_heart", data?.others_heart);
			
			
			//genitourinary
			formData.append("essentially_normal_genitourinary", data?.essentially_normal_genitourinary);
			formData.append("blood_stained", data?.blood_stained);
			formData.append("cervical_dilatation", data?.cervical_dilatation);
			formData.append("abnormal_discharge", data?.abnormal_discharge);
			formData.append("others_genitourinary", data?.others_genitourinary);
			
			//digital
			formData.append("essentially_normal_digital", data?.essentially_normal_digital);
			formData.append("enlarge_prospate", data?.enlarge_prospate);
			formData.append("mass", data?.mass);
			formData.append("hemorrhoids", data?.hemorrhoids);
			formData.append("pus", data?.pus);
			formData.append("not_applicable", data?.not_applicable);
			formData.append("others_digital", data?.others_digital);
			
			//skin
			formData.append("essentially_normal_skin", data?.essentially_normal_skin);
			formData.append("weak_pulses", data?.weak_pulses);
			formData.append("clubbing", data?.clubbing);
			formData.append("cold_clammy", data?.cold_clammy);
			formData.append("cyanosis", data?.cyanosis);
			formData.append("edema_swelling", data?.edema_swelling);
			formData.append("decreased_mobility", data?.decreased_mobility);
			formData.append("pale_nailbeds", data?.pale_nailbeds);
			formData.append("poor_skin_turgor", data?.poor_skin_turgor);
			formData.append("rashes_petechiae", data?.rashes_petechiae);
			formData.append("others_skin", data?.others_skin);

			//abdomen
			formData.append("flat", data?.flat);
			formData.append("hyperactive_bowel", data?.hyperactive_bowel);
			formData.append("tympanitic", data?.tympanitic);
			formData.append("uterine_contraction", data?.uterine_contraction);
			formData.append("flabby", data?.flabby);
			formData.append("globullar", data?.globullar);
			formData.append("muscle_guarding", data?.muscle_guarding);
			formData.append("tenderness_abdomen", data?.tenderness_abdomen);
			formData.append("palpable_mass", data?.palpable_mass);
			formData.append("essentially_normal_abodomen", data?.essentially_normal_abodomen);
			formData.append("abdomen_rigidity", data?.abdomen_rigidity);
			formData.append("abdominal_tenderness", data?.abdominal_tenderness);
			formData.append("other_abdomen", data?.other_abdomen);

			//neuro
			formData.append("developmental_delay", data?.developmental_delay);
			formData.append("abnormal_reflex", data?.abnormal_reflex);
			formData.append("poor_altered", data?.poor_altered);
			formData.append("poor_muscle_tone", data?.poor_muscle_tone);
			formData.append("poor_coordination", data?.poor_coordination);
			formData.append("seizures", data?.seizures);
			formData.append("normal", data?.normal);
			formData.append("motor_deficit", data?.motor_deficit);
			formData.append("sensory_deficit", data?.sensory_deficit);
			formData.append("essentially_normal_neuro", data?.essentially_normal_neuro);
			formData.append("abnormal_gait", data?.abnormal_gait);
			formData.append("abnormal_position", data?.abnormal_position);
			formData.append("abnormal_sensation", data?.abnormal_sensation);
			formData.append("others_neuro", data?.others_neuro);
			
			//management
			formData.append("not_applicable", data?.not_applicable);
			formData.append("breastfeeding_program", data?.breastfeeding_program);
			formData.append("counselling_for_smoking", data?.counselling_for_smoking);
			formData.append("counselling_for_lifestyle", data?.counselling_for_lifestyle);
			formData.append("oral_check", data?.oral_check);
			formData.append("other_management", data?.other_management);

			formData.append("_method", "PATCH");
		
			Axios.post(`/v1/opd-standalone/no-prescribe/${appointment?.id}`, formData)
				.then((response) => {
					let data = response.data;
					// addToList(data);
					setTimeout(() => {
						// setAppointment(null);
					}, 100);
					setTimeout(() => {
						setLoading(false);
						toast.success("Consultation successfully!");
						mutateAll();
					}, 400);
				})
				.finally(() => {
					setLoading(false);
				});
	}
	console.log('Profiling', appointment);
	return (
		<div>
			<div className="pb-4">
				<AppointmentDetails
					appointment={appointment}
					showService
					serviceComponent={
						<>
							{(appointment?.status == "in-service-result-reading" &&
								// "pending-for-pharmacy-release" &&
								appointment?.prescribed_by == null) ||
							appointment?.has_for_reading?.length > 0 ? (
								 <AddPrescription
								 	patient={patient}
								 	appointment={appointment}
									disposition={disposition}
									setDisposition={setDisposition}
								 	diagnosis={diagnosis}
								 	setDiagnosis={setDiagnosis}
								 	procedure={procedure}
								 	setProcedure={setProcedure}
								 	items={items}
								 	setItems={setItems}
									caseCode={caseCode}
								 	setCaseCode={setCaseCode}
									selectedDiagnosis={selectedDiagnosis}
									setSelectedDiagnosis={setSelectedDiagnosis}
								 	selectedItems={selectedItems}
								 	setSelectedItems={setSelectedItems}
								 	prescribeItems={prescribeItems}
									noPrescribeItems={noPrescribeItems}
								 	loading={loading}
								 />
								
							) : (
								""
							)}
						</>
					}
				/>

			</div>
		</div>
	); 
};


const PatientProfileModal = (props, ref) => {
	const { mutateAll, pendingOrdersRef, appointment } = props;
	const [patient, setPatient] = useState(null);
	const [showData, setShowData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [full, setFull] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);
	const referEmergencyRef = useRef(null);
	const {
		register,
		setValue,
		handleSubmit,
		reset,
		trigger,
		control,
		watch,
		formState: { errors },
	} = useForm();
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));
	

	const show = (data) => {
		setFull(false);
		setShowData(data);
		setPatient(data?.patient);
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};
	const noHide = () => {};
	const sendPatientToLab = () => {
		setLoading(true);
		Axios.post(
			`/v1/doctor/laboratory-order/send-patient-to-laboratory/${showData?.id}`,
			{
				_method: "PATCH",
			}
		).then((res) => {
			if (res?.data?.pending_lab_orders?.length == 0) {
				toast.error("Error! NO PENDING LABORATORY ORDER.");
			} else {
				toast.success(
					"Success! Patient sent to Laboratory/Imaging for test(s)."
				);
				setLoading(false);
				mutateAll();
				hide();
			}
		});
	};
	const proceedConsultation = () => {
		let formdata = new FormData();
		formdata.append("_method", "PATCH");
		Axios.post(`v1/opd-standalone/proceed-consult/${showData?.id}`, formdata)
			.then((res) => {
				toast.success("Proceed to Consultation!");
				hide();
				mutateAll();
			})
			.finally(() => {
				setTimeout(() => {
					console.log("Proceed Consultation Activated");
				}, 1000);
			});
	}
	
	return (
		<Transition appear show={modalOpen} as={Fragment}>
			<Dialog as="div" className="" onClose={noHide}>
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
							<Dialog.Panel
								className={`w-full transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all ${
									full
										? " lg:max-w-[99vw]"
										: " lg:max-w-[80vw]"
								} `}
							>
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex relative flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									<span className="text-xl text-left font-bold  text-blue-900">
										Patient Profile
									</span>
									{full ? (
										""
									) : (
										<ActionBtn
											type="foreground"
											size="sm"
											className="absolute top-4 right-24 "
											onClick={() => {
												setFull((prevVal) => !prevVal);
											}}
										>
											<FlatIcon icon="br-expand-arrows-alt" />{" "}
											Fullscreen
										</ActionBtn>
									)}
									<ActionBtn
										type="danger"
										size="sm"
										className="absolute top-4 right-4 "
										onClick={hide}
									>
										<FlatIcon icon="br-cross-small" /> Close
									</ActionBtn>
								</Dialog.Title>
								<div className="flex flex-col gap-y-4 relative min-h-[calc(100dvh-152px)]">
									<div className="flex flex-col">
										<div className="flex flex-col lg:flex-row gap-4 items-center px-4 pt-4 border-b justify- md:justify-start bg-slate-50 p-4 h-full">
											<PatientInfo patient={patient} />
											<div className="flex items-center justify-end  w-1/2 flex-wrap gap-3 ml-auto">
												{showData?.status ==
												"in-service-consultation" ? (
													<>
													<div className="flex flex-col gap-2 ml-auto">
														
														<ActionBtn
															type="success"
															loading={loading}
															size="lg"
															onClick={handleSubmit(proceedConsultation)}
															
														>
															<FlatIcon
																className="text-3xl mr-1	"
																icon="rr-right"
															/>
															<div className="flex flex-col text-left">
																<span className="font-bold -mb-1">
																	CONSULT
																</span>
																<span className="text-[10px] font-light max-w-[256px]">
																	Patient
																	with
																	laboratory/imaging result
																</span>
															</div>
														</ActionBtn>

													<ActionBtn
															type="secondary"
															loading={loading}
															size="lg"
															onClick={() => {
																if (
																	pendingOrdersRef
																) {
																	console.log(
																		"pendingOrdersRef",
																		pendingOrdersRef
																	);
																	pendingOrdersRef?.current.show(
																		{
																			data: showData,
																			fn: sendPatientToLab,
																		}
																	);
																	hide();
																}
															}}
															className="px-4"
														>
															<FlatIcon
																className="text-3xl mr-1	"
																icon="rr-right"
															/>
															<div className="flex flex-col text-left">
																<span className="font-bold -mb-1">
																	SEND ORDERS
																</span>
																<span className="text-[10px] font-light max-w-[256px]">
																	Patient
																	queue to
																	laboratory/imaging
																</span>
															</div>
														</ActionBtn>

													</div>
														
													</>
												) : (
													<div className="flex flex-col gap-4 ml-auto">
												<div className="flex gap-4 ml-auto">
													<div className="flex flex-col items-center">
													
													<span className="text-gray-900 text-center text-sm font-bold">PHILHEALTH IDENTIFICATION NUMBER (PIN)</span>
													
													<span className="text-gray-900 text-center">{showData?.patient?.philhealth?.replace(/(\d{2})(\d{9})(\d{1})/, '$1-$2-$3')}</span>
													<span className="text-gray-900 text-center text-sm font-bold">({patient?.patient_member_phic_type})</span>
													
													</div>
													
											</div>
											
											</div>
												)}

												
											</div>
										</div>
										<div>
											<TabGroup
												tabClassName={`py-3 bg-slate-100 border-b`}
												contentClassName={
													"max-h-[unset]"
												}
												contents={[
													{
														title: (
															<MenuTitle src="/profile.png">
																Appointment Data
															</MenuTitle>
														),

														content: (
															<AppointmentData
																appointment={
																	showData
																}
																mutateAll={() => {
																	mutateAll();
																	hide();
																}}
																patient={
																	patient
																}
															/>
														),
													},
													{
														title: (
															<MenuTitle src="/profile.png">
																Profile
															</MenuTitle>
														),

														content: (
															<PatientProfileDetails
																patient={
																	patient
																}
															/>
														),
													},

													{
														title: (
															<MenuTitle src="/patient.png">
																Past
																Appointments
															</MenuTitle>
														),
														content: (
															<PatientAppointments
															appointment={appointment}
																patient={
																	patient
																}
															/>
														),
													},
													{
														title: (
															<MenuTitle src="/vitals/vitals.png">
																Vital Signs
															</MenuTitle>
														),

														content: (
															<PatientVitals
															showTitle={false}
															patient={
																	patient
																}
															/>
														),
													},
													{
														title: (
															<MenuTitle src="/vitals/vitals.png">
																Vital Chart
															</MenuTitle>
														),

														content: (
															<PatientVitalCharts
																patient={
																	patient
																}
															/>
														),
													},
													
													

													{
														title: (
															<MenuTitle src="/laboratory.png">
																Laboratory
																{JSON.stringify(
																	showData?.lab_orders ||
																		{}
																).includes(
																	`"type":"laboratory-test"`
																) ? (
																	<>
																		<span className="text-white bg-red-600 absolute top-1 right-1 rounded-full w-3 h-3 flex items-center justify-center animate-ping"></span>
																		<span className="text-white bg-red-600 absolute top-1 right-1 rounded-full w-3 h-3 flex items-center justify-center animate-"></span>
																		<span className="absolute top-0 rounded-xl left-0 h-full w-full border border-red-500 animate-pulse"></span>
																	</>
																) : (
																	""
																)}
															</MenuTitle>
														),
														content: (
															<LaboratoryOrders
																patient={
																	patient
																}
																laboratory_test_type={
																	2
																}
																appointment={
																	showData
																}
																allowCreate={
																	true
																}
															/>
														),
													},
													{
														title: (
															<MenuTitle src="/laboratory/imaging.png">
																Imaging
																{JSON.stringify(
																	showData?.lab_orders ||
																		{}
																).includes(
																	`"type":"imaging"`
																) ? (
																	<>
																		<span className="text-white bg-red-600 absolute top-1 right-1 rounded-full w-3 h-3 flex items-center justify-center animate-ping"></span>
																		<span className="text-white bg-red-600 absolute top-1 right-1 rounded-full w-3 h-3 flex items-center justify-center animate-"></span>
																		<span className="absolute top-0 rounded-xl left-0 h-full w-full border border-red-500 animate-pulse"></span>
																	</>
																) : (
																	""
																)}
															</MenuTitle>
														),
														content: (
															<ImagingOrder
																appointment={
																	showData
																}
																laboratory_test_type={
																	1
																}
																patient={
																	patient
																}
																allowCreate={
																	true
																}
															/>
														),
													},

													{
														title: (
															<MenuTitle src="/healthcare.png">
																Prescriptions
															</MenuTitle>
														),
														content: (
															<PatientPrescriptions
																patient={
																	patient
																}
															/>
														),
													},
													{
														title: (
															<MenuTitle src="/odk.png">
																ODK
															</MenuTitle>
														),
														content: (
															<PatientPrescriptions
																patient={
																	patient
																}
															/>
														),
													},
													{
														title: (
															<MenuTitle src="/pregnant.png">
																FHSIS
															</MenuTitle>
														),
														content: (
															<PatientPrescriptions
																patient={
																	patient
																}
															/>
														),
													},
													
												]}
											/>
										</div>
									</div>
								</div>

								<div className="px-4 py-3 border-t flex items-center justify-end bg-slate-">
									<ActionBtn type="danger" className="px-5" onClick={hide}>
										CLOSE
									</ActionBtn>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
					<ReferToHISModal 
					ref={referEmergencyRef} 
					patient={patient}
					appointment={showData}
					 onCloseParentModal={hide}
					/>
				</div>
			</Dialog>
		</Transition>
	);
};

export default forwardRef(PatientProfileModal);

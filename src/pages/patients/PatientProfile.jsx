/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import FlatIcon from "../../components/FlatIcon";
import Img from "../../components/Img";
import PatientAppointments from "../../components/PatientAppointments";
import PatientPrescriptions from "../../components/PatientPrescriptions";
import PatientProfileDetails from "../../components/PatientProfileDetails";
import PatientVitals from "../../components/PatientVitals";
import TabGroup from "../../components/TabGroup";
import MenuTitle from "../../components/buttons/MenuTitle";
import { calculateAge, formatDate, patientFullName } from "../../libs/helpers";
import CreateAppointmentsModal from "./components/CreateAppointmentsModal";
import ActionBtn from "../../components/buttons/ActionBtn";
import PrivacyPolicyModal from "../../components/modal/PrivacyPolicyModal";
import PatientVitalCharts from "../../components/PatientVitalCharts";
import { useAuth } from "../../hooks/useAuth";
import AppointmentChoiceModal from "./components/AppointmentChoiceModal";
import NewAppointmentModal from "../../components/modal/NewAppointmentModal";
import PatientChartsAnesthesia from "../department/his-anesthesia/components/PatientChartsAnesthesia";
import LaboratoryResult from "../department/his-anesthesia/components/LaboratoryResult";
import ImagingResult from "../department/his-anesthesia/components/ImagingResult";
import AddPatientOperation from "../department/his-anesthesia/components/modal/AddPatientOperation";
import ProcedureChoiceModal from "../department/his-anesthesia/components/modal/ProcedureChoiceModal";
import AddPatientForDeliveryModal from "../department/his-anesthesia/components/modal/AddPatientForDeliveryModal";
import PatientCSROrder from "../department/his-nurse/components/PatientCSROrder";
import PatientPharmacyOrder from "../department/his-nurse/components/PatientPharmacyOrder";
import AddEmergencyCareModal from "../hims/his-er/modal/CreateOPDEmergencyCareModal";
import CreateEmergencyCareModal from "../hims/his-er/modal/CreateEmergencyCareModal";
import CreateOPDEmergencyCareModal from "../hims/his-er/modal/CreateOPDEmergencyCareModal";
import EmergencyChoiceModal from "../hims/his-er/modal/EmergencyChoiceModal";
import InfoText from "../../components/InfoText";
import CreateOPDModal from "../hims/his-opd/components/CreateOPDModal";
import CreateInfectiousERModal from "../hims/his-er/infectious/modal/CreateInfectiousERModal";
import NewOPDAppointmentModal from "../opd-standalone/components/NewOPDAppointmentModal";
import ReferToSPHModal from "../../components/modal/ReferToSPHModal";
import PatientImg from "../../components/PatientImg";
import FollowUpAppointmentModal from "../opd-standalone/components/FollowUpAppointmentModal";
import PhilhealthEligibilityModal from "../../components/modal/PhilhealthEligibilityModal";
import NewHealthScreeningModal from "../opd-standalone/components/NewHealthScreeningModal";
import NewConsultationModal from "../opd-standalone/components/NewConsultationModal";
import UpdateHealthScreeningModal from "../opd-standalone/components/UpdateHealthScreeningModal";
import HealthAssessment from "../../components/HealthAssessment";
import NewEncounterModal from "../opd-standalone/components/NewEncounterModal";
// import ReferToRHUModal from "./components/ReferToRHUModal";

const PatientProfile = (props) => {
	const { patient, appointment } = props;
	const { checkUserType } = useAuth();
	const createAppointmentRef = useRef(null);
	const privacyRef = useRef(null);
	const privacyOPDRef = useRef(null);
	const privacyFollowUpRef = useRef(null);
	const referToRHURef = useRef(null);
	const referToSPHRef = useRef(null);
	const referToERInfectiousRef = useRef(null);
	const appointmentChoiceRef = useRef(null);
	const opdRef = useRef(null);
	const followUpRef = useRef(null);
	const bookTeleMedicineRef = useRef(null);
	const operationProcedureRef = useRef(null);
	const operationDeliveryRef = useRef(null);
	const procedureChoiceRef = useRef(null);
	const emergencyChoiceRef = useRef(null);
	const encounterRef = useRef(null);
	const privacyConsulationRef = useRef(null);
	const consultationRef = useRef(null);
	const eligibilityRef = useRef(null);
	const updateAssessmentRef = useRef(null);
	const [patientSelfie, setPatientSelfie] = useState(null);

	console.log('Appointment Details', patient)
	return (
		<div className="flex flex-col">
			<div className="flex flex-col lg:flex-row gap-4 items-center px-4 pt-4 border-b justify- md:justify-start bg-slate-50 p-4 h-full">
				<div className="group relative h-[108px] w-[108px] min-h-[108px] min-w-[108px] rounded-full aspect-square bg-background">
					<PatientImg
						type="user"
						name={`${patient?.lastname}-${patient?.firstname}-${patient?.middle}`}
						src={patient?.avatar || ""}
						className="min-h-[108px] min-w-[108px] aspect-square object-cover rounded-full"
						alt=""
						id="user-image-sample"
						key={`key-${patient?.id}-${patient?.avatar}`}
					/>
				</div>
				<div className="flex flex-col pl-4">
					<h6
						className={`text-left text-2xl mb-1 font-semibold flex items-center capitalize ${
							String(patient?.gender).toLowerCase() == "male"
								? "text-blue-800"
								: "text-pink-800"
						} mb-0`}
					>
						{patientFullName(patient)}
					</h6>
					<div className="flex gap-6 mb-2">
						<div className="flex items-center gap-2 text-base">
							<FlatIcon
								icon="rr-calendar-clock"
								className="text-base"
							/>
							<span>
								{calculateAge(patient?.birthday)} yrs. old
							</span>
						</div>
						<div className="flex items-center gap-2 text-base">
							<FlatIcon
								icon="rr-calendar"
								className="text-base"
							/>
							<span>{formatDate(patient?.birthday)}</span>
						</div>
					</div>
					<div className="flex gap-4 mb-2">
						<div className="flex items-center gap-2 text-base">
							<FlatIcon
								icon="rr-venus-mars"
								className="text-base"
							/>
							{String(patient?.gender).toLowerCase() == "male" ? (
								<span className="text-blue-700">Male</span>
							) : (
								<span className="text-pink-700">Female</span>
							)}
						</div>
					</div>
					{/* <div className="flex gap-4 mb-2">
					{checkUserType("NURSE") ? (
						<ActionBtn
							type="primary-dark"
							className="h-6 !rounded-[30px]"
							onClick={() => {
								eligibilityRef.current.show();
							}}
						>
							<FlatIcon icon="rr-memo-circle-check" />
							Check Eligibility
						</ActionBtn>
					) : (
						""
					)}
					</div> */}
					
				</div>

				<div className="flex gap-4 ml-auto">
							<div className="flex flex-col items-center">
						
							<span className="text-gray-900 text-center text-sm font-bold">PHILHEALTH IDENTIFICATION NUMBER (PIN)</span>
							
							<span className="text-gray-900 text-center">{patient?.philhealth?.replace(/(\d{2})(\d{9})(\d{1})/, '$1-$2-$3')}</span>
							<span className="text-gray-900 text-center text-sm font-bold">({patient?.patient_member_phic_type})</span>
							
							{checkUserType("NURSE") ? (
								<ActionBtn
									type="secondary"
									className="h-12 !rounded-[30px] font-medium px-4"
									onClick={() => {
										// procedureChoiceRef.current.show({patient: patient});
										// privacyRef.current.show();
										appointmentChoiceRef.current.show();
										// opdRef.current.show({patient: patient});
									}}
								>
									<FlatIcon icon="bs-add-folder" />
									CREATE APPOINTMENT
								</ActionBtn>
							) : (
								""
							)}
				</div>
					</div>
				
				
			</div>
			<div>
				<TabGroup
		tabClassName={`py-3 bg-slate-100 border-b`}
		contents={[
        {
            title: (
                <MenuTitle src="/profile.png">
                    Profile
                </MenuTitle>
            ),
            content: (
                <PatientProfileDetails patient={patient} />
            ),
        },

        {
            title: (
                <MenuTitle src="/patient.png">
                    Past
					Appointments
                </MenuTitle>
            ),
            content: <PatientAppointments patient={patient} appointment={appointment} />,
        },
		{
            title: (
                <MenuTitle src="/vitals/vitals.png">
                    Vital Chart
                </MenuTitle>
            ),
            content: <PatientVitalCharts patient={patient} />,
			
        },
        
       
    ]}
/>

				
			</div>
			<CreateAppointmentsModal
				referToRHURef={referToRHURef}
				ref={createAppointmentRef}
				patientSelfie={patientSelfie}
				setPatientSelfie={setPatientSelfie}
			/>
			<CreateInfectiousERModal
				ref={referToERInfectiousRef}
				patientSelfie={patientSelfie}
				setPatientSelfie={setPatientSelfie}
			/>
			
			<ProcedureChoiceModal
				ref={procedureChoiceRef}
			onClickDelivery={() => {
				operationProcedureRef.current.show({
				patient,
				appointment,
			});
			}}
			onClickSurgery={() => {
				operationDeliveryRef.current.show({
				patient,
				appointment,
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
			/>

			<EmergencyChoiceModal 
			ref={emergencyChoiceRef}
			onClickOPDEmergency={() => {
				privacyOPDRef.current.show({
				patient,
				appointment,
			});
			}}
				
			/>
			
			<NewOPDAppointmentModal 
			referToSPHRef={referToSPHRef}
			ref={followUpRef} 
			patientSelfie={patientSelfie}
			setPatientSelfie={setPatientSelfie}
			/>
			<PrivacyPolicyModal
				ref={privacyConsulationRef}
				onSuccess={(data) => {
					consultationRef.current.show({ patient, appointment });
				}}
				patientSelfie={patientSelfie}
				setPatientSelfie={setPatientSelfie}
			/>

			{checkUserType("NURSE") ? (
			<AppointmentChoiceModal
				ref={appointmentChoiceRef}
				patient={patient}
				onClickHealthScreening={() => {
					opdRef.current.show({ patient });
				}}
				onClickEncounter={() => {
					encounterRef.current.show({ patient });
				}}
				onClickConsultation={() => {
					privacyConsulationRef.current.show({ patient: patient, appointment: appointment });
				}}
				onClickAhef={() => {}}
				
				onClickTelemedicine={() => {
					bookTeleMedicineRef.current.show();
				}}
			/>
				) :(
					""
				)}
			
			<NewAppointmentModal
				ref={bookTeleMedicineRef}
				onClickHealthScreening={() => {
					privacyRef.current.show({ patient: patient });
				}}
				onClickAhef={() => {}}
				onClickTelemedicine={() => {
					bookTeleMedicineRef.current.show();
				}}
			/>
			<PrivacyPolicyModal
				ref={privacyFollowUpRef}
				onSuccess={(data) => {
					followUpRef.current.show({ patient, appointment });
				}}
				patientSelfie={patientSelfie}
				setPatientSelfie={setPatientSelfie}
			/>
			<NewHealthScreeningModal 
			referToSPHRef={referToSPHRef}
			ref={opdRef} 
			/>
			<NewConsultationModal 
			referToSPHRef={referToSPHRef}
			ref={consultationRef} 
			patientSelfie={patientSelfie}
			setPatientSelfie={setPatientSelfie}
			/>
			<FollowUpAppointmentModal 
			referToSPHRef={referToSPHRef}
			ref={followUpRef} 
			patientSelfie={patientSelfie}
			setPatientSelfie={setPatientSelfie}
			/>
			<NewEncounterModal 
			referToSPHRef={referToSPHRef}
			ref={encounterRef} 
			/>
			<ReferToSPHModal 
				ref={referToSPHRef}
				// onSuccess={onSuccess}
				patientSelfie={patientSelfie}
				patient={patient}
			/>
			{/* <PhilhealthEligibilityModal 
			patient={patient}
			appointment={appointment}
			ref={eligibilityRef}/> */}
			
		</div>
	);
};

export default PatientProfile;

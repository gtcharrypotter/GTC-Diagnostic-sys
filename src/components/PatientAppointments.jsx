/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import useDataTable from "../hooks/useDataTable";
import { formatDateMMDDYYYY, formatDateMMDDYYYYHHIIA } from "../libs/helpers";
import FlatIcon from "./FlatIcon";
import ActionBtn from "./buttons/ActionBtn";
import Pagination from "./table/Pagination";
import Table from "./table/Table";
import NewAppointmentModal from "./modal/NewAppointmentModal";
import { v4 as uuidv4 } from "uuid";
import Tippy from "@tippyjs/react";
import ShowAppointmentModal from "./modal/ShowAppointmentModal";
import { useAuth } from "../hooks/useAuth";
import ContentTitle from "./buttons/ContentTitle";
import CreatePrescriptionModal from "./patient-modules/modals/CreatePrescriptionModal";
import SelectItemModal from "./modal/SelectItemModal";
import ClaimsFormFullscreenModal from "../pages/hims/his-billing/component/pmrf-claims/fullscreen/ClaimsFormFullscreenModal";
import NewOPDAppointmentModal from "../pages/opd-standalone/components/NewOPDAppointmentModal";
import PrivacyPolicyModal from "./modal/PrivacyPolicyModal";
import ConsultationServicesModal from "./modal/ConsultationServicesModal";
import FollowUpAppointmentModal from "../pages/opd-standalone/components/FollowUpAppointmentModal";
import ViewPastAppointmentModal from "./modal/ViewPastAppointmentModal";
import ViewScreeningModal from "./modal/ViewScreeningModal";
import ConsultationChoiceModal from "../pages/patients/components/ConsultationChoiceModal";
import NewConsultationModal from "../pages/opd-standalone/components/NewConsultationModal";
const uniq_id = uuidv4();
const PatientAppointments = (props) => {
	const { patient, appointment } = props;
	const consultationRef = useRef(null);
	const viewPastAppointmentRef = useRef(null)
	const viewHealthScreening = useRef(null);
	const consultationChoiceRef = useRef(null);
	const privacyConsulationRef = useRef(null);
	const bookTeleMedicineRef = useRef(null);
	const referToSPHRef = useRef(null);
	const newConsultationRef = useRef(null);
	const [patientSelfie, setPatientSelfie] = useState(null);
	const {
		page,
		setPage,
		meta,
		setMeta,
		loading,
		setLoading,
		paginate,
		setPaginate,
		data,
		setData,
		column,
		setColumn,
		direction,
		setDirection,
		filters,
		setFilters,
	} = useDataTable({
		url: `v1/opd-standalone/patient-assessment/${patient?.id}`,
		defaultFilters: {
			patient_id: patient?.id,
			key: uniq_id,
		},
	});
	const {
		data: appointmentData,
	} = useDataTable({
		url: `v1/clinic/appointments/${patient?.id}`,
		defaultFilters: {
			status: 'done',
			patient_id: patient?.id,
			key: uniq_id,
		},
	});
	console.log("aaaaaaaaaaaaaaaaaaaaaaa", data)
	return (
		<div className="flex flex-col items-start">
			<ContentTitle title="Past Appointments" />

			<Table
				className={`pb-2`}
				loading={loading}
				columns={[
					{
						header: "Appointment Date/Time",
						className: "w-[220px] text-center",
						tdClassName: "text-center",
						key: "date",
						cell: (data) => {
							return (
								<div className="flex flex-col">
									<span className="text-slate-800 font-[500] flex items-center ">
										<span className="-mb-[2px] mr-2">
											<FlatIcon icon="rr-calendar" />
										</span>
										{formatDateMMDDYYYYHHIIA(
											new Date(data?.created_at)
										)}
									</span>
								</div>
							);
						},
					},
					{
						header: "Transaction Number",
						className: "w-[220px] text-center",
						tdClassName: "text-center",
						key: "date",
						cell: (appointmentData) => {
							return (
								<div className="flex flex-col">
									<span className="text-slate-800 font-[500] flex items-center ">
										<span className="-mb-[2px] mr-2">
										</span>
										{appointmentData?.patient?.case_no}
									</span>
								</div>
							);
						},
					},
					
					{
						header: "Doctor",
						className: "text-center",
						tdClassName: "text-center",
						key: "doctor",
						cell: (appointmentData) => {
							return `${appointmentData?.referredToDoctor?.title || "Dr."} ${
								appointmentData?.referredToDoctor?.name || "-"
							}`;
						},
					},
					{
						header: "Chief complaint",
						className: "w-[] text-center",
						tdClassName: "text-center",
						key: "pre_notes",
					},
					{
						header: "Diagnosis Code",
						className: "text-center",
						tdClassName: "text-center",
						key: "diagnosis",
						cell: (appointmentData) => {
							return (
								<div className="flex flex-col">
									<span className="text-slate-800 font-[500] flex items-center ">
										<span className="text-xs">
											{appointmentData?.diagnosis?.diagnosis_code}
										</span>
									</span>
								</div>
							);
						},
						
					},
					{
						header: "Action",
						className: "w-[200px] text-center",
						tdClassName: "text-center",
						key: "action",
						cell: (appointmentData) => {
									return (
										<div className="flex flex-col items-center justify-center flex-wrap gap-2">
											<ActionBtn
													size="sm"
													type="secondary"
													onClick={() => {
														viewHealthScreening.current.show();
													}}
												>
													<FlatIcon icon="rr-eye" />
													View 1st Tranche
												</ActionBtn>
												<ActionBtn
													size="sm"
													type="success"
													onClick={() => {
														viewPastAppointmentRef.current.show(appointmentData);
													}}
												>
													<FlatIcon icon="rr-eye" />
													View 2nd Tranche
												</ActionBtn>
												{/* {appointmentData?.tranche === '0' ?(
													<ActionBtn
													size="sm"
													type="success"
													onClick={() => {
														viewPastAppointmentRef.current.show(data);
													}}
												>
													<FlatIcon icon="rr-eye" />
													View 2nd Tranche
												</ActionBtn>
												)  : (
												<ActionBtn
													size="sm"
													type="foreground-dark"
													onClick={() => {
														consultationChoiceRef.current.show();
													}}
												>
													<FlatIcon icon="rr-add" />
													Create Consultation
												</ActionBtn>
												)} */}
										</div>
									);
								},
					},
					
				]}
				data={appointmentData}
			/>
			<Pagination
				page={page}
				setPage={setPage}
				pageCount={meta?.last_page}
				pageSize={paginate}
				setPageSize={setPaginate}
			/>

			<ConsultationServicesModal 
			ref={consultationRef}
			patient={patient}
			/>
			<ViewPastAppointmentModal 
			ref={viewPastAppointmentRef}
			// appointment={appointmentData}
			/>
			<ViewScreeningModal 
			ref={viewHealthScreening}
			patient={patient}
			/>
			<NewConsultationModal
			referToSPHRef={referToSPHRef}
			ref={newConsultationRef} 
			patientSelfie={patientSelfie}
			setPatientSelfie={setPatientSelfie}
			/>
			<PrivacyPolicyModal
				ref={privacyConsulationRef}
				onSuccess={(data) => {
					newConsultationRef.current.show({ patient, screening: data});
				}}
				patientSelfie={patientSelfie}
				setPatientSelfie={setPatientSelfie}
			/>
			<ConsultationChoiceModal 
			ref={consultationChoiceRef}
			patient={patient}
			onClickConsultation={() => {
					privacyConsulationRef.current.show({ patient: patient });
				}}
			onClickTelemedicine={() => {
					bookTeleMedicineRef.current.show();
				}}
			/>
			
		</div>
	);
};

export default PatientAppointments;

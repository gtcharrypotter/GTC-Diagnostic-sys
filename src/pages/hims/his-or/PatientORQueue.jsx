import React, { useRef, useState } from 'react';
import InServiceOR from './components/InServiceOR';
import AppLayout from '../../../components/container/AppLayout';
import { doctorSpecialty, formatDate, formatDateTime, patientFullName } from '../../../libs/helpers';
import ActionBtn from '../../../components/buttons/ActionBtn';
import { Fade } from 'react-reveal';
import PatientInfo from '../../patients/components/PatientInfo';
import useNoBugUseEffect from '../../../hooks/useNoBugUseEffect';
import useDoctorQueue from '../../../hooks/useDoctorQueue';
import { useAuth } from '../../../hooks/useAuth';
import useORQueue from '../../../hooks/useORQueue';
import InQueueOr from './components/InQueueOr';
import AppointmentDetailsForOr from './components/AppointmentDetailsForOr';
import FlatIcon from '../../../components/FlatIcon';
import AddPatientOperation from '../../department/his-anesthesia/components/modal/AddPatientOperation';
import AddPatientForDeliveryModal from '../../department/his-anesthesia/components/modal/AddPatientForDeliveryModal';
import ProcedureChoiceModal from '../../department/his-anesthesia/components/modal/ProcedureChoiceModal';
import Axios from '../../../libs/axios';

const Status = ({ appointment }) => {
	const renderStatus = () => {
		if (appointment?.has_for_reading?.length > 0) {
			return <span className="text-orange-500">Pending for Result Reading</span>;
		}
		if (appointment?.for_or?.length > 0) {
			return <span className="text-orange-500">Pending for OR screening</span>;
		}
		if (appointment?.status === "pending" && appointment?.vital_id == null) {
			return <span className="text-orange-500">Pending for patient vitals {appointment?.vital_id}</span>;
		}
		if (appointment?.status === "pending" && appointment?.vital_id != null) {
			return <span className="text-orange-600">Pending for service</span>;
		}
		if (appointment?.status === "pending-doctor-confirmation" && appointment?.vital_id != null && appointment?.referred_to != null) {
			return <span className="text-orange-600">Pending for doctor's confirmation</span>;
		}
		if (appointment?.status === "pending-for-pharmacy-release" && appointment?.prescribed_by == null) {
			return <span className="text-orange-600">For Doctor Prescription</span>;
		}
		if (appointment?.status === "pending-for-pharmacy-release" && appointment?.prescribed_by != null) {
			return <span className="text-orange-600">For Medicine release</span>;
		}
		if (appointment?.status === "in-service-consultation") {
			return <span className="text-orange-600">CONSULTATION WITH DOCTOR</span>;
		}
		return <span className="text-red-600 uppercase">{String(appointment?.status).replaceAll("-", " ")}</span>;
	};
	return renderStatus();
};
const PatientORQueue = () => {
	const { user, checkUserType } = useAuth();
	const {
		pending: doctorsPending,
		nowServing: doctorsNowServing,
		mutatePending,
		mutatePendingForResultReading,
		mutateNowServing,
	} = useDoctorQueue();

	const {
		pending,
		pendingQueue,
		nowServing,
		mutateOperatingRoom,
	} = useORQueue();
	const [appointment, setAppointment] = useState(null);
	
	const acceptPatientForOrRef = useRef(null);
	useNoBugUseEffect({
		functions: () => {},
	});

	const isDoctor = () => {
		return user?.type === "his-doctor" || user?.type === "HIS-DOCTOR";
	};
	const listPending = () => {
		return (isDoctor() ? doctorsPending?.data : pending?.data) || [];
	}
	const listPendingOR = () => {
		return (isDoctor() ? doctorsPending?.data : pendingQueue?.data) || [];
	};

	const mutateAll = () => {
		mutateOperatingRoom();
	};


	

	return (
		<AppLayout>
			<div className="p-4 h-full overflow-auto">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-5 divide-x">
					<div className="lg:col-span-4">
						<h1 className="text-xl font-bold font-opensans text-primary-dark tracking-wider -mb-1">
							Patient Queue
						</h1>
						<span className="noto-sans-thin text-slate-500 text-sm font-light">
							Patients pending for service
						</span>
						<div className="flex flex-col gap-y-4 relative ml-2">
							{listPending()?.length === 0 ? (
								<span className="text-center py-20 font-bold text-slate-400">
									No patients in Operating Room.
								</span>
							) : (
								listPending()?.map((queue, index) => (
									queue?.status === "pending-or-refer" && (
										<InQueueOr
											key={`iq2-${queue.id}`}
											queue={queue}
											number={queue.id}
											patientName={patientFullName(queue.patient)}
											patient={queue.patient}
											data={queue}
											// date={formatDate(
											// 	new Date(queue?.created_at)
											// )}
											// date={formatDateTime(new Date(queue?.created_at))}
											date={formatDateTime(new Date())}
											
											onClick={() => {
											setAppointment(queue);
										// 	Axios.patch(`v1/hospital/update-operation-time-in/${appointment?.id}`, {
										// 	anesthesia_time_in: new Date(),
										// })
										}}
										>
											<div className="w-full flex flex-col pl-16">
											<div className="flex items-center text-slate-700 gap-2 mb-2">
												<span className="text-sm">
													Status:
												</span>
												<span className="font-bold text-sm text-red-600">
													Operating Room Preparation
												</span>
											</div>
											{/* <div className="flex items-center text-slate-700 gap-2 mb-2">
												<span className="text-sm">
													<FlatIcon icon="rr-calendar" /> Date:
												</span>
												<span className="font-bold text-sm text-gray-900">
													June 21, 2024
												</span>
												<span className="text-sm ml-8">
													<FlatIcon icon="rr-clock" /> Time:
												</span>
												<span className="font-bold text-sm text-gray-900">
												4:55 PM
												</span>
											</div> */}
										</div>
											
										</InQueueOr>
									)
								))
							)}
						</div>
					</div>
					<div className="lg:col-span-8 pl-4">
						<div className="flex items-center">
							<h1 className="text-xl font-bold font-opensans text-success-dark tracking-wider -mb-1">
								In Service...
							</h1>
						</div>
						<span className="mb-3 noto-sans-thin text-slate-500 text-sm font-light">
							&nbsp;
						</span>
						<div>
							{appointment?.patient ? (
								<Fade key={`order-${appointment?.id}`}>
									<div>
										<h4 className="border flex items-center text-base font-bold p-2 mb-0 border-indigo-100 lg:col-span-12">
											<span>Patient Information</span>
											<ActionBtn
												className="ml-auto"
												type="danger"
												onClick={() => {
													setAppointment(null);
												}}
											>
												Close
											</ActionBtn>
										</h4>
										<div className="flex flex-col lg:flex-row gap-2 border-x border-indigo-100 p-4">
											<PatientInfo patient={appointment?.patient} />
											<div className="flex gap-4 ml-auto">
													<div className="flex flex-col items-center">
													
													<span className="text-gray-900 text-center text-sm font-bold">PHILHEALTH IDENTIFICATION NUMBER (PIN)</span>
														
													<span className="text-gray-900 text-center">{appointment?.patient?.philhealth}</span>
													<span className="text-gray-900 text-center text-sm font-bold">({appointment?.patient?.patient_member_phic_type})</span>
													</div>
											</div>
											{/* {checkUserType("OR")? (
											<ActionBtn
												type="secondary"
												className="ml-auto h-12 !rounded-[30px] font-medium gap-2 px-4"
												onClick={() => {
													// procedureChoiceRef.current.show({patient: patient});
													//privacyRef.current.show({ patient: patient });
													procedureChoiceRef.current.show({patient: appointment?.patient});
												}}
											>
												<FlatIcon icon="bs-add" />
												CREATE APPOINTMENT
											</ActionBtn>
											) : ("")} */}
										
										</div>
										<div className="pb-4">
											<AppointmentDetailsForOr
											appointment={appointment} 
											mutateAll={mutateAll}
											showService={true}
											setOrder={(data) => {
													if (data == null) {
														// mutateAll();
													}
													setAppointment(data);
												}}
											/>
										</div>
									</div>
								</Fade>
							) : (
								""
							)}
						</div>
						{!appointment ? (
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
								{nowServing?.data?.map((data) => (
									<InServiceOR key={`PQInServiceItem-${data?.id}`} data={data} />
								))}
							</div>
						) : (
							""
						)}
					</div>
				</div>
			</div>
			
		</AppLayout>
	);
};

export default PatientORQueue;

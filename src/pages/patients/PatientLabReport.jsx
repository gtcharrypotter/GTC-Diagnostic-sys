import React, { useState } from 'react'
import { Fade } from 'react-reveal';
import Pagination from '../../components/table/Pagination';
import NewPatientFormModal from '../../components/modal/NewPatientFormModal';
import PrivacyPolicyModal from '../../components/modal/PrivacyPolicyModal';
import PatientProfile from './PatientProfile';
import PatientMenu from '../../components/buttons/PatientMenu';
import LoadingScreen from '../../components/loading-screens/LoadingScreen';
import TextInput from '../../components/inputs/TextInput';
import FlatIcon from '../../components/FlatIcon';
import ActionBtn from '../../components/buttons/ActionBtn';
import AppLayout from '../../components/container/AppLayout';
import useDataTable from '../../hooks/useDataTable';
import { useAuth } from '../../hooks/useAuth';
import useNoBugUseEffect from '../../hooks/useNoBugUseEffect';
import { v4 as uuidv4 } from "uuid";
import Appointments from '../appointments/Appointments';
import AppointmentMenu from '../../components/buttons/AppointmentMenu';
import LaboratoryFinalReport from '../../components/patient-modules/LaboratoryFinalReport';
import useLabQueue from '../../hooks/useLabQueue';
import InQueueRegular from '../patient-lab-queue/components/InQueueRegular';
import { doctorName, doctorSpecialty, formatDate, formatDateTime, patientFullName } from '../../libs/helpers';
const PatientLabReport = () => {
	const { pendingForPrintResult, mutatePendingForPrintResult } = useLabQueue();
	const [order, setOrder] = useState(null);

	useNoBugUseEffect({
		functions: () => {},
	});
	const listPending = () => {
		return pendingForPrintResult?.data || [];
		// return (isDoctor() ? doctorsPending?.data : pending?.data) || [];
	};
	console.log("View Relationship Data", order)
  return (
    <AppLayout>
			{/* <PageHeader
				title="Patients"
				subtitle={`View patients`}
				icon="rr-users"
			/> */}
			<div className="p-4 h-full overflow-auto ">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-5 divide-x">
					<div className="lg:col-span-4">
						<h1 className="text-xl font-bold font-opensans text-primary-dark tracking-wider -mb-1">
							Printing Queue
						</h1>
						<span className="noto-sans-thin text-slate-500 text-sm font-light">
							Laboratory Printing services
						</span>
						<div className="flex flex-col gap-y-4 py-4">
							
							{listPending()?.map((queue, index) => {
									return (
										<InQueueRegular
										selected={
											queue?.relationships?.laboratoryTest?.id ===
											order?.relationships?.laboratoryTest
												?.id
										}
											onClick={() => { 
												setOrder(queue);
											}}
											key={`iqr-${queue.id}`}
											number={`${queue.id}`}
											date={formatDateTime(new Date())}
											patientName={patientFullName(
												queue?.relationships?.patient
											)}
											
										>
											
											<div className="w-full flex flex-col pl-16">
												<div className="flex items-center gap-2 mb-2">
													<span className="text-sm ">
														Lab Order:
													</span>
													<span className="font-bold text-red-700 ml-8">
														{" "}
														{queue?.type?.name}
													</span>
												</div>
												<div className="flex items-center gap-2 mb-2">
													<span className="text-sm ">
														Date:
													</span>
													<span className="font-light italic ml-16">
														{formatDate(
															new Date(
																queue?.created_at
															)
														)}
													</span>
												</div>
												<div className="flex items-start gap-2 mb-2">
													<span className="text-sm ">
														Doctor:{" "}
													</span>
													<span className="flex flex-col font-bold ml-12">
														<span className="-mb-1">
															{doctorName(
																queue
																	?.relationships
																	?.doctor
															)}
														</span>
														<span className="font-light text-sm">
															{doctorSpecialty(
																queue
																	?.relationships
																	?.doctor
															)}
														</span>
													</span>
												</div>
											
											</div>
										</InQueueRegular>
									);
								})
							}
						</div>
					</div>
					<div className="lg:col-span-8 pl-8">
						<div className="flex items-center gap-4 pb-4">
							<h1 className="text-xl font-bold font-opensans text-success-dark tracking-wider -mb-1">
								In Service...
							</h1>
						</div>
						<div>
							{order?.relationships?.patient ? (
								<Fade key={`order-${order?.id}`}>
									<div>
										
										<LaboratoryFinalReport 
										appointment={order}
										patient={order?.relationships?.patient}
										
										/>
									</div>
								</Fade>
							) : (
								<span className="w-full font-medium text-lg text-center py-20 text-slate-300">
									No patient selected
								</span>
							)}
						</div>
					</div>
				</div>
			
			</div>
			
		</AppLayout>
  )
}

export default PatientLabReport

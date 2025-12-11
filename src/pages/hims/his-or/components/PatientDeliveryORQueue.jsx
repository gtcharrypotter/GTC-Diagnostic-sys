import React, { useState } from 'react'
import { useAuth } from '../../../../hooks/useAuth';
import useDeliveryQueue from '../../../../hooks/useDeliveryQueue';
import InQueueForRelease from '../../../patient-queue/components/InQueueForRelease';
import { formatDateTime, patientFullName } from '../../../../libs/helpers';
import { Fade } from 'react-reveal';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import PatientInfo from '../../../patients/components/PatientInfo';
import AppLayout from '../../../../components/container/AppLayout';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import AppointmentDetailsForDeliveryOR from './AppointmentDetailsForDeliveryOR';
import AppointmentDetailsForDelivery from '../flow/his-delivery/components/AppointmentDetailsForDelivery';

const PatientDeliveryORQueue = () => {
    const { user } = useAuth();
	const {pending, mutatePending, pendingForDelivery, mutatePendingForDelivery } = useDeliveryQueue();
	// const referToSphModalRef = useRef(null);
	const [appointment, setAppointment] = useState(null);
    

	useNoBugUseEffect({
		functions: () => {},
	});
	const mutateAll = () => {
		mutatePendingForDelivery();
	};
	const renderServiceComponent = () => {
    if (appointment?.status === 'pending-for-delivery') {
      return (
        <AppointmentDetailsForDelivery
          forDelivery={true}
          mutateAll={mutateAll}
          hideServices={false}
          appointment={appointment}
          setOrder={(data) => setAppointment(data)}
          serviceComponent={renderServiceComponent}
        />
      );
    } else if (appointment?.status === 'pending-for-delivery-release') {
      return (
        <AppointmentDetailsForDeliveryOR
          forResu={true}
          mutateAll={mutateAll}
          hideServices={false}
          appointment={appointment}
          setOrder={(data) => setAppointment(data)}
        />
      );
    }
    return null;
  };

  return (
    <AppLayout>
			{/* <PageHeader
				title="Patient Queue"
				subtitle={"View patients in queue"}
				icon="rr-clipboard-list-check"
			/> */}
			<div className="p-4 h-full overflow-auto ">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-5 divide-x">
					<div className="lg:col-span-4">
						<h1 className="text-xl font-bold font-opensans text-primary-dark tracking-wider -mb-1">
							Patient Queue
						</h1>
						<span className="noto-sans-thin text-slate-500 text-sm font-light">
							Patients pending for Delivery approval
						</span>
						<div className="flex flex-col gap-y-4 py-4">
							{pending?.data?.map((queue) => (
									<InQueueForRelease
									selected={queue?.id === appointment?.id}
									onClick={() => setAppointment(queue)}
									key={`iqr-${queue.id}`}
									number={`${queue.id}`}
									date={formatDateTime(new Date())}
									patientName={patientFullName(queue?.patient)}
									>
									<div className="w-full flex flex-col pl-16">
										<div className="flex items-center text-slate-700 gap-2 mb-2">
										<span className="text-sm">Status:</span>
										<span className="font-bold text-sm text-red-600">
											DELIVERY PENDING
										</span>
										</div>
									</div>
									</InQueueForRelease>
								))}
							{pendingForDelivery?.data?.map((queue, index) => {
								return (
									<InQueueForRelease
										selected={queue?.id == appointment?.id}
										onClick={() => {
											setAppointment(queue);
										}}
										key={`iqr-${queue.id}`}
										number={`${queue.id}`}
										date={formatDateTime(new Date())}
										patientName={patientFullName(
											queue?.patient
										)}
									>
										<div className="w-full flex flex-col pl-16">
											<div className="flex items-center text-slate-700 gap-2 mb-2">
												<span className="text-sm">
													Status:
												</span>
												<span className="font-bold text-sm text-red-600">
													DELIVERY PENDING RELEASE
												</span>
											</div>
										</div>
									</InQueueForRelease>
								);
							})}
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
											<PatientInfo
												patient={appointment?.patient}
											/>
											<div className="flex gap-4 ml-auto">
													<div className="flex flex-col items-center">
													
													<span className="text-gray-900 text-center text-sm font-bold">PHILHEALTH IDENTIFICATION NUMBER (PIN)</span>
														
													<span className="text-gray-900 text-center">{appointment?.patient?.philhealth}</span>
													<span className="text-gray-900 text-center text-sm font-bold">({appointment?.patient?.patient_member_phic_type})</span>
													</div>
											</div>
										</div>
										<div className="pb-4">
											{/* <AppointmentDetailsForDeliveryOR
												forResu={true}
												mutateAll={mutateAll}
												hideServices={false}
												appointment={appointment}
												setOrder={(data) => {
													if (data == null) {
														// mutateAll();
													}
													setAppointment(data);
												}} 
												
											/>*/}
											{renderServiceComponent()}
										</div>
									</div>
								</Fade>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>
			{/* <ReferToSPHModal ref={referToSphModalRef} /> */}
		</AppLayout>
  )
}

export default PatientDeliveryORQueue

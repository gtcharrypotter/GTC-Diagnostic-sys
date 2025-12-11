import React, { useState } from 'react';
import useNoBugUseEffect from '../../../hooks/useNoBugUseEffect';
import FlatIcon from '../../../components/FlatIcon';
import InQueueAnesthesia from './components/InQueueAnesthesia';
import { doctorName, doctorSpecialty, formatDate, formatDateTime, patientFullName } from '../../../libs/helpers';
import AppLayout from '../../../components/container/AppLayout';
import useMonitoringQueue from '../../../hooks/useMonitoringQueue';
import { v4 as uuidv4 } from "uuid";
import AppointmentStatus from '../../../components/AppointmentStatus';
import Axios from '../../../libs/axios';

const uniq_id = uuidv4();
/* eslint-disable react/prop-types */
const PatientMonitoring = ({
    appointment: propAppointment,
}) => {
    const {
        waitingORQueue,
		waitingAnesthesiaQueue,
		waitingDeliverySched,
		waitingSurgerySched,
        pendingDeliveryOperation,
        pendingSurgeryOperation,
        pendingPacu,
        pendingICU,
        pendingRoomFromICU,
        pendingRoomFromPACU,
        mutateWaitingOR,
		mutateWaitingAnesthesia,
		mutateWaitingDeliverySched,
		mutateWaitingSurgerySched,
        mutateSurgeryOperation,
        mutateDeliveryOperation,
        mutatePacuPending,
        mutateICUpending,
        mutateRoomFromICU,
        mutateRoomFromPACU
    } = useMonitoringQueue();
    
    const [appointment, setAppointment] = useState(propAppointment);
	const [key, setKey] = useState(uniq_id);
    
    useNoBugUseEffect({
        functions: () => {},
    });

    const listPendingWaiting = () => {
        return [...(waitingORQueue?.data || []),
		...(waitingAnesthesiaQueue?.data || []),
		...(waitingDeliverySched?.data || []),
		...(waitingSurgerySched?.data || []),
	];
    };
    
    const listPendingOR = () => {
        return [...(pendingDeliveryOperation?.data || []), ...(pendingSurgeryOperation?.data || [])];
    };
    
    const listPendingRESU = () => {
        return [...(pendingPacu?.data || []), ...(pendingICU?.data || [])];
    };
    
    const listPendingDone = () => {
        return [...(pendingRoomFromICU?.data || []), ...(pendingRoomFromPACU?.data || [])];
    };
    
    console.log('Dataaaaaaaaaaaaaaaa------------------', pendingSurgeryOperation?.data);

	const mutateAll = () => {
		mutateWaitingOR();
		mutateWaitingAnesthesia();
		mutateWaitingDeliverySched();
		mutateWaitingSurgerySched();
		mutateSurgeryOperation();
		mutateDeliveryOperation();
		mutatePacuPending();
		mutateICUpending();
		mutateRoomFromICU();
		mutateRoomFromPACU();
	};
	const refreshData = () => {
		Axios.get(`v1/hospital/get-appointment/${appointment?.id}`).then(
			(res) => {
				setAppointment(res.data.data);
				setKey(uuidv4());
			}
		);
	};
    return (
        <>
            <AppLayout>
                <div className="p-4 h-full overflow-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 divide-x">
                        <div className="lg:col-span-3">
                            <h1 className="text-xl font-bold font-opensans text-slate-500 tracking-wider mb-2 ml-2">
                                <FlatIcon icon="rr-procedures" className="text-xl" /> Waiting
                            </h1>
                            <div className="flex flex-col gap-y-4 relative ml-2">
                                {listPendingWaiting()?.length === 0 ? (
                                    <span className="text-center py-20 font-bold text-slate-400">
                                        No patients in Waiting Area.
                                    </span>
                                ) : (
                                    listPendingWaiting()?.map((queue, index) => (
                                        (queue?.status === "pending-or-refer" ||
										queue?.status === "pending-for-anesthesia-schedule" ||
										queue?.status === "pending-for-delivery" ||
										queue?.status === "pending-for-surgery") && (
                                            <InQueueAnesthesia
                                                key={queue.id}
                                                queue={queue}
                                                currentSection="WaitingRoom"
                                                number={queue.id}
                                                patientName={patientFullName(queue?.patient)}
                                                data={queue}
											
                                            >
                                                <div className="w-full flex flex-col">
                                                    <div className="flex items-center gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Status:</span>
                                                        <span className="font-bold text-lg text-slate-700 italic">
                                                            <AppointmentStatus appointment={appointment}
															/>
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Date:</span>
                                                        <span className="font-light italic">
                                                            {formatDateTime(new Date(queue?.start_time_in))}
                                                        </span>
                                                    </div>
                                                </div>
                                            </InQueueAnesthesia>
                                        )
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <h1 className="text-xl font-bold font-opensans text-red-700 tracking-wider mb-2 ml-2">
                                <FlatIcon icon="rr-procedures" className="text-xl" /> Operating Room
                            </h1>
                            <div className="flex flex-col gap-y-4 relative ml-2">
                                {listPendingOR()?.length === 0 ? (
                                    <span className="text-center py-20 font-bold text-slate-400">
                                        No patients in Operating Room.
                                    </span>
                                ) : (
                                    listPendingOR()?.map((queue, index) => (
                                        (queue?.status === "pending-for-delivery-release" || queue?.status === "pending-for-surgery-release") && (
                                            <InQueueAnesthesia
                                                key={queue.id}
                                                queue={queue}
                                                currentSection="OperatingRoom"
                                                number={queue.id}
                                                patientName={patientFullName(queue?.patient)}
                                                patient={queue?.patient}
                                                data={queue}
                                            >
                                                <div className="w-full flex flex-col">
                                                    <div className="flex items-center gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Status:</span>
                                                        <span className="font-bold text-lg text-red-800 italic">
                                                           <AppointmentStatus appointment={appointment} />
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Date:</span>
                                                        <span className="font-light italic">
                                                            {formatDate(new Date(queue?.operation_date))}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Time:</span>
                                                        <span className="font-light italic">
                                                            {queue?.operation_time}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Procedure:</span>
                                                        <span className="text-sm font-bold text-red-700">
                                                            {queue?.operation_procedure}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-start gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Surgeon:</span>
                                                        <span className="flex flex-col font-bold">
                                                            <span className="mb-2">
                                                                {doctorName(queue?.doctor)}
                                                            </span>
                                                            <span className="font-light text-sm">
                                                                {doctorSpecialty(queue?.doctor)}
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div className="flex items-start gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Anesthesiologist:</span>
                                                        <span className="flex flex-col font-bold">
                                                            <span className="mb-2">
                                                                {doctorName(queue?.doctor)}
                                                            </span>
                                                            <span className="font-light text-sm">
                                                                {doctorSpecialty(queue?.doctor)}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </InQueueAnesthesia>
                                        )
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <h1 className="text-xl font-bold font-opensans text-slate-500 tracking-wider mb-2 ml-2">
                                <FlatIcon icon="rr-procedures" className="text-xl" /> PACU/ICU
                            </h1>
                            <div className="flex flex-col gap-y-4 relative ml-2">
                                {listPendingRESU()?.length === 0 ? (
                                    <span className="text-center py-20 font-bold text-slate-400">
                                        No patients in PACU/ICU.
                                    </span>
                                ) : (
                                    listPendingRESU()?.map((queue, index) => (
                                        (queue?.status === "pending-for-delivery-icu" || queue?.status === "pending-for-surgery-icu") && (
                                            <InQueueAnesthesia
                                                key={queue.id}
                                                queue={queue}
                                                currentSection="PACU/ICU"
                                                number={queue.id}
                                                patientName={patientFullName(queue?.patient)}
                                                patient={queue?.patient}
                                                data={queue}
                                            >
                                                <div className="w-full flex flex-col">
                                                    <div className="flex items-center gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Status:</span>
                                                        <span className="font-bold text-lg text-red-800 italic">
                                                            <AppointmentStatus appointment={appointment} />
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Date:</span>
                                                        <span className="font-light italic">
                                                            {formatDate(new Date(queue?.operation_date))}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Time:</span>
                                                        <span className="font-light italic">
                                                            {queue?.operation_time}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Procedure:</span>
                                                        <span className="text-sm font-bold text-red-700">
                                                            {queue?.operation_procedure}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-start gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Surgeon:</span>
                                                        <span className="flex flex-col font-bold">
                                                            <span className="mb-2">
                                                                {doctorName(queue?.doctor)}
                                                            </span>
                                                            <span className="font-light text-sm">
                                                                {doctorSpecialty(queue?.doctor)}
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div className="flex items-start gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Anesthesiologist:</span>
                                                        <span className="flex flex-col font-bold">
                                                            <span className="mb-2">
                                                                {doctorName(queue?.doctor)}
                                                            </span>
                                                            <span className="font-light text-sm">
                                                                {doctorSpecialty(queue?.doctor)}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </InQueueAnesthesia>
                                        )
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <h1 className="text-xl font-bold font-opensans text-slate-500 tracking-wider mb-2 ml-2">
                                <FlatIcon icon="rr-procedures" className="text-xl" /> Room
                            </h1>
                            <div className="flex flex-col gap-y-4 relative ml-2">
                                {listPendingDone()?.length === 0 ? (
                                    <span className="text-center py-20 font-bold text-slate-400">
                                        No patients in Room.
                                    </span>
                                ) : (
                                    listPendingDone()?.map((queue, index) => (
                                        (queue?.status === "pending-for-nurse-icu-release" || queue?.status === "pending-for-nurse-pacu-release") && (
                                            <InQueueAnesthesia
                                                key={queue.id}
                                                queue={queue}
                                                currentSection="Room"
                                                number={queue.id}
                                                patientName={patientFullName(queue?.patient)}
                                                patient={queue?.patient}
                                                data={queue}
                                            >
                                                <div className="w-full flex flex-col">
                                                    <div className="flex items-center gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Status:</span>
                                                        <span className="font-bold text-lg text-red-800 italic">
                                                            <AppointmentStatus appointment={appointment} />
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Date:</span>
                                                        <span className="font-light italic">
                                                            {formatDate(new Date(queue?.operation_date))}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Time:</span>
                                                        <span className="font-light italic">
                                                            {queue?.operation_time}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Procedure:</span>
                                                        <span className="text-sm font-bold text-red-700">
                                                            {queue?.operation_procedure}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-start gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Surgeon:</span>
                                                        <span className="flex flex-col font-bold">
                                                            <span className="mb-2">
                                                                {doctorName(queue?.doctor)}
                                                            </span>
                                                            <span className="font-light text-sm">
                                                                {doctorSpecialty(queue?.doctor)}
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div className="flex items-start gap-16 mb-2">
                                                        <span className="text-sm w-[58px]">Anesthesiologist:</span>
                                                        <span className="flex flex-col font-bold">
                                                            <span className="mb-2">
                                                                {doctorName(queue?.doctor)}
                                                            </span>
                                                            <span className="font-light text-sm">
                                                                {doctorSpecialty(queue?.doctor)}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </InQueueAnesthesia>
                                        )
                                    ))
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </AppLayout>
        </>
    );
};

export default PatientMonitoring;

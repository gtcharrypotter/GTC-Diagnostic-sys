import React, { useState } from 'react'
import useImagingQueue from '../../hooks/useImagingQueue';
import useNoBugUseEffect from '../../hooks/useNoBugUseEffect';
import { Fade } from 'react-reveal';
import { doctorName, doctorSpecialty, formatDate, formatDateTime, patientFullName } from '../../libs/helpers';
import InQueueRegular from '../patient-lab-queue/components/InQueueRegular';
import AppLayout from '../../components/container/AppLayout';
import ImagingFinalReport from '../../components/patient-modules/ImagingFinalReport';

const PatientImgReport = () => {
    const { pendingPrintImgResult  } = useImagingQueue();
    const [order, setOrder] = useState(null);
    useNoBugUseEffect({
		functions: () => {},
	});
	const listPending = () => {
    return pendingPrintImgResult?.data || [];
};
	console.log("View Relationship Data", order)
  return (
      <AppLayout>
            <div className="p-4 h-full overflow-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 divide-x">
                    <div className="lg:col-span-4">
                        <h1 className="text-xl font-bold font-opensans text-primary-dark tracking-wider -mb-1">
                            Printing Queue
                        </h1>
                        <span className="noto-sans-thin text-slate-500 text-sm font-light">
                            Imaging Printing Services
                        </span>
                        <div className="flex flex-col gap-y-4 py-4">
                            {listPending()?.map((queue, index) => (
                                <InQueueRegular
                                    selected={
                                        queue?.relationships?.laboratoryTest?.id ===
                                        order?.relationships?.laboratoryTest?.id
                                    }
                                    onClick={() => setOrder(queue)}
                                    key={`iqr-${queue.id}`}
                                    number={`${queue.id}`}
                                    date={formatDateTime(new Date(queue?.created_at))}
                                    patientName={patientFullName(queue?.relationships?.patient)}
                                >
                                    <div className="w-full flex flex-col pl-16">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-sm">Img Order:</span>
                                            <span className="font-bold text-red-700 ml-8">
                                                {queue?.type?.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-sm">Date:</span>
                                            <span className="font-light italic ml-16">
                                                {formatDate(new Date(queue?.created_at))}
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-2 mb-2">
                                            <span className="text-sm">Doctor:</span>
                                            <span className="flex flex-col font-bold ml-12">
                                                <span className="-mb-1">
                                                    {doctorName(queue?.relationships?.doctor)}
                                                </span>
                                                <span className="font-light text-sm">
                                                    {doctorSpecialty(queue?.relationships?.doctor)}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </InQueueRegular>
                            ))}
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
                                        <ImagingFinalReport
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

export default PatientImgReport

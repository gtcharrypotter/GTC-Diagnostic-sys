
import { useRef, useState } from 'react'
import useAnesthesiaQueue from '../../../hooks/useAnesthesiaQueue1';
import useNoBugUseEffect from '../../../hooks/useNoBugUseEffect';
import FlatIcon from '../../../components/FlatIcon';
import AppLayout from '../../../components/container/AppLayout';
import InQueueAnesthesia from './components/InQueueAnesthesia';
import {  doctorName, doctorSpecialty, formatDate, patientFullName } from '../../../libs/helpers';
import ActionBtn from '../../../components/buttons/ActionBtn';
import UpdatePatientOperation from './components/modal/UpdatePatientOperation';

const PatientAnestesiaQueue = (props) => {
	const { waitingRoom, mutateWaitingRoom, operatingRoom, mutateOperatingRoom, resu, mutateResu, done, mutateDone } = useAnesthesiaQueue();
    const [order, setOrder] = useState(null);
	const {patient} = props;
	
	useNoBugUseEffect({
        functions: () => {},
    });
	const listPendingWaiting = () => {
        return waitingRoom?.data || [];
    };
	const listPendingOR = () => {
        return operatingRoom?.data || [];
    };
	const listPendingRESU = () => {
        return resu?.data || [];
    };
	const listPendingDone = () => {
        return done?.data || [];
    };
  return (
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
                                    No patients in Waiting Room.
                                </span>
                            ) : (
                                listPendingWaiting()?.map((queue, index) => {
                                    return (
                                        queue?.operation_status === "For Operation" && (
                                            <InQueueAnesthesia
                                                key={queue.id}
                                                queue={queue}
                                                currentSection="WaitingRoom"
                                                number={queue.id}
                                                patientName={patientFullName(queue?.relationships?.patient)}
												patient={queue?.relationships?.patient}
												data={queue}
											>
                                                <div className="w-full flex flex-col ">
												<div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Status:
													</span>
													<span className="font-bold text-lg text-slate-700 italic">
														{queue?.operation_status}
													</span>
												</div>
                                                <div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Date:
													</span>
													<span className="font-light italic">
														{formatDate(
															new Date(
																queue?.operation_date
															)
														)}
													</span>
												</div>
                                                <div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Time:
													</span>
													<span className="font-light italic">
														{queue?.operation_time}
													</span>
												</div>
												<div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Procedure
													</span>
													<span className="text-sm font-bold text-red-700">
														{" "}
														{queue?.procedure}
													</span>
												</div>
												
												<div className="flex items-start gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Surgeon:{" "}
													</span>
													<span className="flex flex-col font-bold">
														<span className="mb-2">
															{/* {doctorName(
																queue
																	?.relationships
																	?.doctor
															)} */}
															{queue?.surgeon}
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
                                                <div className="flex items-start gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Anesthesiologist:{" "}
													</span>
													<span className="flex flex-col font-bold">
														<span className="mb-2">
															{/* {doctorName(
																queue
																	?.relationships
																	?.doctor
															)} */}
															{queue?.anesthesiologist}
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
                                            </InQueueAnesthesia>
                                        )
                                    );
                                })
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
                                listPendingOR()?.map((queue, index) => {
                                    return (
                                        queue?.operation_status === "Operating Room" && (
                                            <InQueueAnesthesia
                                                key={queue.id}
                                                queue={queue}
                                                currentSection="OperatingRoom"
                                                number={queue.id}
                                                patientName={patientFullName(queue?.relationships?.patient)}
												patient={queue?.relationships?.patient}
												data={queue}
											>
                                                <div className="w-full flex flex-col ">
												<div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Status:
													</span>
													<span className="font-bold text-lg text-red-800 italic">
														{queue?.operation_status}
													</span>
												</div>
                                                <div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Date:
													</span>
													<span className="font-light italic">
														{formatDate(
															new Date(
																queue?.operation_date
															)
														)}
													</span>
												</div>
                                                <div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Time:
													</span>
													<span className="font-light italic">
														{queue?.operation_time}
													</span>
												</div>
												<div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Procedure
													</span>
													<span className=" text-sm font-bold text-red-700">
														{" "}
														{queue?.procedure}
													</span>
												</div>
												
											<div className="flex items-start gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Surgeon:{" "}
													</span>
													<span className="flex flex-col font-bold">
														<span className="mb-2">
															{/* {doctorName(
																queue
																	?.relationships
																	?.doctor
															)} */}
															{queue?.surgeon}
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
                                                <div className="flex items-start gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Anesthesiologist:{" "}
													</span>
													<span className="flex flex-col font-bold">
														<span className="mb-2">
															{/* {doctorName(
																queue
																	?.relationships
																	?.doctor
															)} */}
															{queue?.anesthesiologist}
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
                                            </InQueueAnesthesia>
                                        )
                                    );
                                })
                            )}
                        </div>
						
                    </div>
                    <div className="lg:col-span-3">
                        <h1 className="text-xl font-bold font-opensans text-primary-dark tracking-wider mb-2 ml-2">
                            <FlatIcon icon="rr-procedures" className="text-xl" /> RESU
                        </h1>
                        <div className="flex flex-col gap-y-4 relative ml-2">
                            {listPendingRESU()?.length === 0 ? (
                                <span className="text-center py-20 font-bold text-slate-400">
                                    No patients in RESU.
                                </span>
                            ) : (
                                listPendingRESU()?.map((queue, index) => {
                                    return (
                                        queue?.operation_status === "RESU" && (
                                            <InQueueAnesthesia
                                                key={queue.id}
                                                queue={queue}
                                                currentSection="resu"
                                                number={queue.id}
												patient={queue?.relationships?.patient}
                                                patientName={patientFullName(queue?.relationships?.patient)}
												data={queue}
                                            >
                                                <div className="w-full flex flex-col ">
												<div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Status:
													</span>
													<span className="font-bold text-lg text-blue-800 italic">
														{queue?.operation_status}
													</span>
												</div>
                                                <div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Date:
													</span>
													<span className="font-light italic">
														{formatDate(
															new Date(
																queue?.operation_date
															)
														)}
													</span>
												</div>
                                                <div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Time:
													</span>
													<span className="font-light italic">
														{queue?.operation_time}
													</span>
												</div>
												<div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Procedure
													</span>
													<span className="text-sm font-bold text-red-700">
														{" "}
														{queue?.procedure}
													</span>
												</div>
												
												<div className="flex items-start gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Surgeon:{" "}
													</span>
													<span className="flex flex-col font-bold">
														<span className="mb-2">
															{/* {doctorName(
																queue
																	?.relationships
																	?.doctor
															)} */}
															{queue?.surgeon}
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
                                                <div className="flex items-start gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Anesthesiologist:{" "}
													</span>
													<span className="flex flex-col font-bold">
														<span className="mb-2">
															{/* {doctorName(
																queue
																	?.relationships
																	?.doctor
															)} */}
															{queue?.anesthesiologist}
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
                                            </InQueueAnesthesia>
                                        )
                                    );
                                })
                            )}
                        </div>
                    </div>
                    <div className="lg:col-span-3">
                        <h1 className="text-xl font-bold font-opensans text-success-dark tracking-wider mb-2 ml-2">
                            <FlatIcon icon="rr-procedures" className="text-xl" /> Done (Back to Room)
                        </h1>
                        <div className="flex flex-col gap-y-4 relative ml-2">
                            {listPendingDone()?.length === 0 ? (
                                <span className="text-center py-20 font-bold text-slate-400">
                                    No patients in Back to Room.
                                </span>
                            ) : (
                                listPendingDone()?.map((queue, index) => {
                                    return (
                                        queue?.operation_status === "DONE" && (
                                            <InQueueAnesthesia
                                                key={queue.id}
                                                queue={queue}
                                                currentSection="done"
                                                number={queue.id}
												patient={queue?.relationships?.patient}
                                                patientName={patientFullName(queue?.relationships?.patient)}
												data={queue}
                                            >
                                                <div className="w-full flex flex-col ">
												<div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Status:
													</span>
													<span className="font-bold text-lg text-green-800 italic">
														{queue?.operation_status}
													</span>
												</div>
                                                <div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Date:
													</span>
													<span className="font-light italic">
														{formatDate(
															new Date(
																queue?.operation_date
															)
														)}
													</span>
												</div>
                                                <div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Time:
													</span>
													<span className="font-light italic">
														{queue?.operation_time}
													</span>
												</div>
												<div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Procedure
													</span>
													<span className="text-sm font-bold text-red-700">
														{" "}
														{queue?.procedure}
													</span>
												</div>
												
												<div className="flex items-start gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Surgeon:{" "}
													</span>
													<span className="flex flex-col font-bold">
														<span className="mb-2">
															{/* {doctorName(
																queue
																	?.relationships
																	?.doctor
															)} */}
															{queue?.surgeon}
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
                                                <div className="flex items-start gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Anesthesiologist:{" "}
													</span>
													<span className="flex flex-col font-bold">
														<span className="mb-2">
															{/* {doctorName(
																queue
																	?.relationships
																	?.doctor
															)} */}
															{queue?.anesthesiologist}
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
                                            </InQueueAnesthesia>
                                        )
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
			
        </AppLayout>
  )
}

export default PatientAnestesiaQueue

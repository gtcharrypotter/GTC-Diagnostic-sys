import { useEffect, useRef, useState } from "react";
import AppLayout from "../../components/container/AppLayout";
import useNoBugUseEffect from "../../hooks/useNoBugUseEffect";
import FlatIcon from "../../components/FlatIcon";
import InQueueRegular from "./components/InQueueRegular";
import InQueuePriority from "./components/InQueuePriority";
import {
	calculateAge,
	doctorName,
	doctorSpecialty,
	formatDate,
	patientFullName,
} from "../../libs/helpers";
import Img from "../../components/Img";
import { Fade } from "react-reveal";
import PatientInfo from "../patients/components/PatientInfo";
import ContentTitle from "../../components/buttons/ContentTitle";
import AppointmentDetails from "../appointments/components/AppointmentDetails";
import usePharmaQueue from "../../hooks/usePharmaQueue";
import ActionBtn from "../../components/buttons/ActionBtn";
import Axios from "../../libs/axios";
import { toast } from "react-toastify";
import InfoText from "../../components/InfoText";
import PatientReleaseService from "../../components/modal/PatientReleaseService";
import ReturnPrescribeToDoctorModal from "./ReturnPrescribeToDoctorModal";


const PatientPharmacyQueue = () => {
	const {
		pending,
		mutatePending,
		pendingMedsRelease,
		mutatePendingMedsRelease,
	} = usePharmaQueue();
	const [order, setOrder] = useState(null);
	const [stat, setStat] = useState(null);
	const [appointment, setAppointment] = useState();
	const [patient, setPatient] = useState();
	const [loading, setLoading] = useState(false);
	const returnDoctorRef = useRef(null);

	useNoBugUseEffect({
		functions: () => {},
	});

	const listPending = () => {
		return pending?.data || pendingMedsRelease?.data || [];
	};
	const mutateAll = () => {
		mutatePending();
		mutatePendingMedsRelease();
	};
	const approveRelease = () => {
		setLoading(true);
		Axios.post(`v1/opd-standalone/approve-release-medication/${order?.id}`, {
			_method: "PATCH",
		}).then((res) => {
			toast.success(
				"Patient prescription successfully approved for release!"
			);
			setLoading(false);
			mutateAll();
			setOrder(null);
		});
	};
	return (
		<AppLayout>
			<div className="p-4 h-full overflow-auto ">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-5 divide-x">
					<div className="lg:col-span-4">
						<h1 className="text-xl font-bold font-opensans text-primary-dark tracking-wider -mb-1">
							Patient Queue
						</h1>
						<span className="noto-sans-thin text-slate-500 text-sm font-light">
							Patients pending for pharmacy release
						</span>
						<div className="flex flex-col gap-y-4 py-4">
								<>
									{listPending()?.map((queue, index) => {
										console.log("order patient", queue?.patient?.id)
										return (
											<InQueueRegular
												selected={
													queue?.patient?.id ==
													order?.patient?.id
												}
												onClick={() => {
													setOrder(queue);
													setStat(
														`FOR APPROVE RELEASING MEDICINE`
													);
												}}
												key={`iqr-${queue.id}`}
												number={`${queue.id}`}
												patientName={patientFullName(
													queue?.patient
												)}
											>
												<div className="w-full flex flex-col lg:pl-16">
													<div className="flex items-start gap-2 mb-2">
														<span className="text-sm w-[46px]">
															Doctor:{" "}
														</span>
														<span className="flex flex-col font-bold">
															<span className="-mb-1">
																{doctorName(
																	queue?.doctor
																)}
															</span>
															<span className="font-light text-sm">
																{doctorSpecialty(
																	queue?.doctor
																)}
															</span>
														</span>
													</div>
													<div className="flex items-center gap-2 mb-2">
														<span className="text-sm w-[46px]">
															Status:
														</span>
														<span className="font-medium text-orange-500">
															FOR APPROVE
															RELEASING MEDICINE
														</span>
													</div>
													{queue?.healthUnit ? (
														<div className="flex items-center gap-2 mb-2">
															<span className="text-sm w-[88px]">
																{
																	queue
																		?.healthUnit
																		?.type
																}
																:
															</span>
															<span className="font-medium ">
																{" "}
																{
																	queue
																		?.healthUnit
																		?.name
																}
															</span>
														</div>
													) : (
														""
													)}
												</div>
											</InQueueRegular>
										);
									})}
									
									{" "}
									{pendingMedsRelease?.data?.map((queue, index) => {
											return (
												<InQueuePriority
													selected={
														queue?.patient?.id ===
														order?.patient?.id
													}
													onClick={() => {
														setOrder(queue);
														setStat(
															"FOR RELEASING MEDICINE"
														);
													}}
													priorityType={
														"MEDICINE RELEASE"
													}
													key={`iqr-${queue.id}`}
													number={`${queue.id}`}
													patientName={patientFullName(
														queue?.patient
													)}
												>
													<div className="w-full flex flex-col lg:pl-16">
														<div className="flex items-start gap-2 mb-2">
															<span className="text-sm w-[46px]">
																Doctor:{" "}
															</span>
															<span className="flex flex-col font-bold">
																<span className="-mb-1">
																	{doctorName(
																		queue?.doctor
																	)}
																</span>
																<span className="font-light text-sm">
																	{doctorSpecialty(
																		queue?.doctor
																	)}
																</span>
															</span>
														</div>
														<div className="flex items-center gap-2 mb-2">
															<span className="text-sm w-[46px]">
																Status:
															</span>
															<span className=" text-sm font-light text-orange-500">
																RELEASING
																MEDICINE AND SATISFACTION SURVEY
															</span>
														</div>
														{queue?.healthUnit ? (
															<div className="flex items-center gap-2 mb-2">
																<span className="text-sm w-[88px]">
																	{
																		queue
																			?.healthUnit
																			?.type
																	}
																	:
																</span>
																<span className="font-medium ">
																	{" "}
																	{
																		queue
																			?.healthUnit
																			?.name
																	}
																</span>
															</div>
														) : (
															""
														)}
													</div>
												</InQueuePriority>
											);
										}
									)}
								</>
							
						</div>
					</div>
					<div className="lg:col-span-8 pl-4">
						<div className="flex items-center gap-4 pb-4">
							<h1 className="text-xl font-bold font-opensans text-success-dark tracking-wider -mb-1">
								In Service...
							</h1>
						</div>
						<div>
							{order?.patient ? (
								<Fade key={`order-${order?.id}`}>
									<div className="pb-4">
										<h4 className="border flex items-center text-base font-bold p-2 mb-0 border-indigo-100 lg:col-span-12">
											<span>Patient Information</span>
										</h4>
										<div className="flex flex-col lg:flex-row gap-2 border-x border-indigo-100 p-4">
											<PatientInfo
												patient={order?.patient}
											/>
											<div className="flex gap-4 ml-auto">
												<div className="flex flex-col items-center">
													
												<span className="text-gray-900 text-center text-sm font-bold">PHILHEALTH IDENTIFICATION NUMBER (PIN)</span>
													
												<span className="text-gray-900 text-center">{order?.patient?.philhealth?.replace(/(\d{2})(\d{9})(\d{1})/, '$1-$2-$3')}</span>
												<span className="text-gray-900 text-center text-sm font-bold">({order?.patient?.patient_member_phic_type})</span>
												
												</div>
											</div>
										</div>
										<AppointmentDetails
										appointment={order}
										customStatus={stat}
										serviceComponent={
										<>
											{(order?.status == "pending-for-pharmacy-medicine-release")?(
												<PatientReleaseService
													setAppointment={setOrder}
													showTitle={false}
													mutateAll={mutateAll}
													appointment={order}
													patient={order?.patient}
												/>
											) : (
											<>
												<ContentTitle title="Prescribe Medicines Released"></ContentTitle>
												<InfoText
													className="w-full"
													title="Prescribed By"
													value={doctorName(
														order?.prescribedByDoctor
													)}
												/>
												<div className="table w-full">
													<table>
														<thead>
															<tr>
																<th>
																	Item
																	Code
																</th>
																<th>
																	Item
																	Information
																</th>
																<th className="text-center">
																	Qty
																</th>
															</tr>
														</thead>
														<tbody>
															{order?.prescriptions?.map(
																(item) => {
																	return (
																		<>
																			<tr
																				key={`opri-${item?.id}`}
																			>
																				<td>
																					{
																						item
																							?.item
																							?.code
																					}
																				</td>
																				<td>
																					{
																						item
																							?.item
																							?.name
																					}
																				</td>
																				<td className="text-center">
																					{
																						item?.quantity
																					}
																				</td>
																			</tr>
																			<tr>
																				<td
																					colSpan={
																						3
																					}
																				>
																					<div className="flex gap-4">
																						<span className="font-bold">
																							{" "}
																							Sig.:
																						</span>
																						<div
																							className="bg-yellow-100 px-4"
																							dangerouslySetInnerHTML={{
																								__html: item?.details,
																							}}
																						></div>
																					</div>
																				</td>
																			</tr>
																		</>
																	);
																}
															)}
														</tbody>
													</table>
												</div>
												<div className="flex ">
												<ActionBtn
													className="mt-4 mr-auto"
													type="danger"
													loading={loading}
													onClick={() => returnDoctorRef.current.show()}
												>
													<FlatIcon icon="rr-undo" />
													Return to Doctor
												</ActionBtn>
												<ActionBtn
													className="mt-4 ml-auto"
													type="success"
													loading={loading}
													onClick={approveRelease}
												>
													<FlatIcon icon="rr-memo-circle-check" />
													Approve for release
													medicine
												</ActionBtn>
												
												</div>
												
											</>
											)}
										</>
												
										}
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
			<ReturnPrescribeToDoctorModal 
			appointment={order}
			ref={returnDoctorRef}/>
		</AppLayout>
	);
};

export default PatientPharmacyQueue;

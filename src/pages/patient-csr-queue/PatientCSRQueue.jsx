import React, { useRef, useState } from 'react'
import useCSRQueue from '../../hooks/useCSRQueue';
import useNoBugUseEffect from '../../hooks/useNoBugUseEffect';
import Axios from '../../libs/axios';
import { toast } from 'react-toastify';
import FlatIcon from '../../components/FlatIcon';
import ActionBtn from '../../components/buttons/ActionBtn';
import InfoText from '../../components/InfoText';
import { doctorName, doctorSpecialty, patientFullName } from '../../libs/helpers';
import ContentTitle from '../../components/buttons/ContentTitle';
import CaseDetails from '../doctor-patient-queue/components/CaseDetails';
import { procedureRates } from '../../libs/procedureRates';
import { caseCodes } from '../../libs/caseCodes';
import AppointmentDetails from '../appointments/components/AppointmentDetails';
import PatientInfo from '../patients/components/PatientInfo';
import { Fade } from 'react-reveal';
import InQueuePriority from '../patient-pharmacy-queue/components/InQueuePriority';
import InQueueRegular from '../patient-pharmacy-queue/components/InQueueRegular';
import AppLayout from '../../components/container/AppLayout';

const PatientCSRQueue = () => {
    const { user } = useAuth();
	const {
		pending,
		mutatePending,
		pendingMedsRelease,
		mutatePendingMedsRelease,
	} = useCSRQueue();
	const [order, setOrder] = useState(null);
	const [stat, setStat] = useState(null);
	const [loading, setLoading] = useState(false);
	const referToSphModalRef = useRef(null);
	const uploadLabResultRef = useRef(null);

	useNoBugUseEffect({
		functions: () => {},
	});

	const listPending = () => {
		return pending?.data || [];
		// return (isDoctor() ? doctorsPending?.data : pending?.data) || [];
	};
	const mutateAll = () => {
		mutatePending();
		mutatePendingMedsRelease();
	};
	const approveRelease = () => {
		setLoading(true);
		Axios.post(`v1/clinic/tb-approve-release-medication/${order?.id}`, {
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
							Patients pending for pharmacy release
						</span>
						<div className="flex flex-col gap-y-4 py-4">
							{/* <span className="font-medium text-md text-orange-500 -mb-2 ">
								Priority Lane
							</span> */}
							{/* <InQueuePriority
								number="3"
								patientName="Raelyn Cameron"
								priorityType="PWD"
							/>
							<InQueuePriority
								number="4"
								patientName="Kamdyn Castillo"
								priorityType="PWD"
							/> */}
							{/* <span className="border-b border-b-slate-100"></span> */}
							{/* <span className="font-medium text-md text-blue-500 -mb-2 ">
								Regular
							</span> */}
							{listPending()?.length == 0 &&
							pendingMedsRelease?.data?.length == 0 ? (
								<span className="text-center py-20 font-bold text-slate-400">
									No patients in queue.
								</span>
							) : (
								<>
									{listPending()?.map((queue, index) => {
										return (
											<InQueueRegular
												selected={
													queue?.patient?.id ===
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
									})}{" "}
									{pendingMedsRelease?.data?.map(
										(queue, index) => {
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
															<span className="font-medium text-orange-500">
																FOR RELEASING
																MEDICINE
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
							)}
							{/* <InQueueRegular
								number="6"
								patientName="Mylo Daugherty"
							/>
							<InQueueRegular
								number="7"
								patientName="Emmeline Larson"
							/> */}
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
												<div className="flex items-center gap-2 text-base">
													<span className="text-gray-900">PHIC:</span>
													{/* <span className="text-gray-900">{queue?.phic_no}</span> */}
													{/* <FlatIcon
														icon="rr-venus-mars"
														className="text-base"
													/> */}
												</div>
											</div>
										</div>
										<AppointmentDetails
											appointment={order}
											customStatus={stat}
											serviceComponent={
												<>
													<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-5">
														<div className="flex flex-col">
															<ContentTitle title="Diagnosis"></ContentTitle>
															<InfoText
																className="w-full"
																title="Diagnosed By"
																value={doctorName(
																	order?.referredToDoctor //diagnosis 
																)}
															/>
															<CaseDetails
																code={
																	order?.diagnosis_code
																}
																title="Diagnosis Details"
																cases={
																	caseCodes ||
																	[]
																}
															/>
														</div>
														<div className="flex flex-col">
															<ContentTitle title="Procedure Rendered"></ContentTitle>

															<InfoText
																className="w-full"
																title="Doctor"
																value={doctorName(
																	order?.surgeonRefer
																)}
															/>

															<CaseDetails
																code={
																	order?.rvs_code
																}
																title="Procedure Details"
																cases={
																	procedureRates ||
																	[]
																}
															/>
														</div>
													</div>
													<ContentTitle title="Medicine To Be Released"></ContentTitle>

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
		</AppLayout>
  )
}

export default PatientCSRQueue

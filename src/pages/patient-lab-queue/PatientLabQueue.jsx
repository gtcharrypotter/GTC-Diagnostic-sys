import { useEffect, useRef, useState } from "react";
import AppLayout from "../../components/container/AppLayout";
import useNoBugUseEffect from "../../hooks/useNoBugUseEffect";
import PageHeader from "../../components/layout/PageHeader";
import InServiceItem from "./components/InServiceItem";
import FlatIcon from "../../components/FlatIcon";
import InQueueRegular from "./components/InQueueRegular";
import useQueue from "../../hooks/useQueue";
import {
	calculateAge,
	doctorName,
	doctorSpecialty,
	formatDate,
	formatDateTime,
	patientFullName,
} from "../../libs/helpers";
import ReferToSPHModal from "../../components/modal/ReferToSPHModal";
import { useAuth } from "../../hooks/useAuth";
import useDoctorQueue from "../../hooks/useDoctorQueue";
import useLabQueue from "../../hooks/useLabQueue";
import Img from "../../components/Img";
import LaboratoryOrders from "../../components/patient-modules/LaboratoryOrders";
import { Fade } from "react-reveal";
import UploadLabResultModal from "../../components/patient-modules/modals/UploadLabResultModal";
import ActionBtn from "../../components/buttons/ActionBtn";
import TabGroup from "../../components/TabGroup";
import MenuTitle from "../../components/buttons/MenuTitle";
import Chemistry from "../../components/laboratory/Chemistry";
import Microscopy from "../../components/laboratory/Microscopy";
import Hematology from "../../components/laboratory/Hematology";
import Microbiology from "../../components/laboratory/Microbiology";
import Serology from "../../components/laboratory/Serology";
import Bloodtype from "../../components/laboratory/Bloodtype";
import Crossmatching from "../../components/laboratory/Crossmatching";
import Covid from "../../components/laboratory/Covid";
import Miscellaneous from "../../components/laboratory/Miscellaneous";
import ChemistryModal from "../../components/modal/laboratory/ChemistryModal";
import PatientImg from "../../components/PatientImg";
const PatientProfile = ({ patient }) => {
	return (
		<div className="flex flex-col lg:flex-row gap-4 items-center px-4 pt-4 border-b justify- md:justify-start bg-slate-50 p-4 h-full">
			<div className="group relative h-[108px] w-[108px] min-h-[108px] min-w-[108px] rounded-full aspect-square bg-background">
				<PatientImg
					type="user"
					name={patientFullName(patient)}
					src={patient?.avatar || ""}
					className="min-h-[108px] min-w-[108px] aspect-square object-cover rounded-full"
					alt=""
					id="user-image-sample"
					key={`key-${patient?.id}-${patient?.avatar}`}
				/>
			</div>
			<div className="flex flex-col pl-4">
				<h6
					className={`text-left text-2xl mb-1 font-semibold flex items-center ${
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
						<span>{calculateAge(patient?.birthday)} yrs. old</span>
					</div>
					<div className="flex items-center gap-2 text-base">
						<FlatIcon icon="rr-calendar" className="text-base" />
						<span>{formatDate(patient?.birthday)}</span>
					</div>
				</div>
				<div className="flex gap-4 mb-2">
					<div className="flex items-center gap-2 text-base">
						<FlatIcon icon="rr-venus-mars" className="text-base" />
						{String(patient?.gender).toLowerCase() == "male" ? (
							<span className="text-blue-700">Male</span>
						) : (
							<span className="text-pink-700">Female</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
const PatientLabQueue = () => {
	
	const { user } = useAuth();
	const { pending, mutatePending, nowServing } = useLabQueue();
	const [order, setOrder] = useState(null);
	const referToSphModalRef = useRef(null);
	const uploadLabResultRef = useRef(null);
	const [selectedTab, setSelectedTab] = useState("");
	useNoBugUseEffect({
		functions: () => {},
	});

	const listPending = () => {
		return pending?.data || [];
		// return (isDoctor() ? doctorsPending?.data : pending?.data) || [];
	};
	const mutateAll = () => {
		mutatePending();
	};
	console.log("View Relationship Data", order)
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
							Patients pending for laboratory services
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
												{/* <div className="flex items-center gap-2 mb-2">
													<span className="text-sm ">
														Notes:
													</span>
													<span className="font-light italic">
														{" "}
														{queue?.notes}
													</span>
												</div> */}
												{/* {queue?.relationships
													?.healthUnit ? (
													<div className="flex items-center gap-2 mb-2">
														<span className="text-sm ">
															{
																queue
																	?.relationships
																	?.healthUnit
																	?.type
															}
															:
														</span>
														<span className="font-medium ">
															{" "}
															{
																queue
																	?.relationships
																	?.healthUnit
																	?.name
															}
														</span>
													</div>
												) : (
													""
												)} */}
											</div>
										</InQueueRegular>
									);
								})
							}
						</div>
					</div>
					<div className="lg:col-span-8 pl-4">
						<div className="flex items-center gap-4 pb-4">
							<h1 className="text-xl font-bold font-opensans text-success-dark tracking-wider -mb-1">
								In Service...
							</h1>
						</div>
						<div>
							{order?.relationships?.patient ? (
								<Fade key={`order-${order?.id}`}>
									<div>
										<PatientProfile
											patient={
												order?.relationships?.patient
											}
										/>
										<div className="py-4">
											<LaboratoryOrders
												patient={
													order?.relationships
														?.patient
												}
												order_id={order?.id}
												onUploadLabResultSuccess={() => {
													console.log(
														"onUploadLabResultSuccess"
													);
													mutatePending();
													setOrder(null);
												}}
											/>
										</div>
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
	);
};

export default PatientLabQueue;

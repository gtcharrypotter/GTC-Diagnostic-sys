import React, { useState } from 'react'
import FlatIcon from '../../../components/FlatIcon';
import { calculateAge, doctorName, doctorSpecialty, formatDate, formatDateTime, patientFullName } from '../../../libs/helpers';
import useImagingQueue from '../../../hooks/useImagingQueue';
import { useAuth } from '../../../hooks/useAuth';
import useNoBugUseEffect from '../../../hooks/useNoBugUseEffect';
import { Fade } from 'react-reveal';
import InQueueRegular from '../../patient-queue/components/InQueueRegular';
import AppLayout from '../../../components/container/AppLayout';
import Img from '../../../components/Img';
import ImagingReading from './components/ImagingReading';
import PatientImg from '../../../components/PatientImg';
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

const ImagingResultReadingQueue = () => {
    const { user } = useAuth();
	const { resultReading: radiologyReading,
			mutateResultReading 
			} = useImagingQueue();
	const [order, setOrder] = useState(null);
	useNoBugUseEffect({
		functions: () => {},
	});

	const isRadiology = () => {
		
		return user?.type == "his-radiology" || user?.type == "HIS-RADIOLOGY" || user?.type == "sph-radiology" || user?.type == "SPH-RADIOLOGY" || user?.type == "rhu-radiology" || user?.type == "RHU-RADIOLOGY"; 
	};

	const listPending = () => {
		return (isRadiology() ? radiologyReading?.data : "") || [];
		// return (isDoctor() ? doctorsPending?.data : pending?.data) || [];
	};
	const mutateAll = () => {
		mutateResultReading();
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
							Patient Result Reading Queue
						</h1>
						<span className="noto-sans-thin text-slate-500 text-sm font-light">
							Patients pending for laboratory services
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
													<span className="text-sm w-[58px]">
														Order:
													</span>
													<span className="font-bold text-red-700">
														{" "}
														{queue?.type?.name}
													</span>
												</div>
												<div className="flex items-center gap-2 mb-2">
													<span className="text-sm w-[58px]">
														Date:
													</span>
													<span className="font-light italic">
														{formatDate(
															new Date(
																queue?.created_at
															)
														)}
													</span>
												</div>
												<div className="flex items-start gap-2 mb-2">
													<span className="text-sm w-[58px]">
														Doctor:{" "}
													</span>
													<span className="flex flex-col font-bold">
														<span className="-mb-1">
															{doctorName(
																queue?.relationships?.doctor
															)}
														</span>
														<span className="font-light text-sm">
															{doctorSpecialty(
																queue?.relationships?.doctor
															)}
														</span>
													</span>
												</div>
											</div>
										</InQueueRegular>
									);
								})}
							
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
							{order?.relationships?.patient ? (
								<Fade key={`order-${order?.id}`}>
									<div>
										<PatientProfile
											patient={
												order?.relationships?.patient
											}
										/>
										<div className="py-4">
											<ImagingReading
												patient={
													order?.relationships?.patient
												}
													appointment={
																	order
																}
												order_id={order?.id}
												onUploadLabResultSuccess={() => {
													console.log(
														"onUploadLabResultSuccess"
													);
													mutateAll();
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
  )
}

export default ImagingResultReadingQueue

import { useForm } from "react-hook-form";
import CollapseDiv from "../../../components/CollapseDiv";
import FlatIcon from "../../../components/FlatIcon";
import PatientVitals from "../../../components/PatientVitals";
import {
	generalHistories,
	medicalSurgicalHistories,
	symptoms,
} from "../../../libs/appointmentOptions";
import { doctorName, doctorSpecialty, formatDateMMDDYYYYHHIIA, keyByValue } from "../../../libs/helpers";
import useNoBugUseEffect from "../../../hooks/useNoBugUseEffect";
import TextInputField from "../../../components/inputs/TextInputField";
import PatientServices from "../../../components/modal/PatientServices";
import { useEffect, useRef, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import Axios from "../../../libs/axios";
import AppointmentStatus from "../../../components/AppointmentStatus";
import CashierApproval from "./CashierApproval";
import BillingApproval from "../../hims/his-billing/component/BillingApproval";
import PatientReleaseService from "../../../components/modal/PatientReleaseService";
import ImagingFinalReport from "../../../components/patient-modules/ImagingFinalReport";
import MenuTitle from "../../../components/buttons/MenuTitle";
import LaboratoryFinalReport from "../../../components/patient-modules/LaboratoryFinalReport";
import PBEF from "../../hims/his-billing/component/pmrf-claims/PBEF";
import ClaimForm4 from "../../hims/his-billing/component/pmrf-claims/ClaimForm4";
import ClaimForm3 from "../../hims/his-billing/component/pmrf-claims/ClaimForm3";
import ClaimForm2 from "../../hims/his-billing/component/pmrf-claims/ClaimForm2";
import ClaimForm1 from "../../hims/his-billing/component/pmrf-claims/ClaimForm1";
import PMRF from "../../hims/his-billing/component/pmrf-claims/PMRF";
import TabGroup from "../../../components/TabGroup";
import ActionBtn from "../../../components/buttons/ActionBtn";
import CashierReciept from "./CashierReciept";
import ClaimsFormFullscreenModal from "../../hims/his-billing/component/pmrf-claims/fullscreen/ClaimsFormFullscreenModal";
import CashierDischarge from "./CashierDischarge";
import EKASForm from "../../hims/his-billing/component/pmrf-claims/EKASForm";
import EPresSForm from "../../hims/his-billing/component/pmrf-claims/EPresSForm";
import PatientProfileContent from "../../patients/components/PatientProfileContent";

const uniq_id = uuidv4();
/* eslint-disable react/prop-types */

const TRow = ({ title, value }) => {
	return (
		<tr>
			<td className="text-sm pb-2">
				<span className="text-slate-500 text-xs">{title}</span>
			</td>
			<td className="text-sm pb-2 px-2">
				{typeof value == "object"
					? JSON.stringify(value)
					: value || "-"}
			</td>
		</tr>
	);
};
const InfoText = ({
	className = "",
	valueClassName = "",
	label,
	icon,
	value,
}) => {
	return (
		<div className={`flex flex-col ${className}`}>
			{label ? (
				<span className="text-slate-800 text-xs capitalize mb-1">
					{label}
				</span>
			) : (
				""
			)}
			<div className="flex items-center mb-0 gap-2">
				<span className="flex items-center justify-center">
					<FlatIcon
						icon={icon || "bs-arrow-turn-down-right"}
						className="text-[10px] text-slate-600 ml-1"
					/>
				</span>
				<span
					className={`capitalize gap-1 text-slate-900 flex text-base flex-wrap ${valueClassName} `}
				>
					{value}
				</span>
			</div>
		</div>
	);
};
const AppointmentDetailsForNurse = ({
	appointment: propAppointment,
	forCashier = false,
	forDischarge = false,
	setOrder,
	hideServices = false,
	mutateAll,
}) => {
	const {
		register,
		getValues,
		setValue,
		control,
		reset,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [appointment, setAppointment] = useState(propAppointment);
	const [key, setKey] = useState(uniq_id);
	const claimsFullRef = useRef(null);
	useNoBugUseEffect({
		functions: () => {
			setTimeout(() => {
				if (appointment?.social_history) {
					Object.keys(appointment?.social_history).map((key) => {
						console.log(
							"appointment?.social_history[key]",
							key,
							appointment?.social_history[key]
						);
						setValue(key, appointment?.social_history[key]);
					});
				}
			}, 1500);
		},
		params: [appointment?.id, key],
	});
	const refreshData = () => {
		Axios.get(`v1/hospital/get-appointment/${appointment?.id}`).then(
			(res) => {
				setAppointment(res.data.data);
				setKey(uuidv4());
			}
		);
	};
	console.log('Appointment Details', propAppointment)
	return (
		<div className="flex flex-col">
			<h4 className="border flex items-center text-base font-bold p-2 mb-0 border-indigo-100 lg:col-span-12">
				<span>Appointment Information</span>
				<span className="ml-auto">
					
					<div className="flex flex-col gap-2">
						{/* <div className="">
							Tranche:{" "}
							<b className="uppercase font-normal ">
								<span className="text-red-600">
							{appointment?.tranche}
								</span>
							</b>
						</div> */}
						<div className="">
							Status:{" "}
							<b className="uppercase font-normal">
								<AppointmentStatus
								
									appointment={appointment}
								/>
							</b>
						</div>
					</div>
				</span>
			</h4>
			{appointment?.id ? (
				<>
					<div className="flex flex-col gap-y-4 px-4 border-x border-b rounded-b-xl border-indigo-100 pt-5 pb-4">
						
						{/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 px-4">
							<InfoText
								className="lg:col-span-6"
								label="Consultation Type:"
								value={appointment?.post_notes}
							/>
							<InfoText
								className="lg:col-span-6"
								label="Date:"
								value={formatDateMMDDYYYYHHIIA(
									new Date(appointment?.created_at)
								)}
							/>
							<InfoText
								className="lg:col-span-6"
								label="Chief complaint:"
								value={appointment?.pre_notes}
							/>
							{appointment?.referredToDoctor?.name ? (
								<InfoText
									className="lg:col-span-6"
									label="Doctor:"
									value={
										<div className="flex flex-col">
											<span>
												{doctorName(
													appointment?.referredToDoctor
												)}
											</span>
											<span className="text-xs font-light">
												{doctorSpecialty(
													appointment?.referredToDoctor
												)}
											</span>
										</div>
									}
								/>
							) : (
								""
							)}
							
							{appointment?.doctor?.name ? (
								<InfoText
									className="lg:col-span-6"
									label="Doctor:"
									value={
										<div className="flex flex-col">
											<span>
												{doctorName(
													appointment?.doctor
												)}
											</span>
											<span className="text-xs font-light">
												{doctorSpecialty(
													appointment?.doctor
												)}
											</span>
										</div>
									}
								/>
							) : (
								""
							)}
							
							
							<InfoText
								className="lg:col-span-6"
								label="Reason for appointment:"
								value={appointment?.reason}
							/>
							<InfoText
								className="lg:col-span-6"
								label="Mode of consultation:"
								valueClassName=" !uppercase"
								value={appointment?.mode_of_consultation}
							/>
							<InfoText
								className="lg:col-span-6"
								label="PHIC ID:"
								value={appointment?.phic_no}
							/>
							<InfoText
								className="lg:col-span-12"
								label="Brief Clinical History and Pertinent Physical Examination:"
								value={appointment?.history}
							/>
							<InfoText
								className="lg:col-span-12"
								label="Laboratory Findings (Including ECG, X-ray, and other diagnostic procedures):"
								value={appointment?.lab_findings}
							/>
						</div> */}
						<CollapseDiv
							defaultOpen={false}
							withCaret={true}
							title="Patient details"
							headerClassName="bg-blue-50"
							bodyClassName="p-0"
						>
						<div className="square-table w-full border p-2 rounded-lg mb-2">
							<PatientProfileContent patient={appointment?.patient} />
						</div>
						</CollapseDiv>

						<CollapseDiv
							defaultOpen={
								appointment.status == "pending" &&
								appointment?.vital_id == null
							}
							withCaret={true}
							title="Patient Vitals"
							headerClassName="bg-blue-50"
							bodyClassName="p-0"
						>
							<PatientVitals
								showTitle={false}
								appointment={appointment}
								patient={appointment?.patient}
								mutateAll={mutateAll}
								onSuccess={() => {
									refreshData();
								}}
							/>
						</CollapseDiv>
						{appointment?.post_notes == "Covid 19" || appointment?.post_notes == "Influenza" || 
						appointment?.post_notes == "Meningococcal Meningitis" || appointment?.post_notes == "Tuberculosis" || 
						appointment?.post_notes == "Varicella" || appointment?.post_notes == "Respiratory Syncytial Virus" || 
						appointment?.post_notes == "Ebola Virus" &&
						appointment.tb_symptoms != null ? (
							<CollapseDiv
								defaultOpen={
									appointment?.post_notes == "Covid 19" || appointment?.post_notes == "Influenza" || 
									appointment?.post_notes == "Meningococcal Meningitis" || appointment?.post_notes == "Tuberculosis" || 
									appointment?.post_notes == "Varicella" || appointment?.post_notes == "Respiratory Syncytial Virus" || 
									appointment?.post_notes == "Ebola Virus" &&
									appointment?.tb_symptoms !== null
								}
								withCaret={true}
								title="Patient TB Symtoms"
								headerClassName="bg-blue-50"
								bodyClassName="p-0"
							>
								{appointment?.tb_symptoms !== null ? (
									<div className="flex flex-col gap-1 mt-0 pb-2 !shadow-yellow-600 rounded-sm bg-white">
										<ul className="w-1/2">
											{symptoms?.map((symp) => {
												return (
													<li
														className="!text-xs flex justify-between"
														key={`${keyByValue(
															symp.label
														)}`}
													>
														<span>
															{symp.label} -{" "}
														</span>
														<b className="text-center">
															{appointment
																?.tb_symptoms[
																symp.value
															]
																? "YES"
																: "no "}
														</b>
													</li>
												);
											})}
										</ul>
									</div>
								) : (
									""
								)}
							</CollapseDiv>
						) : (
							""
						)}
						{appointment?.status == "pending-for-cashier" || appointment?.status == "pending-discharge" ? (
							<CollapseDiv
							defaultOpen={false}
							withCaret={true}
							title="Claims Form Details"
							headerClassName="bg-blue-50"
							bodyClassName="p-0"
						>
								<ActionBtn
								type="foreground"
								size="lg"
								className="ml-auto mb-6"
								// Add your fullscreen logic here
								onClick={() => {
									claimsFullRef.current.show({patient : appointment?.patient});
								}}
							>
								<FlatIcon icon="br-expand-arrows-alt" />
							</ActionBtn>
							<TabGroup
								tabClassName={`py-3 bg-slate-100 border-b`}
												contentClassName={
													"max-h-[unset]"
												}
												contents={[
													{
														title: (
															<MenuTitle src="/philhealth.png">
																PMRF
															</MenuTitle>
														),
														
														// content: (
														// 	<AppointmentData
														// 		appointment={
														// 			showData
														// 		}
														// 		mutateAll={() => {
														// 			mutateAll();
														// 			hide();
														// 		}}
														// 		patient={
														// 			patient
														// 		}
														// 	/>
														// ),
														content: (
														<PMRF
															patient={appointment?.patient}
														/>
													),
													},
													{
														title: (
															<MenuTitle src="/philhealth.png">
																Claim Form
															</MenuTitle>
														),

														// content: (
														// 	<PatientProfileDetails
														// 		patient={
														// 			patient
														// 		}
														// 	/>
														// ),
														content: (
														<ClaimForm1
															patient={appointment?.patient}
															appointment={appointment}
														/>
													),
													},

													{
														title: (
															<MenuTitle src="/philhealth.png">
																Claim Form 2
															</MenuTitle>
														),
														// content: (
														// 	<PatientPrescriptions
														// 		patient={
														// 			patient
														// 		}
														// 	/>
														// ),
														content: (
														<ClaimForm2
															patient={appointment?.patient}
															appointment={appointment}
														/>
													),
													},
													{
														title: (
															<MenuTitle src="/philhealth.png">
																Claim Form 3
															</MenuTitle>
														),

														// content: (
														// 	<PatientVitalCharts
														// 		patient={
														// 			patient
														// 		}
														// 	/>
														// ),
														content: (
														<ClaimForm3
															patient={appointment?.patient}
															appointment={appointment}
														/>
													),
													},
													{
														title: (
															<MenuTitle src="/philhealth.png">
																Claim Form 4
															</MenuTitle>
														),
													// 	content: (
													// 		<RhuReleasing
													// 			patient={patient}
													// 			setPatient={setPatient}
													// 		/>
													// 	),
													content: (
														<ClaimForm4
															patient={appointment?.patient}
															appointment={appointment}
														/>
													),
													},
													{
														title: (
															<MenuTitle src="/philhealth.png">
																PBEF
															</MenuTitle>
														),
													// 	content: (
													// 		<RhuReleasing
													// 			patient={patient}
													// 			setPatient={setPatient}
													// 		/>
													// 	),
													content: (
														<PBEF
															patient={appointment?.patient}
															appointment={appointment}
														/>
													),
													},
													{
														title: (
															<MenuTitle src="/philhealth.png">
																eKAS
															</MenuTitle>
														),
													content: (
														<EKASForm
															patient={appointment?.patient}
															appointment={appointment}
														/>
													),
													},
													{
														title: (
															<MenuTitle src="/philhealth.png">
																ePresS
															</MenuTitle>
														),
													// 	content: (
													// 		<RhuReleasing
													// 			patient={patient}
													// 			setPatient={setPatient}
													// 		/>
													// 	),
													content: (
														<EPresSForm
															patient={appointment?.patient}
															appointment={appointment}
														/>
													),
													},
													{
														title: (
															<MenuTitle src="/healthcare.png">
																SOA
															</MenuTitle>
														),
													// 	content: (
													// 		<RhuReleasing
													// 			patient={patient}
													// 			setPatient={setPatient}
													// 		/>
													// 	),
													content: (
														<CashierReciept
															patient={appointment?.patient}
														/>
													),
													},	
								]}
							/>
							
											
						</CollapseDiv>
						) : (
							""
						)}
						
						{!hideServices ? (
							<CollapseDiv
								defaultOpen={
									(appointment.status === "pending" && appointment?.vital_id != null) ||
									appointment?.status === "pending-for-pharmacy-medicine-release" ||
									appointment?.status === "pending-for-cashier" ||
									appointment?.status === "pending-discharge"
								}
								withCaret={true}
								title="Services"
								headerClassName="bg-blue-50"
								bodyClassName="p-0"
							>
								{appointment?.status === "pending-for-pharmacy-medicine-release" ? (
									<PatientReleaseService
										setAppointment={setOrder}
										showTitle={false}
										mutateAll={mutateAll}
										appointment={appointment}
										patient={appointment?.patient}
									/>
								) : forCashier ? (
									<CashierApproval
										setAppointment={setOrder}
										showTitle={false}
										appointment={appointment}
										patient={appointment?.patient}
										mutateAll={mutateAll}
									/>
								) : forDischarge ? (
									<CashierDischarge
										setAppointment={setOrder}
										showTitle={false}
										appointment={appointment}
										patient={appointment?.patient}
										mutateAll={mutateAll}
									/>
								) :(
								<PatientServices
										setAppointment={setOrder}
										showTitle={false}
										mutateAll={mutateAll}
										appointment={appointment}
										patient={appointment?.patient}
								/>
								)}
							</CollapseDiv>
						) : (
							""
						)}
					</div>
				</>
			) : (
				""
			)}
		<ClaimsFormFullscreenModal ref={claimsFullRef}/>
		</div>
		
	);
};

export default AppointmentDetailsForNurse;

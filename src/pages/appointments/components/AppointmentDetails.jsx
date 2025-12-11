import { Controller, useForm } from "react-hook-form";
import CollapseDiv from "../../../components/CollapseDiv";
import FlatIcon from "../../../components/FlatIcon";
import PatientVitals from "../../../components/PatientVitals";
import {
	generalHistories,
	immunizationAdult,
	immunizationChildren,
	immunizationElder,
	immunizationPregnant,
	medicalSurgicalHistories,
	symptoms,
} from "../../../libs/appointmentOptions";
import {
	dataURItoBlob,
	doctorName,
	doctorSpecialty,
	formatDateMMDDYYYYHHIIA,
	keyByValue,
} from "../../../libs/helpers";
import useNoBugUseEffect from "../../../hooks/useNoBugUseEffect";
import TextInputField from "../../../components/inputs/TextInputField";
import { useEffect, useState } from "react";
import AppointmentStatus from "../../../components/AppointmentStatus";
import { useAuth } from "../../../hooks/useAuth";
import ActionBtn from "../../../components/buttons/ActionBtn";
import Axios from "../../../libs/axios";
import TextAreaField from "../../../components/inputs/TextAreaField";
import RadioInput from "../../../components/inputs/RadioInput";
import ReactSelectInputField from "../../../components/inputs/ReactSelectInputField";
import { memberTypeOptions, typeOfDelivery } from "../../../libs/patientFormOptions";
import { toast } from "react-toastify";
import ConsultationServices from "./ConsultationServices";
import TargetedOrderServices from "../../../components/patient-modules/TargetedOrderServices";

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
					{value} &nbsp;
				</span>
			</div>
		</div>
	);
};
const AppointmentDetails = ({
	showService = true,
	appointment,
	serviceComponent,
	// emergencyServices,
	forResult = false,
	customStatus = null,
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
	const { user } = useAuth();
	const [selected, setSelected] = useState(null);
	const [loading, setLoading] = useState(false);
	useNoBugUseEffect({
		functions: () => {
			setTimeout(() => {
				if (appointment?.social_history) {
					Object.keys(appointment?.social_history).map((key) => {
						setValue(key, appointment?.social_history[key]);
					});
				}
				// if (appointment?.general_history) {
				// 	Object.keys(appointment?.general_history).map((key) => {
				// 		setValue(key, appointment?.general_history[key]);
				// 	});
				// }

				// if (appointment?.surgical_history) {
				// 	Object.keys(appointment?.surgical_history).map((key) => {
				// 		setValue(key, appointment?.surgical_history[key]);
				// 	});
				// }
				// if (appointment?.environmental_history) {
				// 	Object.keys(appointment?.environmental_history).map(
				// 		(key) => {
				// 			setValue(
				// 				key,
				// 				appointment?.environmental_history[key]
				// 			);
				// 		}
				// 	);
				// }
			}, 1000);
		},
		params: [appointment?.id],
	});
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
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-3 px-4">
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
							
						
						</div>
						{appointment?.status == "pending-for-pharmacy-release" || appointment?.status == "pending-for-pharmacy-medicine-release" ? (
							""
						) : (
						<CollapseDiv
							defaultOpen={appointment?.status == "in-service-consultation"  || 
										appointment?.status === 'in-service-result-reading'
							}
							withCaret={true}
							title="Consultation"
							headerClassName="bg-blue-50"
							bodyClassName="p-0"
						>
							<ConsultationServices appointment={appointment} patient={appointment?.patient}/>
							
						</CollapseDiv>
						)}
						
					
						{showService && appointment?.status !== "in-service-consultation" &&
						(appointment?.vital_id ||
							appointment?.has_for_reading?.length) ? (
							
								
								<CollapseDiv
								defaultOpen={true}
								withCaret={true}
								title="Services"
								headerClassName="bg-blue-50"
								bodyClassName="p-0"
							>
								{/* {emergencyServices} */}
								{serviceComponent}
							</CollapseDiv>
						
							
						) : (
							<CollapseDiv
									defaultOpen={true}
									withCaret={true}
									title="Plan Management"
									headerClassName="bg-blue-50"
									bodyClassName="p-0"
								>
									{/* {emergencyServices} */}
									<TargetedOrderServices 
									appointment={appointment}
									laboratory_test_type={"all"}
									patient={appointment?.patient}
									/>
								</CollapseDiv>
						)}
						
					</div>
				</> 
			) : (
				""
			)}
		</div>
	);
};

export default AppointmentDetails;

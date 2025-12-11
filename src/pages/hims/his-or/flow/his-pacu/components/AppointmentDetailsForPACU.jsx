import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import FlatIcon from '../../../../../../components/FlatIcon';
import Axios from '../../../../../../libs/axios';
import useNoBugUseEffect from '../../../../../../hooks/useNoBugUseEffect';
import { useForm } from 'react-hook-form';
import PatientServices from '../../../../../../components/modal/PatientServices';
import PACUApproval from './PACUApproval';
import CollapseDiv from '../../../../../../components/CollapseDiv';
import { doctorName, doctorSpecialty, formatDateMMDDYYYYHHIIA } from '../../../../../../libs/helpers';
import AppointmentStatus from '../../../../../../components/AppointmentStatus';
import PatientVitals from '../../../../../../components/PatientVitals';
import PatientPACUServices from './PatientPACUServices';
const uniq_id = uuidv4();
/* eslint-disable react/prop-types */
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
const AppointmentDetailsForPACU = ({
    appointment: propAppointment,
	forPACU = false,
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
	const appointmentStatus = () => {
		if (appointment?.status == "pending" && appointment?.vital_id == null) {
			return (
				<span className="text-orange-500">
					Pending for patient vitals {appointment?.vital_id}
				</span>
			);
		}
		if (appointment?.status == "pending" && appointment?.vital_id != null) {
			return <span className="text-orange-600">Pending for service</span>;
		}
		if (appointment?.status == "pending-for-bhw-release") {
			return <span className="text-red-600">Pending for release</span>;
		}
		return (
			<span className="text-red-600 uppercase">
				{String(appointment?.status).replaceAll("-", " ")}
			</span>
		);
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
    <div className="flex flex-col">
			<h4 className="border flex items-center text-base font-bold p-2 mb-0 border-indigo-100 lg:col-span-12">
				<span>Appointment Information</span>
				<span className="ml-auto">
					Status:{" "}
					<b className="uppercase font-normal">
						<AppointmentStatus appointment={appointment} />
					</b>
				</span>
			</h4>
			{appointment?.id ? (
				<>
					<div className="flex flex-col gap-y-4 px-4 border-x border-b rounded-b-xl border-indigo-100 pt-5 pb-4">
						{/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 px-4">
							<InfoText
								className="lg:col-span-6"
								label="Initial Diagnosis:"
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
							
							
							{/* <InfoText
								className="lg:col-span-6"
								label="Reason for appointment:"
								value={appointment?.reason}
							/> */}
							{/* <InfoText
								className="lg:col-span-6"
								label="Mode of consultation:"
								valueClassName=" !uppercase"
								value={appointment?.mode_of_consultation}
							/> */}
							{/* <InfoText
								className="lg:col-span-6"
								label="PHIC ID:"
								value={appointment?.phic_no}
							/> */}
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
						</div>
						<CollapseDiv
							defaultOpen={
								appointment.status == "pending-pacu"
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
						

						{!hideServices ? (
							<CollapseDiv
								defaultOpen={
									(appointment.status == "pending-for-surgery-pacu") || 
									(appointment.status == "pending-for-delivery-pacu")
								}
								withCaret={true}
								title="Services"
								headerClassName="bg-blue-50"
								bodyClassName="p-0"
							>
								
								{forPACU? (
									<PatientPACUServices
										setAppointment={setOrder}
										showTitle={false}
										mutateAll={mutateAll}
										appointment={appointment}
										patient={appointment?.patient}
									/>
								) : (
									
									<PACUApproval
										setAppointment={setOrder}
										showTitle={false}
										appointment={appointment}
										patient={appointment?.patient}
										mutateAll={mutateAll}
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
		</div>
  )
}

export default AppointmentDetailsForPACU

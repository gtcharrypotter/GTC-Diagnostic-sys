/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import FlatIcon from '../../../../components/FlatIcon';
import CollapseDiv from '../../../../components/CollapseDiv';
import PatientVitals from '../../../../components/PatientVitals';
import TextInputField from '../../../../components/inputs/TextInputField';
import { generalHistories, medicalSurgicalHistories } from '../../../../libs/appointmentOptions';
import { doctorName, doctorSpecialty, formatDateMMDDYYYY, formatDateMMDDYYYYHHIIA,  keyByValue } from '../../../../libs/helpers';
import { useForm } from 'react-hook-form';

import { v4 as uuidv4 } from "uuid";
import PatientPharmacyOrder from '../../../department/his-nurse/components/PatientPharmacyOrder';
import PatientCSROrder from '../../../department/his-nurse/components/PatientCSROrder';
import PatientORSchedule from './PatientORSchedule';
import Axios from '../../../../libs/axios';
import AppointmentStatus from '../../../../components/AppointmentStatus';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
const uniq_id = uuidv4();

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
const formatDateTime = (dateTime) => {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    return date.toLocaleString();
};

const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return '';

    const start = new Date(startTime);
    const end = new Date(endTime);

    const durationInMilliseconds = end - start;
    const durationInSeconds = Math.floor(durationInMilliseconds / 1000);
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    return `${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
};
const AppointmentDetailsForOr = ({
	showService = true,
	appointment: propAppointment,
	mutateAll,
	setOrder,
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

							{/* {appointment?.doctor?.name ? (
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
							)} */}


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
							defaultOpen={false}
							withCaret={true}
							title="Patient details"
							headerClassName="bg-blue-50"
							bodyClassName="p-0"
						>
							<div className="square-table w-full border p-2 rounded-lg mb-2">
							<table className="">
								<tbody className="">
									<TRow
										title="Member Pin:"
										value={appointment?.patient?.m_pin?.replace(/(\d{2})(\d{9})(\d{1})/, '$1-$2-$3')}
									/>
									<TRow
										title="Lastname:"
										value={appointment?.patient?.m_lastname}
									/>
									<TRow
										title="Firstname:"
										value={appointment?.patient?.m_firstname}
									/>
									<TRow
										title="Middlename:"
										value={appointment?.patient?.m_middlename || ""}
									/>
									<TRow
										title="Middlename:"
										value={appointment?.patient?.m_suffix || ""}
									/>
									<TRow
										title="Birthday:"
										value={appointment?.patient?.m_birthday}
									/>
									<TRow
										title="Category:"
										value={appointment?.patient?.m_category}
									/>
								</tbody>
							</table>
						</div>
						</CollapseDiv>

						<CollapseDiv
							defaultOpen={
								appointment?.status == "pending" &&
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
						{showService ? (
							<CollapseDiv
								defaultOpen={
									(appointment.status == "pending-or-refer")
									}
								withCaret={true}
								title="Services"
								headerClassName="bg-blue-50"
								bodyClassName="p-0"
							>
								<PatientORSchedule
										setAppointment={setOrder}
										showTitle={false}
										mutateAll={mutateAll}
										appointment={appointment}
										patient={appointment?.patient}
									/>
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

export default AppointmentDetailsForOr

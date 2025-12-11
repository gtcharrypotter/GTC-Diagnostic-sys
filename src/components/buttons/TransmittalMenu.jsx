/* eslint-disable react/prop-types */
import React from 'react'
import FlatIcon from '../FlatIcon'
import { calculateAge, cleanText, formatDate, patientFullName } from '../../libs/helpers'
import PatientImg from '../PatientImg'

const TransmittalMenu = ({ appointment, patient, active = false, ...rest }) => {
  return (
    <div
			className={`outline-none rounded-xl p-3 flex items-center gap-3 hover:bg-white cursor-pointer duration-300 border border-blue-300 hover:border-blue-500 hover:shadow-lg ${
				active ? "!bg-blue-200 !border-blue-500 shadow-lg " : ""
			}`}
			{...rest}
		>
			<PatientImg
				src={patient?.avatar || ""}
				type="user"
				name={patientFullName(patient)}
				className="h-14 w-14 rounded-full object-contain bg-slate-400"
			/>
			<div className="flex flex-col">
				<span className="text-base text-slate-800 font-semibold capitalize">
					{patientFullName(patient)}
				</span>
				<div className="flex lg:gap-4">
					<div className="flex gap-4 text-sm text-slate-500 mb-1">
						<div className="flex items-center gap-2 text-sm">
							<FlatIcon
								icon="rr-venus-mars"
								className="text-sm"
							/>
							{String(patient?.gender).toLowerCase() == "male" ? (
								<span className="text-blue-700">Male</span>
							) : (
								<span className="text-pink-700">Female</span>
							)}
						</div>
					</div>
					<div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
						<FlatIcon
							icon="rr-calendar-clock"
							className="text-sm"
						/>
						<span>{calculateAge(patient?.birthday)} yrs old</span>
					</div>
				</div>
				<div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
					<FlatIcon icon="rr-calendar" className="text-sm" />
					<span>{formatDate(patient?.birthday)}</span>
				</div>
				{/* <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 mt-2">
					<b>STATUS:</b>
					<span className="uppercase !text-black">
						{cleanText(patient?.pmrf_status, " ")}
					</span>
				</div> */}
				<div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
					<b>STATUS:</b>

					<span className="uppercase !text-black">
						{cleanText(patient?.pmrf_status_detail, " ")}
					</span>
				</div>
			</div>
		</div>
  )
}

export default TransmittalMenu

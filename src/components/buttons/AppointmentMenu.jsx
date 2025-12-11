/* eslint-disable react/prop-types */
import { calculateAge, formatDate, patientFullName } from '../../libs/helpers'
import FlatIcon from '../FlatIcon'
import Img from '../Img'

const AppointmentMenu = ({ appointment, patient, active = false, ...rest }) => {
  return (
    <div
			className={`outline-none rounded-xl p-3 flex items-center gap-3 hover:bg-white cursor-pointer duration-300 border border-blue-300 hover:border-blue-500 hover:shadow-lg ${
				active ? "bg-white !border-blue-500 shadow-lg " : ""
			}`}
			{...rest}
		>
			<Img
				src={appointment?.patient?.avatar || ""}
				type="user"
				name={patientFullName(appointment?.patient)}
				className="h-14 w-14 rounded-full object-contain bg-slate-400"
			/>
			<div className="flex flex-col">
				<span className="text-base text-slate-800 font-semibold">
					{patientFullName(appointment?.patient)}
				</span>
				<div className="flex lg:gap-4">
					<div className="flex gap-4 text-sm text-slate-500 mb-1">
						<div className="flex items-center gap-2 text-sm">
							<FlatIcon
								icon="rr-venus-mars"
								className="text-sm"
							/>
							{String(appointment?.patient?.gender).toLowerCase() == "male" ? (
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
						<span>{calculateAge(appointment?.patient?.birthday)} yrs old</span>
					</div>
				</div>
				<div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
					<FlatIcon icon="rr-calendar" className="text-sm" />
					<span>{formatDate(appointment?.patient?.birthday)}</span>
				</div>
			</div>
		</div>
  )
}

export default AppointmentMenu

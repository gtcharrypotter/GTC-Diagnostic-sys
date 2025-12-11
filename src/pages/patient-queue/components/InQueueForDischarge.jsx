import React from 'react'
import FlatIcon from '../../../components/FlatIcon'

const InQueueForDischarge = ({
	children,
	onClick,
	referAction,
	number,
	selected,
	patientName,
	date
}) => {
  return (
    <div
			className={`p-3 gap-3 relative rounded-[20px] border border-green-300 bg-orange-50  cursor-pointer hover:bg-indigo-100 hover:border-indigo-500 duration-200 ${
				selected
					? "!bg-red-50 !border-green-800 shadow-sm shadow-green-500"
					: ""
			}`}
			onClick={onClick}
		>
			<div className="flex items-center gap-4">
				<span className="flex items-center justify-center bg-orange-100 text-green-500 tracking-tight rounded-[18px] font-bold w-12 aspect-square">
					#{number}
				</span>
				<span className="tracking-tight font-bold text-lg text-green-500">
					{date ? (
					<div className="flex items-center gap-2 text-sm -mt-4 -ml-3">
						{/* <FlatIcon icon="rr-calendar" /> */}
						{date}
					</div>
				) : (
					""
				)}
				<span className="capitalize tracking-tight font-bold text-lg">
					{patientName}
				</span>
				</span>
			</div>
			{children}
		</div>
  )
}

export default InQueueForDischarge

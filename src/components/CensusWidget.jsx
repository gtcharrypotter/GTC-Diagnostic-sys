/* eslint-disable react/prop-types */
import React from 'react'
import FlatIcon from './FlatIcon'

const CensusWidget = ({
	className = "",
	bgColor = "bg-slate-200",
	textColor = "text-slate-800",
	title,
	value,
	icon,
}) => {
  return (
    <div
			className={`flex items-center relative p-5 rounded-xl ${className} ${bgColor}`}
		>
			<div className="flex flex-col w-4/5 z-20">
				<span className={`font-bold text-sm mb-2 ${textColor}`}>
					{title}
				</span>
				<span className={`font-bold text-3xl ${textColor}`}>
					{value}&nbsp;
				</span>
			</div>
			<span
				className={`absolute right-5 z-10 flex items-center justify-center ${textColor}`}
			>
				<FlatIcon icon={icon} className="text-5xl" />
			</span>
		</div>
  )
}

export default CensusWidget

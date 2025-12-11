import React from 'react'

const EditTextForPrint = ({
	className = "",
	labelClassName = "",
	contentClassName = "",
	icon,
	title,
	value,
	...rest
}) => {
  return (
    <div
			// className={`flex flex-col sm:flex-row items-start lg:gap-4 border-b pb-2 border-b-slate-50  ${className}`}
			className={`flex flex-col sm:flex-row items-center capitalize ${className}`}
			{...rest}
		>
			<label
				className={`text-placeholder flex items-start text-xs font-light border-opacity-50 capitalize text-slate-400 lg:col-span-3 ${labelClassName}`}
			>
                {title}
			</label>

			<div
				contentEditable
				className={`text-black text-sm font-semibold capitalize lg:col-span-8 ${contentClassName}`}
			>
				{value || " "}
				{/* {value || (
					<>
						<span className="text-slate-800 font-normal text-xs italic">
							blank
						</span>{" "}
						&nbsp;
					</>
				)} */}
			</div>
		</div>
  )
}

export default EditTextForPrint

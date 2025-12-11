/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from "uuid";

const uniqID = uuidv4();
const SelectInput = (props) => {
	const {
		label,
		className = "",
		type = "text",
		inputClassName = "",
		error,
		ref,
		options = [],
		placeholder,
		register = {},
		...rest
	} = props;
	const hasError = () => {
		return typeof error == "string" || typeof error?.message == "string";
	};
	return (
		<label className={`flex flex-col ${className}`}>
			{label ? (
				<span
					className={`text-sm mb-1 text-dark ${
						hasError() ? "text-red-500" : ""
					}`}
				>
					{label}
				</span>
			) : (
				""
			)}
			<select
				{...rest}
				type={type}
				className={`h-11 bg-white p-3 duration-100 focus:border-primary-dark focus:bg-slate-50 focus:shadow outline-none border border-slate-400 text-dark rounded-lg text-sm ${
					hasError() ? " !border-red-600 focus:border-red-500" : ""
				} ${inputClassName}`}
				{...register}
			>
				{placeholder && (
					<option selected disabled>
						{placeholder}
					</option>
				)}
				{options?.map((option, index) => {
					return (
						<option
							value={option?.value}
							key={`${uniqID}-${index}`}
						>
							{option?.label}
						</option>
					);
				})}
			</select>
			{typeof error == "string" ? (
				<span className="text-red-600 text-xs mt-1">{error}</span>
			) : (
				""
			)}
			{typeof error?.message == "string" ? (
				<span className="text-red-600 text-xs mt-1">
					{error?.message}
				</span>
			) : (
				""
			)}
		</label>
	);
};

export default SelectInput;

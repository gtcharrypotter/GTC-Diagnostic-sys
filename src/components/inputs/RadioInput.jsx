import FlatIcon from "../FlatIcon";

import { v4 as uuidv4 } from "uuid";
/* eslint-disable react/prop-types */
let uniqID = uuidv4();
const RadioInput = (props) => {
	const {
		id,
		label,
		className = "",
		type = "radio",
		iconLeft,
		iconRight,
		inputContainerClassName = "flex-row",
		error,
		options,
		ref,
		children,
		register = {},
		...rest
	} = props;
	const hasError = () => {
		return typeof error == "string" || typeof error?.message == "string";
	};
	return (
		<div className={`flex flex-col ${className}`}>
			{label ? (
				<span
					className={`text-sm mb-1 ${
						hasError() ? "text-red-500" : ""
					}`}
				>
					{label}
				</span>
			) : (
				""
			)}

			<div
				className={`relative w-full flex items-center gap-4 ${inputContainerClassName}`}
			>
				{children}
			</div>
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
		</div>
	);
};

export default RadioInput;

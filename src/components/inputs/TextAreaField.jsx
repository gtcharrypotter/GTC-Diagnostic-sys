import { forwardRef } from "react";

const TextAreaField = (props, ref) => {
	const {
		id,
		type = "text",
		label,
		className = "",
		inputClassName = "",
		error,
		icon,
		register,
		value,
		...rest
	} = props;
	return (
		<div className={`${className ? className : ""} !duration-300`}>
			{label ? (
				<label
					htmlFor={id}
					className={`block mb-2 text-sm font-medium ${
						error
							? "text-red-700 dark:text-red-500"
							: "text-gray-900 dark:text-gray-900"
					}`}
				>
					{label}
				</label>
			) : (
				""
			)}
			<div className="relative w-full flex items-center">
				{icon ? (
					<span className="absolute left-0 mb-0 text-placeholder px-3 mt-1">
						{icon}
					</span>
				) : (
					""
				)}

				<textarea
					type={type}
					id={id}
					ref={ref || register}
					className={`${
						!error
							? "bg-gray-50 border border-border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:!bg-white focus:border-blue-500 block w-full pr-3 py-2.5"
							: "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:!bg-white pr-3 py-2.5 w-full"
					} !bg-opacity-60 text-sm duration-200 ${
						inputClassName ? inputClassName : ""
					} ${icon ? "pl-10" : " pl-3"}`}
					{...rest}
				>
					{value}
				</textarea>
			</div>
			{error ? (
				<p className="mt-2 text-sm text-red-600 dark:text-red-500 mb-0">
					{error}
				</p>
			) : (
				""
			)}
		</div>
	);
};

export default forwardRef(TextAreaField);

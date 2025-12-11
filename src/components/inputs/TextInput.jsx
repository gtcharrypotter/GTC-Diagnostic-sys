import FlatIcon from "../FlatIcon";

/* eslint-disable react/prop-types */
const TextInput = (props) => {
	const {
		label,
		className = "",
		type = "text",
		iconLeft,
		iconRight,
		inputClassName = "",
		error,
		ref,
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
			<div className="relative w-full flex items-center">
				<input
					{...rest}
					type={type}
					className={`h-11 w-full bg-slate-50 px-3 duration-100 focus:border-primary-dark focus:bg-white focus:shadow outline-none border border-slate-400 text-dark rounded-lg text-sm ${
						hasError()
							? " !border-red-600 focus:border-red-500"
							: ""
					} ${inputClassName} ${iconLeft ? "pl-9" : ""} ${
						iconRight ? "pr-10" : ""
					}`}
					{...register}
				/>
				{iconRight ? (
					<span className="right-0 absolute px-2 mr-[0px] pt-[3px]">
						<FlatIcon
							icon={`${iconRight}`}
							className="text-slate-500"
						/>
					</span>
				) : (
					""
				)}
				{iconLeft ? (
					<span className="absolute px-3 ml-[1px] pt-[3px]">
						<FlatIcon
							icon={`${iconLeft}`}
							className="text-slate-500"
						/>
					</span>
				) : (
					""
				)}
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
		</label>
	);
};

export default TextInput;

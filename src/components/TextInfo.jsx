import FlatIcon from "./FlatIcon";

const TextInfo = ({
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
			className={`grid grid-cols-1 lg:grid-cols-12 border-b pb-2 border-b-slate-50  ${className}`}
			{...rest}
		>
			<label
				className={`text-placeholder flex items-center text-xs font-light border-opacity-50 capitalize text-slate-400 lg:col-span-2 ${labelClassName}`}
			>
				{icon ? <FlatIcon icon={icon} className="mr-1" /> : ""} {title}:
			</label>

			<div
				className={`text-darker text-sm font-semibold capitalize lg:col-span-8 ${contentClassName}`}
			>
				{value || (
					<>
						<span className="text-gray-200 font-normal text-xs italic">
							blank
						</span>{" "}
						&nbsp;
					</>
				)}
			</div>
		</div>
	);
};

export default TextInfo;

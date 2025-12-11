import { Link } from "react-router-dom";

const DefaultBtn = ({ children, ...rest }) => {
	return <button {...rest}>{children}</button>;
};
const LinkBtn = ({ children, ...rest }) => {
	return <Link {...rest}>{children}</Link>;
};
const ActionBtn = (props) => {
	const {
		behavior,
		type = "primary",
		children,
		size = "md",
		disabled = false,
		loading = false,
		className = "",
		...rest
	} = props;
	const renderSize = () => {
		switch (size) {
			case "xs":
				return "py-[2px] text-[10px] px-2";
			case "sm":
				return "py-1 text-xs px-2";
			case "md":
				return "py-2 text-sm px-4";
			case "lg":
				return "py-3 text-sm px-6";
			case "xl":
				return "py-4 text-sm px-8";
			case "2xl":
				return "py-5 text-lg px-10";
			case "3xl":
				return "py-6 text-lg px-12";

			default:
				return "py-3 px-2";
		}
	};
	const renderType = () => {
		let disabledClass = "";
		if (disabled) {
			disabledClass = ` focus:bg-slate-500 opacity-50 pointer-events-none`;
		}
		switch (type) {
			case "primary":
				return `bg-primary-dark hover:bg-primary-darker focus:bg-primary-dark text-white ${disabledClass}`;
			case "secondary":
				return `bg-indigo-700 hover:bg-indigo-900 focus:bg-indigo-900 text-white ${disabledClass}`;

			case "teal":
				return `bg-teal-700 hover:bg-teal-900 focus:bg-teal-900 text-white ${disabledClass}`;

			case "indigo":
				return `bg-indigo-800  hover:bg-indigo-900 focus:bg-indigo-900 text-white ${disabledClass}`;

			case "primary-dark":
				return `bg-primary-darker hover:bg-blue-700 focus:bg-blue-700 text-white ${disabledClass}`;

			case "disabled":
				return `bg-slate-500 hover:bg-slate-700 focus:bg-slate-500 !text-black pointer-events-none ${disabledClass}`;

			case "foreground":
				return `bg-slate-100 hover:bg-slate-300 focus:bg-slate-300 text-slate-500 ${disabledClass}`;
			case "foreground-dark":
				return `bg-slate-200 hover:bg-slate-400 focus:bg-slate-400 text-slate-600 ${disabledClass}`;
			case "success":
				return `bg-green-600 hover:bg-green-700 focus:bg-green-700 text-white ${disabledClass}`;

			case "danger":
				return `bg-red-600 hover:bg-red-700 focus:bg-red-700 text-white ${disabledClass}`;

			default:
				return `bg-primary hover:bg-primary-darker focus:bg-primary-dark text-white ${disabledClass}`;
		}
	};
	const btnClassName = () => {
		return `duration-200 flex items-center justify-center rounded-lg cursor-pointer ${renderSize()} ${renderType()}`;
	};
	return behavior == "link" ? (
		<LinkBtn
			className={`duration-200 shadow-sm ${btnClassName()} ${className} ${
				loading ? "pointer-events-none opacity-50" : ""
			}`}
			{...rest}
		>
			{loading ? "Loading..." : children}
		</LinkBtn>
	) : (
		<DefaultBtn
			className={`gap-1 duration-200  !cursor-pointer shadow-sm ${btnClassName()} ${className} ${
				loading ? "pointer-events-none opacity-50" : ""
			}`}
			{...rest}
		>
			{loading ? "Loading..." : children}
		</DefaultBtn>
	);
};

export default ActionBtn;

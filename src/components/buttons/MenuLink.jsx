import { Link } from "react-router-dom";
import FlatIcon from "../FlatIcon";
import { useAuth } from "../../hooks/useAuth";

const MenuLink = ({
	active = false,
	to = "",
	icon,
	text,
	counter = 0,
	...rest
}) => {
	const { user } = useAuth();
	let base_url = `/${String(user?.type).toLowerCase()}`;
	return (
		<Link to={`${base_url}${to}`} {...rest}>
			<div
				className={`bg-black bg-opacity-0 hover:bg-opacity-10 cursor-pointer py-4 px-4 flex items-center text-slate-50 gap-3 duration-200 hover:bg-black ${
					active ? " !bg-opacity-10 ho" : ""
				}`}
			>
				<span className="flex items-center">
					<FlatIcon icon={icon} />
				</span>
				<span className="text-sm font-">{text}</span>
				{counter == 0 ? (
					""
				) : (
					<div className="relative">
						<span className="bg-red-600 animate-ping absolute text-white w-full h-full rounded-full z-10"></span>
						<span className="bg-red-600 text-white z-20 px-2 rounded-full">
							{counter}
						</span>
					</div>
				)}
			</div>
		</Link>
	);
};

export default MenuLink;

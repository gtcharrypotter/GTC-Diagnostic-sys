import { Link } from "react-router-dom";
import FlatIcon from "../FlatIcon";
import HomeMenuBtn from "../buttons/HomeMenuBtn";

const PageHeader = ({ children, title, icon, subtitle }) => {
	return (
		<div className="px-5 py-4 bg-slate-100">
			<div className=" ">
				<div className="flex items-center gap-2		">
					{icon ? (
						<span className="p-1 border-[0.1px] bg-blue-50 flex items-center justify-center px-3 rounded-md ">
							<FlatIcon
								icon={icon}
								className="mt-1 text-blue-500 text-xl"
							/>
						</span>
					) : (
						""
					)}
					<div className="flex flex-col">
						<h1 className="text-xl font-bold text-primary-dark mb-1">
							{title}
						</h1>
						{subtitle ? (
							<span className="text-sm  font-font-montserrat font-light text-slate-600 -mt-1">
								{subtitle}
							</span>
						) : (
							""
						)}
					</div>
					{children}
				</div>
			</div>
		</div>
	);
};

export default PageHeader;

/* eslint-disable react/prop-types */
import FlatIcon from "../FlatIcon";

const PageTitle = ({ icon, title, subtitle }) => {
	return (
		<div className="flex items-center gap-2">
			{icon ? (
				<span className=" flex">
					<FlatIcon
						icon={icon}
						className="text-primary-dark text-3xl -mb-1"
					/>
				</span>
			) : (
				""
			)}
			<div>
				<h1 className="text-xl font-bold font-opensans text-primary-dark tracking-wider -mb-1">
					{title}
				</h1>
				{subtitle ? (
					<span className="noto-sans-thin text-slate-500 text-sm font-light">
						{subtitle}
					</span>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default PageTitle;

import { Link } from "react-router-dom";

const HomeMenuBtn = (props) => {
	const { children, to, ...rest } = props;
	return (
		<Link to={to} {...rest}>
			<div className="w-[176px] h-[44px] items-center justify-center bg-blue-500 flex gap-2 p-2 rounded-lg hover:bg-blue-600 duration-200 cursor-pointer hover:shadow-lg">
				{children}
			</div>
		</Link>
	);
};
export default HomeMenuBtn;

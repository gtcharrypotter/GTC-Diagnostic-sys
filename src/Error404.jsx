import { useNavigate } from "react-router-dom";
import FlatIcon from "./components/FlatIcon";
import ActionBtn from "./components/buttons/ActionBtn";

const Error404 = () => {
	const navigate = useNavigate();
	const refresh = () => {
		window?.location?.reload();
	};
	return (
		<div className="h-[100dvh] w-full bg-slate-200 flex flex-col items-center justify-center">
			<h1 className="text-[50px] font-bold">404</h1>
			<h6 className="text-3xl font-medium text-center">Page not found</h6>

			<ActionBtn
				type="primary-dark"
				onClick={() => {
					setTimeout(() => {
						refresh();
					}, 200);
					navigate("/");
				}}
				className="!px-5 !rounded-[50px] mt-10"
			>
				<FlatIcon icon="sr-left" className="text-[40px] mr-2" />{" "}
				<div className="flex flex-col items-start">
					<span className="font-bold text-lg -mb-1">HOME PAGE</span>
					<span className="font-light text-xs">
						Go back to homepage
					</span>
				</div>
			</ActionBtn>
		</div>
	);
};

export default Error404;

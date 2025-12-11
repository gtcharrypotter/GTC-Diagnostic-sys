import { Outlet, useNavigate } from "react-router-dom";
import useNoBugUseEffect from "./hooks/useNoBugUseEffect";

const AppRoutes = () => {
	let navigate = useNavigate();
	useNoBugUseEffect({
		functions: () => {
			let user =
				typeof window === "object"
					? JSON.parse(window?.localStorage?.getItem("user"))
					: null;
			console.log("window?.localStorage?.getItem('user')", user);
			if (user === null) {
				navigate("/login");
			} else if (user?.type) {
				navigate(String(user?.type).toLowerCase());
			}
		},
		params: [window?.localStorage?.getItem("user")],
	});
	return (
		<>
			<Outlet />
		</>
	);
};

export default AppRoutes;

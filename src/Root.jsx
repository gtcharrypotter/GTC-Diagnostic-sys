import { useEffect } from "react";
import useNoBugUseEffect from "./hooks/useNoBugUseEffect";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Root = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();
	console.log("locationlocationlocation", location);
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
				if (location?.pathname == "/") {
					navigate(String(user?.type).toLowerCase());
				}
			}
		},
		params: [window?.localStorage?.getItem("user")],
	});
	return <Outlet />;
};

export default Root;

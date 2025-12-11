import { useLocation, useNavigate } from "react-router-dom";
import useNoBugUseEffect from "./useNoBugUseEffect";

const useReValidateAuth = () => {
	const navigate = useNavigate();
	const location = useLocation();
	useNoBugUseEffect({
		functions: () => {
			let user =
				typeof window === "object"
					? JSON.parse(window?.localStorage?.getItem("user"))
					: null;
			console.log("useReValidateAuth USER", location);
			if (user === null) {
				navigate("/login");
			} else if (user?.type) {
				if (
					!location?.pathname?.includes(
						String(user?.type).toLowerCase()
					)
				)
					navigate(`/${String(user?.type).toLowerCase()}`);
			}
		},
		params: [window?.localStorage?.getItem("user")],
	});
};

export default useReValidateAuth;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setStorage, getStorage } from "../libs/storage";
import Axios from "../libs/axios";
import Pusher from "pusher-js";
import useSWR from "swr";

import Echo from "laravel-echo";

window.Pusher = Pusher;

Axios.defaults.headers.common["Authorization"] = `Bearer ${getStorage(
	"token"
)}`;

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
	let navigate = useNavigate();
	let params = useParams();
	const [doctors, setDoctors] = useState([]);

	const {
		data: user,
		error,
		mutate,
	} = useSWR(
		"/v1/profile/me",
		() =>
			Axios.get("/v1/profile/me")
				.then((res) => {
					return res.data?.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					// mutate("/v1/profile/me");
				}),
		{
			revalidateIfStale: false,
			revalidateOnFocus: true,
		}
	);
	const specialtyType = () => {
		return String(user?.specialty_id).toLowerCase();
	};
	const checkSpecialtyType = (name) => {
		return String(user?.specialty?.name || "").toLowerCase() === 
			String(name || "").toLowerCase();
	};
	const userType = () => {
		return String(user?.type).toLowerCase();
	};
	const checkUserType = (type) => {
		if(userType() == 'his-emergency' && String(type).toLowerCase() == 'nurse'){
			return true;
		}
		return String(userType()).includes(String(type).toLowerCase());
	};
	const csrf = () => Axios.get("/sanctum/csrf-cookie");

	const register = async ({ setErrors, ...props }) => {
		await csrf();
		setErrors([]);
		Axios.post("/register", props)
			.then(() => mutate())
			.catch((error) => {
				if (error?.response?.status !== 422) throw error;
				setErrors(Object.values(error?.response?.data.errors).flat());
			});
	};

	const login = async ({ data, setErrors, setStatus }) => {
		console.log("login", data);
		// return "";
		await Axios.post("/login", data)
			.then(async (result) => {
				if (result?.data?.msg == "account-invalid") {
					setErrors({});
					throw new Error("account-invalid");
				} else {
					if (result.data[0].token) {
						await setStorage("token", result.data[0].token);
						Axios.defaults.headers.common[
							"Authorization"
						] = `Bearer ${result.data[0].token}`;
						await setStorage("user", result.data[0].user);
						await setStorage("type", result.data[0].type);
						await setStorage("token", result.data[0].token);
						setStatus("success");
						setTimeout(() => {
							setTimeout(() => {
								toast.success("Login success");
							}, 100);
							// navigate("/");
						}, 1500);
					}
				}
				// mutate();
			})
			.catch((error) => {
				// toast.error("Login failed! Please check your credentials.");
				if (error?.response?.status !== 422) throw error;
				setErrors(Object.values(error?.response?.data.errors).flat());
			});
	};

	const forgotPassword = async ({ setErrors, setStatus, email }) => {
		await csrf();
		setErrors([]);
		setStatus(null);
		Axios.post("/forgot-password", { email })
			.then((response) => setStatus(response.data.status))
			.catch((error) => {
				if (error?.response?.status !== 422) throw error;
				setErrors(Object.values(error?.response?.data.errors).flat());
			});
	};

	const resetPassword = async ({ setErrors, setStatus, ...props }) => {
		await csrf();
		setErrors([]);
		setStatus(null);
		Axios.post("/reset-password", { token: params.token, ...props })
			.then((response) =>
				navigate(`/login?reset=${btoa(response.data.status)}`)
			)
			.catch((error) => {
				if (error?.response?.status !== 422) throw error;
				setErrors(Object.values(error?.response?.data.errors).flat());
			});
	};

	const resendEmailVerification = ({ setStatus }) => {
		Axios.post("/email/verification-notification").then((response) =>
			setStatus(response.data.status)
		);
	};

	const logout = async () => {
		// await Axios.post("/logout");
		mutate();
		if (typeof window == "object") {
			window.Echo.leave(`doctor-indicator`);
			window.localStorage.clear();
			window.location.pathname = "/login";
		}
		return true;
	};
	useEffect(() => {
		let t = setTimeout(() => {}, 200);
		return () => {
			clearTimeout(t);
		};
	}, []);
	useEffect(() => {
		console.log("useruseruseruser", user, error, middleware);
		if (middleware === "guest" && redirectIfAuthenticated && user)
			navigate(redirectIfAuthenticated);

		let time1 = setTimeout(() => {
			if (middleware === "auth" && error) logout();
		}, 500);

		return () => {
			clearTimeout(time1);
		};
	}, [user, error]);

	useEffect(() => {
		if (user && window.Echo === undefined) {
			console.log("echo start");

			window.Echo = new Echo({
				broadcaster: "reverb",
				key: import.meta.env.VITE_REVERB_APP_KEY,
				wsHost: import.meta.env.VITE_REVERB_HOST,
				wsPort: import.meta.env.VITE_REVERB_PORT,
				wssPort: import.meta.env.VITE_REVERB_PORT,
				forceTLS:
					(import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
				enabledTransports: ["ws", "wss"],

				authorizer: (channel, options) => {
					return {
						authorize: (socketId, callback) => {
							Axios.post(
								import.meta.env.VITE_BACKEND_URL +
									"broadcasting/auth",
								{
									socket_id: socketId,
									channel_name: channel.name,
								}
							)
								.then((response) => {
									callback(false, response.data);
								})
								.catch((error) => {
									callback(true, error);
								});
						},
					};
				},
			});

			window.Echo.join(`doctor-indicator`)
				.here((users) => {
					// ...

					console.log("here", users);
					let docs = users.filter((x) => x.type == "GDIS-DOCTOR");
					//insert into localstorage

					setStorage("doctors", docs);
				})
				.joining((user) => {
					console.log("doctor join user.type", user.type);
					//add to doctor when user type is RHU-DOCTOR and remove if id already exist in the list and add again
					if (user.type == "GDIS-DOCTOR") {
						//insert into localstorage

						const doctors = getStorage("doctors");
						if (doctors) {
							let doc = doctors.filter((x) => x.id == user.id);
							if (doc.length == 0) {
								setStorage("doctors", [...doctors, user]);
							}
						} else {
							setStorage("doctors", [user]);
						}
					}
				})
				.leaving((user) => {
					console.log("doctor leaving ", user.name);
					//remove doctor when user type is RHU-DOCTOR
					if (user.type == "GDIS-DOCTOR") {
						const doctors = getStorage("doctors");
						if (doctors) {
							let doc = doctors.filter((x) => x.id != user.id);
							setStorage("doctors", doc);
						}
					}
				})
				.error((error) => {
					console.error(error);
				});
		}
	}, [user?.id]);

	useEffect(() => {
		const reconnectToEcho = () => {
			// Check if echo is already connected and exit if it is.
			if (window.Echo && window.Echo.connector.socket.connected) {
				return;
			}
			window.Echo.connector.socket.connect();
		};

		const handleOnline = () => {
			console.log(
				"Internet connection is available. Reconnecting to  Echo server..."
			);
			reconnectToEcho();
		};

		const handleOffline = () => {
			console.log("Internet connection is lost.");
			// You can handle this event as per your requirement, such as showing a message to the user.
		};

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

		
	return {
		user,
		register,
		login,
		forgotPassword,
		resetPassword,
		resendEmailVerification,
		logout,
		mutate,
		userType,
		checkUserType,
		checkSpecialtyType,
		doctors,
	};
};

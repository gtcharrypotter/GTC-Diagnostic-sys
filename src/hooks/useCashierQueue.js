import useSWR from "swr";
import Axios from "../libs/axios";

const useCashierQueue = () => {
	const {
		data: pending,
		// error,
		mutate: mutatePending,
	} = useSWR(
		"/v1/opd-standalone/pending-cashier",
		() =>
			Axios.get("/v1/opd-standalone/pending-cashier")
				.then((res) => {
					console.log("res.data opd-standalone/pending-cashier", res.data);
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					// mutate("/v1/profile/rhu-patient-queue");
				}),
		{
			revalidateIfStale: true,
			revalidateOnFocus: true,
		}
	);
	const {
		data: discharge,
		// error,
		mutate: mutateDischarge,
	} = useSWR(
		"/v1/opd-standalone/discharge-patient",
		() =>
			Axios.get("/v1/opd-standalone/discharge-patient")
				.then((res) => {
					console.log("res.data opd-standalone/discharge-patient", res.data);
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					// mutate("/v1/profile/rhu-patient-queue");
				}),
		{
			revalidateIfStale: true,
			revalidateOnFocus: true,
		}
	);

	return {
		pending,
		mutatePending,
		discharge,
		mutateDischarge,
	};
};

export default useCashierQueue;

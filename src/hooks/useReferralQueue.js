import useSWR from "swr";
import Axios from "../libs/axios";

const useReferralQueue = () => {
	const {
		data: pending,
		// error,
		mutate: mutatePending,
	} = useSWR(
		"/v1/hospital/doctor-pending-for-confirmation",
		() =>
			Axios.get("/v1/hospital/doctor-pending-for-confirmation")
				.then((res) => {
					console.log("res.data clinic/rhu-patient-queue", res.data);
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					// mutate("/v1/hospital/doctor-pending-for-consultation");
				}),
		{
			revalidateIfStale: false,
			revalidateOnFocus: true,
			refreshInterval: 5000,
		}
	);

	const {
		data: pendingPrescription,
		// error,
		mutate: mutatePendingPrescription,
	} = useSWR(
		"/v1/hospital/pending-for-doctor-prescription",
		() =>
			Axios.get("/v1/hospital/pending-for-doctor-prescription")
				.then((res) => {
					console.log(
						"res.data hospital/pending-for-doctor-prescription",
						res.data
					);
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					// mutate("/v1/hospital/doctor-pending-for-consultation");
				}),
		{
			revalidateIfStale: false,
			revalidateOnFocus: true,
			refreshInterval: 5000,
		}
	);

	return {
		pending,
		mutatePending,
		pendingPrescription,
		mutatePendingPrescription,
	};
};

export default useReferralQueue;

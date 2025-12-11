import useSWR from "swr";
import Axios from "../libs/axios";

const useDoctorQueue = () => {
	const {
		data: pending,
		// error,
		mutate: mutatePending,
	} = useSWR(
		"/v1/opd-standalone/doctor-pending-for-consultation",
		() =>
			Axios.get("/v1/opd-standalone/doctor-pending-for-consultation")
				.then((res) => {
					console.log("res.data opd-standalone/doctor-pending-for-consultation", res.data);
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					// mutate("/v1/hospital/doctor-pending-for-consultation");
				}),
		{
			revalidateIfStale: true,
			revalidateOnFocus: true,
		}
	);
	
	const {
		data: pendingForResultReading,
		// error,
		mutate: mutatePendingForResultReading,
	} = useSWR(
		"/v1/opd-standalone/doctor-for-result-reading",
		() =>
			Axios.get("/v1/opd-standalone/doctor-for-result-reading")
				.then((res) => {
					// console.log("res.data clinic/rhu-patient-queue", res.data);
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					// mutate("/v1/hospital/doctor-pending-for-consultation");
				}),
		{
			revalidateIfStale: true,
			revalidateOnFocus: true,
		}
	);
	const {
		data: pendingForFinalResult,
		// error,
		mutate: mutatePendingForFinalResult,
	} = useSWR(
		"/v1/opd-standalone/doctor-for-final-result",
		() =>
			Axios.get("/v1/opd-standalone/doctor-for-final-result")
				.then((res) => {
					// console.log("res.data clinic/rhu-patient-queue", res.data);
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					// mutate("/v1/hospital/doctor-pending-for-consultation");
				}),
		{
			revalidateIfStale: true,
			revalidateOnFocus: true,
		}
	);

	const {
		data: nowServing,
		// error,
		mutate: mutateNowServing,
	} = useSWR(
		"/v1/opd-standalone/doctor-in-service-consultation",
		() =>
			Axios.get("/v1/opd-standalone/doctor-in-service-consultation")
				.then((res) => {
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					// mutate("/v1/hospital/doctor-pending-for-consultation");
				}),
		{
			revalidateIfStale: true,
			revalidateOnFocus: true,
		}
	);
	
	return {
		pending,
		pendingForResultReading,
		nowServing,
		mutatePending,
		mutatePendingForResultReading,
		mutateNowServing,
		pendingForFinalResult,
		mutatePendingForFinalResult
	};
};

export default useDoctorQueue;

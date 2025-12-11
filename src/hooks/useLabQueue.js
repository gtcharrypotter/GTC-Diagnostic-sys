import useSWR from "swr";
import Axios from "../libs/axios";

const useLabQueue = () => {
	const {
		data: pending,
		// error,
		mutate: mutatePending,
	} = useSWR(
		"/v1/laboratory/get-queue?status=pending",
		() =>
			Axios.get("/v1/laboratory/get-queue")
				.then((res) => {
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					// mutate("/v1/laboratory/get-queue");
				}),
		{
			revalidateIfStale: false,
			revalidateOnFocus: true,
		}
	);

	const {
		data: nowServing,
		// error,
		mutate: mutateNowServing,
	} = useSWR(
		"/v1/laboratory/get-queue",
		() =>
			Axios.get("/v1/laboratory/get-queue")
				.then((res) => {
					console.log("res.data clinic/rhu-patient-queue", res.data);
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					// mutate("/v1/laboratory/get-queue");
				}),
		{
			revalidateIfStale: false,
			revalidateOnFocus: true,
		}
	);
	const {
		data: readingResult,
		// error,
		mutate: mutateReadingResult,
	} = useSWR(
		"/v1/laboratory/get-result-queue",
		() =>
			Axios.get("/v1/laboratory/get-result-queue")
				.then((res) => {
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					// mutate("/v1/laboratory/get-queue");
				}),
		{
			revalidateIfStale: false,
			revalidateOnFocus: true,
		}
	);

	const {
		data: pendingForPrintResult,
		// error,
		mutate: mutatePendingForPrintResult,
	} = useSWR(
		"/v1/opd-standalone/print-lab-result?status=for-result-reading",
		() =>
			Axios.get("/v1/opd-standalone/print-lab-result")
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

	return {
		pending,
		mutatePending,
		nowServing,
		mutateNowServing,
		pendingForPrintResult,
		mutatePendingForPrintResult,
		readingResult,
		mutateReadingResult
	};
};

export default useLabQueue;

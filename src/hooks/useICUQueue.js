import React from 'react'
import useSWR from 'swr';
import Axios from '../libs/axios';

const useICUQueue = () => {
	const {
		data: pending,
		// error,
		mutate: mutatePending,
	} = useSWR(
		"/v1/hospital/icu-pending",
		() =>
			Axios.get("/v1/hospital/icu-pending")
				.then((res) => {
					console.log("res.data hospital/icu-pending", res.data);
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
		data: pendingQueue,
		error,
		mutate,
	} = useSWR(
		"/v1/hospital/or-patient-queue?status=Operating Room", // Add the status query parameter
		() =>
			Axios.get("/v1/hospital/or-patient-queue", {
				params: { status: 'Operating Room' } // Ensure the status is included in the request
			})
				.then((res) => {
					console.log("res.data hospital/or-patient-queue", res.data);
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;
				}),
		{
			revalidateIfStale: true,
			revalidateOnFocus: true,
		}
	);
	const {
		data: nowServing,
		// error,
		// mutate,
	} = useSWR(
		"/v1/hospital/or-patient-queue",
		() =>
			Axios.get("/v1/hospital/or-patient-queue")
				.then((res) => {
					// console.log("res.data hospital/sph-patient-queue", res.data);
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					// mutate("/v1/profile/sph-patient-queue");
				}),
		{
			revalidateIfStale: true,
			revalidateOnFocus: true,
		}
	);
  return {
		pendingQueue,
		nowServing,
		error,
		mutate,
		pending,
		mutatePending,
	};
}

export default useICUQueue

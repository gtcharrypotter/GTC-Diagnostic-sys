import React from 'react'
import Axios from '../libs/axios';
import useSWR from 'swr';

const useSurgeryQueue = () => {
	const {
		data: pending,
		// error,
		mutate: mutatePending,
	} = useSWR(
		"/v1/hospital/surgery-pending",
		() =>
			Axios.get("/v1/hospital/surgery-pending")
				.then((res) => {
					console.log("res.data hospital/surgery-pending", res.data);
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
		data: pendingForSurgery,
		// error,
		mutate: mutatePendingForSurgery,
	} = useSWR(
		"/v1/hospital/surgery-or-pending",
		() =>
			Axios.get("/v1/hospital/surgery-or-pending")
				.then((res) => {
					console.log("res.data hospital/surgery-or-pending", res.data);
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
					// console.log("res.data clinic/sph-patient-queue", res.data);
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
		pendingForSurgery,
		mutatePendingForSurgery,
	};
}

export default useSurgeryQueue

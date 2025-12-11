import React from 'react'
import useSWR from 'swr';
import Axios from '../libs/axios';

const useERInfectious = () => {
    const {
		data: pending,
		// error,
		// mutate,
	} = useSWR(
		"/v1/hospital/infectious-patient-queue",
		() =>
			Axios.get("/v1/hospital/infectious-patient-queue")
				.then((res) => {
					console.log("res.data hospital/infectious-patient-queue", res.data);
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					// mutate("/v1/profile/infectious-patient-queue");
				}),
		{
			revalidateIfStale: true,
			revalidateOnFocus: true,
		}
	);
	const {
		data: pendingForRelease,
		// error,
		mutate: mutatePendingForRelease,
	} = useSWR(
		"/v1/hospital/his-pending-for-medicine-release",
		() =>
			Axios.get("/v1/hospital/his-pending-for-medicine-release")
				.then((res) => {
					console.log(
						"res.data hospital/his-pending-for-medicine-release",
						res.data
					);
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					// mutate("/v1/profile/infectious-patient-queue");
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
		"/v1/hospital/infectious-patient-queue",
		() =>
			Axios.get("/v1/hospital/infectious-patient-queue")
				.then((res) => {
					console.log("res.data hospital/infectious-patient-queue", res.data);
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					// mutate("/v1/profile/infectious-patient-queue");
				}),
		{
			revalidateIfStale: true,
			revalidateOnFocus: true,
		}
	);

  return {
		pending,
		nowServing,
		pendingForRelease,
		mutatePendingForRelease,
	};
}

export default useERInfectious

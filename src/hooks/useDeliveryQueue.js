import React from 'react'
import useSWR from 'swr';
import Axios from '../libs/axios';

const useDeliveryQueue = () => {
	const {
		data: pending,
		// error,
		mutate: mutatePending,
	} = useSWR(
		"/v1/hospital/delivery-pending",
		() =>
			Axios.get("/v1/hospital/delivery-pending")
				.then((res) => {
					console.log("res.data hospital/delivery-pending", res.data);
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
		data: pendingForDelivery,
		// error,
		mutate: mutatePendingForDelivery,
	} = useSWR(
		"/v1/hospital/delivery-or-pending",
		() =>
			Axios.get("/v1/hospital/delivery-or-pending")
				.then((res) => {
					console.log("res.data hospital/delivery-or-pending", res.data);
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
		pendingForDelivery,
		mutatePendingForDelivery,
	};
}

export default useDeliveryQueue

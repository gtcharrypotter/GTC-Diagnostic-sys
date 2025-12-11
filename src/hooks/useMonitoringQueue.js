import React from 'react'
import useSWR from 'swr';
import Axios from '../libs/axios';

const useMonitoringQueue = () => {
    const {
		data: waitingORQueue,
		// error,
		mutateWaitingOR,
	} = useSWR(
		"/v1/hospital/or-pending", // Add the status query parameter
		() =>
			Axios.get("/v1/hospital/or-pending")
				.then((res) => {
					console.log("res.data hospital/or-pending", res.data);
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
		data: waitingAnesthesiaQueue,
		// error,
		mutateWaitingAnesthesia,
	} = useSWR(
		"/v1/hospital/anesthesia-pending", // Add the status query parameter
		() =>
			Axios.get("/v1/hospital/anesthesia-pending")
				.then((res) => {
					console.log("res.data hospital/anesthesia-pending", res.data);
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
		data: waitingDeliverySched,
		// error,
		mutateWaitingDeliverySched,
	} = useSWR(
		"/v1/hospital/delivery-pending", // Add the status query parameter
		() =>
			Axios.get("/v1/hospital/delivery-pending")
				.then((res) => {
					console.log("res.data hospital/delivery-pending", res.data);
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
		data: waitingSurgerySched,
		// error,
		mutateWaitingSurgerySched,
	} = useSWR(
		"/v1/hospital/surgery-pending", // Add the status query parameter
		() =>
			Axios.get("/v1/hospital/surgery-pending")
				.then((res) => {
					console.log("res.data hospital/surgery-pending", res.data);
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
		data: pendingDeliveryOperation,
		// error,
		mutate: mutateDeliveryOperation,
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
    const {
		data: pendingSurgeryOperation,
		// error,
		mutate: mutateSurgeryOperation,
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
		data: pendingPacu,
		// error,
		mutate: mutatePacuPending,
	} = useSWR(
		"/v1/hospital/pacu-pending",
		() =>
			Axios.get("/v1/hospital/pacu-pending")
				.then((res) => {
					console.log("res.data hospital/pacu-pending", res.data);
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
		data: pendingICU,
		// error,
		mutate: mutateICUpending,
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
		data: pendingRoomFromICU,
		// error,
		mutate: mutateRoomFromICU,
	} = useSWR(
		"/v1/hospital/patient-queue-resu",
		() =>
			Axios.get("/v1/hospital/patient-queue-resu")
				.then((res) => {
					console.log("res.data hospital/patient-queue-resu", res.data);
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
		data: pendingRoomFromPACU,
		// error,
		mutate: mutateRoomFromPACU,
	} = useSWR(
		"/v1/hospital/patient-queue-resu",
		() =>
			Axios.get("/v1/hospital/patient-queue-resu")
				.then((res) => {
					console.log("res.data hospital/patient-queue-resu", res.data);
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
		waitingORQueue,
		waitingAnesthesiaQueue,
		waitingDeliverySched,
		waitingSurgerySched,
		pendingDeliveryOperation,
		pendingSurgeryOperation,
		pendingPacu,
		pendingICU,
		pendingRoomFromICU,
        pendingRoomFromPACU,
        mutateWaitingOR,
		mutateWaitingAnesthesia,
		mutateWaitingDeliverySched,
		mutateWaitingSurgerySched,
		mutateDeliveryOperation,
		mutateSurgeryOperation,
		mutatePacuPending,
		mutateICUpending,
		mutateRoomFromICU,
        mutateRoomFromPACU
	};
}

export default useMonitoringQueue

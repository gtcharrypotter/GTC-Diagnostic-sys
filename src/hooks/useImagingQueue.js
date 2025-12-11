import React from 'react'
import Axios from '../libs/axios';
import useSWR from 'swr';

const useImagingQueue = () => {
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
		data: resultReading,
		// error,
		mutate: mutateResultReading,
	} = useSWR(
		"/v1/hospital/get-result-reading-queue",
		() =>
			Axios.get("/v1/hospital/get-result-reading-queue")
				.then((res) => {
					console.log("hospital/get-result-reading-queue", res.data);
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
        data: pendingPrintImgResult,
        mutate: mutatePendingPrintImgResult,
    } = useSWR(
        "/v1/opd-standalone/print-img-result?status=for-result-reading",
        () =>
            Axios.get("/v1/opd-standalone/print-img-result")
                .then((res) => res.data)
                .catch((error) => {
                    if (error.response.status !== 409) throw error;
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
		resultReading,
		mutateResultReading,
		pendingPrintImgResult,
        mutatePendingPrintImgResult,
	};
}

export default useImagingQueue

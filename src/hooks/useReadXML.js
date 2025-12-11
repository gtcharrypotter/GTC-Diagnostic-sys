import React from 'react'
import Axios from '../libs/axios';
import useSWR from 'swr';

const useReadXML = () => {
    const {
		data: pending,
		// error,
		// mutate,
	} = useSWR(
		"/v1/",
		() =>
			Axios.get("/v1/opd-standalone/philhealth/read-xml")
				.then((res) => {
					console.log("res.data opd-standalone/philhealth/read-xml", res.data);
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
	};
}

export default useReadXML

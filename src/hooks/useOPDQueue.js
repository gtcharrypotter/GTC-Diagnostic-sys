
import useSWR from 'swr';
import Axios from '../libs/axios';

const useOPDQueue = () => {
    const {
		data: pending,
	} = useSWR(
		"/v1/opd-standalone/opd-patient-queue",
		() =>
			Axios.get("/v1/opd-standalone/opd-patient-queue")
				.then((res) => {
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
  return {
		pending,
	};
}

export default useOPDQueue

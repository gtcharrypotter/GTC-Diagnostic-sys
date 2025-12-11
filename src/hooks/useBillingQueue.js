
import useSWR from 'swr';
import Axios from '../libs/axios';

const useBillingQueue = () => {
    const {
		data: pending,
		// error,
		mutate: mutatePending,
	} = useSWR(
		"/v1/hospital/pending-billing",
		() =>
			Axios.get("/v1/hospital/pending-billing")
				.then((res) => {
					console.log("res.data hospital/pending-billing", res.data);
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
	};
}

export default useBillingQueue

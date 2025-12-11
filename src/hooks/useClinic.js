import useSWR from "swr";
import Axios from "../libs/axios";

const useClinic = () => {
	const { data, error, mutate } = useSWR(
		"/v1/profile/rhu-profile-data",
		() =>
			Axios.get("/v1/profile/rhu-profile-data")
				.then((res) => {
					console.log("res.data", res.data);
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					mutate("/v1/profile/rhu-profile-data");
				}),
		{
			revalidateIfStale: false,
			revalidateOnFocus: true,
			refreshInterval: 5000,
		}
	);

	const getDoctors = () => {
		return Axios.get(`/v1/clinic/doctors`);
	};
	const getDoctorsByHealthUnit = (health_unit_id) => {
	return Axios.get(`/v1/clinic/doctors-by-health-unit?health_unit_id=${health_unit_id}`);
	};
	const getTimeSlots = ({ doctor_id, date }) => {
		//2023-10-20
		return Axios.get(
			`/v1/telemedicine/schedules?doctor_id=${doctor_id}&date=${date}`
		);
	};
	const bookSchedule = (formData) => {
		//2023-10-20
		return Axios.get(`/v1/telemedicine/booked`, formData);
	};

	const mutateProfile = () => {
		mutate("/v1/profile/rhu-profile-data");
	};
	return {
		data,
		getDoctors,
		getTimeSlots,
		bookSchedule,
		mutateProfile,
		getDoctorsByHealthUnit
	};
};

export default useClinic;

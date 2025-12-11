/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth';
import useNoBugUseEffect from '../../../hooks/useNoBugUseEffect';
import { useForm } from 'react-hook-form';
import Axios from '../../../libs/axios';
import PatientBillingDischarge from './PatientBillingDischarge';
import { v4 as uuidv4 } from "uuid";
import { toast } from 'react-toastify';
const uniq_id = uuidv4();
const CashierDischarge = (props) => {
    const { appointment, setAppointment, mutateAll } = props;
	const { user } = useAuth();
	const {
		register,
		getValues,
		watch,
		control,
		setValue,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [loading, setLoading] = useState(false);

	useNoBugUseEffect({
		functions: () => {
			if (user?.health_unit_id) {
				setValue("rhu_id", user?.health_unit_id);
			}
		},
		params: [user?.health_unit_id],
	});
	const dischargeRelease = (data) => {
		setLoading(true);
		let formdata = new FormData();
		formdata.append("_method", "PATCH");

		Axios.post(
			`v1/opd-standalone/patient-discharge/${appointment?.id}`,
			formdata
		)
			.then((response) => {
				let data = response.data;
				// console.log(data);
				if (mutateAll) {
					mutateAll();
				}
				setTimeout(() => {
					setAppointment(null);
				}, 100);
				setTimeout(() => {
					toast.success("Discharge Successfully!");
					setLoading(false);
				}, 200);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
		// Axios.patch(`v1/hospital/update-operation-time-in/${appointment?.id}`, {
        //         or_time_in: new Date(),
        //     })
	};
	const hasError = (name) => {
		return errors[name]?.message;
	};
	console.log('Appointment Details', appointment)
  return (
    <div className="flex flex-col items-start">
			<div className="flex flex-col w-full gap-4 pb-2">
				<div className="p-0 flex flex-col gap-y-2 relative w-full">
					
						<PatientBillingDischarge 
						loading={loading}
						onSaveCashierDischarge={dischargeRelease}
						appointment={appointment}
						patient={appointment?.patient}
                    />
					
					
				</div>
			</div>
		</div>
  )
}

export default CashierDischarge

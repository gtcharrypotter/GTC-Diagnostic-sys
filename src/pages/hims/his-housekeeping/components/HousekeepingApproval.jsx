/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from "uuid";
import Axios from '../../../../libs/axios';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import { useAuth } from '../../../../hooks/useAuth';
import { toast } from 'react-toastify';
import Housekeeping from './Housekeeping';

const uniq_id = uuidv4();
const HousekeepingApproval = (props) => {
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
	const housekeepingApproval = (data) => {
		setLoading(true);
		let formdata = new FormData();
		formdata.append("rhu_id", data?.rhu_id);
		formdata.append("_method", "PATCH");

		Axios.post(
			`v1/hospital/send-from-housekeeping-to-cashier/${appointment?.id}`,
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
					toast.success("Patient sent to cashier!");
					setLoading(false);
				}, 200);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
		Axios.patch(`v1/hospital/update-operation-time-out/${appointment?.id}`, {
				end_time_in: new Date(),
		})
	};

	const hasError = (name) => {
		return errors[name]?.message;
	};
  return (
   <div className="flex flex-col items-start">
			<div className="flex flex-col w-full gap-4 pb-2">
				<div className="p-0 flex flex-col gap-y-4 relative w-full">
					<h4 className="text-md text-indigo-800 border-b border-b-indigo-600 pb-1 font-bold mb-0">
						Send patient to cashier
					</h4> 
					<Housekeeping
						loading={loading}
						onSave={housekeepingApproval}
						appointment={appointment}
						patient={appointment?.patient}
					/> 
				</div>
				{/* 
				<ActionBtn
					className="px-4 !rounded-2xl w-full"
					type="success"
					size="lg"
					loading={loading}
					onClick={handleSubmit(cashierApproval)}
				>
					<FlatIcon icon="rr-check" className="mr-2 text-xl" />
					Send patient to nurse
				</ActionBtn> */}
			</div>
		</div>
  )
}

export default HousekeepingApproval


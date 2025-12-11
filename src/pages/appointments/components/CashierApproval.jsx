/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { Controller, set, useForm } from "react-hook-form";
import useNoBugUseEffect from "../../../hooks/useNoBugUseEffect";
import ActionBtn from "../../../components/buttons/ActionBtn";
import FlatIcon from "../../../components/FlatIcon";
import { useAuth } from "../../../hooks/useAuth";
import Axios from "../../../libs/axios";
import BillingStatement from "../../../components/cashier-billing/component/BillingStatement";
import Billing from "../../hims/his-billing/component/Billing";
import CashierReciept from "./CashierReciept";
import PatientBillingDischarge from "./PatientBillingDischarge";

const uniq_id = uuidv4();
const CashierApproval = (props) => {
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
	const cashierRelease = (data) => {
		setLoading(true);
		let formdata = new FormData();
		formdata.append("rhu_id", data?.rhu_id);
		formdata.append("_method", "PATCH");
		formdata.append("end_time_out", new Date().toISOString());
		Axios.post(
			`v1/opd-standalone/pending-for-discharge/${appointment?.id}`,
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
					toast.success("Patient ready for discharge!");
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
	return (
		<div className="flex flex-col items-start">
			<div className="flex flex-col w-full gap-4 pb-2">
				<div className="p-0 flex flex-col gap-y-2 relative w-full">
						<CashierReciept 
						loading={loading}
						onSaveCashier={cashierRelease}
						appointment={appointment}
						patient={appointment?.patient}
                    />
				</div>
			</div>
		</div>
	);
};

export default CashierApproval;

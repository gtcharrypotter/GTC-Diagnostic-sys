/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../../../hooks/useAuth";
import { useState } from "react";
import useNoBugUseEffect from "../../../../hooks/useNoBugUseEffect";
import Axios from "../../../../libs/axios";
import { toast } from "react-toastify";
import BillingStatement from "../../../../components/cashier-billing/component/BillingStatement";
import Billing from "./Billing";
import { useForm } from "react-hook-form";

const uniq_id = uuidv4();
const BillingApproval = (props) => {
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
	const billingApproval = (data) => {
		setLoading(true);
		let formdata = new FormData();
		formdata.append("rhu_id", data?.rhu_id);
		formdata.append("_method", "PATCH");

		Axios.post(
			`v1/hospital/send-from-billing-to-housekeeping/${appointment?.id}`,
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
					toast.success("Patient sent to Housekeeping!");
					setLoading(false);
				}, 200);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	const hasError = (name) => {
		return errors[name]?.message;
	};
  return (
   <div className="flex flex-col items-start">
			<div className="flex flex-col w-full gap-4 pb-2">
				<div className="p-0 flex flex-col gap-y-4 relative w-full">
                    <Billing 
                    loading={loading}
						onSaveBilling={billingApproval}
						appointment={appointment}
						patient={appointment?.patient}
                    />
				</div>
			</div>
		</div>
  )
}

export default BillingApproval

import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { useAuth } from '../../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import Axios from '../../../../libs/axios';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import { toast } from 'react-toastify';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import FlatIcon from '../../../../components/FlatIcon';
import PatientCSROrder from '../../../department/his-nurse/components/PatientCSROrder';
import CollapseDiv from '../../../../components/CollapseDiv';
import PatientPharmacyOrder from '../../../department/his-nurse/components/PatientPharmacyOrder';
const uniq_id = uuidv4();
const InfoText = ({
	className = "",
	valueClassName = "",
	label,
	icon,
	value,
}) => {
	return (
		<div className={`flex flex-col ${className}`}>
			{label ? (
				<span className="text-slate-800 text-xs capitalize mb-1">
					{label}
				</span>
			) : (
				""
			)}
			<div className="flex items-center mb-0 gap-2">
				<span className="flex items-center justify-center">
					<FlatIcon
						icon={icon || "bs-arrow-turn-down-right"}
						className="text-[10px] text-slate-600 ml-1"
					/>
				</span>
				<span
					className={`capitalize gap-1 text-slate-900 flex text-base flex-wrap ${valueClassName} `}
				>
					{value} &nbsp;
				</span>
			</div>
		</div>
	);
};
const formatDateTime = (dateTime) => {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    return date.toLocaleString();
};

const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return '';

    const start = new Date(startTime);
    const end = new Date(endTime);

    const durationInMilliseconds = end - start;
    const durationInSeconds = Math.floor(durationInMilliseconds / 1000);
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    return `${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
};
const PatientORSchedule = (props) => {
    const { patient, appointment, setAppointment, mutateAll, onSuccess } = props;
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
    const [key, setKey] = useState(uniq_id);
    useNoBugUseEffect({
		functions: () => {
			setTimeout(() => {
				if (appointment?.social_history) {
					Object.keys(appointment?.social_history).map((key) => {
						console.log(
							"appointment?.social_history[key]",
							key,
							appointment?.social_history[key]
						);
						setValue(key, appointment?.social_history[key]);
					});
				}
			}, 1500);
		},
		params: [appointment?.id, key],
	});
	
	const sendToAnesthesia = () => {
		setLoading(true);
		let formdata = new FormData();
		formdata.append("rhu_id", appointment?.rhu_id);
		formdata.append("_method", "PATCH");

		Axios.post(`v1/hospital/send-from-or-to-anesthesia/${appointment?.id}`, formdata)
			.then((response) => {
				let data = response.data;
				// console.log(data);
				setTimeout(() => {
					setAppointment(null);
				}, 100);
				setTimeout(() => {
					toast.success("Patient referral success!");
					setLoading(false);

				}, 200);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
		// Axios.patch(`v1/hospital/update-operation-time-out/${appointment?.id}`, {
		// 									doctor_time_out: new Date(),
		// 								})

	}
	
	const refreshData = () => {
		Axios.get(`v1/hospital/get-appointment/${appointment?.id}`).then(
			(res) => {
				setAppointment(res.data.data);
				setKey(uuidv4());
			}
		);
	};
  return (
    <div className="flex flex-col items-start">
			{appointment?.status == "pending-for-operation-release" ? (
				<>
					<div className="flex items-center w-full justify-center px-4 pb-4 gap-4">

					</div>

				</>
			) : (
				<div className="flex flex-col w-full gap-4 pb-2">
					<div className="p-0 flex flex-col gap-y-4 relative w-full">
						<h4 className="text-md text-indigo-800 border-b border-b-indigo-600 pb-1 font-bold mb-0">
							Patient Appointment Operation
						</h4>
						{/* <InfoText
								className="lg:col-span-4"
								label="Latest Time In:"
								value={formatDateTime(appointment?.aneshtesia_time_in)}
							/>
							<InfoText
								className="lg:col-span-4"
								label="Previous Time out:"
								value={formatDateTime(appointment?.or_time_out)}
							/>
							<InfoText
								className="lg:col-span-4"
								label="Duration:"
								value={calculateDuration(appointment?.aneshtesia_time_in, appointment?.or_time_out)}
							/> */}
                       <div className="flex flex-col gap-y-4">

						<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-4">
							<InfoText
								className="lg:col-span-4"
								label="Time In:"
								value={formatDateTime(appointment?.start_time_in)}
							/>
							{/* <InfoText
								className="lg:col-span-4"
								label="Latest Time In:"
								value={formatDateTime(appointment?.or_time_in)}
							/>
							<InfoText
								className="lg:col-span-4"
								label="Previous Time out:"
								value={formatDateTime(appointment?.doctor_time_out)}
							/>
							<InfoText
								className="lg:col-span-4"
								label="Duration:"
								value={calculateDuration(appointment?.operation_time_in, appointment?.operation_time_out)}
							/> */}


							</div>

								<CollapseDiv
								// defaultOpen={
								// 	appointment?.status ==
								// 		"pending-or-refer"
								// 	}
								defaultOpen={true}
								withCaret={true}
								title="Pharmacy"
								headerClassName="bg-blue-50"
								bodyClassName="p-0"
								>

								{/* <AddPharmacy
								items={items}
								setItems={setItems}
								selectedItemsPharmacy={selectedItemsPharmacy}
								setSelectedItemsPharmacy={setSelectedItemsPharmacy}
								// prescribeItemsPharmacy={prescribeItemsPharmacy}
								loading={loading}
								/> */}
                                <PatientPharmacyOrder patient={patient} appointment={appointment}/>
								</CollapseDiv>

								<CollapseDiv
								// defaultOpen={
								// 	appointment?.status ==
								// 		"pending-or-refer"
								// 	}
								defaultOpen={true}
								withCaret={true}
								title="CSR"
								headerClassName="bg-blue-50"
								bodyClassName="p-0"
								>
								{/* <AddCsr
								items={items}
								setItems={setItems}
								selectedItemsCsr={selectedItemsCsr}
								setSelectedItemsCsr={setSelectedItemsCsr}
								// prescribeItemsCSR={prescribeItemsCSR}
								loading={loading}
								/> */}
                                <PatientCSROrder patient={patient} appointment={appointment}/>
								</CollapseDiv>


								</div>
						
                         
								



						<ActionBtn
                                className="px-4 !rounded-2xl w-full"
                                type="success"
                                size="lg"
                                loading={loading}
                                onClick={handleSubmit(sendToAnesthesia)}
                            >
                                <FlatIcon
                                    icon="rr-check"
                                    className="mr-2 text-xl"
                                />
                                Proceed to Anesthesia
                            </ActionBtn>
					</div>
				</div>
			)}

		</div>
  )
}

export default PatientORSchedule

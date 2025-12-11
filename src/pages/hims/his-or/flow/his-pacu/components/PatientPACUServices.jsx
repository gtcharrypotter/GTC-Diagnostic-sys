import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Axios from '../../../../../../libs/axios';
import { toast } from 'react-toastify';
import ActionBtn from '../../../../../../components/buttons/ActionBtn';
import FlatIcon from '../../../../../../components/FlatIcon';
import PatientCSROrder from '../../../../../department/his-nurse/components/PatientCSROrder';
import CollapseDiv from '../../../../../../components/CollapseDiv';
import PatientPharmacyOrder from '../../../../../department/his-nurse/components/PatientPharmacyOrder';
import { formatDateMMDDYYYY } from '../../../../../../libs/helpers';
/* eslint-disable react/prop-types */
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
const PatientPACUServices = (props) => {
    const { patient, appointment, setAppointment, mutateAll, onSuccess } = props;
    const [selectedItemsPharmacy, setSelectedItemsPharmacy] = useState([]);
	const [selectedItemsCsr, setSelectedItemsCsr] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
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

	
    const sendToNurse = () => {
		setLoading(true);
		let formdata = new FormData();
		formdata.append("rhu_id", appointment?.rhu_id);
		formdata.append("_method", "PATCH");

		Axios.post(`v1/hospital/send-from-pacu-to-nurse-station/${appointment?.id}`, formdata)
			.then((response) => {
				let data = response.data;
				// console.log(data);
				setTimeout(() => {
					setAppointment(null);
				}, 100);
				setTimeout(() => {
					toast.success("Patient Return to Room!");
					setLoading(false);

				}, 200);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});

	}

  return (
    <div className="flex flex-col items-start">
			{appointment?.status == "pending-for-surgery-pacu" || appointment?.status == "pending-for-delivery-pacu" ? (
				<>
					<div className="flex items-center w-full justify-center px-4 pb-4 gap-4">
					<div className="p-0 flex flex-col gap-y-4 relative w-full">
						<h4 className="text-md text-indigo-800 border-b border-b-indigo-600 pb-1 font-bold mb-0">
							Surgery Operation
						</h4>
						<div className="flex flex-col gap-4">
							<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-4">
							<InfoText
								className="lg:col-span-4"
								label="Time In:"
								value={formatDateTime(appointment?.start_time_in)}
							/>
							{/* <InfoText
								className="lg:col-span-4"
								label="Previous Time out:"
								value={formatDateTime(appointment?.operation_time_out)}
							/>
							<InfoText
								className="lg:col-span-4"
								label="Duration:"
								value={calculateDuration(appointment?.operation_time_in, appointment?.operation_time_out)}
							/> */}
							
							
							</div>
							<CollapseDiv
							defaultOpen={false}
							withCaret={true}
							title="Pharmacy"
							headerClassName="bg-blue-50"
							bodyClassName="p-0"
							>
                            <PatientPharmacyOrder patient={patient} appointment={appointment} />
							</CollapseDiv>
							<CollapseDiv
							defaultOpen={false}
							withCaret={true}
							title="CSR"
							headerClassName="bg-blue-50"
							bodyClassName="p-0"
							>
                            <PatientCSROrder patient={patient} appointment={appointment} />
							</CollapseDiv>
							<div className="flex border-t border-t-indigo-600 pt-4 gap-4">
							<ActionBtn
                                className="px-4 !rounded-2xl w-full"
                                type="success"
                                size="lg"
                                loading={loading}
                                onClick={handleSubmit(sendToNurse)}
                                >
                                <FlatIcon
                                    icon="rr-check"
                                    className="mr-2 text-xl"
                                />
                                Proceed to Room
                            </ActionBtn>
							</div>
						</div>

					</div>
					</div>
					
				</>
			) : (
				""
				
			)}
			
		</div>
  )
}

export default PatientPACUServices

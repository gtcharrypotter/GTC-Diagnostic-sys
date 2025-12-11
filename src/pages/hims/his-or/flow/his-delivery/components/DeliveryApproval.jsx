import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import ActionBtn from '../../../../../../components/buttons/ActionBtn';
import FlatIcon from '../../../../../../components/FlatIcon';
import Axios from '../../../../../../libs/axios';
import useNoBugUseEffect from '../../../../../../hooks/useNoBugUseEffect';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../../../hooks/useAuth';
import { doctorName, doctorSpecialty, formatDateMMDDYYYY, formatDateMMDDYYYYHHIIA} from '../../../../../../libs/helpers';
import PatientCSROrder from '../../../../../department/his-nurse/components/PatientCSROrder';
import PatientPharmacyOrder from '../../../../../department/his-nurse/components/PatientPharmacyOrder';
import CollapseDiv from '../../../../../../components/CollapseDiv';
const uniq_id = uuidv4();
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

const DeliveryApproval = (props) => {
    
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

	useNoBugUseEffect({
		functions: () => {
			getItems();
			getHUList("RHU");
		},
		params: [appointment?.id],
	});

	const [loading, setLoading] = useState(false);
	const [isSelectorLoading, setIsSelectorLoading] = useState(false);
	const [items, setItems] = useState([]);
	const [doctorList, setDoctorList] = useState([]);
	const [doctors, setDoctors] = useState([]);
	
    const roomType = watch('roomType');
	useNoBugUseEffect({
		functions: () => {
			if (getValues("rhu_id")) {
				getDoctors();
			}
		},
		params: [watch("rhu_id")],
	});

	useNoBugUseEffect({
		functions: () => {
			if (user?.health_unit_id) {
				setValue("rhu_id", user?.health_unit_id);
			}
		},
		params: [user?.health_unit_id],
	});
	const getDoctors = () => {
		Axios.get(
			`v1/clinic/doctors-by-location?health_unit_id=${getValues(
				"rhu_id"
			)}`
		).then((res) => {
			setDoctorList(res.data.data);
		});
	};
	const getItems = () => {
		Axios.get(`v1/item-inventory?location_id=${user?.health_unit_id}`).then(
			(res) => {
				setItems(res.data.data);
			}
		);
	};

   const sendToICU = () => {
		setLoading(true);
		let formdata = new FormData();
		formdata.append("rhu_id", appointment?.rhu_id);
		formdata.append("_method", "PATCH");

		Axios.post(`v1/hospital/send-from-delivery-to-icu/${appointment?.id}`, formdata)
			.then((response) => {
				let data = response.data;
				// console.log(data);
				setTimeout(() => {
					setAppointment(null);
				}, 100);
				setTimeout(() => {
					toast.success("Patient refer to ICU!");
					setLoading(false);

				}, 200);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
		// Axios.patch(`v1/hospital/update-operation-time-out/${appointment?.id}`, {
        //         end_time_out: new Date(),
        //     })

	}
	const sendToPacu = () => {
		setLoading(true);
		let formdata = new FormData();
		formdata.append("rhu_id", appointment?.rhu_id);
		formdata.append("_method", "PATCH");

		Axios.post(`v1/hospital/send-from-delivery-to-pacu/${appointment?.id}`, formdata)
			.then((response) => {
				let data = response.data;
				// console.log(data);
				setTimeout(() => {
					setAppointment(null);
				}, 100);
				setTimeout(() => {
					toast.success("Patient refer to PACU!");
					setLoading(false);

				}, 200);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
		// Axios.patch(`v1/hospital/update-operation-time-out/${appointment?.id}`, {
        //         end_time_out: new Date(),
        //     })

	}

	const hasError = (name) => {
		return errors[name]?.message;
	};
	const [HUList, setHUList] = useState([]);
	useNoBugUseEffect({
		functions: () => {
			setTimeout(() => {
				setValue("location_type", user?.healthUnit?.type);
				setValue("health_unit_id", user?.health_unit_id);
			}, 200);
		},
		params: [user?.id],
	});

	const getHUList = (type) => {
		Axios.get(`v1/health-unit/list?type=${type}`)
			.then((res) => {
				setHUList(res.data.data);
			})
			.finally(() => {
				setIsSelectorLoading(false);
			});
	};    
  return (
    <div className="flex flex-col items-start">
			{appointment?.status == "pending-for-delivery-release" ? (
				<>
					<div className="flex items-center w-full justify-center px-4 pb-4 gap-4">
						<div className="p-0 flex flex-col gap-y-4 relative w-full">
						<h4 className="text-md text-indigo-800 border-b border-b-indigo-600 pb-1 font-bold mb-0">
							Delivery Operation
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
							/> */}
							{/* <InfoText
								className="lg:col-span-4"
								label="Duration:"
								value={calculateDuration(appointment?.operation_time_in, appointment?.operation_time_out)}
							/> */}
							<InfoText
								className="lg:col-span-12"
								label="Case ID:"
								value={appointment?.operation_number}
							/>
							<InfoText
								className="lg:col-span-6"
								label="RVS Code:"
								value={appointment?.rvs_code}
							/>
							<InfoText
								className="lg:col-span-6"
								label="Delivery:"
								value={appointment?.operation_procedure}
							/>
							<InfoText
								className="lg:col-span-6"
								label="Date of Delivery:"
								value={formatDateMMDDYYYY(
									new Date(appointment?.operation_date)
								)}
							/>
							<InfoText
								className="lg:col-span-6"
								label="Time of Delivery:"
								value={appointment?.operation_time}
							/>
							{appointment?.obGynsRefer?.name ? (
								<InfoText
									className="lg:col-span-6"
									label="OB-GYNS:"
									value={
										<div className="flex flex-col">
											<span>
												{doctorName(
													appointment?.obGynsRefer
												)}
											</span>
											<span className="text-xs font-light">
												{doctorSpecialty(
													appointment?.obGynsRefer
												)}
											</span>
										</div>
									}
								/>
							) : (
								""
							)}
							{appointment?.anesthesiologistRefer?.name ? (
								<InfoText
									className="lg:col-span-6"
									label="Anesthesiologist:"
									value={
										<div className="flex flex-col">
											<span>
												{doctorName(
													appointment?.anesthesiologistRefer
												)}
											</span>
											<span className="text-xs font-light">
												{doctorSpecialty(
													appointment?.anesthesiologistRefer
												)}
											</span>
										</div>
									}
								/>
							) : (
								""
							)}
							
							
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
									type="danger"
									size="2xl"
									loading={loading}
									onClick={handleSubmit(sendToICU)}
								>
									<FlatIcon
										icon="rr-check"
										className="mr-2 text-xl"
									/>
									Send patient to ICU
								</ActionBtn>
						
							
								<ActionBtn
									className="px-4 !rounded-2xl w-full"
									type="success"
									size="2xl"
									loading={loading}
									onClick={handleSubmit(sendToPacu)}
								>
									<FlatIcon
										icon="rr-check"
										className="mr-2 text-xl"
									/>
									Send patient to PACU
								</ActionBtn>
							</div>
						</div>

					</div>
					</div>
					
				</>
			) : (
				// <div className="flex flex-col w-full gap-4 pb-2">
				// 	<div className="p-0 flex flex-col gap-y-4 relative w-full">
				// 		<h4 className="text-md text-indigo-800 border-b border-b-indigo-600 pb-1 font-bold mb-0">
				// 			Procedure
				// 		</h4>
                //          <div className="flex gap-4">
				// 			<ActionBtn
                //                 className="px-4 !rounded-2xl w-full"
                //                 type="danger"
                //                 size="2xl"
                //                 loading={loading}
                //                 onClick={sendToICU}
                //             >
                //                 <FlatIcon
                //                     icon="rr-check"
                //                     className="mr-2 text-xl"
                //                 />
                //                 Send patient to ICU
                //             </ActionBtn>
                       
                        
                //             <ActionBtn
                //                 className="px-4 !rounded-2xl w-full"
                //                 type="success"
                //                 size="2xl"
                //                 loading={loading}
                //                 onClick={sendToPacu}
                //             >
                //                 <FlatIcon
                //                     icon="rr-check"
                //                     className="mr-2 text-xl"
                //                 />
                //                 Send patient to PACU
                //             </ActionBtn>
				// 		</div>
						
                            
                     
				// 	</div>
				// </div>
				""
			)}
			
		</div>
  )
}

export default DeliveryApproval

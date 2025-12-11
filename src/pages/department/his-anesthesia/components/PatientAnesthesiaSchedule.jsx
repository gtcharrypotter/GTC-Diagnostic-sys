import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import FlatIcon from '../../../../components/FlatIcon';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import { doctorName, doctorSpecialty } from '../../../../libs/helpers';
import ReactSelectInputField from '../../../../components/inputs/ReactSelectInputField';
import { Controller, useForm } from 'react-hook-form';
import TextInputField from '../../../../components/inputs/TextInputField';
import Axios from '../../../../libs/axios';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import { useAuth } from '../../../../hooks/useAuth';
import { toast } from 'react-toastify';

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

const PatientAnesthesiaSchedule = (props) => {
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
	const [isSelectorLoading, setIsSelectorLoading] = useState(false);
	const [doctorList, setDoctorList] = useState([]);

    const procedureType = watch('procedureType');

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
			`v1/clinic/doctors-by-location?health_unit_id=${getValues("rhu_id")}`
		).then((res) => {
			setDoctorList(res.data.data);
		});
	};

	const sendToDelivery = (data) => {
		setLoading(true);
		let formdata = new FormData();
		formdata.append("operation_date", data?.operation_date);
        formdata.append("operation_time", data?.operation_time);
		formdata.append("anesthesiologist", data?.anesthesiologist);
		formdata.append("patient_id", patient?.id);
		formdata.append("appointment_id", appointment?.id);
		formdata.append("_method", "PATCH");

		Axios.post(`v1/hospital/send-from-anesthesia-to-delivery/${appointment?.id}`, formdata)
			.then((response) => {
				let data = response.data;
				setTimeout(() => {
					setAppointment(null);
				}, 100);
				setTimeout(() => {
					toast.success("Anesthesia schedule success!");
					setLoading(false);
				}, 200);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	const sendToSurgery = (data) => {
		setLoading(true);
		let formdata = new FormData();
		formdata.append("operation_date", data?.operation_date);
        formdata.append("operation_time", data?.operation_time);
		formdata.append("anesthesiologist", data?.anesthesiologist);
		formdata.append("patient_id", patient?.id);
		formdata.append("appointment_id", appointment?.id);
		formdata.append("_method", "PATCH");

		Axios.post(`v1/hospital/send-from-anesthesia-to-surgery/${appointment?.id}`, formdata)
			.then((response) => {
				let data = response.data;
				setTimeout(() => {
					setAppointment(null);
				}, 100);
				setTimeout(() => {
					toast.success("Anesthesia schedule success!");
					setLoading(false);
				}, 200);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
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
                        <div className="flex flex-col gap-y-8">
							<InfoText
								className="lg:col-span-4"
								label="Time In:"
								value={formatDateTime(appointment?.start_time_in)}
							/>
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
							<TextInputField
								label="Date"
								type="date"
								error={errors?.operation_date?.message}
								{...register("operation_date", {
									required: {
										value: true,
										message: "This field is required",
									},
								})}
							/>
							<TextInputField
								label="Time"
								type="time"
								error={errors?.operation_time?.message}
								{...register("operation_time", {
									required: {
										value: true,
										message: "This field is required",
									},
								})}
							/>
						</div>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
							<Controller
								name="procedureType"
								control={control}
								rules={{
									required: {
										value: true,
										message: "This field is required",
									},
								}}
								render={({
									field: {
										onChange,
										onBlur,
										value,
										name,
										ref,
									},
									fieldState: {
										invalid,
										isTouched,
										isDirty,
										error,
									},
								}) => (
									<ReactSelectInputField
										isClearable={false}
										label="Procedure"
										inputClassName=" "
										ref={ref}
										value={value}
										onChange={onChange}
										onBlur={onBlur} // notify when input is touched
										error={error?.message}
										placeholder="Select Procedure Type"
										options={
											patient?.gender === 'Female' ? [
												{
													label: "Delivery",
													value: "Delivery",
												},
												{
													label: "Surgery",
													value: "Surgery",
												}
											] : [
												{
													label: "Surgery",
													value: "Surgery",
												}
											]
										}
									/>
								)}
							/>
                            <Controller
								name="anesthesiologist"
								control={control}
								rules={{
									required: {
										value: true,
										message: "This field is required",
									},
								}}
								render={({
									field: {
										onChange,
										onBlur,
										value,
										name,
										ref,
									},
									fieldState: {
										invalid,
										isTouched,
										isDirty,
										error,
									},
								}) => (
									<ReactSelectInputField
										isClearable={true}
										label="Select Anesthesiologist"
										isLoading={isSelectorLoading}
										onChangeGetData={(data) => {}}
										inputClassName=" "
										ref={ref}
										value={value}
										onChange={onChange}
										onData
										onBlur={onBlur} // notify when input is touched
										error={error?.message}
										placeholder={`Select Doctor`}
										options={doctorList
											?.filter((doctor) => doctorSpecialty(doctor) === 'Anesthesiologist')
											.map((doctor) => ({
												label: `${doctorName(doctor)}`,
												value: doctor?.id,
												descriptionClassName: " !opacity-100",
												description: (
													<div className="flex text-xs flex-col gap-1">
														<span>{doctorSpecialty(doctor)}</span>
														<span className="flex items-center gap-1">
															Status:
															<span className="text-green-900 drop-shadow-[0px_0px_1px_#ffffff] text-xs font-bold">
																ONLINE
															</span>
														</span>
													</div>
												),
											}))}
									/>
								)}
							/>
						</div>

						{procedureType === "Delivery" && (
                            <ActionBtn
                                className="px-4 !rounded-2xl w-full"
                                type="success"
                                size="lg"
                                loading={loading}
                                onClick={handleSubmit(sendToDelivery)}
                            >
                                <FlatIcon
                                    icon="rr-check"
                                    className="mr-2 text-xl"
                                />
                                Send patient to Delivery
                            </ActionBtn>
                        )}
                        {procedureType === "Surgery" && (
                            <ActionBtn
                                className="px-4 !rounded-2xl w-full"
                                type="success"
                                size="lg"
                                loading={loading}
                                onClick={handleSubmit(sendToSurgery)}
                            >
                                <FlatIcon
                                    icon="rr-check"
                                    className="mr-2 text-xl"
                                />
                                Send patient to Surgery
                            </ActionBtn>
                        )}
					</div>
				</div>
			)}
		</div>
	);
};

export default PatientAnesthesiaSchedule;

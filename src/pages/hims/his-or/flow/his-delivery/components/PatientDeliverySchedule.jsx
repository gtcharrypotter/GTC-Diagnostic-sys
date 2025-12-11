import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from "uuid";
import useNoBugUseEffect from '../../../../../../hooks/useNoBugUseEffect';
import Axios from '../../../../../../libs/axios';
import { toast } from 'react-toastify';
import TextInputField from '../../../../../../components/inputs/TextInputField';
import ReactSelectInputField from '../../../../../../components/inputs/ReactSelectInputField';
import { doctorName, doctorSpecialty, formatDateTime } from '../../../../../../libs/helpers';
import ActionBtn from '../../../../../../components/buttons/ActionBtn';
import FlatIcon from '../../../../../../components/FlatIcon';
import { useAuth } from '../../../../../../hooks/useAuth';
import { data } from 'autoprefixer';
import { procedureRates } from '../../../../../../libs/procedureRates';
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
const PatientDeliverySchedule = (props) => {
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
	} = useForm({
		defaultValues: {
            operation_date: appointment?.operation_date || "",
            operation_time: appointment?.operation_time || "",
            anesthesiologist: appointment?.anesthesiologist || "",
        },

	});

	console.log('appointment for doctor---------------------->', appointment)
	const [loading, setLoading] = useState(false);
	const [isSelectorLoading, setIsSelectorLoading] = useState(false);
	const [items, setItems] = useState([]);
	const [doctorList, setDoctorList] = useState([]);
	const [selectedProcedure, setSelectedProcedure] = useState(null);
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
			`v1/clinic/doctors-by-location?health_unit_id=${getValues(
				"rhu_id"
			)}`
		).then((res) => {
			setDoctorList(res.data.data);
		});
	};


const sendToDelivery = (data) => {
		setLoading(true);
		let formdata = new FormData();
        // formdata.append("operation_number", data?.operation_number);
        formdata.append("operation_date", data?.operation_date);
        formdata.append("operation_time", data?.operation_time);
        formdata.append("rvs_code", data?.rvs_code);
		formdata.append("operation_procedure", data?.operation_procedure);
        formdata.append("ob_gyns", data?.ob_gyns);
		formdata.append("anesthesiologist", data?.anesthesiologist);
		formdata.append("patient_id", patient?.id);
		formdata.append("appointment_id", appointment?.id);
		formdata.append("_method", "PATCH");

		// Axios.post(`v1/delivery/store/`, formdata)
		// 	.then((response) => {
		// 		let data = response.data;
		// 		// console.log(data);
		// 		setTimeout(() => {
		// 			// setAppointment(null);
		// 		}, 100);
		// 		setTimeout(() => {
		// 			toast.success("Patient referral success!");
		// 			setLoading(false);

		// 		}, 200);
		// 	})
		// 	.catch((err) => {
		// 		setLoading(false);
		// 		console.log(err);
		// 	});
		Axios.post(`v1/hospital/send-from-delivery-to-or/${appointment?.id}`, formdata)
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

	}

  return (
    <div className="flex flex-col items-start">
			{appointment?.status == "pending-for-delivery" ? (
				<>
					<div className="flex flex-col w-full gap-4 pb-2">
					<div className="p-0 flex flex-col gap-y-4 relative w-full">
						<h4 className="text-md text-indigo-800 border-b border-b-indigo-600 pb-1 font-bold mb-0">
							Patient Delivery Schedule
						</h4>
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
										// placeholder="Enter order date"
										{...register("operation_date", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
										label="Time"
										type="time"
										// placeholder="Enter time of procedure"
										error={errors?.operation_time?.message}
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									{/* <div className='flex flex-col gap-6 text-center justify-center text-sm'>
										<span className='font-bold'>Date/Time In</span>
										<span className='font-semibold'>{formatDateTime(appointment?.operation_time_in)}</span>
									</div> */}
                        </div>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
							<Controller
										name="rvs_code"
										control={control}
										rules={{
											required: {
												value: true,
												message:
													"This field is required",
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
												label={
													<>
														RVS CODE
														<span className="text-danger ml-1">
															*
														</span>
													</>
												}
												inputClassName=" "
												ref={ref}
												// value={value}
												value={selectedProcedure?.CASE_CODE}
												onChangeGetData={(data) => {
													setSelectedProcedure(data?.item);
												}}
												onChange={onChange}
												onBlur={onBlur} // notify when input is touched
												error={error?.message}
												placeholder="Select RVS Code"
												options={procedureRates?.map((item) => ({
														value: item?.CASE_CODE,
														label: item?.CASE_CODE,
														item: item,
													}))}
											/>
										)}
									/>
							<Controller
										name="operation_procedure"
										control={control}
										rules={{
											required: {
												value: true,
												message:
													"This field is required",
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
												label={
													<>
														Delivery Procedure
														<span className="text-danger ml-1">
															*
														</span>
													</>
												}
												inputClassName=" "
												ref={ref}
												value={selectedProcedure?.CASE_DESCRIPTION}
												onChangeGetData={(data) => {
													setSelectedProcedure(data?.item);
												}}
												onChange={onChange}
												onBlur={onBlur} // notify when input is touched
												error={error?.message}
												placeholder="Select Delivery Type"
												options={procedureRates?.map((item) => ({
														value: item?.CASE_CODE,
														label: item?.CASE_DESCRIPTION,
														item: item,
													}))}
											/>
										)}
									/>
                            
						</div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <Controller
								name="ob_gyns"
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
										label="Select OB-GYNs"
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
											?.filter((doctor) => doctorSpecialty(doctor) === 'OB-GYNS')
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
                                    d
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
						<ActionBtn
                                className="px-4 !rounded-2xl w-full"
                                type="success"
                                size="lg"
                                loading={loading}
                                // onClick={handleSubmit(sendToDelivery)}
								onClick={handleSubmit(sendToDelivery)}
                            >
                                <FlatIcon
                                    icon="rr-check"
                                    className="mr-2 text-xl"
                                />
                                PATIENT SEND FOR DELIVERY OPERATION
                            </ActionBtn>
					</div>
				</div>
					
				</>
			) : (
				""
			)}
			
		</div>
  )
}

export default PatientDeliverySchedule

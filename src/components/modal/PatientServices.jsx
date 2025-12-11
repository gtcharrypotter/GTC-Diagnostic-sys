/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import FlatIcon from "../FlatIcon";
import ActionBtn from "../buttons/ActionBtn";
import useNoBugUseEffect from "../../hooks/useNoBugUseEffect";

import { v4 as uuidv4 } from "uuid";
import Axios from "../../libs/axios";
import ReactSelectInputField from "../inputs/ReactSelectInputField";
import {
	doctorName,
	doctorSpecialty,
} from "../../libs/helpers";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { Controller, set, useForm } from "react-hook-form";
import { bedRoom, diabetesSymptoms, diarrheaSymptoms, generalConsultation, hypertensionSymptoms, isolationRoom, lRISymptoms, malariaSymptoms, nonPrivateRoom, opdRoom, privateRoom, suiteRoom, symptoms, uRISymptoms } from "../../libs/appointmentOptions";
import AddPrescription from "../../pages/doctor-patient-referrals/components/AddPrescription";
import { data } from "autoprefixer";
import LaboratoryOrders from "../patient-modules/LaboratoryOrders";
import TargetedOrder from "../patient-modules/TargetedOrder";
import TextAreaField from "../inputs/TextAreaField";

const uniq_id = uuidv4();

const PatientServices = (props) => {
	const { appointment, setAppointment, mutateAll } = props;
	
	const { user, checkUserType } = useAuth();
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
	const [items, setItems] = useState([]);
	const [doctorList, setDoctorList] = useState([]);
	const [roomList, setRoomList] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);
	
	useNoBugUseEffect({
		functions: () => {
			getHUList("SA");
		},
		params: [appointment?.id],
	});
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
			getItems();
		},
		params: [],
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
	
	const sendToDoctor = (data) => {
		setLoading(true);
		let formdata = new FormData();
		formdata.append("rhu_id", data?.rhu_id);
		formdata.append("doctor_id", data?.doctor_id);
		formdata.append("room_number", data?.room_number);
		formdata.append("_method", "PATCH");

		Axios.post(`v1/opd-standalone/assign-to-doctor/${appointment?.id}`, formdata)
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
        //         er_time_out: new Date(),
        //     })
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
	
	const prescribeItems = (data) => {
		setLoading(true);
		const formData = new FormData();
		if (appointment?.bhs_id > 0) {
			formData.append("type", "bhs");
		}
		if (appointment?.rhu_id > 0) {
			formData.append("type", "rhu");
		}
		formData.append("treatment_plan", data?.treatment_plan);
		formData.append("appointment_id", appointment?.id);
		formData.append("_method", "PATCH");
		selectedItems.map((data) => {
			console.log("selectedItemsselectedItems", data);
			formData.append("inventory_id[]", data?.item?.inventory?.id);
			formData.append("quantity[]", data.quantity);
			formData.append("items[]", data?.item?.id);
			formData.append("sig[]", data?.notes || " ");
		});
		// return;
		Axios.post(`/v1/opd-standalone/prescribe/${appointment?.id}`, formData)
			.then((response) => {
				let data = response.data;
				// addToList(data);
				setTimeout(() => {
					setAppointment(null);
				}, 100);
				setTimeout(() => {
					setLoading(false);
					toast.success("Prescription added successfully!");
					mutateAll();
				}, 400);
			})
			.finally(() => {
				setLoading(false);
			});
		console.log("SUBMIT PRESCRIPTION");
	};
	return (
		<div className="flex flex-col items-start">
			{appointment?.status === "pending-for-nurse-icu-release" || appointment?.status === "pending-for-nurse-pacu-release" ? (
				<>
					<div className="flex items-center w-full justify-center px-4 pb-4 gap-4">
						<div className="p-0 flex flex-col gap-y-4 relative w-full">
						{/* <h4 className="text-md text-indigo-800 border-b border-b-indigo-600 pb-1 font-bold mb-0">
							Add Prescription
						</h4> */}
                        
						{/* <PatientPharmacyOrder patient={appointment?.patient} /> */}
							<AddPrescription
									
									items={items}
									setItems={setItems}
									selectedItems={selectedItems}
									setSelectedItems={setSelectedItems}
									prescribeItems={prescribeItems}
									loading={loading}
								/>
								
                               
					</div>
					</div>
				</>
			) : (
				<div className="flex flex-col w-full gap-4 pb-2">
					<div className="p-0 flex flex-col gap-y-4 relative w-full">
						
						{checkUserType("NURSE") ? (
							<div className="flex flex-col gap-4">
								
								<div>
								<TargetedOrder 
								appointment ={appointment}
								patient={appointment?.patient}
								laboratory_test_type={"all"}
								/>
								</div>
							<div>
							<h4 className="text-md text-indigo-800 border-b border-b-indigo-600 pb-1 font-bold mb-0">
							Send patient to Medical Doctor (MD)
							</h4>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
								<Controller
								name="doctor_id"
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
										label="Select Doctor"
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
											?.filter((doctor) => doctorSpecialty(doctor) === 'Medical Doctor')
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
							<div className="">
							<Controller
								name="room_number"
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
										label="Select Room"
										isLoading={isSelectorLoading}
										onChangeGetData={(data) => {}}
										inputClassName=" "
										ref={ref}
										value={value}
										onChange={onChange}
										onData
										onBlur={onBlur} // notify when input is touched
										error={error?.message}
										placeholder={`Select Room`}
										options={opdRoom}
									/>
								)}
								/>
							</div>
							</div>
							</div>
							
							</div>
							) : (
								""
							)}

						<ActionBtn
							className="px-4 !rounded-2xl w-full"
							type="success"
							size="lg"
							loading={loading}
							onClick={handleSubmit(sendToDoctor)}
						>
							<FlatIcon
								icon="rr-check"
								className="mr-2 text-xl"
							/>
							Send patient to doctor
						</ActionBtn>
					</div>
				</div>
			)}
			
		</div>
	);
};

export default PatientServices;

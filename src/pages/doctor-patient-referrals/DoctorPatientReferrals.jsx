import { useEffect, useRef, useState } from "react";
import AppLayout from "../../components/container/AppLayout";
import useNoBugUseEffect from "../../hooks/useNoBugUseEffect";
import { patientFullName } from "../../libs/helpers";
import { useAuth } from "../../hooks/useAuth";
import DoctorInQueueRegular from "../doctor-patient-queue/components/DoctorInQueueRegular";
import ReferToSPHModal from "../../components/modal/ReferToSPHModal";
import ConsultPatientModal from "../doctor-patient-queue/components/ConsultPatientModal";
import PatientProfileModal from "../../components/PatientProfileModal";
import useReferralQueue from "../../hooks/useReferralQueue";
import { useForm } from "react-hook-form";
import Axios from "../../libs/axios";
import ActionBtn from "../../components/buttons/ActionBtn";
import { toast } from "react-toastify";
import CreatePrescriptionModal from "../../components/patient-modules/modals/CreatePrescriptionModal";
import SelectItemModal from "../../components/modal/SelectItemModal";
import AppointmentDetails from "../appointments/components/AppointmentDetails";
import PatientInfo from "../patients/components/PatientInfo";
import TBConfirmation from "./components/TBConfirmation";
import DoctorInQueuePriority from "../doctor-patient-queue/components/DoctorInQueuePriority";
import DoctorInQueuePrescription from "../doctor-patient-queue/components/DoctorInQueuePrescription";
import AddPrescription from "./components/AddPrescription";

const AppointmentData = ({ mutateAll, appointment = null }) => {
	const {
		register,
		setValue,
		handleSubmit,
		reset,
		trigger,
		control,
		watch,
		formState: { errors },
	} = useForm();
	const [selectedItems, setSelectedItems] = useState([]);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);
	const [diagnosis, setDiagnosis] = useState(null);
	const [procedure, setProcedure] = useState(null);

	useNoBugUseEffect({
		functions: () => {
			getItems();
		},
		params: [],
	});

	const submitPositive = (data) => {
		setLoading(true);
		Axios.post(`/v1/clinic/tb-positive/${appointment?.id}`, {
			_method: "PATCH",
		}).then((res) => {
			setTimeout(() => {
				setLoading(false);
				toast.success("Success Patient is marked as TB Positive!");
				mutateAll();
			}, 1500);
		});
	};
	const submitNegative = (data) => {
		setLoading(true);
		Axios.post(`/v1/clinic/tb-negative/${appointment?.id}`, {
			_method: "PATCH",
		}).then((res) => {
			setTimeout(() => {
				setLoading(false);
				toast.success("Patient is TB Negative! Closing form.");
				mutateAll();
			}, 1500);
		});
	};

	const getItems = () => {
		let health_unit_id =
			appointment?.bhs_id > 0 ? appointment?.bhs_id : appointment?.rhu_id;
		Axios.get(`v1/item-inventory?location_id=${health_unit_id}`).then(
			(res) => {
				setItems(res.data.data);
			}
		);
	};
	const prescribeItems = () => {
		setLoading(true);
		const formData = new FormData();
		if (appointment?.bhs_id > 0) {
			formData.append("type", "bhs");
		} else if (appointment?.rhu_id > 0) {
			formData.append("type", "rhu");
		}
		formData.append("appointment_id", appointment?.id);
		formData.append("_method", "PATCH");
		if (diagnosis) formData.append("diagnosis_code", diagnosis);
		if (procedure) formData.append("procedure_code", procedure);
		selectedItems.map((data) => {
			formData.append("inventory_id[]", data.inventory_id);
			formData.append("quantity[]", data.quantity);
			formData.append("items[]", data?.item?.id);
			formData.append("sig[]", data?.notes || " ");
		});
		Axios.post(`/v1/clinic/tb-prescribe/${appointment?.id}`, formData)
			.then((res) => {
				// addToList(data);
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
		<div>
			<h4 className="border flex items-center text-base font-bold p-2 mb-0 border-indigo-100 lg:col-span-12">
				<span>Patient Information</span>
			</h4>
			<div className="flex flex-col lg:flex-row gap-2 border-x border-indigo-100 p-4">
				<PatientInfo patient={appointment?.patient} />
			</div>
			<div className="pb-4">
				<AppointmentDetails
					appointment={appointment}
					showService={true}
					serviceComponent={
						<>
							{appointment?.status ==
								"pending-for-pharmacy-release" &&
							appointment?.prescribed_by == null ? (
								<AddPrescription
									items={items}
									setItems={setItems}
									selectedItems={selectedItems}
									setSelectedItems={setSelectedItems}
									prescribeItems={prescribeItems}
									setDiagnosis={setDiagnosis}
									setProcedure={setProcedure}
									loading={loading}
								/>
							) : (
								<TBConfirmation
									appointment={appointment}
									register={register}
									setValue={setValue}
									handleSubmit={handleSubmit}
									reset={reset}
									trigger={trigger}
									control={control}
									watch={watch}
									errors={errors}
									submitPositive={submitPositive}
									submitNegative={submitNegative}
								/>
							)}
						</>
					}
				/>
			</div>
		</div>
	);
};
const DoctorPatientReferrals = () => {
	const { user } = useAuth();
	const {
		pending,
		mutatePending,
		pendingPrescription,
		mutatePendingPrescription,
	} = useReferralQueue();
	const referToSphModalRef = useRef(null);
	const patientProfileRef = useRef(null);
	const acceptPatientRef = useRef(null);
	const createPrescriptionRef = useRef(null);
	const selecItemRef = useRef(null);

	const [selected, setSelected] = useState(null);
	useNoBugUseEffect({
		functions: () => {},
	});

	const listPending = () => {
		return pending?.data || [];
	};
	const mutateAll = () => {
		setSelected(null);
		mutatePending();
		mutatePendingPrescription();
	};
	return (
		<AppLayout>
			{/* <PageHeader
				title="Patient Queue"
				subtitle={"View patients in queue"}
				icon="rr-clipboard-list-check"
			/> */}
			<div className="p-4 h-full overflow-auto ">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-5 divide-x">
					<div className="lg:col-span-4">
						<h1 className="text-xl font-bold font-opensans text-primary-dark tracking-wider -mb-1">
							Referrals
						</h1>
						<span className="noto-sans-thin text-slate-500 text-sm font-light">
							Referral patients pending for doctor acceptance
						</span>
						<div className="flex flex-col gap-y-4 py-4">
							{listPending()?.length == 0 &&
							pendingPrescription?.data?.length == 0 ? (
								<div className="text-slate-300 py-20 text-center">
									No patient in queue.{" "}
								</div>
							) : (
								""
							)}

							{listPending()?.map((queue, index) => {
								return (
									<DoctorInQueueRegular
										className="active:bg-blue-500 duration-200 cursor-pointer active:text-white"
										// acceptAction={() => {
										// 	acceptPatientRef.current.show(
										// 		queue
										// 	);
										// }}
										key={`iqr-${queue.id}`}
										number={`${queue.id}`}
										patientName={patientFullName(
											queue?.patient
										)}
										onClick={() => {
											setSelected(queue);
										}}
									/>
								);
							})}
							{pendingPrescription?.data?.map((queue, index) => {
								return (
									<DoctorInQueuePrescription
										className="active:bg-blue-500 duration-200 cursor-pointer active:text-white"
										// acceptAction={() => {
										// 	acceptPatientRef.current.show(
										// 		queue
										// 	);
										// }}
										key={`iqr-${queue.id}`}
										number={`${queue.id}`}
										patientName={patientFullName(
											queue?.patient
										)}
										onClick={() => {
											setSelected(queue);
										}}
									/>
								);
							})}
						</div>
					</div>
					<div className="lg:col-span-8 pl-4">
						<h1 className="text-xl font-bold font-opensans text-success-dark tracking-wider -mb-1">
							In Service...
						</h1>
						<span className="mb-3 noto-sans-thin text-slate-500 text-sm font-light">
							&nbsp;
						</span>
						{selected ? (
							<AppointmentData
								mutateAll={mutateAll}
								appointment={selected}
							/>
						) : (
							""
						)}
					</div>
				</div>
			</div>
			<ReferToSPHModal ref={referToSphModalRef} mutateAll={mutateAll} />
			<ConsultPatientModal ref={acceptPatientRef} mutateAll={mutateAll} />
			<PatientProfileModal
				ref={patientProfileRef}
				mutateAll={mutateAll}
			/>
			<CreatePrescriptionModal
				ref={createPrescriptionRef}
				selecItemRef={selecItemRef}
			/>
			<SelectItemModal ref={selecItemRef} />
		</AppLayout>
	);
};

export default DoctorPatientReferrals;

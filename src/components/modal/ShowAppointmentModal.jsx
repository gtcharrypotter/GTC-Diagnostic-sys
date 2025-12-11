/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import {
	Fragment,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";
import { Fade, Zoom } from "react-reveal";
import { Dialog, Transition } from "@headlessui/react";
import ActionBtn from "../buttons/ActionBtn";
import FlatIcon from "../FlatIcon";
import TextInput from "../inputs/TextInput";
import SelectInput from "../inputs/SelectInput";
import Axios from "../../libs/axios";
import useClinic from "../../hooks/useClinic";
import {
	dateYYYYMMDD,
	formatDateMMDDYYYY,
	formatDateMMDDYYYYHHIIA,
	patientFullName,
} from "../../libs/helpers";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InfoText from "../InfoText";
import ReferralListItem from "../../pages/patient-referrals/components/ReferralListItem";
import TBConfirmation from "../../pages/doctor-patient-referrals/components/TBConfirmation";
import AddPrescription from "../../pages/doctor-patient-referrals/components/AddPrescription";
import PatientInfo from "../../pages/patients/components/PatientInfo";
import AppointmentDetails from "../../pages/appointments/components/AppointmentDetails";
import useNoBugUseEffect from "../../hooks/useNoBugUseEffect";
// [ { label: "8:00 AM - 8:30 AM", value: "8:00 AM - 8:30 AM", }, { label: "8:30 AM - 9:00 AM", value: "8:30 AM - 9:00 AM", }, { label: "9:00 AM - 9:30 AM", value: "9:00 AM - 9:30 AM", }, { label: "9:30 AM - 10:00 AM", value: "9:30 AM - 10:00 AM", }, { label: "10:00 AM - 10:30 AM", value: "10:00 AM - 10:30 AM", }, { label: "10:30 AM - 11:00 AM", value: "10:30 AM - 11:00 AM", }, { label: "11:00 AM - 9:30 AM", value: "9:00 AM - 9:30 AM", }, { label: "9:30 AM - 10:00 AM", value: "9:30 AM - 10:00 AM", }, ]

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
		}
		formData.append("appointment_id", appointment?.id);
		formData.append("_method", "PATCH");
		selectedItems.map((data) => {
			formData.append("inventory_id[]", data?.item?.inventory?.id);
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
					showService
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
const ShowAppointmentModal = (props, ref) => {
	const { title, children, size = "modal-md" } = props;
	const [appointment, setAppointment] = useState(null);
	const [mount, setMount] = useState(0);

	const [linkURl, setLinkURL] = useState(
		`${origin}/consultation?channel=Test&token=007eJxTYPB0eaO9vEotrTPAwflN1reHeX95n5YKPl2rc9CJYevVElMFBktLi7Q0I7OktBQzS5OUpNREixQDo7Tk1DRTy9QUQ7OkOFmz1IZARob74cZMjAwQCOKzMISkFpcwMAAAYbIfig`
	);
	const [modalOpen, setModalOpen] = useState(false);
	useEffect(() => {
		let t = setTimeout(() => {
			setMount(1);
		}, 400);
		return () => {
			clearTimeout(t);
		};
	}, []);

	useEffect(() => {}, []);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		if (data) {
			setAppointment(data);
		}
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};
	const copyLink = async () => {
		// Copy the text inside the text field
		await window.navigator.clipboard.writeText(linkURl);
		hide();

		// Alert the copied text
		alert("Copied the text: " + linkURl);
	};
	const submit = (data) => {};
	return (
		<Transition appear show={modalOpen} as={Fragment}>
			<Dialog as="div" className="" onClose={hide}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur z-[300]" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto !z-[350]">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full lg:max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex items-center text-gray-900"
								>
									<span className="text-lg">
										Appointment Details
									</span>
									<span
										className="absolute right-4 flex items-center justify-center w-8 h-8 rounded-full bg-red-50 hover:bg-red-200 duration-200 cursor-pointer text-red-600"
										onClick={hide}
									>
										<FlatIcon
											icon="rr-cross-small"
											className="text-lg"
										/>
									</span>
								</Dialog.Title>

								<AppointmentData appointment={appointment} />
								<div className="p-4 flex items-center justify-end">
									{/* <ActionBtn
										type="success"
										className="mr-auto"
										// onClick={setAsDone}
									>
										Set as done
									</ActionBtn> */}
									<ActionBtn
										className="ml-auto"
										onClick={hide}
									>
										Close
									</ActionBtn>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default forwardRef(ShowAppointmentModal);

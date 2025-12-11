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
import { dateYYYYMMDD } from "../../libs/helpers";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// [ { label: "8:00 AM - 8:30 AM", value: "8:00 AM - 8:30 AM", }, { label: "8:30 AM - 9:00 AM", value: "8:30 AM - 9:00 AM", }, { label: "9:00 AM - 9:30 AM", value: "9:00 AM - 9:30 AM", }, { label: "9:30 AM - 10:00 AM", value: "9:30 AM - 10:00 AM", }, { label: "10:00 AM - 10:30 AM", value: "10:00 AM - 10:30 AM", }, { label: "10:30 AM - 11:00 AM", value: "10:30 AM - 11:00 AM", }, { label: "11:00 AM - 9:30 AM", value: "9:00 AM - 9:30 AM", }, { label: "9:30 AM - 10:00 AM", value: "9:30 AM - 10:00 AM", }, ]
const CreatePatientAppointment = (props, ref) => {
	const {
		register,
		getValues,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { title, children, size = "modal-md" } = props;
	const { getDoctors, getTimeSlots } = useClinic();
	const [mount, setMount] = useState(0);
	const [date, setDate] = useState(dateYYYYMMDD());
	const [patient, setPatient] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [doctor, setDoctor] = useState(null);
	const [doctors, setDoctors] = useState([]);
	const [slots, setSlots] = useState([]);
	const [timeSlot, setTimeSlot] = useState(0);
	const [notes, setNotes] = useState("");
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
			setPatient(data);
		}
		getDoctors().then((res) => {
			setDoctors(res.data.data);
		});
		// getTimeSlots().then((res) => {
		// 	setSlots(res.data.data);
		// });
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};
	useEffect(() => {
		if (getValues("doctor_id") && getValues("date")) {
			getTimeSlots({
				date: getValues("date"),
				doctor_id: getValues("doctor_id"),
			}).then((res) => {
				console.log("resres", Object.values(res.data));
				setSlots(Object.values(res.data));
				hide();
			});
		}
	}, [watch("doctor_id")]);
	const submit = (data) => {
		let formData = new FormData();

		formData.append("doctor_id", data?.doctor_id);
		formData.append("patient_id", patient?.id);
		formData.append("date", data?.date);
		formData.append("slot_id", data?.slot_id);
		formData.append("notes", data?.notes);

		Axios.post(`v1/telemedicine/booked`, formData).then((res) => {
			toast.success("New appointment created successfully!");
		});
	};
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
					<div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
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
							<Dialog.Panel className="w-full lg:max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex items-center text-gray-900"
								>
									<span className="text-lg">
										Create new appointment
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
								<div className="px-4 flex flex-col gap-y-4">
									<div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
										<TextInput
											type="date"
											label="Select date"
											register={register("date", {
												required:
													"This field is required",
											})}
											error={errors?.date?.message}
											onChange={(e) => {
												setDate(e.target.value);
											}}
										/>
									</div>
									<div className="grid grid-cols-1 gap-4">
										<SelectInput
											label="Select doctor"
											placeholder="Select doctor"
											options={doctors?.map((doctor) => {
												return {
													label: doctor?.lastname,
													value: doctor?.id,
												};
											})}
											register={register("doctor_id", {
												required:
													"This field is required",
											})}
											error={errors?.doctor_id?.message}
										/>
										<SelectInput
											label="Select Time"
											placeholder="Select Time"
											register={register("slot_id", {
												required:
													"This field is required",
											})}
											error={errors?.slot_id?.message}
											options={slots?.map((slot) => {
												return {
													label: `${slot?.start_time} - ${slot?.end_time}`,
													value: slot?.id,
												};
											})}
										/>
										<TextInput
											label="Notes"
											placeholder="Input notes..."
											register={register("notes", {})}
											error={errors?.notes?.message}
											onChange={(e) => {
												setNotes(e.target.value);
											}}
										/>
									</div>
								</div>

								<div className="p-4 flex items-center justify-end">
									<ActionBtn
										className="ml-auto"
										onClick={handleSubmit(submit)}
									>
										Submit
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

export default forwardRef(CreatePatientAppointment);

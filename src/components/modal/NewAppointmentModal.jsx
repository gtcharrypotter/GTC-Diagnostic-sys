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
import { dateYYYYMMDD, doctorName, doctorSpecialty } from "../../libs/helpers";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useNoBugUseEffect from "../../hooks/useNoBugUseEffect";
import ReactSelectInputField from "../inputs/ReactSelectInputField";
// [ { label: "8:00 AM - 8:30 AM", value: "8:00 AM - 8:30 AM", }, { label: "8:30 AM - 9:00 AM", value: "8:30 AM - 9:00 AM", }, { label: "9:00 AM - 9:30 AM", value: "9:00 AM - 9:30 AM", }, { label: "9:30 AM - 10:00 AM", value: "9:30 AM - 10:00 AM", }, { label: "10:00 AM - 10:30 AM", value: "10:00 AM - 10:30 AM", }, { label: "10:30 AM - 11:00 AM", value: "10:30 AM - 11:00 AM", }, { label: "11:00 AM - 9:30 AM", value: "9:00 AM - 9:30 AM", }, { label: "9:30 AM - 10:00 AM", value: "9:30 AM - 10:00 AM", }, ]
const Modal = (props, ref) => {
	const {
		register,
		getValues,
		setValue,
		control,
		reset,
		trigger,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { title, children, size = "modal-md", onSuccessCallBack } = props;
	const { getDoctors, getDoctorsByHealthUnit, getTimeSlots } = useClinic();
	const [mount, setMount] = useState(0);
	const [date, setDate] = useState(dateYYYYMMDD());
	const [patient, setPatient] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [HUList, setHUList] = useState([]);
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

	useNoBugUseEffect({
		functions: () => {
			if (watch("location_type")) getHUList(watch("location_type"));
		},
		params: [watch("location_type")],
	});
	useNoBugUseEffect({
		functions: () => {
			if (watch("health_unit_id")) {
				setDoctors([]);
				getDoctorsByHealthUnit(watch("health_unit_id")).then((res) => {
					console.log("getDoctorsByHealthUnit", res.data);
					setDoctors(res.data);
				});
			}
		},
		params: [watch("health_unit_id")],
	});
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const getHUList = (type) => {
		Axios.get(`v1/health-unit/list?type=${type}`)
			.then((res) => {
				setHUList(res.data.data);
			})
			.finally(() => {
				// setIsSelectorLoading(false);
			});
	};
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
		reset({
			doctor_id: "",
			patient_id: "",
			date: "",
			slot_id: "",
			notes: "",
		});
	};
	useNoBugUseEffect({
		functions: () => {
			getTimeSlots({
				date: getValues("date"),
				doctor_id: getValues("doctor_id"),
			}).then((res) => {
				console.log("resres", Object.values(res.data));
				setSlots(Object.values(res.data));
			});
		},
		params: [doctor?.id],
	});

	const submit = (data) => {
		let formData = new FormData();

		formData.append("doctor_id", data?.doctor_id);
		formData.append("patient_id", patient?.id);
		formData.append("date", data?.date);
		formData.append("slot_id", data?.slot_id);
		formData.append("notes", data?.notes);

		Axios.post(`v1/telemedicine/booked`, formData).then((res) => {
			setTimeout(() => {
				toast.success("New appointment created successfully!");
				if (onSuccessCallBack) onSuccessCallBack();
			}, 200);
			hide();
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
					<div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur z-20" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto z-[1050]">
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
									className="py-3 px-4 flex flex-col border-b "
								>
									<span className="text-xl font-bold  text-blue-900">
										Create new appointment
									</span>
									<span className="text-sm font-light text-blue-900 ">
										Complete form to create appointment
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
									<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
										<Controller
											name="location_type"
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
													inputClassName=" "
													ref={ref}
													value={value}
													label="Select Location Type"
													onChange={onChange}
													onBlur={onBlur} // notify when input is touched
													error={error?.message}
													placeholder="Select type"
													options={[
														{
															label: "Rural Health Unit",
															value: "RHU",
															
														},
														{
															label: "Sarangani Provincial Hospital",
															value: "SPH",
															
														},
													]}
												/>
											)}
										/>
										<div className={` `}>
											<Controller
												name="health_unit_id"
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
														onChangeGetData={(
															data
														) => {}}
														inputClassName=" "
														ref={ref}
														value={value}
														onChange={onChange}
														onData
														label="Select Health Unit"
														onBlur={onBlur} // notify when input is touched
														error={error?.message}
														placeholder={`Select Health Unit`}
														options={HUList?.map(
															(unit) => ({
																label: unit?.name,
																value: unit?.id,
																rooms: unit?.rooms,
															})
														)}
													/>
												)}
											/>
										</div>
									</div>
									<div className="grid grid-cols-1 gap-5">
										<Controller
											name="doctor_id"
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
													isClearable={true}
													label={
														<>
															Assign To Doctor
															<span className="text-danger ml-1">
																*
															</span>
														</>
													}
													inputClassName=" "
													ref={ref}
													value={value}
													onChange={onChange}
													onChangeGetData={(data) => {
														trigger("date");
														setDoctor(data?.doctor);
													}} // send value to hook form
													onBlur={onBlur} // notify when input is touched
													error={error?.message}
													placeholder="Select Doctor"
													options={doctors?.map(
														(doctor) => ({
															label: `${doctorName(
																doctor
															)}`,
															value: doctor?.id,
															doctor: doctor,
															descriptionClassName:
																" !opacity-100",
															description: (
																<div className="flex text-xs flex-col gap-1">
																	<span>
																		{doctorSpecialty(
																			doctor
																		)}
																	</span>
																	<span className="flex items-center gap-1">
																		Status:
																		<span className="text-green-900 drop-shadow-[0px_0px_1px_#ffffff] text-xs font-bold">
																			ONLINE
																		</span>
																	</span>
																</div>
															),
														})
													)}
												/>
											)}
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

export default forwardRef(Modal);

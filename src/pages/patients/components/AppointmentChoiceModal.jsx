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
import { Dialog, Transition } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import FlatIcon from "../../../components/FlatIcon";

const AppointmentChoiceModal = (props, ref) => {
	const {
		onClickHealthScreening,
		onClickUpdateAssessment,
		onClickConsultation,
		onClickAhef,
		onClickEncounter,
		onClickTelemedicine,
		appointment,
		patient
	} = props;
	const {
		register,
		getValues,
		setValue,
		control,
		reset,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [mount, setMount] = useState(0);
	const [modalData, setModalData] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	useEffect(() => {
		let t = setTimeout(() => {
			setMount(1);
		}, 400);
		return () => {
			clearTimeout(t);
		};
	}, []);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));
	const { checkUserType } = useAuth();
	const show = (showData = null) => {
		setModalOpen(true);
		if (showData) {
			setModalData(showData);
		}
	};
	const hide = () => {
		setModalOpen(false);
	};
console.log("Appointments", appointment?.appointments)
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

				<div className="fixed inset-0 overflow-y-auto !z-[100]">
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
							<Dialog.Panel className="w-full lg:max-w-sm transform overflow-visible rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className="py-3 px-4 flex flex-col border-b "
								>
									<span className="text-xl font-bold text-center text-blue-900">
										APPOINTMENT TYPES
									</span>
								</Dialog.Title>
								<div className="px-6 pt-5 pb-7 grid grid-cols-1 gap-5 relative">
									{checkUserType("NURSE") ? (
									<>
										{patient?.first_tranche === 1 ? (
											<div
											className={`h-[88px] flex items-center justify-center text-2xl rounded-3xl flex-col duration-200
												${patient?.first_tranche === 1
												? "bg-indigo-300 text-gray-50 cursor-not-allowed"
												: "bg-indigo-200 hover:bg-indigo-600 hover:text-white cursor-pointer"
												}`}
											aria-disabled={patient?.first_tranche === 1}
											>
											<span className="text-xs">
												Tranche 1&nbsp;(FPE) {patient?.first_tranche === 1 && <FlatIcon icon="rr-check" />}
											</span>
											<span className="font-bold">Health Screening</span>
											<span className="text-xs">Health Screening & Assessment is already done</span>
											</div>
										) : (
										<div
											className={`h-[88px] flex items-center justify-center text-2xl rounded-3xl 
														bg-indigo-200 hover:bg-indigo-600 hover:text-white duration-200 
														cursor-pointer flex-col`}
											onClick={() => {
												onClickHealthScreening();
												hide();
											}}
											>
											<span className="text-xs">Tranche 1(FPE)</span>
											<span className="font-bold">Health Screening</span>
											<span className="text-xs">Create Health Screening & Assessment</span>
										</div>
										)}
										<div
											className={`h-[88px] flex items-center justify-center text-2xl rounded-3xl 
														bg-sky-200 hover:bg-sky-600 hover:text-white duration-200 
														cursor-pointer flex-col`}
											onClick={() => {
												onClickEncounter();
												hide();
											}}
											>
											<span className="font-bold">New Encounter</span>
											<span className="text-xs">Create New Encounter</span>
										</div>
									<div
										className="h-[88px] flex items-center justify-center text-2xl rounded-3xl bg-teal-200 hover:bg-teal-600 hover:text-white duration-200 cursor-pointer flex-col"
										onClick={() => {
											onClickConsultation();
											hide();
										}}
									>
										<span className="text-xs">Tranche 2</span>
										<span className="font-bold">
											New Consultation
										</span>
										<span className="text-xs">
											Create new consultation Appointment
										</span>
									</div>
									
									</>
								) : (
									""
								)}
									
									{/* <div
										className="h-[88px] flex items-center justify-center text-2xl rounded-3xl bg-green-200 hover:bg-green-600 hover:text-white duration-200 cursor-pointer flex-col"
										onClick={() => {
											onClickAhef();
											hide();
										}}
									>
										<span className="font-bold">AHEF</span>
										<span className="text-xs">
											Annual Health Examination Form
										</span>
									</div> */}
									<div
										className="h-[88px] flex items-center justify-center text-2xl rounded-3xl bg-red-200 hover:bg-red-600 hover:text-white duration-200 cursor-pointer flex-col"
										onClick={() => {
											onClickTelemedicine();
											hide();
										}}
									>
										<span className="font-bold">
											Teleconsult
										</span>
										<span className="text-xs">
											GTC Teleconsult appointment
										</span>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default forwardRef(AppointmentChoiceModal);

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
import { toast } from "react-toastify";
import ActionBtn from "../../../components/buttons/ActionBtn";
import Axios from "../../../libs/axios";
import { patientFullName } from "../../../libs/helpers";
import PatientInfo from "../../patients/components/PatientInfo";
import AppointmentDetails from "../../appointments/components/AppointmentDetails";
import FlatIcon from "../../../components/FlatIcon";

const ConsultPatientModal = (props, ref) => {
	const { mutateAll } = props;
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

	const [showData, setShowData] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		console.log("appointment", data);
		setShowData(data);
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};

	const submit = (data) => {
		let formData = new FormData();
		formData.append("_method", "PATCH");
		Axios.post(
			`v1/opd-standalone/doctor-accept-patient/${showData?.id}`,
			formData
		).then((res) => {
			reset();
			mutateAll();
			toast.success("Patient accepted successfully!");
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
							<Dialog.Panel className="w-full lg:max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								{/* <Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									
								</Dialog.Title> */}

								<div>
									<h4 className="border flex items-center text-base font-bold p-2 mb-0 border-indigo-100 lg:col-span-12">
										<span>Patient Information</span>
									</h4>
									<div className="flex flex-col lg:flex-row gap-2 border-x border-indigo-100 p-4">
										<PatientInfo
											patient={showData?.patient}
										>
											<div className="ml-auto pt-6">
												<ActionBtn
													type="success"
													// loading={loading}
													size="lg"
													onClick={handleSubmit(
														submit
													)}
													className="px-4"
												>
													<FlatIcon
														className="text-3xl mr-1	"
														icon="rr-memo-circle-check"
													/>
													<div className="flex flex-col text-left">
														<span className="font-bold -mb-1">
															Accept Patient
														</span>
														<span className="text-[10px] font-light max-w-[256px]">
															Patient will be on
															service list
														</span>
													</div>
												</ActionBtn>
											</div>
										</PatientInfo>
									</div>
									<AppointmentDetails
										forResult={true}
										appointment={showData}
									/>
								</div>

								<div className="px-4 pt-3 pb-5 flex items-center justify-center bg-slate-">
									{/* <ActionBtn
										type="foreground-dark"
										className="ml-auto uppercase"
										onClick={hide}
									>
										Read more...
									</ActionBtn> */}
									<ActionBtn
										size="lg"
										type="success"
										className="px-5"
										onClick={handleSubmit(submit)}
									>
										ACCEPT PATIENT
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

export default forwardRef(ConsultPatientModal);

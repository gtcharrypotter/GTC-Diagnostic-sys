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
import ActionBtn from "../buttons/ActionBtn";
import FlatIcon from "../FlatIcon";
import useClinic from "../../hooks/useClinic";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Img from "../Img";
import { dateOnlyToday } from "../../libs/helpers";
import ReferralListItem from "../../pages/patient-referrals/components/ReferralListItem";
import useNoBugUseEffect from "../../hooks/useNoBugUseEffect";

const ReadingListModal = (props, ref) => {
	const {
		acceptPatientRef,
		isOnline,
		staticModal = true,
		updatePatientVital,
	} = props;
	const {
		register,
		getValues,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { data } = useClinic();
	const [mount, setMount] = useState(0);
	const [count, setCount] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);
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
			if (!isOnline) {
				hide();
			}
		},
		params: [isOnline],
	});
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};
	const nohide = () => {};

	const submit = (data) => {
		// let formData = new FormData();
		// formData.append("doctor_id", data?.doctor_id);
		// formData.append("patient_id", patient?.id);
		// formData.append("date", data?.date);
		// formData.append("slot_id", data?.slot_id);
		// formData.append("notes", data?.notes);
		// Axios.post(`v1/telemedicine/booked`, formData).then((res) => {
		// 	toast.success("New appointment created successfully!");
		// });
	};
	return (
		<Transition appear show={modalOpen} as={Fragment}>
			<Dialog as="div" className="" onClose={staticModal ? nohide : hide}>
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
							<Dialog.Panel className="w-full lg:max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								{/* <Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									
								</Dialog.Title> */}
								<div className="p-4 flex flex-col gap-y-4 relative">
									<div className="flex flex-col">
										<span className="text-xl font-bold  text-blue-900">
											Reading Referrals
										</span>
										<span className="text-sm font-light text-blue-900 ">
											List of reading
										</span>
									</div>
									{/* <div>{dateOnlyToday()}</div> */}
									{console.log(
										"referral ssss",
										data?.referrals
									)}
									{data?.reading?.length > 0 ? (
										data?.reading?.map((referral) => {
											if (referral) {
												console.log(
													"referral ssss",
													referral
												);
												// setCount(
												// 	(prevCount) =>
												// 		prevCount + 1
												// );
												return (
													<ReferralListItem
														updatePatientVital={
															updatePatientVital
														}
														acceptPatient={() => {
															setTimeout(() => {
																hide();
															}, 100);
															acceptPatientRef.current?.show(
																{
																	...referral,
																	reading: true,
																}
															);
														}}
														referral={referral}
														key={`referral-${referral?.id}`}
														reading={true}
													/>
												);
											}
										})
									) : (
										<div className="text-center w-full py-20 font-bold text-slate-300">
											No data available.
										</div>
									)}
								</div>

								<div className="px-4 pb-3 flex items-center justify-end bg-slate-">
									{/* <ActionBtn
										type="foreground-dark"
										className="ml-auto uppercase"
										onClick={hide}
									>
										Read more...
									</ActionBtn> */}
									<ActionBtn
										type="danger"
										className="ml-4"
										onClick={hide}
									>
										CLOSE
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

export default forwardRef(ReadingListModal);

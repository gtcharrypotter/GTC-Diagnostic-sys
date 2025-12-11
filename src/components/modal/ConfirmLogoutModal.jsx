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
const ConfirmLogoutModal = (props, ref) => {
	const { logout } = props;
	const {
		register,
		getValues,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [mount, setMount] = useState(0);
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

	const show = (data) => {
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};

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
							<Dialog.Panel className="w-full lg:max-w-sm transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex items-center text-gray-900 bg-slate-100 border-b"
								>
									<span className="text-md">
										Confirm Logout
									</span>
									<span
										className="absolute right-4 flex items-center justify-center w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 duration-200 cursor-pointer text-red-600"
										onClick={hide}
									>
										<FlatIcon
											icon="rr-cross-small"
											className="text-lg pt-[2px]"
										/>
									</span>
								</Dialog.Title>
								<div className="px-4 py-11 flex flex-col gap-y-4 text-center relative">
									<p className="text-red-600 text-lg mb-0">
										Are you sure to exit and logout?
									</p>
								</div>

								<div className="px-4 py-2 flex items-center justify-end bg-slate-100 border-t">
									<ActionBtn
										type="foreground-dark"
										className="ml-auto"
										onClick={hide}
									>
										No
									</ActionBtn>
									<ActionBtn
										type="danger"
										className="ml-4"
										onClick={handleSubmit(logout)}
									>
										Yes
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

export default forwardRef(ConfirmLogoutModal);

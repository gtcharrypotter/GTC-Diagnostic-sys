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
import TextInputField from "../../../components/inputs/TextInputField";
import ReactSelectInputField from "../../../components/inputs/ReactSelectInputField";
import { geolocations, locations } from "../../../libs/geolocations";
import Axios from "../../../libs/axios";

const ActivatePersonnelModal = (props, ref) => {
	const { onSuccess } = props;
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
	const [showData, setShowData] = useState(null);
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

	const show = (propsShowData = null) => {
		setModalOpen(true);
		setTimeout(() => {
			setValue("status", "active");
		}, 200);
		setShowData(propsShowData);
	};
	const hide = () => {
		setModalOpen(false);
	};
	const nohide = () => {};

	const submit = (data) => {
		let formData = new FormData();

		formData.append("status", 1);

		let url = `v1/health-unit-personnels/activate`;

		if (showData?.id) {
			url = `v1/health-unit-personnels/activate/${showData?.id}`;
			formData.append("_method", "PATCH");
		}

		Axios.post(url, formData).then((res) => {
			setTimeout(() => {
				toast.success("Personnel activated successfully!");
				if (onSuccess) {
					onSuccess();
				}
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
							<Dialog.Panel className="w-full lg:max-w-md transform overflow-visible rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className="py-3 px-4 flex flex-col border-b "
								>
									<span className="text-xl font-bold  text-blue-900">
										Activate Personnel
									</span>
									{/* <span className="text-sm font-light text-blue-900 ">
										Complete form to{" "}
										{showData?.id
											? "update "
											: "create new "}{" "}
										Personnel
									</span> */}
								</Dialog.Title>
								<div className="px-4 pt-6 pb-11 grid grid-cols-1 gap-6 relative">
									<div
										className={`flex flex-col py-4 ${
											String(showData?.type || "")
												.toLowerCase()
												.includes("doctor")
												? "bg-yellow-100"
												: "bg-blue-50"
										}`}
									>
										<h4 className="text-lg text-center  font-bold text-black -mb-1">
											{`${showData?.title} ${showData?.name}`}
										</h4>

										<span className=" text-center font-light text-sm text-slate-700">
											{String(showData?.type || "")
												.toLowerCase()
												.includes("doctor")
												? showData?.specialty?.name
														?.length
													? showData?.specialty?.name
													: "General Practitioner"
												: showData?.type}
										</span>
									</div>
									<p className="text-lg text-green-600 text-center">
										Are you sure to deactivate{" "}
										<b className="underline">
											{showData?.name}{" "}
										</b>
										Personnel?
									</p>
								</div>

								<div className="px-4 py-4 flex items-center justify-end bg-slate- border-t">
									<ActionBtn
										type="foreground"
										className="mr-auto"
										onClick={hide}
									>
										Cancel
									</ActionBtn>
									<ActionBtn
										type="success"
										className="ml-4"
										onClick={handleSubmit(submit)}
									>
										Yes, activate!
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

export default forwardRef(ActivatePersonnelModal);

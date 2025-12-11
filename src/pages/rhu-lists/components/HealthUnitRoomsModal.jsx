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

const HealthUnitRoomsModal = (props, ref) => {
	const { onSuccess } = props;
	const [mount, setMount] = useState(0);
	const [healthUnit, setHealthUnit] = useState(null);
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

	const show = (showData = null) => {
		setModalOpen(true);
		setHealthUnit(showData);
	};
	const hide = () => {
		setModalOpen(false);
	};
	const nohide = () => {};

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
							<Dialog.Panel className="w-full lg:max-w-lg transform overflow-visible rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className="pt-4 pb-1 px-4 flex flex-col "
								>
									<span className="text-xl font-bold mb-4 text-blue-900">
										{healthUnit?.name}
									</span>
									<span className="text-sm font-light text-blue-900 ">
										Room list
									</span>
								</Dialog.Title>
								<div className="py-0 px-4 relative">
									<div className=" w-full table table-bordred">
										<table className="">
											<thead>
												<tr>
													<th>Room </th>
													<th>Type</th>
													<th>Capacity</th>
												</tr>
											</thead>
											<tbody>
												{healthUnit?.rooms?.map(
													(room) => {
														return (
															<tr
																key={`hu-room-${room?.id}`}
															>
																<td>
																	{room?.name}
																</td>
																<td>
																	{room?.type}
																</td>
																<td>
																	{
																		room?.capacity
																	}
																</td>
															</tr>
														);
													}
												)}
												{healthUnit?.rooms?.length ==
												0 ? (
													<tr>
														<td
															className="text-center italic !text-slate-300"
															colSpan={3}
														>
															No rooms available
														</td>
													</tr>
												) : (
													""
												)}
											</tbody>
										</table>
									</div>
								</div>

								<div className="px-4 py-4 flex items-center justify-end bg-slate- ">
									<ActionBtn
										type="foreground-dark"
										className="ml-auto"
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

export default forwardRef(HealthUnitRoomsModal);

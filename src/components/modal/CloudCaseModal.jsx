import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react'
import FlatIcon from '../FlatIcon';
import ActionBtn from '../buttons/ActionBtn';
import { Dialog, Transition } from '@headlessui/react';
import Axios from '../../libs/axios';
import useClinic from '../../hooks/useClinic';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const CloudCaseModal = (props, ref) => {
    const { acceptPatientRef, staticModal = true, updatePatientVital } = props;
	const {
		register,
		getValues,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { data } = useClinic();
	const [mount, setMount] = useState(0);
	const [patients, setPatients] = useState([]);
	const [count, setCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [synchronizing, setSynchronizing] = useState(false);
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
		getUnSync();
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
		setCount(0);
		setPatients([]);
	};
	const nohide = () => {};

	const getUnSync = () => {
		setLoading(true);
		Axios.get(`v1/service-done-sync`).then((res) => {
			setPatients(res.data.data);
			console.log("ervice-doneervice-doneervice-done", res.data.count);
			setCount(res.data?.count);
			setTimeout(() => {
				setLoading(false);
			}, 499);
		});
	
	};
	const syncData = () => {
		setSynchronizing(true);
		Axios.post(`v1/service-done-sync`, {
			_method: "PATCH",
		})
			.then((res) => {
				console.log("resss cloud-to-local-patient", res.data);
				setTimeout(() => {
					toast.success("Synchronization successful!");
					setSynchronizing(false);
					hide();
				}, 500);
			})
			.catch(() => {
				setSynchronizing(false);
			});
	};
  return (
    <Transition appear show={modalOpen} as={Fragment}>
			<Dialog
				as="div"
				className=""
				onClose={synchronizing ? nohide : hide}
			>
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
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-blue-100 border-b"
								>
									<span className="text-xl font-bold  text-blue-900">
										<span className="flex items-center text-blue-600 gap-2 text-lg -mb-[2px]">
											<FlatIcon
												icon="rr-network-cloud"
												className="text-base"
											/>
											Sync Appointments
										</span>
									</span>

									<span className="text-sm font-light text-blue-900 ">
										Synchonize data from cloud
									</span>

									{synchronizing ? (
										""
									) : (
										<span
											className="bg-red-600 text-white h-8 w-8 rounded-full flex items-center justify-center right-4 absolute cursor-pointer hover:bg-red-800 duration-500"
											onClick={hide}
										>
											<FlatIcon icon="rr-cross-small" />
										</span>
									)}
								</Dialog.Title>
								<div className="pb-20 px-6 pt-8 flex flex-col gap-y-6 relative duration-200">
									{count > 0 ? (
										<div className="table">
											<h4 className="font-bold">
												List of Patient(s) needs to be
												sync
											</h4>
											<table>
												<thead>
													<th className="text-center">
														#
													</th>
													<th>Patient Name</th>
												</thead>
												<tbody>
													{patients?.map(
														(patient, index) => {
															return (
																<tr
																	className="text-center"
																	key={`patient-${patient?.cloud_id}`}
																>
																	<td>
																		{index +
																			1}
																	</td>
																	<td className="text-left">
																		{patient.patient_name}
																	</td>
																</tr>
															);
														}
													)}
												</tbody>
											</table>
										</div>
									) : (
										""
									)}
									<ActionBtn
										size="xl"
										type={
											synchronizing
												? "primary-dark"
												: "danger"
										}
										className="!rounded-3xl relative"
										onClick={() => {
											if (!loading) {
												if (count > 0) syncData();
											}
										}}
									>
										{loading ? (
											<span className="flex items-center animate-pulse gap-2">
												<span className="animate-spin flex items-center justify-center text-xl">
													<FlatIcon
														icon="sr-loading"
														className="animate-pulse text-xl"
													/>
												</span>
												Fetching Data, please wait...
											</span>
										) : synchronizing ? (
											<span className="animate-pulse flex items-center gap-1">
												<span className="animate-spin flex items-center justify-center text-xl">
													<FlatIcon
														icon="sr-loading"
														className="animate-pulse text-xl"
													/>
												</span>
												Synchronizing <b>{count}</b>{" "}
												data from cloud...
											</span>
										) : count == 0 ? (
											<span>
												No data found to Synchronize.
											</span>
										) : (<>
											<span>
												Synchronize <b>{count}</b>{" "}
												appointment(s) data
											</span>
											</>
											
										)}
									</ActionBtn>
									{synchronizing ? (
										<span className="animate-pulse text-center font-light tracking-wide">
											Please wait... Clound
											synchronization in progress.
										</span>
									) : (
										""
									)}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
  )
}

export default forwardRef(CloudCaseModal)

/* eslint-disable react/prop-types */
import React, { forwardRef, Fragment, useImperativeHandle, useState } from 'react'
import ActionBtn from '../buttons/ActionBtn';
import { Dialog, Transition } from '@headlessui/react';
import { calculateAge, doctorName, doctorSpecialty, formatDate, formatDateMMDDYYYYHHIIA, keyByValue, patientFullName } from '../../libs/helpers';
import CollapseDiv from '../CollapseDiv';
import { abdomenLib, chestLib, digitalRectalLib, genitourinaryLib, heartLib, heentLib, neuroLib, skinLib } from '../../libs/appointmentOptions';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from "uuid";
import FlatIcon from '../FlatIcon';
import LaboratoryOrders from '../patient-modules/LaboratoryOrders';
import { useReactToPrint } from 'react-to-print';
import PatientImg from '../PatientImg';
const uniq_id = uuidv4();
const InfoText = ({
	className = "",
	valueClassName = "",
	label,
	icon,
	value,
}) => {
	return (
		<div className={`flex flex-col ${className}`}>
			{label ? (
				<span className="text-slate-800 text-xs capitalize mb-1">
					{label}
				</span>
			) : (
				""
			)}
			<div className="flex items-center mb-0 gap-2">
				<span className="flex items-center justify-center">
					<FlatIcon
						icon={icon || "bs-arrow-turn-down-right"}
						className="text-[10px] text-slate-600 ml-1"
					/>
				</span>
				<span
					className={`capitalize gap-1 text-slate-900 flex text-base flex-wrap ${valueClassName} `}
				>
					{value}
				</span>
			</div>
		</div>
	);
};

const ViewPastAppointmentModal = (props, ref) => {
    const { onSuccess, } = props;
	const [appointment, setAppointment] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
	const componentRef = React.useRef(null);
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
    useImperativeHandle(ref, () => ({
            show: show,
            hide: hide,
        }));
    const show = (data) => {
		setAppointment(data);
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};
	const handlePrint = useReactToPrint({
				content: () => componentRef.current,
			});
    console.log("bbbbbbbbbbbb", appointment)
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
							<Dialog.Panel className="w-full lg:max-w-6xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									<span className="text-xl text-center font-bold  text-blue-900">
										Consultation Appointment Details (Tranche 2)
									</span>
								</Dialog.Title>
                                    <div className="p-2 flex flex-col gap-4" id="phic-form-printable" ref={componentRef}>
									<div className="flex  bg-slate-50 p-4 h-full">
											<div className="group relative h-[80px] w-[80px] min-h-[80px] min-w-[80px] rounded-md aspect-square bg-background">
												<PatientImg
													type="user"
													name={`${appointment?.patient?.lastname}-${appointment?.patient?.firstname}-${appointment?.patient?.middle}`}
													src={appointment?.patient?.avatar || ""}
													className="min-h-[80px] min-w-[80px] aspect-square object-cover rounded-md"
													alt=""
													id="user-image-sample"
													key={`key-${appointment?.patient?.id}-${appointment?.patient?.avatar}`}
												/>
											</div>
											<div className="flex flex-col pl-4">
												<h6
													className={`text-left text-sm mb-1 font-semibold flex items-center capitalize ${
														String(appointment?.patient?.gender).toLowerCase() == "male"
															? "text-blue-800"
															: "text-pink-800"
													} mb-0`}
												>
													{patientFullName(appointment?.patient)}
												</h6>
												<div className="flex gap-6 mb-2">
													<div className="flex items-center gap-2 text-sm">
														<FlatIcon
															icon="rr-calendar-clock"
															className="text-sm"
														/>
														<span>
															{calculateAge(appointment?.patient?.birthday)} yrs. old
														</span>
													</div>
													<div className="flex items-center gap-2 text-sm">
														<FlatIcon
															icon="rr-calendar"
															className="text-sm"
														/>
														<span>{formatDate(appointment?.patient?.birthday)}</span>
													</div>
												</div>
												<div className="flex gap-4 mb-2">
													<div className="flex items-center gap-2 text-sm">
														<FlatIcon
															icon="rr-venus-mars"
															className="text-sm"
														/>
														{String(appointment?.patient?.gender).toLowerCase() == "male" ? (
															<span className="text-blue-700">Male</span>
														) : (
															<span className="text-pink-700">Female</span>
														)}
													</div>
												</div>
											</div>

											<div className="flex gap-4 ml-auto">
														<div className="flex flex-col items-center">
														{/* <img src="/philhealth.png"
														// alt="logo" 
														className="h-[40px] w-[40px] rounded-full " 
														/> */}
														<span className="text-gray-900 text-center text-xs font-bold">PHILHEALTH IDENTIFICATION NUMBER (PIN)</span>
														
														<span className="text-gray-900 text-center">{appointment?.patient?.philhealth?.replace(/(\d{2})(\d{9})(\d{1})/, '$1-$2-$3')}</span>
														<span className="text-gray-900 text-center text-xs font-bold">({appointment?.patient?.patient_member_phic_type})</span>
											</div>
												</div>
											
											
										</div>
										<div className="">
										<h4 className="border-y-2 text-xs font-semibold p-2">
										Consultation Details
										</h4>
										
											<div className="grid grid-cols-1 lg:grid-cols-12 gap-3 p-4">
												<InfoText
													className="lg:col-span-6"
													label="Consultation Type:"
													value={appointment?.post_notes}
												/>
												<InfoText
													className="lg:col-span-6"
													label="Chief complaint:"
													value={appointment?.pre_notes}
												/>
												<InfoText
													className="lg:col-span-6"
													label="History of present
															illness / Health problem:"
													value={appointment?.clinical_history}
												/>
												{appointment?.referredToDoctor?.name ? (
													<InfoText
														className="lg:col-span-6"
														label="Doctor:"
														value={
															<div className="flex flex-col">
																<span>
																	{doctorName(
																		appointment?.referredToDoctor
																	)}
																</span>
																<span className="text-xs font-light">
																	{doctorSpecialty(
																		appointment?.referredToDoctor
																	)}
																</span>
															</div>
														}
													/>
												) : (
													""
												)}
												<InfoText
													className="lg:col-span-6"
													label="Treatment Plan:"
													value={appointment?.treatment_plan}
												/>
												
											</div>
										</div>
									
										<div className="flex flex-col gap-2">
												<h4 className="border-y-2 text-xs font-semibold p-2">
												Pertinent Findings Per System
												</h4>
												<div className="grid grid-cols-2 lg:grid-cols-4">
												<div className="">
												<h4 className=" text-xs font-semibold p-2 mb-3 ">
												A. HEENT
												</h4>
													<div className="pl-8 ">
														{heentLib?.map((data, index) => {
														const value = appointment?.heent_libraries?.[data?.name];
	
														if (value && value !== "false" && value !== "undefined" && value !== null) {
															return (
															<span key={index} className="block text-blue">
																{data?.label || data?.name}
															</span>
															);
														}
														return null;
														})}
													</div>
												</div>
												<div className="">
												<h4 className="text-xs font-semibold p-2 mb-3 ">
												B. CHEST/BREAST/LUNGS
												</h4>
													<div className="pl-8 ">
														{chestLib?.map((data, index) => {
														const value = appointment?.chest_libraries?.[data?.name];
	
														if (value && value !== "false" && value !== "undefined" && value !== null) {
															return (
															<span key={index} className="block text-blue">
																{data?.label || data?.name}
															</span>
															);
														}
														return null;
														})}
													</div>
												</div>
												<div className="">
												<h4 className=" text-xs font-semibold p-2 mb-3 ">
												C. HEART
												</h4>
												<div className="pl-8 ">
														{heartLib?.map((data, index) => {
														const value = appointment?.heart_libraries?.[data?.name];
	
														if (value && value !== "false" && value !== "undefined" && value !== null) {
															return (
															<span key={index} className="block text-blue">
																{data?.label || data?.name}
															</span>
															);
														}
														return null;
														})}
													</div>
												</div>
												<div className="">
												<h4 className="text-xs font-semibold p-2 mb-3 ">
												D. GENITOURINARY
												</h4>
												<div className="pl-8 ">
														{genitourinaryLib?.map((data, index) => {
														const value = appointment?.genitourinary_libraries?.[data?.name];
	
														if (value && value !== "false" && value !== "undefined" && value !== null) {
															return (
															<span key={index} className="block text-blue">
																{data?.label || data?.name}
															</span>
															);
														}
														return null;
														})}
													</div>
												</div>
												<div className="">
												<h4 className="text-xs font-semibold p-2 mb-3 ">
												E. DIGITAL RECTAL EXAMINATION
												</h4>
												<div className="pl-8 ">
														{digitalRectalLib?.map((data, index) => {
														const value = appointment?.digital_rectal_libraries?.[data?.name];
	
														if (value && value !== "false" && value !== "undefined" && value !== null) {
															return (
															<span key={index} className="block text-blue">
																{data?.label || data?.name}
															</span>
															);
														}
														return null;
														})}
													</div>
												</div>
												<div className="">
												<h4 className="text-xs font-semibold p-2 mb-3 ">
												F. SKIN/EXTREMITIES
												</h4>
												<div className="pl-8 ">
														{skinLib?.map((data, index) => {
														const value = appointment?.skin_libraries?.[data?.name];
	
														if (value && value !== "false" && value !== "undefined" && value !== null) {
															return (
															<span key={index} className="block text-blue">
																{data?.label || data?.name}
															</span>
															);
														}
														return null;
														})}
													</div>
												</div>
												<div className="">
												<h4 className="text-xs font-semibold p-2 mb-3 ">
												G. ABDOMEN
												</h4>
												<div className="pl-8 ">
														{abdomenLib?.map((data, index) => {
														const value = appointment?.abdomen_libraries?.[data?.name];
	
														if (value && value !== "false" && value !== "undefined" && value !== null) {
															return (
															<span key={index} className="block text-blue">
																{data?.label || data?.name}
															</span>
															);
														}
														return null;
														})}
													</div>
												</div>
												<div className="">
												<h4 className="text-xs font-semibold p-2 mb-3 ">
												H. NEUROLOGY
												</h4>
												<div className="pl-8 ">
														{neuroLib?.map((data, index) => {
														const value = appointment?.neuro_libraries?.[data?.name];
	
														if (value && value !== "false" && value !== "undefined" && value !== null) {
															return (
															<span key={index} className="block text-blue">
																{data?.label || data?.name}
															</span>
															);
														}
														return null;
														})}
													</div>
												</div>
												</div>
											</div>
                                    <CollapseDiv
										defaultOpen={true}
										withCaret={true}
										title="Diagnostic Test Results"
										headerClassName={`bg-blue-50`}
										bodyClassName="p-0"
									>
										<LaboratoryOrders
											showTitle={false}
											patient={appointment?.patient}
											laboratory_test_type={"all"}
											appointment={appointment}
											allowCreate={false}
										/>
									</CollapseDiv>
									<CollapseDiv
										defaultOpen={true}
										withCaret={true}
										title="Prescriptions"
										headerClassName={`bg-blue-50`}
										bodyClassName="p-0"
									>
										<>
											<div className="table w-full">
												<table>
													<thead>
														<tr>
															<th>Item Code</th>
															<th>Item Information</th>
															<th className="text-center">Qty</th>
															<th>Unit</th>
														</tr>
													</thead>
													<tbody>
														{appointment?.prescriptions?.map((item) => {
															return (
																<>
																	<tr key={`opri-${item?.id}`}>
																		<td>{item?.item?.code}</td>
																		<td>{item?.item?.name}</td>
																		<td className="text-center">
																			{item?.quantity}
																		</td>
																		<td>{item?.item?.unit_measurement}</td>
																	</tr>
																	<tr>
																		
																	</tr>
																</>
															);
														})}
													</tbody>
												</table>
											</div>
										</>
									</CollapseDiv>
                                    </div>
                              

								<div className="px-4 py-4 border-t flex items-center justify-end bg-slate-">
									<ActionBtn
										// size="lg"
										type="primary"
										// loading={saving}
										className="px-5 ml-auto"
										onClick={handlePrint}
									>
										PRINT
									</ActionBtn>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
  )
}

export default forwardRef(ViewPastAppointmentModal)

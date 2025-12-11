/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import React, { forwardRef, Fragment, useImperativeHandle, useState } from 'react'
import ActionBtn from '../buttons/ActionBtn';
import { Dialog, Transition } from '@headlessui/react';
import HealthAssessment from '../HealthAssessment';
import { abdomenLib, alcoholHist, chestLib, digitalRectalLib, drugsHist, familyHistory, genitourinaryLib, heartLib, heentLib, immunizationAdult, immunizationChildren, immunizationElder, immunizationPregnant, medicalSurgicalHistories, neuroLib, sexualHist, skinLib, smokingHist } from '../../libs/appointmentOptions';
import { calculateAge, formatDate, keyByValue, patientFullName } from '../../libs/helpers';
import PatientImg from '../PatientImg';
import FlatIcon from '../FlatIcon';
import { useReactToPrint } from 'react-to-print';
const Card = ({ title, children, icon, color }) => {
	return (
		<div className="shadow-sm rounded-xl flex items-center p-3 w-1/2 xl:w-[calc(100%/3-24px)] border-[0.5px] border-blue-300">
			<div className="flex flex-col pb-3">
				<h3
					className="text-xs font-semibold text-gray-900 mb-0 text-opacity-75"
					style={{ color: color }}
				>
					{title}
				</h3>
				<div className="h-[3px] w-4/5 bg-blue-300 mb-[1px]" />
				<div className="h-[2px] w-2/5 bg-red-300 mb-3" />
				{children}
			</div>
			<div className="p-1 bg-white bg-opacity-5 rounded-xl ml-auto">
				<img
					src={`/vitals/${icon}.png`}
					className="w-10 object-contain"
				/>
			</div>
		</div>
	);
};

const ViewScreeningModal = (props, ref) => {
    const { patient } = props;
    const [modalOpen, setModalOpen] = useState(false);
	const componentRef = React.useRef(null);
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
		const handlePrint = useReactToPrint({
			content: () => componentRef.current,
		});
		console.log("ccccccccccccc", patient)
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
										Health Screening Assessment (Tranche 1)
									</span>
								</Dialog.Title>
									<>
									<div className="bg-white p-4" id="phic-form-printable" ref={componentRef}>
										<div className="flex  bg-slate-50 p-4 h-full">
											<div className="group relative h-[80px] w-[80px] min-h-[80px] min-w-[80px] rounded-md aspect-square bg-background">
												<PatientImg
													type="user"
													name={`${patient?.lastname}-${patient?.firstname}-${patient?.middle}`}
													src={patient?.avatar || ""}
													className="min-h-[80px] min-w-[80px] aspect-square object-cover rounded-md"
													alt=""
													id="user-image-sample"
													key={`key-${patient?.id}-${patient?.avatar}`}
												/>
											</div>
											<div className="flex flex-col pl-4">
												<h6
													className={`text-left text-sm mb-1 font-semibold flex items-center capitalize ${
														String(patient?.gender).toLowerCase() == "male"
															? "text-blue-800"
															: "text-pink-800"
													} mb-0`}
												>
													{patientFullName(patient)}
												</h6>
												<div className="flex gap-6 mb-2">
													<div className="flex items-center gap-2 text-sm">
														<FlatIcon
															icon="rr-calendar-clock"
															className="text-sm"
														/>
														<span>
															{calculateAge(patient?.birthday)} yrs. old
														</span>
													</div>
													<div className="flex items-center gap-2 text-sm">
														<FlatIcon
															icon="rr-calendar"
															className="text-sm"
														/>
														<span>{formatDate(patient?.birthday)}</span>
													</div>
												</div>
												<div className="flex gap-4 mb-2">
													<div className="flex items-center gap-2 text-sm">
														<FlatIcon
															icon="rr-venus-mars"
															className="text-sm"
														/>
														{String(patient?.gender).toLowerCase() == "male" ? (
															<span className="text-blue-700">Male</span>
														) : (
															<span className="text-pink-700">Female</span>
														)}
													</div>
												</div>
											</div>

											<div className="flex gap-4 ml-auto">
														<div className="flex flex-col items-center">
														<span className="text-gray-900 text-center text-xs font-bold">PHILHEALTH IDENTIFICATION NUMBER (PIN)</span>
														
														<span className="text-gray-900 text-center">{patient?.philhealth?.replace(/(\d{2})(\d{9})(\d{1})/, '$1-$2-$3')}</span>
														<span className="text-gray-900 text-center text-xs font-bold">({patient?.patient_member_phic_type})</span>
											</div>
												</div>
											
											
										</div>
										<div className="p-2 gap-4 grid grid-cols-2 lg:grid-cols-2 ">
										<div className="flex flex-col gap-2">
											<h4 className="border-y-2 text-xs font-semibold p-2">
												Medical Surgical History
											</h4>
											<div className="pl-8 ">
											{medicalSurgicalHistories?.map((data, index) => {
											const value = patient?.surgical_history?.[data?.name];

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
										<div className="flex flex-col gap-2">
											<h4 className="border-y-2 text-xs font-semibold p-2">
												Family & Personal History
											</h4>
											<div className="pl-8 ">
											{familyHistory?.map((data, index) => {
											const value = patient?.family_history?.[data?.name];

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
										<div className="flex flex-col gap-2">
											<h4 className="border-y-2 text-xs font-semibold p-2">
											Personal/Social History
											</h4>
											{/* SMOKING */}
											<div>
												<span className="text-blue-600 text-sm font-bold px-2">Smoking</span>
												<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
												{smokingHist?.map((data) => (
													<label
													key={keyByValue(data?.label)}
													className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600"
													>
													<input
														type="radio"
														value={data?.label}
														checked={
														patient?.social_history?.smoker === data?.label
														}
														readOnly
														
													/>
													<span>{data?.label}</span>
													</label>
												))}
												</div>
											</div>

											{/* ALCOHOL */}
											<div>
												<span className="text-blue-600 text-sm font-bold px-2">Alcohol</span>
												<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
												{alcoholHist?.map((data) => (
													<label
													key={keyByValue(data?.label)}
													className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600"
													>
													<input
														type="radio"
														value={data?.label}
														checked={
														patient?.social_history?.alcohol_drinker === data?.label
														}
														readOnly
													
													/>
													<span>{data?.label}</span>
													</label>
												))}
												</div>
											</div>

											{/* DRUGS */}
											<div>
												<span className="text-blue-600 text-sm font-bold px-2">Ilicit Drugs</span>
												<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
												{drugsHist?.map((data) => (
													<label
													key={keyByValue(data?.label)}
													className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600"
													>
													<input
														type="radio"
														value={data?.label}
														checked={
														patient?.social_history?.drug_user === data?.label
														}
														readOnly
														
													/>
													<span>{data?.label}</span>
													</label>
												))}
												</div>
											</div>

											{/* SEXUAL HISTORY */}
											<div>
												<span className="text-blue-600 text-sm font-bold px-2">
												Sexual History Screening
												</span>
												<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
												{sexualHist?.map((data) => (
													<label
													key={keyByValue(data?.label)}
													className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600"
													>
													<input
														type="radio"
														value={data?.label}
														checked={
														patient?.social_history?.sexually_active === data?.label
														}
														readOnly
													
													/>
													<span>{data?.label}</span>
													</label>
												))}
												</div>
											</div>
										
										</div>
										<div className="flex flex-col gap-2">
											<h4 className="border-y-2 text-xs font-semibold p-2">
												Immunization
											</h4>
											<div className="flex flex-col gap-4">
												<div className="">
													<span className='font-semibold'>Child</span>
													<div className="pl-8 ">
														{immunizationChildren?.map((data, index) => {
														const value = patient?.immunization_child?.[data?.name];

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
													<span className='font-semibold'>Adult</span>
													<div className="pl-8 ">
														{immunizationAdult?.map((data, index) => {
														const value = patient?.immunization_adult?.[data?.name];

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
													<span className='font-semibold'>Elder</span>
													<div className="pl-8 ">
														{immunizationElder?.map((data, index) => {
														const value = patient?.immunization_elder?.[data?.name];

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
													<span className='font-semibold'>Pregnant</span>
													<div className="pl-8 ">
														{immunizationPregnant?.map((data, index) => {
														const value = patient?.immunization_pregnant?.[data?.name];

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
										{patient?.gender == "Female" ? (
											<div className="flex flex-col gap-2">
											<h4 className="border-y-2 text-xs font-semibold p-2">
											OB-Gyne History
											</h4>
											<div className="grid grid-cols-2 lg:grid-cols-2">
											<div className="">
											<h4 className="border-y-2 text-xs font-semibold p-2 mb-3 ">
												Family Planning
											</h4>
											</div>
											<div className="">
											<h4 className="border-y-2 text-xs font-semibold p-2 mb-3 ">
												Menstrual History
											</h4>
											</div>
											</div>
										</div>

										): (
											""
										)}
										<div className="flex flex-col gap-2">
											<h4 className="border-y-2 text-xs font-semibold p-2">
											Pertinent Findings Per System
											</h4>
											<div className="flex flex-col">
											<div className="">
											<h4 className=" text-xs font-semibold p-2 mb-3 ">
											A. HEENT
											</h4>
												<div className="pl-8 ">
													{heentLib?.map((data, index) => {
													const value = patient?.heent_libraries?.[data?.name];

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
													const value = patient?.chest_libraries?.[data?.name];

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
													const value = patient?.heart_libraries?.[data?.name];

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
													const value = patient?.genitourinary_libraries?.[data?.name];

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
													const value = patient?.digital_rectal_libraries?.[data?.name];

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
													const value = patient?.skin_libraries?.[data?.name];

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
													const value = patient?.abdomen_libraries?.[data?.name];

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
													const value = patient?.neuro_libraries?.[data?.name];

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
                                        <div className="flex flex-col gap-2">
										<h4 className="border-y-2 text-xs font-semibold p-2">
										Vital Signs
										</h4>
										<div className="flex items-start justify-start flex-wrap gap-6 pb-11 w-full px-0">
											<Card
												color="black"
												title="Blood Pressure"
												icon="blood-pressure"
											>
												<div className="flex flex-col items-center gap-2">
													<div className="">
													<b className="text-xs text-darker">
														{patient?.blood_systolic}
													</b>
													<span className="text-xs text-placeholder">
														/
													</span>
													<b className="text-xs text-darker">
														{patient?.blood_diastolic}
													</b>
													</div>
													<span className="text-placeholder text-xs">
														mmHG
													</span>
												</div>
											</Card>
											<Card color="red" title="Heart Rate" icon="heart-rate">
												<div className="flex items-center gap-2">
													<b className="text-xs text-darker">
														{patient?.pulse}
													</b>
													<span className="text-placeholder text-xs">
														bpm
													</span>
												</div>
											</Card>
											<Card
												color="blue"
												title="Respiratory Rate"
												icon="respiration"
											>
												<div className="flex items-center gap-2">
													<b className="text-xs text-darker">
														{patient?.respiratory}
													</b>
													<span className="text-placeholder text-xs">
														bpm
													</span>
												</div>
											</Card>
											<Card
												color="darkorange"
												title="Temperature"
												icon="temperature-celcius"
											>
												<div className="flex items-center gap-2">
													<b className="text-xs text-darker">
														{patient?.temperature}
													</b>
													<span className="text-placeholder text-xs">
														°C
													</span>
												</div>
											</Card>
											<Card color="green" title="Height" icon="height">
												<div className="flex items-center gap-2">
													<b className="text-xs text-darker">
														{patient?.height}
													</b>
													<span className="text-placeholder text-xs">
														cm
													</span>
												</div>
											</Card>
											<Card color="brown" title="Weight" icon="weight">
												<div className="flex items-center gap-2">
													<b className="text-xs text-darker">
														{patient?.weight}
													</b>
													<span className="text-placeholder text-xs">
														kg
													</span>
												</div>
											</Card>
											<Card color="blue" title="BMI" icon="weight">
												<div className="flex items-center gap-2">
													<b className="text-xs text-darker">{patient?.bmi}</b>
													<span className="text-placeholder text-xs"></span>
												</div>
											</Card>
											<Card color="red" title="Covid 19" icon="swab">
												<div className="flex items-center gap-2">
													<b className="text-xs text-darker">
														{patient?.covid_19}
													</b>
													<span className="text-placeholder text-xs"></span>
												</div>
											</Card>
											<Card
												color="orange"
												title="Tubercolosis"
												icon="mycobacterium-tuberculosis"
											>
												<div className="flex items-center gap-2">
													<b className="text-xs text-darker">{patient?.tuberculosis}</b>
													<span className="text-placeholder text-xs"></span>
												</div>
											</Card>
											<Card color="red" title="Blood Type" icon="blood-donation">
												<div className="flex items-center gap-2">
													<b className="text-xs text-darker">
														{patient?.blood_type == "undefined"
															? "N/A"
															: patient?.blood_type || "-"}
													</b>
													<span className="text-placeholder text-xs"></span>
												</div>
											</Card>
										</div>
										</div>
                                    	</div>
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
									</>
                                    

							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
  )
}

export default forwardRef(ViewScreeningModal)

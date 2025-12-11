import React, { Fragment, forwardRef, useImperativeHandle, useState } from 'react'
import ActionBtn from '../../../../../../components/buttons/ActionBtn';
import { Dialog, Transition } from '@headlessui/react';
import FlatIcon from '../../../../../../components/FlatIcon';
import TabGroup from '../../../../../../components/TabGroup';
import MenuTitle from '../../../../../../components/buttons/MenuTitle';
import PMRF from '../PMRF';
import ClaimForm1 from '../ClaimForm1';
import ClaimForm2 from '../ClaimForm2';
import ClaimForm3 from '../ClaimForm3';
import ClaimForm4 from '../ClaimForm4';
import PBEF from '../PBEF';
import Billing from '../../Billing';
import LaboratoryFinalReport from '../../../../../../components/patient-modules/LaboratoryFinalReport';
import ImagingFinalReport from '../../../../../../components/patient-modules/ImagingFinalReport';

const ClaimsFormFullscreenModal = (props, ref) => {
	const { patients, pendingOrdersRef } = props;
	const [patient, setPatient] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));
	const show = (data) => {
		setPatient(data?.patient);
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};
	const noHide = () => {};
  return (
    <Transition appear show={modalOpen} as={Fragment}>
			<Dialog as="div" className="" onClose={noHide}>
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
							<Dialog.Panel
								className={`w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all `}
							>
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex relative flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									<span className="text-xl text-left font-bold  text-blue-900">
										CLAIMS
									</span>
									
									<ActionBtn
										type="danger"
										size="sm"
										className="absolute top-4 right-4 "
										onClick={hide}
									>
										<FlatIcon icon="br-cross-small" /> Close
									</ActionBtn>
								</Dialog.Title>
								<div className="flex flex-col gap-y-4 relative min-h-[calc(100dvh-152px)]">
									<TabGroup
								tabClassName={`py-3 bg-slate-100 border-b`}
												contentClassName={
													"max-h-[unset]"
												}
												contents={[
													{
														title: (
															<MenuTitle src="/profile.png">
																PMRF
															</MenuTitle>
														),
														
														// content: (
														// 	<AppointmentData
														// 		appointment={
														// 			showData
														// 		}
														// 		mutateAll={() => {
														// 			mutateAll();
														// 			hide();
														// 		}}
														// 		patient={
														// 			patient
														// 		}
														// 	/>
														// ),
														content: (
														<PMRF
															patient={patient}
														/>
													),
													},
													{
														title: (
															<MenuTitle src="/profile.png">
																Claim Form
															</MenuTitle>
														),

														// content: (
														// 	<PatientProfileDetails
														// 		patient={
														// 			patient
														// 		}
														// 	/>
														// ),
														content: (
														<ClaimForm1
															patient={patient}
														/>
													),
													},

													{
														title: (
															<MenuTitle src="/patient.png">
																Claim Form 2
															</MenuTitle>
														),
														// content: (
														// 	<PatientPrescriptions
														// 		patient={
														// 			patient
														// 		}
														// 	/>
														// ),
														content: (
														<ClaimForm2
															patient={patient}
														/>
													),
													},
													{
														title: (
															<MenuTitle src="/vitals/vitals.png">
																Claim Form 3
															</MenuTitle>
														),

														// content: (
														// 	<PatientVitalCharts
														// 		patient={
														// 			patient
														// 		}
														// 	/>
														// ),
														content: (
														<ClaimForm3
															patient={patient}
														/>
													),
													},
													{
														title: (
															<MenuTitle src="/healthcare.png">
																Claim Form 4
															</MenuTitle>
														),
													// 	content: (
													// 		<RhuReleasing
													// 			patient={patient}
													// 			setPatient={setPatient}
													// 		/>
													// 	),
													content: (
														<ClaimForm4
															patient={patient}
														/>
													),
													},
													{
														title: (
															<MenuTitle src="/healthcare.png">
																PBEF
															</MenuTitle>
														),
													// 	content: (
													// 		<RhuReleasing
													// 			patient={patient}
													// 			setPatient={setPatient}
													// 		/>
													// 	),
													content: (
														<PBEF
														patient={patient}
														/>
													),
													},
													{
														title: (
															<MenuTitle src="/healthcare.png">
																SOA
															</MenuTitle>
														),
													// 	content: (
													// 		<RhuReleasing
													// 			patient={patient}
													// 			setPatient={setPatient}
													// 		/>
													// 	),
													content: (
														<Billing
														patient={patient}
														/>
													),
													},
								]}
								/>
								</div>

								<div className="px-4 py-3 border-t flex items-center justify-end bg-slate-">
									<ActionBtn 
									type="danger" 
									className="px-5" 
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
  )
}

export default forwardRef(ClaimsFormFullscreenModal)

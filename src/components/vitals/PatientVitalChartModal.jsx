import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import GlucoseChart from './GlucoseChart';
import TemperatureChart from './TemperatureChart';
import RespirationChart from './RespirationChart';
import BloodPressureChart from './BloodPressureChart';
import PulseChart from './PulseChart';
import TabGroupHorizontal from '../TabGroupHorizontal';
import ContentTitle from '../buttons/ContentTitle';

const PatientVitalChartModal = (props, ref) => {
    const { title, children, patient, allowCreate, onSuccessCallBack } = props;
    const createPrescriptionRef = useRef(null);
	const selecItemRef = useRef(null);
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
    console.log("PAtient vitallllssssss", patient)
    const show = (showData = null) => {
		setModalOpen(true);
		// setTimeout(() => {
		// 	setValue("status", "active");
		// 	setValue("type", "RHU");

		// 	if (showData?.id) {
		// 		setValue("name", showData?.name);
		// 		setValue("type", showData?.type);
		// 		setValue("region", showData?.region);
		// 		setValue("province", showData?.province);
		// 		setValue("municipality", showData?.municipality);
		// 		setValue("barangay", showData?.barangay);
		// 		setValue("status", showData?.status);
		// 	}
		// }, 500);
		// setHealthUnit(showData);
	};
	const hide = () => {
		setModalOpen(false);
	};
    const nohide = () => {};
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
							<Dialog.Panel className="w-auto transform overflow-visible rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className="py-3 px-4 flex flex-col border-b "
								>
									<span className="text-xl font-bold  text-blue-900">
										VIEW VITALS
									</span>
									
								</Dialog.Title>
								<div className="px-4 pt-5 pb-6 grid grid-cols-1 gap-2 relative">
								<div className="flex flex-col items-start">
			<ContentTitle title="Patient Vital Charts"></ContentTitle>
			<div>
				<TabGroupHorizontal
					contentClassName={"max-h "}
					contents={[
						{
							title: (
								<>
									<img
										src="/vitals/bp.png"
										className="w-6 h-6 object-contain mr-2"
									/>
									Blood Pressure
								</>
							),
							content: (
								<div className="flex flex-col w-full relative">
									<h3 className="font-bold px-4 flex items-center gap-3 relative mb-3 text-2xl">
										<img
											src="/vitals/bp.png"
											className="w-11 h-11 object-contain"
										/>
										Blood Pressure
									</h3>

									<BloodPressureChart
										patient={patient}
										w={512}
										h={384}
									/>
								</div>
							),
						},
						{
							title: (
								<>
									<img
										src="/vitals/heart-rate.png"
										className="w-6 h-6 object-contain mr-2"
									/>
									Heart Rate
								</>
							),
							content: (
								<div className="flex flex-col w-full relative">
									<h3 className="font-bold px-4 flex items-center gap-3 relative mb-3 text-2xl">
										<img
											src="/vitals/heart-rate.png"
											className="w-11 h-11 object-contain"
										/>
										Heart Rate
									</h3>

									<PulseChart
										patient={patient}
										w={512}
										h={384}
									/>
								</div>
							),
						},
						{
							title: (
								<>
									<img
										src="/vitals/respiration.png"
										className="w-6 h-6 object-contain mr-2"
									/>
									Respiratory Rate
								</>
							),
							content: (
								<div className="flex flex-col w-full relative">
									<h3 className="font-bold px-4 flex items-center gap-3 relative mb-3 text-2xl">
										<img
											src="/vitals/respiration.png"
											className="w-11 h-11 object-contain"
										/>
										Respiratory Rate
									</h3>

									<RespirationChart
										patient={patient}
										w={512}
										h={384}
									/>
								</div>
							),
						},
						{
							title: (
								<>
									<img
										src="/vitals/temperature-celcius.png"
										className="w-6 h-6 object-contain mr-2"
									/>
									Temperature
								</>
							),
							content: (
								<div className="flex flex-col w-full relative">
									<h3 className="font-bold px-4 flex items-center gap-3 relative mb-3 text-2xl">
										<img
											src="/vitals/temperature-celcius.png"
											className="w-11 h-11 object-contain"
										/>
										Temperature
									</h3>

									<TemperatureChart
										patient={patient}
										w={512}
										h={384}
									/>
								</div>
							),
						},
						{
							title: (
								<>
									<img
										src="/vitals/glucose.png"
										className="w-6 h-6 object-contain mr-2"
									/>
									Glucose
								</>
							),
							content: (
								<div className="flex flex-col w-full relative">
									<h3 className="font-bold px-4 flex items-center gap-3 relative mb-3 text-2xl">
										<img
											src="/vitals/glucose.png"
											className="w-11 h-11 object-contain"
										/>
										Glucose Levels
									</h3>

									<GlucoseChart
										patient={patient}
										w={512}
										h={384}
									/>
								</div>
							),
						},
					]}
				/>
			</div>
		</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
  )
}

export default forwardRef(PatientVitalChartModal)

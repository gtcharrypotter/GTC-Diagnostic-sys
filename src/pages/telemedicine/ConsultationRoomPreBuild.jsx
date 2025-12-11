import React, { useEffect, useRef, useState } from 'react'
import { dateToday, doctorName, patientFullName } from '../../libs/helpers';
import { useAuth } from '../../hooks/useAuth';
import Tippy from '@tippyjs/react';
import { HMSPrebuilt } from '@100mslive/roomkit-react';
import AppointmentViewPatientProfileModal from '../../components/modal/AppointmentViewPatientProfileModal';

const ConsultationRoomPreBuild = ({ patient, hide, roomCode }) => {
    const { user } = useAuth();
	const [today, setToday] = useState(dateToday());
	const hideLogo = () => {
		if (document.querySelector("[alt='Brand Logo']")) {
			document.querySelector("[alt='Brand Logo']").hidden = true;
		}
	};
	const viewPatientProfileRef = useRef(null);
	useEffect(() => {
		setTimeout(() => {
			hideLogo();
		}, 1000);
		setTimeout(() => {
			hideLogo();
		}, 2000);
		setTimeout(() => {
			hideLogo();
		}, 3000);
		setTimeout(() => {
			hideLogo();
		}, 4000);
		setTimeout(() => {
			hideLogo();
		}, 10000);
		let si = null;
		let t = setTimeout(() => {
			si = setInterval(() => {
				setToday(dateToday());
			}, 5000);
		}, 1000);
		return () => {
			clearTimeout(t);
			if (si) {
				clearInterval(si);
			}
		};
	}, []);
  return (
    <>
			<div style={{ height: "95vh" }}>
				<div className="fixed top-0 h-20 w-full bg-black z-[20000] flex items-center  gap-4 lg:px-10 px-3">
					<img
						src="/logo.png"
						alt="logo"
						className="h-[50px] w-[50px] rounded-full"
					/>
					<span className="text-white text-lg font-bold">
						GTC Consultation Room (HOST)
					</span>
					<span className="text-white text-lg font-bold mx-2">|</span>
					<Tippy content="click to view patient profile">
						<span
							className="text-white text-lg font-bold cursor-pointer hover:text-blue-300 duration-100"
							onClick={() => {
								viewPatientProfileRef.current.show(patient);
							}}
						>
							{patientFullName(patient)} (PATIENT)
						</span>
					</Tippy>
					<div className="ml-auto text-white">{dateToday()}</div>
				</div>

				<HMSPrebuilt
					roomCode={roomCode}
					options={{
						userName: doctorName(user),
					}}
					onLeave={() => {
						console.log("on leave");
						hide();
					}}
					config={{
						autoJoin: true,
						rememberDeviceSelection: true,
					}}
				/>
			</div>
			<AppointmentViewPatientProfileModal ref={viewPatientProfileRef} />
		</>
  )
}

export default ConsultationRoomPreBuild

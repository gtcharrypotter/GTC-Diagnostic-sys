import { useState } from "react";
import "../..//App.css";
import AgoraUIKit from "agora-react-uikit";
import AppLayout from "../../components/container/AppLayout";
import { Link } from "react-router-dom";
import ActionBtn from "../../components/buttons/ActionBtn";

function PatientConsultation() {
	const [count, setCount] = useState(0);
	const [videoCall, setVideoCall] = useState(false);

	const rtcProps = {
		appId: "998ff26bfd694dbea8d02fcef59ed16b",
		channel: "Test",
		role: "host",
		uid: "PATIENT",
		token: "007eJxTYCh3KWXilOl7HNrgZaZ1vcPZbm7d7dalE14uc5SVSBJdoq3AYGlpkZZmZJaUlmJmaZKSlJpokWJglJacmmZqmZpiaJbUqeCd2hDIyFD1roSZkQECQXwWhpDU4hIGBgCfDh2y", // enter your channel token as a string
	};
	const callbacks = {
		EndCall: () => setVideoCall(false),
	};

	return (
		<div className="h-[100dvh] w-screen">
			<div className="bg-primary">
				<div className="h-[64px] w-full bg-primary-dark bg-opacity-60 flex items-center z-10 px-5">
					<div className=" flex items-center">
						<Link to="/consultation" className=" cursor-pointer ">
							<div className="h-[44px] flex gap-1 items-center mr-auto">
								<img
									src="/logo.png"
									alt="logo"
									className="h-[44px] w-[44px]"
								/>
								<span
									className="text-xl font- text-white tracking-wider"
									// style={{ textShadow: "1px 1px 2px black" }}
								>
									GTC Teleconsult
								</span>
							</div>
						</Link>
					</div>
					<span className="ml-auto text-white">GTC PATIENT</span>
				</div>
			</div>
			{videoCall ? (
				<div
					className="bg-slate-600 p-[2px] h-[calc(100dvh-64px)] w-full"
					style={{
						display: "flex",
					}}
				>
					<AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
				</div>
			) : (
				<div className="flex  flex-col p-11  gap-2">
					<ActionBtn
						onClick={() => {
							setVideoCall(true);
						}}
						className="max-w-[148px] mr-auto !p-4"
					>
						Join Consultation
					</ActionBtn>
					<h1 className="text-sm text-slate-400">
						Click to join teleconsult...
					</h1>
				</div>
			)}
		</div>
	);
}

export default PatientConsultation;

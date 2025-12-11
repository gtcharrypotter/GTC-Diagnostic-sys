import { useState } from "react";
import "./App.css";
import FlatIcon from "./components/FlatIcon";
import HomeMenuBtn from "./components/buttons/HomeMenuBtn";
import LayoutContainer from "./components/container/LayoutContainer";
import Header from "./components/layout/Header";
import PageHeader from "./components/layout/PageHeader";
import AgoraUIKit from "agora-react-uikit";
import AppLayout from "./components/container/AppLayout";
import ActionBtn from "./components/buttons/ActionBtn";
import { useLocation } from "react-router-dom";
import "tippy.js/dist/tippy.css"; // optional
import Tippy from "@tippyjs/react/headless"; // different import path!




function App() {
	const origin = window?.location?.origin || "";
	console.log("looooccc", location);
	const [linkURl, setLinkURL] = useState(
		`${origin}/consultation?channel=Test&token=007eJxTYCh3KWXilOl7HNrgZaZ1vcPZbm7d7dalE14uc5SVSBJdoq3AYGlpkZZmZJaUlmJmaZKSlJpokWJglJacmmZqmZpiaJbUqeCd2hDIyFD1roSZkQECQXwWhpDU4hIGBgCfDh2y`
	);
	const [showLink, setShowLink] = useState(0);
	const [videoCall, setVideoCall] = useState(false);

	const rtcProps = {
		appId: "998ff26bfd694dbea8d02fcef59ed16b",
		channel: "Test",
		role: "host",
		uid: "DOCTOR",
		token: "007eJxTYCh3KWXilOl7HNrgZaZ1vcPZbm7d7dalE14uc5SVSBJdoq3AYGlpkZZmZJaUlmJmaZKSlJpokWJglJacmmZqmZpiaJbUqeCd2hDIyFD1roSZkQECQXwWhpDU4hIGBgCfDh2y", // enter your channel token as a string
	};
	const callbacks = {
		EndCall: () => setVideoCall(false),
	};

	return (
		<AppLayout>
			{videoCall ? (
				""
			) : (
				<PageHeader
					title="Teleconsult"
					icon="rr-camera"
				></PageHeader>
			)}
			<div className="">
				{videoCall ? (
					<div
						className="bg-slate-600 p-[2px] h-[calc(100vh-64px)] w-full"
						style={{
							display: "flex",
						}}
					>
						<AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
					</div>
				) : showLink ? (
					<div className="p-11 ">
						<h1 className="text-lg text-slate-500 mb-4">
							Teleconsult link...
						</h1>
						<span
							style={{
								display: "inline-block",
								overflow: "hidden",
								whiteSpace: "wrap",
							}}
							className="text- mb-4 p-4 select-all rounded-xl max-w-[100%] break-all bg-blue-50"
						>
							{linkURl}
						</span>
						<ActionBtn
							onClick={() => {
								setVideoCall(true);
							}}
							className="max-w-[256px] mx-auto !p-4"
						>
							Start Teleconsult
						</ActionBtn>
					</div>
				) : (
					<div className="flex  flex-col p-11  gap-2">
						<ActionBtn
							onClick={() => {
								setShowLink(true);
							}}
							className="max-w-[128px] mr-auto !p-4"
						>
							Generate Link
						</ActionBtn>
						<h1 className="text-sm text-slate-400">
							Click to generate teleconsult link...
						</h1>
					</div>
				)}
			</div>
			{/* <div className="tele-bg absolute top-0 left-0 h-full w-full z-[-1] opacity-60"></div> */}
		</AppLayout>
	);
}

export default App;

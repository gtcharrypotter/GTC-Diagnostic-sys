import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import Login from "./pages/auth/login.jsx";
import Patients from "./pages/patients/Patients.jsx";
import axios from "./libs/axios.js";
import { getStorage } from "./libs/storage";
import { toast } from "react-toastify";
import MyAccount from "./pages/my-account/MyAccount.jsx";
import "tippy.js/dist/tippy.css"; // optional
import Root from "./Root.jsx";
import AppRoutes from "./AppRoutes.jsx";
import DoctorSpecialties from "./pages/doctor-specialties/DoctorSpecialties.jsx";
import LaboratoryTests from "./pages/laboratory-tests/LaboratoryTests.jsx";
import DoctorPatientQueue from "./pages/doctor-patient-queue/DoctorPatientQueue.jsx";
import PatientLabQueue from "./pages/patient-lab-queue/PatientLabQueue.jsx";
import Error404 from "./Error404.jsx";
import PatientPharmacyQueue from "./pages/patient-pharmacy-queue/PatientPharmacyQueue.jsx";
import Consignments from "./pages/consignments/Consignments.jsx";
import Pusher from 'pusher-js';
import PatientImagingQueue from "./pages/patient-imaging-queue/PatientImagingQueue.jsx";
import PharmacyInventories from "./pages/inventories/PharmacyInventories.jsx";
import PatientLabReport from "./pages/patients/PatientLabReport.jsx";
import OPDPatientQueue from "./pages/opd-standalone/OPDPatientQueue.jsx";
import PatientCashierQueue from "./pages/patient-queue/PatientCashierQueue.jsx";
import ConsultationRoomPreBuild from "./pages/telemedicine/ConsultationRoomPreBuild.jsx";
import Appointments from "./pages/appointments/Appointments.jsx";
import PatientImgReport from "./pages/patients/PatientImgReport.jsx";
import DashboardCensus from "./pages/DashboardCensus.jsx";
import KonsultaDecryptData from "./pages/eclaims/KonsultaDecryptData.jsx";
import HSATransmittal from "./pages/eclaims/HSATransmittal.jsx";
import ConsultationTransmittal from "./pages/eclaims/ConsultationTransmittal.jsx";
import PhilhealthData from "./pages/eclaims/PhilhealthData.jsx";
import SAPersonnels from "./pages/sa-personnels/SAPersonnels.jsx";
import KonsultaTransmittal from "./pages/eKonsulta/KonsultaTransmittal.jsx";
import PatientReferredList from "./pages/patient-referrals/PatientReferredList.jsx";
import PathologyQueue from "./pages/opd-standalone/pathology/PathologyQueue.jsx";
import RadiologyQueue from "./pages/opd-standalone/radiology/RadiologyQueue.jsx";

window.Pusher = Pusher;
 
axios.interceptors.request.use(
	async function (config) {
		const token = await getStorage("token");
		console.log("axios.interceptors.request");
		if (token) {
			config.headers["Authorization"] = "Bearer " + token;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
const removeSession = () => {
	if (!window.location.pathname.includes("login")) {
		setTimeout(() => {
			toast.error(
				"Session expired! Login to your credentails to continue."
			);
		}, 500);
		window.localStorage.clear();
		window.location.pathname = "/login";
	}
};
axios.interceptors.response.use(
	(response) => {
		if (response.status === 500) {
			toast.error("Unable to connect to server!");
			return Promise.reject({ response });
		}

		return response;
	},
	(error) => {
		if (error.response) {
			const code = error.response.status;

			switch (parseInt(code)) {
				case 401:
				case 403:
					removeSession();
					break;

				case 500:
					// toast.error("Internal server error");
					break;
			}

			if (error.response && error.response.data) {
				return Promise.reject(error);
			}
		}

		return Promise.reject(error.message);
	}
);
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route path="index" element={<AppRoutes />}></Route>
			<Route path="login" element={<Login />}></Route>

			<Route path="gdis-doctor">
				<Route path="" element={<DashboardCensus />}></Route>
				<Route path="telemedicine" element={<Appointments />}></Route>
				<Route
					path="patient-queue"
					element={<DoctorPatientQueue />}
				></Route>
				<Route
					path="consultation-room"
					element={<ConsultationRoomPreBuild />}
				></Route>
				<Route path="pathology-queue" element={<PathologyQueue />}></Route>
				<Route path="radiology-queue" element={<RadiologyQueue />}></Route>
			</Route>
			<Route path="gdis-laboratory">
				<Route path="" element={<DashboardCensus />}></Route>
				<Route path="patients-lab-report" element={<PatientLabReport />}></Route>
				<Route
					path="patient-lab-queue"
					element={<PatientLabQueue />}
				></Route>
				<Route path="my-account" element={<MyAccount />}></Route>
			</Route>
			<Route path="gdis-imaging">
				<Route path="" element={<DashboardCensus />}></Route>
				<Route path="patients-img-report" element={<PatientImgReport />}></Route>
				<Route
					path="patient-img-queue"
					element={<PatientImagingQueue />}
				></Route>
				{/* <Route
					path="patient-img-queue"
					element={<ImagingFinalReport />}
				></Route> */}
				<Route path="my-account" element={<MyAccount />}></Route>
			</Route>
			<Route path="gdis-pharmacy">
				<Route path="" element={<DashboardCensus />}></Route>
				{/* <Route path="patients" element={<Patients />}></Route> */}
				<Route path="consignments" element={<Consignments />}></Route>
				<Route path="inventory-pharmacy" element={<PharmacyInventories />}></Route>
				{/* <Route path="inventory-csr" element={<CSRInventories />}></Route> */}

				<Route
					path="patient-pharmacy-queue"
					element={<PatientPharmacyQueue />}
				></Route>
				<Route path="my-account" element={<MyAccount />}></Route>
			</Route>
			<Route path="gdis-nurse">
				<Route path="" element={<DashboardCensus />}></Route>
				<Route path="patients" element={<Patients />}></Route>
				<Route path="patient-queue" element={<OPDPatientQueue />}></Route>
				<Route path="patient-refer" element={<PatientReferredList />}></Route>
				<Route path="masterlist" element={<PhilhealthData />}></Route>
				<Route path="my-account" element={<MyAccount />}></Route>
			</Route>
			<Route path="gdis-cashier">
				<Route path="" element={<DashboardCensus />}></Route>
				<Route path="patients" element={<Patients />}></Route>
				<Route
					path="patient-cashier-queue"
					element={<PatientCashierQueue />}
				></Route>
				{/* <Route path="e-claims" element={<KonsultaLogin />}></Route> */}
				
				<Route path="my-account" element={<MyAccount />}></Route>
			</Route>
			<Route path="gdis-admin">
				<Route path="" element={<DashboardCensus />}></Route>
				{/* <Route path="rhu-list" element={<RHULists />}></Route> */}
				<Route path="patients" element={<Patients />}></Route>
				<Route path="personnels" element={<SAPersonnels />}></Route>
				<Route
					path="doctor-specialties"
					element={<DoctorSpecialties />}
				></Route>
				<Route
					path="laboratory-tests"
					element={<LaboratoryTests />}
				></Route>
				<Route path="masterlist" element={<PhilhealthData />}></Route>
				
				{/* <Route path="e-konsulta" element={<KonsultaTransmittal />}></Route> */}
				<Route path="my-account" element={<MyAccount />}></Route>
			</Route>
				<Route path="/ekonsulta-admin" element={<KonsultaTransmittal />} />
				<Route path="/ekonsulta-nurse" element={<HSATransmittal />} />
				<Route path="/ekonsulta-cashier" element={<ConsultationTransmittal />} /> 
				<Route path="/ekonsulta" element={<KonsultaDecryptData />} />
			<Route path="*" element={<Error404 />}></Route>
		</Route>
	)
);
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;



const AppMain = (props) => {


	const [online, setOnline] = useState(navigator.onLine);
	const [token, setToken] = useState("");

	useEffect(() => {
		const handleStorageChange = (event) => {
			// Check if the storage event was triggered by a change in the specific item we are interested in
			if (event.key === 'token') {
				setToken(event.token);
			}
		};
		window.addEventListener('storage', handleStorageChange);
		const storedData = localStorage.getItem('token');
		if (storedData) {
			setToken(storedData);
		}

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	},[]);
	useEffect(() => {
		console.log('Online', navigator.onLine);
		
	},[online,token]);

	return props.children;


}
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AppMain>
			<RouterProvider router={router} />
		</AppMain>
	</React.StrictMode>
);

import { Link, useLocation, useNavigation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Header from "../layout/Header";
import FlatIcon from "../FlatIcon";
import MenuLink from "../buttons/MenuLink";
import { useEffect, useRef, useState } from "react";
import Img from "../Img";
import { ToastContainer } from "react-toastify";
import ConfirmLogoutModal from "../modal/ConfirmLogoutModal";
import useReValidateAuth from "../../hooks/useReValidateAuth";
import useNoBugUseEffect from "../../hooks/useNoBugUseEffect";
import { detectMobile } from "../../libs/helpers";
import useClinic from "../../hooks/useClinic";
import EKonsultaLinks from "../../userLinks/standalone/EKonsultaLinks";
import CISAdminLinks from "../../pages/cis/CISAdminLinks";
import CISNurseLinks from "../../pages/cis/CISNurseLinks";
import CISDoctorLinks from "../../pages/cis/CISDoctorLinks";
import CISLaboratoryLinks from "../../pages/cis/CISLaboratoryLinks";
import CISImagingLinks from "../../pages/cis/CISImagingLinks";
import CISPharmacyLinks from "../../pages/cis/CISPharmacyLinks";
import CISCashierLinks from "../../pages/cis/CISCashierLinks";
const AppLayout = (props) => {
	useReValidateAuth();
	const confirmLogoutRef = useRef(null);
	const location = useLocation();
	const { data } = useClinic();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const { user, logout } = useAuth({
		middleware: "auth",
		redirectIfAuthenticated: "/",
	});
	const { children } = props;
	const isActive = (name) => {
		if (name == "") {
			return location?.pathname == `/${String(user?.type).toLowerCase()}`;
		}
		return location?.pathname?.includes(name);
	};
	useNoBugUseEffect({
		functions: () => {
			// if (window) {
			// 	window.onresize = (event) => {
			// 		console.log("TEST", detectMobile());
			// 	};
			// }
			setIsMobile(detectMobile());
		},
		params: [],
	});
	const renderLinks = () => {
		switch (String(user?.type).toLowerCase()) {
			case "gce-admin":
				return <CISAdminLinks isActive={isActive} />;
			case "gce-nurse":
				return <CISNurseLinks isActive={isActive} />;
			case "gce-doctor":
				return <CISDoctorLinks isActive={isActive} />;
			case "gce-laboratory":
				return <CISLaboratoryLinks isActive={isActive} />;
			case "gce-imaging":
				return <CISImagingLinks isActive={isActive} />;
			case "gce-pharmacy":
				return <CISPharmacyLinks isActive={isActive} />;
			case "gce-cashier":
				return <CISCashierLinks isActive={isActive} />;
			case "eKonsulta":
				return <EKonsultaLinks isActive={isActive} />;
			default:
				break;
		}
	};
	return (
		<div className="w-full flex">
			{/* <span
				className={`absolute z-30 top-[10px] duration-200 cursor-pointer lg:hidden shadow shadow-blue-500 rounded bg-white h-8 w-8 flex items-center justify-center ${
					sidebarOpen ? "left-[244px]" : "left-[12px] rotate-180"
				}`}
				onClick={() => {
					setSidebarOpen((prevOpen) => !prevOpen);
				}}
			>
				<FlatIcon
					icon="rr-arrow-left-from-line"
					className="text-blue-500 text-xs -mt-[-2px]"
				/>
			</span> */}
			<div>
				<div
					className={`absolute lg:relative  duration-200 h-[100dvh] border-r-[0.1px] lg:!border-r-[0px] shadow-white lg:!left-0 w-[256px] z-20 bg-blue-600 ${
						!sidebarOpen ? "left-[-256px]" : "left-0"
					}`}
				>
					<div className="h-[60px] z-20 bg-black bg-opacity-20 flex items-center relative pl-4 justify-center">
						<Link to="/" className=" cursor-pointer w-full">
							<div className="h-[44px]  flex items-center gap-4">
								<img
									src="/logo.png"
									alt="logo"
									className="h-[40px] w-[40px] rounded-full"
								/>
								{/* <div className="flex flex-col">
										<span
									className="italic text-[8px] font-semibold text-white tracking-wider"
								>
									{data?.healthUnit?.name}
								</span>
								<span
									className="italic text-sm font-semibold text-white tracking-wider"
									// style={{ textShadow: "1px 1px 2px black" }}
								>
									{data?.healthUnit?.accreditation_number}
								</span>
								</div> */}
							<span
									className="text-2xl font-semibold text-white tracking-wider"
									// style={{ textShadow: "1px 1px 2px black" }}
								>
									CLINIC
								</span>
							</div>
						</Link>
						{detectMobile() && sidebarOpen ? (
							<span
								className="bg-indigo-900 text-xm flex items-center p-2 justify-center -mr-3 text-white rounded-lg shadow-md"
								onClick={() => {
									setSidebarOpen(false);
								}}
							>
								<FlatIcon icon="rr-angle-double-left" />
							</span>
						) : (
							""
						)}
					</div>
					<div className="flex flex-col z-20">
						<div className="flex flex-col h-[calc(100dvh-84px)]">
							<div className="flex justify-start items-center gap-2 bg-primary-dark bg-opacity-10 px-3 py-6">
								<Img
									src={user?.avatar}
									type="user"
									name={user?.firstname}
									className="h-10 w-10 rounded border border-white"
								/>
								<div className="flex flex-col">
									<span className="text-md border-b border-b-blue-300 font-light font-opensans mb-1 text-white">
										{user?.title} <span className="capitalize">{user?.firstname} {user?.lastname}</span>
									</span>
									<span className="text-xs font-light text-white border-b border-b-blue-300">
										{user?.accreditation_number}
									</span>
									<span className="text-[10px] font-light text-white">
										{user?.type}
									</span>
									
								</div>
							</div>
							{renderLinks()}
							<span className="text-xs font-light text-white pt-3 pb-1 px-2  w-full">
								My Account
							</span>

							<MenuLink
								to="/my-account"
								active={isActive("/my-account")}
								icon="rr-user"
								text="My Account"
							/>

							<MenuLink
								to="/logout"
								active={isActive("/logout")}
								onClick={async (e) => {
									await e.preventDefault();
									await e.stopPropagation();
									// await logout();
									confirmLogoutRef.current.show();
								}}
								icon="rr-sign-out-alt"
								text="Logout"
							/>
						</div>
						<div className="flex flex-col items-center mt-auto justify-center pb-2">
							<span className="italic text-white text-sm font-light">
								GTC Clinic v.1.0
							</span>
							
						</div>
					</div>
				</div>
			</div>
			<div className="relative bg-white bg-opacity-80 h-[100dvh] w-full lg:w-[calc(100vw-257px)] ">
				<Header
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
				/>
				<div className="overflow-auto  relative h-[calc(100vh-64px)]">
					{children}
				</div>
			</div>
			<ToastContainer theme="colored" />
			<ConfirmLogoutModal logout={logout} ref={confirmLogoutRef} />
		</div>
	);
};

export default AppLayout;

import { Link } from "react-router-dom";
import FlatIcon from "../FlatIcon";
import { useAuth } from "../../hooks/useAuth";
import ActionBtn from "../buttons/ActionBtn";
import Img from "../Img";
import ReferralsListModal from "../modal/ReferralsListModal";
import { useRef } from "react";
import useClinic from "../../hooks/useClinic";
import AcceptPatientModal from "../modal/AcceptPatientModal";
import CloudServerModal from "../modal/CloudServerModal";
import UpdateVitalModalReferral from "../modal/UpdateVitalModalReferral";
import ReadingListModal from "../modal/ReadingListModal";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import PhilhealthServerModal from "../modal/PhilhealthServerModal";
import CloudCaseModal from "../modal/CloudCaseModal";
import KonsultaLogin from "../../pages/auth/KonsultaLogin";
import PhilhealthMasterlistModal from "../modal/PhilhealthMasterlistModal";
import UploadMasterListModal from "../modal/UploadMasterListModal";
const Header = (props) => {
	const { setSidebarOpen, sidebarOpen } = props;
	const { user, checkUserType } = useAuth();
	const { data } = useClinic();
	const { isOnline } = useNetworkStatus();
	const referralListRef = useRef(null);
	const eKonsultaLoginRef = useRef(null);
	const phicMembersListRef = useRef(null);	
	const updateVitalRef = useRef(null);
	const acceptPatientRef = useRef(null);
	const cloudServerRef = useRef(null);
	const caseServerRef = useRef(null);
	console.log("datadatadatuser", user);
	const philhealthServerRef = useRef(null);
	

	const toRHUword = (str) => {
		return str?.replace("RHU", "Rural Health Unit");
	};
	const updatePatientVital = (patient) => {
		updateVitalRef.current.show(patient);
	};
	return (
		<>
			<div className="bg-primary">
				<div className="h-[60px] w-full bg-blue-600 bg-opacity-60 flex items-center z-10 px-2">
					<div className="flex items-center w-full lg:pl-2">
						<div className="flex items-center justify-center gap-2">
							<div
								className="bg-black bg-opacity-0 cursor-pointer mr- duration-200 hover:bg-opacity-30 w-8 h-7 pt-[2px] text-white rounded-md flex items-center justify-center"
								onClick={() => {
									setSidebarOpen((prevVal) => !prevVal);
								}}
							>
								<FlatIcon
									icon="br-bars-staggered"
									className="text-sm"
								/>
							</div>
							<span
								className="text-white font-bold text-sm lg:text-lg font-mono flex items-center"
								style={{ textShadow: "0px 1px 1px black" }}
							>
								<div className="flex">
								
									{user?.healthUnit?.name} || {user?.healthUnit?.accreditation_number}
									
									
								</div>
								
							</span>
						</div>
						{isOnline ? (
							<>
								{checkUserType("admin") ? (
									<>
										<div
											className="ml-auto flex items-center gap-2 mr-2 px-3 text-sm font-light text-white hover:bg-blue-900 hover:bg-opacity-20 cursor-pointer py-2 rounded-xl border border-white border-opacity-20"
											onClick={() => {
												referralListRef.current.show();
											}}
										>
											<FlatIcon icon="rr-bells" />
											Patient Referrals
											{data?.referrals?.length ? (
												<div className="relative">
													<span className="bg-red-600 animate-ping absolute text-white w-full h-full rounded-full z-10"></span>
													<span className="bg-red-600 text-white z-20 px-2 rounded-full">
														{
															data?.referrals
																?.length
														}
													</span>
												</div>
											) : (
												""
											)}
										</div>
										<div
											className="  flex items-center bg-green-500 gap-2 mr-2 px-3 text-sm font-light text-white hover:bg-yellow-400 cursor-pointer py-0 h-9 rounded-xl border border-orange-700 border-opacity-20 duration-500 shadow bg-opacity-90"
											onClick={() => {
												philhealthServerRef.current.show();
											}}
										>
											<FlatIcon
												icon="rr-database"
												className="text-base"
											/>
											<span className="hidden lg:block">
												eKonsulta Server
											</span>
										</div>
										<div
											className="flex items-center bg-sky-500 gap-2 mr-2 px-3 text-sm font-light text-white hover:bg-yellow-400 cursor-pointer py-0 h-9 rounded-xl border border-orange-700 border-opacity-20 duration-500 shadow bg-opacity-90"
											onClick={() => {
												eKonsultaLoginRef.current.show();
											}}
										>
											<FlatIcon
												icon="rr-sign-in-alt"
												className="text-base"
											/>
											<span className="hidden lg:block">
												eKonsulta Login
											</span>
										</div>
									
									</>
								)  : (
									""
								)}
								{checkUserType("nurse") ? (
									<>
										<div
											className="ml-auto flex items-center gap-2 mr-2 px-3 text-sm font-light text-white hover:bg-blue-900 hover:bg-opacity-20 cursor-pointer py-2 rounded-xl border border-white border-opacity-20"
											onClick={() => {
												referralListRef.current.show();
											}}
										>
											<FlatIcon icon="rr-bells" />
											Patient Referrals
											{data?.data?.length ? (
												<div className="relative">
													<span className="bg-red-600 animate-ping absolute text-white w-full h-full rounded-full z-10"></span>
													<span className="bg-red-600 text-white z-20 px-2 rounded-full">
														{
															data?.data?.length
														}
													</span>
												</div>
											) : (
												""
											)}
										</div>
									</>
								)  : (
									""
								)}
							</>
						) : (
							<div className="ml-auto">
								<span className="bg-red-600 bg-opacity-90 text-white gap-2 px-3 py-2 rounded-xl font-bold text-lg">
									<FlatIcon
										icon="rr-cloud-disabled"
										className="mr-1"
									/>
									NO INTERNET CONNECTION
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
			
			<ReferralsListModal
				ref={referralListRef}
				isOnline={isOnline}
				acceptPatientRef={acceptPatientRef}
				updatePatientVital={updatePatientVital}
			/>
			<AcceptPatientModal isOnline={isOnline} ref={acceptPatientRef} />

			<UpdateVitalModalReferral
				isOnline={isOnline}
				ref={updateVitalRef}
				referralListRef={referralListRef}
			/>
			<CloudCaseModal staticModal={false} ref={caseServerRef} />
			<PhilhealthServerModal 
			isOnline={isOnline}
			staticModal={false}
			// testUrl="https://ecstest.philhealth.gov.ph/KONSULTA/SOAP?wsdl"
			ref={philhealthServerRef}
			/>
			<KonsultaLogin 
			ref={eKonsultaLoginRef}/>
		</>
	);
};

export default Header;

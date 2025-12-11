import React, { useRef } from 'react'
import FlatIcon from '../FlatIcon';
import PhilhealthServerModal from '../modal/PhilhealthServerModal';
import { useAuth } from '../../hooks/useAuth';
import useNetworkStatus from '../../hooks/useNetworkStatus';
import { useNavigate } from 'react-router-dom';

const KonsultaHeader = () => {
    const { user  } = useAuth();
    const { isOnline } = useNetworkStatus();
    const philhealthServerRef = useRef(null);
	const navigate = useNavigate();

  console.log('userrrrrrrrrrrr', user)
  return (
    <>
			<div className="bg-primary">
				<div className="h-[60px] w-full bg-blue-600 bg-opacity-60 flex items-center z-10 px-2">
					<div className="flex items-center w-full lg:pl-2">
						<div className="flex items-center justify-center gap-2">
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
							
									<>
										<div
											className="ml-auto flex items-center bg-green-500 gap-2 mr-2 px-3 text-sm font-light text-white hover:bg-yellow-400 cursor-pointer py-0 h-9 rounded-xl border border-orange-700 border-opacity-20 duration-500 shadow bg-opacity-90"
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
											className="flex items-center bg-red-500 gap-2 px-3 text-sm font-light text-white hover:bg-red-700 cursor-pointer py-0 h-9 rounded-xl border border-red-700 border-opacity-20 duration-500 shadow bg-opacity-90"
											onClick={() => navigate("/sa-cashier")}
											>
											<FlatIcon icon="rr-sign-out-alt" className="text-base" />
											<span className="hidden lg:block">{user?.name}</span>
										</div>
									</>
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

			<PhilhealthServerModal 
			isOnline={isOnline}
			staticModal={false}
			// testUrl="https://ecstest.philhealth.gov.ph/KONSULTA/SOAP?wsdl"
			ref={philhealthServerRef}
			/>
		</>
  )
}

export default KonsultaHeader

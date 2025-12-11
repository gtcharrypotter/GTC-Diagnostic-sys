import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import MenuLink from '../../components/buttons/MenuLink';
import FlatIcon from '../../components/FlatIcon';
import Img from '../../components/Img';
import { useAuth } from '../../hooks/useAuth';
import useNoBugUseEffect from '../../hooks/useNoBugUseEffect';
import { detectMobile } from '../../libs/helpers';
import KonsultaHeader from '../../components/layout/KonsultaHeader';

const EkonsultaPage = (props) => {
    const location = useLocation();
    const { children } = props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { user } = useAuth({
            middleware: "auth",
            redirectIfAuthenticated: "/",
        });
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
  return (
    <div className="w-full flex">
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
							<span
									className="text-3xl font-semibold text-white tracking-wider"
									// style={{ textShadow: "1px 1px 2px black" }}
								>
									DIAGNOSTIC INFO SYSTEM
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
							<div className="mb- flex ml- justify-start items-center gap-2 bg-primary-dark bg-opacity-10 px-3 py-6">
								<Img
									src={user?.avatar}
									type="user"
									name={user?.name}
									className="h-10 w-10 rounded border border-white"
								/>
								<div className="flex flex-col">
									<span className="text-md border-b border-b-blue-300 font-light font-opensans mb-1 text-white">
										{user?.name}
									</span>
									<span className="text-[10px] font-light text-white">
										{user?.type}
									</span>
								</div>
							</div>
							{/* <span className="text-xs font-light text-white	pt-3 pb-1 px-2 w-full border-t border-t-black border-opacity-10">
                                    Main Menu
                                </span>
                                <MenuLink
                                    to={``}
                                    active={isActive(``)}
                                    icon="rr-dashboard"
                                    text="Dashboard"
                                />
                                <MenuLink
                                    to="/claims"
                                    active={isActive("/claims")}
                                    icon="rr-user-md-chat"
                                    text="eKonsulta"
                                    // counter={parseInt(pending?.data?.length)}
                            /> */}
						</div>
						<div className="flex flex-col items-center mt-auto justify-center pb-2">
							<span className="italic text-white text-sm font-light">
								GTC Diagnostic v.1.0
							</span>
							
						</div>
					</div>
				</div>
			</div>
			<div className="relative bg-white bg-opacity-80 h-[100dvh] w-full lg:w-[calc(100vw-257px)] ">
				<KonsultaHeader
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
				/>
				<div className="overflow-auto  relative h-[calc(100vh-64px)]">
					{children}
				</div>
			</div>
		</div>
  )
}

export default EkonsultaPage

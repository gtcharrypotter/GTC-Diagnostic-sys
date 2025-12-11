import React from 'react'
import useOPDQueue from '../../hooks/useOPDQueue';
import MenuLink from '../../components/buttons/MenuLink';

const OPDNurseLinks = ({isActive}) => {
    const { pending} = useOPDQueue();
  return (
    <>
			<span className="text-xs font-light text-white	pt-3 pb-1 px-2 w-full border-t border-t-black border-opacity-10">
				Main Menu
			</span>
			<MenuLink
				to={``}
				active={isActive(``)}
				icon="rr-dashboard"
				text="Dashboard"
			/>
			<MenuLink
				to="/patients"
				active={isActive("/patients")}
				icon="rr-users"
				text="Patients"
			/>
			{/* <MenuLink
				to="/consultation"
				active={isActive("/consultation")}
				icon="rr-user-md-chat"
				text="Consultation"
			/> */}
			<MenuLink
				to="/patient-queue"
				active={isActive("/patient-queue")}
				icon="rr-clipboard-list-check"
				text="Patient Queue"
				counter={
					parseInt(pending?.data?.length || 0)
				}
			/>
			<MenuLink
				to="/patient-refer"
				active={isActive("/patient-refer")}
				icon="rr-list-check"
				text="Patient Referred"
			/>
			<MenuLink
				to="/masterlist"
				active={isActive("/masterlist")}
				icon="rr-list-check"
				text="Registered Masterlist"
			/>
	</>
  )
}

export default OPDNurseLinks

import React from 'react'
import useLabQueue from '../../hooks/useLabQueue';
import MenuLink from '../../components/buttons/MenuLink';

const OPDLaboratoryLinks = ({ isActive }) => {
    const { pending, pendingForPrintResult } = useLabQueue();
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
				to="/patient-lab-queue"
				active={isActive("/patient-lab-queue")}
				icon="rr-clipboard-list-check"
				text="Patient Queue"
				counter={pending?.data?.length}
			/>
			<MenuLink
				to="/patients-lab-report"
				active={isActive("/patients-lab-report")}
				icon="rr-file-medical-alt"
				text="Laboratory Reports"
				counter={pendingForPrintResult?.data?.length}
			/> 
	</>
  )
}

export default OPDLaboratoryLinks

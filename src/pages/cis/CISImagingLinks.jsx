import React from 'react'
import MenuLink from '../../components/buttons/MenuLink'
import useImagingQueue from '../../hooks/useImagingQueue';

const CISImagingLinks = ({isActive}) => {
    const { pending, pendingPrintImgResult } = useImagingQueue();
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
			{/* <MenuLink
				to="/patients"
				active={isActive("/patients")}
				icon="rr-users"
				text="Patients"
			/> */}
			<MenuLink
				to="/patient-img-queue"
				active={isActive("/patient-img-queue")}
				icon="rr-clipboard-list-check"
				text="Patient Queue"
				counter={pending?.data?.length}
			/>
			<MenuLink
				to="/patients-img-report"
				active={isActive("/patients-img-report")}
				icon="rr-file-medical-alt"
				text="Imaging Reports"
				counter={pendingPrintImgResult?.data?.length}
			/> 
	</>
  )
}

export default CISImagingLinks

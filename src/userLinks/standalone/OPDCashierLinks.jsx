import React from 'react'
import useCashierQueue from '../../hooks/useCashierQueue';
import MenuLink from '../../components/buttons/MenuLink';

const OPDCashierLinks = ({ isActive  }) => {
    const { pending } = useCashierQueue();
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
			<MenuLink
				to="/patient-cashier-queue"
				active={isActive("/patient-cashier-queue")}
				icon="rr-clipboard-list-check"
				text="Patient Queue"
				counter={parseInt(pending?.data?.length)}
			/>
			{/* <MenuLink
				to="/e-claims"
				active={isActive("/e-claims")}
				icon="rs-print-magnifying-glass"
				text="eClaims"
			/> */}

	</>
  )
}

export default OPDCashierLinks

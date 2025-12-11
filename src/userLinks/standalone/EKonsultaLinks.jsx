import React from 'react'
import MenuLink from '../../components/buttons/MenuLink'

const EKonsultaLinks = ({ isActive  }) => {
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
				to="/konsulta-decrypt-data"
				active={isActive("/konsulta-decrypt-data")}
				icon="rr-user-md-chat"
				text="eKonsulta"
				// counter={parseInt(pending?.data?.length)}
			/>
    </>
  )
}

export default EKonsultaLinks

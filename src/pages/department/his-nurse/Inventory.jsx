import React, { useRef } from 'react'
import AppLayout from '../../../components/container/AppLayout'
import FlatIcon from '../../../components/FlatIcon';
import Pagination from '../../../components/table/Pagination';
import { doctorName, doctorSpecialty, formatDateMMDDYYYY } from '../../../libs/helpers';
import Table from '../../../components/table/Table';
import ContentTitle from '../../../components/buttons/ContentTitle';
import ActionBtn from '../../../components/buttons/ActionBtn';
import useNoBugUseEffect from '../../../hooks/useNoBugUseEffect';
import useDataTable from '../../../hooks/useDataTable';
import { useAuth } from '../../../hooks/useAuth';
import InventoryCsr from './components/InventoryCSR';
import InventoryPharmacy from './components/InventoryPharmacy';

const Inventory = () => {     
  return (
   <AppLayout>
			{/* <PageHeader
				title="Patient Queue"
				subtitle={"View patients in queue"}
				icon="rr-clipboard-list-check"
			/> */}
			<div className="p-4 h-full overflow-auto ">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-5 divide-x">
					<InventoryCsr />
					<InventoryPharmacy />
				</div>
			
			</div>
		</AppLayout>
  )
}

export default Inventory

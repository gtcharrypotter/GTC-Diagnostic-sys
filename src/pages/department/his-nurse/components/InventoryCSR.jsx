import React, { useRef, useEffect, useState } from 'react';
import Pagination from '../../../../components/table/Pagination';
import InventoryCSRModal from './modal/InventoryCSRModal';
import { useAuth } from '../../../../hooks/useAuth';
import useDataTable from '../../../../hooks/useDataTable';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import FlatIcon from '../../../../components/FlatIcon';
import Table from '../../../../components/table/Table';
import { formatDateMMDDYYYY } from '../../../../libs/helpers';
import Axios from '../../../../libs/axios';
import { toast } from 'react-toastify';

const InventoryCsr = () => {


    const csrFormRef = useRef(null);
    const {
            page,
            setPage,
            meta,
            setMeta,
            loading,
            setLoading,
            paginate,
            setPaginate,
            data,
            setData,
            column,
            setColumn,
            direction,
            setDirection,
            filters,
            setFilters,
            reloadData,
        } = useDataTable({
             url: `/v1/inventory-csr/list`,
            
        });
		const filterData = (data) => {
        return data.filter(item => item.csr_stocks > 0);
    };

    // Call the filter function whenever data changes
    useNoBugUseEffect(() => {
        setData(filterData(data));
    }, [data]);
    return (
        <div className="lg:col-span-6">
						<h1 className="text-xl font-bold font-opensans text-gray-500  tracking-wider mb-2 ml-2">
						<FlatIcon icon="rr-procedures" className="text-xl" />	CSR
						</h1>
						{/* <span className="noto-sans-thin text-green-500 text-sm font-light ml-2">
							
                            1:00 MM
						</span> */}
    <div className='ml-2'>
    <ActionBtn
		type="success"
		title="Add Pharmacy Supplies"
		className="h-8 w-8 mr-auto !rounded-md mb-2"
		onClick={() => {
			csrFormRef.current.show();
		}}
	>
		<FlatIcon
			icon="rr-plus"
			className="mt-1 text-xl"
		/>
	</ActionBtn> 

     <div className="flex flex-col items-start">	
			<Table
				className={`pb-2`}
				loading={loading}
				columns={[
					{
						header: "Date",
						className: "text-left w-[150px]",
						tdClassName: "text-left",
						key: "csr_date",
						cell: (data) => {
							return formatDateMMDDYYYY(
								new Date(data?.csr_date)
							);
						},
					},
                    {
						header: "Supplies/Medicines",
						className: "text-left",
						tdClassName: "text-left",
						key: "csr_supplies",
						cell: (data) => {
									return data?.csr_supplies;
								},
					},
					
					{
						header: "Stocks",
						className: "text-center w-[100px]",
						tdClassName: "text-center",
						key: "csr_stocks",
						cell: (data) => {
									return data?.csr_stocks;
								},
					},
					
				
				]}
				data={data}
			/>
			<Pagination
				page={page}
				setPage={setPage}
				pageCount={meta?.last_page}
				pageSize={paginate}
				setPageSize={setPaginate}
			/>
		</div>
        
        <InventoryCSRModal ref={csrFormRef} />
    </div>
						
					</div>
    );
};

export default InventoryCsr;

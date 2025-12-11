import React, { useRef } from 'react'
import InventoryPharmacyModal from './modal/InventoryPharmacyModal';
import Pagination from '../../../../components/table/Pagination';
import { formatDateMMDDYYYY } from '../../../../libs/helpers';
import Table from '../../../../components/table/Table';
import FlatIcon from '../../../../components/FlatIcon';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import useDataTable from '../../../../hooks/useDataTable';

const InventoryPharmacy = (props) => {
     const {
		showTitle = true,
		appointment,
		patient,
		laboratory_test_type,
		allowCreate = true,
		onUploadLabResultSuccess,
		order_id,
	} = props;
    const pharmacyFormRef = useRef(null);
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
             url: `/v1/inventory-pharmacy/list`,
            
        });
		const filterData = (data) => {
        return data.filter(item => item.pharmacy_stocks > 0);
    };

    // Call the filter function whenever data changes
    useNoBugUseEffect(() => {
        setData(filterData(data));
    }, [data]);
  return (
    <div className="lg:col-span-6">
						<h1 className="text-xl font-bold font-opensans text-gray-500  tracking-wider mb-2 ml-2">
						<FlatIcon icon="rr-procedures" className="text-xl" />	Pharmacy
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
			pharmacyFormRef.current.show();
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
						key: "pharmacy_date",
						cell: (data) => {
							return formatDateMMDDYYYY(
								new Date(data?.pharmacy_date)
							);
						},
					},
                    {
						header: "Supplies/Medicines",
						className: "text-left",
						tdClassName: "text-left",
						key: "pharmacy_supplies",
						cell: (data) => {
									return data?.pharmacy_supplies;
								},
					},
					// {
					// 	header: "Doctor",
					// 	className: "text-left",
					// 	tdClassName: "text-left",
					// 	key: "doctor",
					// 	cell: (data) => {
					// 		return (
					// 			<div className="flex flex-col">
					// 				<span className="font-medium text-black -mb-[4px]">
					// 					{doctorName(
					// 						data?.relationships?.doctor
					// 					)}
					// 				</span>
					// 				<span className="text-[10px] font-light">
					// 					{doctorSpecialty(
					// 						data?.relationships?.doctor
					// 					)}
					// 				</span>
					// 			</div>
					// 		);
					// 	},
					// },
					

					// {
					// 	header: "Price",
					// 	className: "text-center w-[150px]",
					// 	tdClassName: "text-center",
					// 	key: "status_supplies",
					// 	// cell: (data) => {
					// 	// 	return <Status status={data?.order_status} />;
					// 	// },
					// },
					{
						header: "Stocks",
						className: "text-center w-[100px]",
						tdClassName: "text-center",
						key: "pharmacy_stocks",
						cell: (data) => {
									return data?.pharmacy_stocks;
								},
					},
					
					// {
					// 	header: "Delete",
					// 	className: `text-center ${isDoctor() ? "" : "hidden"}`,
					// 	tdClassName: `text-center ${
					// 		isDoctor() ? "" : "hidden"
					// 	}`,
					// 	key: "delete",
					// 	cell: (data) => {
					// 		return (
					// 			<div className="w-full flex items-center">
					// 				{/* {JSON.stringify(data)} */}
					// 				<ActionBtn
					// 					size="sm"
					// 					type="danger"
					// 					disabled={
					// 						data?.order_status ==
					// 						"for-result-reading"
					// 					}
					// 					className=" mx-auto"
					// 					onClick={() => {
					// 						deleteLabOrderRef.current.show(
					// 							data
					// 						);
					// 					}}
					// 				>
					// 					<FlatIcon icon="rr-trash" /> Delete
					// 				</ActionBtn>
					// 			</div>
					// 		);
					// 	},
					// },
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
        
        <InventoryPharmacyModal ref={pharmacyFormRef} />
    </div>
						
					</div>
  )
}

export default InventoryPharmacy

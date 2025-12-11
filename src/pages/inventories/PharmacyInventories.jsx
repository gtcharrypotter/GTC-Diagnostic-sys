import React, { useRef } from 'react'
import Pagination from '../../components/table/Pagination';
import InventoryPharmacyModal from '../department/his-nurse/components/modal/InventoryPharmacyModal';
import { v4 as uuidv4 } from "uuid";
import useDataTable from '../../hooks/useDataTable';
import useNoBugUseEffect from '../../hooks/useNoBugUseEffect';
import AppLayout from '../../components/container/AppLayout';
import PageTitle from '../../components/layout/PageTitle';
import ActionBtn from '../../components/buttons/ActionBtn';
import FlatIcon from '../../components/FlatIcon';
import TextInput from '../../components/inputs/TextInput';
import Table from '../../components/table/Table';
const uniq_id = uuidv4();
const PharmacyInventories = (props) => {
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
             defaultFilters: {
			// type: "RHU",
			key: uniq_id,
		},
            
        });
		const filterData = (data) => {
        return data.filter(item => item.pharmacy_stocks > 0);
    };

    // Call the filter function whenever data changes
    useNoBugUseEffect(() => {
        setData(filterData(data));
    }, [data]);
  
  return (
    <AppLayout>
            <div className="sticky top-0 z-10 shadow py-4 px-5 flex items-center w-full bg-slate-100">
                <PageTitle
                    icon={"rr-boxes"}
                    title={"Pharmacy Inventory"}
                    subtitle={"View Pharmacy items and inventory levels."}
                />
                <ActionBtn
                    type="success"
                    className="ml-auto h-11"
                    onClick={() => {
                        pharmacyFormRef.current.show();
                    }}
                >
                    <FlatIcon icon="rr-layer-plus" className="mr-2" />
                    <span className="text-xs font-medium">Add Item</span>
                </ActionBtn>
                
                <div className="ml-4 lg:w-[256px]">
                    <TextInput
                        iconLeft={"rr-search"}
                        placeholder="Search..."
                        onChange={(e) => {
                            setFilters((prevFilters) => ({
                                ...prevFilters,
                                keyword: e.target.value,
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="px-5 py-5 shadow-xl grid-flow-col">
                
                <Table
				className={`pb-2`}
                onSort={(column, direction) => {
					setFilters((prevFilters) => ({
						...prevFilters,
						key: uuidv4(),
						column: column,
						direction: direction,
					}));
				}}
				loading={loading}
				columns={[
                    {
						header: "Item Code",
						className: "text-left",
						tdClassName: "text-left",
						key: "pharmacy_code",
						cell: (data) => {
									return data?.pharmacy_code;
								},
					},
                    {
						header: "Item Name",
						className: "text-left",
						tdClassName: "text-left",
						key: "pharmacy_name",
						cell: (data) => {
									return data?.pharmacy_name;
								},
					},
                    {
						header: "Supplier",
						className: "text-left ",
						tdClassName: "text-left",
						key: "pharmacy_supplier",
						cell: (data) => {
									return data?.pharmacy_supplier;
								},
					},
                    {
						header: "Unit of Measurement",
						className: "text-center w-[100px]",
						tdClassName: "text-center",
						key: "pharmacy_unit",
						cell: (data) => {
									return data?.pharmacy_unit;
								},
					},
                    {
						header: "Price",
						className: "text-center w-[100px]",
						tdClassName: "text-left",
						key: "pharmacy_price",
						cell: (data) => {
									return data?.pharmacy_price;
								},
					},
					{
						header: "Stocks",
						className: "text-center w-[100px]",
						tdClassName: "text-center",
						key: "pharmacy_stocks",
						cell: (data) => {
									return data?.pharmacy_stocks;
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
            <InventoryPharmacyModal ref={pharmacyFormRef} />
        </AppLayout>
  )
}

export default PharmacyInventories

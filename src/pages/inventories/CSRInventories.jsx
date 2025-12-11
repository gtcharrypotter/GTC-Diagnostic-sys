import React, { useRef, useState } from 'react'
/* eslint-disable react/prop-types */
import Pagination from '../../components/table/Pagination';
import Table from '../../components/table/Table';
import TextInput from '../../components/inputs/TextInput';
import FlatIcon from '../../components/FlatIcon';
import ActionBtn from '../../components/buttons/ActionBtn';
import PageTitle from '../../components/layout/PageTitle';
import AppLayout from '../../components/container/AppLayout';
import useNoBugUseEffect from '../../hooks/useNoBugUseEffect';
import Axios from '../../libs/axios';
import useDataTable from '../../hooks/useDataTable';
import { v4 as uuidv4 } from "uuid";
import { useAuth } from '../../hooks/useAuth';
import InventoryCSRModal from '../department/his-nurse/components/modal/InventoryCSRModal';
const uniq_id = uuidv4();
const CSRInventories = (props) => {
    const {
		showTitle = true,
		appointment,
		patient,
		laboratory_test_type,
		allowCreate = true,
		onUploadLabResultSuccess,
		order_id,
	} = props;
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
             defaultFilters: {
			// type: "RHU",
			key: uniq_id,
		},
            
        });
		const filterData = (data) => {
        return data.filter(item => item.csr_stocks > 0);
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
                    title={"CSR Inventory"}
                    subtitle={"View CSR items and inventory levels."}
                />
                <ActionBtn
                    type="success"
                    className="ml-auto h-11"
                    onClick={() => {
                        csrFormRef.current.show();
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
						key: "csr_code",
						cell: (data) => {
									return data?.csr_code;
								},
					},
                    {
						header: "Item Name",
						className: "text-left",
						tdClassName: "text-left",
						key: "csr_name",
						cell: (data) => {
									return data?.csr_name;
								},
					},
                    {
						header: "Supplier",
						className: "text-left ",
						tdClassName: "text-left",
						key: "csr_supplier",
						cell: (data) => {
									return data?.csr_supplier;
								},
					},
                    {
						header: "Unit of Measurement",
						className: "text-center w-[100px]",
						tdClassName: "text-left",
						key: "csr_unit",
						cell: (data) => {
									return data?.csr_unit;
								},
					},
                    {
						header: "Price",
						className: "text-center w-[100px]",
						tdClassName: "text-left",
						key: "csr_price",
						cell: (data) => {
									return data?.csr_price;
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
        </AppLayout>
  )
}

export default CSRInventories

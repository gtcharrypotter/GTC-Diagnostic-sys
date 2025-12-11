import React, { useRef, useEffect, useState } from 'react';
import useDataTable from '../../../../hooks/useDataTable';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import Pagination from '../../../../components/table/Pagination';
import UploadCSROrderModal from './modal/UploadCSROrderModal';
import { doctorName, doctorSpecialty, formatDateMMDDYYYY } from '../../../../libs/helpers';
import Table from '../../../../components/table/Table';
import FlatIcon from '../../../../components/FlatIcon';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import ContentTitle from '../../../../components/buttons/ContentTitle';
import { useAuth } from '../../../../hooks/useAuth';
import Axios from '../../../../libs/axios';
/* eslint-disable react/prop-types */
const PatientCSROrder = (props) => {
   const {
		appointment,
		patient,
		inventory_csrs_id,
		doctor_id,
	} = props;
    const csrFormRef = useRef(null);
	const [selectedItemsPharmacy, setSelectedItemsPharmacy] = useState([]);

    const {
        page,
        setPage,
        meta,
        setMeta,
        loading,
        setLoading,
        paginate,
        setPaginate,
        data : showData,
        setData,
        column,
        setColumn,
        direction,
        setDirection,
        filters,
        setFilters,
        reloadData,
    } = useDataTable({
        url: `/v1/doctor/patient-csr/patient/${appointment?.id}`,
		defaultFilters: {
            ...(doctor_id ? { doctor_id: doctor_id } : {}),
            ...(inventory_csrs_id
				? { inventory_csrs_id: inventory_csrs_id }
				: {}),
            ...(doctor_id ? { doctor_id: doctor_id } : {}),
            ...(appointment?.id > 0 ? { appointment_id: appointment?.id } : {}),
        }
    });
    useNoBugUseEffect({
        functions: () => {
            setFilters((prevFilters) => ({
                ...prevFilters,

				doctor_id: doctor_id,
            }));
        },

    });
	const removeSelectedItem = (id) => {
        setSelectedItemsPharmacy(prevItems => prevItems.filter(item => item.id != id));
    };
    return (
        <div>
            {/* <ContentTitle title="CSR" /> */}
            <div className="flex">
            <div>
						<h4 className="text-md text-indigo-800  font-bold mb-0">
							Add CSR
						</h4>
						<span className="text-slate-500 text-sm">
							Select items to add supplies
						</span>
						
					</div>
            <ActionBtn
                type="indigo"
                title="Add CSR"
                size="sm"
                className="ml-auto !rounded-full mb-2"
                onClick={() => {
                    csrFormRef.current.show(patient, appointment);
                   
                }}
            >
                <FlatIcon
                    icon="rr-square-plus"
                    className="mt-1 text-xl"
                />
                Click to add supplies
            </ActionBtn>
            </div>
            <div className="flex flex-col items-start">
                <Table
				className={`pb-2`}
				loading={loading}
				columns={[
					{
						header: "Date",
						className: "text-left w-[100px]",
						tdClassName: "text-left",
						key: "created_at",
						cell: (showData) => {
							return formatDateMMDDYYYY(
								new Date(showData?.created_at)
							);
						},
					},
					{
						header: "Ordered by",
						className: "text-left w-[100px]",
						tdClassName: "text-left",
						key: "doctor_id",
						cell: (showData) => {
							return (
								<div className="flex flex-col">
									<span className="font-medium text-black -mb-[4px]">
										{doctorName(
											showData?.relationships?.doctor
										)}
									</span>
									<span className="text-[10px] font-light">
										{doctorSpecialty(
											showData?.relationships?.doctor
										)}
									</span>
								</div>
							);
						},
					},
					{
						header: "Item Code",
						className: "text-left w-[100px]",
						tdClassName: "text-left",
						key: "csr_code",
						cell: (showData) => {
									return showData?.relationships?.inventoryCsr?.csr_code;
								},
					},
					{
						header: "Item Information",
						className: "text-left w-[300px]",
						tdClassName: "text-left",
						key: "csr_name",
						cell: (showData) => {
									return showData?.relationships?.inventoryCsr?.csr_name;
								},
					},
					
                    {
						header: "Packaging",
						className: "text-center w-[100px]",
						tdClassName: "text-centrer",
						key: "inventory_pharmacies_id",
                        cell: (showData) => {
									return showData?.packaging;
								},
					},
					
					{
						header: "Quantity",
						className: "text-center w-[100px]",
						tdClassName: "text-center",
						key: "quantity",
						cell: (showData) => {
									return showData?.quantity;
								},
					},
                    {
						header: "Action",
						className: "text-center w-[100px] ",
						tdClassName: "text-center",
						key: "quantity",
						cell: showData => (
                                <div className="flex items-center justify-center gap-2">
                                    <ActionBtn
										type="primary-dark"
										size="sm"
										// onClick={() => {
										// 	removeSelectedItem(
										// 		selectedItem?.id
										// 	);
										// }}
									>
										<FlatIcon icon="rr-trash" />
										Edit
									</ActionBtn>
                                    <ActionBtn 
									type="danger" 
									size="sm" 
									onClick={() => removeSelectedItem(showData.id)}
									>
                                        <FlatIcon icon="rr-trash" />
                                        Remove
                                    </ActionBtn>
                                </div>
                            ),
                                
					},
				]}
				data={showData}
			/>
                <Pagination
                    page={page}
                    setPage={setPage}
                    pageCount={meta?.last_page}
                    pageSize={paginate}
                    setPageSize={setPaginate}
                />
            </div>
            <UploadCSROrderModal 
			ref={csrFormRef} 
			patient={patient}
			appointment={appointment}
			/>
        </div>
    );
};

export default PatientCSROrder;

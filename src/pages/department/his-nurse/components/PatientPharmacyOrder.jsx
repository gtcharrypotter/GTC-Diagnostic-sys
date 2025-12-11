import React, { useEffect, useRef, useState } from 'react';
import Pagination from '../../../../components/table/Pagination';
import UploadPharmacyOrderModal from './modal/UploadPharmacyOrderModal';
import { doctorName, doctorSpecialty, formatDateMMDDYYYYHHIIA } from '../../../../libs/helpers';
import FlatIcon from '../../../../components/FlatIcon';
import Table from '../../../../components/table/Table';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import useDataTable from '../../../../hooks/useDataTable';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import { useAuth } from '../../../../hooks/useAuth';
/* eslint-disable react/prop-types */
const PatientPharmacyOrder = (props) => {
    const {
		appointment,
		patient,
		inventory_pharmacies_id,
		doctor_id,
	} = props;
    const pharmacyFormRef = useRef(null);
    const [selectedItemsPharmacy, setSelectedItemsPharmacy] = useState([]);

    const {
        page,
        setPage,
        meta,
        loading,
        setLoading,
        paginate,
        setPaginate,
        data: showData,
        setData,
        column,
        setColumn,
        direction,
        setDirection,
        filters,
        setFilters,
        reloadData,
    } = useDataTable({
        url: `/v1/doctor/patient-pharmacy/patient/${appointment?.id}`,
        defaultFilters: {
            ...(doctor_id ? { doctor_id: doctor_id } : {}),
            ...(inventory_pharmacies_id
				? { inventory_pharmacies_id: inventory_pharmacies_id }
				: {}),
            ...(doctor_id ? { doctor_id: doctor_id } : {}),
            ...(appointment?.id > 0 ? { appointment_id: appointment?.id } : {}),
        }
    });


    useNoBugUseEffect({
        functions: () => {
            setFilters(prevFilters => ({
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
            <div className="flex">
                <div>
                    <h4 className="text-md text-indigo-800 font-bold mb-0">Add Pharmacy</h4>
                    <span className="text-slate-500 text-sm">Select items to add medicines</span>
                </div>
                <ActionBtn
                    type="indigo"
                    title="Add Pharmacy"
                    size="sm"
                    className="ml-auto !rounded-full mb-2"
                    onClick={() => {
                        pharmacyFormRef.current.show(patient, appointment);
                    }}
                >
                    <FlatIcon icon="rr-square-plus" className="mt-1 text-xl" />
                    Click to add medicines
                </ActionBtn>
            </div>

            <div className="flex flex-col items-start">
                <Table
                    className="pb-2"
                    loading={loading}
                    columns={[
                        {
                            header: "Date",
                            className: "text-left w-[100px]",
                            tdClassName: "text-left",
                            key: "created_at",
                            cell: showData => formatDateMMDDYYYYHHIIA(new Date(showData?.created_at)),
                        },
                        {
                            header: "Ordered by",
                            className: "text-left w-[100px]",
                            tdClassName: "text-left",
                            key: "doctor_id",
                            cell: showData => (
                                <div className="flex flex-col">
                                    <span className="font-medium text-black -mb-[4px]">
                                        {doctorName(showData?.relationships?.doctor)}
                                    </span>
                                    <span className="text-[10px] font-light">
                                        {doctorSpecialty(showData?.relationships?.doctor)}
                                    </span>
                                </div>
                            ),
                        },
                        {
                            header: "Item Code",
                            className: "text-left w-[100px]",
                            tdClassName: "text-left",
                            key: "pharmacy_code",
                            cell: showData => showData?.relationships?.inventoryPharmacy?.pharmacy_code,
                        },
                        {
                            header: "Item Information",
                            className: "text-left w-[300px]",
                            tdClassName: "text-left",
                            key: "pharmacy_name",
                            cell: showData => showData?.relationships?.inventoryPharmacy?.pharmacy_name,
                        },
                        {
                            header: "Packaging",
                            className: "text-center w-[100px]",
                            tdClassName: "text-left",
                            key: "packaging",
                            cell: showData => showData?.packaging,
                        },
                        {
                            header: "Quantity",
                            className: "text-center w-[100px]",
                            tdClassName: "text-center",
                            key: "quantity",
                            cell: showData => showData?.quantity,
                        },
                        {
                            header: "Action",
                            className: "text-center w-[100px]",
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

            <UploadPharmacyOrderModal 
            ref={pharmacyFormRef} patient={patient} 
            appointment={appointment} 
            onSuccess={() => {
					reloadData();
				}}
            />
        </div>
    );
};

export default PatientPharmacyOrder;

/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import Pagination from '../../../../components/table/Pagination';
import useDataTable from '../../../../hooks/useDataTable';

import Table from '../../../../components/table/Table';
import ContentTitle from '../../../../components/buttons/ContentTitle';
import { calculateAge, doctorName, doctorSpecialty, formatDate, formatDateMMDDYYYY, patientFullName } from '../../../../libs/helpers';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import { useAuth } from '../../../../hooks/useAuth';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import FlatIcon from '../../../../components/FlatIcon';
import AddPatientOperation from './modal/AddPatientOperation';
import OperationNotesModal from './modal/OperationNotesModal';
const Status = ({ status }) => {
	const color = () => {
		switch (status) {
			case "operating-room":
				return " text-red-700";
			case "resu":
				return " text-blue-700";
            case "done":
				return " text-green-700";
			default:
				return " text-white";
		}
	};
	return (
		<span
			className={`${color()} px-2 italic text-center rounded-2xl text-xs py-[2px]`}
		>
			{status}
		</span>
	);
};
const PatientChartsAnesthesia = (props) => {
   const {
		patient,
		order_id,
	} = props;
    const operationNotesRef = useRef(null);
	const { user } = useAuth();
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
			// url: `/v1/operation-procedure/patient/${patient?.id}`,
            url: `/v1/anesthesia/operation-procedure/patient/${patient?.id}`,
            // defaultFilters: {
            //     ...(order_id ? { order_id: order_id } : {}),
            //     ...(laboratory_test_type
            //         ? { laboratory_test_type: laboratory_test_type }
            //         : {}),
            //     ...(appointment?.id > 0 ? { appointment_id: appointment?.id } : {}),
            // },
        });
	useNoBugUseEffect({
		functions: () => {
			setFilters((prevFilters) => ({
				...prevFilters,

				order_id: order_id,
			}));
		},
	});
    // const isDoctor = () => {
	// 	return String(user?.type || "")
	// 		.toLowerCase()
	// 		.includes("doctor");
	// };
  return (
    <>
    <ContentTitle title="Operation Procedure" />
    {/* <ActionBtn
    className="h-8 w-36 mb-2"
    onClick={() => {
	operationFormRef.current.show();
	}}
    >
        <FlatIcon icon="rr-add" /> Add Operation
    </ActionBtn>  */}
     <div className="flex flex-col items-start">	
			<Table
				className={`pb-2`}
				loading={loading}
				columns={[
					{
						header: "Date",
						className: "text-left w-[100px]",
						tdClassName: "text-left",
						key: "operation_date",
						cell: (data) => {
							return formatDateMMDDYYYY(
								new Date(data?.operation_date)
							);
						},
					},
					{
						header: "Time",
						className: "text-left",
						tdClassName: "text-left",
						key: "operation_time",
						cell: (data) => {
									return data?.operation_time;
								},
					},
					{
						header: "Procedure",
						className: "text-left",
						tdClassName: "text-left",
						key: "procedure",
						cell: (data) => {
									return data?.procedure;
								},
					},
					{
						header: "Surgeon",
						className: "text-left",
						tdClassName: "text-left",
						key: "surgeon",
						cell: (data) => {
							return (
								<div className="flex flex-col">
									<span className="font-medium text-black -mb-[4px]">
										{/* {doctorName(
											data?.relationships?.surgeon_assign
										)} */}
										{data?.surgeon}
									</span>
									<span className="text-[10px] font-light">
										{doctorSpecialty(
											data?.relationships?.surgeon_assign
										)}
									</span>
								</div>
							);
						},
					},
                    {
						header: "Anesthesiologist",
						className: "text-left",
						tdClassName: "text-left",
						key: "anesthesiologist",
						cell: (data) => {
							return (
								<div className="flex flex-col">
									<span className="font-medium text-black -mb-[4px]">
										{/* {doctorName(
											data?.relationships?.anesthesiologist_assign
										)} */}
										{data?.anesthesiologist}
									</span>
									<span className="text-[10px] font-light">
										{doctorSpecialty(
											data?.relationships?.anesthesiologist_assign
										)}
									</span>
								</div>
							);
						},
					},
					{
						header: "Notes",
						className: "text-center ",
						tdClassName: "text-center",
						key: "operation_notes",
						cell: (data) => {
									// return data?.operation_notes;
									return (
										<div className="w-full flex items-center">
									{/* {JSON.stringify(data)} */}
									<ActionBtn
										size="sm"
										type="primary"
										className=" mx-auto"
										onClick={() => {
											operationNotesRef.current.show(
												data
											);
										}}
									>
										<FlatIcon icon="rr-eye" />
									</ActionBtn>
								</div>
									)
								},
					},
					{
						header: "Status",
						className: "text-center ",
						tdClassName: "text-center",
						key: "operation_status",
						cell: (data) => {
									return data?.operation_status;
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
		<OperationNotesModal ref={operationNotesRef} patient={patient}/>
        {/* <AddPatientOperation ref={operationFormRef} /> */}
    </>
   
  )
}

export default PatientChartsAnesthesia

/* eslint-disable react/prop-types */
import { useRef } from "react";
import FlatIcon from "../../../../components/FlatIcon";
import ActionBtn from "../../../../components/buttons/ActionBtn";
import Pagination from "../../../../components/table/Pagination";
import Table from "../../../../components/table/Table";
import { useAuth } from "../../../../hooks/useAuth";
import useDataTable from "../../../../hooks/useDataTable";
import useNoBugUseEffect from "../../../../hooks/useNoBugUseEffect";
import { doctorName, doctorSpecialty, formatDateMMDDYYYY } from "../../../../libs/helpers";
import UploadLaboratoryTest from "./modal/UploadLaboratoryTest";


const LaboratoryResult = (props) => {
    const {
		showTitle = true,
		appointment,
		patient,
		laboratory_test_type,
		allowCreate = true,
		onUploadLabResultSuccess,
		order_id,
	} = props;
    const { user } = useAuth();
    const laboratoryResultRef = useRef(null);
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
		url: `/v1/doctor/laboratory-order/patient/${patient?.id}`,
		defaultFilters: {
			...(order_id ? { order_id: order_id } : {}),
			...(laboratory_test_type
				? { laboratory_test_type: laboratory_test_type }
				: {}),
			...(appointment?.id > 0 ? { appointment_id: appointment?.id } : {}),
		},
	});
    useNoBugUseEffect({
		functions: () => {
			setFilters((prevFilters) => ({
				...prevFilters,

				order_id: order_id,
			}));
		},
	});
    const isDoctor = () => {
		return String(user?.type || "")
			.toLowerCase()
			.includes("doctor");
	};
  return (
   <>
   <div className="flex flex-col items-start">
    <ActionBtn
    className="h-8 w-42 mb-2"
    onClick={() => {
	laboratoryResultRef.current.show();
	}}
    >
        <FlatIcon icon="rr-add" /> Upload Laboratory
    </ActionBtn> 
    <Table
				className={`pb-2`}
				loading={loading}
				columns={[
					{
						header: "Date",
						className: "w-[150px]",
						tdClassName: "text-left",
						key: "date",
						cell: (data) => {
							return formatDateMMDDYYYY(
								new Date(data?.order_date)
							);
						},
					},
					{
						header: "Laboratory Test",
						className: "text-left",
						tdClassName: "text-left",
						key: "type",
						cell: (data) => {
							return data?.type?.name;
						},
					},
					{
						header: "Notes",
						className: "text-left",
						tdClassName: "text-left",
						key: "notes",
					},
					
                  
					{
						header: "Result",
						className: "text-center w-[150px]",
						tdClassName: "text-center",
						key: "order_status",
                        
					},
					{
						header: "Delete",
						className: `text-center ${isDoctor() ? "" : "hidden"}`,
						tdClassName: `text-center ${
							isDoctor() ? "" : "hidden"
						}`,
						key: "delete",
						cell: (data) => {
							return (
								<div className="w-full flex items-center">
									{/* {JSON.stringify(data)} */}
									<ActionBtn
										size="sm"
										type="danger"
										disabled={
											data?.order_status ==
											"for-result-reading"
										}
										className=" mx-auto"
										// onClick={() => {
										// 	deleteLabOrderRef.current.show(
										// 		data
										// 	);
										// }}
									>
										<FlatIcon icon="rr-trash" /> Delete
									</ActionBtn>
								</div>
							);
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
   <UploadLaboratoryTest 
   patient={patient}
	onSuccess={() => {
		onUploadLabResultSuccess();
		reloadData();
	}}
	ref={laboratoryResultRef}/>
   </>
  )
}

export default LaboratoryResult

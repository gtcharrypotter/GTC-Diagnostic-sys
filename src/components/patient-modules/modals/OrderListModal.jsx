/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react'
import { doctorName, doctorSpecialty, formatDateMMDDYYYY } from '../../../libs/helpers';
import FlatIcon from '../../FlatIcon';
import ActionBtn from '../../buttons/ActionBtn';
import DeleteOrderModal from './DeleteOrderModal';
import useDataTable from '../../../hooks/useDataTable';
import useNoBugUseEffect from '../../../hooks/useNoBugUseEffect';
import Table from '../../table/Table';
import { useAuth } from '../../../hooks/useAuth';
const Status = ({ status }) => {
	const color = () => {
		switch (status) {
			case "pending":
				return " text-red-700";
			case "for-result-reading":
				return " text-blue-700";
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
const OrderListModal = (props, ref) => {
    const { user } = useAuth();
    const {
		diagnostic,
		patient,
		laboratory_test_type,
		order_id,
	} = props;
    const {
		loading,
		setLoading,
		data,
		setFilters,
        reloadData,
	} = useDataTable({
		url: `/v1/doctor/laboratory-order/patient/${patient?.id}`,
		defaultFilters: {
			...(order_id ? { order_id: order_id } : {}),
			...(laboratory_test_type
				? { laboratory_test_type: laboratory_test_type }
				: {}),
			...(diagnostic?.id > 0 ? { diagnostic_id: diagnostic?.id } : {}),
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
    <div className="flex flex-col items-start px-2 bg-white">
				<Table
				className={`pb-2`}
				loading={loading}
				columns={[
					{
						header: "Order Date",
						className: "w-[150px] text-left",
						tdClassName: "text-left",
						key: "date",
						cell: (data) => {
							return formatDateMMDDYYYY(
								new Date(data?.order_date)
							);
						},
					},
					{
						header: "Examination Test",
						className: " w-[450px] text-left",
						tdClassName: "text-left",
						key: "type",
						cell: (data) => {
							return data?.type?.name;
						},
					},
                    {
						header: "Doctor",
						className: "text-left",
						tdClassName: "text-left",
						key: "doctor",
						cell: (data) => {
							return (
								<div className="flex flex-col">
									<span className="font-medium text-black -mb-[4px]">
										{doctorName(
											data?.relationships?.doctor
										)}
									</span>
									<span className="text-[10px] font-light">
										{doctorSpecialty(
											data?.relationships?.doctor
										)}
									</span>
								</div>
							);
						},
					},
					{
						header: "Status",
						className: "w-[150px] text-center ",
						tdClassName: "text-center",
						key: "order_status",
						cell: (data) => {
							return <Status status={data?.order_status} />;
                        
						},
					},
                    {
						header: "Result",
						className: "text-center",
						tdClassName: "text-center",
						key: "order_status",
						cell: renderResultCell,
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
										onClick={() => {
											deleteLabOrderRef.current.show(
												data
											);
										}}
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
			<DeleteOrderModal
				ref={deleteLabOrderRef}
				onSuccess={() => {
					reloadData();
				}}
			/>
	</div>
  )
}

export default forwardRef(OrderListModal)

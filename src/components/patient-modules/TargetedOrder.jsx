/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import CreateLabOrderModal from './modals/CreateLabOrderModal';
import FlatIcon from '../FlatIcon';
import ActionBtn from '../buttons/ActionBtn';
import { formatDateMMDDYYYY } from '../../libs/helpers';
import Table from '../table/Table';
import ContentTitle from '../buttons/ContentTitle';
import useDataTable from '../../hooks/useDataTable';
import { useAuth } from '../../hooks/useAuth';
import CreateTargetedServicesModal from './modals/CreateTargetedServicesModal';
import DeleteOrderModal from './modals/DeleteOrderModal';

const Status = ({ status }) => {
	const getStatusConfig = () => {
		switch (status) {
			case "pending":
				return {
					className: "bg-red-100 text-red-700 font-bold",
					label: "Not Yet Done",
				};
			case "for-result-reading":
				return {
					className: "bg-blue-100 text-blue-700 font-bold",
					label: "Done",
				};
			case "refused":
				return {
					className: "bg-teal-100 text-teal-700 font-bold",
					label: "Refused",
				};
			default:
				return {
					className: "bg-gray-100 text-gray-600",
					label: status || "Unknown",
				};
		}
	};

	const { className, label } = getStatusConfig();

	return (
		<span
			className={`${className} px-2 py-[2px] rounded-2xl text-xs italic`}
		>
			{label}
		</span>
	);
};
const TargetedOrder = (props) => {
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
    const {
		loading,
		data,
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
    const createTargetedOrderRef = useRef(null);
	const deleteLabOrderRef = useRef(null);
	const isDoctor = () => {
    return String(user?.type || '').toLowerCase().includes('doctor');
  };

  return (
    <div className='flex flex-col items-start'>
      {showTitle ? (
				<ContentTitle
					title="Targeted Service"
				>
					{user?.type == "GCE-NURSE" && allowCreate  ? (
						<ActionBtn
							className="px-4 rounded-xl"
							size="sm"
							type="success"
							onClick={() => {
								createTargetedOrderRef.current.show(
									patient,
									appointment,
								);
								// setUpdate(true);
							}}
						>
							<FlatIcon icon="rr-edit" className="mr-1" />
							Create Targeted Services
						</ActionBtn>
					) : (
						""
					)}
				</ContentTitle>
			) : (
				""
			)}
			<Table
				className={`pb-2`}
				loading={loading}
				columns={[
					{
						header: "Laboratory/Imaging Examination",
						className: "text-left",
						tdClassName: "text-left",
						key: "type",
						cell: (data) => {
							return data?.type?.name;
						},
					},
					
					{
						header: "Status",
						className: "text-center w-[150px]",
						tdClassName: "text-center",
						key: "order_status",
						cell: (data) => {
							return <Status status={data?.order_status} />;
						},
					},
					{
						header: "Action",
						className: "text-center w-[100px]",
						tdClassName: "text-center",
						key: "delete",
						cell: (data) => {
							return (
							<div className="flex flex-col gap-2">
								<ActionBtn
								size="sm"
								type="danger"
								disabled={
									data?.order_status == "for-result-reading" ||
									data?.order_status == "refused"
								}
								onClick={() => {
									deleteLabOrderRef.current.show(data);
								}}
								>
								<FlatIcon icon="rr-trash" /> Delete
								</ActionBtn>
							</div>
							);
						},
						}
				]}
				data={data}
			/>
			<DeleteOrderModal
					ref={deleteLabOrderRef}
					onSuccess={() => {
					reloadData();
					}}
				/>
			<CreateTargetedServicesModal
				patient={patient}
				onSuccess={() => {
					reloadData();
				}}
				ref={createTargetedOrderRef}
			/>
    </div>
  )
}

export default TargetedOrder

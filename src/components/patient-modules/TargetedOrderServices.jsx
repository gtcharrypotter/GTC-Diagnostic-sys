import React, { useEffect, useRef, useState } from 'react';
import Pagination from '../table/Pagination';
import FlatIcon from '../FlatIcon';
import ActionBtn from '../buttons/ActionBtn';
import Table from '../table/Table';
import { useAuth } from '../../hooks/useAuth';
import useDataTable from '../../hooks/useDataTable';
import { formatDateMMDDYYYY } from '../../libs/helpers';
import DeleteOrderModal from './modals/DeleteOrderModal';
import Axios from '../../libs/axios';
import { v4 as uuidv4 } from "uuid";
import RefusedOrderModal from './modals/RefusedOrderModal';
const uniq_id = uuidv4();

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
const TargetedOrderServices = (props) => {
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
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const refusedOrderRef = useRef(null);
  const {
  page,
  reloadData,
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
    const getLaboratoryTests = (type) => {
		// Set loading to true before starting the request
		setLoading(true);
		
		Axios.get(`/v1/laboratory/tests/list?type=${type}`)
		.then((res) => {
			setTests(res.data.data);
			setFilteredTests(res.data.data); // Initialize filtered tests
		})
		.catch((error) => {
			console.error("Failed to fetch laboratory tests", error);
		})
		.finally(() => {
			// Set loading to false after the request is finished
			setLoading(false);
		});
	};
  const deleteLabOrderRef = useRef(null);

  const isDoctor = () => {
    return String(user?.type || '').toLowerCase().includes('doctor');
  };



  return (
    <div className="flex flex-col items-start">
      <Table
        className={`pb-2`}
        loading={loading}
        columns={[
          {
            header: 'Targeted Laboratory/Imaging Examination',
            className: 'text-left',
            tdClassName: 'text-left',
            key: 'type',
            cell: (data) => {
              return data?.type?.name;
            },
          },
          {
            header: 'Status',
            className: 'text-center w-[150px]',
            tdClassName: 'text-center',
            key: 'order_status',
            cell: (data) => {
              return <Status status={data?.order_status} />;
            },
          },
          {
						header: "",
						className: `text-center w-[100px] ${isDoctor() ? "" : "hidden"}`,
						tdClassName: `text-center ${
							isDoctor() ? "" : "hidden"
						}`,
						key: "delete",
						cell: (data) => {
							return (
								<div className="flex flex-col gap-2">
									{/* {JSON.stringify(data)} */}
									<ActionBtn
										size="sm"
										type="teal"
										disabled={
											data?.order_status ==
											"for-result-reading" ||
											data?.order_status ==
											"refused"
										}
										className=""
										onClick={() => {
											refusedOrderRef.current.show(
												data
											);
										}}
									>
										<FlatIcon icon="rr-head-side-cough-slash" /> Refuse
									</ActionBtn>
									<ActionBtn
										size="sm"
										type="danger"
										disabled={
											data?.order_status ==
											"for-result-reading" ||
											data?.order_status ==
											"refused"
										}
										className=""
										onClick={() => {
											deleteLabOrderRef.current.show(
												data
											);
										}}
									>
										<FlatIcon icon="rr-trash" /> Not Applicable
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
      <RefusedOrderModal 
            ref={refusedOrderRef}
            onSuccess={() => {
              reloadData();
            }}
            />
    </div>
  );
};

export default TargetedOrderServices;

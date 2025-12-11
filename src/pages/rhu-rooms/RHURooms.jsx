/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../hooks/useAuth";
import useDataTable from "../../hooks/useDataTable";
import AppLayout from "../../components/container/AppLayout";
import Table from "../../components/table/Table";
import ActionBtn from "../../components/buttons/ActionBtn";
import FlatIcon from "../../components/FlatIcon";
import Pagination from "../../components/table/Pagination";
import TextInput from "../../components/inputs/TextInput";
import PageTitle from "../../components/layout/PageTitle";
import RoomFormModal from "./components/RoomFormModal";
import ActivateRoomModal from "./components/ActivateRoomModal";
import DeActivateRoomModal from "./components/DeActivateRoomModal";
import HealthUnitRoomsModal from "../rhu-lists/components/HealthUnitRoomsModal";
import Axios from "../../libs/axios";
import useNoBugUseEffect from "../../hooks/useNoBugUseEffect";
const uniq_id = uuidv4();
const RHURooms = (props) => {
	const { patient } = props;
	const { user } = useAuth();
	const roomFormRef = useRef(null);
	const deactivateRoomFormRef = useRef(null);
	const activateRoomFormRef = useRef(null);
	const [healthUnits, setHealthUnits] = useState([null]);
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
		url: `v1/operating-rooms/list`,
		defaultFilters: {
			type: "RHU",
			key: uniq_id,
		},
	});

	const getHealthUnits = () => {
		Axios.get(`/v1/health-unit/list?type=RHU`).then((res) => {
			setHealthUnits(res.data.data);
		});
	};

	useNoBugUseEffect({
		functions: () => {
			getHealthUnits();
		},
		params: [],
	});

	return (
		<AppLayout>
			{/* <PageHeader
				title="Patients"
				subtitle={`View patients`}
				icon="rr-users"
			/> */}
			<div className="p-0 h-full ">
				<div className="sticky top-0 z-10 shadow py-4 px-5 flex items-center w-full bg-slate-100">
					<PageTitle
						icon={"rr-bed"}
						title={"Rooms"}
						subtitle={"Add, edit, deactivate and view rooms."}
					/>
					<ActionBtn
						type="success"
						className="ml-auto h-11"
						onClick={() => {
							roomFormRef.current.show();
						}}
					>
						<FlatIcon icon="rr-layer-plus" className="mr-2" />
						<span className="text-xs font-medium">Add Room</span>
					</ActionBtn>
					<div className="ml-5 lg:w-[256px]">
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
				<div className="px-5 py-5">
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
								header: "Name",
								className: "text-left w-1/4",
								tdClassName: "text-left w-1/4",
								sortable: true,
								key: "name",
								cell: (data) => {
									return data?.name;
								},
							},
							{
								header: "Assigned to",
								className: "text-left w-1/4",
								tdClassName: "text-left w-1/4",
								sortable: true,
								key: "health_unit_id",
								cell: (data) => {
									return data?.healthUnit?.name;
								},
							},
							{
								header: "Status",
								className: "text-center w-[128px]",
								tdClassName: "text-center w-[128px]",
								key: "status",
								cell: (data) => {
									return data?.status == "active" ? (
										<p className="text-green-600 lowercase">
											ACTIVE
										</p>
									) : (
										<p className="text-red-600 lowercase">
											INACTIVE
										</p>
									);
								},
							},
							{
								header: "Action",
								className: `w-[250px]`,
								tdClassName: `text-center`,
								key: "action",
								cell: (data) => {
									return (
										<div className="flex items-center justify-center flex-wrap gap-2">
											<ActionBtn
												size="sm"
												type="primary"
												onClick={() => {
													roomFormRef.current.show(
														data
													);
												}}
											>
												<FlatIcon
													icon="rr-edit"
													className="mr-2"
												/>
												Edit
											</ActionBtn>
											{data?.status == "active" ? (
												<ActionBtn
													size="sm"
													type="danger"
													onClick={() => {
														deactivateRoomFormRef.current.show(
															data
														);
													}}
												>
													<FlatIcon
														icon="rr-trash"
														className="mr-2"
													/>
													Deactivate
												</ActionBtn>
											) : (
												<ActionBtn
													size="sm"
													type="success"
													onClick={() => {
														activateRoomFormRef.current.show(
															data
														);
													}}
												>
													<FlatIcon
														icon="rr-check"
														className="mr-2"
													/>
													Activate
												</ActionBtn>
											)}
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
			</div>
			<RoomFormModal
				ref={roomFormRef}
				onSuccess={() => {
					reloadData();
				}}
				healthUnits={healthUnits}
			/>
			<ActivateRoomModal
				ref={activateRoomFormRef}
				onSuccess={() => {
					reloadData();
				}}
			/>
			<DeActivateRoomModal
				ref={deactivateRoomFormRef}
				onSuccess={() => {
					reloadData();
				}}
			/>
		</AppLayout>
	);
};

export default RHURooms;

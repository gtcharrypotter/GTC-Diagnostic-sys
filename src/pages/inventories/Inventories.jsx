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
// import RoomFormModal from "./components/RoomFormModal";
// import ActivateRoomModal from "./components/ActivateRoomModal";
// import DeActivateRoomModal from "./components/DeActivateRoomModal";
// import HealthUnitRoomsModal from "../rhu-lists/components/HealthUnitRoomsModal";
import Axios from "../../libs/axios";
import useNoBugUseEffect from "../../hooks/useNoBugUseEffect";
import { formatCurrency } from "../../libs/helpers";
const uniq_id = uuidv4();
const Inventories = (props) => {
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
		url: `v1/item-inventory`,
		defaultFilters: {
			// type: "RHU",
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
						icon={"rr-boxes"}
						title={"Inventory"}
						subtitle={"View items and inventory levels."}
					/>
					{/* <ActionBtn
						type="success"
						className="ml-auto h-11"
						onClick={() => {
							roomFormRef.current.show();
						}}
					>
						<FlatIcon icon="rr-layer-plus" className="mr-2" />
						<span className="text-xs font-medium">Add Room</span>
					</ActionBtn> */}
					<div className="ml-auto lg:w-[256px]">
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
								header: "Item Code",
								className: "text-left w-1/4",
								tdClassName: "text-left w-1/4",
								sortable: true,
								key: "code",
								cell: (data) => {
									return data?.item?.code;
								},
							},
							{
								header: "Item name",
								className: "text-left w-1/4",
								tdClassName: "text-left w-1/4",
								sortable: true,
								key: "name",
								cell: (data) => {
									return (
										<div className="flex flex-col">
											<span>{data?.item?.name}</span>
											{/* <span>
												{data?.item?.description}
											</span> */}
										</div>
									);
								},
							},
							{
								header: "Supplier",
								className: "text-left w-1/4",
								tdClassName: "text-left w-1/4",
								sortable: true,
								key: "name",
								cell: (data) => {
									return (
										<div className="flex flex-col">
											<span>ADD SUPPLIER HERE</span>
											{/* <span>
												{data?.item?.description}
											</span> */}
										</div>
									);
								},
							},
							{
								header: "Unit of Measurement",
								className: "text-center w-[128px]",
								tdClassName: "text-center w-[128px]",
								key: "unit_measurement",

								cell: (data) => {
									return data?.item?.unit_measurement;
								},
							},
							{
								header: "Price",
								className: "text-center w-[128px]",
								tdClassName: "text-center w-[128px]",
								key: "price",
								cell: (data) => {
									return formatCurrency(data?.price, "PHP");
								},
							},
							{
								header: "Stock",
								className: "text-center w-[128px]",
								tdClassName:
									"text-center w-[128px] font-bold !text-black",
								key: "quantity",
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
			{/* <RoomFormModal
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
			/> */}
		</AppLayout>
	);
};

export default Inventories;

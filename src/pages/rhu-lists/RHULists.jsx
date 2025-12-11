/* eslint-disable react/prop-types */
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Tippy from "@tippyjs/react";
import { useAuth } from "../../hooks/useAuth";
import useDataTable from "../../hooks/useDataTable";
import AppLayout from "../../components/container/AppLayout";
import Table from "../../components/table/Table";
import { formatDateMMDDYYYYHHIIA } from "../../libs/helpers";
import ActionBtn from "../../components/buttons/ActionBtn";
import FlatIcon from "../../components/FlatIcon";
import Pagination from "../../components/table/Pagination";
import TextInputField from "../../components/inputs/TextInputField";
import TextInput from "../../components/inputs/TextInput";
import RHUListFormModal from "./components/RHUListFormModal";
import DeactivateHealthUnitModal from "./components/DeactivateHealthUnitModal";
import ActivateHealthUnitModal from "./components/ActivateHealthUnitModal";
import PageTitle from "../../components/layout/PageTitle";
import HealthUnitRoomsModal from "./components/HealthUnitRoomsModal";
const uniq_id = uuidv4();
const RHULists = (props) => {
	const { patient } = props;
	const { user } = useAuth();
	const rhuListFormRef = useRef(null);
	const deactivateRhuListRef = useRef(null);
	const activateUnitRef = useRef(null);
	const healthUnitRoomRef = useRef(null);
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
		url: `v1/health-unit/list`,
		defaultFilters: {
			type: "RHU",
			key: uniq_id,
		},
	});

	const toSTRword = (str) => {
		if (String(str).includes("RHU"))
			return str?.replace("RHU", "Rural Health Unit");

		if (String(str).includes("BHS"))
			return str?.replace("BHS", "Barangay Health Station");

		return str;
	};
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
						icon={"rr-building"}
						title={"RHU Lists"}
						subtitle={
							"Add, edit, deactivate and view Rural Health Unit."
						}
					/>
					<ActionBtn
						type="success"
						className="ml-auto h-11"
						onClick={() => {
							rhuListFormRef.current.show();
						}}
					>
						<FlatIcon icon="rr-layer-plus" className="mr-2" />
						<span className="text-xs font-medium">
							Add Health Unit
						</span>
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
						loading={loading}
						columns={[
							{
								header: "Name",
								className: "text-left",
								tdClassName: "text-left",
								key: "name",
								cell: (data) => {
									return toSTRword(data?.name);
								},
							},
							{
								header: "Type",
								className: "text-left",
								tdClassName: "text-left",
								key: "type",
								cell: (data) => {
									return data?.type;
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
								className: `w-[350px]`,
								tdClassName: `text-center`,
								key: "action",
								cell: (data) => {
									return (
										<div className="flex items-center justify-center flex-wrap gap-2">
											<ActionBtn
												size="sm"
												type="foreground-dark"
												onClick={() => {
													healthUnitRoomRef.current.show(
														data
													);
												}}
											>
												<FlatIcon
													icon="rr-eye"
													className="mr-2"
												/>
												Show Rooms
											</ActionBtn>
											<ActionBtn
												size="sm"
												type="primary"
												onClick={() => {
													rhuListFormRef.current.show(
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
														deactivateRhuListRef.current.show(
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
														activateUnitRef.current.show(
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
				{/* <NewAppointmentModal
				ref={appointmentRef}
				onSuccessCallBack={() => {
					setFilters((prevFilters) => ({
						...prevFilters,
						key: uuidv4(),
					}));
				}}
			/> */}

				{/* <ShowAppointmentModal ref={showAppointmentModal} /> */}
			</div>
			<RHUListFormModal
				onSuccess={() => {
					reloadData();
				}}
				ref={rhuListFormRef}
			/>
			<ActivateHealthUnitModal
				ref={activateUnitRef}
				onSuccess={() => {
					reloadData();
				}}
			/>
			<DeactivateHealthUnitModal
				onSuccess={() => {
					reloadData();
				}}
				ref={deactivateRhuListRef}
			/>
			<HealthUnitRoomsModal ref={healthUnitRoomRef} />
		</AppLayout>
	);
};

export default RHULists;

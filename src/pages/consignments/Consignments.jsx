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
import ViewConsignmentModal from "./components/ViewConsignmentModal";
import ReactSelectInputField from "../../components/inputs/ReactSelectInputField";
import { formatDate } from "../../libs/helpers";
import CreateCOFModal from "./components/CreateCOFModal";
const uniq_id = uuidv4();
const Consignments = (props) => {
	const { user } = useAuth();
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
		url: `v1/consignment/list`,
		defaultFilters: {
			type: "RHU",
			health_unit_id: user?.health_unit_id,
			reloadKey: uniq_id,
			key: uniq_id,
		},
	});
	useNoBugUseEffect({
		functions: () => {
			setFilters((prevFils) => ({
				...prevFils,
				health_unit_id: user?.health_unit_id,
			}));
		},
		params: [user?.health_unit_id],
	});
	const viewConsigmentRef = useRef(null);
	const cofModalRef = useRef(null);
	const renderStatus = (stat) => {
		switch (stat) {
			case "approved":
				return <span className="text-green-400 font-bold">{stat}</span>;
			case "pending":
				return (
					<span className="text-warning-700 font-bold">{stat}</span>
				);
			case "processed":
				return (
					<span className="text-indigo-700 font-bold">{stat}</span>
				);
			case "delivered":
				return <span className="text-green-700 font-bold">{stat}</span>;
			case "checked":
				return <span className="text-blue-700 font-bold">{stat}</span>;
			case "received":
				return <span className="text-pink-500 font-bold">{stat}</span>;

			default:
				return <span className="text-slate-700 font-bold">{stat}</span>;
		}
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
						icon={"rr-truck-side"}
						title={"Consignment orders"}
						subtitle={"Manage consignment orders."}
					/>
					<div className="ml-auto w-full lg:w-[144px]">
						<ReactSelectInputField
							isClearable={true}
							inputClassName=" "
							// ref={ref}
							value={
								filters?.status == "" ? "All" : filters?.status
							}
							onChange={(data) => {
								setFilters((prevFils) => ({
									...prevFils,
									status: data == "All" ? "" : data,
								}));
							}}
							// onBlur={onBlur} // notify when input is touched
							// error={error?.message}
							placeholder="Filter Status"
							options={[
								{
									label: "All status",
									value: "All",
								},
								{
									label: "Pending",
									value: "pending",
								},
								{
									label: "Received",
									value: "received",
								},
								{
									label: "Approved",
									value: "approved",
								},
							]}
						/>
					</div>
					<ActionBtn
						type="success"
						className="ml-4 h-11"
						onClick={() => {
							if (cofModalRef) cofModalRef.current.show(null);
						}}
					>
						<FlatIcon icon="rr-layer-plus" className="mr-2" />
						<span className="text-xs font-medium">Create COF</span>
					</ActionBtn>

					<div className="ml-4 lg:w-[256px]">
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
								header: "COF Number",
								className: "text-left",
								tdClassName: "text-left",
								sortable: true,
								key: "cof_number",
							},
							{
								header: "Date",
								className: "text-left",
								tdClassName: "text-left",
								sortable: true,
								key: "date",
								cell: (data) => {
									return formatDate(data?.date);
								},
							},
							{
								header: "Location Receiver",
								className: "text-left",
								tdClassName: "text-left",
								sortable: false,
								key: "location",
								cell: (data) => {
									return user?.healthUnit?.name;
								},
							},
							{
								header: "Consignor",
								className: "text-left",
								tdClassName: "text-left",
								sortable: true,
								key: "consignor",
							},
							{
								header: "Term",
								className: "text-left",
								tdClassName: "text-left",
								sortable: true,
								key: "term",
							},
							{
								header: "HCI Name & Number",
								className: "text-left",
								tdClassName: "text-left",
								sortable: true,
								key: "hci",
								cell: (data) => {
									return (
										<div className="flex flex-col">
											<span className="font-bold font-montserrat text-base">
												{data?.hci_name}
											</span>
											<span className="font-light font-montserrat text-sm">
												#{data?.hci_number}
											</span>
										</div>
									);
								},
							},
							{
								header: "Status",
								className: "text-center w-[128px]",
								tdClassName:
									"text-center font-bold !text-black w-[128px]",
								key: "status",
								cell: (data) => {
									return renderStatus(data?.status);
								},
							},
							{
								header: "Action",
								className: `w-[150px]`,
								tdClassName: `text-center`,
								key: "action",
								cell: (data) => {
									return (
										<div className="flex items-center justify-center flex-wrap gap-2">
											<ActionBtn
												size="sm"
												type="primary"
												onClick={() => {
													viewConsigmentRef.current.show(
														data
													);
												}}
											>
												<FlatIcon
													icon="rr-eye"
													className="mr-2"
												/>
												View
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
				<CreateCOFModal
					key={`CreateCOFModal`}
					ref={cofModalRef}
					onSuccess={reloadData}
				/>
				<ViewConsignmentModal
					ref={viewConsigmentRef}
					onSuccess={reloadData}
				/>
			</div>
		</AppLayout>
	);
};

export default Consignments;

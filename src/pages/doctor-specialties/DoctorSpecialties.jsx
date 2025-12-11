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
import PageTitle from "../../components/layout/PageTitle";
import SpecialtyFormModal from "./components/SpecialtyFormModal";
import ActivateSpecialtyModal from "./components/ActivateSpecialtyModal";
import DeactivateSpecialtyModal from "./components/DeactivateSpecialtyModal";
// import RHUListFormModal from "./components/RHUListFormModal";
// import DeactivateHealthUnitModal from "./components/DeactivateHealthUnitModal";
// import ActivateHealthUnitModal from "./components/ActivateHealthUnitModal";
const uniq_id = uuidv4();
const DoctorSpecialties = (props) => {
	const { patient } = props;
	const { user } = useAuth();
	const specialtyFormRef = useRef(null);
	const activateSpecialtyFormRef = useRef(null);
	const deactivateSpecialtyFormRef = useRef(null);
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
		url: `v1/specialties/list`,
		defaultFilters: {
			key: uniq_id,
		},
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
						icon={"rr-trophy"}
						title={"Doctor Specialties"}
						subtitle={
							"Add, edit, deactivate and view doctor specialties."
						}
					/>
					<ActionBtn
						type="success"
						className="ml-auto h-11"
						onClick={() => {
							specialtyFormRef.current.show();
						}}
					>
						<FlatIcon icon="rr-layer-plus" className="mr-2" />
						<span className="text-xs font-medium">
							Add Specialty
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
						onSort={(column, direction) => {
							setFilters((prevFilters) => ({
								...prevFilters,
								key: uuidv4(),
								column: column,
								direction: direction,
							}));
						}}
						columns={[
							{
								header: "Name",
								className: "text-left",
								tdClassName: "text-left",
								key: "name",
								sortable: true,
								cell: (data) => {
									return data?.name;
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
													specialtyFormRef.current.show(
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
														deactivateSpecialtyFormRef.current.show(
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
														activateSpecialtyFormRef.current.show(
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
			<SpecialtyFormModal
				ref={specialtyFormRef}
				onSuccess={() => {
					reloadData();
				}}
			/>
			<ActivateSpecialtyModal
				ref={activateSpecialtyFormRef}
				onSuccess={() => {
					reloadData();
				}}
			/>
			<DeactivateSpecialtyModal
				ref={deactivateSpecialtyFormRef}
				onSuccess={() => {
					reloadData();
				}}
			/>
			{/* <RHUListFormModal
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
			/> */}
		</AppLayout>
	);
};

export default DoctorSpecialties;

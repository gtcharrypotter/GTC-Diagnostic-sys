import React, { useState } from 'react'
import Pagination from '../../components/table/Pagination';
import useDataTable from '../../hooks/useDataTable';
import AppLayout from '../../components/container/AppLayout';
import TextInput from '../../components/inputs/TextInput';
import DatabaseTable from '../../components/table/DatabaseTable';
import { formatDate } from '../../libs/helpers';
import Table from '../../components/table/Table';

const PatientReferredList = () => {
    const {
		page,
		setPage,
		meta,
		loading,
		paginate,
		setPaginate,
		data,
		setFilters,
	} = useDataTable({
		url: `/v1/diagnostic/patient-referred`,
        // url: `/v1/patient`,
	});
    const [searchInput, setSearchInput] = useState("");

	console.log("Patient Referred", data)
  return (
    <AppLayout>
    <div className="">
		<div className="flex flex-col p-4 gap-4">

			<>
			<div className="flex items-center gap-4 p-2">
			<TextInput
            label="Philhealth Identification No.(PIN)"
            iconLeft={"rr-search"}
            placeholder="Search patient..."
            onChange={(e) => {
              const keyword = e.target.value;
              setSearchInput(keyword); // Update search input state
              setFilters((prevFilters) => ({
                ...prevFilters,
                keyword,
              }));
            }}
          />
		</div>
			<Table
				className={`pb-2`}
				loading={loading}
				columns={[
					{
						header: "PIN",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "m_pin",
						cell: (data) => {
							return data?.patient?.m_pin;
						},
						
					},
					{
						header: "Lastname",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "lastname",
						cell: (data) => {
							return data?.patient?.lastname;
						},
						
					},
					{
						header: "Firstname",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "firstname",
						cell: (data) => {
							return data?.patient?.firstname;
						},
						
					},
					{
						header: "Middlename",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "middle",
						cell: (data) => {
							return data?.patient?.middle;
						},
						
					},
					{
						header: "Extension",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "suffix",
						cell: (data) => {
							return data?.patient?.suffix;
						},
					},
					{
						header: "Sex",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "gender",
						cell: (data) => {
							return data?.patient?.gender;
						},
						
					},
					{
						header: "Date of Birth",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "birthday",
						cell: (data) => {
							return (formatDate(data?.patient?.birthday));
						},
						
					},
					{
						header: "Referred By",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "created_at",
						cell: (data) => {
							return (
								<div className="flex gap-2">
									<span>{data?.referredBy?.title}.</span>
									<span>{data?.referredBy?.firstname}</span>
									<span>{data?.referredBy?.lastname}</span>
								</div>
							);
						},
						
					},
					{
						header: "Referred Date",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "created_at",
						cell: (data) => {
							return (formatDate(data?.created_at));
						},
						
					},
					{
						header: "Status",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "telephone",
						cell: (data) => {
							return data?.status;
						},
						
					}
				]}
				data={data}
			/>
			<div className="flex justify-center w-full pt-4">
            <Pagination
                page={page}
                setPage={setPage}
                pageCount={meta?.last_page}
                pageSize={paginate}
                setPageSize={setPaginate}
            />
			</div>
			</>
		</div>
	</div>
    </AppLayout>
  )
}

export default PatientReferredList

import React from 'react'
import Pagination from '../components/table/Pagination';
import useNoBugUseEffect from '../hooks/useNoBugUseEffect';
import useDataTable from '../hooks/useDataTable';
import Table from '../components/table/Table';

const AtcTestData = () => {
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
	} = useDataTable({
		url: `v1/opd-standalone/phic-masterlist`,
	});
	useNoBugUseEffect({
		functions: () => {
			setPaginate(5);
		},
	});


  return (
    <div className="p-4 flex flex-col gap-y-4 relative">
									<div className="flex flex-col">
										<span className="text-xl font-bold  text-blue-900">
											Philhealth Masterlists
										</span>
									</div>
									<div className="p-5 text-lg">
										
										
                                        <Table
                                            className={`pb-2`}
                                            loading={loading}
                                            columns={[
                                                {
                                                    header: "PIN",
                                                    className: "w-[50px] text-left",
                                                    tdClassName: "text-left",
                                                    key: "mem_pin",
                                                },
                                                {
                                                    header: "1/10/2025",
                                                    className: "w-[200px] text-left",
                                                    tdClassName: "text-left",
                                                    // key: "mem_firstname",
                                                    
                                                },
                                                {
                                                    header: "1/11/2025",
                                                    className: "w-[200px] text-left",
                                                    tdClassName: "text-left",
                                                    // key: "mem_middlename",
                                                },
                                                {
                                                    header: "1/12/2025",
                                                    className: "w-[200px] text-left",
                                                    tdClassName: "text-center",
                                                    // key: "mem_lastname",
                                                },
												{
                                                    header: "1/13/2025",
                                                    className: "w-[200px] text-left",
                                                    tdClassName: "text-center",
                                                    // key: "mem_birthday",
                                                },
                                                {
                                                    header: "1/14/2025",
                                                    className: "w-[200px] text-left",
                                                    tdClassName: "text-center",
                                                    // key: "mem_birthday",
                                                },
                                            ]}
                                            data={data}
                                        />
										<div className="flex justify-center items-center mt-4">
											<Pagination
												page={page}
												setPage={setPage}
												pageCount={meta?.last_page}
												pageSize={paginate}
												setPageSize={setPaginate}
											/>
										</div>
                                        
									</div>
								</div>
  )
}

export default AtcTestData

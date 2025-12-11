/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import Table from '../components/table/Table';
import useDataTable from '../hooks/useDataTable';
import ActionBtn from '../components/buttons/ActionBtn';
import FlatIcon from '../components/FlatIcon';
import { useReactToPrint } from 'react-to-print';

const BarangayCensus = (props) => {
    const { patient, appointment } = props;
    const componentRef = useRef(null);
          
        const handlePrint = useReactToPrint({
            content: () => componentRef.current,
          });
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
		url: `v1/census/census-summary`,
	});
  return (
        <div className="flex flex-col">
        <ActionBtn
        type="primary"
        className="ml-auto"
        size="lg"
        onClick={handlePrint}
        >
        <FlatIcon icon="rr-print" className="text-white mr-1" />
        Print
        </ActionBtn>
         <div className=""  ref={componentRef}>
            <div className="flex flex-col lg:flex-row gap-4 items-center border-b justify- md:justify-start bg-slate-50 p-8 h-full mt-2">
                     <div className="flex items-center pr-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src="/census.png"
                                                    className="h-12 -mx-2 bg-green-50 rounded-lg shadow-xl -mb-1"
                                                />
                                                <h1 className="text-xl font-bold font-opensans text-primary-dark tracking-wider -mb-1 ml-1">
                                                   Barangay Consultation Census
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
				<div className="ml-auto px-4 border-l pt-0 relative">
                    
					
                    <div className="flex flex-col">
                        <span className='text-sky-500 text-sm'>Total Population</span>
                        <span className='text-sky-500 text-xl'>1,500,000</span>
                    </div>
				</div>
                
			</div>
            <div className="mt-4">
						<Table
                            className={`pb-2`}
                            loading={loading}
                            columns={[
                                {
                                    header: "Disease",
                                    className: "text-left",
                                    tdClassName: "text-left",
                                    key: "date",
                                },
                                {
                                    header: "No. of Cases",
                                    className: "text-left",
                                    tdClassName: "text-left",
                                    key: "date",
                                    
                                },
                                {
                                    header: "% of population",
                                    className: "text-left",
                                    tdClassName: "text-left",
                                    key: "doctor",
                                },
                            ]}
                            data={data}
                        />
			</div>
         </div>
			
		</div>
  )
}

export default BarangayCensus

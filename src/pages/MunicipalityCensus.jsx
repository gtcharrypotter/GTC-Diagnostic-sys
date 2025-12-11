import React, { useEffect, useRef, useState } from 'react'
import useDataTable from '../hooks/useDataTable';
import Table from '../components/table/Table';
import { useReactToPrint } from 'react-to-print';
import FlatIcon from '../components/FlatIcon';
import ActionBtn from '../components/buttons/ActionBtn';
import Axios from '../libs/axios';

const MunicipalityCensus = ({ municipalityId }) => {
    // const [loading, setLoading] = useState(true);
    const componentRef = useRef(null);
    const [totalPopulation, setTotalPopulation] = useState(0);
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
		url: `v1/opd-standalone/disease-summary`,
         defaultFilters: { municipality_id: municipalityId },
        defaultPaginate: true,
	});
    const tableData = data?.map((row) => ({
        disease: row?.disease || 'Unknown',
        patient_count: row?.patient_count || 0,
        percent_population: `${((row?.patient_count || 0) / totalPopulation * 100).toFixed(2)}%`,
    }));
       // Fetch total population when municipalityId changes
   useEffect(() => {
        Axios.get(`/v1/diagnostic/municipalities/${municipalityId}/population`)
            .then(res => {
                setTotalPopulation(res.data.total_population);
            })
            .catch(err => console.error(err));
    }, [municipalityId]);
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
                                                    Municipality Consultation Census
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
				<div className="ml-auto px-4 border-l pt-0 relative">
                    
					
                    <div className="flex flex-col">
                        <span className='text-sky-500 text-sm'>Total Population of {municipalityId} </span>
                        <span className='text-sky-500 text-xl'> {totalPopulation}</span>
                    </div>
				</div>
                
			</div>
            <div className="mt-4" >
						<Table
                            className={`pb-2`}
                            loading={loading}
                            columns={[
                                {
                                    header: "Disease",
                                    className: "text-left",
                                    tdClassName: "text-left",
                                    key: "disease",
                                },
                                {
                                    header: "No. of Cases",
                                    className: "text-left",
                                    tdClassName: "text-left",
                                    key: "patient_count",
                                    
                                },
                                {
                                    header: "% of population",
                                    className: "text-left",
                                    tdClassName: "text-left",
                                    key: "doctor",
                                },
                            ]}
                            data={tableData}
                        />
			</div>
        </div>
			
                    
		</div>
  )
}

export default MunicipalityCensus

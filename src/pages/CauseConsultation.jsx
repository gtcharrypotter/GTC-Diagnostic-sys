import React, { useState } from 'react'
import ReactSelectInputField from '../components/inputs/ReactSelectInputField';
import useNoBugUseEffect from '../hooks/useNoBugUseEffect';
import Axios from '../libs/axios';
import useDataTable from '../hooks/useDataTable';
import { v4 as uuidv4 } from "uuid";
import { Fade } from 'react-reveal';
import BarangayCensus from './BarangayCensus';
import MunicipalityCensus from './MunicipalityCensus';
const uniq_id = uuidv4();
const CauseConsultation = () => {
    const [filters, setFilters] = useState();
    // const [patient, setPatient] = useState(null);
    const [rhuList, setRHUList] = useState([]);
	const [RHU, setRHU] = useState(null);

	const [bhsList, setBHSList] = useState([]);
	const [BHS, setBHS] = useState(null);
    useNoBugUseEffect({
		functions: () => {
			getRHUList();
		},
		params: [],
	});
	useNoBugUseEffect({
		functions: () => {
			getBHSList();
		},
		params: [RHU],
	});
	useNoBugUseEffect({
		functions: () => {
			if (RHU?.id && BHS?.id) {
				setFilters((prevFils) => ({
					...prevFils,
					municipality: RHU?.name?.replace("RHU", ""),
					barangay: BHS?.name?.replace("BHS", ""),
				}));
			}
		},
		params: [RHU, BHS],
	});
    const getRHUList = () => {
		return Axios.get(`v1/health-unit/list?type=RHU&paginate=300`).then(
			(res) => {
				setRHUList(res.data.data);
			}
		);
	};
	const getBHSList = () => {
		return Axios.get(
			`v1/health-unit/list?type=BHS&paginate=300&municipality_id=${RHU?.municipality_id}`
		).then((res) => {
			setBHSList(res.data.data);
		});
	};
  return (

    <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className=" lg:col-span-4 xl:col-span-3 flex flex-col gap-y-4">
               
                <div className="pr-5 flex flex-col gap-y-3">
                    <ReactSelectInputField
						isClearable={false}
						inputClassName=" "
						value={RHU?.id}
						onChangeGetData={(data) => {
							setRHU(data?.rhu);
							setBHS(null);
						}}
						placeholder="Select RHU"
						options={rhuList?.map((option) => ({
							label: option?.name,
							value: option?.id,
							rhu: option,
						}))}
					/>
                    <ReactSelectInputField
						isClearable={false}
						inputClassName=" "
						value={BHS?.id}
						onChangeGetData={(data) => {
							setBHS(data?.bhs);
						}}
						placeholder="Select Barangay"
						options={bhsList?.map((option) => ({
							label: option?.name,
							value: option?.id,
							bhs: option,
						}))}
					/>
                </div>
            </div>
            <div className=" lg:col-span-8 xl:col-span-9">
                        {RHU?.id && !BHS?.id ? (
                            <Fade key={`municipality-${RHU?.id}`}>
                            <MunicipalityCensus 
                                // Optionally pass data here if necessary
                                municipality={RHU}
                            />
                            </Fade>
                        ) : (
                            RHU?.id && BHS?.id && (
                            <Fade key={`barangay-${BHS?.id}`}>
                                <BarangayCensus 
                                // Optionally pass data here if necessary
                                barangay={BHS}
                                />
                            </Fade>
                            )
                        )}
            </div>
        </div>
    </div>
   
  )
}

export default CauseConsultation

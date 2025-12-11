import React, { useRef, useState } from 'react'
import Axios from '../libs/axios';
import CensusWidget from '../components/CensusWidget';
import PageHeader from '../components/layout/PageHeader';
import AppLayout from '../components/container/AppLayout';
import { useAuth } from '../hooks/useAuth';
import useNoBugUseEffect from '../hooks/useNoBugUseEffect';

const Census = () => {
    const { user } = useAuth();
	const promotionModalRef = useRef(null);
	const [data, setData] = useState(null);
	const [municipalitydata, setMunicipalityData] = useState([]);
	const [barangaydata, setBarangayData] = useState([]);
	const [purokData, setPurokData] = useState([]);

	useNoBugUseEffect({
		functions: () => {
			setTimeout(() => {
				getCensus();
				getByMunicipality();
				getByBarangay();
				getByPurok();
				getPurokPopulationByBarangay();
			}, 400);
		},
		params: [1],
	});

	const getCensus = () => {
		Axios.get(`/v1/census/census-summary`).then((res) => {
			setData(res.data.data);
		});
	};

	const getByMunicipality = () => {
		Axios.get(`v1/census/municipality-population`).then((res) => {
			setMunicipalityData(res.data.data);
		});
	};
	const getByBarangay = () => {
		Axios.get(`v1/census/barangay-population`).then((res) => {
			setBarangayData(res.data.data);
		});
	};
	const getByPurok = () => {
		Axios.get(`v1/census/purok-population/`).then((res) => {
			setPurokData(res.data.data);
		});
	};
	const getPurokPopulationByBarangay = () => {
		Axios.get(
			`v1/census/purok-population-of-barangay?barangay=${user?.healthUnit?.barangay}`
		);
	};
  return (
    <>
			<AppLayout>
				<PageHeader
					title="Census"
					subtitle={<>Population statistics</>}
					icon="rs-stats"
				/>
				<div className="grid grid-cols-1 lg:grid-cols-12 p-5 gap-5  ">
					<CensusWidget
						className="lg:col-span-4"
						icon={"rs-users"}
						title={"Total Barangay Population"}
						value={data?.total_population_barangay}
						bgColor="bg-slate-200"
						textColor="text-slate-900"
					/>
					<CensusWidget
						className="lg:col-span-4"
						icon={"rs-mars-double"}
						title={"Total Male"}
						value={data?.total_brgy_male}
						bgColor="bg-blue-100"
						textColor="text-blue-700"
					/>
					<CensusWidget
						className="lg:col-span-4"
						icon={"rs-venus-double"}
						title={"Total Female"}
						value={data?.total_brgy_female}
						bgColor="bg-red-100"
						textColor="text-red-700"
					/>
					<CensusWidget
						className="lg:col-span-4"
						icon={"rs-child-head"}
						title={"Child"}
						value={data?.total_brgy_children}
						bgColor="bg-green-100"
						textColor="text-green-700"
					/>
					<CensusWidget
						className="lg:col-span-4"
						icon={"rs-people"}
						title={"Adults"}
						value={data?.total_brgy_adults}
						bgColor="bg-yellow-100"
						textColor="text-yellow-600"
					/>
					<CensusWidget
						className="lg:col-span-4"
						icon={"rs-person-walking-with-cane"}
						title={"Senior"}
						value={data?.total_brgy_seniors}
						bgColor="bg-orange-100"
						textColor="text-orange-700"
					/>
					<div className="rounded-xl shadow-xs bg-white bg-opacity-10 overflow-hidden !border !border-blue-500 lg:col-span-6">
						<h3 className="text-lg font-bold text-blue-600 p-3 m-0">
							Population by Purok - Barangay{" "}
							{user?.healthUnit?.barangay}
						</h3>
						<table className="w-full !border-t !border-blue-500">
							<thead>
								<tr className="divide-x bg-blue-500">
									<th className="py-3 px-3 text-sm border-b text-white">
										Purok
									</th>
									<th className="py-3 px-3 text-sm border-b text-white w-1/4">
										Population
									</th>
									<th className="py-3 px-3 text-sm border-b text-white w-1/6 text-center">
										%
									</th>
								</tr>
							</thead>
							<tbody className="divide-y border-b">
                            {municipalitydata?.map((value,index) => {
								return (
									<tr className="divide-x !border-blue-200" key={`purk-pop-${index}`}>
										<td className="px-3 py-2 text-gray-500 !border-blue-100 text-sm">
											{value?.municipality}
										</td>
										<td className="px-3 py-2 text-gray-500 !border-blue-100 text-sm">
											{value?.population}
										</td>
										<td className="px-3 py-2 text-gray-500 !border-blue-100 text-sm w-1/6 text-center">
											{parseFloat(
												(value?.population /
													data?.total_population) *
													100
											).toFixed(1)}
											%
										</td>
									</tr>
								);
							})}
							</tbody>
						</table>
					</div>
				</div>
			</AppLayout>
		</>
  )
}

export default Census

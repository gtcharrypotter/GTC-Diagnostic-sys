import React, { useState } from 'react'
/* eslint-disable react/prop-types */

import { v4 as uuidv4 } from "uuid";
import ActionBtn from '../../../components/buttons/ActionBtn';
import FlatIcon from '../../../components/FlatIcon';
import CaseDetails from '../../doctor-patient-queue/components/CaseDetails';
import { procedureRates } from '../../../libs/procedureRates';
import { caseCodes } from '../../../libs/caseCodes';
import ReactSelectInputField from '../../../components/inputs/ReactSelectInputField';
import PatientCSROrder from '../../department/his-nurse/components/PatientCSROrder';
import CollapseDiv from '../../../components/CollapseDiv';
import PatientPharmacyOrder from '../../department/his-nurse/components/PatientPharmacyOrder';
import { useAuth } from '../../../hooks/useAuth';
const uniq_id = uuidv4();
const AddEmergency = ({
	sendToOR,
	sendNurseStation,
	setDiagnosis,
	loading,
	patient,
	appointment
}) => {
	const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
	const { checkSpecialtyType } = useAuth();
  return (
	<>
	<div className="flex flex-col w-full gap-4 pb-2">
					<div className="grid grid-cols-1 lg:grid-cols-1 gap-5">
					<div className="flex flex-col gap-5 border p-5 rounded-xl">
						<div className="">
							<h4 className="text-md text-indigo-800  font-bold mb-4">
								Add Diagnosis
							</h4>
							<span className="text-slate-500 text-sm">
								Select diagnosis
							</span>
							<ReactSelectInputField
								isClearable={true}
								// isLoading={
								// 	isSelectorLoading
								// }
								inputClassName=" "
								value={selectedDiagnosis?.CASE_CODE}
								onChangeGetData={(data) => {
									if (setDiagnosis) {
										setDiagnosis(data?.value);
									}
									setSelectedDiagnosis(data?.item);
								}}
								placeholder={`Select Diagnosis`}
								options={caseCodes?.map((item) => ({
									value: item?.CASE_CODE,
									label: item?.CASE_DESCRIPTION,
									item: item,
								}))}
							/>
						</div>
						{selectedDiagnosis ? (
							<CaseDetails
								selectedCase={selectedDiagnosis}
								title="Diagnosis Details"
							/>
						) : (
							""
						)}
					</div>
					
				</div>
					<div className="p-0 flex flex-col gap-y-4 relative w-full">
						<CollapseDiv
								defaultOpen={false}
								withCaret={true}
								title="Pharmacy"
								headerClassName="bg-blue-50"
								bodyClassName="p-0"
								>
                                <PatientPharmacyOrder
								patient={patient}
								appointment={appointment}
								/>
								</CollapseDiv>

								<CollapseDiv
								// defaultOpen={
								// 	appointment?.status ==
								// 		"pending-or-refer"
								// 	}
								defaultOpen={false}
								withCaret={true}
								title="CSR"
								headerClassName="bg-blue-50"
								bodyClassName="p-0"
								>
								{/* <AddCsr 
								items={items}
								setItems={setItems}
								selectedItemsCsr={selectedItemsCsr}
								setSelectedItemsCsr={setSelectedItemsCsr}
								// prescribeItemsCSR={prescribeItemsCSR}
								loading={loading}
								/> */}
                                <PatientCSROrder
								patient={patient}
								appointment={appointment}
								/>
								</CollapseDiv>
								<div className="flex flex-col-2 gap-4">
								
								<ActionBtn
								className="!rounded mx-auto h-16 w-1/4"
								type="danger"
								// size="lg"
								loading={loading}
								onClick={() => {
									sendToOR();
								}}
								>
								<FlatIcon
									icon="rr-stretcher"
									className="mr-2 text-xl"
								/>
								For Operation
								</ActionBtn>
								<ActionBtn
										className="px-4 !rounded mx-auto h-16 w-1/4"
										type="primary-dark"
										// size="lg"
										// disabled={setDiagnosis?.length == 0}
										loading={loading}
										onClick={() => {
											sendNurseStation();
										}}
									>
										<FlatIcon
											icon="rr-list-check"
											className="mr-2 text-xl"
										/>
										May Go Home (MGH)
									</ActionBtn>
							
							</div>
							
					</div>
				</div>
			
		</>
  )
}

export default AddEmergency

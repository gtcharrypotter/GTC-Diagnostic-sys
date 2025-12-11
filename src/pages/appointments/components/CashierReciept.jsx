
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth';
import { useReactToPrint } from 'react-to-print';
import useNoBugUseEffect from '../../../hooks/useNoBugUseEffect';
import FlatIcon from '../../../components/FlatIcon';
import ActionBtn from '../../../components/buttons/ActionBtn';
import InfoTextForPrint from '../../../components/InfoTextForPrint';
import { calculateAgeV3, dateToday, doctorName, doctorSpecialty, formatDate, formatDateTime } from '../../../libs/helpers';
import { caseCodes } from '../../../libs/caseCodes';
import Axios from '../../../libs/axios';
import SummaryOfCharges from '../../../components/cashier-billing/component/billing/SummaryOfCharges';
import SummaryWithPhic from '../../../components/cashier-billing/component/billing/SummaryWithPhic';
import ProfessionalFeeSOA from '../../../components/cashier-billing/component/billing/ProfessionalFeeSOA';
import EditTextForPrint from '../../../components/EditTextForPrint';

const CashierReciept = (props) => {
    const { loading: btnLoading, appointment, patient, onSaveCashier } = props;
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);
	const componentRef = React.useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	useNoBugUseEffect({
		functions: () => {
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		},
		params: [appointment],
	});
	console.log("DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", appointment)
	const handleSave = () => {
		if (onSaveCashier) {
			onSaveCashier();
		}
	};
	let diagnosis = caseCodes?.find(
	(x) => x.CASE_CODE == appointment?.diagnosis_code
	);
  return (
     <div className="relative">	
			<div className="border shadow ">
				<div className="text-justify" ref={componentRef}>
					<div className="border">	
                        <div className="flex justify-center items-center my-4">
							<img
									src="/Province_of_Sarangani.png"
									className="w-24 h-24 object-contain "
							/>
						</div>
					<div className="text-base text-center font-semibold">
						<span>SARANGANI MEDICAL CLINIC</span>
					</div>
					<div className="text-sm text-center font-light ">
						<span>Capitol Complex, Alabel, Sarangani</span>
					</div>
					<div className="text-sm text-center font-light ">
						<span>Tel. No. 083 508 0262</span>
					</div>
					<div className="text-base text-center font-semibold mt-8 mb-4">
						<span>Statement of Account</span>
					</div>
					


				
					<div className="grid grid-cols-2 gap-1 m-2">
						<div className="mr-auto">
						<div className="m-2">
							<InfoTextForPrint
								contentClassName="text-xs"
								title="Fullname"
								value={`${patient?.lastname}, ${patient?.firstname}, ${patient?.middle}`}
							/>
							<InfoTextForPrint
								contentClassName="text-xs"
								title="Address"
								value={`${patient?.zone}, ${patient?.street}, ${patient?.barangay}, ${patient?.municipality}, ${"Sarangani"}`} //add a city ${patient?.city?.name}
							/>
							<InfoTextForPrint
								contentClassName="text-xs"
								title="Date/Time Admitted"
								value={formatDateTime(appointment?.start_time_in)}
							/>
							<InfoTextForPrint
								contentClassName="text-xs"
								title="Date/Time Discharge"
								value={formatDateTime(appointment?.discharge_date_time)}
							/>
							<InfoTextForPrint
								contentClassName="text-xs"
								title="Attending Physician"
								value={<div className="flex flex-col">
											<span>
												{doctorName(
													appointment?.referredToDoctor
												)}
											</span>
										</div>}
							/>
							<InfoTextForPrint
								contentClassName="text-xs"
								title="MSS Classification"
								// value={patient?.civil_status}
							/>
							<InfoTextForPrint
							contentClassName="text-xs"
							title="Final Diagnosis"
							value={appointment?.diagnosis?.case_description || "N/A"}
							/>
								<InfoTextForPrint
								contentClassName="text-xs"
								title="Hospital No."
								value={appointment?.rhu_id}
							/>

							<InfoTextForPrint
								contentClassName="text-xs"
								title="Case No."
								value={appointment?.transaction_no}
							/>

							<InfoTextForPrint
								contentClassName="text-xs"
								title="Room"
								value={appointment?.room_number}
							/>
							<InfoTextForPrint
								contentClassName="text-xs"
								title="Age"
								value={calculateAgeV3(
														appointment?.patient
															?.birthday
													)}
							/>
							<InfoTextForPrint
								contentClassName="text-xs"
								title="PHIC Membership"
								value={appointment?.patient?.philhealth}
							/>
						</div>

						
						
						</div>
						
						
					</div> 
					{/* Summary of Charges */}
					<div className="">
						<h5 className="text-sm bg-gray-700 font-md font-mono text-center text-white">
							SUMMARY OF CHANGES
						</h5>
						{/* <div className="border rounded-md">
							<div className="border bg-gray-100 rounded-sm grid grid-cols-6 divide-x text-sm font-semibold text-center"> */}
						<div className="">
							<div className="border bg-blue-100  grid grid-cols-6 divide-x text-sm font-semibold text-center font-mono">
								<div className="col-span-2">PARTICULARS</div>
								<div className="col-span-1">DEBIT</div>
								<div className="col-span-1">DISCOUNT</div>
								<div className="col-span-1">CREDIT</div>
								<div className="col-span-1">BALANCE</div>
							</div>
							{/* <div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2"> */}
							<div className="grid grid-cols-6 divide-x text-xs font-light mt-2 font-mono">
								<div className="col-span-2 text-left ml-2">
									Drugs and Medicines (GF)
								</div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
							</div>
							{/* <div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2"> */}
							<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
								<div className="col-span-2 text-left ml-2">
									NonDrugs / Supplies
								</div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
							</div>
							<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
								<div className="col-span-2 text-left ml-2">
									Laboratory Examination
								</div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
							</div>
							<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
								<div className="col-span-2 text-left ml-2">
									Radiology
								</div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
							</div>
							<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
								<div className="col-span-2 text-left ml-2">
									Miscellaneous
								</div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
							</div>
							<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
								<div className="col-span-2 text-left ml-2">PHIC</div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
							</div>
							<div className="grid grid-cols-6 border-t divide-x text-sm font-semibold text-center mt-2 font-mono">
								<div className="col-span-2 text-right mr-1">Total:</div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
							</div>
						</div>
					</div>
					{/* Summary of PHIC */}
					<div className=" p-2">
						<h5 className="text-sm font-md font-mono text-center  bg-gray-700 text-white">
							SUMMARY OF CHANGES - PHIC
						</h5>

						<div className="flex text-base font-semibold m-2">
							<p>
								ICD-10 Code: {diagnosis?.case_code} -{" "}
								{diagnosis?.case_rate_code}
							</p>
						</div>

						<div className="grid grid-cols-2">
							<div className="text-xs">
								Firstcase description: {diagnosis?.case_description}
							</div>
							<div className="text-xs">Secondcase description: {diagnosis?.case_description}</div>
						</div>
						<div className="border rounded-md mt-2">
							<div className="border bg-gray-100 rounded-sm grid grid-cols-7 divide-x text-sm font-semibold text-center">
								<div className="col-span-2">PARTICULARS</div>
								<div className="col-span-1">ACTUAL CHARGES</div>
								<div className="col-span-1">
									SENIOR CITIZEN / PWD DISCOUNT
								</div>
								<div className="col-span-1">FIRST CASE</div>
								<div className="col-span-1">SECOND CASE</div>
								<div className="col-span-1">BALANCE</div>
							</div>
							<div className="grid grid-cols-7 divide-x text-xs font-light text-center mt-2 font-mono">
								<div className="col-span-2 text-left ml-2 font-mono">
									Hospital Charges
								</div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
							</div>
							<div className="grid grid-cols-7 divide-x text-xs font-light text-center mt-2 font-mono">
								<div className="col-span-2 text-left ml-2 font-mono">
									Professional Fees
								</div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
							</div>

							<div className="grid grid-cols-7 border-t divide-x text-sm font-semibold text-center mt-2 font-mono">
								<div className="col-span-2 text-right mr-1">Total:</div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
							</div>
						</div>
					</div>

					{/* professional Fee */}
					<div className="border shadow p-2">
						<h5 className="text-sm font-semibold text-center bg-gray-700 font-mono text-white">
							PROFESSIONAL FEE
						</h5>
							<div className="border ">
							<div className="border bg-blue-200 rounded-sm grid grid-cols-6 divide-x text-sm font-semibold text-center font-mono items-center">
								<div className="col-span-2">PARTICULARS</div>
								<div className="col-span-1">ACTUAL CHARGES</div>
								<div className="col-span-1">
									SENIOR CITIZEN / PWD DISCOUNT
								</div>
								<div className="col-span-1">PHIC</div>
								<div className="col-span-1">BALANCE</div>
							</div>
							<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
								<div className="col-span-2 text-left ml-2">
									<div className="flex flex-col">
													<span>
														{doctorName(
															appointment?.referredToDoctor
														)}
													</span>
													<span className="text-xs font-light">
														{doctorSpecialty(
															appointment?.referredToDoctor
														)}
													</span>
												</div>
								</div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
							</div>

							<div className="grid grid-cols-6 border-t divide-x text-sm font-semibold text-center mt-2 font-mono">
								<div className="col-span-2 text-right mr-1">Total:</div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center "><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
								<div className="col-span-1 justify-center items-center"><EditTextForPrint
								contentClassName="text-xs text-center ml-2"
								value={appointment?.prescriptions?.item?.description || "0.00"}
								/></div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-3 divide-x text-sm font-bold text-center mt-2">
						<div className="col-span-2 text-right mr-1">Balance:</div>
						<div className="col-span-1 justify-center items-center"><EditTextForPrint
						contentClassName="text-sm text-center ml-2"
						value={appointment?.prescriptions?.item?.description || "0.00"}
						/></div>
					</div>
					</div>
                    
				</div>
						<div className="p-4 flex items-center justify-end">
					<ActionBtn
						type="primary"
						className="ml-2"
						loading={btnLoading}
						onClick={handlePrint}
					>
						<FlatIcon icon="rr-print" />
						Print
					</ActionBtn>
					<ActionBtn
						type="success"
						className="ml-2"
						loading={btnLoading}
						onClick={handleSave}
					>
						<FlatIcon icon="rr-check" />
						Discharge
					</ActionBtn>
					
					
					{/* <ActionBtn className="ml-2" onClick={handleDownload}>
                    Download
                  </ActionBtn>  */}
				</div>
				

			</div>

		</div>
  )
}

export default CashierReciept

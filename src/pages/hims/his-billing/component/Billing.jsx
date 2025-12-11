import React, { useState } from "react";
import FlatIcon from "../../../../components/FlatIcon";
import InfoTextForPrint from "../../../../components/InfoTextForPrint";
import ActionBtn from "../../../../components/buttons/ActionBtn";
import ProfessionalFeeSOA from "../../../../components/cashier-billing/component/billing/ProfessionalFeeSOA";
import SummaryOfCharges from "../../../../components/cashier-billing/component/billing/SummaryOfCharges";
import SummaryWithPhic from "../../../../components/cashier-billing/component/billing/SummaryWithPhic";
import useNoBugUseEffect from "../../../../hooks/useNoBugUseEffect";
import { useAuth } from "../../../../hooks/useAuth";
import { calculateAgeV3, dateToday, doctorName, doctorSpecialty, formatDate, formatDateMMDDYYYY, formatDateTime } from "../../../../libs/helpers";
import { useReactToPrint } from "react-to-print";
import CreditCardDetails from "./CreditCardDetails";
import AmountDue from "./AmountDue";
import { caseCodes } from "../../../../libs/caseCodes";

/* eslint-disable react/prop-types */
const Billing = (props) => {
    const { loading: btnLoading, appointment, patient, onSaveBilling, onSaveCashier } = props;
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);
	const componentRef = React.useRef(null);
	const billingStatus = patient?.billing_status || "pending";
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
	const handleSave = () => {
		if (onSaveBilling) {
			onSaveBilling();
		}
		if (onSaveCashier) {
			onSaveCashier();
		}

	};

	let diagnosis = caseCodes?.find(
		(x) => x.CASE_CODE == appointment?.diagnosis_code
	);
  return (
    <div className="relative">
			{loading ? (
				<div className="absolute top-0 left-0 h-full w-full flex items-start justify-center bg-slate-200 bg-opacity-95 backdrop-blur pt-[244px] z-10">
					<div className="flex items-center justify-center text-2xl animate-pulse">
						Loading, please wait...
					</div>
				</div>
			) : (
				""
			)}
			<div className="m-2">
				<div className=" gap-2 text-base">
					<FlatIcon icon="rr-wallet" className="text-base" />
					<span className="text-lg font-semibold m-2">
						Status: {""}
						{appointment?.status === "pending-for-billing-release" ? (
							<span className="text-yellow-700">Tentative Billing</span>
						):(
							<span className="text-green-700">MGH</span>
						)}
					</span>
				</div>
			</div>
					
			<div className="border shadow p-2">
				<div className="text-justify" ref={componentRef}>
					<div className="border-b">
						<div className="grid grid-cols-1 gap-2 m-2">
							<InfoTextForPrint
								contentClassName="text-xs"
								className="ml-auto"
								title="Date Today"
								value={formatDate(patient?.birthday)}
							/>
						<div className="">
							<div className="flex justify-center items-center my-4">
								<img
										src="/Province_of_Sarangani.png"
										className="w-24 h-24 object-contain "
									/>
							</div>
								<div className="text-sm text-center font-semibold">
								<span>SARANGANI PROVINCIAL HOSPITAL</span>
							</div>
							<div className="text-xs text-center font-light ">
								<span>Capitol Complex, Alabel, Sarangani</span>
							</div>
							<div className="text-xs text-center font-light ">
								<span>Tel. No. 083 508 0262</span>
							</div>
							{/* <div className="text-sm text-center font-semibold m-4">
								<span>PATIENT'S STATEMENT OF ACCOUNT</span>
							</div>
							<div className="text-sm text-center font-semibold m-4">
								{appointment?.status === "pending-for-billing-release" ? (
									<span className="text-gray-950">TENTATIVE</span>
								):(
									<span className="text-gray-950">FINAL BILL</span>
								)}
							</div> */}

						</div>
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
								value={formatDateTime(appointment?.end_time_out)}
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
								value={diagnosis?.CASE_DESCRIPTION}
							/>
								<InfoTextForPrint
								contentClassName="text-xs"
								title="Hospital No."
								value={appointment?.id}
							/>

							<InfoTextForPrint
								contentClassName="text-xs"
								title="Account No."
								// value={patient?.civil_status}
							/>

							<InfoTextForPrint
								contentClassName="text-xs"
								title="Ward"
								value={appointment?.ward}
							/>

							<InfoTextForPrint
								contentClassName="text-xs"
								title="Room"
								value={appointment?.room_number}
							/>

							<InfoTextForPrint
								contentClassName="text-xs"
								title="Bed"
								// value={patient?.civil_status}
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
						
						<div className="ml-auto gap-x-2">
							<CreditCardDetails/>
							<AmountDue
						appointment={appointment}
                        patient={patient}
					/>
						</div>
					</div> 
					
					<SummaryOfCharges
						appointment={appointment}
						patient={patient}
						className="m-2"
					/>
					<SummaryWithPhic
						appointment={appointment}
						patient={patient}
						className="m-2"
					/>
					<ProfessionalFeeSOA
						appointment={appointment}
						patient={patient}
						className="m-2"
					/>
					<div className="grid grid-cols-2">
						<div className="mt-8 ml-4">
							<InfoTextForPrint
								contentClassName="text-xs"
								title="CERTIFIED CORRECT BY"
								value={user?.name}
							/>
						</div>
						<div className="mt-8 mr-4">
							<InfoTextForPrint
								contentClassName="text-xs"
								title="OR Number"
								value={""}
							/>
							<InfoTextForPrint
								contentClassName="text-xs"
								title="Amount"
								// value={patient?.civil_status}
							/>
							<InfoTextForPrint
								contentClassName="text-xs"
								title="Date"
								value={dateToday()}
							/>
						</div>
					</div>

					<div className="grid grid-cols-2">
						<div className="mt-4 ml-4">
							<InfoTextForPrint
								contentClassName="text-xs"
								title="Contact No."
								// value={patient?.civil_status}
							/>
							<p className="text-xs">PLEASE PAY AT THE CASHIER</p>
						</div>
						<div className="mt-8 mr-4">
							<p className="text-xs">
								Signature Over Printed Name of Member or
								Representative
							</p>
						</div>
					</div>
					</div>
					{appointment?.status === 'pending-for-cashier' ? (
					<div className="border mt-28">	

					<div className="text-base text-center font-semibold">
						<span>SARANGANI PROVINCIAL HOSPITAL</span>
					</div>
					<div className="text-sm text-center font-light ">
						<span>Capitol Complex, Alabel, Sarangani</span>
					</div>
					<div className="text-sm text-center font-light ">
						<span>Tel. No. 083 508 0262</span>
					</div>
					<div className="text-base text-center font-semibold mt-8 mb-4">
						<span>Prescription</span>
					</div>
					


					<div className="grid grid-cols-2 gap-2 m-2">
						<div className="m-2">
							<InfoTextForPrint
								contentClassName="text-xs"
								title="Fullname"
								value={`${patient?.lastname}, ${patient?.firstname}, ${patient?.middle}`}
							/>
							<InfoTextForPrint
								contentClassName="text-xs"
								title="Address"
								value={`${patient?.street}, ${patient?.zone}, ${
									patient?.barangay?.name
								}, ${
									patient?.municipality?.name
								}, ${"Sarangani"}`} //add a city ${patient?.city?.name}
							/>
							
						</div>
						<div className="m-2">
							<InfoTextForPrint
								contentClassName="text-xs"
								title="Date"
								value={formatDate(new Date())}
							/>

						
						</div>
						<div className="border col-span-2">
								<div className="table w-full">
				<table>
					<thead>
						<tr>
							<th>Item Information</th>
							<th className="text-center">Qty</th>
							<th>Unit</th>
						</tr>
					</thead>
					<tbody>
						{appointment?.prescriptions?.map((item) => {
							return (
								<>
									<tr key={`opri-${item?.id}`}>
										<td>{item?.item?.name}</td>
										<td className="text-center">
											{item?.quantity}
										</td>
										<td>{item?.item?.unit_measurement}</td>
									</tr>
									<tr>
										<td colSpan={4}>Sig.:{item?.sig}</td>
									</tr>
								</>
							);
						})}
					</tbody>
				</table>
			</div>
						</div>
					</div> 
					<div className="grid grid-cols-2">
						<div className="mt-8 ml-4">
							<InfoTextForPrint
								contentClassName="text-xs"
								title="Prescribed By:"
								value={doctorName(
									appointment?.prescribedByDoctor
									)}
							/>
						</div>

					</div>


					</div>
					):(
						""
					)}

				</div>

				<div className="p-4 flex items-center justify-end">
					{/* {billingStatus === "mgh" && (
						<ActionBtn
							className="text-base gap-2 ml-2"
							onClick={handlePrint}
						>
							<FlatIcon icon="rr-print" /> Print
						</ActionBtn>
					)} */}
					{/* Adding more billing-related information here if needed */}
					<ActionBtn
						type="primary"
						className="ml-2"
						loading={btnLoading}
						onClick={handlePrint}
					>
						<FlatIcon icon="rr-print" />
						Print
					</ActionBtn>
					{appointment?.status === 'pending-for-billing-release' ? (
						<ActionBtn
						type="success"
						className="ml-2"
						loading={btnLoading}
						onClick={handleSave}
					>
						<FlatIcon icon="rr-check" />
						Send to Housekeeping
					</ActionBtn>
					):(
					<ActionBtn
						type="success"
						className="ml-2"
						loading={btnLoading}
						onClick={handleSave}
					>
						<FlatIcon icon="rr-check" />
						Done
					</ActionBtn>
					)}
					
					{/* <ActionBtn className="ml-2" onClick={handleDownload}>
                    Download
                  </ActionBtn>  */}
				</div>
			</div>
		</div>
  )
}

export default Billing

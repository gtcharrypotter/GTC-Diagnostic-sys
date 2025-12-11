/* eslint-disable react/prop-types */
import React, { useState } from "react";
import ActionBtn from "../buttons/ActionBtn";
import QRCode from "qrcode.react";
import InfoTextForPrint from "../InfoTextForPrint";
import { formatDate, formatDateTime } from "../../libs/helpers";
import { data } from "autoprefixer";
import { useReactToPrint } from "react-to-print";

const FormHeading = ({ title }) => {
	return (

		<div className="flex items-center h-12">
		<div className="flex items-center">

		</div>
		<div className="flex-grow slanted bg-blue-500 flex items-center justify-start pl-1">
		<span className="text-white">www.saranganiprovincialhospital.com</span>
		</div>
		<div className="flex-grow slanted-reverse bg-blue-700 flex items-center justify-start pl-1">
		<span className="text-blue-700" value="">.</span>
		</div>

		<div className="slanted bg-blue-500 flex items-center justify-start pl-4"></div>


	</div>
	);
};

const LaboratoryFinalReport = (props) => {
    const { patient, appointment } = props;
	const componentRef = React.useRef(null);
console.log('appointmentsssssssssssss', appointment)
const handlePrint = useReactToPrint({
	content: () => componentRef.current,
});
  return (
    <div className="">
		<div className="text-justify  w-[9.5in] h-[6.5in]" ref={componentRef}>
		<div className="flex flex-col-4">
			<div>
					<img
						src="/Province_of_Sarangani.png"
						className="w-24 h-24 object-contain m-2"
					/>
			</div>
				<div className="">
				<div className="flex justify-center items-center my-4">
				
				</div>
					<div className="text-xs font-semibold">
					<span>SARANGANI PROVINCIAL HOSPITAL</span>
				</div>
				<div className="text-xs font-light ">
					<span>Capitol Complex, Alabel, Sarangani</span>
				</div>
				<div className="text-xs font-light ">
					<span>Tel. No. 083 508 0262</span>
				</div>
                <div className="text-xs font-semibold">
					<span>HOSPITAL LABORATORY DEPARTMENT</span>
				</div>
				
                </div>
										
			<div className="flex text-sm ml-auto mt-2">
				<div>
                    <InfoTextForPrint
								contentClassName="text-sm"
								title="Fullname"
								value={`${patient?.lastname}, ${patient?.firstname}, ${patient?.middle}`}
							/>
							<InfoTextForPrint
								contentClassName="text-sm"
								title="Address"
								value={`${patient?.street}, ${patient?.zone}, ${
									patient?.barangay
								}, ${
									patient?.municipality
								}, `} //add a city ${patient?.city?.name}
							/>
                            <InfoTextForPrint
								contentClassName="text-sm"
								title="Account No."
								value={appointment?.order_number}
							/>
							<InfoTextForPrint
								contentClassName="text-sm"
								title="Date/Time."
								value={formatDateTime(appointment?.type?.created_at)}
							/>

							{/* <InfoTextForPrint
								contentClassName="text-sm"
								title="Attending Dr"
								// value={patient?.civil_status}
							/> */}

							{/* <InfoTextForPrint
								contentClassName="text-sm"
								title="Room"
								// value={patient?.civil_status}
							/> */}
                            <div className="text-base text-red-500 font-bold">
                                <span>LABORATORY REPORT</span>
                            </div>
                </div>
                 <QRCode
					value={`user-${appointment?.scheduledBy?.username}`}
					className="ml-4"
					level="H"
					size={48}
				/>
			
			</div>
           
		</div>
										
	<FormHeading title="" />
		

		<div className="flex flex-col p-2 text-sm relative ">
			<b>IMPORTANT REMINDERS:</b>
		
			<p className="text-xs ">
				PLEASE WRITE IN CAPITAL <b>LETTERS</b>
			</p>
			<p className="text-xs">
				All information, fields and trick boxes required in
				this form are necessary. Claim forms with incomplete
				information shall not be processed.
			</p>{" "}
			<b className="text-xs">
				FALSE/INCORRECT INFORMATION OR MISREPRESENTATION
				SHALL BE SUBJECT TO CRIMINAL, CIVIL OR
				ADMINISTRATIVE LIABILITIES.
			</b>
		</div>

		<div className="p-6 flex flex-col gap-y-4 relative border-t-2">
			<div className="text-center font-mono text-sm font-semibold">FINAL REPORT</div>
			
		<div className="p-6 flex flex-col gap-y-4 relative border-t-2">
									{appointment?.type?.name == "GLUCOSE- FBS" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															{appointment?.type?.name}
														</th>
														<td>
															{
																appointment
																
																	?.fbs
															}{" "}
													
														</td>
														<td>
															-
														</td>
														<td>
															&lt; 99 mg/dL
														</td>
														
													
													</tr>
													
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "GLUCOSE- RBS" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															GLUCOSE- RBS
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "24 HOUR CREATININE CLEARANCE" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															24 HOUR URINE VOLUME
														</th>
														<td>
															{
																appointment
																
																	?.hour_urine_volume
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															mL
														</td>
													</tr>
													<tr>
														<th className="capitalize">
															SERUM CREATININE
														</th>
														<td>
															{
																appointment
																
																	?.serum_creatinine
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															mg/dL
														</td>
													</tr>
													<tr>
														<th className="capitalize">
															URINE CREATININE
														</th>
														<td>
															{
																appointment
																
																	?.urine_creatinine
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															mg/dL
														</td>
													</tr>
													<tr>
														<th className="capitalize">
															HOURS URINE CREATININE
														</th>
														<td>
															{
																appointment
																
																	?.hours_urine
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															1000-1500mg
														</td>
													</tr>
													<tr>
														<th className="capitalize">
															CREATININE CLEARANCE
														</th>
														<td>
															{
																appointment
																
																	?.creatinine_clearance
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															98.156 mL/min
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "ALKALINE PHOSPHATASE" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															ALKALINE PHOSPHATASE
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "AMYLASE" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															AMYLASE
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "BLOOD UREA NITROGEN" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															BLOOD UREA NITROGEN
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "BODY FLUID LDH" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															BODY FLUID LDH
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "CREATININE" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															CREATININE
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "CULTURE & SENSITIVITY" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															CULTURE & SENSITIVITY
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "ELECTROLYTES" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															ELECTROLYTES
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "GGT" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															GGT
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "LIPID PROFILE" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															LIPID PROFILE
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "MAGNESIUM" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															MAGNESIUM
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "ORAL GLUCOSE TOLERANCE TEST (OGTT)" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															ORAL GLUCOSE TOLERANCE TEST (OGTT)
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "PHOSPHORUS" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															PHOSPHORUS
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "SGOT (AST)" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															SGOT (AST)
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "SGPT (ALT)" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															SGPT (ALT)
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "TOTAL BILIRUBIN(B1B2)" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															TOTAL BILIRUBIN(B1B2)
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "TOTAL PROTEIN" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															TOTAL PROTEIN
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "URIC ACID" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															URIC ACID
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "COMPLETE BLOOD COUNT (CBC)" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															COMPLETE BLOOD COUNT (CBC)
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "Cuagulation Studies" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															Cuagulation Studies
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "Differential Count" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															Differential Count
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "ERYTHROCYTE SEDIMENTATON RATE (ESR)" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															ERYTHROCYTE SEDIMENTATON RATE (ESR)
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : appointment?.type?.name == "PLATELET COUNT" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															PLATELET COUNT
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									): appointment?.type?.name == "Red Cell Indices" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															Red Cell Indices
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									): appointment?.type?.name == "Rerticulocyte Count" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															Rerticulocyte Count
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									): appointment?.type?.name == "AFB STAIN (ROUTINE)" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															AFB STAIN (ROUTINE)
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									): appointment?.type?.name == "BLOOD CULTURE & SENSITIVITY" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
														BLOOD CULTURE & SENSITIVITY
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									): appointment?.type?.name == "GRAMS STAIN" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															GRAMS STAIN
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									): appointment?.type?.name == "KOH PREPARATION" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															KOH PREPARATION
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									): appointment?.type?.name == "ANTI-HBS(QUALITATIVE) " ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															ANTI-HBS(QUALITATIVE) 
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									): appointment?.type?.name == "ANTI-HCV" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															ANTI-HCV
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									): appointment?.type?.name == "ANTISTREPTOLYSIN-O (ASO) TITER" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															ANTISTREPTOLYSIN-O (ASO) TITER
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									): appointment?.type?.name == "BLOOD TYPING (ABO+Rh)" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															BLOOD TYPING (ABO+Rh)
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									): appointment?.type?.name == "CK - MB" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															CK - MB
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									): appointment?.type?.name == "C-REACTIVE PROTEIN (CRP)" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															C-REACTIVE PROTEIN (CRP)
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									): appointment?.type?.name == "DENGUE DUO" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															DENGUE DUO
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									): appointment?.type?.name == "HBsAg (QUALITATIVE)" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															HBsAg (QUALITATIVE)
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									): appointment?.type?.name == "RA/RF (Rheumatoid Factor)" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															RA/RF (Rheumatoid Factor)
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									): appointment?.type?.name == "Syphilis (Rapid Test)" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															Syphilis (Rapid Test)
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									): appointment?.type?.name == "WIDAL TEST" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															WIDAL TEST
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									): appointment?.type?.name == "TYPHOID" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Unit</th>
														<th>Normal Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															TYPHOID
														</th>
														<td>
															{
																appointment
																
																	?.rbs
															}{" "}
														
														</td>
														<td>
															-
														</td>
														<td>
															70-125 mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : (
										<>
											<div>
												<span
													className={`text-sm mb-1 font-medium text-dark`}
												>
													Attachment
												</span>
												<div className="border border-slate-300 aspect-video relative ">
													<img
														src={
															appointment?.attachment
														}
														className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300"
													/>
												</div>
											</div>
											<div className="flex flex-col">
												<span
													className={`text-sm mb-1 font-medium text-dark`}
												>
													Remarks:
												</span>
												<div
													className="p-2 italic font-light bg-yellow-50"
													dangerouslySetInnerHTML={{
														__html: appointment?.lab_result_notes,
													}}
												></div>
											</div>
										</>
									)}
		</div>
			
		</div>
		</div>
       
							

								<div className="px-4 py-4 border-t flex items-center justify-end bg-slate-">
									<ActionBtn
										// size="lg"
										type="primary-dark"
										className="px-5"
										onClick={handlePrint}
									>
										Print
									</ActionBtn>
								</div>
    </div>
  )
}

export default LaboratoryFinalReport

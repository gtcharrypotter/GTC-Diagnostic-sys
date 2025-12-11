/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import Pagination from "../../../../../components/table/Pagination";
import Table from "../../../../../components/table/Table";
import useDataTable from "../../../../../hooks/useDataTable";
import { calculateAgeV3, dateMMDDYYYYHHIIA, formatDate, formatDateMMDDYYYYHHIIA, formatDateTime, patientAddress, patientFullName } from "../../../../../libs/helpers";
import { useReactToPrint } from "react-to-print";
import ActionBtn from "../../../../../components/buttons/ActionBtn";
import { useAuth } from "../../../../../hooks/useAuth";
import FlatIcon from "../../../../../components/FlatIcon";
import { jsonToXml } from "../../../../../libs/jsonToXml";
import Axios from "../../../../../libs/axios";
const PBEF = ({patient, appointment}) => {
const { user, checkUserType } = useAuth();
  const [hciReferenceNo, setHciReferenceNo] = useState("N/A");
const componentRef = useRef(null);
 useEffect(() => {
    const fetchHciReferenceNo = async () => {
      try {
        const response = await Axios.get(
          `/api/philhealth/hci-reference/${appointment?.id || patient?.id}`
        );
        setHciReferenceNo(response.data.reference_no || "N/A");
      } catch (error) {
        console.error("Failed to fetch HCI Portal Reference No.", error);
        setHciReferenceNo("N/A");
      }
    };

    fetchHciReferenceNo();
  }, [appointment?.id, patient?.id]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className="bg-gray-600 p-11 min-h-[14in]  overflow-auto phic-forms">
		{checkUserType("DOCTOR") ? (
		""
		) : (
		<div className="flex gap-2">
		<ActionBtn
          type="primary"
          className="ml-auto mr-5 mb-5 py-4 !text-lg"
          size="md"
          onClick={handlePrint}
        >
          <FlatIcon icon="rr-print" className="text-white mr-1" />
          Generate & Print
        </ActionBtn>
		</div>
		)}
			<div
				className="bg-white p-[0.5in] w-[9.5in] gap-y-6 mx-auto"
				id="phic-form-printable" ref={componentRef}
			>
				<div className="bg-white flex flex-col w-[8.5in] min-h-[13in]">
					<div className="flex items-center relative justify-center px-2 pt-2 pb-1">
						<img
							className="w-[144px] left-2 object-contain"
							src="/philhealth.png"
						/>
						<div className="flex flex-col text-left w-full mx-auto">
							<p className="text-xs text-center">
								<i>Republic of the Philippines</i>
							</p>
							<h4 className="font-bold text-xl text-center">
								PHILIPPINE HEALTH INSURANCE CORPORATION
							</h4>
							<p className="text-xs text-center">
								Citystate Centre 709 Shaw Boulevard, Pasig City
							</p>
							<p className="text-xs text-center">
								Call Center (02) 441-7442 l Trunkline (02)
								441-7444
							</p>
							<p className="text-xs text-center">www.philhealth.gov.ph</p>
							<p className="text-xs text-center">
								{" "}
								email: actioncenter@philhealth.gov.ph
							</p>
						</div>
						<img
							className="w-[100px] left-2 object-contain"
							src="/benifits.png"
						/>
					</div>
                    <div className="border-2 border-black ">
                        <div className="text-lg font-extrabold text-center">
                            <span>PhilHealth Benifit Eligibility Form</span>
                        </div>
                    </div>
                    <div className="text-sm italic">
                        <p className="text-xs text-center">
								<i>"Bawat Pilipino Miyembro, Bawat Miyembro Protektado, Kalusugan Natin Segurado"</i>
							</p>
                    </div>

                    <table className="transparent-table text-sm w-full">
							<tr>
								<td className="py-1 w-[250px] text-left">
									<span className="font-light">Date & Time of Generation</span>
								</td>
								<td className="py-1 text-left font-light"> : &nbsp;</td>
								<td className="py-1 ">{formatDateTime(appointment?.updated_at)}</td>
                                
							</tr>
							<tr>
								<td className="py-1 w-[250px] text-left">
									<span>HCI Portal Reference No.</span>
								</td>
								<td className="py-1 text-left font-light"> : &nbsp;</td>
								<td className="py-1 ">{hciReferenceNo}</td>
                               
							</tr>
                            

					</table>
                <div className="border-t-4 border-black ">
                        <div className="font-semibold">
                            <span>HEALTH CARE INSTITURE (HCI) INFORMATION</span>
                        </div>
                        <table className="transparent-table text-sm w-full">
							<tr>
								<td className="py-1 w-[250px] text-left">
									<span className="font-light">Name of Institute</span>
								</td>
								<td className="py-1 text-left font-light"> : &nbsp;</td>
								<td className="py-1 ">{user?.healthUnit?.name}</td>
                                
							</tr>
							<tr>
								<td className="py-1 w-[250px] text-left">
									<span>Accreditation No. </span>
								</td>
								<td className="py-1 text-left font-light"> : &nbsp;</td>
								<td className="py-1 ">{user?.healthUnit?.accreditation_number}</td>
                               
							</tr>
					</table>
                </div>
                    
                
                <div className="border-t-4 border-black ">
                        <div className="font-semibold">
                            <span>MEMBER INFORMATION</span>
                        </div>
                         <table className="transparent-table text-sm w-full">
							<tr>
								<td className="py-1 w-[250px] text-left">
									<span className="font-light">Philhealth Identification No.</span>
								</td>
								<td className="py-1 text-left font-light"> : &nbsp;</td>
								<td className="py-1 ">{patient?.philhealth}</td>
                                
							</tr>
							<tr>
								<td className="py-1 w-[250px] text-left">
									<span>Name of Member</span>
								</td>
								<td className="py-1 text-left font-light"> : &nbsp;</td>
								<td className="py-1 ">{patientFullName(patient)}</td>
                               
							</tr>
                            <tr>
								<td className="py-1 w-[250px] text-left">
									<span>Sex</span>
								</td>
								<td className="py-1 text-left font-light"> : &nbsp;</td>
								<td className="py-1 ">{patient?.gender}</td>
                               
							</tr>

                            <tr>
								<td className="py-1 w-[250px] text-left">
									<span>Date of Birth</span>
								</td>
								<td className="py-1 text-left font-light"> : &nbsp;</td>
								<td className="py-1 ">{patient?.birthday}</td>
                               
							</tr>
                            <tr>
								<td className="py-1 w-[250px] text-left">
									<span>Member Category</span>
								</td>
								<td className="py-1 text-left font-light"> : &nbsp;</td>
								<td className="py-1 uppercase">{patient?.m_category}</td>
                               
							</tr>
					</table>
                </div>
                <div className="border-t-4 border-black ">
                        <div className="font-semibold">
                            <span>PATIENT INFORMATION</span>
                        </div>
                        <table className="transparent-table text-sm w-full">
							<tr>
								<td className="py-1 w-[250px] text-left">
									<span className="font-light">Name of Patient</span>
								</td>
								<td className="py-1 text-left font-light"> : &nbsp;</td>
								<td className="py-1 ">{patientFullName(patient)}</td>
                                
							</tr>
							<tr>
								<td className="py-1 w-[250px] text-left">
									<span>Date Admitted</span>
								</td>
								<td className="py-1 text-left font-light"> : &nbsp;</td>
								<td className="py-1 ">{formatDate(appointment?.created_at)}</td>
                               
							</tr>
                            <tr>
								<td className="py-1 w-[250px] text-left">
									<span>Sex</span>
								</td>
								<td className="py-1 text-left font-light"> : &nbsp;</td>
								<td className="py-1 ">{patient?.gender}</td>
                               
							</tr>

                            <tr>
								<td className="py-1 w-[250px] text-left">
									<span>Date of Birth</span>
								</td>
								<td className="py-1 text-left font-light"> : &nbsp;</td>
								<td className="py-1 ">{patient?.birthday}</td>
                               
							</tr>
                           

					</table>
                </div>
                <div className="border-t-4 border-black ">
                        <div className="font-semibold">
                            <span>ELIGIBILITY INFORMATION</span>
                        </div>
                        <div className="font-semibold">
                            <span>
							ELIGIBLE TO AVAIL PHILHEALTH BENEFITS? ={" "}
							{patient?.philhealth?.pin && patient?.philhealth?.m_category
								? "NO"
								: "YES"}
						</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="ml-16 text-xs">With three (3) monthly contributions within the past six(6) months? = {patient?.philhealth?.pin && patient?.philhealth?.m_category
								? "NO"
								: "YES"}</span>
                          <span className="ml-16 text-xs">With nine (9) monthly contributions within the past twelve(12) months? = {patient?.philhealth?.pin && patient?.philhealth?.m_category
								? "NO"
								: "YES"}</span>
                           <span className="ml-16 text-xs">Number of days remaining from the 45 days benefit limit * = {patient?.philhealth?.pin && patient?.philhealth?.m_category
								? "NO"
								: "YES"}
								</span>
                        </div>
                        
                        
                </div>
                <div className="border-t-4 border-black ">
                        <div className="font-semibold">
                            <span>DOCUMENTS TO BE SUBMITTED TO PHILHEALTH</span>
                        </div>
                        <div className="font-semibold">
                            <span>N/A</span>
                        </div>
                </div>
                <div className="border-t-4 border-black ">
                        <div className="text-xs font-semibold">
                            <span>IMPORTANT REMINDERS</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs">1. Generation and printing of this form is FREE for all PhilHealth Beneficiaries</span>
                          <span className="text-xs">2. If the Electronic Claim Submission is not yet in implemented this form shall be submitted along with the  required PhilHealth Claims forms and is valid only for the confinement/admission stated above.</span>
                           <span className="text-xs">3. This does not include eligibility to the rule of SINGLE PERIOD OF CONFINEMENT(SPC). It shall be established when the claim is processed by Philhealth. Non-qualification to the rule on SPC shall result to denial of this claim.</span>
                           <span className="text-xs">4. Corresponds only to the paid claims as of the date and time of generation. PhilHealth Benifit Claims that are transit or on Process are not yet include</span>
                        </div>
                </div>
               <div className="border-t-4 border-black">
							<div className="flex gap-16 mt-16">
								{/* Patient Information */}
								<div className="lg:col-span-5 flex flex-col items-center lg:items-start">
									<b className="text-[8px] justify-center text-center">
										{patientFullName(patient)}
									</b>
									<span className="border-t-2 border-black text-xs text-center w-full lg:w-1/2 mt-1">
										<p>Member/Representative</p>
										<p>Signature Over Printed Name/Thumbmark</p>
									</span>
								</div>
								{/* User Information */}
								<div className="lg:col-span-5 flex flex-col items-center lg:items-start">
									<b className="text-[8px] text-center">
										{user?.name}
									</b>
									<span className="border-t-2 border-black text-xs text-center w-full lg:w-1/2 mt-1">
										<p>Module 1 CEWS User</p>
										<p>Signature Over Printed Name/Thumbmark</p>
									</span>
								</div>
								{/* Additional Information */}
								<div className="lg:col-span-2 flex flex-col items-center">
									<p className="italic text-xs">Visit www.philhealth.gov.ph</p>
									<img
										className="w-[88px] mt-2"
										src="/sample_qr.png"
										alt="QR Code"
									/>
								</div>
					</div>
				</div>
			
                <div className="border-2 border-black">
                    <div className="italic text-xs text-center">
                            <span>Philippine Health Insurance Corporation</span>
                        </div>
                        <div className="italic text-xs text-center">
                            <span>CityState Centre, 709 Shaw Boulevard, Pasig City Healthline 441-7444</span>
                        </div>
                </div>
				</div>
			</div>
           
	</div>
  )
}

export default PBEF

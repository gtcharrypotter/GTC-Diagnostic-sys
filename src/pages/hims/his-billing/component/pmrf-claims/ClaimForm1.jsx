import { useReactToPrint } from "react-to-print";
import ActionBtn from "../../../../../components/buttons/ActionBtn";
import FlatIcon from "../../../../../components/FlatIcon";
import React, { useState } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
import Axios from "../../../../../libs/axios";

/* eslint-disable react/prop-types */
const FormHeading = ({ title }) => {
	return (
		<div
			className="bg-black py-1 flex items-center justify-center text-white font-bold uppercase"
			style={{ background: "#000", backgroundColor: "#000" }}
		>
			{title}
		</div>
	);
};
const FormBody = ({ className = "", children }) => {
	return (
		<div className={`flex flex-col border-b-2 p-1 text-sm ${className}`}>
			{children}
		</div>
	);
};
const BoxInput = () => {
	return (
		<>
			<label className="flex items-center border-l last:border-r border-y  border-black">
				<input
					type="text"
					className="w-4 py-[2px] px-0 leading-none text-center border-0 !text-xs"
					maxLength={1}
				/>
			</label>
		</>
	);
};
const BoxInputGroup = ({
	children,
	label = "",
	className = "",
	labelClassName = "",
}) => {
	return (
		<div className={`flex flex-col items-center relative ${className}`}>
			<div className="flex items-center">{children}</div>
			{label && (
				<label
					className={` absolute !text-[10px] -bottom-4 ${labelClassName}`}
				>
					{label}
				</label>
			)}
		</div>
	);
};

const UnderscoreGroup = ({ children, label }) => {
	return (
		<div className="flex flex-col items-center justify-center relative">
			{children}
			{label && (
				<label className="text-[8px] absolute -bottom-2">{label}</label>
			)}
		</div>
	);
};
const Underscore = ({ count = 1 }) => {
	let arr = Array.from({ length: count });
	return (
		<div className="flex items-end pt-0">
			{arr.map((x, index) => {
				return (
					<span
						className="border-b-2 h-4 border-l-2 last:border-r-2 w-5 text-center text-xs"
						contentEditable
					></span>
				);
			})}
		</div>
	);
};
const CheckBox = ({ label, className = "", inputClassName = "" }) => {
	return (
		<label
			className={`flex items-center text-xs gap-2 font-normal ${className}`}
		>
			<input type="checkbox" className={inputClassName} />
			{label}
		</label>
	);
};
const UnderlineInput = ({ label, className = "", inputClassName = "" }) => {
	return (
		<div className={`flex flex-col text-center text-xs ${className}`}>
			<span
				className={`border-b w-full h-5 p-0 text-xs flex items-end justify-center ${inputClassName}`}
				contentEditable={true}
			></span>
			{label ? <span className="text-[10px]">{label}</span> : ""}
		</div>
	);
};
const InlineInput = ({ label, className = "", inputClassName = "" }) => {
	return (
		<div
			className={`flex text-center items-center text-xs gap-2 ${className}`}
		>
			{label && <span className="whitespace-pre">{label}</span>}
			<span
				className={`border-b w-full h-4 p-0 text-xs flex items-end justify-center ${inputClassName}`}
				contentEditable={true}
			></span>
		</div>
	);
};
const ClaimForm1 = ({patient, appointment}) => {
	const { user, checkUserType } = useAuth();
	const [canPrint, setCanPrint] = useState(false);
	const [downloadUrl, setDownloadUrl] = useState(null);
	const componentRef = React.useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
// 	const handleGenerateAndSaveXML = async () => {
//     try {
//       setCanPrint(true);

//       // Prepare data for the back-end
//       const payload = {
//         patient,
//         appointment,
//         generatedBy: user?.name,
//       };

//       // Send data to the backend for XML generation and saving
//       const response = await Axios.post(`/v1/diagnostic/philhealth/save-xml`, payload);

//       // Extract the file URL from the response
// 		const { fileUrl } = response.data;
// 		setDownloadUrl(fileUrl);
//       alert("XML generated and saved successfully!");
//     } catch (error) {
//       console.error("Error generating XML:", error);
//       alert("Failed to generate XML.");
//     }
//   };

		const submit = (data) => {
			setCanPrint(true);
			} 
  return (
    <div className="bg-gray-600 p-11 min-h-[14in]  overflow-auto phic-forms">
		{checkUserType("DOCTOR") ? (
		""
		) : (
		<div className="flex gap-2">
			
		<ActionBtn
          type="success"
          className="ml-auto mr-5 mb-5 py-4 !text-lg"
          size="md"
          onClick={submit}
        >
          <FlatIcon icon="rr-right" className="text-white mr-1" />
          Generate & Save
        </ActionBtn>
        <ActionBtn
          type="primary-dark"
          className={`mr-5 mb-5 py-4 !text-lg ${!canPrint ? "opacity-50 cursor-not-allowed" : ""}`}
          size="md"
          onClick={canPrint ? handlePrint : null}
        >
          <FlatIcon icon="rr-print" className="text-white mr-1" />
          Print
        </ActionBtn>
		</div>
		)}
		
			<div
				className="bg-white p-[0.5in] w-[9.5in] gap-y-6 mx-auto"
				id="phic-form-printable" ref={componentRef}
			>
				<div className="bg-white flex flex-col w-[8.5in] min-h-[13in]   border-2">
					<div className="flex items-center relative justify-center border-b-2 px-2 pt-2 pb-1">
						<img
							className="w-[144px] absolute left-4 object-contain"
							src="/philhealth.png"
						/>
						<div className="flex flex-col text-center w-full mx-auto">
							<p className="text-sm">
								<i>Republic of the Philippines</i>
							</p>
							<h4 className="font-bold text-xl">
								PHILIPPINE HEALTH INSURANCE CORPORATION
							</h4>
							<p className="text-sm">
								Citystate Centre 709 Shaw Boulevard, Pasig City
							</p>
							<p className="text-sm">
								Call Center (02) 441-7442 l Trunkline (02)
								441-7444
							</p>
							<p className="text-sm">www.philhealth.gov.ph</p>
							<p className="text-sm">
								{" "}
								email: actioncenter@philhealth.gov.ph
							</p>
						</div>
						<div className="flex flex-col text-center  absolute right-2 top-0">
							<p className="text-sm">
								This form may be reproduced and <br /> is NOT
								FOR SALE
							</p>
							<h1 className="text-4xl font-bold mb-0">CSF</h1>
							<h3 className="text-lg font-bold mb-0">
								(Claim Signature Form)
							</h3>
							<p className="text-sm">Revised September 2018</p>
						</div>
					</div>

					<div className="flex flex-col border-b-2 p-2 text-sm relative">
						<b>IMPORTANT REMINDERS:</b>
						<div className="absolute top-2 right-2">
							<div className="flex items-center gap-2 ml-auto">
								<span className="font-light">Series #</span>
								<div className="flex items-center">
									<span
										className="border-l border-y w-5 h-5 p-0 flex items-center justify-center text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 flex items-center justify-center text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 flex items-center justify-center text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 flex items-center justify-center text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 flex items-center justify-center text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 flex items-center justify-center text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 flex items-center justify-center text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 flex items-center justify-center text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 flex items-center justify-center text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 flex items-center justify-center text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 flex items-center justify-center text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 flex items-center justify-center text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-x border-y w-5 h-5 p-0 text-xs"
										contentEditable={true}
									></span>
								</div>
							</div>
						</div>
						<p className="text-xs">
							PLEASE WRITE IN CAPITAL <b>LETTERS</b> AND{" "}
							<b>CHECK</b> THE APPROPRIATE BOXES.
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

					<FormHeading title="PART I - MEMBER AND PATIENT INFORMATION AND CERTIFICATION" />
					<FormBody>
						<div className="grid grid-cols-12 gap-2">
							<div className="col-span-9 flex items-center">
								<h5 className=" font-bold">
									1. PhilHealth Identification Number (PIN) of
									Member:
								</h5>

								<div className="flex items-center gap-1 ml-2">
									<BoxInputGroup labelClassName="italic">
										<BoxInput />
										<BoxInput />
									</BoxInputGroup>
									<b>-</b>
									<BoxInputGroup labelClassName="italic">
										<BoxInput />
										<BoxInput />
										<BoxInput />
										<BoxInput />
										<BoxInput />
										<BoxInput />
										<BoxInput />
										<BoxInput />
										<BoxInput />
									</BoxInputGroup>
									<b>-</b>
									<BoxInputGroup labelClassName="italic">
										<BoxInput />
									</BoxInputGroup>
								</div>
							</div>
						</div>
					</FormBody>
					<FormHeading title="PART I - HEALTH CARE INSTITUTION (HCI) INFORMATION" />
					<FormBody>
						<ol className="mb-0 list-[numeric] flex flex-col gap-x-2">
							<li className="flex items-center gap-4">
								<h5 className=" font-bold">
									1.PhilHealth Accreditation Number (PAN) of
									Health Care Institution:
								</h5>

								<div className="flex items-center">
									<span
										className="border-b border-x w-5 h-3 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-b border-x w-5 h-3 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-b border-x w-5 h-3 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-b border-x w-5 h-3 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-b border-x w-5 h-3 p-0 text-xs"
										contentEditable={true}
									></span>

									<span
										className="border-b border-x w-5 h-3 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-b border-x w-5 h-3 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-b border-x w-5 h-3 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-b border-x w-5 h-3 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-b border-x w-5 h-3 p-0 text-xs"
										contentEditable={true}
									></span>
								</div>
							</li>
							<li className="flex items-center gap-2">
								<h5 className=" font-bold whitespace-pre">
									2.Name of Health Care Institution:
								</h5>
								<span
									className="border-b w-full h-5 p-0 text-base"
									contentEditable={true}
								></span>
							</li>
							<li className="flex items-start gap-2">
								<h5 className=" font-bold whitespace-pre">
									3.Address:
								</h5>
								<div className="flex flex-col text-center text-xs w-full">
									<span
										className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
										contentEditable={true}
									></span>
									Building Number and Street Name
								</div>
								<div className="flex flex-col text-center text-xs w-full">
									<span
										className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
										contentEditable={true}
									>
										{patient?.municipality}
									</span>
									City/Municipality
								</div>
								<div className="flex flex-col text-center text-xs w-full">
									<span
										className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
										contentEditable={true}
									>
										Sarangani
									</span>
									Province
								</div>
							</li>
						</ol>
					</FormBody>

					<FormHeading title="PART II - PATIENT CONFINEMENT INFORMATION" />
					<FormBody>
						<ol className="mb-0 list-[numeric] flex flex-col gap-x-2">
							<li className="flex items-start gap-2">
								<h5 className=" font-bold whitespace-pre">
									1.Name of Patient:
								</h5>
								<div className="flex flex-col text-center text-xs w-full">
									<span
										className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
										contentEditable={true}
									>
										{patient?.lastname}
									</span>
									Last Name
								</div>
								<div className="flex flex-col text-center text-xs w-full">
									<span
										className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
										contentEditable={true}
									>
										{patient?.firstname}
									</span>
									First Name
								</div>
								<div className="flex flex-col text-center text-xs min-w-[144px]">
									<span
										className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
										contentEditable={true}
									>
										{patient?.suffix}
									</span>
									Name Extension <br /> (JR/SR/III)
								</div>
								<div className="flex flex-col text-center text-xs min-w-[222px]">
									<span
										className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
										contentEditable={true}
									>
										{patient?.middlename}
									</span>
									Middle Name <br /> (ex: DELA CRUZ JUAN JR
									SIPAG)
								</div>
							</li>

							<li className="flex flex-col gap-2">
								<h5 className=" font-bold whitespace-pre mb-1">
									2.Was patient referred by another Health
									Care Institution (HCI)?
								</h5>
								<div className="flex items-start gap-2 pb-1">
									<label className="flex items-center text-xs gap-1 font-normal">
										<input type="checkbox" className="" />
										NO
									</label>
									<label className="flex items-center text-xs gap-1 font-normal">
										<input type="checkbox" className="" />
										YES
									</label>

									<div className="flex flex-col text-center text-xs w-full whitespace-pre">
										<span
											className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
											contentEditable={true}
										></span>
										<span className="text-[10px]">
											Name of referring Health Care
											Institution
										</span>
									</div>
									<div className="flex flex-col text-center text-xs w-full whitespace-pre">
										<span
											className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
											contentEditable={true}
										></span>
										<span className="text-[10px]">
											Building Number and Street Name
										</span>
									</div>
									<div className="flex flex-col text-center text-xs w-full">
										<span
											className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
											contentEditable={true}
										></span>

										<span className="text-[10px]">
											City/Municipality
										</span>
									</div>
									<div className="flex flex-col text-center text-xs w-full">
										<span
											className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
											contentEditable={true}
										></span>

										<span className="text-[10px]">
											Province
										</span>
									</div>
									<div className="flex flex-col text-center text-xs w-full">
										<span
											className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
											contentEditable={true}
										></span>
										<span className="text-[10px]">
											Zip code
										</span>
									</div>
								</div>
							</li>

							<li className="flex items-start gap-2">
								<h5 className=" font-bold whitespace-pre">
									3.Confinement Period:
								</h5>
								<div className="flex flex-col">
									<div className="flex items-center gap-4">
										<div className="flex items-center gap-1 pb-1">
											<span className="mr-2 text-xs">
												a. Date Admitted
											</span>
											<UnderscoreGroup label="month">
												<Underscore count={2} />
											</UnderscoreGroup>
											<b className="text-lg font-bold">
												-
											</b>
											<UnderscoreGroup label="day">
												<Underscore count={2} />
											</UnderscoreGroup>
											<b className="text-lg font-bold">
												-
											</b>
											<UnderscoreGroup label="day">
												<Underscore count={4} />
											</UnderscoreGroup>
										</div>
										<div className="flex items-center gap-1 pb-1">
											<span className="mr-2 text-xs">
												b. Time Admitted
											</span>
											<UnderscoreGroup label="hour">
												<Underscore count={2} />
											</UnderscoreGroup>
											<b className="text-lg font-bold">
												:
											</b>
											<UnderscoreGroup label="min">
												<Underscore count={2} />
											</UnderscoreGroup>
										</div>
										<div className="flex items-center gap-4">
											<CheckBox label="AM" />
											<CheckBox label="PM" />
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="flex items-center gap-1">
											<span className="mr-2 text-xs">
												c. Date Discharge
											</span>
											<UnderscoreGroup label="month">
												<Underscore count={2} />
											</UnderscoreGroup>
											<b className="text-lg font-bold">
												-
											</b>
											<UnderscoreGroup label="day">
												<Underscore count={2} />
											</UnderscoreGroup>
											<b className="text-lg font-bold">
												-
											</b>
											<UnderscoreGroup label="day">
												<Underscore count={4} />
											</UnderscoreGroup>
										</div>
										<div className="flex items-center gap-1">
											<span className="mr-2 text-xs">
												d. Time Discharge
											</span>
											<UnderscoreGroup label="hour">
												<Underscore count={2} />
											</UnderscoreGroup>
											<b className="text-lg font-bold">
												:
											</b>
											<UnderscoreGroup label="min">
												<Underscore count={2} />
											</UnderscoreGroup>
										</div>
										<div className="flex items-center gap-4">
											<CheckBox label="AM" />
											<CheckBox label="PM" />
										</div>
									</div>
								</div>
							</li>

							<li className="flex flex-col gap-2">
								<h5 className=" font-bold whitespace-pre">
									4.Patient Disposition: (select only 1)
								</h5>
								<div className="grid grid-cols-12 gap-x-4 gap-y-1 px-2">
									<div className="col-span-3">
										<CheckBox label="a. Improved" />
									</div>
									<div className="col-span-9 flex items-center gap-4">
										<CheckBox label="e. Expired" />
										<div className="flex items-center gap-1">
											<UnderscoreGroup label="month">
												<Underscore count={2} />
											</UnderscoreGroup>
											<b className="text-lg font-bold">
												-
											</b>
											<UnderscoreGroup label="day">
												<Underscore count={2} />
											</UnderscoreGroup>
											<b className="text-lg font-bold">
												-
											</b>
											<UnderscoreGroup label="day">
												<Underscore count={4} />
											</UnderscoreGroup>
										</div>
										<div className="flex items-center gap-1">
											<span>Time: </span>
											<UnderscoreGroup label="hour">
												<Underscore count={2} />
											</UnderscoreGroup>
											<b className="text-lg font-bold">
												-
											</b>
											<UnderscoreGroup label="min">
												<Underscore count={2} />
											</UnderscoreGroup>
										</div>
										<div className="flex items-center gap-4">
											<CheckBox label="AM" />
											<CheckBox label="PM" />
										</div>
									</div>

									<div className="col-span-3">
										<CheckBox label="b. Recovered" />
									</div>
									<div className="col-span-9 flex start">
										<CheckBox
											label={
												<>
													<div className="whitespace-pre">
														f. Transferred/Referred{" "}
													</div>
												</>
											}
										/>
										<UnderlineInput
											label="Name of Referral Health Care Institution"
											className="w-full"
										/>
									</div>
									<div className="col-span-3">
										<CheckBox label="c. Home/Discharged Against Medical Advise" />
									</div>
									<div className="col-span-9 flex items-center justify-center gap-6">
										<UnderlineInput
											label="Building Number and Street Name"
											className="w-full"
										/>
										<UnderlineInput
											label="City/Municipality"
											className="w-full"
										/>
										<UnderlineInput
											label="Province"
											className="w-[320px]"
										/>
										<UnderlineInput
											label="Zip code"
											className="w-[144px]"
										/>
									</div>
									<div className="col-span-3">
										<CheckBox label="d. Absconded" />
									</div>
									<div className="col-span-9">
										<InlineInput label="Reason/s for referral/transfer:" />
									</div>
								</div>
							</li>

							<li className="flex items-center gap-6">
								<h5 className=" font-bold whitespace-pre">
									5. Type of Accomodation:
								</h5>
								<CheckBox label={"Private"} />
								<CheckBox
									label={"Non-Private (Charity/Service)"}
								/>
							</li>
						</ol>
					</FormBody>

					<FormBody>
						<ol className="mb-0 list-[numeric] flex flex-col gap-2 !mb-0">
							<li
								className="flex items-start gap-2 min-h-[36px]"
								contentEditable
							>
								<h5 className=" font-bold whitespace-pre">
									6. Admission Diagnosis/es: &nbsp;&nbsp;
								</h5>
							</li>
						</ol>
					</FormBody>

					<FormBody>
						<h5 className=" font-bold whitespace-pre mb-1">
							7. Discharge Diagnosis/es (Use additional CF2 if
							necessary):
						</h5>
						<table className="transparent-table">
							<thead>
								<tr>
									<td className="text-xs">Diagnosis</td>
									<td className="text-xs">ICD-10 Code/s</td>
									<td className="text-xs">
										Related Procedure/s (if there’s any)
									</td>
									<td className="text-xs">RVS Code</td>
									<td className="text-xs">
										Date of Procedure
									</td>
									<td className="text-xs">
										Laterality (check applicable box)
									</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<InlineInput
											label="a."
											className="w-[96px]"
										/>
									</td>
									<td>
										<InlineInput className="w-[88px]" />
									</td>
									<td>
										<InlineInput
											label="i."
											className="w-full"
										/>
									</td>
									<td>
										<InlineInput className="w-[72px]" />
									</td>
									<td>
										<InlineInput className="w-[92px]" />
									</td>
									<td>
										<div className="flex items-center gap-2">
											<CheckBox label={"left"} />
											<CheckBox label={"right"} />
											<CheckBox label={"both"} />
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<InlineInput
											label={<>&nbsp;&nbsp;</>}
											className="w-[96px]"
										/>
									</td>
									<td>
										<InlineInput className="w-[88px]" />
									</td>
									<td>
										<InlineInput
											label="ii."
											className="w-full"
										/>
									</td>
									<td>
										<InlineInput className="w-[72px]" />
									</td>
									<td>
										<InlineInput className="w-[92px]" />
									</td>
									<td>
										<div className="flex items-center gap-2">
											<CheckBox label={"left"} />
											<CheckBox label={"right"} />
											<CheckBox label={"both"} />
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<InlineInput
											label={<>&nbsp;&nbsp;</>}
											className="w-[96px]"
										/>
									</td>
									<td>
										<InlineInput className="w-[88px]" />
									</td>
									<td>
										<InlineInput
											label="iii."
											className="w-full"
										/>
									</td>
									<td>
										<InlineInput className="w-[72px]" />
									</td>
									<td>
										<InlineInput className="w-[92px]" />
									</td>
									<td>
										<div className="flex items-center gap-2">
											<CheckBox label={"left"} />
											<CheckBox label={"right"} />
											<CheckBox label={"both"} />
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<InlineInput
											label="b."
											className="w-[96px]"
										/>
									</td>
									<td>
										<InlineInput className="w-[88px]" />
									</td>
									<td>
										<InlineInput
											label="i."
											className="w-full"
										/>
									</td>
									<td>
										<InlineInput className="w-[72px]" />
									</td>
									<td>
										<InlineInput className="w-[92px]" />
									</td>
									<td>
										<div className="flex items-center gap-2">
											<CheckBox label={"left"} />
											<CheckBox label={"right"} />
											<CheckBox label={"both"} />
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<InlineInput
											label={<>&nbsp;&nbsp;</>}
											className="w-[96px]"
										/>
									</td>
									<td>
										<InlineInput className="w-[88px]" />
									</td>
									<td>
										<InlineInput
											label="ii."
											className="w-full"
										/>
									</td>
									<td>
										<InlineInput className="w-[72px]" />
									</td>
									<td>
										<InlineInput className="w-[92px]" />
									</td>
									<td>
										<div className="flex items-center gap-2">
											<CheckBox label={"left"} />
											<CheckBox label={"right"} />
											<CheckBox label={"both"} />
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<InlineInput
											label={<>&nbsp;&nbsp;</>}
											className="w-[96px]"
										/>
									</td>
									<td>
										<InlineInput className="w-[88px]" />
									</td>
									<td>
										<InlineInput
											label="iii."
											className="w-full"
										/>
									</td>
									<td>
										<InlineInput className="w-[72px]" />
									</td>
									<td>
										<InlineInput className="w-[92px]" />
									</td>
									<td>
										<div className="flex items-center gap-2">
											<CheckBox label={"left"} />
											<CheckBox label={"right"} />
											<CheckBox label={"both"} />
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</FormBody>

					<FormBody className="">
						<h5 className=" font-bold whitespace-pre mb-0">
							8. Special Considerations:
						</h5>
						<ol className="mb-0 list-[lower-alpha] px-4	py-2">
							<li className="">
								For the following repetitive procedures, check
								box that applies and enumerate the
								procedure/sessions dates [mm-dd-yyyy]. For
								chemotherapy, see guidelines.
								<div className="flex items-center gap-2">
									<div className="w-[22%]">
										<CheckBox label="Hemodialysis" />
									</div>
									<div className="w-[28%]">
										<UnderlineInput />
									</div>
									<div className="w-[22%]">
										<CheckBox label="Blood Transfusion" />
									</div>
									<div className="w-[28%]">
										<UnderlineInput />
									</div>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-[22%]">
										<CheckBox label="Peritoneal Dialysis" />
									</div>
									<div className="w-[28%]">
										<UnderlineInput />
									</div>
									<div className="w-[22%]">
										<CheckBox label="Brachytherapy" />
									</div>
									<div className="w-[28%]">
										<UnderlineInput />
									</div>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-[22%]">
										<CheckBox label="Radiotherapy (LINAC)" />
									</div>
									<div className="w-[28%]">
										<UnderlineInput />
									</div>
									<div className="w-[22%]">
										<CheckBox label="Chemotherapy" />
									</div>
									<div className="w-[28%]">
										<UnderlineInput />
									</div>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-[22%]">
										<CheckBox label="Radiotherapy (COBALT)" />
									</div>
									<div className="w-[28%]">
										<UnderlineInput />
									</div>
									<div className="w-[22%]">
										<CheckBox label="Simple Debridement" />
									</div>
									<div className="w-[28%]">
										<UnderlineInput />
									</div>
								</div>
							</li>
						</ol>
					</FormBody>
					<FormBody className="border-b-0">
						<h5 className=" font-bold whitespace-pre">
							9. PhilHealth Benefits:
						</h5>
						<div
							className="flex items-center gap-4 w-full h-11"
							contentEditable
						>
							<b className="text-sm font-bold whitespace-pre">
								ICD 10 or RVS Code:
							</b>
							<InlineInput
								label="a. First Case Rate"
								inputClassName={`w-[156px]`}
							/>
							<InlineInput
								label="b.
								Second Case Rate"
								inputClassName={`w-[156px]`}
							/>
						</div>
					</FormBody>
				</div>

				<div className="bg-white w-[8.5in] min-h-[13in] pb-0  border-2">
					<FormBody className="!p-0">
						<h5 className=" font-bold  mb-1 px-2">
							10. Accreditation Number/Name of Accredited Health
							Care Professional/Date Signed and Professional
							Fees/Charges{" "}
							<span className="!font-normal">
								(Use additional CF2 if necessary)
							</span>
							:
						</h5>
						<table className="bordered-table">
							<thead>
								<tr>
									<td className="!text-center w-[55%] text-xs">
										Accreditation number/Name of Accredited
										Health Care Professional/Date Signed
									</td>
									<td className="!text-center w-[45%] text-xs">
										Details
									</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="px-6">
										<div className="flex flex-col ">
											<div className="flex items-center gap-2">
												<span>Accreditation No.:</span>
												<UnderscoreGroup>
													<Underscore count={4} />
												</UnderscoreGroup>
												<b className="text-lg font-bold">
													-
												</b>
												<UnderscoreGroup>
													<Underscore count={7} />
												</UnderscoreGroup>
												<b className="text-lg font-bold">
													-
												</b>
												<UnderscoreGroup>
													<Underscore count={1} />
												</UnderscoreGroup>
											</div>
											<UnderlineInput
												label={`Signature Over Printed Name`}
												className="w-4/5 mx-auto py-1"
											/>
											<div className="flex items-center justify-center gap-2 pb-2">
												<span>Date Signed:</span>
												<UnderscoreGroup label="month">
													<Underscore count={2} />
												</UnderscoreGroup>
												<b className="text-lg font-bold">
													-
												</b>
												<UnderscoreGroup label="day">
													<Underscore count={2} />
												</UnderscoreGroup>
												<b className="text-lg font-bold">
													-
												</b>
												<UnderscoreGroup label="year">
													<Underscore count={4} />
												</UnderscoreGroup>
											</div>
										</div>
									</td>
									<td>
										<div className="flex flex-col gap-y-1 w-full px-2">
											<CheckBox
												label={`No co-pay on top of PhilHealth Benefit`}
											/>
											<CheckBox
												className="w-full"
												label={
													<>
														With co-pay on top of
														PhilHealth Benefit{" "}
														<InlineInput
															className="w-[78px]"
															label="P"
															inputClassName="w-[78px]"
														/>
													</>
												}
											/>
										</div>
									</td>
								</tr>
								<tr>
									<td className="px-6">
										<div className="flex flex-col ">
											<div className="flex items-center gap-2">
												<span>Accreditation No.:</span>
												<UnderscoreGroup>
													<Underscore count={4} />
												</UnderscoreGroup>
												<b className="text-lg font-bold">
													-
												</b>
												<UnderscoreGroup>
													<Underscore count={7} />
												</UnderscoreGroup>
												<b className="text-lg font-bold">
													-
												</b>
												<UnderscoreGroup>
													<Underscore count={1} />
												</UnderscoreGroup>
											</div>
											<UnderlineInput
												label={`Signature Over Printed Name`}
												className="w-4/5 mx-auto py-1"
											/>
											<div className="flex items-center justify-center gap-2 pb-2">
												<span>Date Signed:</span>
												<UnderscoreGroup label="month">
													<Underscore count={2} />
												</UnderscoreGroup>
												<b className="text-lg font-bold">
													-
												</b>
												<UnderscoreGroup label="day">
													<Underscore count={2} />
												</UnderscoreGroup>
												<b className="text-lg font-bold">
													-
												</b>
												<UnderscoreGroup label="year">
													<Underscore count={4} />
												</UnderscoreGroup>
											</div>
										</div>
									</td>
									<td>
										<div className="flex flex-col gap-y-1 w-full px-2">
											<CheckBox
												label={`No co-pay on top of PhilHealth Benefit`}
											/>
											<CheckBox
												className="w-full"
												label={
													<>
														With co-pay on top of
														PhilHealth Benefit{" "}
														<InlineInput
															className="w-[78px]"
															label="P"
															inputClassName="w-[78px]"
														/>
													</>
												}
											/>
										</div>
									</td>
								</tr>
								<tr>
									<td className="px-6">
										<div className="flex flex-col ">
											<div className="flex items-center gap-2">
												<span>Accreditation No.:</span>
												<UnderscoreGroup>
													<Underscore count={4} />
												</UnderscoreGroup>
												<b className="text-lg font-bold">
													-
												</b>
												<UnderscoreGroup>
													<Underscore count={7} />
												</UnderscoreGroup>
												<b className="text-lg font-bold">
													-
												</b>
												<UnderscoreGroup>
													<Underscore count={1} />
												</UnderscoreGroup>
											</div>
											<UnderlineInput
												label={`Signature Over Printed Name`}
												className="w-4/5 mx-auto py-1"
											/>
											<div className="flex items-center justify-center gap-2 pb-2">
												<span>Date Signed:</span>
												<UnderscoreGroup label="month">
													<Underscore count={2} />
												</UnderscoreGroup>
												<b className="text-lg font-bold">
													-
												</b>
												<UnderscoreGroup label="day">
													<Underscore count={2} />
												</UnderscoreGroup>
												<b className="text-lg font-bold">
													-
												</b>
												<UnderscoreGroup label="year">
													<Underscore count={4} />
												</UnderscoreGroup>
											</div>
										</div>
									</td>
									<td>
										<div className="flex flex-col gap-y-1 w-full px-2">
											<CheckBox
												label={`No co-pay on top of PhilHealth Benefit`}
											/>
											<CheckBox
												className="w-full"
												label={
													<>
														With co-pay on top of
														PhilHealth Benefit{" "}
														<InlineInput
															className="w-[78px]"
															label="P"
															inputClassName="w-[78px]"
														/>
													</>
												}
											/>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</FormBody>

					<FormHeading
						title={
							<div className="flex flex-col text-center text-white">
								<h4
									className="font-bold text-base"
									style={{ color: "white" }}
								>
									PART III - CERTIFICATION OF CONSUMPTION OF
									BENEFITS AND CONSENT TO ACCESS PATIENT
									RECORD/S
								</h4>
								<span
									className="text-sm font-normal !normal-case"
									style={{ color: "white" }}
								>
									NOTE: Member/Patient should sign only after
									the applicable charges have been filled-out
								</span>
							</div>
						}
					/>
					<FormBody className="">
						<h5 className=" font-bold whitespace-pre">
							A. CERTIFICATION OF CONSUMPTION OF BENEFITS:
						</h5>
						<div className="px-4">
							<CheckBox
								label={
									<>
										PhilHealth benefit is enough to cover
										HCI and PF Charges. <br />
										No purchase of drugs/medicines,
										supplies, diagnostics, and co-pay for
										professional fees by the member/patient.
									</>
								}
							/>
							<div className="px-4 mb-1">
								<table className="bordered-table w-full border-2 border-black">
									<tr>
										<td></td>
										<td className="text-sm">
											Total Actual Charges*
										</td>
									</tr>
									<tr>
										<td className="text-sm">
											Total Health Care Institution Fees
										</td>
										<td
											className="px-1"
											contentEditable
										></td>
									</tr>
									<tr>
										<td className="text-sm">
											Total Professional Fees
										</td>
										<td
											className="px-1"
											contentEditable
										></td>
									</tr>
									<tr>
										<td className="text-sm font-bold">
											Grand Total
										</td>
										<td
											className="px-1"
											contentEditable
										></td>
									</tr>
								</table>
							</div>
						</div>

						<div className="px-4">
							<CheckBox
								label={
									<>
										The benefit of the member/patient was
										completely consumed prior to co-pay OR
										the benefit of the member/patient is not
										completely consumed BUT with
										purchases/expenses for drugs/medicines,
										supplies, diagnostics and others.
									</>
								}
							/>
							<div className="px-4 mb-1">
								<span className="text-xs">
									a.) The total co-pay for the following are:
								</span>
								<table className="bordered-table w-full border-2 text-xs border-black">
									<tr>
										<td className="max-w-[108px] w-[108px]"></td>
										<td className="max-w-[112px] w-[112px] text-center">
											Total Actual Charges*
										</td>
										<td className="max-w-[188px] w-[188px] text-center">
											Amount after Application of Discount
											(i.e., personal discount, Senior
											Citizen/PWD)
										</td>
										<td className="max-w-[102px] w-[102px] text-center">
											PhilHealth Benefit
										</td>
										<td className="text-center">
											Amount after PhilHealth Deduction
										</td>
									</tr>
									<tr>
										<td>
											Total Health Care Institution Fees
										</td>
										<td
											className="px-1"
											contentEditable
										></td>
										<td
											className="px-1"
											contentEditable
										></td>
										<td
											className="px-1"
											contentEditable
										></td>
										<td>
											<InlineInput
												label="Amount P"
												className="w-full"
											/>
											<p>
												Paid by (check all that
												applies):
											</p>
											<div className="flex gap-2 flex-wrap">
												<CheckBox label="Member/Patient" />
												<CheckBox label="HMO" />
												<CheckBox label="Others (i.e., PCSO, Promisory note, etc.)" />
											</div>
										</td>
									</tr>
									<tr>
										<td>
											Total Professional Fees (for
											accredited and non-accredited
											professionals)
										</td>
										<td
											className="px-1"
											contentEditable
										></td>
										<td
											className="px-1"
											contentEditable
										></td>
										<td
											className="px-1"
											contentEditable
										></td>
										<td>
											<InlineInput
												label="Amount P"
												className="w-full"
											/>
											<p>
												Paid by (check all that
												applies):
											</p>
											<div className="flex gap-2 flex-wrap">
												<CheckBox label="Member/Patient" />
												<CheckBox label="HMO" />
												<CheckBox label="Others (i.e., PCSO, Promisory note, etc.)" />
											</div>
										</td>
									</tr>
								</table>

								<span className="text-xs">
									b.) Purchases/Expenses <b>NOT</b> included
									in the Health Care Institution Charges
								</span>

								<table className="bordered-table w-full border-2 text-xs border-black mb-2">
									<tr>
										<td className="w-3/5">
											Total cost of purchase/s for
											drugs/medicines and/or medical
											supplies bought by the
											patient/member within/outside the
											HCI during confinement
										</td>
										<td>
											<div className="flex items-center w-full gap-1 px-1">
												<CheckBox label="None" />
												<CheckBox
													className="w-full"
													label={
														<>
															Total Amount of{" "}
															<InlineInput
																className="w-[92px]"
																label="P"
																inputClassName="w-[92px]"
															/>
														</>
													}
												/>
											</div>
										</td>
									</tr>
									<tr>
										<td className="w-3/5">
											Total cost of diagnostic/laboratory
											examinations paid by the
											patient/member done within/outside
											the HCI during confinement
										</td>
										<td>
											<div className="flex items-center w-full gap-1 px-1">
												<CheckBox label="None" />
												<CheckBox
													className="w-full"
													label={
														<>
															Total Amount of{" "}
															<InlineInput
																className="w-[92px]"
																label="P"
																inputClassName="w-[92px]"
															/>
														</>
													}
												/>
											</div>
										</td>
									</tr>
								</table>
								<span className="text-xs">
									<b>* NOTE</b>: Total Actual Charges should
									be based on Statement of Account (SOA)
								</span>
							</div>
						</div>

						<h5 className=" font-bold whitespace-pre">
							B. CONSENT TO ACCESS PATIENT RECORD/S:
						</h5>
						<div className="px-4">
							<p className="italic font-bold text-xs">
								I hereby consent to the submission and
								examination of the patient’s pertinent medical
								records for the purpose of verifying the
								veracity of this claim to effect efficient
								processing of benefit payment. <br />I hereby
								hold PhilHealth or any of its officers,
								employees and/or representatives free from any
								and all legal liabilities relative to the
								herein-mentioned consent which I have
								voluntarily and willingly given in connection
								with this claim for reimbursement before
								PhilHealth.
							</p>
						</div>
						<div className="flex items-center">
							<div className="w-[60%] flex flex-col">
								<UnderlineInput
									className="w-[90%] pt-4 pb-3"
									label={`Signature Over Printed Name of Member/Patient/Authorized Representative`}
								/>
								<div className="flex items-center gap-1 mx-auto pb-4">
									<span className="mr-2">Date Signed:</span>
									<UnderscoreGroup label="month">
										<Underscore count={2} />
									</UnderscoreGroup>
									<b className="text-lg font-bold">-</b>
									<UnderscoreGroup label="day">
										<Underscore count={2} />
									</UnderscoreGroup>
									<b className="text-lg font-bold">-</b>
									<UnderscoreGroup label="day">
										<Underscore count={4} />
									</UnderscoreGroup>
								</div>

								<div className="flex items-center gap-4">
									<span className="w-1/2">
										Relationship of the representative to
										the member/patient:
									</span>
									<div className="grid grid-cols-3 gap-x-1 w-1/2">
										<CheckBox label="Spouse" />
										<CheckBox label="Child" />
										<CheckBox label="Parent" />
										<CheckBox label="Sibling" />
										<div className="col-span-2 flex items-center">
											<CheckBox
												className="whitespace-pre"
												label={<>Others, Specify </>}
											/>
											<UnderlineInput className="w-[64px]" />
										</div>
									</div>
								</div>

								<div className="flex items-center gap-4">
									<span className="w-1/2">
										Reason for signing on behalf of the
										member/patient:
									</span>
									<div className="grid grid-cols-1 gap-x-1 w-1/2">
										<CheckBox label="Patient is Incapacitated" />
										<div className="flex items-center">
											<CheckBox
												className="whitespace-pre"
												label={<>Other Reasons</>}
											/>
											<UnderlineInput className="w-full" />
										</div>
									</div>
								</div>
							</div>
							<div className="w-[40%] flex pl-4">
								<div className="flex flex-col w-[calc(100%-112px)] pr-2">
									<p className="text-xs mb-3">
										If patient/representative is unable to
										write, put right thumbmark.
										Patient/Representative should be
										assisted by an HCI representative.
									</p>
									<CheckBox label="Patient" />
									<CheckBox label="Representative" />
								</div>
								<div className="border-2 border-black min-h-[128px] w-[112px]"></div>
							</div>
						</div>
					</FormBody>
					<FormHeading
						title={`PART IV - CERTIFICATION OF CONSUMPTION OF HEALTH CARE INSTITUTION`}
					/>

					<FormBody className="border-b-0 p-0">
						<i className="text-xs font- text-center">
							I certify that services rendered were recorded in
							the patient’s chart and health care institution
							records and that the herein information given are
							true and correct.
						</i>
						<div className="flex items-center gap-6">
							<UnderlineInput
								label="Signature Over Printed Name of Authorized HCI Representative"
								className="pb-2"
							/>
							<UnderlineInput
								label="Official Capacity/Designation"
								className="pb-2"
							/>
							<div className="flex items-center gap-1 mx-auto">
								<span className="mr-2">Date Signed:</span>
								<UnderscoreGroup label="month">
									<Underscore count={2} />
								</UnderscoreGroup>
								<b className="text-lg font-bold">-</b>
								<UnderscoreGroup label="day">
									<Underscore count={2} />
								</UnderscoreGroup>
								<b className="text-lg font-bold">-</b>
								<UnderscoreGroup label="day">
									<Underscore count={4} />
								</UnderscoreGroup>
							</div>
						</div>
					</FormBody>
				</div>
			</div>
		</div>
  )
}

export default ClaimForm1

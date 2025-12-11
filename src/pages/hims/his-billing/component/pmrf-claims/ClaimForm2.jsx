import React, { useEffect, useState } from 'react'
import FlatIcon from '../../../../../components/FlatIcon';
import ActionBtn from '../../../../../components/buttons/ActionBtn';
import { useReactToPrint } from 'react-to-print';
import Axios from '../../../../../libs/axios';
import { useAuth } from '../../../../../hooks/useAuth';
import { dateMMDDYYYY, formatDateParts } from '../../../../../libs/helpers';
import RadioInput from '../../../../../components/inputs/RadioInput';
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
				className={`border-b w-full h-4 p-0 text-xs flex items-end min-w-[50px] justify-center ${inputClassName}`}
				contentEditable={true}
			></span>
		</div>
	);
};
const ClaimForm2 = ({patient, appointment}) => {
	const { user, checkUserType } = useAuth();
	const [canPrint, setCanPrint] = useState(false);
	const [downloadUrl, setDownloadUrl] = useState(null);
	const [PHICNo, setPHICNo] = useState(Array(12).fill(""));
	const [hciPan, setHciPan] = useState(Array(10).fill(""));
	const [surgeonPan, setSurgeonPan] = useState(Array(12).fill(""));
	// const [obgynePan, setObgynePan] = useState(Array(12).fill(""));
	const [anesthesiologyPan, setAnesthesiologyPan] = useState(Array(12).fill(""));
	const [doctorPan, setDoctorPan] = useState(Array(12).fill(""));
	const [isReferred, setIsReferred] = useState(!!patient?.appointment?.referred_by);
	const admitted = formatDateParts(appointment?.created_at);
	const discharged = formatDateParts(appointment?.updated_at);
	const expiredDate = formatDateParts(appointment?.expired_date);
	const expiredTime = formatDateParts(appointment?.expired_time);
	const componentRef = React.useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	useEffect(() => {
			if (patient?.philhealth) {
				setPHICNo(patient.philhealth.split("").slice(0, 12));
			}
			}, [patient?.philhealth]);
		
			useEffect(() => {
			if (user?.healthUnit?.accreditation_number) {
				setHciPan(user?.healthUnit?.accreditation_number.split("").slice(0, 10));
			}
			}, [user?.healthUnit?.accreditation_number]);
			useEffect(() => {
			if (appointment?.surgeonRefer?.accreditation_number) {
				setSurgeonPan(appointment?.surgeonRefer?.accreditation_number.split("").slice(0, 12));
			}
			}, [appointment?.surgeonRefer?.accreditation_number]);
			// useEffect(() => {
			// if (user?.healthUnit?.accreditation_number) {
			// 	setObgynePan(user?.healthUnit?.accreditation_number.split("").slice(0, 12));
			// }
			// }, [user?.healthUnit?.accreditation_number]);
			useEffect(() => {
			if (appointment?.anesthesiologistRefer?.accreditation_number) {
				setAnesthesiologyPan(appointment?.anesthesiologistRefer?.accreditation_number.split("").slice(0, 12));
			}
			}, [appointment?.anesthesiologistRefer?.accreditation_number]);
			useEffect(() => {
			if (appointment?.doctor?.accreditation_number) {
				setDoctorPan(appointment?.doctor?.accreditation_number.split("").slice(0, 12));
			}
			}, [appointment?.doctor?.accreditation_number]);
			
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
				className="bg-white p-[0.5in] flex flex-col w-[9.5in] gap-y-6 mx-auto flex-wrap"
				id="phic-form-printable" ref={componentRef}
			>
				<div className="bg-white flex flex-col w-[8.5in] min-h-[13in]   border-2">
					<div className="flex items-center relative justify-center border-b-2 px-2 pt-2 pb-1">
						<img
							className="w-[144px] absolute left-4 object-contain"
							src="/philhealth.png"
						/>
						<div className="flex flex-col text-center w-full mx-auto">
							<p>&nbsp;</p>

							<p className="text-sm">
								<i>Republic of the Philippines</i>
							</p>
							<h4 className="font-bold text-xl">
								{" "}
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
							<div className="flex items-center gap-2 ml-auto">
								<span className="font-light">Series #</span>
								<div className="flex items-center">
									<span
										className="border-l border-y w-5 h-5 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-l border-y w-5 h-5 p-0 text-xs"
										contentEditable={true}
									></span>
									<span
										className="border-x border-y w-5 h-5 p-0 text-xs"
										contentEditable={true}
									></span>
								</div>
							</div>
						</div>
						<div className="flex flex-col text-center  absolute right-2 top-0">
							<p className="text-sm">
								This form may be reproduced and <br /> is NOT
								FOR SALE
							</p>
							<h1 className="text-4xl font-bold mb-0">CF-2</h1>
							<h3 className="text-lg font-bold mb-0">
								(Claim Form 2)
							</h3>
							<p className="text-sm">Revised September 2018</p>
						</div>
					</div>

					<div className="flex flex-col border-b-2 p-2 text-sm">
						<b>IMPORTANT REMINDERS:</b>
						<p className="text-xs">
							PLEASE WRITE IN CAPITAL <b>LETTERS</b> AND{" "}
							<b>CHECK</b> THE APPROPRIATE BOXES.
						</p>
						<p className="text-xs">
							This form together with other supporting documents
							should be filed within sixty (60) calendar days from
							date of discharge.
						</p>{" "}
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
							<div className="col-span-12 flex items-center">
								<h5 className=" font-bold">
									1. PhilHealth Identification Number (PIN) of
									Member:
								</h5>

								<div className="flex items-center gap-1 ml-2">
									{Array.from({ length: 12 }).map((_, index) => (
										<React.Fragment key={index}>
										<input
											className="phic-input text-center uppercase border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
											maxLength={1}
											value={PHICNo[index] || ""}
										/>
										{(index === 1 || index === 10) && <span className="mx-1">-</span>}
										</React.Fragment>
									))}
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
								<div className="flex items-center gap-1 ml-2">
									{Array.from({ length: 10 }).map((_, index) => (
										<React.Fragment key={index}>
										<input
											className="phic-input text-center uppercase border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
											maxLength={1}
											value={hciPan[index] || ""}
										/>
										{(index === 1 || index === 10)}
										</React.Fragment>
									))}
									</div>
							</li>
							<li className="flex items-center gap-2">
								<h5 className=" font-bold whitespace-pre">
									2.Name of Health Care Institution:
								</h5>
								<span
									className="border-b w-full h-5 p-0 text-base"
									
								>
									{user?.healthUnit?.name}
								</span>
							</li>
							<li className="flex items-start gap-2">
								<h5 className=" font-bold whitespace-pre">
									3.Address:
								</h5>
								<div className="flex flex-col text-center text-xs w-full">
									<span
										className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
										contentEditable={true}
									>{user?.healthUnit?.street}, {user?.healthUnit?.barangay}</span>
									Building Number and Street Name
								</div>
								<div className="flex flex-col text-center text-xs w-full">
									<span
										className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
										contentEditable={true}
									>
										{user?.healthUnit?.municipality}
									</span>
									City/Municipality
								</div>
								<div className="flex flex-col text-center text-xs w-full">
									<span
										className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
										contentEditable={true}
									>
										{user?.healthUnit?.province}
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
								<div className="flex flex-col text-center text-xs min-w-[222px]">
									<span
										className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
										contentEditable={true}
									>
										{patient?.middle}
									</span>
									Middle Name <br /> (ex: DELA CRUZ JUAN JR
									SIPAG)
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
								
							</li>

							<li className="flex flex-col gap-2">
								<h5 className=" font-bold whitespace-pre mb-1">
									2.Was patient referred by another Health
									Care Institution (HCI)?
								</h5>
								<div className="flex items-start gap-2 pb-1">
									<RadioInput>
										{[
											{ label: "No", value: "No" },
											{ label: "Yes", value: "Yes" },
											].map((option) => (
											<label
												className="flex items-center gap-1 font-light text-sm"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												name="referred_by"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={option.value === "No" ? !isReferred : isReferred}
												onChange={() => setIsReferred(option.value === "Yes")}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>

									{isReferred ? (
										<>
										<div className="flex flex-col text-center text-xs w-full whitespace-pre">
										<span
											className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
											contentEditable={true}
										>teeesssttt</span>
										<span className="text-[10px]">
											Name of referring Health Care
											Institution
										</span>
									</div>
									<div className="flex flex-col text-center text-xs w-full whitespace-pre">
										<span
											className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
											contentEditable={true}
										>teeesssttt</span>
										<span className="text-[10px]">
											Building Number and Street Name
										</span>
									</div>
									<div className="flex flex-col text-center text-xs w-full">
										<span
											className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
											contentEditable={true}
										>teeesssttt</span>

										<span className="text-[10px]">
											City/Municipality
										</span>
									</div>
									<div className="flex flex-col text-center text-xs w-full">
										<span
											className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
											contentEditable={true}
										>teeesssttt</span>

										<span className="text-[10px]">
											Province
										</span>
									</div>
									<div className="flex flex-col text-center text-xs w-full">
										<span
											className="border-b w-full h-5 p-0 text-xs flex items-end justify-center"
											contentEditable={true}
										>teeesssttt</span>
										<span className="text-[10px]">
											Zip code
										</span>
									</div>
										</>
									) : (
										<>
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
										</>
									)}
									

								</div>
							</li>

							<li className="flex items-start gap-1">
								<h5 className=" font-bold whitespace-pre">
									3.Confinement Period:
								</h5>
								<div className="flex flex-col">
								{/* Date & Time Admitted */}
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-1 pb-1">
									<span className="mr-2 text-xs">a. Date Admitted</span>
									<div className="flex items-center gap-2">
										<BoxInputGroup label="Month" labelClassName="italic">
										{admitted.month.split("").map((char, index) => (
										<input
											key={`adm-month-${index}`}
											className="phic-input text-center border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
											maxLength={1}
											value={char}
											readOnly
										/>
										))}
										</BoxInputGroup>
										
										<b className="text-lg font-bold">-</b>
										<BoxInputGroup label="Day" labelClassName="italic">
										{admitted.day.split("").map((char, index) => (
										<input
											key={`adm-day-${index}`}
											className="phic-input text-center border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
											maxLength={1}
											value={char}
											readOnly
										/>
										))}
										</BoxInputGroup>
										<b className="text-lg font-bold">-</b>
										<BoxInputGroup label="Year" labelClassName="italic">
										{admitted.year.split("").map((char, index) => (
										<input
											key={`adm-year-${index}`}
											className="phic-input text-center border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
											maxLength={1}
											value={char}
											readOnly
										/>
										))}
										</BoxInputGroup>
									</div>
									</div>
									<div className="flex items-center gap-2 pb-1">
									<span className="mr-2 text-xs">b. Time Admitted</span>
									<div className="flex items-center gap-1">
										<BoxInputGroup
									label="hour"
									labelClassName="italic"
								>
									{admitted.hour.split("").map((char, index) => (
										<input
											key={`adm-hour-${index}`}
											className="phic-input text-center border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
											maxLength={1}
											value={char}
											readOnly
										/>
										))}
								</BoxInputGroup>
								<b>-</b>
								<BoxInputGroup
									label="min"
									labelClassName="italic"
								>
									{admitted.min.split("").map((char, index) => (
										<input
											key={`adm-min-${index}`}
											className="phic-input text-center border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
											maxLength={1}
											value={char}
											readOnly
										/>
										))}
								</BoxInputGroup>
									</div>
									</div>
									<div className="flex items-center gap-4">
									<RadioInput>
										{[
											{ label: "AM", value: "AM" },
											{ label: "PM", value: "PM" },
											].map((option) => (
											<label
												className="flex items-center gap-1 font-light text-sm"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												name="referred_by"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={admitted.ampm === option.value}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									</div>
								</div>

								{/* Date & Time Discharged */}
								<div className="flex items-center gap-4 mt-2">
									<div className="flex items-center gap-1">
									<span className="text-xs">c. Date Discharged</span>
									<div className="flex items-center gap-1">
										<BoxInputGroup
									label="Month"
									labelClassName="italic"
								>
									{discharged.month.split("").map((char, index) => (
										<input
											key={`dis-month-${index}`}
											className="phic-input text-center border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
											maxLength={1}
											value={char}
											readOnly
										/>
										))}
								</BoxInputGroup>
								<b>-</b>
								<BoxInputGroup
									label="Day"
									labelClassName="italic"
								>
									{discharged.day.split("").map((char, index) => (
										<input
											key={`dis-day-${index}`}
											className="phic-input text-center border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
											maxLength={1}
											value={char}
											readOnly
										/>
										))}
								</BoxInputGroup>
								<b>-</b>
								<BoxInputGroup
									label="Year"
									labelClassName="italic"
								>
									{discharged.year.split("").map((char, index) => (
										<input
											key={`dis-year-${index}`}
											className="phic-input text-center border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
											maxLength={1}
											value={char}
											readOnly
										/>
										))}
								</BoxInputGroup>
									</div>
									</div>
									<div className="flex items-center gap-1">
									<span className="text-xs">d. Time Discharged</span>
									<div className="flex items-center gap-1">
										<BoxInputGroup
									label="hour"
									labelClassName="italic"
								>
									{discharged.hour.split("").map((char, index) => (
										<input
											key={`dis-hour-${index}`}
											className="phic-input text-center border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
											maxLength={1}
											value={char}
											readOnly
										/>
										))}
								</BoxInputGroup>
								<b>-</b>
								<BoxInputGroup
									label="min"
									labelClassName="italic"
								>
									{discharged.min.split("").map((char, index) => (
										<input
											key={`dis-min-${index}`}
											className="phic-input text-center border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
											maxLength={1}
											value={char}
											readOnly
										/>
										))}
								</BoxInputGroup>
									</div>
									</div>
									<div className="flex items-center gap-4">
									<RadioInput>
										{[
											{ label: "AM", value: "AM" },
											{ label: "PM", value: "PM" },
											].map((option) => (
											<label
												className="flex items-center gap-1 font-light text-sm"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												name="referred_by"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={discharged.ampm === option.value}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									
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
										<RadioInput>
										{[
											{ label: "a. Improved" },
											].map((option) => (
											<label
												className="flex items-center gap-1 font-light text-xs"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												name="referred_by"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={appointment?.patient_disposition === "Improved"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									</div>
									{appointment?.patient_disposition === "Expired" ? (
										<>
										<div className="col-span-9 flex items-center gap-4">
										<RadioInput>
										{[
											{ label: "e. Expired" },
											].map((option) => (
											<label
												className="flex items-center gap-1 font-light text-xs"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												name="referred_by"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={appointment?.patient_disposition === "Expired"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
										<div className="flex items-center gap-1">
											<div className="flex items-center gap-1">
											<div className="flex items-center gap-1">
												{expiredDate.month.split("").map((char, index) => (
												<input
													key={`dis-month-${index}`}
													className="phic-input text-center border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
													maxLength={1}
													value={char}
													readOnly
												/>
												))}
												<b className="text-lg font-bold">-</b>
												{expiredDate.day.split("").map((char, index) => (
												<input
													key={`dis-day-${index}`}
													className="phic-input text-center border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
													maxLength={1}
													value={char}
													readOnly
												/>
												))}
												<b className="text-lg font-bold">-</b>
												{expiredDate.year.split("").map((char, index) => (
												<input
													key={`dis-year-${index}`}
													className="phic-input text-center border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
													maxLength={1}
													value={char}
													readOnly
												/>
												))}
											</div>
											</div>
											<div className="flex items-center gap-1">
											<span className="text-xs">Time: </span>
											<div className="flex items-center gap-1">
												{expiredTime.hour.split("").map((char, index) => (
												<input
													key={`dis-hour-${index}`}
													className="phic-input text-center border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
													maxLength={1}
													value={char}
													readOnly
												/>
												))}
												<b className="text-lg font-bold">:</b>
												{expiredTime.min.split("").map((char, index) => (
												<input
													key={`dis-min-${index}`}
													className="phic-input text-center border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
													maxLength={1}
													value={char}
													readOnly
												/>
												))}
											</div>
											</div>
											<div className="flex items-center gap-4">
											<RadioInput>
												{[
													{ label: "AM", value: "AM" },
													{ label: "PM", value: "PM" },
													].map((option) => (
													<label
														className="flex items-center gap-1 font-light text-xs"
														key={`rdio-${option.value}`}
													>
														<input
														type="checkbox"
														name="referred_by"
														value={option.value}
														id={`irdio-${option.value}`}
														checked={expiredTime.ampm === option.value}
														/>
														{option.label}
													</label>
												))}
											</RadioInput>
											
											</div>
										</div>
									</div>
										</>
									) : (
										<>
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
										</>
									)}
									

									<div className="col-span-3">
										<RadioInput>
										{[
											{ label: "b. Recovered" },
											].map((option) => (
											<label
												className="flex items-center gap-1 font-light text-xs"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												name="referred_by"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={appointment?.patient_disposition === "Recovered"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									</div>
									<div className="col-span-9 flex start">
										<RadioInput>
										{[
											{ label: "f. Transferred/Referred" },
											].map((option) => (
											<label
												className="flex items-center gap-1 font-light text-xs"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												name="referred_by"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={appointment?.patient_disposition === "Transferred/Referred"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
										<UnderlineInput
											label="Name of Referral Health Care Institution"
											className="w-3/4"
										/>
									</div>
									<div className="col-span-3">
										<RadioInput>
										{[
											{ label: "c. Home/Discharged Against Medical Advise" },
											].map((option) => (
											<label
												className="flex items-center gap-1 font-light text-xs"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												name="referred_by"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={appointment?.patient_disposition === "Home/Discharged Against Medical Advise"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
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
										<RadioInput>
										{[
											{ label: "d. Absconded" },
											].map((option) => (
											<label
												className="flex items-center gap-1 font-light text-xs"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												name="referred_by"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={appointment?.patient_disposition === "Absconded"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
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
								<RadioInput>
									{[
										{ label: "Private" },
										].map((option) => (
										<label
											className="flex items-center gap-1 font-light text-xs"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											name="referred_by"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={appointment?.room_type === "Private"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Non-Private (Charity/Service)" },
										].map((option) => (
										<label
											className="flex items-center gap-1 font-light text-xs"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											name="referred_by"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={appointment?.room_type === "Non-Private"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
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
									6. Admission Diagnosis/es: 
								</h5>
							</li>
						</ol>
					</FormBody>

					<FormBody>
						<h5 className="font-bold whitespace-pre mb-1">
							7. Discharge Diagnosis/es (Use additional CF2 if necessary):
						</h5>
						<table className="transparent-table ">
							<thead>
								<tr>
									<th className="text-xs">Diagnosis</th>
									<th className="text-xs">ICD-10 Code/s</th>
									<th className="text-xs">Related Procedure/s (if any)</th>
									<th className="text-xs">RVS Code</th>
									<th className="text-xs">Date of Procedure</th>
									<th className="text-xs">Laterality (check applicable box)</th>
								</tr>
							</thead>
							<tbody>
								{/* Display all Diagnoses */}
								{appointment?.diagnosis?.map((diagnose, index) => (
									<tr key={`diagnosis-${index}`}>
										<td className="text-xs">{diagnose?.diagnosis_desc || "—"}</td>
										<td className="text-xs">{diagnose?.diagnosis_code || "—"}</td>
										<td className="text-xs">—</td> {/* No procedure for this row */}
										<td className="text-xs">—</td>
										<td className="text-xs">—</td>
										<td className="text-xs">—</td>
									</tr>
								))}

								{/* Display all Procedures */}
								{appointment?.procedure?.map((operation, index) => (
									<tr key={`procedure-${index}`}>
										<td className="text-xs">—</td> {/* No diagnosis for this row */}
										<td className="text-xs">—</td>
										<td className="text-xs">
											{operation?.procedure_desc || "—"}
										</td>
										<td className="text-xs">
											{operation?.procedure_code|| "—"}
										</td>
										<td className="text-xs">
											{operation?.procedureCode?.updated_at
												? dateMMDDYYYY(operation.procedureCode.updated_at)
												: "—"}
										</td>
										<td className="text-xs">
											<div className="flex items-center gap-2">
												<CheckBox label={"left"} />
												<CheckBox label={"right"} />
												<CheckBox label={"both"} />
											</div>
										</td>
									</tr>
								))}
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
								<h5 className="font-bold whitespace-pre">9. PhilHealth Benefits:</h5>
								<div className="flex gap-4 w-full">
									<b className="text-sm font-bold whitespace-pre">ICD 10 or RVS Code:</b>
									<div className="overflow-x-auto"> {/* Ensures responsiveness */}
										<table className="transparent-table ">
											<thead>
												<tr>
													<th className="text-xs">First Case (Diagnosis)</th>
													<th className="text-xs">Second Case (Procedure)</th>
												</tr>
											</thead>
											<tbody>
												{/* Maximum row count based on the longer of the two arrays */}
												{[...Array(Math.max(appointment?.diagnosis?.length || 0, appointment?.procedure?.length || 0))].map((_, index) => (
													<tr key={`case-${index}`}>
														<td className="text-xs">
															{appointment?.diagnosis?.[index]?.case_rate_code || "—"}
														</td>
														<td className="text-xs ">
															{appointment?.procedure?.[index]?.case_rate_code || "—"}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
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
																{Array.from({ length: 12 }).map((_, index) => (
																	<React.Fragment key={index}>
																	<input
																		className="phic-input text-center uppercase border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
																		maxLength={1}
																		value={doctorPan[index] || ""}
																	/>
																	{(index === 1 || index === 10) && <span className="mx-1">-</span>}
																	</React.Fragment>
																))}
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
																{Array.from({ length: 12 }).map((_, index) => (
																	<React.Fragment key={index}>
																	<input
																		className="phic-input text-center uppercase border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
																		maxLength={1}
																		value={surgeonPan[index] || ""}
																	/>
																	{(index === 1 || index === 10) && <span className="mx-1">-</span>}
																	</React.Fragment>
																))}
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
																{Array.from({ length: 12 }).map((_, index) => (
																	<React.Fragment key={index}>
																	<input
																		className="phic-input text-center uppercase border-black border w-5 h-5 p-0 text-xs border-l last:border-r"
																		maxLength={1}
																		value={anesthesiologyPan[index] || ""}
																	/>
																	{(index === 1 || index === 10) && <span className="mx-1">-</span>}
																	</React.Fragment>
																))}
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

export default ClaimForm2

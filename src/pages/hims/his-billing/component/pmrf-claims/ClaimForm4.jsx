import React, { useEffect, useState } from 'react'
import { calculateAge, formatDateParts } from '../../../../../libs/helpers';
import { useReactToPrint } from 'react-to-print';
import FlatIcon from '../../../../../components/FlatIcon';
import ActionBtn from '../../../../../components/buttons/ActionBtn';
import Axios from '../../../../../libs/axios';
import { useAuth } from '../../../../../hooks/useAuth';
import RadioInput from '../../../../../components/inputs/RadioInput';
import Table from '../../../../../components/table/Table';
/* eslint-disable react/prop-types */
const BoxInput = () => {
	return (
		<>
			<label className="flex items-center border-l last:border-r border-b border-black">
				<input
					type="text"
					className="w-4 p-0 leading-none text-center border-0 !text-xs h-3"
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
		<div
			className={`flex flex-col items-center relative pt-1 ${className}`}
		>
			<div className="flex items-center">{children}</div>
			{label && (
				<label
					className={` absolute !text-[8px] -bottom-[20px] ${labelClassName}`}
				>
					{label}
				</label>
			)}
		</div>
	);
};
const UnderlineInput = ({
	label = "",
	className = "",
	labelClassName = "",
	inputClassName = "",
}) => {
	return (
		<label
			className={`flex flex-col justify-center items-center gap-0 ${className}`}
		>
			<input
				type="text"
				className={`pl-[2px] w-full ${inputClassName}`}
				style={{ borderWidth: "0px", borderBottom: "1px solid #000" }}
			/>
			<label className={`!text-[10px] ${labelClassName}`}>{label}</label>
		</label>
	);
};
const TextInput = ({
	label = "",
	className = "",
	labelClassName = "",
	inputClassName = "",
}) => {
	return (
		<label className={`flex items-center gap-0 ${className}`}>
			<label className={`text-xs ${labelClassName}`}>{label}</label>
			<input
				type="text"
				className={`pl-[2px] border-b w-full ${inputClassName}`}
				style={{ borderWidth: "0px", borderBottom: "1px solid #000" }}
			/>
		</label>
	);
};

const CheckBox = ({
	label,
	checked = "",
	className = "",
	inputClassName = "",
}) => {
	const [inputChecked, setInputChecked] = useState("");
	useEffect(() => {
		let t = setTimeout(() => {
			if (checked == "checked") {
				setInputChecked(checked);
			}
		}, 100);
		return () => {
			clearTimeout(t);
		};
	}, [checked]);
	return (
		<label
			className={`flex items-center text-xs gap-1 font-normal ${className}`}
		>
			<input
				checked={inputChecked}
				type="checkbox"
				className={inputClassName}
				onChange={() => {
					setInputChecked((inputChecked) =>
						inputChecked == "checked" ? "" : "checked"
					);
				}}
			/>
			{label}
		</label>
	);
};
const ClaimForm4 = ({patient, appointment}) => {
	const { user, checkUserType } = useAuth();
	const [canPrint, setCanPrint] = useState(false);
	const [downloadUrl, setDownloadUrl] = useState(null);
	const admitted = formatDateParts(appointment?.created_at);
	const discharged = formatDateParts(appointment?.updated_at);
	const [abdomen, setAbdomen] = useState("");
	const [heent, setHeent] = useState("");
	const [genitourinary, setGenitourinary] = useState("");
	const [chest, setChest] = useState("");
	const [skin, setSkin] = useState("");
	const componentRef = React.useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	useEffect(() => {
				if (appointment?.digital_rectal_libraries?.enlarge_prospate === "true") {
					setAbdomen("Enlarge Prospate");
				} else if (appointment?.digital_rectal_libraries?.essentially_normal_digital === "true"){
					setAbdomen("Essentially Normal");
				} else if (appointment?.digital_rectal_libraries?.hemorrhoids ==="true"){
					setAbdomen("Hemorrhoids");
				} else if (appointment?.digital_rectal_libraries?.mass === "true"){
					setAbdomen("Mass");
				} else if (appointment?.digital_rectal_libraries?.not_applicable === "true"){
					setAbdomen("Not Applicable");
				} else if (appointment?.digital_rectal_libraries?.other_digital === "true"){
					setAbdomen("Others");
				} else if (appointment?.digital_rectal_libraries?.pus === "true"){
					setAbdomen("PUS");
				}
		}, [appointment?.digital_rectal_libraries]);
	
		useEffect(() => {
				if (appointment?.heent_libraries?.anicteric_sclerae === "true") {
					setHeent("Anicteric sclerae");
				} else if (appointment?.heent_libraries?.exudates === "true"){
					setHeent("Exudates");
				} else if (appointment?.heent_libraries?.essentially_normal_heent ==="true"){
					setHeent("Essentially Normal");
				} else if (appointment?.heent_libraries?.abnormal_pupillary === "true"){
					setHeent("Abnormal pupillary reaction");
				} else if (appointment?.heent_libraries?.cervical_lympadenopathy === "true"){
					setHeent("Cervical lympadenopathy");
				} else if (appointment?.heent_libraries?.dry_mucous_membrane === "true"){
					setHeent("Dry mucous membrane");
				} else if (appointment?.heent_libraries?.icteric_sclerae === "true"){
					setHeent("Icteric sclerae");
				} else if (appointment?.heent_libraries?.pale_conjunctivae === "true"){
					setHeent("Pale conjunctivae");
				} else if (appointment?.heent_libraries?.sunken_eyeballs ==="true"){
					setHeent("Sunken eyeballs");
				} else if (appointment?.heent_libraries?.sunken_fontanelle === "true"){
					setHeent("Sunken fontanelle");
				} else if (appointment?.heent_libraries?.intact_tympanic === "true"){
					setHeent("Intact tympanic mebrane");
				} else if (appointment?.heent_libraries?.pupils_brisky === "true"){
					setHeent("Pupils brisky reactive to light");
				} else if (appointment?.heent_libraries?.tonsillopharyngeal === "true"){
					setHeent("Tonsillopharyngeal congestion");
				} else if (appointment?.heent_libraries?.hypertropic_tonsils === "true"){
					setHeent("Hypertropic tonsils");
				} else if (appointment?.heent_libraries?.alar_flaring ==="true"){
					setHeent("Alar flaring");
				} else if (appointment?.heent_libraries?.nasal_discharge === "true"){
					setHeent("Nasal discharge");
				} else if (appointment?.heent_libraries?.aural_discharge === "true"){
					setHeent("Aural discharge");
				} else if (appointment?.heent_libraries?.palpable_mass === "true"){
					setHeent("Palpable mass");
				} else if (appointment?.heent_libraries?.others_heent === "true"){
					setHeent("Others");
				}
		}, [appointment?.heent_libraries]);
	
		useEffect(() => {
				if (appointment?.genitourinary_libraries?.essentially_normal_genitourinary === "true") {
					setGenitourinary("Essentially normal");
				} else if (appointment?.genitourinary_libraries?.blood_stained === "true"){
					setGenitourinary("Blood stained in exam finger");
				} else if (appointment?.genitourinary_libraries?.cervical_dilatation ==="true"){
					setGenitourinary("Cervical dilatation");
				} else if (appointment?.genitourinary_libraries?.abnormal_discharge === "true"){
					setGenitourinary("Presence of abnormal discharge");
				} else if (appointment?.genitourinary_libraries?.others_genitourinary === "true"){
					setGenitourinary("Others");
				} 
		}, [appointment?.genitourinary_libraries]);
		useEffect(() => {
				if (appointment?.chest_libraries?.symmetrical === "true") {
					setChest("Symmetrical chest expansion");
				} else if (appointment?.chest_libraries?.lumps_over_breast === "true"){
					setChest("Lumps over breast(s)");
				} else if (appointment?.chest_libraries?.clear_breath_sounds ==="true"){
					setChest("Clear breath sounds");
				} else if (appointment?.chest_libraries?.retractions === "true"){
					setChest("Retractions");
				} else if (appointment?.chest_libraries?.crackles === "true"){
					setChest("Crackles/rales");
				} else if (appointment?.chest_libraries?.wheezes === "true"){
					setChest("Wheezes");
				} else if (appointment?.chest_libraries?.essentially_normal_chest === "true"){
					setChest("Essentially normal");
				} else if (appointment?.chest_libraries?.asymmetrical_chest_expansion === "true"){
					setChest("Asymmetrical chest expansion");
				} else if (appointment?.chest_libraries?.decreased_breath_sounds === "true"){
					setChest("Decreased breath sounds");
				} else if (appointment?.chest_libraries?.enlarge_axillary === "true"){
					setChest("Enlarge Axillary Lymph Nodes");
				} else if (appointment?.chest_libraries?.others_chest === "true"){
					setChest("Others");
				} 
		}, [appointment?.chest_libraries]);
		useEffect(() => {
				if (appointment?.skin_libraries?.essentially_normal_skin === "true") {
					setSkin("Essentially normal");
				} else if (appointment?.skin_libraries?.weak_pulses === "true"){
					setSkin("Weak pulses");
				} else if (appointment?.skin_libraries?.clubbing ==="true"){
					setSkin("Clubbing");
				} else if (appointment?.skin_libraries?.cold_clammy === "true"){
					setSkin("Cold clammy");
				} else if (appointment?.skin_libraries?.cyanosis === "true"){
					setSkin("Cyanosis/mottled skin");
				} else if (appointment?.skin_libraries?.edema_swelling === "true"){
					setSkin("Edema/swelling");
				} else if (appointment?.skin_libraries?.decreased_mobility === "true"){
					setSkin("Decreased mobility");
				} else if (appointment?.skin_libraries?.pale_nailbeds === "true"){
					setSkin("Pale nailbeds");
				} else if (appointment?.skin_libraries?.rashes_petechiae === "true"){
					setSkin("Rashes/Petechiae");
				} else if (appointment?.skin_libraries?.poor_skin_turgor === "true"){
					setSkin("Poor skin turgor");
				} else if (appointment?.skin_libraries?.others_skin === "true"){
					setSkin("Others");
				} 
		}, [appointment?.skin_libraries]);
	const submit = (data) => {
			setCanPrint(true);
			} 
			console.log("Claims Form 4", appointment)
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
				className="bg-white p-[0.5in]  flex flex-col w-[9.5in] gap-y-6 mx-auto"
				id="phic-form-printable" ref={componentRef}
			>
				<div className="bg-white flex flex-col w-[8.5in] min-h-[13in] ">
					<div className="flex items-center">
						<img
							src="/philhealth.png"
							className="h-[88px] mr-auto"
						/>
						<div className="flex flex-col items-center justify-center ">
							<b className="text-xs">
								This form may be reproduced and is NOT FOR SALE
							</b>
							<h3 className="text-2xl font-bold">CF4</h3>
							<b className="text-xs">(Claim Form 4)</b>
							<b className="text-xs">February 2020</b>
							<div className="flex items-center text-xs">
								<b className="mr-2">Series #</b>
								<BoxInput />
								<BoxInput />
								<BoxInput />
								<BoxInput />
								<BoxInput />
								<BoxInput />
								<BoxInput />
								<BoxInput />
								<BoxInput />
								<BoxInput />
								<BoxInput />
								<BoxInput />
							</div>
						</div>
					</div>

					<div className="flex flex-col">
						<h6 className="font-bold text-xs">
							IMPORTANT REMINDERS:
						</h6>
						<p className="text-xs">
							PLEASE FILL OUT APPROPRIATE FIELDS, WRITE IN CAPITAL
							LETTERS AND CHECK THE APPROPRIATE BOXES.
						</p>
						<p className="text-xs">
							This form, together with other supporting documents,
							should be filled within{" "}
							<b> sixty (60) calendar days</b> from the date of
							discharge.
						</p>
						<p className="text-xs">
							All information, fields and tick boxes in this form
							are necessary.{" "}
							<b>
								Claim forms with incomplete information shall
								not be processed.
							</b>
						</p>
						<p className="font-bold text-xs">
							FALSE / INCORRECT INFORMATION OR MISREPRESENTATION
							SHALL BE SUBJECT TO CRIMINAL, CIVIL OR
							ADMINISTRATIVE LIABILITIES.
						</p>
					</div>

					<div className="border flex items-center justify-center text-xs font-bold">
						I . HEALTH CARE INSTITUTION (HCI) INFORMATION
					</div>
					<div className="border-x border-b flex font-bold">
						<div className="border-r p-1 pb-0 text-xs w-3/5 flex flex-col">
							<span> 1. Name of HCI &nbsp;&nbsp;</span>
							<div className="h-4 text-center">{user?.healthUnit?.name}</div>
						</div>
						<div className=" text-xs p-1 pb-0 flex flex-col">
							<span>2. Accreditation Number &nbsp;&nbsp;</span>
							<div className="h-4 text-center">{user?.healthUnit?.accreditation_number}</div>
						</div>
					</div>
					<div className="border-x border-b flex flex-col font-bold">
						<div className="p-1 pb-0 text-xs flex-col">
							3. Address of HCI
						</div>
						<div className="flex border- w-full ">
							<div
								className="text-xs border-0 w-[20%] text-center h-5 p-1"
								
							>{user?.healthUnit?.lot}</div>
							<div
								className="text-xs border-0 w-[20%] text-center h-5 p-1"
								
							>{user?.healthUnit?.street}</div>
							<div
								className="text-xs border-0 w-[25%] text-center h-5 p-1"
								
							>{user?.healthUnit?.barangay}, {user?.healthUnit?.municipality}</div>
							<div
								className="text-xs border-0 w-[25%] text-center h-5 p-1"
								
							>{user?.healthUnit?.province}</div>
							<div
								className="text-xs border-0 w-[10%] text-center h-5 p-1"
								
							>{user?.healthUnit?.zip}</div>
						</div>
						<div className="flex border-t w-full ">
							<div className="text-[8px] border-x w-[20%] text-center">
								Bldg No. and Name/ Lot/Block
							</div>
							<div className="text-[8px] border-x w-[20%] text-center">
								Street/Subdivision/Village
							</div>
							<div className="text-[8px] border-x w-[25%] text-center">
								Barangay/City/ Municipality
							</div>
							<div className="text-[8px] border-x w-[25%] text-center">
								Province
							</div>
							<div className="text-[8px] border-x w-[10%] text-center">
								Zip Code
							</div>
						</div>
					</div>

					<div className="border-x border-b flex items-center justify-center text-xs font-bold">
						II. PATIENT'S DATA
					</div>
					<div className="border-x flex font-bold">
						<div className="border-r pt-1 pb-0 text-xs w-[75%] flex flex-col">
							<span className="pb-0 text-xs">
								1. Name of Patient
							</span>
						</div>
						<div className=" text-xs flex gap-4">
							<div>2. PIN:</div>
							<div
								className="text-center"
								
							>{patient?.philhealth}</div>
						</div>
					</div>
					<div className="border-b border-x flex">
						<div className="border-r w-[75%]">
							<div className="grid grid-cols-3">
								<div
									contentEditable
									className="text-[14px] font-semibold pb-2 -mt-2  border-b text-center"
								>
									{patient?.lastname}
								</div>
								<div
									contentEditable
									className="text-[14px] font-semibold pb-2 -mt-2 border-b text-center"
								>
									{patient?.firstname}
								</div>
								<div
									contentEditable
									className="text-[14px] font-semibold pb-2 -mt-2  border-b text-center"
								>
									{patient?.middle}
								</div>
								<div className="text-[8px] border-b border-r text-center">
									Last Name
								</div>
								<div className="text-[8px] border-b border-r text-center">
									First Name
								</div>
								<div className="text-[8px] border-b text-center">
									Middle Name
								</div>
							</div>
							<span className="text-xs font-bold p-1 flex flex-col">
								5. Chief Complaint
								<div
									className="p-1 h-5 w-full"
								>{appointment?.pre_notes}</div>
							</span>
						</div>
						<div className="flex flex-col w-[25%]">
							<div className="border-b text-xs font-bold p-1 gap-2 pb-[10px] w-full">
								3. Age: &nbsp;&nbsp;
								<span>
									{calculateAge(patient?.birthday)} yrs. old
								</span>
							</div>
							<div className="text-xs font-bold flex items-center p-1 gap-2 pb-3 w-full">
								<span>4. Sex</span>
								<CheckBox
									label="Male"
									checked={
										patient?.gender == "Male"
											? "checked"
											: ""
									}
								/>
								<CheckBox
									label="Female"
									checked={
										patient?.gender == "Female"
											? "checked"
											: ""
									}
								/>
							</div>
						</div>
					</div>

					<div className="border-b border-x flex">
						<div className="border-r w-[75%] grid grid-cols-2">
							<div
								className="text-xs font-bold pb-0 p-1 border-r flex flex-col"
							>
								<span>6. Admitting Diagnosis:</span>

								<table className="transparent-table">
										<tbody>
											{/* Display all Diagnoses */}
											{appointment?.diagnosis?.map((diagnose, index) => (
												<tr key={`diagnosis-${index}`}>
													<td className="text-xs">{diagnose?.diagnosis_code || "—"}</td>
													<td className="text-xs">{diagnose?.diagnosis_desc || "—"}</td>
												</tr>
											))}
										</tbody>
								</table>
							</div>
									
							<div
								className="text-xs font-bold pb-0 p-1 flex flex-col"
							>
								<span> 7 . Discharge Diagnosis:</span>
								<table className="transparent-table">
										<tbody>
											{/* Display all Diagnoses */}
											{appointment?.diagnosis?.map((diagnose, index) => (
												<tr key={`diagnosis-${index}`}>
													<td className="text-xs">{diagnose?.diagnosis_code || "—"}</td>
													<td className="text-xs">{diagnose?.diagnosis_desc || "—"}</td>
												</tr>
											))}
										</tbody>
								</table>
							</div>
						</div>
						<div className="flex flex-col">
							<div
								className="text-xs font-bold p-1 pb-0 border-b flex flex-col"
							>
								<span>8. a. 1st Case Rate Code</span>

								<table className="transparent-table">
										<tbody>
											{/* Display all Diagnoses */}
											{appointment?.diagnosis?.map((diagnose, index) => (
												<tr key={`diagnosis-${index}`}>
													<td className="text-xs">{diagnose?.case_rate_code || "—"}</td>
												</tr>
											))}
										</tbody>
								</table>
							</div>
							<div
								className="text-xs font-bold p-1 pb-0 flex flex-col"
							>
								<span>8. b. 2nd Case Rate Code</span>
								<table className="transparent-table">
										<tbody>
											{/* Display all Diagnoses */}
											{appointment?.diagnosis?.map((diagnose, index) => (
												<tr key={`diagnosis-${index}`}>
													<td className="text-xs">{diagnose?.case_rate_code || "—"}</td>
												</tr>
											))}
										</tbody>
								</table>
							</div>
						</div>
					</div>

					<div className="border-b border-x grid grid-cols-2 p-1">
						<div className="flex items-center pb-4">
							<span className="text-xs font-bold">
								9. a. Date Admitted:{" "}
							</span>
							<div className="flex items-center gap-1 ml-2">
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
						<div className="flex items-center pt-1 pb-4">
							<span className="text-xs font-bold">
								9. b. Time Admitted:{" "}
							</span>
							<div className="flex items-center gap-2 ml-2">
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
								<div />
								<div />
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
					</div>
					<div className="border-b border-x grid grid-cols-2 p-1">
						<div className="flex items-center pb-4">
							<span className="text-xs font-bold">
								10. a. Date Discharged
							</span>
							<div className="flex items-center gap-2 ml-2">
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
						<div className="flex items-center pt-1 pb-4">
							<span className="text-xs font-bold">
								10. b. Time Discharged:
							</span>
							<div className="flex items-center gap-2 ml-2">
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
								<div />
								<div />
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

					<div className="border-b border-x flex items-center justify-center text-xs font-bold">
						<h5 className="font-bold4">
							III. REASON FOR ADMISSION
						</h5>
					</div>

					<div className="border-b border-x flex">
						<span className="text-xs font-bold p-1 whitespace-nowrap">
							1. History of Present Illness:
						</span>
						<div
							className="w-full pl-1 text-xs font-bold"
						>
							{appointment?.clinical_history}
						</div>
					</div>
					<div className="border-b border-x flex flex-col">
						<div className="flex items-center">
							<span className="text-xs font-bold p-1 whitespace-nowrap">
								2 a. Pertment Past Medical History.
							</span>
							<div
								className="w-full pl-1 text-xs font-bold"
								contentEditable
							></div>
						</div>
						<span className="text-xs font-bold p-1">
							2 b. OB/GYN History
						</span>
						<div className="flex items-center gap-1 pb-1">
							<TextInput
								label="G"
								className="w-[33px] mx-4"
								inputClassName="text-center"
							/>
							<TextInput
								label="P"
								className="w-[33px] mx-2"
								inputClassName="text-center"
							/>
							(
							<UnderlineInput
								className="w-[33px] -mb-[3px]"
								inputClassName="text-center"
							/>
							,
							<UnderlineInput
								className="w-[33px] -mb-[3px]"
								inputClassName="text-center"
							/>
							,
							<UnderlineInput
								className="w-[33px] -mb-[3px]"
								inputClassName="text-center"
							/>
							,
							<UnderlineInput
								className="w-[33px] -mb-[3px]"
								inputClassName="text-center"
							/>
							)
							<TextInput
								label="LMP"
								className="w-[88px] mx-2"
								inputClassName="text-center"
							/>
							<CheckBox label={`NA`} />
						</div>
					</div>
					<div className="border-b border-x flex flex-col">
						<span className="text-xs font-bold px-1 pt-2">
							3. Pertinent Signs and Symptoms on Admission (tick
							applicable box/es):
						</span>
						<div className="grid grid-cols-4 gap-2 p-2 px-3">
							<CheckBox label={`Altered mental sensorium`} />
							<CheckBox label={`Diarrhea`} />
							<CheckBox label={`Hematemesis `} />
							<CheckBox label={`Palpitations`} />
							<CheckBox label={`Abdminal cramp/pain`} />
							<CheckBox label={`Dizziness`} />
							<CheckBox label={`Hematuria`} />
							<CheckBox label={`Seizures`} />
							<CheckBox label={`Anorexia`} />
							<CheckBox label={`Dysphagia`} />
							<CheckBox label={`Hemoptysis`} />
							<CheckBox label={`Skin rashes`} />
							<CheckBox label={`Bleeding gums`} />
							<CheckBox label={`Dysuria`} />
							<CheckBox label={`Jaundice`} />
							<CheckBox label={`Sweating`} />
							<CheckBox label={`Blurring of vision`} />
							<CheckBox label={`Epistaxis`} />
							<CheckBox label={`Lower extremity edema`} />
							<CheckBox label={`Urgency`} />
							<CheckBox label={`Chest pain/discomfort`} />
							<CheckBox label={`Fever`} />
							<CheckBox label={`Myalgia`} />
							<CheckBox label={`Vomiting`} />
							<CheckBox label={`Constipation`} />
							<CheckBox label={`Frequency of urination`} />
							<CheckBox label={`Orthopnea`} />
							<CheckBox label={`Weight loss`} />
							<CheckBox label={`Cough`} />
							<CheckBox label={`Headache`} />
							<CheckBox label={`Pain, ________________ (site)`} />
							<CheckBox label={`Others ________________`} />
						</div>
					</div>

					<div className="border-b border-x flex flex-col pb-2">
						<div className="text-xs font-bold px-1 pt-2 flex items-center w-full gap-2 mb-2">
							<span>
								4. Referred from another health care institution
								(HCI):{" "}
							</span>

							<CheckBox label="No" />
							<div className="flex">
								<CheckBox label="Yes, Specify Reason " />
								<UnderlineInput className="w-1/2" />
							</div>
						</div>
						<div className="flex justify-end pr-2">
							<TextInput
								className="w-3/5"
								label="Name of Originating HCI"
								labelClassName="whitespace-pre"
							/>
						</div>
					</div>

					<div className="border-b border-x flex flex-col pb-2 relative">
						<div className="text-xs font-bold px-1 pt-2 flex items-center w-full gap-2 mb-2">
							<span>
								5. Physical Examination on Admission (Pertinent
								Findings per System)
							</span>
						</div>

						<div className="absolute w-[144px] top-2 right-2 border p-1">
							<div className="flex">
								<div className="flex items-center text-sm">
								<label>Height:</label>
								<span className='ml-2 underline'>{appointment?.vitals?.height_for_age}&nbsp;</span>
								</div>
								(cm)
							</div>
							<div className="flex">
								<div className="flex items-center text-sm">
								<label>Weight:</label>
								<span className='ml-2 underline'>{appointment?.vitals?.weight_for_age}&nbsp;</span>
								</div>
								(kg)
							</div>
						</div>
						<div className="flex items-center gap-4 px-2 mb-3">
							<label className="text-xs">General Survey</label>
							<CheckBox
								className="ml-11"
								label="Awake and alert"
							/>
							<CheckBox
								className="ml-11"
								label="Altered sensorium: __________________"
							/>
						</div>

						<div className="flex items-center gap-12 px-2 pb-2">
							<label className="text-xs">Vital Signs:</label>
							<div className="flex items-center text-xs">
								<label>BP:</label>
								<span className='ml-2 underline'>{appointment?.vitals?.blood_systolic}</span>
								<span>/</span>
								<span className='ml-2 underline'>{appointment?.vitals?.blood_diastolic}</span>
							</div>
							<div className="flex items-center text-xs">
								<label>HR:</label>
								<span className='ml-2 underline'>{appointment?.vitals?.heart_rate}</span>
							</div>
							<div className="flex items-center text-xs">
								<label>RR:</label>
								<span className='ml-2 underline'>{appointment?.vitals?.respiratory}</span>
							</div>
							<div className="flex items-center text-xs">
								<label>Temp:</label>
								<span className='ml-2 underline'>{appointment?.vitals?.temperature}</span>
							</div>
						</div>
						<div className="flex mb-3">
							<label className="text-xs min-w-[98px] pl-2">
								HEENT:
							</label>
							<div className="grid grid-cols-4 gap-1 pl-2">
								<RadioInput>
										{[
											{ label: "Anicteric sclerae" },
											].map((option) => (
											<label
												className="flex items-center font-light text-xs gap-1"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={ heent === "Anicteric sclerae"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									<RadioInput>
										{[
											{ label: "Exudates" },
											].map((option) => (
											<label
												className="flex items-center font-light text-xs gap-1"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={ heent === "Exudates"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									<RadioInput>
										{[
											{ label: "Essentially Normal"},
											].map((option) => (
											<label
												className="flex items-center font-light text-xs gap-1"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={ heent === "Essentially Normal"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									<RadioInput>
										{[
											{ label: "Abnormal pupillary reaction"},
											].map((option) => (
											<label
												className="flex items-center font-light text-xs gap-1"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={ heent === "Abnormal pupillary reaction"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									<RadioInput>
										{[
											{ label: "Cervical lympadenopathy"},
											].map((option) => (
											<label
												className="flex items-center font-light text-xs gap-1"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={ heent === "Cervical lympadenopathy"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									<RadioInput>
										{[
											{ label: "Dry mucous membrane"},
											].map((option) => (
											<label
												className="flex items-center font-light text-xs gap-1"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={ heent === "Dry mucous membrane"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									<RadioInput>
										{[
											{ label: "Icteric sclerae"},
											].map((option) => (
											<label
												className="flex items-center font-light text-xs gap-1"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={ heent === "Icteric sclerae"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									<RadioInput>
										{[
											{ label: "Pale conjunctivae"},
											].map((option) => (
											<label
												className="flex items-center font-light text-xs gap-1"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={ heent === "Pale conjunctivae"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									<RadioInput>
										{[
											{ label: "Sunken eyeballs"},
											].map((option) => (
											<label
												className="flex items-center font-light text-xs gap-1"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={ heent === "Sunken eyeballs"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									<RadioInput>
										{[
											{ label: "Sunken fontanelle"},
											].map((option) => (
											<label
												className="flex items-center font-light text-xs gap-1"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={ heent === "Sunken fontanelle"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									<RadioInput>
										{[
											{ label: "Intact tympanic mebrane"},
											].map((option) => (
											<label
												className="flex items-center font-light text-xs gap-1"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={ heent === "Intact tympanic mebrane"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									<RadioInput>
										{[
											{ label: "Pupils brisky reactive to light"},
											].map((option) => (
											<label
												className="flex items-center font-light text-xs gap-1"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={ heent === "Pupils brisky reactive to light"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									<RadioInput>
										{[
											{ label: "Tonsillopharyngeal congestion"},
											].map((option) => (
											<label
												className="flex items-center font-light text-xs gap-1"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={ heent === "Tonsillopharyngeal congestion"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									<RadioInput>
										{[
											{ label: "Hypertropic tonsils"},
											].map((option) => (
											<label
												className="flex items-center font-light text-xs gap-1"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={ heent === "Hypertropic tonsils"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									<RadioInput>
										{[
											{ label: "Alar flaring"},
											].map((option) => (
											<label
												className="flex items-center font-light text-xs gap-1"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={ heent === "Alar flaring"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									<RadioInput>
										{[
											{ label: "Nasal discharge"},
											].map((option) => (
											<label
												className="flex items-center font-light text-xs gap-1"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={ heent === "Nasal discharge"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									<RadioInput>
										{[
											{ label: "Aural discharge"},
											].map((option) => (
											<label
												className="flex items-center font-light text-xs gap-1"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={ heent === "Aural discharge"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>
									<RadioInput>
										{[
											{ label: "Palpable mass"},
											].map((option) => (
											<label
												className="flex items-center font-light text-xs gap-1"
												key={`rdio-${option.value}`}
											>
												<input
												type="checkbox"
												value={option.value}
												id={`irdio-${option.value}`}
												checked={ heent === "Palpable mass"}
												/>
												{option.label}
											</label>
										))}
									</RadioInput>

								
								<TextInput label="Others:" />
							</div>
						</div>
					</div>
				</div>

				<div className="bg-white flex flex-col w-[8.5in] min-h-[13in] ">
					<div className="border-y border-x flex flex-col pb-2 relative">
						<div className="text-xs font-bold px-1 pt-2 flex items-center w-full gap-2 mb-2">
							<span>
								5. Physical Examination on Admission (Pertinent
								Findings per System)
							</span>
						</div>

						<div className="flex mb-3">
							<label className="text-xs min-w-[98px] pl-2">
								CHEST/LUNGS:
							</label>
							<div className="grid grid-cols-4 gap-1 pl-2	 w-full">
								<RadioInput>
									{[
										{ label: "Symmetrical chest expansion"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ chest === "Symmetrical chest expansion"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Lumps over breast(s)"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ chest === "Lumps over breast(s)"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Clear breath sounds"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ chest === "Clear breath sounds"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Retractions"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ chest === "Retractions"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Crackles/rales"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ chest === "Crackles/rales"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Wheezes"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ chest === "Wheezes"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Essentially normal"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ chest === "Essentially normal"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Asymmetrical chest expansion"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ chest === "Asymmetrical chest expansion"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Decreased breath sounds"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ chest === "Decreased breath sounds"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Enlarge Axillary Lymph Nodes"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ chest === "Enlarge Axillary Lymph Nodes"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								
								<div />
								<TextInput label="Others:" />
							</div>
						</div>

						<div className="flex mb-3">
							<label className="text-xs min-w-[98px] pl-2">
								CVS:
							</label>
							<div className="grid grid-cols-4 gap-1 pl-2	 w-full">
								<CheckBox label={`Essentially normal`} />
								<CheckBox label={`Displaced apex beat`} />
								<CheckBox label={`Heaves and/or thrills`} />
								<CheckBox label={`Pericardia! bulge`} />
								<CheckBox label={`Irregular rhythm`} />
								<CheckBox label={`Muffled heart sounds`} />
								<CheckBox label={`Murmur`} />
								<div />
								<TextInput label="Others:" />
							</div>
						</div>

						<div className="flex mb-3">
							<label className="text-xs min-w-[98px] pl-2">
								ABDOMEN:
							</label>
							<div className="grid grid-cols-4 gap-1 pl-2	 w-full">
								<RadioInput>
									{[
										{ label: "Enlarge Prospate"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ abdomen === "Enlarge Prospate"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Hyperactive bowel sounds"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ abdomen === "Hyperactive bowel sounds"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Essentially Normal"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ abdomen === "Essentially Normal"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Hemorrhoids"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ abdomen === "Hemorrhoids"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Mass"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ abdomen === "Mass"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Not Applicable"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ abdomen === "Not Applicable"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "PUS"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ abdomen === "PUS"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<div />
								<TextInput label="Others:" />
							</div>
						</div>

						<div className="flex mb-3">
							<label className="text-xs min-w-[98px] pl-2">
								GU (I E):
							</label>
							<div className="grid grid-cols-4 gap-1 pl-2	 w-full">
								<RadioInput>
									{[
										{ label: "Essentially normal"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ chest === "Essentially normal"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Blood stained in exam finger"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ chest === "Blood stained in exam finger"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Cervical dilatation"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ chest === "Cervical dilatation"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Presence of abnormal discharge"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ chest === "Presence of abnormal discharge"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<TextInput label="Others:" />
							</div>
						</div>

						<div className="flex mb-3">
							<label className="text-xs min-w-[98px] pl-2">
								SKIN / EXTREMITIES:
							</label>
							<div className="grid grid-cols-4 gap-1 pl-2	 w-full">
								<RadioInput>
									{[
										{ label: "Essentially normaln"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ skin === "Essentially normal"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Weak pulses"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ skin === "Weak pulses"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Clubbing"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ skin === "Clubbing"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Cold clammy"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ skin === "Cold clammy"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Cyanosis/mottled skin"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ skin === "Cyanosis/mottled skin"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Edema/swelling"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ skin === "Edema/swelling"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Decreased mobility"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ skin === "Decreased mobility"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Pale nailbeds"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ skin === "Pale nailbeds"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Poor skin turgor"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ skin === "Poor skin turgor"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>
								<RadioInput>
									{[
										{ label: "Rashes/Petechiae"},
										].map((option) => (
										<label
											className="flex items-center font-light text-xs gap-1"
											key={`rdio-${option.value}`}
										>
											<input
											type="checkbox"
											value={option.value}
											id={`irdio-${option.value}`}
											checked={ skin === "Rashes/Petechiae"}
											/>
											{option.label}
										</label>
									))}
								</RadioInput>

								<div />
								<div />
								<TextInput label="Others:" />
							</div>
						</div>

						<div className="flex mb-3">
							<label className="text-xs min-w-[98px] pl-2">
								NEURO·EXAM:
							</label>
							<div className="grid grid-cols-4 gap-1 pl-2	 w-full">
								<CheckBox label={`Essentially normal`} />
								<CheckBox label={`Abnormal gait`} />
								<CheckBox label={`Abnormal position sense`} />
								<CheckBox
									label={`Abnormal/decreased sensation`}
								/>
								<CheckBox label={`Abnormal reflex(es)`} />
								<CheckBox label={`Poor/altered memory`} />
								<CheckBox label={`Poor muscle tone/strength`} />
								<CheckBox label={`Poor coordination`} />
								<div />
								<TextInput label="Others:" />
							</div>
						</div>
					</div>

					<div className="border-b border-x flex items-center justify-center text-xs p-2">
						<b>
							IV. COURSE IN THE WARD (Attach photocopy of
							laboratory/Imaging results)
						</b>
						<CheckBox label="Check box if there is/are additional sheet(s)." />
					</div>

					<div className="border-b border-x flex flex-col pb-2 relative">
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								Date
							</div>
							<div
								className="w-4/5 border-r py-1 text-center px-1 text-xs"
								contentEditable
							>
								DOCTOR'S ORDER/ACTION
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex flex-col">
							<div className="w-full border-r py-1 text-left px-2 pb-0 text-xs">
								SURGICAL PROCEOURE/ RVS CODE (Attach photocopy
								of OR technique):
							</div>
							<UnderlineInput />
						</div>
					</div>

					<div className="border-b border-x flex items-center justify-center gap-2 text-xs p-2">
						<b>V. DRUGS/MEDICINES</b>
						<CheckBox label="Check box if there is/are additional sheet(s)." />
					</div>
					<div className="border-b border-x flex flex-col pb-2 relative">
						<div className="table w-full">
							<table>
								<thead>
									<tr>
										<th>Generic Name</th>
										<th>Quantity/Dosage/Route/Frequency</th>
										<th>Total Cost</th>
									</tr>
								</thead>
								<tbody>
									{appointment?.admissions?.map((item) => {
										return (
											<>
												<tr key={`opri-${item?.id}`}>
													<td>{item?.item?.name}</td>
													<td>{item?.quantity}</td>
													<td>{item?.price}</td>
													
												</tr>
											</>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>

					<div className="border-b border-x flex items-center justify-center text-xs p-2">
						<b>VI . OUTCOME OF TREATMENT</b>
					</div>
					<div className="border-b border-x flex flex-col p-2 gap-4 relative">
						<div className="flex gap-4">
							<RadioInput>
							{[
								{ label: "IMPROVED" },
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
									checked={appointment?.patient_disposition === "Improved"}
									/>
									{option.label}
								</label>
							))}
						</RadioInput>
						<RadioInput>
										{[
											{ label: "RECOVERED" },
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
												checked={appointment?.patient_disposition === "Recovered"}
												/>
												{option.label}
											</label>
										))}
						</RadioInput>
						<RadioInput>
										{[
											{ label: "HAMA/DAMA" },
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
												checked={appointment?.patient_disposition === "Home/Discharged Against Medical Advise"}
												/>
												{option.label}
											</label>
										))}
						</RadioInput>
						<RadioInput>
										{[
											{ label: "EXPIRED" },
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
												checked={appointment?.patient_disposition === "Expired"}
												/>
												{option.label}
											</label>
										))}
						</RadioInput>
						<RadioInput>
										{[
											{ label: "ABSCONDED" },
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
												checked={appointment?.patient_disposition === "Absconded"}
												/>
												{option.label}
											</label>
										))}
						</RadioInput>
						<RadioInput>
										{[
											{ label: "TRANSFERRED" },
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
												checked={appointment?.patient_disposition === "Transferred/Referred"}
												/>
												{option.label}
											</label>
										))}
						</RadioInput>
						</div>
						<TextInput
							label={`Specify reason:`}
							labelClassName="whitespace-pre"
						/>
					</div>
					<div className="border border-black p-1 flex flex-col mt-2">
						<div className="flex items-center gap-1 text-xs">
							Certification of Attending Health Care Professional:
						</div>
						<p className="pl-11 py-6 text-xs text-center font-bold italic">
							I certify that the above information given in this
							form are true and correct
						</p>
						<div className="flex items-center justify-center pb-4 px-2 w-full">
							<UnderlineInput
								className="w-1/2"
								inputClassName="text-center"
								label="Signature over Printed Name of Attending Health Care Professional"
							/>
							<div className="flex items-center gap-2 ml-11 text-sm">
								<span className="text-xs">Date</span>
								<BoxInputGroup
									label="Month"
									labelClassName="italic"
								>
									<BoxInput />
									<BoxInput />
								</BoxInputGroup>
								<b>-</b>
								<BoxInputGroup
									label="Day"
									labelClassName="italic"
								>
									<BoxInput />
									<BoxInput />
								</BoxInputGroup>
								<b>-</b>
								<BoxInputGroup
									label="Year"
									labelClassName="italic"
								>
									<BoxInput />
									<BoxInput />
									<BoxInput />
									<BoxInput />
								</BoxInputGroup>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}

export default ClaimForm4

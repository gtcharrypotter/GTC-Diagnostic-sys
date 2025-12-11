import React, { useEffect, useState } from 'react'
import ActionBtn from '../../../../../components/buttons/ActionBtn';
import FlatIcon from '../../../../../components/FlatIcon';
import { useReactToPrint } from 'react-to-print';
import Axios from '../../../../../libs/axios';
import { useAuth } from '../../../../../hooks/useAuth';
import { formatDateParts } from '../../../../../libs/helpers';
import RadioInput from '../../../../../components/inputs/RadioInput';
/* eslint-disable react/prop-types */
const BoxInput = () => {
	return (
		<>
			<label className="flex items-center border-l last:border-r border-b border-black">
				<input
					type="text"
					className="w-4 p-0 leading-none text-center border-0 !text-xs"
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
					className={` absolute !text-[10px] -bottom-[14px] ${labelClassName}`}
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
	defaultValue,
}) => {
	return (
		<label
			className={`flex flex-col justify-center items-center gap-0 ${className}`}
		>
			<input
				defaultValue={defaultValue}
				type="text"
				className={`w-full font-semibold ${inputClassName}`}
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
				className={`border- border-b-black pl-[2px] w-full ${inputClassName}`}
				style={{ borderWidth: "0px", borderBottom: "1px solid #000" }}
			/>
		</label>
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
const ClaimForm3 = ({patient, appointment}) => {
	const { user, checkUserType } = useAuth();
	const [canPrint, setCanPrint] = useState(false);
	const [downloadUrl, setDownloadUrl] = useState(null);
	const [hciPan, setHciPan] = useState(Array(10).fill(""));
	const [abdomen, setAbdomen] = useState("");
	const [heent, setHeent] = useState("");
	const [genitourinary, setGenitourinary] = useState("");
	const [chest, setChest] = useState("");
	const [skin, setSkin] = useState("");
	const admitted = formatDateParts(appointment?.created_at);
	const discharged = formatDateParts(appointment?.updated_at);
	const componentRef = React.useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	useEffect(() => {
			if (user?.healthUnit?.accreditation_number) {
				setHciPan(user?.healthUnit?.accreditation_number.split("").slice(0, 10));
			}
			}, [user?.healthUnit?.accreditation_number]);
	
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
	console.log("Claim Form 3", appointment)
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
					<div className="flex items-start relative justify-center border-b-4 border-double px-2 min-h-[152px]">
						<img
							className="w-[124px] absolute top-6 left-4 object-contain"
							src="/philhealth.png"
						/>
						<div className="flex flex-col items-end text-center  absolute right-2 top-0">
							<p className="text-sm">
								This form may be reproduced and is NOT FOR SALE
							</p>
							<h1 className="text-5xl font-bold">CF3</h1>
							<h3 className="text-lg font-bold">(Claim Form)</h3>
							<p className="text-sm">revised November 2013</p>
						</div>
					</div>
					<div className="flex items-center relative justify-center border-b-4 border-double">
						<b>PART I - PATIENT'S CLINICAL RECORD</b>
					</div>
					<div className="flex relative px-2 pt-3 pb-2 border-b">
						<ul className="mb-0 text-xs flex flex-col gap-y-2 pr-11">
							<li className="flex items-center">
								<span className="whitespace-nowrap">
									1. PhilHealth Accreditation No. (PAN) -
									Institutional Health Care Provider
								</span>
								<div className="flex items-center ml-4">
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
							<li className="flex flex-col">
								<span>2. Name of Patient</span>
								<div className="flex items-center">
									<UnderlineInput
										inputClassName="text-center pt-1 pb-[2px] hover:bg-slate-200"
										label="Last Name,"
										defaultValue={patient?.lastname}
									/>
									<UnderlineInput
										inputClassName="text-center pt-1 pb-[2px] hover:bg-slate-200"
										label="First Name,"
										defaultValue={patient?.firstname}
									/>
									<UnderlineInput
										inputClassName="text-center pt-1 pb-[2px] hover:bg-slate-200"
										label="Middle Name,"
										defaultValue={patient?.middle}
									/>
									<UnderlineInput
										inputClassName="text-center pt-1 pb-[2px] hover:bg-slate-200"
										label="(example: Dela Cruz, Juan Jr., Sipag)"
										labelClassName="whitespace-pre px-1"
										defaultValue={patient?.suffix}
									/>
								</div>
							</li>
							<li className="flex items-center gap-1">
								<span className="w-[108px]">
									4. Date Admitted:
								</span>
								<div className="flex items-center ml-2">
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
								<span className="ml-6">
									Time Admitted:
								</span>
								<div className="flex items-center ml-2">
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
								<div className="flex items-center">
									<RadioInput>
										{[
											{ label: "AM", value: "AM" },
											{ label: "PM", value: "PM" },
											].map((option) => (
											<label
												className="flex items-center font-light text-sm"
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
							</li>

							<li className="flex items-center pt-3">
								<span className="w-[108px]">
									5. Date Discharged:
								</span>
								<div className="flex items-center ml-3">
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
								<span className="ml-6">Time Discharged: </span>
								<div className="flex items-center ml-1">
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
								<div className="flex items-center ml-1">
									<RadioInput>
										{[
											{ label: "AM", value: "AM" },
											{ label: "PM", value: "PM" },
											].map((option) => (
											<label
												className="flex items-center font-light text-sm"
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
							</li>
						</ul>
						<div className="ml-auto w-[188px] border min-h-[144px] text-xs text-left mt-7">
							<span>
								3. Chief Complaint / Reason for Admission:
							</span>
							<div
								className="h-[100px] p-2 font-semibold"
							>{appointment?.pre_notes}</div>
						</div>
					</div>

					<div
						className="flex relative px-2 pt-3 pb-2 border-b min-h-[188px]"
					>
						<ul className="mb-0 text-sm font-bold flex flex-col gap-y-2 pr-11">
							<li className="flex items-center">
								<span className="font-normal text-xs">
									6. Brief History of Present Illness / OB
									History: &nbsp;
								</span>
							</li>
							<span className='text-xs'>{appointment?.clinical_history}</span>
						</ul>
					</div>

					<div className="flex flex-col relative px-2 pt-3 pb-2 border-b">
						<ul className="mb-0 text-xs flex flex-col gap-y-2 pr-11">
							<li className="flex items-center">
								<span>
									7. Physical Examination ( Pertinent Findings
									per System )
								</span>
							</li>
						</ul>
						<table className="transparent-table text-xs w-full">
							<tr>
								<td className="!py-3">
									<span>General Survey:</span>
								</td>
							</tr>
							<tr>
								<td className="!py-3">
									<span>Vital Signs </span>
								</td>
								<td className="!py-3">:</td>
								<td className="!py-3">
									<div className="flex items-center gap-2 w-[352px]">
										<div className="flex">
											<span className='text-xs'>BP:</span>
											<span className='text-xs'>&nbsp;</span>
											<span className='underline text-xs'>{appointment?.vitals?.blood_systolic}</span>
											<span className='text-xs'>/</span>
											<span className='underline text-xs'>{appointment?.vitals?.blood_diastolic}</span>
										</div>
										<span className='text-xs'>&nbsp;</span>
										<div className="flex">
											<span className='text-xs'>CR:</span>
											<span className='text-xs'>&nbsp;</span>
											<span className='underline text-xs'>{appointment?.vitals?.cholesterol}</span>
										</div>
										<span className='text-xs'>&nbsp;</span>
										<div className="flex">
											<span className='text-xs'>RR:</span>
											<span className='text-xs'>&nbsp;</span>
											<span className='underline text-xs'>{appointment?.vitals?.respiratory}</span>
										</div>
										<span className='text-xs'>&nbsp;</span>
										<div className="flex">
											<span className='text-xs'>Temperature:</span>
											<span className='text-xs'>&nbsp;</span>
											<span className='underline text-xs'>{appointment?.vitals?.temperature}</span>
										</div>
									</div>
								</td>
								<td className="!py-3">Abdomen</td>
								<td className="!py-3">:</td>
								<td
									className="!py-3 w-[144px]"
								>{abdomen}</td>
							</tr>

							<tr>
								<td className="!py-3">
									<span>HEENT </span>
								</td>
								<td className="!py-3">: </td>
								<td className="!py-3" >{heent}</td>
								<td className="!py-3">GU ( IE )</td>
								<td className="!py-3">:</td>
								<td
									className="!py-3 w-[144px]"
								>{genitourinary}</td>
							</tr>

							<tr>
								<td className="!py-3">
									<span>Chest/Lungs</span>
								</td>
								<td className="!py-3">:</td>
								<td className="!py-3" >{chest}</td>
								<td className="!py-3">Skin/Extremities</td>
								<td className="!py-3">:</td>
								<td
									className="!py-3 w-[144px]"
									
								>{skin}</td>
							</tr>

							<tr>
								<td className="!py-3">
									<span>CVS</span>
								</td>
								<td className="!py-3">:</td>
								<td className="!py-3" ></td>
								<td className="!py-3">Neuro Examination </td>
								<td className="!py-3">:</td>
								<td
									className="!py-3 w-[144px]"
									contentEditable
								></td>
							</tr>
						</table>
					</div>

					<div
						className="flex relative px-2 pt-3 pb-2 border-b min-h-[188px]"
						
					>
						<ul className="mb-0 text-sm font-bold flex flex-col gap-y-2 pr-11">
							<li className="flex items-center">
								<span className="text-xs font-normal">
									8. Course in the Wards (attach additional
									sheets if necessary): &nbsp;&nbsp;
								</span>
							</li>
							<span className='text-xs'>{appointment?.referral_notes}</span>
						</ul>
					</div>

					<div
						className="flex relative px-2 pt-3 pb-2 border-b min-h-[188px]"
						contentEditable
					>
						<ul className="mb-0 text-sm font-bold flex flex-col gap-y-2 pr-11">
							<li className="flex items-center">
								<span className="text-xs font-normal">
									9. Pertinent Laboratory and Diagnostic
									Findings: ( CBC, Urinalysis, Fecalysis,
									X-ray, Biopsy, etc. )&nbsp;&nbsp;
								</span>
							</li>
						</ul>
					</div>

					<div className="flex relative px-2 py-6 border-b">
						<ul className="mb-0 text-xs flex  gap-y-2 pr-11">
							<li className="flex items-center gap-6">
								<span>10. Disposition on Discharge:</span>
								<RadioInput>
										{[
											{ label: "Improved" },
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
									<RadioInput>
										{[
											{ label: "Recovered" },
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
									<RadioInput>
										{[
											{ label: "Transferred" },
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
									<RadioInput>
										{[
											{ label: "HAMA" },
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
									<RadioInput>
										{[
											{ label: "Absconded" },
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
									<RadioInput>
										{[
											{ label: "Expired" },
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
							</li>
						</ul>
					</div>
				</div>

				<div className="bg-white flex flex-col w-[8.5in] min-h-[13in] ">
					<div className="flex items-center relative justify-center border-y-4 border-double">
						<b>
							<span className="text-red-500">PART II</span>-
							MATERNITY CARE PACKAGE
						</b>
					</div>

					<div className="flex relative px-2 pt-2 pb-2 border-b text-center justify-center">
						<b className="text-red-500 text-center">
							PRENATAL CONSULTATION
						</b>
					</div>
					<div className="flex relative px-2 pt-3 pb-2 border-b">
						<ul className="mb-0 text-xs flex flex-col gap-y-2 w-full">
							<li className="flex items-center py-3">
								<span className=" text-red-500">
									1. Initial Prenatal Consultation
								</span>
								<div className="flex items-center gap-2 ml-6">
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
							</li>

							<li className="flex flex-col py-1 w-full">
								<span className="">
									<span className=" text-red-500">2.</span>{" "}
									Clinical History and Physical Examination
								</span>
								<div className="flex gap-4 p-2 ">
									<label className="flex items-center min-w-[268px] gap-1">
										<span className="text-red-500">a.</span>
										<span>Vital signs are normal</span>
										<input
											type="checkbox"
											className="ml-auto"
										/>
									</label>
									<div className="flex items-center gap-1 whitespace-pre">
										<span className="text-red-500">c.</span>
										<span>Menstrual History</span>
										LMP
										<div className="flex items-center gap-1 mx-3">
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
										<TextInput label="Age of Menarche" />
									</div>
								</div>

								<div className="flex gap-4 px-2 pt-3 w-full">
									<label className="flex items-center min-w-[268px] gap-1">
										<span className="text-red-500">b.</span>
										<span>
											Ascertain the present Pregnancy is
											low-Risk
										</span>
										<input
											type="checkbox"
											className="ml-auto"
										/>
									</label>
									<div className="flex items-center gap-1 whitespace-pre">
										<span className="text-red-500">d.</span>
										<span> Obstetric History</span>
										<div className="flex items-center gap-1">
											<TextInput
												label="G"
												className="w-[44px] mx-4"
												inputClassName="text-center"
											/>
											<TextInput
												label="P"
												className="w-[44px] mx-2"
												inputClassName="text-center"
											/>
											(
											<UnderlineInput
												label="T"
												className="w-[44px] -mb-[15px]"
												inputClassName="text-center"
											/>
											,
											<UnderlineInput
												label="P"
												className="w-[44px] -mb-[15px]"
												inputClassName="text-center"
											/>
											,
											<UnderlineInput
												label="A"
												className="w-[44px] -mb-[15px]"
												inputClassName="text-center"
											/>
											,
											<UnderlineInput
												label="L"
												className="w-[44px] -mb-[15px]"
												inputClassName="text-center"
											/>
											)
										</div>
									</div>
								</div>
							</li>

							<li className="flex flex-col w-full">
								<span className="">
									<span className=" text-red-500">3.</span>{" "}
									Obstetric risk factors
								</span>
								<div className="grid grid-cols-3 gap-x-11 gap-y-2 px-2 pt-2 w-4/5">
									<label className="flex items-center">
										<span className="mr-auto">
											a. Multiple pregnancy
										</span>
										<input type="checkbox" />
									</label>
									<label className="flex items-center">
										<span className="mr-auto">
											d. Placenta previa
										</span>
										<input type="checkbox" />
									</label>
									<label className="flex items-center">
										<span className="mr-auto">
											g. History of pre-eclampsia
										</span>
										<input type="checkbox" />
									</label>
									<label className="flex items-center">
										<span className="mr-auto">
											b. Ovarian cyst
										</span>
										<input type="checkbox" />
									</label>
									<label className="flex items-center">
										<span className="mr-auto">
											e. History of 3 miscarriages
										</span>
										<input type="checkbox" />
									</label>
									<label className="flex items-center">
										<span className="mr-auto">
											h. History of eclampsia
										</span>
										<input type="checkbox" />
									</label>
									<label className="flex items-center">
										<span className="mr-auto">
											c. Myoma uteri
										</span>
										<input type="checkbox" />
									</label>
									<label className="flex items-center">
										<span className="mr-auto">
											f. History of stillbirth
										</span>
										<input type="checkbox" />
									</label>
									<label className="flex items-center">
										<span className="mr-auto">
											i. Premature contraction
										</span>
										<input type="checkbox" />
									</label>
								</div>
							</li>

							<li className="flex flex-col w-full">
								<span className="">
									<span className=" text-red-500">4.</span>
									Medical/Surgical risk factors
								</span>
								<div className="flex flex-wrap gap-y-2 p-2 px-1">
									<label className="w-[20%] pl-2 flex items-center">
										<span className="mr-auto">
											a. Hypertension
										</span>
										<input
											type="checkbox"
											className="mr-4"
										/>
									</label>
									<label className="w-[24%] pl-2 flex items-center">
										<span className="mr-auto">
											d. Thyroid Disorde
										</span>
										<input
											type="checkbox"
											className="mr-4"
										/>
									</label>
									<label className="w-[22%] pl-2 flex items-center">
										<span className="mr-auto">
											g. Epilepsy
										</span>
										<input
											type="checkbox"
											className="mr-4"
										/>
									</label>
									<label className="w-[30%] pl-2 flex items-center ml-auto">
										<span className="mr-auto whitespace-pre">
											j. History of previous cesarian
											section
										</span>
										<input
											type="checkbox"
											className="mr-4"
										/>
									</label>

									<label className="w-[20%] pl-2 flex items-center">
										<span className="mr-auto">
											b. Heart Disease
										</span>
										<input
											type="checkbox"
											className="mr-4"
										/>
									</label>
									<label className="w-[24%] pl-2 flex items-center">
										<span className="mr-auto">
											e. Obesity
										</span>
										<input
											type="checkbox"
											className="mr-4"
										/>
									</label>
									<label className="w-[22%] pl-2 flex items-center">
										<span className="mr-auto">
											h. Renal disease
										</span>
										<input
											type="checkbox"
											className="mr-4"
										/>
									</label>
									<label className="w-[30%] pl-2 flex items-center ml-auto">
										<span className="mr-auto whitespace-pre">
											k. History of uterine myomectomy
										</span>
										<input
											type="checkbox"
											className="mr-4"
										/>
									</label>

									<label className="w-[20%] pl-2 flex items-center">
										<span className="mr-auto">
											c. Diabetes
										</span>
										<input
											type="checkbox"
											className="mr-4"
										/>
									</label>
									<label className="w-[35%] pl-2 flex items-center">
										<span className="mr-auto">
											f. Moderate to severe asthma
										</span>
										<input
											type="checkbox"
											className="mr-4"
										/>
									</label>
									<label className="w-[22%] pl-2 flex items-center">
										<span className="mr-auto">
											i. Bleeding disorders
										</span>
										<input
											type="checkbox"
											className="mr-4"
										/>
									</label>
								</div>
							</li>

							<li className="flex items-center gap-2 w-full">
								<span className="whitespace-pre">
									<span className=" text-red-500">5.</span>
									Admitting Diagnosis
								</span>
								<UnderlineInput className="w-full" />
							</li>

							<li className="flex flex-col w-full">
								<span className="">
									<span className=" text-red-500">6.</span>
									Delivery Plan
								</span>
								<div className="flex flex-wrap gap-y-2 p-2 px-1">
									<div className="w-[42%] mr-5 pl-2 flex items-center">
										<span className="mr-auto">
											a. Orientation to MCP/Availment of
											Benefits
										</span>
										<div className="flex items-center gap-4 pr-2">
											<CheckBox
												label={`yes`}
												className="flex-col !gap-0 -mb-4"
											/>
											<CheckBox
												label={`no`}
												className="flex-col !gap-0 -mb-4"
											/>
										</div>
									</div>
									<div className="w-[50%] pl-2 flex items-center">
										<span className="mr-4 whitespace-pre">
											b. Expected date of delivery
										</span>

										<div className="flex items-center gap-2 ml-6">
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
							</li>

							<li className="flex flex-col w-full">
								<span className="">
									<span className=" text-red-500">7.</span>
									Follow-up Prenatal Consultation
								</span>
							</li>
							<table className="transparent-table w-full">
								<tr>
									<td className="!px-0">
										<span className="whitespace-pre">
											<span className=" text-red-500">
												a.
											</span>
											Prenatal Consultation No.
										</span>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2">
											<span className="!w-[44px] flex items-center justify-center text-center pt-1 pb-[2px] leading-none border border-black">
												2nd
											</span>
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2">
											<span className="!w-[44px] flex items-center justify-center text-center pt-1 pb-[2px] leading-none border border-black">
												3rd
											</span>
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2">
											<span className="!w-[44px] flex items-center justify-center text-center pt-1 pb-[2px] leading-none border border-black">
												4th
											</span>
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2">
											<span className="!w-[44px] flex items-center justify-center text-center pt-1 pb-[2px] leading-none border border-black">
												5th
											</span>
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2">
											<span className="!w-[44px] flex items-center justify-center text-center pt-1 pb-[2px] leading-none border border-black">
												6th
											</span>
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2">
											<span className="!w-[44px] flex items-center justify-center text-center pt-1 pb-[2px] leading-none border border-black">
												7th
											</span>
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2">
											<span className="!w-[44px] flex items-center justify-center text-center pt-1 pb-[2px] leading-none border border-black">
												8th
											</span>
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2">
											<span className="!w-[44px] flex items-center justify-center text-center pt-1 pb-[2px] leading-none border border-black">
												9th
											</span>
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2">
											<span className="!w-[44px] flex items-center justify-center text-center pt-1 pb-[2px] leading-none border border-black">
												10th
											</span>
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2">
											<span className="!w-[44px] flex items-center justify-center text-center pt-1 pb-[2px] leading-none border border-black">
												11th
											</span>
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2">
											<span className="!w-[44px] flex items-center justify-center text-center pt-1 pb-[2px] leading-none border border-black">
												12th
											</span>
										</div>
									</td>
								</tr>
								<tr>
									<td className="!px-0">
										<span className="whitespace-pre">
											<span className=" text-red-500">
												b.
											</span>
											Date of visit{" "}
											<small className="text-[8px] italic">
												(mm/ dd/ yy)
											</small>
										</span>
									</td>
									<td className="!px-0">
										<BoxInputGroup>
											<BoxInput />
											<BoxInput />
											<BoxInput />
										</BoxInputGroup>
									</td>
									<td className="!px-0">
										<BoxInputGroup>
											<BoxInput />
											<BoxInput />
											<BoxInput />
										</BoxInputGroup>
									</td>
									<td className="!px-0">
										<BoxInputGroup>
											<BoxInput />
											<BoxInput />
											<BoxInput />
										</BoxInputGroup>
									</td>
									<td className="!px-0">
										<BoxInputGroup>
											<BoxInput />
											<BoxInput />
											<BoxInput />
										</BoxInputGroup>
									</td>
									<td className="!px-0">
										<BoxInputGroup>
											<BoxInput />
											<BoxInput />
											<BoxInput />
										</BoxInputGroup>
									</td>
									<td className="!px-0">
										<BoxInputGroup>
											<BoxInput />
											<BoxInput />
											<BoxInput />
										</BoxInputGroup>
									</td>
									<td className="!px-0">
										<BoxInputGroup>
											<BoxInput />
											<BoxInput />
											<BoxInput />
										</BoxInputGroup>
									</td>
									<td className="!px-0">
										<BoxInputGroup>
											<BoxInput />
											<BoxInput />
											<BoxInput />
										</BoxInputGroup>
									</td>
									<td className="!px-0">
										<BoxInputGroup>
											<BoxInput />
											<BoxInput />
											<BoxInput />
										</BoxInputGroup>
									</td>
									<td className="!px-0">
										<BoxInputGroup>
											<BoxInput />
											<BoxInput />
											<BoxInput />
										</BoxInputGroup>
									</td>
									<td className="!px-0">
										<BoxInputGroup>
											<BoxInput />
											<BoxInput />
											<BoxInput />
										</BoxInputGroup>
									</td>
								</tr>

								<tr>
									<td className="!px-0">
										<span className="whitespace-pre">
											<span className=" text-red-500">
												c.
											</span>
											AOG in weeks
										</span>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-2 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
								</tr>

								<tr>
									<td className="!px-0">
										<span className="whitespace-pre">
											<span className=" text-red-500">
												d.
											</span>
											Weight & Vital signs:
										</span>
									</td>
								</tr>
								<tr>
									<td className="!px-0">
										<span className="whitespace-pre pl-4">
											<span className=" text-red-500">
												d.1.
											</span>
											Weight
										</span>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
								</tr>
								<tr>
									<td className="!px-0">
										<span className="whitespace-pre pl-4">
											<span className=" text-red-500">
												d.2.
											</span>
											Cardiac Rate
										</span>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
								</tr>

								<tr>
									<td className="!px-0">
										<span className="whitespace-pre pl-4">
											<span className=" text-red-500">
												d.3.
											</span>
											Respiratory Rate
										</span>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
								</tr>

								<tr>
									<td className="!px-0">
										<span className="whitespace-pre pl-4">
											<span className=" text-red-500">
												d.4.
											</span>
											Blood Pressure
										</span>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
								</tr>

								<tr>
									<td className="!px-0">
										<span className="whitespace-pre pl-4">
											<span className=" text-red-500">
												d.5.
											</span>
											Temperature
										</span>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
									<td className="!px-0">
										<div className="flex items-center justify-center pb-0 mx-auto px-1 pt-[2px]">
											<TextInput inputClassName="!border text-center py-[2px]" />
										</div>
									</td>
								</tr>
							</table>
						</ul>
					</div>

					<div className="flex relative px-2 pt-2 pb-2 border-b text-center justify-center">
						<b className="text-red-500 text-center">
							DELIVERY OUTCOME
						</b>
					</div>
					<div className="flex relative px-2 pt-3 pb-2 border-b">
						<ul className="mb-0 text-xs flex flex-col gap-y-2 w-full">
							<li className="flex items-center py-3">
								<span className=" ">
									<span className="text-red-500">8.</span>
									Date and Time of Delivery
								</span>
								<div className="flex items-center gap-2 ml-11">
									<span>Date</span>
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
								<div className="flex items-center gap-0 ml-6">
									<span>Time</span>
									<BoxInputGroup
										label="hh-mm"
										labelClassName="italic"
									>
										<BoxInput />
										<BoxInput />
									</BoxInputGroup>
									<span className="ml-1 mr-2 mt-2">AM</span>
									<BoxInputGroup
										label="hh-mm"
										labelClassName="italic"
									>
										<BoxInput />
										<BoxInput />
									</BoxInputGroup>
									<span className="ml-1 mt-2">PM</span>
								</div>
							</li>
							<li className="flex items-center py-3 whitespace-pre">
								<span className=" ">
									<span className="text-red-500">9.</span>
									Maternal Outcome:
								</span>
								<UnderlineInput
									label="Obstetric Index "
									className="w-[108px] text-center px-2 -mb-3"
									inputClassName="text-center"
								/>
								<span className=" ">Pregnancy Uterine,</span>
								<div className="flex items-center gap-2 pl-2 w-full">
									<UnderlineInput
										label="AOG by LMP"
										className="w-1/3 -mb-3 !text-center"
										inputClassName="text-center"
									/>
									<UnderlineInput
										label="Manner of Delivery"
										className="w-1/3 -mb-3 text-center"
										inputClassName="text-center"
									/>
									<UnderlineInput
										label="Presentation
										"
										className="w-1/3 -mb-3 text-center"
										inputClassName="text-center"
									/>
								</div>
							</li>

							<li className="flex items-center py-3">
								<span className="whitespace-pre">
									<span className="text-red-500">10.</span>
									Birth Outcome:
								</span>
								<div className="flex items-center gap-2 pl-6 w-full">
									<UnderlineInput
										label="Fetal Outcome"
										className="-mb-3 w-1/4"
										inputClassName="text-center"
									/>
									<UnderlineInput
										label="Sex"
										className="-mb-3 w-1/4"
										inputClassName="text-center"
									/>
									<UnderlineInput
										label="Birth Weight (grm)"
										className="-mb-3 w-1/4"
										inputClassName="text-center"
									/>
									<UnderlineInput
										label="APGAR Score"
										className="-mb-3 w-1/4"
										inputClassName="text-center"
									/>
								</div>
							</li>

							<li className="flex items-center py-3">
								<span className="whitespace-pre">
									<span className="text-red-500">11.</span>
									Scheduled Postpartum follow-up consultation
									1 week after delivery
								</span>

								<div className="flex items-center gap-2 ml-11 text-sm">
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
							</li>

							<li className="flex items-center py-3">
								<span className="whitespace-pre">
									<span className="text-red-500">12.</span>
									Date and Time of Discharge
								</span>

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
								<div className="flex items-center gap-0 ml-4">
									<span className="text-xs mr-2">Time</span>
									<BoxInputGroup
										label="hh-mm"
										labelClassName="italic"
									>
										<BoxInput />
										<BoxInput />
									</BoxInputGroup>
									<span className="mr-2 mt-2">AM</span>
									<BoxInputGroup
										label="hh-mm"
										labelClassName="italic"
									>
										<BoxInput />
										<BoxInput />
									</BoxInputGroup>
									<span className="mt-2">PM</span>
								</div>
							</li>
						</ul>
					</div>

					<div className="flex relative px-2 pt-2 pb-2 border-b text-center justify-center">
						<b className="text-red-500 text-center">
							POSTPARTUM CARE
						</b>
					</div>
					<table className="transparent-table text-xs">
						<tr>
							<td className="w-3/5 text-center"></td>
							<td className="text-center">
								<i className="text-xs">done</i>
							</td>
							<td className="w-2/5 text-center">
								<i className="text-xs">Remarks</i>
							</td>
						</tr>
						<tr>
							<td className="">
								<span className="text-red-500">13.</span>
								Perineal wound care
							</td>
							<td className=" text-center">
								<div className="flex items-center justify-center cursor-pointer">
									<CheckBox />
								</div>
							</td>
							<td className=" text-center">
								<UnderlineInput />
							</td>
						</tr>
						<tr>
							<td className="">
								<span className="text-red-500">14.</span>
								Signs of Maternal Postpartum Complications
							</td>
							<td className=" text-center">
								<div className="flex items-center justify-center pt-1">
									<CheckBox />
								</div>
							</td>
							<td className=" text-center">
								<UnderlineInput />
							</td>
						</tr>
						<tr>
							<td className="">
								<div className="flex flex-col">
									<div>
										<span className="text-red-500">
											15.
										</span>
										Counselling and Education
									</div>
									<span className="pl-4 text-[10px] mt-1">
										a. Breastfeeding and Nutrition
									</span>
									<span className="pl-4 text-[10px] mt-1">
										b. Family Planning
									</span>
								</div>
							</td>
							<td className=" text-center">
								<div className="flex items-center justify-center pt-2 mt-2">
									<CheckBox />
								</div>
								<div className="flex items-center justify-center pt-1">
									<CheckBox />
								</div>
							</td>
							<td className=" text-center">
								<UnderlineInput className="pt-2" />
								<UnderlineInput className="pt-1" />
							</td>
						</tr>

						<tr>
							<td className="">
								<span className="text-red-500">16.</span>
								Provided family planning service to patient (as
								requested by patient)
							</td>
							<td className=" text-center">
								<div className="flex items-center justify-center pt-1">
									<CheckBox />
								</div>
							</td>
							<td className=" text-center">
								<UnderlineInput />
							</td>
						</tr>
						<tr>
							<td className="">
								<span className="text-red-500">17.</span>
								Referred to partner physician for Voluntary
								Surgical Sterilization{" "}
								<span className="text-[8px]">
									(as requested by pt.)
								</span>
							</td>
							<td className=" text-center">
								<div className="flex items-center justify-center pt-1">
									<CheckBox />
								</div>
							</td>
							<td className=" text-center">
								<UnderlineInput />
							</td>
						</tr>
						<tr>
							<td className="">
								<span className="text-red-500">18.</span>
								Schedule the next postpartum follow-up
							</td>
							<td className=" text-center">
								<div className="flex items-center justify-center pt-1">
									<CheckBox />
								</div>
							</td>
							<td className=" text-center">
								<UnderlineInput />
							</td>
						</tr>
					</table>

					<div className="border border-black p-1 flex flex-col mt-2">
						<div className="flex items-center gap-1 text-xs">
							<span className="text-red-500">19.</span>
							Certification of Attending Physician/Midwife:
						</div>
						<p className="pl-11 py-6 text-xs font-bold italic">
							I certify that the above information given in this
							form are true and correct
						</p>
						<div className="flex items-center pb-4 px-2 w-full">
							<UnderlineInput
								className="w-1/2"
								inputClassName="text-center"
								label="Signature Over Printed Name of Attending Physician/Midwife"
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

export default ClaimForm3

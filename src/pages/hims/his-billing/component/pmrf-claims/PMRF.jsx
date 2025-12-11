import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import Axios from '../../../../../libs/axios';
import ActionBtn from '../../../../../components/buttons/ActionBtn';
import FlatIcon from '../../../../../components/FlatIcon';
import { dateMMDDYYYY, formatCurrency, formatDateMMDDYYYY, formatDateYYYYMMDD, getBirthDayYYYYMMDD, getStringArray, patientFullName } from '../../../../../libs/helpers';
import useNoBugUseEffect from '../../../../../hooks/useNoBugUseEffect';
import { useForm } from 'react-hook-form';
/* eslint-disable react/prop-types */
const BoxInput = ({
	className = "",
	defaultValue = "",
	inputClassName = "",
	...rest
}) => {
	return (
		<>
			<label
				className={`flex items-center border-l last:border-r border-b border-black ${className}`}
			>
				<input
					defaultValue={defaultValue}
					type="text"
					className={`w-4 p-0 leading-none text-center border-0 !text-xs h-3 ${inputClassName}`}
					maxLength={1}
					{...rest}
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
					className={` absolute !text-[8px] -bottom-3 ${labelClassName}`}
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
				className={` uppercase w-full ${inputClassName}`}
				style={{ borderWidth: "0px", borderBottom: "1px solid #000" }}
			/>
			<label className={`!text-[10px] ${labelClassName}`}>{label}</label>
		</label>
	);
};
const RowInput = ({
	label,
	subLabel,
	className = "",
	labelClassName = "",
	inputClassName = "",
	defaultValue,
	...rest
}) => {
	return (
		<div className={`flex flex-col w-full ${className}`}>
			{label && (
				<span
					className={`font-bold text-left w-full text-[8px] mb-[2px] ${labelClassName}`}
				>
					{label}
				</span>
			)}
			<input
				className={`flex border uppercase pl-1 h-5 ${inputClassName}`}
				defaultValue={defaultValue}
				{...rest}
			/>
			{subLabel && (
				<span className="font-bold text-left w-full text-[6px] mt-[2px] mb-[2px]">
					{subLabel}
				</span>
			)}
		</div>
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
				className={`uppercase w-full ${inputClassName}`}
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
	...rest
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
				{...rest}
			/>
			{label}
		</label>
	);
};
const PMRF = ({ patient, refresh, printPage }) => {
    const { register, setValue, watch, getValues, handleSubmit } = useForm({
		defaultValues: {
			avatar: "",
			prefix: "",
			suffix: "",
			firstname: "",
			lastname: "",
			middlename: "",
			gender: "",
			birthdate: "",
			birthplace: "",
			barangay: "",
			city: "",
			civil_status: "",
			philhealth: "",
			religion: "",
			mother_firstname: "",
			mother_lastname: "",
			mother_middlename: "",
			country: "",
			region: "",
			province: "",
			municipality: "",
			zip_code: "",
			street: "",
			floor: "",
			subdivision: "",
			house_number: "",
			purok: "",
			mobile: "",
			lat: "",
			lng: "",
			tin: "",
			unit: "",
			profession: "",
			salary: "",
			direct_contributor: "",
			indirect_contributor: "",
			spouse_lastname: "",
			spouse_firstname: "",
			spouse_suffix: "",
			spouse_middlename: "",
			mailing_unit: "",
			mailing_building: "",
			mailing_house_number: "",
			mailing_street: "",
			mailing_subdivision: "",
			mailing_barangay: "",
			mailing_municipality: "",
			mailing_city: "",
			mailing_province: "",
			mailing_zip_code: "",
		},
	});
	const [loading, setLoading] = useState(false);
	const [dependents, setDependents] = useState([]);
	const [blanks, setBlanks] = useState([]);
	const [PHICNo, setPHICNo] = useState("");
	const [PHILSYS, setPHILSYS] = useState("");
	const [TIN, setTIN] = useState("");
	const componentRef = useRef(null);
	const [sigUrl, setSigUrl] = useState("");

	const handleChange = (
		prevText,
		value,
		targetIndex = 0,
		setter,
		groupClassName = "phic-input"
	) => {
		console.log("prevText", prevText, value, targetIndex);
		const textArray = prevText.split("");
		textArray[targetIndex] = value;
		setter(textArray.join(""));
		const nextInput =
			document.getElementsByClassName(groupClassName)[targetIndex + 1];
		const prevInput =
			document.getElementsByClassName(groupClassName)[
				targetIndex == 0 ? targetIndex : targetIndex - 1
			];
		if (value?.length > 0) {
			if (nextInput) {
				nextInput.focus();
			}
		} else {
			if (prevInput) {
				prevInput.focus();
			}
		}
	};

	useNoBugUseEffect({
		functions: () => {
			setTimeout(() => {
				setDependents(patient?.dependents);
				setBlanks(new Array(4 - patient?.dependents?.length).fill(1));

				setValue("firstname", patient?.firstname);
				setValue("lastname", patient?.lastname);
				setValue("middlename", patient?.middle || patient?.middlename);
				setValue("prefix", patient?.suffix);
				setValue(
					"birthdate",
					formatDateYYYYMMDD(new Date(patient?.birthday))
				);

				setValue("mother_lastname", patient?.mother_lastname);
				setValue("mother_firstname", patient?.mother_firstname);
				setValue("mother_suffix", patient?.mother_suffix);
				setValue("mother_middlename", patient?.mother_middlename);

				setValue("spouse_lastname", patient?.spouse_lastname);
				setValue("spouse_firstname", patient?.spouse_firstname);
				setValue("spouse_suffix", patient?.spouse_suffix);
				setValue("spouse_middlename", patient?.spouse_middlename);

				setValue(
					"civil_status",
					patient?.civil_status ||
						patient?.information?.marital_status
				);

				setValue("gender", patient?.gender);
				setValue("citizenship", patient?.citizenship);

				setValue("telephone", patient?.telephone);
				setValue("mobile", patient?.mobile);
				setValue("email", patient?.email);

				setValue("birthplace", patient?.birthplace);

				setValue("unit", patient?.unit || patient?.floor);
				setValue("building", patient?.building);
				setValue("house_number", patient?.house_number);
				setValue("street", patient?.street);
				setValue("subdivision", patient?.subdivision);
				setValue("barangay", patient?.barangay);
				setValue("municipality", patient?.municipality);
				setValue("city", patient?.municipality);
				setValue("province", patient?.province);
				setValue("zip_code", patient?.zip_code);

				setValue("mailing_unit", patient?.unit || patient?.floor);
				setValue("mailing_building", patient?.building);
				setValue("mailing_house_number", patient?.house_number);
				setValue("mailing_street", patient?.street);
				setValue("mailing_subdivision", patient?.subdivision);
				setValue("mailing_barangay", patient?.barangay);
				setValue("mailing_municipality", patient?.municipality);
				setValue("mailing_city", patient?.municipality);
				setValue("mailing_province", patient?.province);
				setValue("mailing_zip_code", patient?.zip_code);

				setValue("direct_contributor", patient?.direct_contributor);
				setValue("indirect_contributor", patient?.indirect_contributor);

				setValue("salary", formatCurrency(patient?.salary || 0));
				setValue("profession", patient?.profession);
			}, 300);
		},
		params: [patient],
	});
	useNoBugUseEffect({
		functions: () => {
			// imglyRemoveBackground().then((blob) => {
			// 	// The result is a blob encoded as PNG. It can be converted to an URL to be used as HTMLImage.src
			// 	const url = URL.createObjectURL(blob);
			// 	console.log("urlurlurlurlurl", url);
			// 	setSigUrl(url);
			// });
		},
		params: [patient?.signature],
	});
	useEffect(() => {
		setValue("philhealth", PHICNo);
	}, [PHICNo]);

	useEffect(() => {
		setValue("philsys", PHILSYS);
	}, [PHILSYS]);

	useEffect(() => {
		setValue("tin", TIN);
	}, [TIN]);

	const submit = (data) => {
		if (data?.philhealth?.length == 0) {
			toast.error("PHILHEALTH Member ID Reqired!");
			return;
		}
		setLoading(true);
		let formData = new FormData();
		Object.keys(data).map((key) => {
			formData.append(key, data[key]);
		});
		formData.append("_method", "PATCH");
		Axios.post(`v1/save-patient-pmrf/${patient?.id}`, formData).then(
			(res) => {
				// printPage();

				handlePrint(null, () => contentToPrint.current);
				setTimeout(() => {
					setLoading(false);
					toast.success("Patient PMRF saved successfully!");
					// refresh();
				}, 300);
			}
		);
	};
	const contentToPrint = useRef(null);
	const handlePrint = useReactToPrint({
		// documentTitle: "Print This Document",
		// onBeforePrint: () => console.log("before printing..."),
		// onAfterPrint: () => console.log("after printing..."),
		// removeAfterPrint: true,
		content: () => componentRef.current,
	});
  return (
    <div className="bg-gray-600 p-11 min-h-[14in]  overflow-auto phic-forms">
        
			<ActionBtn
				type="danger"
				className="ml-auto mr-5 mb-5 py-4 !text-lg"
				size="md"
				loading={loading}
				onClick={handlePrint}
			>
				<FlatIcon icon="rr-print" className="text-white mr-1" /> Save
				and Print
			</ActionBtn>
			<div
				className="bg-white p-[0.5in]  flex flex-col w-[9.5in] gap-y-6 mx-auto flex-wrap"
				id="phic-form-printable"
				ref={componentRef}
			>
				<div className="bg-white flex flex-col w-[8.5in] h-[13in] border break-after-page">
					<div className="flex items-center p-1">
						<div className="flex flex-col mr-auto w-3/5">
							<img
								src="/philhealth-2.png"
								className="w-[144px]"
							/>

							<u className="font-bold text-xs mb-1">REMINDERS:</u>
							<ol className="text-xs">
								<li>
									1.Your PhilHealth Identification Number
									(PIN) is your unique and permanent number.
								</li>
								<li>
									2.Always use your PIN in all transactions
									with PhilHealth.
								</li>
								<li>
									3.For Updating/Amendment check the
									appropriate box and provide details to be
									accomplished and submit corresponding
									supporting documents.
								</li>
								<li>
									4. Please read instructions at the back
									before filling-out this form.
								</li>
							</ol>
						</div>
						<div className="flex flex-col items-center justify-center ">
							<h3 className="text-3xl font-bold">PMRF</h3>
							<b className="text-xs">
								PHILHEALTH MEMBER REGISTRATION FORM
							</b>
							<small className="text-xs font-bold">
								UHC v.1 January 2020
							</small>

							<div className="flex items-center justify-center">
								<input
									className="phic-input border-l border-r-0 text-center uppercase border-y w-5 h-5 p-0 text-xs"
									maxLength={1}
									onChange={(e) => {
										handleChange(
											PHICNo,
											e.target.value,
											0,
											setPHICNo
										);
									}}
								/>
								<input
									className="phic-input border-l border-r-0 text-center uppercase border-y w-5 h-5 p-0 text-xs"
									maxLength={1}
									onChange={(e) => {
										handleChange(
											PHICNo,
											e.target.value,
											1,
											setPHICNo
										);
									}}
								/>
								<input
									className="phic-input border-l border-r-0 text-center uppercase border-y w-5 h-5 p-0 text-xs"
									maxLength={1}
									onChange={(e) => {
										handleChange(
											PHICNo,
											e.target.value,
											2,
											setPHICNo
										);
									}}
								/>
								<input
									className="phic-input border-x text-center uppercase border-y w-5 h-5 p-0 text-xs mr-1"
									maxLength={1}
									onChange={(e) => {
										handleChange(
											PHICNo,
											e.target.value,
											3,
											setPHICNo
										);
									}}
								/>

								<input
									className="phic-input border-l text-center uppercase border-y w-5 h-5 p-0 text-xs"
									maxLength={1}
									onChange={(e) => {
										handleChange(
											PHICNo,
											e.target.value,
											4,
											setPHICNo
										);
									}}
								/>
								<input
									className="phic-input border-l text-center uppercase border-y w-5 h-5 p-0 text-xs"
									maxLength={1}
									onChange={(e) => {
										handleChange(
											PHICNo,
											e.target.value,
											5,
											setPHICNo
										);
									}}
								/>
								<input
									className="phic-input border-l text-center uppercase border-y w-5 h-5 p-0 text-xs"
									maxLength={1}
									onChange={(e) => {
										handleChange(
											PHICNo,
											e.target.value,
											6,
											setPHICNo
										);
									}}
								/>
								<input
									className="phic-input border-x text-center uppercase border-y w-5 h-5 p-0 text-xs mr-1"
									maxLength={1}
									onChange={(e) => {
										handleChange(
											PHICNo,
											e.target.value,
											7,
											setPHICNo
										);
									}}
								/>

								<input
									className="phic-input border-l text-center uppercase border-y w-5 h-5 p-0 text-xs"
									maxLength={1}
									onChange={(e) => {
										handleChange(
											PHICNo,
											e.target.value,
											8,
											setPHICNo
										);
									}}
								/>
								<input
									className="phic-input border-l text-center uppercase border-y w-5 h-5 p-0 text-xs"
									maxLength={1}
									onChange={(e) => {
										handleChange(
											PHICNo,
											e.target.value,
											9,
											setPHICNo
										);
									}}
								/>
								<input
									className="phic-input border-l text-center uppercase border-y w-5 h-5 p-0 text-xs"
									maxLength={1}
									onChange={(e) => {
										handleChange(
											PHICNo,
											e.target.value,
											10,
											setPHICNo
										);
									}}
								/>
								<input
									className="phic-input border-x text-center uppercase border-y w-5 h-5 p-0 text-xs"
									maxLength={1}
									onChange={(e) => {
										handleChange(
											PHICNo,
											e.target.value,
											11,
											setPHICNo
										);
									}}
								/>
							</div>

							<small className="text-[8px] font-bold">
								PHILHEALTH IDENTIFICATION NUMBER (PIN)
							</small>
							<div className="flex flex-col">
								<span className="font-bold text-xs pt-2">
									PURPOSE:
								</span>
								<div className="flex gap-4">
									<CheckBox
										label={`REGISTRATION`}
										checked="checked"
									/>
									<CheckBox label={`UPDATING/AMENDMENT`} />
								</div>
							</div>
							<div className="flex flex-col w-full">
								<span className="font-bold text-left w-full text-[8px] pt-2 mb-[2px]">
									Preferred KonSulTa Provider
								</span>
								<div className="flex border p-2 uppercase"></div>
							</div>
						</div>
					</div>
					<div className="flex items-center border-y p-1 justify-center bg-[#dbe2c6]">
						<b className="text-sm">I. PERSONAL DETAILS</b>
					</div>
					<div className="border-y">
						<table className="bordered-table text-xs w-full">
							<tr>
								<th rowSpan={2} className="w-[128px]"></th>
								<th rowSpan={2}>LAST NAME</th>
								<th rowSpan={2}>FIRST NAME</th>
								<th rowSpan={2} className="w-[62px]">
									<div className="text-center text-[8px]">
										NAME
										<br />
										EXTENSION
										<br />
										(Jr./Sr./III)
									</div>
								</th>
								<th rowSpan={2}>MIDDLE NAME</th>
								<th className="w-[44px]">
									<div className="text-center text-[8px]">
										NO
										<br />
										MIDDLE
										<br />
										NAME
									</div>
								</th>
								<th className="w-[44px] text-[8px]">MONONYM</th>
							</tr>
							<tr>
								<th colSpan={2} className=" text-[7px]">
									(Check if applicable only)
								</th>
							</tr>
							<tr>
								<th className="h-[32px] text-left">MEMBER</th>
								<td className="text-left uppercase relative">
									<input
										className="bg-white absolute left-0 top-0 w-full h-full border-none focus:ring-2 p-[2px]"
										{...register("lastname")}
									/>
								</td>
								<td className="text-left uppercase relative">
									<input
										className="bg-white absolute left-0 top-0 w-full h-full border-none focus:ring-2 p-[2px]"
										{...register("firstname")}
									/>
								</td>
								<td className="text-left uppercase relative">
									<input
										className="bg-white absolute left-0 top-0 w-full h-full border-none focus:ring-2 p-[2px]"
										{...register("prefix")}
									/>
								</td>
								<td className="text-left uppercase relative">
									<input
										className="bg-white absolute left-0 top-0 w-full h-full border-none focus:ring-2 p-[2px]"
										{...register("middlename")}
									/>
								</td>
								<td>
									<div className=" uppercase flex items-center justify-center">
										<CheckBox
											key={`chkbx-pmid-${watch(
												"middlename"
											)}`}
											checked={
												watch("middlename")?.length == 0
													? "checked"
													: ""
											}
										/>
									</div>
								</td>
								<td className="">
									<div className=" uppercase flex items-center justify-center">
										<CheckBox
											key={`chkbx-mononym-${watch(
												"firstname"
											)}`}
											checked={
												watch("lastname")?.length ==
													0 &&
												watch("firstname").length > 0
													? "checked"
													: ""
											}
										/>
									</div>
								</td>
							</tr>
							<tr>
								<th className="h-[32px] text-left">
									MOTHER’s <br /> MAIDEN NAME
								</th>
								<td className="text-left uppercase relative">
									<input
										className="bg-white absolute left-0 top-0 w-full h-full border-none focus:ring-2 p-[2px]"
										{...register("mother_lastname")}
									/>
								</td>
								<td className="text-left uppercase relative">
									<input
										className="bg-white absolute left-0 top-0 w-full h-full border-none focus:ring-2 p-[2px]"
										{...register("mother_firstname")}
									/>
								</td>
								<td className="text-left uppercase relative">
									<input
										className="bg-white absolute left-0 top-0 w-full h-full border-none focus:ring-2 p-[2px]"
										{...register("mother_suffix")}
									/>
								</td>
								<td className="text-left uppercase relative">
									<input
										className="bg-white absolute left-0 top-0 w-full h-full border-none focus:ring-2 p-[2px]"
										{...register("mother_middlename")}
									/>
								</td>
								<td>
									<div className="flex items-center justify-center">
										<CheckBox
											key={`chkbx-mmid-${watch(
												"mother_middlename"
											)}`}
											checked={
												watch("mother_middlename")
													?.length == 0
													? "checked"
													: ""
											}
										/>
									</div>
								</td>
								<td className="">
									<div className="flex items-center justify-center">
										<CheckBox
											key={`chkbx-mononym-${watch(
												"mother_firstname"
											)}`}
											checked={
												watch("mother_lastname")
													?.length == 0 &&
												watch("mother_firstname")
													.length > 0
													? "checked"
													: ""
											}
										/>
									</div>
								</td>
							</tr>
							<tr>
								<th className="h-[32px] text-left">
									SPOUSE <br />
									<small className="text-[8px]">
										(If Married)
									</small>
								</th>
								<td className="text-left uppercase relative">
									<input
										className="bg-white absolute left-0 top-0 w-full h-full border-none focus:ring-2 p-[2px]"
										{...register("spouse_lastname")}
									/>
								</td>
								<td className="text-left uppercase relative">
									<input
										className="bg-white absolute left-0 top-0 w-full h-full border-none focus:ring-2 p-[2px]"
										{...register("spouse_firstname")}
									/>
								</td>
								<td className="text-left uppercase relative">
									<input
										className="bg-white absolute left-0 top-0 w-full h-full border-none focus:ring-2 p-[2px]"
										{...register("spouse_suffix")}
									/>
								</td>
								<td className="text-left uppercase relative">
									<input
										className="bg-white absolute left-0 top-0 w-full h-full border-none focus:ring-2 p-[2px]"
										{...register("spouse_middlename")}
									/>
								</td>
								<td className=" uppercase">
									<div className="flex items-center justify-center">
										<CheckBox
											key={`chkbx-spmid-${watch(
												"spouse_middlename"
											)}`}
											checked={
												watch("spouse_middlename")
													?.length == 0
													? "checked"
													: ""
											}
										/>
									</div>
								</td>
								<td className="">
									<div className="flex items-center justify-center">
										<CheckBox
											key={`chkbx-smononym-${watch(
												"spouse_firstname"
											)}`}
											checked={
												watch("spouse_lastname")
													?.length == 0 &&
												watch("spouse_firstname")
													.length > 0
													? "checked"
													: ""
											}
										/>
									</div>
								</td>
							</tr>
						</table>
						<table className="bordered-table text-xs w-full">
							<tr>
								<td colSpan={2}>
									<div className="flex flex-col pb-3 px-1 pt-1 relative">
										<b className="text-xs">DATE OF BIRTH</b>
										<input
											type="date"
											id="date-picker-bday"
											className="absolute top-0 left-0 w-full h-full z-10 opacity-0"
											onClick={() => {
												document
													.getElementById(
														"date-picker-bday"
													)
													.showPicker();
											}}
											onChange={(e) => {
												setValue(
													"birthdate",
													e.target.value
												);
											}}
										/>
										<div className="flex items-center">
											<BoxInputGroup label="m">
												<BoxInput
													defaultValue={
														getBirthDayYYYYMMDD(
															getValues(
																"birthdate"
															)
														)[4]
													}
													className="border"
													inputClassName="w-3 h-5"
												/>
											</BoxInputGroup>
											<BoxInputGroup
												label="m"
												className="mr-1"
											>
												<BoxInput
													defaultValue={
														getBirthDayYYYYMMDD(
															getValues(
																"birthdate"
															)
														)[5]
													}
													className="border"
													inputClassName="w-3 h-5"
												/>
											</BoxInputGroup>
											<BoxInputGroup label="d">
												<BoxInput
													defaultValue={
														getBirthDayYYYYMMDD(
															getValues(
																"birthdate"
															)
														)[6]
													}
													className="border"
													inputClassName="w-3 h-5"
												/>
											</BoxInputGroup>
											<BoxInputGroup
												label="d"
												className="mr-1"
											>
												<BoxInput
													defaultValue={
														getBirthDayYYYYMMDD(
															getValues(
																"birthdate"
															)
														)[7]
													}
													className="border"
													inputClassName="w-3 h-5"
												/>
											</BoxInputGroup>
											<BoxInputGroup label="y">
												<BoxInput
													defaultValue={
														getBirthDayYYYYMMDD(
															getValues(
																"birthdate"
															)
														)[0]
													}
													className="border"
													inputClassName="w-3 h-5"
												/>
											</BoxInputGroup>
											<BoxInputGroup label="y">
												<BoxInput
													defaultValue={
														getBirthDayYYYYMMDD(
															getValues(
																"birthdate"
															)
														)[1]
													}
													className="border"
													inputClassName="w-3 h-5"
												/>
											</BoxInputGroup>
											<BoxInputGroup label="y">
												<BoxInput
													defaultValue={
														getBirthDayYYYYMMDD(
															getValues(
																"birthdate"
															)
														)[2]
													}
													className="border"
													inputClassName="w-3 h-5"
												/>
											</BoxInputGroup>
											<BoxInputGroup label="y">
												<BoxInput
													defaultValue={
														getBirthDayYYYYMMDD(
															getValues(
																"birthdate"
															)
														)[3]
													}
													className="border"
													inputClassName="w-3 h-5"
												/>
											</BoxInputGroup>
										</div>
									</div>
								</td>
								<td className="relative">
									<div className="flex flex-col px-1 pb-0">
										<div className="mb-0">
											<b className="text-xs  mr-1">
												PLACE OF BIRTH
											</b>
											<span className="text-[8px] font-bold">
												(City/Municipality/Province/Country)
											</span>
										</div>
										<span className="text-[8px] font-bold">
											(Please indicate country if born
											outside the Philippines)
										</span>
										<input
											className="bg-white h-8 w-full border-none focus:ring-2 p-[2px]"
											placeholder="Enter birthplace..."
											{...register("birthplace")}
										/>
									</div>
								</td>
								<td rowSpan={2}>
									<div className="flex flex-col p-1 gap-3">
										<div className="flex flex-col">
											<b className="text-xs">
												PHILSYS ID NUMBER
												<small className="">
													(Optional)
												</small>
											</b>
											<div className="flex items-center">
												<BoxInput
													className="border"
													inputClassName="philsys-input w-3 h-5"
													defaultValue={getStringArray(
														patient?.information
															?.philsys[0]
													)}
													onChange={(e) => {
														handleChange(
															PHILSYS,
															e.target.value,
															0,
															setPHILSYS,
															"philsys-input"
														);
													}}
												/>
												<BoxInput
													className="border"
													inputClassName="philsys-input w-3 h-5"
													defaultValue={getStringArray(
														patient?.information
															?.philsys[1]
													)}
													onChange={(e) => {
														handleChange(
															PHILSYS,
															e.target.value,
															1,
															setPHILSYS,
															"philsys-input"
														);
													}}
												/>
												<BoxInput
													className="border"
													inputClassName="philsys-input w-3 h-5"
													defaultValue={getStringArray(
														patient?.information
															?.philsys[2]
													)}
													onChange={(e) => {
														handleChange(
															PHILSYS,
															e.target.value,
															2,
															setPHILSYS,
															"philsys-input"
														);
													}}
												/>
												<BoxInput
													className="border mr-1"
													inputClassName="philsys-input w-3 h-5"
													defaultValue={getStringArray(
														patient?.information
															?.philsys[3]
													)}
													onChange={(e) => {
														handleChange(
															PHILSYS,
															e.target.value,
															3,
															setPHILSYS,
															"philsys-input"
														);
													}}
												/>
												<BoxInput
													className="border"
													inputClassName="philsys-input w-3 h-5"
													defaultValue={getStringArray(
														patient?.information
															?.philsys[5]
													)}
													onChange={(e) => {
														handleChange(
															PHILSYS,
															e.target.value,
															4,
															setPHILSYS,
															"philsys-input"
														);
													}}
												/>
												<BoxInput
													className="border"
													inputClassName="philsys-input w-3 h-5"
													defaultValue={getStringArray(
														patient?.information
															?.philsys[6]
													)}
													onChange={(e) => {
														handleChange(
															PHILSYS,
															e.target.value,
															5,
															setPHILSYS,
															"philsys-input"
														);
													}}
												/>
												<BoxInput
													className="border"
													inputClassName="philsys-input w-3 h-5"
													defaultValue={getStringArray(
														patient?.information
															?.philsys[7]
													)}
													onChange={(e) => {
														handleChange(
															PHILSYS,
															e.target.value,
															6,
															setPHILSYS,
															"philsys-input"
														);
													}}
												/>
												<BoxInput
													className="border mr-1"
													inputClassName="philsys-input w-3 h-5"
													defaultValue={getStringArray(
														patient?.information
															?.philsys[8]
													)}
													onChange={(e) => {
														handleChange(
															PHILSYS,
															e.target.value,
															7,
															setPHILSYS,
															"philsys-input"
														);
													}}
												/>
												<BoxInput
													className="border"
													inputClassName="philsys-input w-3 h-5"
													defaultValue={getStringArray(
														patient?.information
															?.philsys[10]
													)}
													onChange={(e) => {
														handleChange(
															PHILSYS,
															e.target.value,
															8,
															setPHILSYS,
															"philsys-input"
														);
													}}
												/>
												<BoxInput
													className="border"
													inputClassName="philsys-input w-3 h-5"
													defaultValue={getStringArray(
														patient?.information
															?.philsys[11]
													)}
													onChange={(e) => {
														handleChange(
															PHILSYS,
															e.target.value,
															9,
															setPHILSYS,
															"philsys-input"
														);
													}}
												/>
												<BoxInput
													className="border"
													inputClassName="philsys-input w-3 h-5"
													defaultValue={getStringArray(
														patient?.information
															?.philsys[12]
													)}
													onChange={(e) => {
														handleChange(
															PHILSYS,
															e.target.value,
															10,
															setPHILSYS,
															"philsys-input"
														);
													}}
												/>
												<BoxInput
													className="border mr-1"
													inputClassName="philsys-input w-3 h-5"
													defaultValue={getStringArray(
														patient?.information
															?.philsys[13]
													)}
													onChange={(e) => {
														handleChange(
															PHILSYS,
															e.target.value,
															11,
															setPHILSYS,
															"philsys-input"
														);
													}}
												/>
												<BoxInput
													className="border"
													inputClassName="philsys-input w-3 h-5"
													defaultValue={getStringArray(
														patient?.information
															?.philsys[15]
													)}
													onChange={(e) => {
														handleChange(
															PHILSYS,
															e.target.value,
															12,
															setPHILSYS,
															"philsys-input"
														);
													}}
												/>
												<BoxInput
													className="border"
													inputClassName="philsys-input w-3 h-5"
													defaultValue={getStringArray(
														patient?.information
															?.philsys[16]
													)}
													onChange={(e) => {
														handleChange(
															PHILSYS,
															e.target.value,
															13,
															setPHILSYS,
															"philsys-input"
														);
													}}
												/>
												<BoxInput
													className="border"
													inputClassName="philsys-input w-3 h-5"
													defaultValue={getStringArray(
														patient?.information
															?.philsys[17]
													)}
													onChange={(e) => {
														handleChange(
															PHILSYS,
															e.target.value,
															14,
															setPHILSYS,
															"philsys-input"
														);
													}}
												/>
												<BoxInput
													className="border"
													inputClassName="philsys-input w-3 h-5"
													defaultValue={getStringArray(
														patient?.information
															?.philsys[18]
													)}
													onChange={(e) => {
														handleChange(
															PHILSYS,
															e.target.value,
															15,
															setPHILSYS,
															"philsys-input"
														);
													}}
												/>
											</div>
										</div>
										<div className="flex flex-col">
											<b className="text-xs">
												TAX PAYER IDENTIFICATION NUMBER
												<small className="">
													(TIN) (Optional)
												</small>
											</b>
											<div className="flex items-center">
												<BoxInput
													className="border"
													inputClassName="w-3 h-5 tin-input"
													onChange={(e) => {
														handleChange(
															TIN,
															e.target.value,
															0,
															setTIN,
															"tin-input"
														);
													}}
												/>
												<BoxInput
													className="border"
													inputClassName="w-3 h-5 tin-input"
													onChange={(e) => {
														handleChange(
															TIN,
															e.target.value,
															1,
															setTIN,
															"tin-input"
														);
													}}
												/>
												<BoxInput
													className="border mr-1"
													inputClassName="w-3 h-5 tin-input"
													onChange={(e) => {
														handleChange(
															TIN,
															e.target.value,
															2,
															setTIN,
															"tin-input"
														);
													}}
												/>

												<BoxInput
													className="border"
													inputClassName="w-3 h-5 tin-input"
													onChange={(e) => {
														handleChange(
															TIN,
															e.target.value,
															3,
															setTIN,
															"tin-input"
														);
													}}
												/>
												<BoxInput
													className="border"
													inputClassName="w-3 h-5 tin-input"
													onChange={(e) => {
														handleChange(
															TIN,
															e.target.value,
															4,
															setTIN,
															"tin-input"
														);
													}}
												/>
												<BoxInput
													className="border mr-1"
													inputClassName="w-3 h-5 tin-input"
													onChange={(e) => {
														handleChange(
															TIN,
															e.target.value,
															5,
															setTIN,
															"tin-input"
														);
													}}
												/>

												<BoxInput
													className="border"
													inputClassName="w-3 h-5 tin-input"
													onChange={(e) => {
														handleChange(
															TIN,
															e.target.value,
															6,
															setTIN,
															"tin-input"
														);
													}}
												/>
												<BoxInput
													className="border"
													inputClassName="w-3 h-5 tin-input"
													onChange={(e) => {
														handleChange(
															TIN,
															e.target.value,
															7,
															setTIN,
															"tin-input"
														);
													}}
												/>
												<BoxInput
													className="border"
													inputClassName="w-3 h-5 tin-input"
													onChange={(e) => {
														handleChange(
															TIN,
															e.target.value,
															8,
															setTIN,
															"tin-input"
														);
													}}
												/>
											</div>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td className="align-top">
									<div className="flex flex-col pb- px-1 pt-1">
										<b className="text-xs">SEX</b>
										<div className="flex flex-col">
											<CheckBox
												key={`gender-male-${watch(
													"gender"
												)}`}
												label="Male"
												value="Male"
												onChange={(e) => {
													setValue(
														"gender",
														e.target.value
													);
												}}
												checked={
													String(
														watch("gender")
													).toLowerCase() == "male"
														? "checked"
														: ""
												}
											/>
											<CheckBox
												key={`gender-female-${watch(
													"gender"
												)}`}
												label="Female"
												value="Female"
												onChange={(e) => {
													setValue(
														"gender",
														e.target.value
													);
												}}
												checked={
													String(
														watch("gender")
													).toLowerCase() == "female"
														? "checked"
														: ""
												}
											/>
										</div>
									</div>
								</td>
								<td>
									<div className="flex flex-col pb- px-1 pt-1">
										<b className="text-xs">CIVIL STATUS</b>
										<div className="grid grid-cols-2">
											<CheckBox
												key={`civil_Single-${watch(
													"civil_status"
												)}`}
												label="Single"
												value="Single"
												onChange={(e) => {
													setValue(
														"civil_status",
														e.target.value
													);
												}}
												checked={
													String(
														watch("civil_status")
													)
														.toLowerCase()
														?.includes("single")
														? "checked"
														: ""
												}
											/>
											<CheckBox
												key={`civil_Annulled-${watch(
													"civil_status"
												)}`}
												label="Annulled"
												value="Annulled"
												onChange={(e) => {
													setValue(
														"civil_status",
														e.target.value
													);
												}}
												checked={
													String(
														watch("civil_status")
													)
														.toLowerCase()
														?.includes("annul")
														? "checked"
														: ""
												}
											/>
											<CheckBox
												key={`civil_Married-${watch(
													"civil_status"
												)}`}
												label="Married"
												value="Married"
												onChange={(e) => {
													setValue(
														"civil_status",
														e.target.value
													);
												}}
												checked={
													String(
														watch("civil_status")
													)
														.toLowerCase()
														?.includes("married")
														? "checked"
														: ""
												}
											/>
											<CheckBox
												key={`civil_Widower-${watch(
													"civil_status"
												)}`}
												label="Widower"
												value="Widower"
												onChange={(e) => {
													setValue(
														"civil_status",
														e.target.value
													);
												}}
												checked={
													String(
														watch("civil_status")
													)
														.toLowerCase()
														?.includes("widow")
														? "checked"
														: ""
												}
											/>
											<CheckBox
												key={`civil_Legally-${watch(
													"civil_status"
												)}`}
												label="Legally Separated"
												value="Legally Separated"
												onChange={(e) => {
													setValue(
														"civil_status",
														e.target.value
													);
												}}
												className="col-span-2"
												checked={
													String(
														watch("civil_status")
													)
														.toLowerCase()
														?.includes("separated")
														? "checked"
														: ""
												}
											/>
										</div>
									</div>
								</td>
								<td>
									<div className="flex flex-col pb- px-1 pt-1">
										<b className="text-xs mb-2">
											CITIZENSHIP
										</b>
										<div className="grid grid-cols-2">
											<CheckBox
												key={`citizenship-FILIPIN-${watch(
													"citizenship"
												)}`}
												label="FILIPINO"
												value="FILIPINO"
												onChange={(e) => {
													setValue(
														"citizenship",
														e.target.value
													);
												}}
												checked={
													String(watch("citizenship"))
														.toLowerCase()
														.includes("fil")
														? "checked"
														: ""
												}
											/>
											<CheckBox
												key={`citizenship-FOREIGN-${watch(
													"citizenship"
												)}`}
												label="FOREIGN NATIONAL"
												value="FOREIGN NATIONAL"
												onChange={(e) => {
													setValue(
														"citizenship",
														e.target.value
													);
												}}
												checked={
													String(watch("citizenship"))
														.toLowerCase()
														.includes("f-n") ||
													String(watch("citizenship"))
														.toLowerCase()
														.includes("foreign")
														? "checked"
														: ""
												}
											/>
											<CheckBox
												key={`citizenship-CI-${watch(
													"citizenship"
												)}`}
												label="DUAL CITIZEN "
												value="DUAL CITIZEN"
												onChange={(e) => {
													setValue(
														"citizenship",
														e.target.value
													);
												}}
												checked={
													String(watch("citizenship"))
														.toLowerCase()
														.includes("d-c") ||
													String(watch("citizenship"))
														.toLowerCase()
														.includes("dual")
														? "checked"
														: ""
												}
											/>
										</div>
									</div>
								</td>
							</tr>
						</table>
					</div>

					<div className="flex items-center border-y p-1 justify-center bg-[#dbe2c6]">
						<b className="text-sm">
							II. ADDRESS and CONTACT DETAILS
						</b>
					</div>
					<div className="border-y">
						<table className="bordered-table text-xs w-full">
							<tr>
								<td className="pb-1 !align-top">
									<div className="flex flex-col pb- px-1 pt-1">
										<b className="text-xs">
											PERMANENT HOME ADDRESS
										</b>
										<div className="w-full grid grid-cols-4 gap-3">
											<b className="text-[8px]">
												Unit/Room No./Floor
											</b>
											<b className="text-[8px]">
												Building Name
											</b>
											<b className="text-[8px]">
												Lot/Block/Phase/House Number
											</b>
											<b className="text-[8px]">
												Street Name
											</b>
											<input
												className="bg-white h-5 -mt-3 mb-0 border-none focus:ring-2 px-[2px]"
												placeholder="Unit/Room No./Floor"
												{...register("unit")}
											/>
											<input
												className="bg-white h-5 -mt-3 mb-0 border-none focus:ring-2 px-[2px]"
												placeholder="Building Name"
												{...register("building")}
											/>
											<input
												className="bg-white h-5 -mt-3 mb-0 border-none focus:ring-2 px-[2px]"
												placeholder="Lot/Block/Phase/House Number"
												{...register("house_number")}
											/>
											<input
												className="bg-white h-5 -mt-3 mb-0 border-none focus:ring-2 px-[2px]"
												placeholder="Street Name"
												{...register("street")}
											/>
										</div>
									</div>
								</td>
								<td rowSpan={4} className="w-1/4">
									<div className="flex flex-col w-full gap-2 px-1 py-2">
										<RowInput
											label="Home Phone Number"
											subLabel={`(COUNTRY CODE + AREA CODE +
												TELEPHONE NUM BER)`}
											defaultValue={
												patient?.telephone || ""
											}
											{...register("telephone")}
										/>
										<RowInput
											label="Mobile Number (Required)"
											defaultValue={patient?.mobile || ""}
											{...register("mobile")}
										/>
										<RowInput
											label="Business (Direct Line)"
											{...register("telephone")}
										/>
										<RowInput
											label="E-mail Address (Required for OFW)"
											defaultValue={patient?.email || ""}
											{...register("email")}
										/>
									</div>
								</td>
							</tr>

							<tr>
								<td className="!align-top">
									<div className="flex flex-col pb-1 px-1 pt-1">
										<div className="w-full flex items-center justify-between gap-3">
											<div className="text-[8px]">
												<span>Subdivision</span>
												<input
													type="text"
													className="-mb-2 uppercase passive-input w-[100px]"
													{...register("subdivision")}
												/>
											</div>
											<div className="text-[8px]">
												<span>Barangay</span>
												<input
													type="text"
													className="-mb-2 uppercase passive-input w-[100px]"
													defaultValue={
														patient?.barangay || ""
													}
													{...register("barangay")}
												/>
											</div>
											<div className="text-[8px]">
												<span>Municipality/City</span>
												<input
													type="text"
													className="-mb-2 uppercase passive-input w-[100px]"
													defaultValue={
														patient?.municipality ||
														""
													}
													{...register(
														"municipality"
													)}
												/>
											</div>
											<div className="text-[8px]">
												<span>
													Province/State/Country (If
													abroad)
												</span>
												<input
													type="text"
													className="-mb-2 uppercase passive-input w-[100px]"
													defaultValue={
														patient?.household
															?.province || ""
													}
													{...register("province")}
												/>
											</div>
											<div className="text-[8px]">
												<span>ZIP Code</span>
												<input
													type="text"
													className="-mb-2 uppercase passive-input w-[100px]"
													defaultValue={
														patient?.zip_code || ""
													}
													{...register("zip_code")}
												/>
											</div>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td className=" !align-top">
									<div className="flex flex-col pb- px-1 pt-1">
										<b className="text-xs">
											MAILING ADDRESS
										</b>
										<div className="w-full grid grid-cols-4 gap-3">
											<b className="text-[8px]">
												Unit/Room No./Floor
											</b>
											<b className="text-[8px]">
												Building Name
											</b>
											<b className="text-[8px]">
												Lot/Block/Phase/House Number
											</b>
											<b className="text-[8px]">
												Street Name
											</b>
											<input
												className="bg-white h-5 -mt-3 mb-0 border-none focus:ring-2 px-[2px]"
												placeholder="Unit/Room No./Floor"
												{...register("mailing_unit")}
											/>
											<input
												className="bg-white h-5 -mt-3 mb-0 border-none focus:ring-2 px-[2px]"
												placeholder="Building Name"
												{...register(
													"mailing_building"
												)}
											/>
											<input
												className="bg-white h-5 -mt-3 mb-0 border-none focus:ring-2 px-[2px]"
												placeholder="Lot/Block/Phase/House Number"
												{...register(
													"mailing_house_number"
												)}
											/>
											<input
												className="bg-white h-5 -mt-3 mb-0 border-none focus:ring-2 px-[2px]"
												placeholder="Street Name"
												{...register("mailing_street")}
											/>
										</div>
									</div>
								</td>
							</tr>

							<tr>
								<td className="!align-top">
									<div className="flex flex-col pb-1 px-1 pt-1">
										<div className="w-full flex items-center justify-between gap-3">
											<div className="text-[8px]">
												<span>Subdivision</span>
												<input
													type="text"
													className="-mb-2 uppercase passive-input w-[100px]"
													{...register(
														"mailing_subdivision"
													)}
												/>
											</div>
											<div className="text-[8px]">
												<span>Barangay</span>
												<input
													type="text"
													className="-mb-2 uppercase passive-input w-[100px]"
													defaultValue={
														patient?.barangay || ""
													}
													{...register(
														"mailing_barangay"
													)}
												/>
											</div>
											<div className="text-[8px]">
												<span>Municipality/City</span>
												<input
													type="text"
													className="-mb-2 uppercase passive-input w-[100px]"
													defaultValue={
														patient?.municipality ||
														""
													}
													{...register(
														"mailing_municipality"
													)}
												/>
											</div>
											<div className="text-[8px]">
												<span>
													Province/State/Country (If
													abroad)
												</span>
												<input
													type="text"
													className="-mb-2 uppercase passive-input w-[100px]"
													defaultValue={
														patient?.household
															?.province || ""
													}
													{...register(
														"mailing_province"
													)}
												/>
											</div>
											<div className="text-[8px]">
												<span>ZIP Code</span>
												<input
													type="text"
													className="-mb-2 uppercase passive-input w-[100px]"
													defaultValue={
														patient?.zip_code || ""
													}
													{...register(
														"mailing_zip_code"
													)}
												/>
											</div>
										</div>
									</div>
								</td>
							</tr>
						</table>
					</div>

					<div className="flex items-center border-y p-1 justify-center bg-[#dbe2c6]">
						<b className="text-sm">
							III. DECLARATION OF DEPENDENTS
						</b>
					</div>
					<div className="border-y">
						<table className="bordered-table text-xs w-full">
							<tr>
								<th rowSpan={2}>LAST NAME</th>
								<th rowSpan={2}>FIRST NAME</th>
								<th rowSpan={2} className="w-[62px]">
									<div className="text-center text-[8px]">
										NAME
										<br />
										EXTENSION
										<br />
										(Jr./Sr./III)
									</div>
								</th>
								<th rowSpan={2}>MIDDLE NAME</th>
								<th rowSpan={2}>
									<span className="text-[8px]">
										RELATIONSHIP
									</span>
								</th>
								<th rowSpan={2} className="w-[62px]">
									<div className="text-center text-[8px]">
										DATE OF
										<br />
										BIRTH
										<br />
										(mm-dd-yyyy)
									</div>
								</th>
								<th rowSpan={2}>
									<span className="text-[8px]">
										CITIZENSHIP
									</span>
								</th>
								<th className="w-[44px]">
									<div className="text-center text-[8px]">
										NO
										<br />
										MIDDLE
										<br />
										NAME
									</div>
								</th>
								<th className="w-[44px] text-[8px]">MONONYM</th>
								<th rowSpan={2} className="w-11 text-[8px]">
									Check if with Permanent Disability
								</th>
							</tr>
							<tr>
								<td colSpan={2}>
									<span className="text-[6px] flex items-center justify-center text-center font-bold">
										(Check if applicable only)
									</span>
								</td>
							</tr>
							{dependents?.map((data, index) => {
								return (
									<tr key={`dependents-${index}`}>
										<td className="uppercase !h-8">
											{data?.lastname}
										</td>
										<td className="uppercase">
											{data?.firstname}
										</td>
										<td className="uppercase">
											{data?.suffix ||
												data?.name_extension}
										</td>
										<td className="uppercase">
											{data?.middle_name ||
												data?.middlename}
										</td>
										<td className="uppercase">
											{data?.relationship}
										</td>

										<td className="uppercase text-[10px] text-center !p-0">
											{formatDateMMDDYYYY(
												new Date(data?.birthday)
											)}
										</td>
										<td className="uppercase text-center">
											{data?.citizenship}
										</td>
										<td>
											<div className="flex items-center justify-center p-[2px]">
												<CheckBox />
											</div>
										</td>
										<td>
											<div className="flex items-center justify-center p-[2px]">
												<CheckBox />
											</div>
										</td>
										<td>
											<div className="flex items-center justify-center p-[2px]">
												<CheckBox
													checked={
														data?.is_permanently_disabled
															? "checked"
															: ""
													}
												/>
											</div>
										</td>
									</tr>
								);
							})}
							{blanks.map((x, i) => {
								return (
									<tr key={`blank-dep-${i}`}>
										<td className="uppercase !h-8"></td>
										<td className="uppercase"></td>
										<td className="uppercase"></td>
										<td className="uppercase"></td>
										<td className="uppercase"></td>
										<td className="uppercase"></td>
										<td className="uppercase"></td>
										<td>
											<div className="flex items-center justify-center p-[2px]">
												<CheckBox />
											</div>
										</td>
										<td>
											<div className="flex items-center justify-center p-[2px]">
												<CheckBox />
											</div>
										</td>
										<td>
											<div className="flex items-center justify-center p-[2px]">
												<CheckBox />
											</div>
										</td>
									</tr>
								);
							})}
						</table>
					</div>

					<div className="flex items-center border-y p-1 justify-center bg-[#dbe2c6]">
						<b className="text-sm">IV. MEMBER TYPE</b>
					</div>
					<div className="border-y">
						<table className="bordered-table text-xs w-full">
							<tr>
								<td colSpan={3}>
									<div className="w-full flex flex-col">
										<div className="w-full text-center font-bold text-xs">
											DIRECT CONTRIBUTOR
										</div>
										<div className="grid grid-cols-5 gap-2">
											<div className="flex flex-col p-1 gap-1 col-span-2">
												<CheckBox
													key={`dc-EmployedPrivate-${watch(
														"direct_contributor"
													)}`}
													label="Employed Private"
													value="Employed Private"
													onChange={(e) => {
														setValue(
															"direct_contributor",
															e.target.value
														);
													}}
													checked={
														watch(
															"direct_contributor"
														) == "Employed Private"
															? "checked"
															: ""
													}
												/>
												<CheckBox
													key={`dc-EmployedGovernment-${watch(
														"direct_contributor"
													)}`}
													label="Employed Government"
													value="Employed Government"
													onChange={(e) => {
														setValue(
															"direct_contributor",
															e.target.value
														);
													}}
													checked={
														String(
															watch(
																"direct_contributor"
															)
														)
															.toLowerCase()
															.includes("gov")
															? "checked"
															: ""
													}
												/>

												<CheckBox
													key={`dc-ProfessionalPractitioner-${watch(
														"direct_contributor"
													)}`}
													label="Professional Practitioner"
													value="Professional Practitioner"
													onChange={(e) => {
														setValue(
															"direct_contributor",
															e.target.value
														);
													}}
													checked={
														watch(
															"direct_contributor"
														) ==
														"Professional Practitioner"
															? "checked"
															: ""
													}
												/>

												<CheckBox
													key={`dc-Self-EarningIndividual-${watch(
														"direct_contributor"
													)}`}
													label="Self-Earning Individual"
													value="Self-Earning Individual"
													onChange={(e) => {
														setValue(
															"direct_contributor",
															e.target.value
														);
													}}
													checked={
														watch(
															"direct_contributor"
														) ==
														"Self-Earning Individual"
															? "checked"
															: ""
													}
												/>
												<div className="flex flex-col gap-1 pl-4">
													<CheckBox label="Individual" />
													<CheckBox label="Sole Proprietor" />
													<CheckBox label="Group Enrollment Scheme" />
												</div>
												<TextInput
													className="pl-8"
													labelClassName="whitespace-pre"
												/>
											</div>

											<div className="flex flex-col p-1 col-span-3 gap-1">
												<div className="flex items-center gap-11">
													<CheckBox
														key={`dc-Kasambahay-${watch(
															"direct_contributor"
														)}`}
														label="Kasambahay"
														value="Kasambahay"
														onChange={(e) => {
															setValue(
																"direct_contributor",
																e.target.value
															);
														}}
														checked={
															watch(
																"direct_contributor"
															) == "Kasambahay"
																? "checked"
																: ""
														}
													/>
													<CheckBox
														key={`dc-FamilyDriver-${watch(
															"direct_contributor"
														)}`}
														label="Family Driver"
														value="Family Driver"
														onChange={(e) => {
															setValue(
																"direct_contributor",
																e.target.value
															);
														}}
														checked={
															watch(
																"direct_contributor"
															) == "Family Driver"
																? "checked"
																: ""
														}
													/>
												</div>
												<CheckBox
													key={`dc-MigrantWorker-${watch(
														"direct_contributor"
													)}`}
													label="Migrant Worker"
													value="Migrant Worker"
													onChange={(e) => {
														setValue(
															"direct_contributor",
															e.target.value
														);
													}}
													checked={
														watch(
															"direct_contributor"
														) == "Migrant Worker"
															? "checked"
															: ""
													}
												/>
												<div className="flex items-center gap-4 pl-4">
													<CheckBox label="Land-Based" />
													<CheckBox
														label="Sea-Based
"
													/>
												</div>
												<CheckBox
													label="Lifetime Member"
													key={`dc-LifetimeMember-${watch(
														"direct_contributor"
													)}`}
													value="Lifetime Member"
													onChange={(e) => {
														setValue(
															"direct_contributor",
															e.target.value
														);
													}}
													checked={
														watch(
															"direct_contributor"
														) == "Lifetime Member"
															? "checked"
															: ""
													}
												/>
												<CheckBox label="Filipinos with Dual Citizenship / Living Abroad" />
												<CheckBox
													label="Foreign National
"
												/>
												<TextInput
													label="PRA SRRV No."
													className="pl-5"
													labelClassName="whitespace-pre"
												/>
												<TextInput
													label="ACR I-Card No."
													className="pl-5"
													labelClassName="whitespace-pre"
												/>
											</div>
										</div>
									</div>
								</td>

								<td className="w-2/5 !align-top">
									<div className="w-full flex flex-col p-1 items-start">
										<div className="w-full text-center font-bold text-xs mb-2">
											INDIRECT CONTRIBUTOR
										</div>
										<div className="grid grid-cols-2 gap-4">
											<div className="flex flex-col gap-1">
												<CheckBox
													label="Listahan"
													key={`ic-Listahan-${watch(
														"indirect_contributor"
													)}`}
													value="Listahan"
													onChange={(e) => {
														setValue(
															"indirect_contributor",
															e.target.value
														);
													}}
													checked={
														watch(
															"indirect_contributor"
														) == "Listahan"
															? "checked"
															: ""
													}
												/>
												<CheckBox
													label="4Ps/MCCT"
													key={`ic-4Ps/MCCT-${watch(
														"indirect_contributor"
													)}`}
													value="4Ps/MCCT"
													onChange={(e) => {
														setValue(
															"indirect_contributor",
															e.target.value
														);
													}}
													checked={
														String(
															watch(
																"indirect_contributor"
															)
														)
															.toLowerCase()
															.includes("4P")
															? "checked"
															: ""
													}
												/>
												<CheckBox
													label="Senior Citizen"
													key={`ic-SeniorCitizen-${watch(
														"indirect_contributor"
													)}`}
													value="Senior Citizen"
													onChange={(e) => {
														setValue(
															"indirect_contributor",
															e.target.value
														);
													}}
													checked={
														watch(
															"indirect_contributor"
														) == "Senior Citizen"
															? "checked"
															: ""
													}
												/>
												<CheckBox
													label="PAMANA"
													key={`ic-PAMANA-${watch(
														"indirect_contributor"
													)}`}
													value="PAMANA"
													onChange={(e) => {
														setValue(
															"indirect_contributor",
															e.target.value
														);
													}}
													checked={
														watch(
															"indirect_contributor"
														) == "PAMANA"
															? "checked"
															: ""
													}
												/>
												<CheckBox
													label="KIA/KIPO"
													key={`ic-KIA/KIPO-${watch(
														"indirect_contributor"
													)}`}
													value="KIA/KIPO"
													onChange={(e) => {
														setValue(
															"indirect_contributor",
															e.target.value
														);
													}}
													checked={
														watch(
															"indirect_contributor"
														) == "KIA/KIPO"
															? "checked"
															: ""
													}
												/>
												<CheckBox
													label="Bangsamoro/Normalization"
													key={`ic-Bangsamoro/Normalization-${watch(
														"indirect_contributor"
													)}`}
													value="Bangsamoro/Normalization"
													onChange={(e) => {
														setValue(
															"indirect_contributor",
															e.target.value
														);
													}}
													checked={
														watch(
															"indirect_contributor"
														) ==
														"Bangsamoro/Normalization"
															? "checked"
															: ""
													}
												/>
											</div>
											<div className="flex flex-col gap-1">
												<CheckBox
													label="LGU-sponsored"
													key={`ic-LGU-sponsored-${watch(
														"indirect_contributor"
													)}`}
													value="LGU-sponsored"
													onChange={(e) => {
														setValue(
															"indirect_contributor",
															e.target.value
														);
													}}
													checked={
														watch(
															"indirect_contributor"
														) == "LGU-sponsored"
															? "checked"
															: ""
													}
												/>
												<CheckBox
													label="NGA-sponsored"
													key={`ic-NGA-sponsored-${watch(
														"indirect_contributor"
													)}`}
													value="NGA-sponsored"
													onChange={(e) => {
														setValue(
															"indirect_contributor",
															e.target.value
														);
													}}
													checked={
														watch(
															"indirect_contributor"
														) == "NGA-sponsored"
															? "checked"
															: ""
													}
												/>
												<CheckBox
													label="Private-sponsored "
													key={`ic-Private-sponsored-${watch(
														"indirect_contributor"
													)}`}
													value="Private-sponsored"
													onChange={(e) => {
														setValue(
															"indirect_contributor",
															e.target.value
														);
													}}
													checked={
														watch(
															"indirect_contributor"
														) == "Private-sponsored"
															? "checked"
															: ""
													}
												/>
												<CheckBox
													label="Person with Disability "
													key={`ic-Person with Disability-${watch(
														"indirect_contributor"
													)}`}
													value="Person with Disability"
													onChange={(e) => {
														setValue(
															"indirect_contributor",
															e.target.value
														);
													}}
													checked={
														watch(
															"indirect_contributor"
														) ==
														"Person with Disability"
															? "checked"
															: ""
													}
												/>
												<span className="relative w-full">
													<TextInput
														label="PWD ID No."
														className=" w-[148px] absolute left-0"
														labelClassName="whitespace-pre"
													/>
												</span>
											</div>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td className="!align-top p-1 text-[10px]">
									<div className="flex w-[200px] flex-col gap-2">
										<div className="flex">
											<b>PROFESSION:</b>
											<span className="text-[6px]">
												(Except Employed, Lifetime
												Members and Sea-based Migrant
												Worker)
											</span>
										</div>
										<div className="h-full relative w-full">
											<input
												type="text"
												className="uppercase absolute left-0 top-0 h-full w-full bg-slate-50 passive-input text-left"
												{...register("profession")}
											/>
										</div>
									</div>
								</td>
								<td className="!align-top p-1 text-[10px]">
									<div className="flex flex-col gap-2">
										<b className="whitespace-pre">
											MONTHLY INCOME:
										</b>
										<div className="relative">
											<input
												type="text"
												className="-mb-2 uppercase passive-input text-center"
												{...register("salary")}
											/>
										</div>
									</div>
								</td>
								<td className="!align-top p-1 text-[10px]">
									<div className="flex flex-col gap-2">
										<b className="whitespace-pre">
											PROOF OF INCOME:
										</b>
										<div className="uppercase"></div>
									</div>
								</td>
								<td className="!align-top">
									<div className="w-full flex flex-col p-1">
										<div className="w-full text-center font-bold text-xs mb-2">
											For PhilHealth Use only:
										</div>
										<div className="grid grid-cols-1 gap-1">
											<CheckBox label="Point of Service (POS) Financially Incapable" />
											<CheckBox label="Financially Incapable" />
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td colSpan={4} className="!align-top">
									<div className="flex pt-3">
										<b>
											This form may be reproduced and is
											not for sale
										</b>
										<b className="ml-20">
											Continue at the back
										</b>
									</div>
								</td>
							</tr>
						</table>
					</div>
				</div>

				<div className="bg-white flex flex-col w-[8.5in] min-h-[13in] border">
					<div className="flex items-center border-y p-1 justify-center bg-[#dbe2c6]">
						<b className="text-sm">V. UPDATING/AMENDMENT</b>
					</div>
					<div className="border-y">
						<table className="bordered-table text-xs w-full">
							<tr>
								<th className="w-1/3 text-left py-2 px-2">
									Please check:
								</th>
								<th className="w-1/3 text-center py-2 px-2">
									FROM
								</th>
								<th className="w-1/3 text-center py-2 px-2">
									TO
								</th>
							</tr>
							<tr>
								<td className="w-1/3 text-left px-1 py-3">
									<CheckBox
										label={
											<div className="flex flex-col">
												<span>
													Change/Correction of Name
												</span>
												<span className="text-[6px]">
													(Last Name, First Name, Name
													Extension (Jr./Sr./III)
													Middle Name)
												</span>
											</div>
										}
										c
										{...register("change_correction_name")}
									/>
								</td>
								<td className="w-1/3 text-left uppercase"></td>
								<td className="w-1/3 text-left uppercase"></td>
							</tr>
							<tr>
								<td className="w-1/3 text-left px-1 py-3">
									<CheckBox
										label={`Correction of Date of Birth`}
									/>
								</td>
								<td className="w-1/3 text-left uppercase"></td>
								<td className="w-1/3 text-left uppercase"></td>
							</tr>
							<tr>
								<td className="w-1/3 text-left px-1 py-3">
									<CheckBox label={`Correction of Sex`} />
								</td>
								<td className="w-1/3 text-left uppercase"></td>
								<td className="w-1/3 text-left uppercase"></td>
							</tr>
							<tr>
								<td className="w-1/3 text-left px-1 py-3">
									<CheckBox
										label={`Change of Civil Status`}
									/>
								</td>
								<td className="w-1/3 text-left uppercase"></td>
								<td className="w-1/3 text-left uppercase"></td>
							</tr>
							<tr>
								<td className="w-1/3 text-left px-1">
									<CheckBox
										label={`Updating of Personal Information/Address/
										Telephone Number/Mobile Number/e-mail
										Address`}
									/>
								</td>
								<td className="w-1/3 text-left uppercase"></td>
								<td className="w-1/3 text-left uppercase"></td>
							</tr>
						</table>
					</div>

					<div className="border-y my-1">
						<table className="bordered-table text-xs w-full">
							<tr>
								<td className="w-2/3" rowSpan={2}>
									<div className="flex flex-col p-2 text-justify">
										<p className="text-sm leading-tight">
											Under penalty of law, I hereby
											attest that the information
											provided, including the documents I
											have attached to this form, are true
											and accurate to the best of my
											knowledge. I agree and authorize
											PhilHealth for the subsequent
											validation, verification and for
											other data sharing purposes only
											under the following circumstances:
										</p>
										<ul className="text-sm pl-4 pt-2 list-disc ml-4">
											<li>
												As necessary for the proper
												execution of processes related
												to the legitimate and declared
												purpose;
											</li>
											<li>
												The use or disclosure is
												reasonably necessary, required
												or authorized by or under the
												law; and,
											</li>
											<li>
												Adequate security measures are
												employed to protect my
												information.
											</li>
										</ul>
										<div className="flex items-end gap-6">
											<div className="grid grid-cols-12 gap-4 w-full">
												<div className="col-span-8 relative flex items-center justify-center">
													<img
														src={patient?.signature}
														className="-mt-20 absolute h-20 w-20"
														style={{
															mixBlendMode:
																"multiply",
															filter: "brightness(1) contrast(5.5)",
															borderRadius:
																"50px",
															objectFit: "cover",
														}}
													/>
													<UnderlineInput
														className="w-full"
														label="Member’s Signature over Printed Name"
														labelClassName="font-bold pt-1"
														inputClassName="text-center "
														defaultValue={patientFullName(
															patient
														)}
													/>
												</div>
												<UnderlineInput
													label="Date"
													labelClassName="font-bold pt-1"
													className="col-span-4"
													inputClassName="text-center"
													defaultValue={dateMMDDYYYY()}
												/>
											</div>
											<div className="flex flex-col">
												<div className="border rounded-xl w-24 h-20"></div>
												<span className="text-[8px] text-center whitespace-pre pt-1">
													Please affix right <br />
													thumbmark if unable to write
												</span>
											</div>
										</div>
									</div>
								</td>
								<td className="bg-[#dbe2c6]">
									<div className="flex flex-col">
										<div className="flex items-left p-1">
											<b className="text-base">
												FOR PHILHEALTH USE ONLY
											</b>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td className="bg-[#f5f5f5]">
									<div className="flex flex-col">
										<div className="flex text-sm items-left p-1 mb-3">
											<b>RECEIVED BY:</b>
										</div>
										<div className="flex text-xs items-left p-1 mb-0">
											Full Name:
										</div>
										<div className="flex text-sm items-left p-1 mb-3">
											<TextInput
												inputClassName="bg-[#f5f5f5]"
												className="w-full"
											/>
										</div>
										<div className="flex text-xs items-left p-1 mb-0">
											PRO/LHIO/Branch:
										</div>
										<div className="flex text-sm items-left p-1 mb-3">
											<TextInput
												inputClassName="bg-[#f5f5f5]"
												className="w-full"
											/>
										</div>
										<div className="flex text-xs items-left p-1 mb-0">
											Date & Time:
										</div>
										<div className="flex text-sm items-left p-1 mb-3">
											<TextInput
												inputClassName="bg-[#f5f5f5]"
												className="w-full"
											/>
										</div>
									</div>
								</td>
							</tr>
						</table>
					</div>

					<div className="border-y my-1 flex flex-col p-2">
						<h4 className="font-bold text-center">INSTRUCTIONS</h4>
						<ol className="list-[auto] pl-6 text-sm gap-y-2 py-2">
							<li className="pl-3">
								All information should be written in UPPER
								CASE/CAPITAL LETTERS. If the information is not
								applicable, write “N/A.”
							</li>
							<li className="pl-3">
								All fields are mandatory unless indicated as
								optional. By affixing your signature, you
								certify the truthfulness and accuracy of all
								information provided.
							</li>
							<li className="pl-3">
								A properly accomplished PMRF shall be
								accompanied by a valid proof of identity for
								first time registrants, and supporting documents
								to establish relationship between member and
								dependent/s for updating or request for
								amendment.
							</li>
							<li className="pl-3">
								On the PURPOSE, check the appropriate box if for
								<u className="font-bold">Registration</u> or for
								<u className="font-bold">Updating/Amendment</u>
								of information.
							</li>
							<li className="pl-3">
								Indicate preferred KonSulTa provider near the
								place of work or residence.
							</li>
							<li className="pl-3">
								<p>
									For PERSONAL DETAILS, all name entries
									should follow the format given below. Check
									the appropriate box if registrant has no
									middle name and/or with single name
									(mononym).
								</p>
								<div className="flex text-center justify-between py-2 px-11">
									<div className="flex flex-col">
										<b>LAST NAME</b>
										<span>SANTOS</span>
									</div>
									<div className="flex flex-col">
										<b>FIRST NAME</b>
										<span>JUAN ANDRES</span>
									</div>
									<div className="flex flex-col">
										<b>NAME EXTENSION (Jr./Sr./III)</b>
										<span>III</span>
									</div>
									<div className="flex flex-col">
										<b>MIDDLE NAME</b>
										<span>DELA CRUZ</span>
									</div>
								</div>
							</li>
							<li className="pl-3">
								Indicate registrant’s/member’s name as it
								appears in the birth certificate.
							</li>
							<li className="pl-3">
								The full mother’s maiden name of
								registrant/member must be indicated as it
								appears in the birth certificate.
							</li>
							<li className="pl-3">
								Indicate the full name of spouse if
								registrant/member is married.
							</li>
							<li className="pl-3">
								Indicate the complete permanent and mailing
								addresses and contact numbers.
							</li>
							<li className="pl-3">
								For updating/amendment, check the appropriate
								box to be updated/amended and indicate the
								correct data.
							</li>
							<li className="pl-3">
								For MEMBER TYPE, check the appropriate box which
								best describes your current membership status.
							</li>
							<li className="pl-3">
								For Direct Contributors, except employed,
								sea-based migrant workers and lifetime members,
								indicate the profession, monthly income and
								proof of income to be submitted.
							</li>
							<li className="pl-3">
								For Self-earning individuals, Kasambahays and
								Family Drivers, indicate the actual monthly
								income in the space provided.
							</li>
							<li className="pl-3">
								In declaring dependents, provide the full name
								of the living spouse, children below 21 years
								old, and parents who are 60 years old and above
								totally dependent to the member.
							</li>
							<li className="pl-3">
								Dependents with disability shall be registered
								as principal members in accordance with Republic
								Act 11228 on mandatory PhilHealth coverage for
								all persons with disability (PWD).
							</li>
							<li className="pl-3">
								The registrant must affix his/her signature over
								printed name (or right thumbmark if unable to
								write) and indicate the date when the PMRF was
								signed.
							</li>
						</ol>
					</div>
				</div>
			</div>
		</div>
  )
}

export default PMRF

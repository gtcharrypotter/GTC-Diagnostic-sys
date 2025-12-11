/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import {
	Fragment,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import ActionBtn from "../buttons/ActionBtn";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import CollapseDiv from "../CollapseDiv";
import TextInputField from "../inputs/TextInputField";
import ReactSelectInputField from "../inputs/ReactSelectInputField";

import { v4 as uuidv4 } from "uuid";
import {
	relationshipOptions,
	civilStatusOptions,
	genderOptions,
	religion_choices,
	educational_attainment,
	ip_tribes,
	packageType,
} from "../../libs/patientFormOptions";
import { geolocations, locations } from "../../libs/geolocations";
import RadioInput from "../inputs/RadioInput";
import { dataURItoBlob, formatDateYYYYMMDD } from "../../libs/helpers";
import Axios from "../../libs/axios";
import PickMapLocation from "../PickMapLocation";
import PhilhealthMasterlistModal from "./PhilhealthMasterlistModal";
import { useAuth } from "../../hooks/useAuth";
import saranganiJson from '../../libs/sarangani.json'
import southcotabatoJson from '../../libs/southcotabato.json'
import agusanDelNorteJson from '../../libs/agusanDelNorte.json'
import agusanDelSurJson from '../../libs/agusanDelSur.json'

const NewPatientFormModal = (props, ref) => {
	const { patientSelfie, noRedirect, onSuccess } = props;
	const {
		register,
		setValue,
		watch,
		fetchData,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { user } = useAuth();
	const [modalOpen, setModalOpen] = useState(false);
	const [mount, setMount] = useState(0);
	const [displayDelayed, setDisplayDelayed] = useState(false);
	const [loading, setLoading] = useState(false);
	const [provinceList, setProvinceList] = useState([]);
	const [municipalityList, setMunicipalityList] = useState([]);
	const [brgys, setBrgys] = useState([]);
	const [puroks, setPuroks] = useState([]);
	const phicMembersListRef = useRef(null);	
	const [gender, setGender] = useState([]);
	const [civilStatus, setCivilStatus] = useState([]);
	const [religion, setReligion] = useState([]);
	const [education, setEducation] = useState([]);
	const [indigenous, setIndigenous] = useState([]);
	const enlistment_date = watch("enlistment_date");
	const [isSameAsPermanent, setIsSameAsPermanent] = useState(false);
	const permanentRegion = watch("region");
	const permanentProvince = watch("province");
	const permanentMunicipality = watch("municipality");
	const permanentBarangay = watch("barangay");
	const permanentPurok = watch("purok");
	const permanentZip = watch("zip_code");
	const permanentUnit = watch("unit");
	const permanentLot = watch("house_number");
	const permanentStreet = watch("street");
	const permanentSubdivision = watch("subdivision");
	const permanentCountry = watch("country");
	const consent = watch("consent");
	const previousRegion = useRef(null);
	const previousProvince = useRef(null);
	const previousMunicipality = useRef(null);
	const previousBarangay = useRef(null);
	
	const allFeatures = [
		...saranganiJson.features,
		...southcotabatoJson.features,
		...agusanDelNorteJson.features,
		...agusanDelSurJson.features,
	  ];
	const [position, setPosition] = useState({
		lat: 6.160789891245747,
		lng: 125.29877677135225,
	});

	const [members, setMembers] = useState([{
		id: uuidv4(),
		m_pin: "",
		m_lastname: "",
		m_firstname: "",
		m_middlename: "",
		m_suffix: "",
		m_birthday: "",
		m_gender: "",
		m_category: "",
		m_relationship: "",
		date_registered: "",
		pin_type: "",
	}])
	const [dependent, setDependent] = useState([{
		id: uuidv4(),
		
		philhealth: "",
		lastname: "",
		firstname: "",
		middle: "",
		suffix: "",
		birthday: "",
		gender: "",
		relation_desc: "",
		date_registered: "",
		pin_type: "",
	}])
	const [dependents, setDependents] = useState([]);
	const updateItem = (id, field, value) => {
		setDependents((prevData) => {
			return prevData.map((data) => {
				let dep = data;
				if (data?.id == id) {
					dep[field] = value;
					return dep;
				}
				return data;
			});
		});
	};
	const removeItem = (id) => {
		setDependents((prevData) => prevData.filter((x) => x.id !== id));
	};
	
const handlePinClick = (data) => {
  setMembers((prev) => ({
    ...prev,
    m_pin: data?.mem_pin || '',
    m_lastname: data?.mem_lastname || '',
    m_firstname: data?.mem_firstname || '',
    m_middlename: data?.mem_middlename || '',
    m_suffix: data?.mem_suffix || '',
    m_birthday: data?.mem_birthday || '',
	m_gender: data?.mem_sex || '',
    m_category: data?.mem_categ_desc || '',
	m_relationship: data?.relation_desc || '',
	date_registered: data?.date_registered || '',
	pin_type: data?.pin_type || 'MM',
  }));
  setDependent({
    philhealth: '',
    lastname: '',
    firstname: '',
    middle: '',
    suffix: '',
	gender: '',
    birthday: '',
  });
};

const handleDepPinClick = (data) => {
  setMembers((prev) => ({
    ...prev,
    m_pin: data?.mem_pin || '', // Use the dependent's `pen` value here
    m_lastname: data?.mem_lastname || '',
    m_firstname: data?.mem_firstname || '',
    m_middlename: data?.mem_middlename || '',
    m_suffix: data?.mem_suffix || '',
    m_birthday: data?.mem_birthday || '',
	m_gender: data?.mem_sex || '',
    m_category: data?.mem_categ_desc || '',
	m_relationship: data?.relation_desc || '',
	pin_type: data?.pin_type || 'DD',
	date_registered: data?.date_registered || '',
  }));
  setDependent((prev) => ({
    ...prev,
    philhealth: data?.pen || '',
    lastname: data?.dep_lastname || '',
    firstname: data?.dep_firstname || '',
    middle: data?.dep_middlename || '',
    suffix: data?.dep_suffix || '',
    birthday: data?.dep_birthday || '',
	gender: data?.dep_sex || '',
	relationship: data?.relation_desc || '',
	pin_type: data?.pin_type || 'DD',
	date_registered: data?.date_registered || '',
  }));
};
useEffect(() => {
  // Prefer dependent.date_registered if available, otherwise fallback to members.date_registered
  const enlistmentDate = dependent.date_registered || members.date_registered || enlistment_date;

  if (enlistmentDate) {
    const year = new Date(enlistmentDate).getFullYear().toString();
    setValue("effective_year", year, { shouldValidate: true });
  } else {
    setValue("effective_year", "", { shouldValidate: true }); // clear if nothing is available
  }
}, [dependent.date_registered, members.date_registered, enlistment_date , setValue]);
useEffect(() => {
		let t = setTimeout(() => {
			setMount(1);
		}, 400);
		return () => {
			clearTimeout(t);
		};
	}, []);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setTimeout(() => {
			setDisplayDelayed(true);
		}, 1000);
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};
	useEffect(() => {
	setValue("patient_member_phic_type", dependent.philhealth ? "Dependent" : "Member");
	}, [dependent.philhealth, setValue]);
	useEffect(() => {
    setValue("philhealth", dependent.philhealth || members.m_pin);
	}, [dependent.philhealth, members.m_pin, setValue]);
	useEffect(() => {
    setValue("lastname", dependent.lastname || members.m_lastname);
	}, [dependent.lastname, members.m_lastname, setValue]);
	useEffect(() => {
		setValue("firstname", dependent.firstname || members.m_firstname);
	}, [dependent.firstname, members.m_firstname, setValue]);
	useEffect(() => {
		setValue("middle", dependent.middle || members.m_middlename);
	}, [dependent.middle, members.m_middlename, setValue]);
	useEffect(() => {
		setValue("suffix", dependent.suffix || members.m_suffix);
	}, [dependent.suffix, members.m_suffix, setValue]);
	useEffect(() => {
    if (dependent.birthday || members.m_birthday) {
        setValue("birthdate", dependent.birthday || members.m_birthday);
    }
	}, [dependent.birthday, members.m_birthday, setValue]);
	useEffect(() => {
		setValue("gender", dependent.gender || members.m_gender);
	}, [dependent.gender, members.m_gender, setValue]);

	const submitForm = (data) => {
		setLoading(true);
		// console.log("submitform", dependents, data);
		console.log("submitform", members, data);
		let formdata = new FormData();
		const file = dataURItoBlob(patientSelfie);
		
		formdata.append("avatar", file);
		formdata.append("prefix", data?.prefix || " ");
		formdata.append("enlistment_date", data?.enlistment_date || " ");
		formdata.append("package_type", data?.package_type || " ");
		formdata.append("effective_year", data?.effective_year || " ");
		formdata.append("consent", data?.consent);
		formdata.append("suffix", data?.suffix || " ");
		formdata.append("firstname", data?.firstname || " ");
		formdata.append("lastname", data?.lastname || " ");
		formdata.append("middle", data?.middle || " ");
		formdata.append("gender", data?.gender || " ");
		
		formdata.append(
			"birthdate",
			// data?.birthday
			formatDateYYYYMMDD(new Date(data?.birthdate))
		);
		formdata.append("birthplace", data?.birthplace || " ");
		formdata.append("barangay", data?.barangay || " ");
		formdata.append("city", data?.municipality || " ");
		formdata.append("civil_status", data?.civil_status || " ");
		formdata.append("blood_type", data?.blood_type || " ");
		formdata.append("philhealth", data?.philhealth || " ");
		formdata.append("patient_member_phic_type", data?.patient_member_phic_type || " ");
		formdata.append("mobile", data?.mobile || " ");
		formdata.append("telephone", data?.telephone || " ");
		formdata.append("religion", data?.religion || " ");
		formdata.append("educational_attainment", data?.educational_attainment || " ");
		formdata.append("ip_type", data?.ip_type || " ");
		formdata.append("mother_firstname", data?.mother_firstname || " ");
		formdata.append("mother_lastname", data?.mother_lastname || " ");
		formdata.append("mother_middlename", data?.mother_middlename || " ");
		formdata.append("country", "PH");
		// formdata.append("region", "SOCSKSARGEN Region");
		formdata.append("province", data?.province || " ");
		formdata.append("municipality", data?.municipality || " ");
		formdata.append("zip_code", data?.zip_code || "");
		formdata.append("street", data?.street || " ");
		formdata.append("floor", data?.floor || " ");
		formdata.append("subdivision", data?.subdivision || " ");
		formdata.append("house_number", data?.house_number || " ");
		formdata.append("purok", data?.purok || " ");
		formdata.append("lat", data?.lat || " ");
		formdata.append("lng", data?.lng || " ");
		formdata.append("tin", data?.tin || " ");
		formdata.append("region", data?.region || " ");
		formdata.append("unit", data?.unit || " ");
		
		formdata.append("mailing_region", data?.mailing_region || " ");
		formdata.append("mailing_province", data?.mailing_province || " ");
		formdata.append("mailing_municipality", data?.mailing_municipality || "");
		formdata.append("mailing_barangay", data?.mailing_barangay || " ");
		formdata.append("mailing_purok", data?.mailing_purok || " ");
		formdata.append("mailing_zip", data?.mailing_zip || " ");
		formdata.append("mailing_unit", data?.mailing_unit || " ");
		formdata.append("mailing_house_number", data?.mailing_house_number || " ");
		formdata.append("mailing_street", data?.mailing_street || " ");
		formdata.append("mail_subdivision", data?.mail_subdivision || " ");
		formdata.append("mailing_country", data?.mailing_country || " ");

		formdata.append("profession", data?.profession || " ");
		formdata.append("salary", data?.salary || " ");
		formdata.append("direct_contributor", data?.direct_contributor || " ");
		formdata.append(
			"indirect_contributor",
			data?.indirect_contributor || " "
		);
		formdata.append("m_pin", members?.m_pin || " ");
		formdata.append("m_firstname", members?.m_firstname || " ");
		formdata.append("m_lastname", members?.m_lastname || " ");
		formdata.append("m_middlename", members?.m_middlename || " ");
		formdata.append("m_suffix", members?.m_suffix || " ");
		formdata.append("m_birthday", members?.m_birthday || " ");
		formdata.append("m_gender", members?.m_gender || " ");
		formdata.append("m_category", members?.m_category || " ");
		formdata.append("patient_relationship", data?.patient_relationship || " ");
		formdata.append("employer_pen", data?.employer_pen || " ");
		formdata.append("employer_name", data?.employer_name || " ");
		formdata.append("created_by", user?.id);

		dependents.map((dependent, index) => {
			// if (dependent?.firstname?.length > 0) {
			formdata.append(
				`patientDependents[${index}][firstname]`,
				dependent?.firstname || " "
			);
			formdata.append(
				`patientDependents[${index}][lastname]`,
				dependent?.lastname || " "
			);

			formdata.append(
				`patientDependents[${index}][middle_name]`,
				dependent?.middle_name || " "
			);
			formdata.append(
				`patientDependents[${index}][suffix]`,
				dependent?.suffix || " "
			);
			formdata.append(
				`patientDependents[${index}][relationship]`,
				dependent?.relationship || " "
			);
			// formdata.append(`patientDependents[]`, JSON.stringify(dependent));
			// formdata.append(`patientDependents[${index}]`, dependent);
			// }
		});
		Axios.post(`v1/pho/patients`, formdata, {})
			.then((res) => {
				// return resolve(res.data);
				setTimeout(() => {
					toast.success("Patient added successfully!");
					hide();
				}, 400);
				if (!noRedirect) {
					history.push(
						`/sph/app/bhs/patients/${res?.data?.data?.id}?new_appointment=true`
					);
				}
				if (onSuccess) {
					onSuccess();
				} else {
					 fetchData();
				}

				setLoading(false);
				
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				// return reject(err);
				 if (err?.response?.status === 409) {
            toast.error("Duplicate Entry!");
            return;
			}

			// ❗ Other errors
			console.log(err);
			toast.error("Something went wrong. Please try again.");
			});
	};
	console.log("Users Data", user)
	return (
		<Transition appear show={modalOpen} as={Fragment}>
			<Dialog as="div" className="" onClose={hide}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur z-20" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto !z-[100]">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full lg:max-w-6xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<div className="flex flex-col gap-y-4 relative">
									<div className="flex flex-col p-4 border-b">
										<span className="text-xl font-bold  text-blue-900">
											Registration Form
										</span>
										<span className="text-sm font-light text-blue-900 ">
											Complete form to register new patient
										</span>
									</div>
									<div className="px-4 pb-4">
										<div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
											<div className="col-span-12 flex items-center justify-center">
												<div className="bg-slate-200 rounded relative w-1/3 aspect-square overflow-hidden">
													<img
														src={patientSelfie}
														alt=""
														className="absolute top-0 left-0 w-full h-full"
													/>
												</div>
											</div>
											<div className="flex flex-col lg:col-span-12 gap-6">
												<CollapseDiv
													defaultOpen={true}
													title="I. PERSONAL DETAILS"
												>
													<div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4">
														<div className="lg:col-span-12">
															<div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
															<TextInputField
																label={
																	<>
																		Date Encounter
																		<span className="text-danger ml-1">
																			*
																		</span>
																	</>
																}
																className=""
																type="date"
																// error={
																// 	errors
																// 		?.enlistment_date
																// 		?.message
																// }
																value={dependent.date_registered || members.date_registered}
																{...register(
																	"enlistment_date",
																	// {
																	// 	required:
																	// 		"This field is required",
																	// }
																)}
															/>
																<Controller
																	name="package_type"
																	control={control}
																	rules={{
																	required: {
																		value: true,
																		message: "This field is required",
																	},
																	}}
																	render={({
																	field: { onChange, onBlur, value, name, ref },
																	fieldState: { error },
																	}) => (
																	<ReactSelectInputField
																		className="mb-3"
																		isClearable={true}
																		labelClassName="font-bold"
																		label={
																		<>
																			Package Type
																			<span className="text-danger ml-1">*</span>
																		</>
																		}
																		inputClassName=""
																		
																		ref={ref}
																		value={value}
																		onChange={(val) => {
																		console.log("onChangeonChange", val);
																		if (onChange) {
																			onChange(val);
																		}
																		}}
																		onBlur={onBlur}
																		error={error?.message}
																		placeholder="Select Package type"
																		options={packageType?.map((data) => ({
																		label: data?.label,
																		value: data?.value,
																		}))}
																	/>
																	)}
																/>
																<TextInputField
																label={
																	<>
																	Effectivity Year
																	{/* <span className="text-danger ml-1">*</span> */}
																	</>
																}
																className=""
																// error={errors?.effective_year?.message}
																disabled
																{...register("effective_year",
																// 	 {
																// 	required: "This field is required",
																// }
															)}
																/>
															</div>
																
																
															</div>
															<TextInputField
															label={
																<>
																	Philhealth Identification No.(PIN)
																	
																</>
															}
															placeholder="Pin..."
															className="lg:col-span-4"
															iconRight={"rr-search"}
															onIconRightClick={() => phicMembersListRef.current.show()}
															value={dependent.philhealth || members.m_pin}
															{...register("philhealth")} 
															/>
															<TextInputField
															label={
																<>
																Patient Type
																</>
															}
															placeholder="Member/Dependent..."
															className="lg:col-span-4"
															value={
																members?.pin_type === "MM"
																? "Member"
																: members?.pin_type === "DD"
																? "Dependent"
																: ""
															}
															disabled
															{...register("patient_member_phic_type")}
															/>
															<TextInputField
																label={
																	<>
																		TIN
																	</>
																}
																placeholder="TIN"
																className="lg:col-span-4"
																{...register(
																	"tin",
																)}
															/>
															<TextInputField
																label={
																	<>
																		Lastname
																		<span className="text-danger ml-1">
																			*
																		</span>
																	</>
																}
																placeholder="Lastname"
																className=" lg:col-span-4"
																error={
																	errors?.lastname
																		?.message
																}
																value={dependent.lastname || members.m_lastname}
																{...register(
																	"lastname",
																	{
																		required:
																			"This field is required",
																		
																	}
																)}
																
															/>
															<TextInputField
																label={
																	<>
																		Firstname
																		<span className="text-danger ml-1">
																			*
																		</span>
																	</>
																}
																placeholder="Firstname"
																className="lg:col-span-4"
																
																error={
																	errors
																		?.firstname
																		?.message
																}
																	value={dependent.firstname || members.m_firstname}
																{...register(
																	"firstname",
																	{
																		required:
																			"This field is required",
																	}
																)}
															/>
															<TextInputField
																label="Middlename"
																placeholder="Middlename"
																className="lg:col-span-2"
																value={dependent.middle_name || members.m_middle}
																{...register(
																	"middle",
																	{
																		required: false,
																	}
																)}
															/>
															<TextInputField
																label="Suffix"
																placeholder="Suffix"
																className="lg:col-span-2"
																value={dependent.suffix || members.m_suffix }
																{...register(
																	"suffix",
																	{
																		required: false,
																	}
																)}
															/>

															
															<TextInputField
																label={
																	<>
																		Birthdate
																		<span className="text-danger ml-1">
																			*
																		</span>
																	</>
																}
																placeholder="Birthdate"
																className="lg:col-span-4"
																type="date"
																
																error={
																	errors
																		?.birthdate
																		?.message
																}
																value={dependent.birthday || members.m_birthday }
																{...register(
																	"birthdate",
																	{
																		required:
																			"This field is required",
																	}
																)}
															/>
															<TextInputField
																label={
																	<>
																		Place of
																		birth
																		<span className="text-danger ml-1">
																			*
																		</span>
																	</>
																}
																placeholder="Place of birth"
																className="lg:col-span-8"
																error={
																	errors
																		?.birthplace
																		?.message
																}
																{...register(
																	"birthplace",
																	{
																		required:
																			"This field is required",
																	}
																)}
															/>
															{/* <TextInputField
																label={
																	<>
																		Blood Type
																	</>
																}
																placeholder="Blood Type"
																className="lg:col-span-2"
																error={
																	errors
																		?.blood_type
																		?.message
																}
																{...register(
																	"blood_type",
																	{
																		required:
																			"This field is required",
																	}
																)}
															/> */}
															<div className="lg:col-span-3">
																<Controller
																	name="gender"
																	control={control}
																	rules={{
																		required: {
																			value: true,
																			message: "This field is required",
																		},
																	}}
																	render={({
																		field: { onChange, onBlur, value, name, ref },
																		fieldState: { error },
																	}) => (
																		<ReactSelectInputField
																			className="mb-3"
																			isClearable={true}
																			labelClassName="font-bold"
																			label={
																				<>
																					Sex at Birth
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			inputClassName=""
																			ref={ref}
																			value={dependent.gender || members.m_gender || gender}
																		onChange={(
																			val
																		) => {
																			console.log(
																				"onChangeonChange",
																				val
																			);
																			setGender(
																				String(
																					val
																				).toLowerCase()
																			);
																			if (
																				onChange
																			) {
																				onChange(
																					val
																				);
																			}
																		}}
																			onBlur={onBlur}
																			error={error?.message}
																			placeholder="sex at birth"
																			options={genderOptions?.map((data) => ({
																							label: data?.label,
																							value: data?.value,
																						}))}
																		/>
																	)}
																/>
																
															</div>
															<div className="lg:col-span-3">
																<Controller
																	name="civil_status"
																	control={control}
																	rules={{
																		required: {
																			value: true,
																			message: "This field is required",
																		},
																	}}
																	render={({
																		field: { onChange, onBlur, value, name, ref },
																		fieldState: { error },
																	}) => (
																		<ReactSelectInputField
																			className="mb-3"
																			isClearable={true}
																			labelClassName="font-bold"
																			label={
																				<>
																					Civil Status
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			inputClassName=""
																			ref={ref}
																			value={
																			value
																		}
																		onChange={(
																			val
																		) => {
																			console.log(
																				"onChangeonChange",
																				val
																			);
																			setCivilStatus(
																				String(
																					val
																				).toLowerCase()
																			);
																			if (
																				onChange
																			) {
																				onChange(
																					val
																				);
																			}
																		}}
																			onBlur={onBlur}
																			error={error?.message}
																			placeholder="Civil Status"
																			options={civilStatusOptions?.map((data) => ({
																							label: data?.label,
																							value: data?.value,
																						}))}
																		/>
																	)}
																/>
															</div>
															<TextInputField
																label="Mobile Number"
																placeholder="Mobile Number"
																className="lg:col-span-3"
																{...register(
																	"mobile",
																	{
																		required: false,
																	}
																)}
															/>
															<TextInputField
															label="Telephone Number"
																placeholder="Telephone Number"
																className="lg:col-span-3"
																{...register(
																	"telephone",
																	{
																		required: false,
																	}
																)}
															/>
															<div className="lg:col-span-4">
																<Controller
																	name="religion"
																	control={control}
																	rules={{
																		required: {
																			value: true,
																			message: "This field is required",
																		},
																	}}
																	render={({
																		field: { onChange, onBlur, value, name, ref },
																		fieldState: { error },
																	}) => (
																		<ReactSelectInputField
																			className="mb-3"
																			isClearable={true}
																			labelClassName="font-bold"
																			label={
																				<>
																					Religion
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			inputClassName=""
																			ref={ref}
																			value={
																			value
																		}
																		onChange={(
																			val
																		) => {
																			console.log(
																				"onChangeonChange",
																				val
																			);
																			setReligion(
																				String(
																					val
																				).toLowerCase()
																			);
																			if (
																				onChange
																			) {
																				onChange(
																					val
																				);
																			}
																		}}
																			onBlur={onBlur}
																			error={error?.message}
																			placeholder="Religion"
																			options={religion_choices?.map((data) => ({
																							label: data?.label,
																							value: data?.value,
																						}))}
																		/>
																	)}
																/>
															</div>
															<div className="lg:col-span-4">
																<Controller
																	name="education_attainment"
																	control={control}
																	rules={{
																		required: {
																			value: true,
																			message: "This field is required",
																		},
																	}}
																	render={({
																		field: { onChange, onBlur, value, name, ref },
																		fieldState: { error },
																	}) => (
																		<ReactSelectInputField
																			className="mb-3"
																			isClearable={true}
																			labelClassName="font-bold"
																			label={
																				<>
																					Educational Attainment
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			inputClassName=""
																			ref={ref}
																			value={
																			value
																		}
																		onChange={(
																			val
																		) => {
																			console.log(
																				"onChangeonChange",
																				val
																			);
																			setEducation(
																				String(
																					val
																				).toLowerCase()
																			);
																			if (
																				onChange
																			) {
																				onChange(
																					val
																				);
																			}
																		}}
																			onBlur={onBlur}
																			error={error?.message}
																			placeholder="Educational Attainment"
																			options={educational_attainment?.map((data) => ({
																							label: data?.label,
																							value: data?.value,
																						}))}
																		/>
																	)}
																/>
															</div>
															<div className="lg:col-span-4">
																<Controller
																	name="ip_type"
																	control={control}
																	rules={{
																		required: {
																			value: true,
																			message: "This field is required",
																		},
																	}}
																	render={({
																		field: { onChange, onBlur, value, name, ref },
																		fieldState: { error },
																	}) => (
																		<ReactSelectInputField
																			className="mb-3"
																			isClearable={true}
																			labelClassName="font-bold"
																			label={
																				<>
																					Indigenous
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			inputClassName=""
																			ref={ref}
																			value={
																			value
																		}
																		onChange={(
																			val
																		) => {
																			console.log(
																				"onChangeonChange",
																				val
																			);
																			setIndigenous(
																				String(
																					val
																				).toLowerCase()
																			);
																			if (
																				onChange
																			) {
																				onChange(
																					val
																				);
																			}
																		}}
																			onBlur={onBlur}
																			error={error?.message}
																			placeholder="Indigenous Tribe"
																			options={ip_tribes?.map((data) => ({
																							label: data?.label,
																							value: data?.value,
																						}))}
																						
																		/>
																	)}
																/>
															</div>
															
														{/* Mothers information */}
														<div className="grid grid-cols-1 border p-2 rounded-md bg-slate-50 lg:grid-cols-12 gap-2 col-span-12">
															<div className="col-span-12 text-md font-bold -mb-2 text-black">
																MOTHER'S MAIDEN
																NAME
															</div>
															<TextInputField
																inputClassName="bg-white"
																label={
																	<>
																		Lastname
																		<span className="text-danger ml-1">
																			*
																		</span>
																	</>
																}
																placeholder="Lastname"
																className="lg:col-span-4"
																error={
																	errors
																		?.mother_lastname
																		?.message
																}
																{...register(
																	"mother_lastname",
																	{
																		required:
																			"This field is required",
																	}
																)}
															/>
															<TextInputField
																inputClassName="bg-white"
																label={
																	<>
																		Firstname
																		<span className="text-danger ml-1">
																			*
																		</span>
																	</>
																}
																placeholder="Firstname"
																className="lg:col-span-4"
																error={
																	errors
																		?.mother_firstname
																		?.message
																}
																{...register(
																	"mother_firstname",
																	{
																		required:
																			"This field is required",
																	}
																)}
															/>
															<TextInputField
																inputClassName="bg-white"
																label="Middlename"
																placeholder="Middlename"
																className="lg:col-span-4"
																{...register(
																	"mother_middlename",
																	{
																		required: false,
																	}
																)}
															/>
														</div>
														{/* employers information */}
														<div className="grid grid-cols-1 border p-2 rounded-md bg-sky-50 lg:grid-cols-12 gap-4 col-span-12">
															<div className="col-span-12 text-md font-bold -mb-2 text-black">
																MEMBER'S EMPLOYER INFORMATION
															</div>
															<div className="lg:col-span-12 flex flex-col gap-2">
																<TextInputField
																inputClassName="bg-white"
																label={
																	<>
																		Philhealth Employers Number (PEN)
																	</>
																}
																placeholder="Philhealth Employers Number (PEN)"
																className="w-1/4"
																{...register(
																	"employer_pen",
																	
																)}
																/>
																<TextInputField
																inputClassName="bg-white"
																label={
																	<>
																		Employer's Name
																	</>
																}
																placeholder="Employer's Name"
																{...register(
																	"employer_name",
																	
																)}
																/>
															</div>
															
														</div>
													</div>
												</CollapseDiv>
												
												<CollapseDiv
													defaultOpen={true}
													title="II. ADDRESS DETAILS"
												>
													<div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4">
														<div className="lg:col-span-12">
															{displayDelayed ? (
																<PickMapLocation
																	position={
																		position
																	}
																	setPosition={(
																		pos
																	) => {
																		setPosition(
																			{
																				lat: pos.lat,
																				lng: pos.lng,
																			}
																		);
																		setValue(
																			"lat",
																			pos?.lat
																		);
																		setValue(
																			"lng",
																			pos?.lng
																		);
																	}}
																/>
															) : (
																""
															)}
														</div>
														<TextInputField
															label={
																<>
																	Latitude
																	<span className="text-danger ml-1">
																		*
																	</span>
																</>
															}
															placeholder="Latitude"
															className="lg:col-span-6"
															error={
																errors?.latitude
																	?.message
															}
															{...register(
																"lat",
																{
																	required:
																		"This field is required",
																}
															)}
														/>
														<TextInputField
															label={
																<>
																	Longitude
																	<span className="text-danger ml-1">
																		*
																	</span>
																</>
															}
															placeholder="Longitude"
															className="lg:col-span-6"
															error={
																errors
																	?.longitude
																	?.message
															}
															{...register(
																"lng",
																{
																	required:
																		"This field is required",
																}
															)}
														/>
														<div className="lg:col-span-12">
															<div className="lg:max-w-5xl mx-auto border m-4 mb-6 rounded-xl shadow">
																<div className="border-b p-4 font-bold bg-slate-100 rounded-t-xl">
																	<span>Permanent Address</span>
																</div>
																<div className="px-4">
																<div
																	className="p-4 gap-4 grid grid-cols-1 lg:grid-cols-12"
																>
																<div className="lg:col-span-4">
            <Controller
              name="region"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "This field is required",
                },
              }}
              render={({
                field: {
                  onChange,
                  onBlur,
                  value,
                  name,
                  ref,
                },
                fieldState:
                  {
                    invalid,
                    isTouched,
                    isDirty,
                    error,
                  },
              }) => (
                <ReactSelectInputField
                  isClearable={false}
                  label={<>Select Region
                      <span className="text-danger ml-1">*</span></>
                  }
                  {...register("region", {
                    required: "This field is required",
                  })}
                  inputClassName=" "
                  ref={ref}
                  value={value}
                  onChange={onChange}
                  // onChangeGetData={(data) => {
                  //   setProvinceList(Object.keys(data.province_list).map((key) => {
                  //         return {
                  //           name: key,
                  //           ...data
                  //             .province_list[key],
                  //         };
                  //       }
                  //     )
                  //   );
                  // }} // send value to hook form
                  onChangeGetData={(data) => {
                    setProvinceList(Object.keys(data.province_list).map((key) => ({
                      name: key,
                      ...data.province_list[key],
                    })));
                    console.log("Selected data:", data);
                    if (data.value === previousRegion.current) {
                      console.log("Same region selected, fields not cleared.");
                      return;
                    }
                
                    previousRegion.current = data.value;
                    console.log("Region changed to:", data.value);
                
                    setValue("province", "");
                    setValue("municipality", "");
                    setValue("barangay", "");
                    setValue("purok", "");
                    setValue("zip_code", "");
                    setValue("subdivision", "");
                    setValue("street", "");
                    setValue("house_number", "");
                    setValue("unit_floor", "");
                
                    console.log("All dependent fields cleared");

                    const regionCode = Object.keys(geolocations).find(key => geolocations[key].region_name === data.value);
                  
                    if (regionCode) {
                      const selectedRegion = geolocations[regionCode];
                      console.log("Selected region:", selectedRegion);
                  
                      if (selectedRegion && selectedRegion.lat !== undefined && selectedRegion.lng !== undefined) {
                        setValue('lat', selectedRegion.lat);
                        setValue('lng', selectedRegion.lng);
                        setPosition({ lat: selectedRegion.lat, lng: selectedRegion.lng });
                      } else {
                        console.error("Latitude and longitude not found for selected region");
                      }
                    } else {
                      console.error("Region code not found for selected region");
                    }
                  }}
                  onBlur={onBlur} // notify when input is touched
                  error={error?.region?.message}
                  placeholder="Select Region"
                  options={Object.values(geolocations).map((loc) => ({
                      value: loc?.region_name,
                      label: loc?.region_name,
                      province_list: loc?.province_list,
                    })
                  )}
                />
              )}
            />
																	</div>
																	<div className="lg:col-span-4">
																		<Controller
																		name="province"
																		control={
																			control
																		}
																		rules={{
																			required: {
																			value: true,
																			message:
																				"This field is required",
																			},
																		}}
																		render={({
																			field: {
																			onChange,
																			onBlur,
																			value,
																			name,
																			ref,
																			},
																			fieldState:
																			{
																				invalid,
																				isTouched,
																				isDirty,
																				error,
																			},
																		}) => (
																			<ReactSelectInputField
																			isClearable={false}
																			label={<>Select Province<span className="text-danger ml-1">*</span></>}
																			{...register("province", {required: "This field is required",})}
																			inputClassName=" "
																			ref={ref}
																			value={value}
																			onChange={onChange} // send value to hook form
																			// onChangeGetData={(data) => {
																			//   setMunicipalityList(
																			//     Object.keys(data.municipality_list).map((key) => {
																			//         return {
																			//           name: key,
																			//           ...data
																			//             .municipality_list[key],
																			//         };
																			//       }
																			//     )
																			//   );
																			// }}
																			onChangeGetData={(data) => {
																				setMunicipalityList(
																				Object.keys(data.municipality_list || {}).map((key) => ({
																					name: key,
																					...data.municipality_list[key],
																				}))
																				);

																				const provinceName = data.value.toUpperCase();
																				// const geoRegions = geolocations["12"];
																				// const provinceData = geoRegions.province_list[provinceName];
																				let provinceData = null;

																				for (const regionKey in geolocations) {
																				if (geolocations.hasOwnProperty(regionKey)) {
																					const geoRegion = geolocations[regionKey];
																					
																					if (geoRegion.province_list && geoRegion.province_list[provinceName]) {
																					provinceData = geoRegion.province_list[provinceName];
																					break; 
																					}
																				}
																				}
																			
																				if (provinceData && provinceData.lat && provinceData.lng) {
																				setValue("lat", provinceData.lat);
																				setValue("lng", provinceData.lng);
																				setPosition({ lat: provinceData.lat, lng: provinceData.lng });
																				} else {
																				console.error(
																					`Latitude and longitude not found for the selected province: ${data.value}`
																				);
																				}

																				if (data.value === previousProvince.current) {
																				console.log("Same province selected, fields not cleared.");
																				return;
																				}
																			
																				previousProvince.current = data.value;
																				console.log("Province changed to:", data.value);
																			
																				setValue("municipality", "");
																				setValue("barangay", "");
																				setValue("purok", "");
																				setValue("zip_code", "");
																				setValue("subdivision", "");
																				setValue("street", "");
																				setValue("house_number", "");
																				setValue("unit_floor", "");
																			
																				console.log("All dependent fields cleared");
																			}}                  
																			onBlur={onBlur} // notify when input is touched
																			error={error?.message}
																			placeholder="Select Province"
																			options={provinceList.map((province) => ({
																				label: province?.name,
																				value: province?.name,
																				municipality_list:
																					province?.municipality_list,
																				})
																			)}
																			/>
																		)}
																		/>
																	</div>
																	<div className="lg:col-span-4">
																		<Controller
																		name="municipality"
																		control={control}
																		rules={{
																			required: {
																			value: true,
																			message:
																				"This field is required",
																			},
																		}}
																		render={({
																			field: {
																			onChange,
																			onBlur,
																			value,
																			name,
																			ref,
																			},
																			fieldState:
																			{
																				invalid,
																				isTouched,
																				isDirty,
																				error,
																			},
																		}) => (
																			<ReactSelectInputField
																			isClearable={false}
																			label={<>Select Municipality<span className="text-danger ml-1">*</span></>}
																			{...register("municipality", {
																				required: "This field is required",
																			})}
																			placeholder="Select Municipality"
																			inputClassName="normal-case"
																			ref={ref}
																			value={value}
																			onChange={(data) => {
																				let selected_ = locations?.find((x) =>
																				String(x.name).toLowerCase() == String(data).toLowerCase());
																				console.log("selected_selected_", String(data).toLowerCase(), selected_);
																				// setBrgys(
																				// 	selected_?.barangays
																				// );
																				setValue("zip_code", selected_?.zipcode || "");
																				onChange(data);
																			}} 
																			onChangeGetData={(data) => {
																				setBrgys(
																				data.barangay_list.map((barangay) => ({
																					name: barangay,
																				}))
																				);
																			
																				const municipalityName = data.value.trim().toUpperCase();
																				const selectedProvince = watch("province");
																				const provinceName = selectedProvince ? selectedProvince.trim().toUpperCase() : "";
																			
																				// const municipalityData = geolocations["12"].province_list.SARANGANI.municipality_list[municipalityName];
																				// const provinceData = geolocations["12"].province_list[provinceName];
																				// const municipalityData = provinceData.municipality_list[municipalityName];

																				let municipalityData = null;

																				for (const regionKey in geolocations) {
																				const regionData = geolocations[regionKey]?.province_list[provinceName];
																				if (regionData) {
																					municipalityData = regionData.municipality_list[municipalityName];
																					if (municipalityData) {
																					break;
																					}
																				}
																				}
																				
																				if (municipalityData && municipalityData.lat && municipalityData.lng) {
																				setValue("lat", municipalityData.lat);
																				setValue("lng", municipalityData.lng);
																				setPosition({ lat: municipalityData.lat, lng: municipalityData.lng });
																				} else {
																				console.error(
																					`Latitude and longitude not found for the selected municipality: ${data.value}`
																				);
																				}
																				
																				if (data.value === previousMunicipality.current) {
																				console.log("Same municipality selected, fields not cleared.");
																				return;
																				}
																		
																				previousMunicipality.current = data.value;
																				console.log("Municipality changed to:", data.value);
																		
																				setValue("barangay", "");
																				setValue("purok", "");
																				setValue("subdivision", "");
																				setValue("street", "");
																				setValue("house_number", "");
																				setValue("unit_floor", "");
																		
																				console.log("Dependent fields cleared");
																				
																			}}
																			onBlur={
																				onBlur
																			} // notify when input is touched
																			error={error?.message}
																			options={municipalityList.map((municipality) => ({
																				label: municipality?.name,
																				value: municipality?.name,
																				barangay_list:
																					municipality?.barangay_list,
																				})
																			)}
																			/>
																		)}
																		/>
																	</div>
																	<div className="lg:col-span-4">
																	<Controller
																		name="barangay"
																		control={control}
																		rules={{
																		required: {
																			value: true,
																			message: "This field is required",
																		},
																		}}
																		render={({
																		field: { onChange, onBlur, value, name, ref },
																		fieldState: { error },
																		}) => (
																		<ReactSelectInputField
																			isClearable={false}
																			label={<>Select Barangay<span className="text-danger ml-1">*</span></>}
																			ref={ref}
																			value={value}
																			onChange={(selectedBarangay) => {
																			const selectedMunicipality = locations.find(
																				(loc) => loc.name.toLowerCase() === watch("municipality")?.toLowerCase()
																			);

																			const matchingBarangay = selectedMunicipality?.barangays.find(
																				(b) => b.name.toLowerCase() === selectedBarangay?.toLowerCase()
																			);

																			setPuroks(
																				matchingBarangay?.puroks.map((purok) => ({
																				label: purok.name,
																				value: purok.name,
																				})) || []
																			);
																			
																			const matchingGeoBarangay = allFeatures.find(
																				(feature) =>
																				feature.properties.name.toLowerCase().includes(selectedBarangay?.toLowerCase()) // Use `includes()` for partial match
																			);
																			
																			console.log("Selected Barangay:", selectedBarangay);
																			console.log("Matching Geo Feature:", matchingGeoBarangay);
																			
																			if (matchingGeoBarangay) {
																				const { lat, lng } = matchingGeoBarangay.properties;
																			
																				console.log("Lat/Lng for selected barangay:", lat, lng);
																			
																				setValue("lat", lat);
																				setValue("lng", lng);
																			
																				setPosition({ lat, lng });
																			} else {
																				console.error(`Latitude and longitude not found for the selected barangay: ${selectedBarangay}`);
																			}
																			
																			if (selectedBarangay === previousBarangay.current) {
																				console.log("Same barangay selected, fields not cleared.");
																				return;
																			}
																	
																			previousBarangay.current = selectedBarangay;
																			console.log("Barangay changed to:", selectedBarangay);
																			onChange(selectedBarangay);
																	
																			setValue("purok", "");
																			setValue("subdivision", "");
																			setValue("street", "");
																			setValue("house_number", "");
																			setValue("unit_floor", "");
																	
																			console.log("Dependent fields cleared");
																			onchange(selectedBarangay);
																			}}
																			onBlur={onBlur}
																			placeholder="Select Barangay"
																			error={error?.message}
																			options={brgys.map((data) => ({
																			label: data?.name,
																			value: data?.name,
																			}))}
																		/>
																		)}
																	/>
																	</div>
										
																<TextInputField
																	label={<>Purok</>}
																	placeholder="Enter Purok"
																	className="lg:col-span-4"
																	error={
																		errors?.zip_code
																			?.message
																	}
																	{...register(
																		"purok",
																		{
																			required:
																				"This field is required",
																		}
																	)}
																/>
																<TextInputField
																	label={<>ZIPCODE</>}
																	placeholder="ZIPCODE"
																	className="lg:col-span-4"
																	error={
																		errors?.zip_code
																			?.message
																	}
																	{...register(
																		"zip_code",
																		{
																			required:
																				"This field is required",
																		}
																	)}
																/>
																<TextInputField
																	label={
																		<>
																			UNIT/Room
																			No./Floor
																		</>
																	}
																	placeholder="UNIT/Room No./Floor"
																	className="lg:col-span-6"
																	
																	{...register(
																		"unit",
																		
																	)}
																/>
																<TextInputField
																	label={
																		<>
																			Lot/Blk/phase/House
																			No.
																		</>
																	}
																	placeholder="Lot/Blk/phase/House No."
																	className="lg:col-span-6"
																	
																	{...register(
																		"house_number",
																	
																	)}
																/>

																<TextInputField
																	label={<>Street</>}
																	placeholder="Street"
																	className="lg:col-span-6"
																	
																	{...register(
																		"street",
																		
																	)}
																/>

																<TextInputField
																	label={
																		<>Subdivision</>
																	}
																	placeholder="Subdivision"
																	className="lg:col-span-6"

																	{...register(
																		"subdivision",

																	)}
																/>

																<TextInputField
																	label={
																		<>
																			State in /
																			Country (if
																			abroad)
																		</>
																	}
																	placeholder="State in / Country"
																	className="lg:col-span-6"
																	defaultValue={
																		"Philippines"
																	}
																	error={
																		errors?.country
																			?.message
																	}
																	{...register(
																		"country",
																		{
																			required:
																				"This field is required",
																		}
																	)}
																/>
																</div>
																</div>
															</div>
															<div className="lg:max-w-5xl mx-auto m-4 mb-6">
																<label className="flex items-center gap-1 font-light text-sm">
																	<input
																	type="checkbox"
																	checked={isSameAsPermanent}
																	onChange={(e) => {
																		setIsSameAsPermanent(e.target.checked);
																		if (e.target.checked) {
																		// Manually update form state with permanent address values
																		setValue("mailing_region", permanentRegion);
																		setValue("mailing_province", permanentProvince);
																		setValue("mailing_municipality", permanentMunicipality);
																		setValue("mailing_barangay", permanentBarangay);
																		setValue("mailing_purok", permanentPurok);
																		setValue("mailing_zip", permanentZip);
																		setValue("mailing_unit", permanentUnit);
																		setValue("mailing_house_number", permanentLot);
																		setValue("mailing_street", permanentStreet);
																		setValue("mail_subdivision", permanentSubdivision);
																		setValue("mailing_country", permanentCountry);
																		} else {
																		// Clear the mailing address fields when unchecked
																		setValue("mailing_region", null);
																		setValue("mailing_province", null);
																		setValue("mailing_municipality", null);
																		setValue("mailing_barangay", null);
																		setValue("mailing_purok", null);
																		setValue("mailing_zip", null);
																		setValue("mailing_unit", null);
																		setValue("mailing_house_number", null);
																		setValue("mailing_street", null);
																		setValue("mail_subdivision", null);
																		setValue("mailing_country", null);
																		}
																	}}
																	/>
																	Same as Permanent Address
																</label>
																</div>
															
														
															<div className="lg:max-w-5xl mx-auto border m-4 mb-6 rounded-xl shadow">
															<div className="border-b p-4 font-bold bg-slate-100 rounded-t-xl">
																<span>Mailing Address</span>
															</div>
															<div className="px-4">
															<div
																className="p-4 gap-4 grid grid-cols-1 lg:grid-cols-12"
															>
															<div className="lg:col-span-4">
																<Controller
																	name="mailing_region"
																	control={
																		control
																	}
																	rules={{
																		required: {
																			value: true,
																			message:
																				"This field is required",
																		},
																	}}
																	render={({
																		field: {
																			onChange,
																			onBlur,
																			value,
																			name,
																			ref,
																		},
																		fieldState:
																			{
																				invalid,
																				isTouched,
																				isDirty,
																				error,
																			},
																	}) => (
																		<ReactSelectInputField
																			isClearable={
																				false
																			}
																			label={
																				<>
																					Select
																					Region
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			inputClassName=" "
																			ref={
																				ref
																			}
																			value={
																				value
																			}
																			onChange={
																				onChange
																			}
																			onChangeGetData={(
																				data
																			) => {
																				setProvinceList(
																					Object.keys(
																						data.province_list
																					).map(
																						(
																							key
																						) => {
																							return {
																								name: key,
																								...data
																									.province_list[
																									key
																								],
																							};
																						}
																					)
																				);
																			}} // send value to hook form
																			onBlur={
																				onBlur
																			} // notify when input is touched
																			error={
																				error?.message
																			}
																			placeholder="Select Province"
																			options={Object.values(
																				geolocations
																			).map(
																				(
																					loc
																				) => ({
																					value: loc?.region_name,
																					label: loc?.region_name,
																					province_list:
																						loc?.province_list,
																				})
																			)}
																		/>
																	)}
																/>
															</div>
															<div className="lg:col-span-4">
																<Controller
																	name="mailing_province"
																	control={
																		control
																	}
																	rules={{
																		required: {
																			value: true,
																			message:
																				"This field is required",
																		},
																	}}
																	render={({
																		field: {
																			onChange,
																			onBlur,
																			value,
																			name,
																			ref,
																		},
																		fieldState:
																			{
																				invalid,
																				isTouched,
																				isDirty,
																				error,
																			},
																	}) => (
																		<ReactSelectInputField
																			isClearable={
																				false
																			}
																			label={
																				<>
																					Select
																					Province
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			inputClassName=" "
																			ref={
																				ref
																			}
																			value={
																				value
																			}
																			onChange={
																				onChange
																			} // send value to hook form
																			onChangeGetData={(
																				data
																			) => {
																				setMunicipalityList(
																					Object.keys(
																						data.municipality_list
																					).map(
																						(
																							key
																						) => {
																							return {
																								name: key,
																								...data
																									.municipality_list[
																									key
																								],
																							};
																						}
																					)
																				);
																			}}
																			onBlur={
																				onBlur
																			} // notify when input is touched
																			error={
																				error?.message
																			}
																			placeholder="Select Province"
																			options={provinceList.map(
																				(
																					province
																				) => ({
																					label: province?.name,
																					value: province?.name,
																					municipality_list:
																						province?.municipality_list,
																				})
																			)}
																		/>
																	)}
																/>
															</div>
															<div className="lg:col-span-4">
																<Controller
																	name="mailing_municipality"
																	control={
																		control
																	}
																	rules={{
																		required: {
																			value: true,
																			message:
																				"This field is required",
																		},
																	}}
																	render={({
																		field: {
																			onChange,
																			onBlur,
																			value,
																			name,
																			ref,
																		},
																		fieldState:
																			{
																				invalid,
																				isTouched,
																				isDirty,
																				error,
																			},
																	}) => (
																		<ReactSelectInputField
																			isClearable={
																				false
																			}
																			label={
																				<>
																					Select
																					Municipality
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			placeholder="Select Municipality"
																			inputClassName="normal-case"
																			ref={
																				ref
																			}
																			value={
																				value
																			}
																			onChange={(
																				data
																			) => {
																				let selected_ =
																					locations?.find(
																						(
																							x
																						) =>
																							String(
																								x.name
																							).toLowerCase() ==
																							String(
																								data
																							).toLowerCase()
																					);
																				console.log(
																					"selected_selected_",
																					String(
																						data
																					).toLowerCase(),
																					selected_
																				);
																				// setBrgys(
																				// 	selected_?.barangays
																				// );
																				setValue(
																					"mailing_zip",
																					selected_?.zipcode ||
																						""
																				);
																				onChange(
																					data
																				);
																			}} // send value to hook form
																			onChangeGetData={(
																				data
																			) => {
																				setBrgys(
																					data.barangay_list.map(
																						(
																							key
																						) => {
																							return {
																								name: key,
																							};
																						}
																					)
																				);
																			}}
																			onBlur={
																				onBlur
																			} // notify when input is touched
																			error={
																				error?.message
																			}
																			options={municipalityList.map(
																				(
																					municipality
																				) => ({
																					label: municipality?.name,
																					value: municipality?.name,
																					barangay_list:
																						municipality?.barangay_list,
																				})
																			)}
																		/>
																	)}
																/>
															</div>
															<div className="lg:col-span-4">
																<Controller
																	name="mailing_barangay"
																	control={
																		control
																	}
																	rules={{
																		required: {
																			value: true,
																			message:
																				"This field is required",
																		},
																	}}
																	onChange={(
																		data
																	) => {}}
																	render={({
																		field: {
																			onChange,
																			onBlur,
																			value,
																			name,
																			ref,
																		},
																		fieldState:
																			{
																				invalid,
																				isTouched,
																				isDirty,
																				error,
																			},
																	}) => (
																		<ReactSelectInputField
																			isClearable={
																				false
																			}
																			label={
																				<>
																					Select
																					Barangay
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			inputClassName=" "
																			ref={
																				ref
																			}
																			value={
																				value
																			}
																			onChange={(
																				data
																			) => {
																				let selected_ =
																					brgys?.find(
																						(
																							x
																						) =>
																							x.name ==
																							data
																					);
																				setPuroks(
																					selected_?.puroks
																				);
																				onChange(
																					data
																				);
																			}} // send value to hook form
																			onBlur={
																				onBlur
																			} // notify when input is touched
																			error={
																				error?.message
																			}
																			placeholder="Select Barangay"
																			options={brgys.map(
																				(
																					data
																				) => ({
																					label: data?.name,
																					value: data?.name,
																				})
																			)}
																		/>
																	)}
																/>
															</div>
									
															<TextInputField
																label={<>Purok</>}
																placeholder="Enter Purok"
																className="lg:col-span-4"
																error={
																	errors?.mailing_purok
																		?.message
																}
																{...register(
																	"mailing_purok",
																	{
																		required:
																			"This field is required",
																	}
																)}
															/>
															<TextInputField
																label={<>ZIPCODE</>}
																placeholder="ZIPCODE"
																className="lg:col-span-4"
																error={
																	errors?.mailing_zip
																		?.message
																}
																{...register(
																	"mailing_zip",
																	{
																		required:
																			"This field is required",
																	}
																)}
															/>
															<TextInputField
																label={
																	<>
																		UNIT/Room
																		No./Floor
																	</>
																}
																placeholder="UNIT/Room No./Floor"
																className="lg:col-span-6"
																
																{...register(
																	"mailing_unit",
																	
																)}
															/>
															<TextInputField
																label={
																	<>
																		Lot/Blk/phase/House
																		No.
																	</>
																}
																placeholder="Lot/Blk/phase/House No."
																className="lg:col-span-6"
																
																{...register(
																	"mailing_house_number",
																	
																)}
															/>

															<TextInputField
																label={<>Street</>}
																placeholder="Street"
																className="lg:col-span-6"
																
																{...register(
																	"mailing_street",
																	
																)}
															/>

															<TextInputField
																label={
																	<>Subdivision</>
																}
																placeholder="Subdivision"
																className="lg:col-span-6"
																
																{...register(
																	"mail_subdivision",
																	
																)}
															/>

															<TextInputField
																label={
																	<>
																		State in /
																		Country (if
																		abroad)
																	</>
																}
																placeholder="State in / Country"
																className="lg:col-span-6"
																defaultValue={
																	"Philippines"
																}
																error={
																	errors?.mailing_country
																		?.message
																}
																{...register(
																	"mailing_country",
																	{
																		required:
																			"This field is required",
																	}
																)}
															/>
															</div>
															</div>
															</div>
															
														</div>
													
													</div>
												</CollapseDiv>
												<CollapseDiv
													defaultOpen={false}
													title="III. DECLARATION OF DEPENDENTS"
												>
													<div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4">
														{dependents?.map(
															(data, i) => {
																return (
																	<div
																		className="col-span-12 border rounded-md p-3 gap-4 grid grid-cols-1 lg:grid-cols-12 relative"
																		key={`dpdnts-${i}`}
																	>
																		<div
																			className="bg-red-500 text-white py-1 px-2 rounded absolute top-0 right-0 text-xs cursor-pointer"
																			onClick={() => {
																				removeItem(
																					data?.id
																				);
																			}}
																		>
																			Remove
																		</div>
																		<TextInputField
																			label={
																				<>
																					Lastname
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			placeholder="Lastname"
																			className="lg:col-span-4"
																			 value={dependent.lastname || ""}
																			onChange={(
																				e
																			) => {
																				updateItem(
																					data?.id,
																					"lastname",
																					e
																						.target
																						.value
																				);
																			}}
																		/>
																		<TextInputField
																			label={
																				<>
																					Firstname
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			placeholder="Firstname"
																			className="lg:col-span-4"
																			value={dependent.firstname || ""}
																			onChange={(
																				e
																			) => {
																				updateItem(
																					data?.id,
																					"firstname",
																					e
																						.target
																						.value
																				);
																			}}
																		/>
																		<TextInputField
																			label="Middlename"
																			placeholder="Middlename"
																			className="lg:col-span-2"
																			value={dependent.middle_name || ""}
																			onChange={(
																				e
																			) => {
																				updateItem(
																					data?.id,
																					"middle_name",
																					e
																						.target
																						.value
																				);
																			}}
																		/>
																		<TextInputField
																			label="Suffix"
																			placeholder="Suffix"
																			className="lg:col-span-2"
																			value={dependent.suffix || ""}
																			onChange={(
																				e
																			) => {
																				updateItem(
																					data?.id,
																					"suffix",
																					e
																						.target
																						.value
																				);
																			}}
																		/>
																		<div className="lg:col-span-4">
																			<ReactSelectInputField
																				isClearable={
																					false
																				}
																				label={
																					<>
																						Relationship
																					</>
																				}
																				inputClassName=" "
																				onChange={(
																					valData
																				) => {
																					console.log(
																						"onChangeonChange",
																						valData
																					);
																					updateItem(
																						data?.id,
																						"relationship",
																						valData
																					);
																				}} // send value to hook form
																				value={
																					data?.relationship
																				}
																				placeholder="Select..."
																				
																				options={relationshipOptions.map(
																					(
																						data
																					) => ({
																						label: data?.label,
																						value: data?.value,
																					})
																				)}
																			/>
																		</div>
																	</div>
																);
															}
														)}
														<div className="lg:col-span-12 flex items-center justify-center">
															<ActionBtn
																type="accent"
																onClick={() => {
																	setDependents(
																		(
																			prevDependents
																		) => [
																			...prevDependents,
																			{
																				id: uuidv4(),
																				lastname:
																					"",
																				firstname:
																					"",
																				middle_name:
																					"",
																				suffix: "",
																				relationship:
																					"",
																			},
																		]
																	);
																}}
															>
																Add dependents
															</ActionBtn>
														</div>
													</div>
												</CollapseDiv>
												<CollapseDiv
													defaultOpen={true}
													title="IV. MEMBER INFORMATION"
												>
													<div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
														<div className="w-1/4 lg:col-span-12">
																<TextInputField
																	label={
																		<>
																			Member Pin
																			
																		</>
																	}
																	placeholder="Member Pin"
																	className="lg:col-span-4"
																	value={members.m_pin}
																	disabled
																	onChange={(e) =>
																		setMembers((prev) => ({ ...prev, m_pin: e.target.value }))
																	}
																	{...register(
																		"m_pin",
																	)}
																/>
														</div>
														<>
																	<TextInputField
																label={
																	<>
																		Member's Lastname
																		
																	</>
																}
																placeholder="Member's  Lastname"
																className="lg:col-span-4"
																disabled
																value={members.m_lastname}
																onChange={(e) =>
																		setMembers((prev) => ({ ...prev, m_lastname: e.target.value }))
																	}
																{...register(
																		"m_lastname",
																	)}
															/>
															<TextInputField
																label={
																	<>
																		Member's  Firstname
																		
																	</>
																}
																placeholder="Member's  Firstname"
																className="lg:col-span-4"
																disabled
																value={members.m_firstname}
																onChange={(e) =>
																		setMembers((prev) => ({ ...prev, m_firstname: e.target.value }))
																	}
																{...register(
																		"m_firstname",
																	)}
															/>
															<TextInputField
																label="Member's  Middlename"
																placeholder="Member's  Middlename"
																className="lg:col-span-2"
																disabled
																value={members.m_middlename}
																onChange={(e) =>
																		setMembers((prev) => ({ ...prev, m_middlename: e.target.value }))
																	}
																	{...register(
																		"m_middlename",
																	)}
															/>
															<TextInputField
																label="Member's  Suffix"
																placeholder="Member's  Suffix"
																className="lg:col-span-2"
																disabled
																value={members.m_suffix}
																onChange={(e) =>
																		setMembers((prev) => ({ ...prev, m_suffix: e.target.value }))
																	}
																	{...register(
																		"m_suffix",
																	)}
															/>
															<TextInputField
																label={
																	<>
																		Gender
																	</>
																}
																placeholder="Gender"
																className="lg:col-span-2"
																disabled
																value={members.m_gender || dependent.gender}
																onChange={(e) =>
																		setMembers((prev) => ({ ...prev, m_gender: e.target.value }))
																	}
																{...register(
																		"m_gender",
																	)}
															/>
															<TextInputField
																label={
																	<>
																		Member's Birthdate
																		
																	</>
																}
																className="lg:col-span-2"
																type="date"
																disabled
																value={members.m_birthday}
																onChange={(e) =>
																		setMembers((prev) => ({ ...prev, m_birthday: e.target.value }))
																	}
																	{...register(
																		"m_birthday",
																	)}
															/>
														</>
														<TextInputField
																label={
																	<>
																		Member's Type
																		
																	</>
																}
																placeholder="Member's  Firstname"
																className="lg:col-span-8"
																disabled
																value={members.m_category}
																onChange={(e) =>
																		setMembers((prev) => ({ ...prev, m_category: e.target.value }))
																	}
																{...register(
																		"m_category",
																	)}
															/>
															<TextInputField
																label={
																	<>
																		Relationship
																	</>
																}
																placeholder="Relationship to patient"
																className="lg:col-span-4"
																disabled
																value={members.m_relationship || dependent.relation_desc}
																onChange={(e) =>
																		setMembers((prev) => ({ ...prev, m_relationship: e.target.value }))
																	}
																{...register(
																		"patient_relationship",
																	)}
															/>
															
																	
													</div>
													
												</CollapseDiv>
												
										
											</div>
										</div>
									</div>
								</div>
								<div className="lg:col-span-12 p-4 flex justify-center">
									<RadioInput
										error={errors?.consent}
										inputContainerClassName="flex-col items-center text-black"  // Make sure content is centered
									>
										{[
										{
											label: "Yes,",
											value: "Yes",
										},
										].map((option, indx) => (
										<label
											className="flex mr-auto gap-2 font-light text-sm justify-center items-center"
											key={`chk-${option?.value}`}
										>
											<input
											type="checkbox" // Changed to checkbox
											value={option?.value}
											id={`ichk-${option?.value}`}
											{...register("consent", {
												required: {
												value: true,
												message: "This field is required.",
												},
											})}
											/>
											{option?.label}
										</label>
										))}
									</RadioInput>
									<span className="italic text-sm text-green-600 font-semibold ml-2">I agree to Register!</span>
									</div>
								<div className="px-4 py-2 flex items-center justify-center bg-slate-100 border-t">
									{/* <ActionBtn
										type="foreground-dark"
										className="ml-auto uppercase"
										onClick={hide}
									>
										Read more...
									</ActionBtn> */}
									<ActionBtn
										// type="danger"
										loading={loading}
										className="ml-4 "
										disabled={!consent} 
										onClick={handleSubmit(submitForm)}
									>
										SUBMIT
									</ActionBtn>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
					<PhilhealthMasterlistModal 
					// appointment={order}
					ref={phicMembersListRef}
					onPinClick={handlePinClick}
					onDepPinClick={handleDepPinClick}
					/>
				</div>
			</Dialog>
		</Transition>
	);
};

export default forwardRef(NewPatientFormModal);
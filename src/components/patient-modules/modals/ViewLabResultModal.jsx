/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import {
	Fragment,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
	dataURItoBlob,
	formatDateMMDDYYYY,
	formatDateMMDDYYYYHHIIA,
	formatDateTime,
	formatDateYYYYMMDD,
	patientFullName,
} from "../../../libs/helpers";
import ActionBtn from "../../buttons/ActionBtn";
import Axios from "../../../libs/axios";
import useNoBugUseEffect from "../../../hooks/useNoBugUseEffect";
import QRCode from "qrcode.react";

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
const Status = ({ status }) => {
	const color = () => {
		switch (status) {
			case "pending":
				return " text-red-700";
			case "for-result-reading":
				return " text-blue-700";
			default:
				return " text-white";
		}
	};
	return (
		<span
			className={`${color()} px-2 italic text-center rounded-2xl text-xs py-[2px]`}
		>
			{status}
		</span>
	);
};

const ViewLabResultModal = (props, ref) => {
	const {
		showTitle = true,
		appointment,
		patient,
		laboratory_test_type,
		allowCreate = true,
		onUploadLabResultSuccess,
		order_id,
		onSuccess,
	} = props;
	const {
		register,
		getValues,
		watch,
		control,
		setValue,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [showData, setShowData] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [full, setFull] = useState(false);
	const [tests, setTests] = useState([]);
	useNoBugUseEffect({
		functions: () => {},
	});
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setFull(false);
		setShowData(data);
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};
	 const imageView = `${import.meta.env.VITE_IMG_URL}`  + (
		showData?.attachment
	 );
	console.log("Laboratory Result Data", showData)
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
					<div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur z-[300]" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto !z-[350]">
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
							<Dialog.Panel
							className={`w-full transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all ${
									full
										? " lg:max-w-[60vw]"
										: " lg:max-w-[50vw]"
								} `}>
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									{/* <span className="text-xl text-center font-bold  text-blue-900">
										Laboratory Result
									</span> */}
								</Dialog.Title>
										<div className="flex flex-col-4 m-2">
											<div>
												<img
													src="/Province_of_Sarangani.png"
													className="w-24 h-24 object-contain mr-2"
												/>
											</div>
											<div className="">
											<div className="flex justify-center items-center my-4">
											
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
											<div className="text-sm text-center font-bold m-4">
												<span>CLINICAL LABORATORY DEPARTMENT</span>
											</div>
											<div className="text-base text-center font-bold m-4">
												<span>{
						laboratory_test_type == 1
							? "IMAGING RESULT"
							: "LABORATORY RESULT"
					}</span>
											</div>
										<div className="text-sm text-center font-bold m-4">
											<span>FACILITY</span>
										</div>

										</div>
										
						<div className="flex flex-col text-sm justify-end ml-auto">
							{/* <img 
							src="/sample_qr.png"
							className="w-24 h-24 ml-28"/> */}
							<QRCode
								value={`user-${showData?.scheduledBy?.username}`}
								className="justify-center m-4"
								level="H"
								size={90}
							/>
						
						<div className="text-2xl text-red-600 font-bold">{showData?.type?.name}</div>
						<div className="text-xl font-semibold ">{showData?.order_number}</div>
						<div className="font-light mb-0">
							{/* Date/Time of Test:  */}
							{formatDateTime(showData?.type?.created_at)}
						</div>
						</div>
										</div>
										
										<FormHeading title="" />
											<div className="flex items-center relative justify-center border-b-2  px-2 pt-2 pb-1">
												
												<div className="flex flex-col text-start w-full mx-auto">
												
														
												</div>
												<div className="flex flex-col text-center">
													
												</div>
											</div>

												

								<div className="p-6 flex flex-col gap-y-4 relative border-t-2">
									{showData?.type?.name == "GLUCOSE- FBS" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															{showData?.type?.name}
														</th>
														<td>
															{
																showData
																
																	?.fbs
															}{" "}
													
														</td>
														
														<td>
															mg/dL
														</td>
														
													
													</tr>
													<tr>
														<th className="capitalize">
														
														</th>
														<td>
															{
																showData
																
																	?.fbs_mmol
															}{" "}
													
														</td>
														
														<td>
															mmol/L
														</td>
													</tr>
													
												</tbody>
											</table>
										</div>
									) : showData?.type?.name == "GLUCOSE- RBS" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Value</th>
														
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															GLUCOSE- RBS
														</th>
														<td>
															{
																showData
																
																	?.rbs
															}{" "}
														
														</td>
														
														<td>
															mg/dL
														</td>
														
													</tr>
													<tr>
														<th className="capitalize">
														
														</th>
														<td>
															{
																showData
																
																	?.rbs_mmol
															}{" "}
													
														</td>
														
														<td>
															mmol/L
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									) :  showData?.type?.name == "CREATININE" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														
														<th>Value</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															CREATININE
														</th>
														<td>
															{
																showData
																
																	?.creatinine
															}{" "}
														
														</td>
														
														<td>
															mg/dL
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : showData?.type?.name == "LIPID PROFILE" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														
														
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															Cholesterol
														</th>
														<td>
															{
																showData
																
																	?.cholesterol
															}{" "}
														
														</td>
														
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Triglyceride
														</th>
														<td>
															{
																showData
																
																	?.triglyceride
															}{" "}
														
														</td>
														
													
														
													</tr>
													<tr>
														<th className="capitalize">
															HDL
														</th>
														<td>
															{
																showData
																
																	?.hdl
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															LDL
														</th>
														<td>
															{
																showData
																
																	?.ldl
															}{" "}
														
														</td>
														
														
														
													</tr>
													<tr>
														<th className="capitalize">
															HbA1C
														</th>
														<td>
															{
																showData
																
																	?.hbac
															}{" "}
														
														</td>
														
														
														
													</tr>
												</tbody>
											</table>
										</div>
									) : showData?.type?.name == "ORAL GLUCOSE TOLERANCE TEST (OGTT)" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Blood Glucose</th>
														<th>Result</th>
														
														
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															FBS
														</th>
														<td>
															{
																showData
																
																	?.blood_fbs
															}{" "}
														
														</td>
														
													
														
													</tr>
													<tr>
														<th className="capitalize">
															1st Hour
														</th>
														<td>
															{
																showData
																
																	?.blood_first_hour
															}{" "}
														
														</td>
														
														
														
													</tr>
													<tr>
														<th className="capitalize">
															2nd Hour
														</th>
														<td>
															{
																showData
																
																	?.blood_second_hour
															}{" "}
														
														</td>
													
														
													</tr>
													<tr>
														<th className="capitalize">
															3rd Hour
														</th>
														<td>
															{
																showData
																
																	?.blood_third_hour
															}{" "}
														
														</td>
														
														
													</tr>
												</tbody>
											</table>
											<table>
												<thead>
													<tr>
														<th>Urine Glucose</th>
														<th>Result</th>
														
														
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															Fasting
														</th>
														<td>
															{
																showData
																
																	?.urine_fasting
															}{" "}
														
														</td>
														
													
														
													</tr>
													<tr>
														<th className="capitalize">
															1st Hour
														</th>
														<td>
															{
																showData
																
																	?.urine_first_hour
															}{" "}
														
														</td>
														
													
													</tr>
													<tr>
														<th className="capitalize">
															2nd Hour
														</th>
														<td>
															{
																showData
																
																	?.urine_second_hour
															}{" "}
														
														</td>
													
													</tr>
													<tr>
														<th className="capitalize">
															3rd Hour
														</th>
														<td>
															{
																showData
																
																	?.urine_third_hour
															}{" "}
														
														</td>
														
														
													</tr>
												</tbody>
											</table>
										</div>
									) : showData?.type?.name == "COMPLETE BLOOD COUNT (CBC)" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
														<th>Result</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															Hemoglobin
														</th>
														<td>
															{
																showData
																
																	?.hemoglobin_g
															}{" "}
														
														</td>
														<td>
															{
																showData
																
																	?.hemoglobin_l
															}{" "}
														
														</td>
														
													</tr>
													<tr>
														<th className="capitalize">
															MCH
														</th>
														<td>
															{
																showData
																
																	?.mch_x
															}{" "}
														
														</td>
														<td>
															{
																showData
																
																	?.mch_l
															}{" "}
														
														</td>
														
													</tr>
													<tr>
														<th className="capitalize">
															MCHC
														</th>
														<td>
															{
																showData
																
																	?.mchc_x
															}{" "}
														
														</td>
														<td>
															{
																showData
																
																	?.mchc_l
															}{" "}
														
														</td>
														
													</tr>
													<tr>
														<th className="capitalize">
															MCV
														</th>
														<td>
															{
																showData
																
																	?.mcv_x
															}{" "}
														
														</td>
														<td>
															{
																showData
																
																	?.mcv_l
															}{" "}
														
														</td>
														
													</tr>
													<tr>
														<th className="capitalize">
															WBC
														</th>
														<td>
															{
																showData
																
																	?.wbc_x
															}{" "}
														
														</td>
														<td>
															{
																showData
																
																	?.wbc_l
															}{" "}
														
														</td>
														
													</tr>
													<tr>
														<th className="capitalize">
															Hematocrit
														</th>
														<td>
															{
																showData
																
																	?.hematocrit
															}{" "}
														
														</td>
														
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Leukocyte Differential Myelocyte
														</th>
														<td>
															{
																showData
																
																	?.leukocyte
															}{" "}
														
														</td>
														
													</tr>
													<tr>
														<th className="capitalize">
															Neutrophols (bands)
														</th>
														<td>
															{
																showData
																
																	?.neutrophils_bands
															}{" "}
														
														</td>
														
													</tr>
													<tr>
														<th className="capitalize">
															Neutrophols (segmenters)
														</th>
														<td>
															{
																showData
																
																	?.neutrophils_segmenters
															}{" "}
														
														</td>
														
													</tr>
													<tr>
														<th className="capitalize">
															Lymphocytes
														</th>
														<td>
															{
																showData
																
																	?.lymphocytes
															}{" "}
														
														</td>
														
													</tr>
													<tr>
														<th className="capitalize">
															Monocytes
														</th>
														<td>
															{
																showData
																
																	?.monocytes
															}{" "}
														
														</td>
														
													</tr>
													<tr>
														<th className="capitalize">
															Eosinophils
														</th>
														<td>
															{
																showData
																
																	?.eosinophils
															}{" "}
														
														</td>
														
													</tr>
													<tr>
														<th className="capitalize">
															Basophils
														</th>
														<td>
															{
																showData
																
																	?.basophils
															}{" "}
														
														</td>
														
													</tr>
													<tr>
														<th className="capitalize">
															Platelet
														</th>
														<td>
															{
																showData
																
																	?.platelet
															}{" "}
														
														</td>
														
													</tr>
												</tbody>
											</table>
										</div>
									) : showData?.type?.name == "SPUTUM AFB STAIN (2x)" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															Result
														</th>
														<td>
															{
																showData
																
																	?.result_gram
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Number of Plusses 
														</th>
														<td>
															{
																showData
																
																	?.epithelial_cells
															}{" "}
														
														</td>
														
														
													</tr>
													
												</tbody>
											</table>
										</div>
									) : showData?.type?.name == "URINALYSIS" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															Specific Gravity
														</th>
														<td>
															{
																showData
																
																	?.gravity_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Appearance
														</th>
														<td>
															{
																showData
																
																	?.appearance_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Color
														</th>
														<td>
															{
																showData
																
																	?.color_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Glucose
														</th>
														<td>
															{
																showData
																
																	?.glucose_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Proteins
														</th>
														<td>
															{
																showData
																
																	?.protein_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Ketones
														</th>
														<td>
															{
																showData
																
																	?.ketones_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															pH
														</th>
														<td>
															{
																showData
																
																	?.ph_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Pus Cells
														</th>
														<td>
															{
																showData
																
																	?.pus_cells_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Albumin
														</th>
														<td>
															{
																showData
																
																	?.albumin_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Red Blood Cells
														</th>
														<td>
															{
																showData
																
																	?.rbc_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															White Blood Cells
														</th>
														<td>
															{
																showData
																
																	?.wbc_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Bacteria
														</th>
														<td>
															{
																showData
																
																	?.bacteria_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Crystals
														</th>
														<td>
															{
																showData
																
																	?.crystals_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Bladder Cells
														</th>
														<td>
															{
																showData
																
																	?.bladder_cells_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Squamous Cells
														</th>
														<td>
															{
																showData
																
																	?.squamous_cells_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Tubular Cells
														</th>
														<td>
															{
																showData
																
																	?.tubular_cells_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Broad Casts
														</th>
														<td>
															{
																showData
																
																	?.broad_casts_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Epithelial Cell Casts
														</th>
														<td>
															{
																showData
																
																	?.epithelial_cells_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Granular Casts
														</th>
														<td>
															{
																showData
																
																	?.granular_cast_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Hyaline Casts
														</th>
														<td>
															{
																showData
																
																	?.hyaline_cast_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Red Blood Cells Casts
														</th>
														<td>
															{
																showData
																
																	?.rbc_cast_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															White Cell Casts
														</th>
														<td>
															{
																showData
																
																	?.wbc_cast_urine
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Waxy Casts
														</th>
														<td>
															{
																showData
																
																	?.waxy_cast_urine
															}{" "}
														
														</td>
														
														
													</tr>
													
												</tbody>
											</table>
										</div>
									) : showData?.type?.name == "PAP SMEAR" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Test</th>
														<th>Result</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															Findings
														</th>
														<td>
															{
																showData?.papsmear_findings
															}{" "}
														
														</td>
														
														
													</tr>
													<tr>
														<th className="capitalize">
															Impression
														</th>
														<td>
															{
																showData?.papsmear_impression
															}{" "}
														
														</td>
														
														
													</tr>
												</tbody>
											</table>
										</div>
									) : showData?.type?.name == "FECALYSIS" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Appearance</th>
														<th>Result</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															Color
														</th>
														<td>
															{
																showData
																
																	?.color_fecalysis
															}{" "}
														
														</td>
														
														
													</tr>
													
												</tbody>
												<tbody>
													<tr>
														<th className="capitalize">
															Consistency
														</th>
														<td>
															{
																showData
																
																	?.consistency_fecalysis
															}{" "}
														
														</td>
														
														
													</tr>
													
												</tbody>
												<tbody>
													<tr>
														<th className="capitalize">
															Pus Cells
														</th>
														<td>
															{
																showData
																
																	?.pus_cells_fecalysis
															}{" "}
														
														</td>
														
														
													</tr>
													
												</tbody>
											</table>
											<table>
												<thead>
													<tr>
														<th>Microscopic</th>
														<th>Result</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															RBC
														</th>
														<td>
															{
																showData
																
																	?.rbc_fecalysis
															}{" "}
														
														</td>
														
														
													</tr>
													
												</tbody>
												<tbody>
													<tr>
														<th className="capitalize">
															WBC
														</th>
														<td>
															{
																showData
																
																	?.wbc_fecalysis
															}{" "}
														
														</td>
														
														
													</tr>
													
												</tbody>
												<tbody>
													<tr>
														<th className="capitalize">
															Ova
														</th>
														<td>
															{
																showData
																
																	?.ova_fecalysis
															}{" "}
														
														</td>
														
														
													</tr>
													
												</tbody>
												<tbody>
													<tr>
														<th className="capitalize">
															Parasite
														</th>
														<td>
															{
																showData
																
																	?.parasite_fecalysis
															}{" "}
														
														</td>
														
														
													</tr>
													
												</tbody>
												<tbody>
													<tr>
														<th className="capitalize">
															Blood
														</th>
														<td>
															{
																showData
																
																	?.blood_fecalysis
															}{" "}
														
														</td>
														
														
													</tr>
													
												</tbody>
												<tbody>
													<tr>
														<th className="capitalize">
															Occult Blood
														</th>
														<td>
															{
																showData
																
																	?.fecal_occult_blood_fecalysis
															}{" "}
														
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
														src={imageView}
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
														__html: showData?.lab_result_notes,
													}}
												></div>
											</div>
										</>
									)}
								</div>

								<div className="p-6 flex flex-col gap-y-4 relative border-t-2 divide-y-2">
									 <div className="flex flex-col gap-2">
										<span className='text-sm font-semibold'>Findings: </span>
										<span className='text-sm ml-4'>{showData?.findings_remarks}</span>
									 </div>
									 <div className="flex flex-col gap-2">
										<span className='text-sm font-semibold'>Remarks: </span>
										<span className='text-sm ml-4'>{showData?.impressions_remarks}</span>
									 </div>
								</div>
							

								<div className="px-4 py-4 border-t flex items-center justify-end bg-slate-">
									<ActionBtn
										// size="lg"
										type="danger"
										className="px-5"
										onClick={hide}
									>
										CLOSE
									</ActionBtn>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default forwardRef(ViewLabResultModal);

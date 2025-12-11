import React, { useState } from 'react'
import AppLayout from '../../../components/container/AppLayout'
import FlatIcon from '../../../components/FlatIcon';
import { calculateAge, doctorName, doctorSpecialty, formatDate, formatDateTime, patientFullName } from '../../../libs/helpers';
import PatientImg from '../../../components/PatientImg';
import useLabQueue from '../../../hooks/useLabQueue';
import InQueueRegular from '../../patient-lab-queue/components/InQueueRegular';
import LaboratoryOrders from '../../../components/patient-modules/LaboratoryOrders';
import { Fade } from 'react-reveal';
import TextInputField from '../../../components/inputs/TextInputField';
import { useForm } from 'react-hook-form';
import TextAreaField from '../../../components/inputs/TextAreaField';
import ActionBtn from '../../../components/buttons/ActionBtn';
import Axios from '../../../libs/axios';
import { toast } from 'react-toastify';

const PatientProfile = ({ patient }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-4 items-center px-4 pt-4 border-b justify- md:justify-start bg-slate-50 p-4 h-full">
            <div className="group relative h-[108px] w-[108px] min-h-[108px] min-w-[108px] rounded-full aspect-square bg-background">
                <PatientImg
                    type="user"
                    name={patientFullName(patient)}
                    src={patient?.avatar || ""}
                    className="min-h-[108px] min-w-[108px] aspect-square object-cover rounded-full"
                    alt=""
                    id="user-image-sample"
                    key={`key-${patient?.id}-${patient?.avatar}`}
                />
            </div>
            <div className="flex flex-col pl-4">
                <h6
                    className={`text-left text-2xl mb-1 font-semibold flex items-center ${
                        String(patient?.gender).toLowerCase() == "male"
                            ? "text-blue-800"
                            : "text-pink-800"
                    } mb-0`}
                >
                    {patientFullName(patient)}
                </h6>
                <div className="flex gap-6 mb-2">
                    <div className="flex items-center gap-2 text-base">
                        <FlatIcon
                            icon="rr-calendar-clock"
                            className="text-base"
                        />
                        <span>{calculateAge(patient?.birthday)} yrs. old</span>
                    </div>
                    <div className="flex items-center gap-2 text-base">
                        <FlatIcon icon="rr-calendar" className="text-base" />
                        <span>{formatDate(patient?.birthday)}</span>
                    </div>
                </div>
                <div className="flex gap-4 mb-2">
                    <div className="flex items-center gap-2 text-base">
                        <FlatIcon icon="rr-venus-mars" className="text-base" />
                        {String(patient?.gender).toLowerCase() == "male" ? (
                            <span className="text-blue-700">Male</span>
                        ) : (
                            <span className="text-pink-700">Female</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
const PathologyQueue = () => {

    const { readingResult, mutateReadingResult } = useLabQueue();
    const [saving, setSaving] = useState(null);
    const [order, setOrder] = useState(null);
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
    const listPending = () => {
		return readingResult?.data || [];
	};
    const submit = (data) => {
        setSaving(true);
        let formdata = new FormData();
        formdata.append("_method", "PATCH");
        formdata.append("findings_remarks", data?.findings_remarks);
        formdata.append("impressions_remarks", data?.impressions_remarks);
        Axios.post(`v1/laboratory/final-results/${order?.id}`, formdata)
			.then((res) => {
				reset();
				toast.success("Laboratory result submitted successfully!");
			})
			.finally(() => {
				setTimeout(() => {
					setSaving(false);
				}, 1000);
			});
    }
  return (
    <AppLayout>
			<div className="p-4 h-full overflow-auto ">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-5 divide-x">
					<div className="lg:col-span-4">
						<h1 className="text-xl font-bold font-opensans text-primary-dark tracking-wider -mb-1">
							Patient Queue
						</h1>
						<span className="noto-sans-thin text-slate-500 text-sm font-light">
							Patients pending for laboratory services
						</span>
						<div className="flex flex-col gap-y-4 py-4">
						{listPending()?.map((queue, index) => {
									return (
										<InQueueRegular
										selected={
											queue?.relationships?.laboratoryTest?.id ===
											order?.relationships?.laboratoryTest
												?.id
										}
											onClick={() => { 
												setOrder(queue);
											}}
											key={`iqr-${queue.id}`}
											number={`${queue.id}`}
											date={formatDateTime(new Date())}
											patientName={patientFullName(
												queue?.relationships?.patient
											)}
											
										>
											
											<div className="w-full flex flex-col pl-16">
												<div className="flex items-center gap-2 mb-2">
													<span className="text-sm ">
														Lab Order:
													</span>
													<span className="font-bold text-red-700 ml-8">
														{" "}
														{queue?.type?.name}
													</span>
												</div>
												<div className="flex items-center gap-2 mb-2">
													<span className="text-sm ">
														Date:
													</span>
													<span className="font-light italic ml-16">
														{formatDate(
															new Date(
																queue?.created_at
															)
														)}
													</span>
												</div>
												<div className="flex items-start gap-2 mb-2">
													<span className="text-sm ">
														Doctor:{" "}
													</span>
													<span className="flex flex-col font-bold ml-12">
														<span className="-mb-1">
															{doctorName(
																queue
																	?.relationships
																	?.doctor
															)}
														</span>
														<span className="font-light text-sm">
															{doctorSpecialty(
																queue
																	?.relationships
																	?.doctor
															)}
														</span>
													</span>
												</div>
											</div>
										</InQueueRegular>
									);
								})
							}
						</div>
					</div>
					<div className="lg:col-span-8 pl-4">
						<div className="flex items-center gap-4 pb-4">
							<h1 className="text-xl font-bold font-opensans text-success-dark tracking-wider -mb-1">
								In Service...
							</h1>
						</div>
						<div>
							{order?.relationships?.patient ? (
								<Fade key={`order-${order?.id}`}>
									<div>
										<PatientProfile
											patient={
												order?.relationships?.patient
											}
										/>
                                        
                                        <div className="p-6 flex flex-col gap-y-4 relative border-t-2">
                                                {order?.type?.name == "GLUCOSE- FBS" ? (
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
                                                                        {order?.type?.name}
                                                                    </th>
                                                                    <td>
                                                                        {
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                ) : order?.type?.name == "GLUCOSE- RBS" ? (
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                ) :  order?.type?.name == "CREATININE" ? (
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
                                                                            order
                                                                            
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
                                                ) : order?.type?.name == "LIPID PROFILE" ? (
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
                                                                                ?.hbac
                                                                        }{" "}
                                                                    
                                                                    </td>
                                                                    
                                                                    
                                                                    
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : order?.type?.name == "ORAL GLUCOSE TOLERANCE TEST (OGTT)" ? (
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
                                                                                ?.urine_third_hour
                                                                        }{" "}
                                                                    
                                                                    </td>
                                                                    
                                                                    
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : order?.type?.name == "COMPLETE BLOOD COUNT (CBC)" ? (
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
                                                                            order
                                                                            
                                                                                ?.hemoglobin_g
                                                                        }{" "}
                                                                    
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            order
                                                                            
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
                                                                            order
                                                                            
                                                                                ?.mch_x
                                                                        }{" "}
                                                                    
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            order
                                                                            
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
                                                                            order
                                                                            
                                                                                ?.mchc_x
                                                                        }{" "}
                                                                    
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            order
                                                                            
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
                                                                            order
                                                                            
                                                                                ?.mcv_x
                                                                        }{" "}
                                                                    
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            order
                                                                            
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
                                                                            order
                                                                            
                                                                                ?.wbc_x
                                                                        }{" "}
                                                                    
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
                                                                                ?.platelet
                                                                        }{" "}
                                                                    
                                                                    </td>
                                                                    
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : order?.type?.name == "SPUTUM AFB STAIN (2x)" ? (
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
                                                                                ?.epithelial_cells
                                                                        }{" "}
                                                                    
                                                                    </td>
                                                                    
                                                                    
                                                                </tr>
                                                                
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : order?.type?.name == "URINALYSIS" ? (
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
                                                                                ?.waxy_cast_urine
                                                                        }{" "}
                                                                    
                                                                    </td>
                                                                    
                                                                    
                                                                </tr>
                                                                
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : order?.type?.name == "PAP SMEAR" ? (
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
                                                                            order?.papsmear_findings
                                                                        }{" "}
                                                                    
                                                                    </td>
                                                                    
                                                                    
                                                                </tr>
                                                                <tr>
                                                                    <th className="capitalize">
                                                                        Impression
                                                                    </th>
                                                                    <td>
                                                                        {
                                                                            order?.papsmear_impression
                                                                        }{" "}
                                                                    
                                                                    </td>
                                                                    
                                                                    
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : order?.type?.name == "FECALYSIS" ? (
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                            order
                                                                            
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
                                                                    __html: order?.lab_result_notes,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        <div className="p-6 flex flex-col gap-y-4 relative border-t-2">
                                            <span className='text-xl font-semibold'>Laboratory Findings</span>
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col mb-2">
                                                    <label className="text-sm font-bold mb-2">
                                                        Findings
                                                    </label>
                                                    <TextAreaField
                                                        error={
                                                            errors?.findings_remarks
                                                                ?.message
                                                        }
                                                        className="rounded-xl"
                                                        rows="2"
                                                        placeholder="Laboratory Findings"
                                                        {...register("findings_remarks", {
                                                            required:
                                                                "This field is required!",
                                                        })}
                                                    />
                                                </div>
                                                <div className="flex flex-col mb-2">
                                                    <label className="text-sm font-bold mb-2">
                                                        Remarks
                                                    </label>
                                                    <TextAreaField
                                                        error={
                                                            errors?.impressions_remarks
                                                                ?.message
                                                        }
                                                        className="rounded-xl"
                                                        rows="2"
                                                        placeholder="Remarks"
                                                        {...register("impressions_remarks", {
                                                            required:
                                                                "This field is required!",
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-4 py-4 border-t flex items-center justify-end bg-slate-">
                                            <ActionBtn
                                                loading={saving}
                                                type="success"
                                                className="px-5"
                                                onClick={handleSubmit(submit)}
                                            >
                                                Send
                                            </ActionBtn>
                                        </div>
									</div>
								</Fade>
							) : (
								<span className="w-full font-medium text-lg text-center py-20 text-slate-300">
									No patient selected
								</span>
							)}
						</div>
					</div>
				</div>
			
			</div>
	</AppLayout>
  )
}

export default PathologyQueue

import React, { useState } from 'react'
import FlatIcon from '../../../components/FlatIcon';
import { calculateAge, doctorName, doctorSpecialty, formatDate, formatDateTime, patientFullName } from '../../../libs/helpers';
import PatientImg from '../../../components/PatientImg';
import InQueueRegular from '../../patient-lab-queue/components/InQueueRegular';
import AppLayout from '../../../components/container/AppLayout';
import ActionBtn from '../../../components/buttons/ActionBtn';
import { Fade } from 'react-reveal';
import Axios from '../../../libs/axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import useLabQueue from '../../../hooks/useLabQueue';
import TextAreaField from '../../../components/inputs/TextAreaField';
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
const RadiologyQueue = () => {
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
    const imageView = `${import.meta.env.VITE_IMG_URL}` + (
                    order?.breast_single || 
                    order?.chest_thorax || 
                    order?.inguinal || 
                    order?.neck_usd || 
                    order?.scrotum_testes || 
                    order?.superficial_soft_tissue || 
                    order?.thyroid_usd || 
                    order?.whole_abdomen || 
                    order?.wab_appendix || 
                    order?.breast_elasto || 
                    order?.breast_both || 
                    order?.lower_abdomen || 
                    order?.upper_abdomen || 
                    order?.kub_pelvis || 
                    order?.kub_prostate || 
                    order?.guided_aspiration || 
                    order?.guided_biopsy || 
                    order?.tvs || 
                    order?.inguinoscrotal || 
                    order?.bps || 
                    order?.hbt || 
                    order?.kub_only || 
                    order?.pregnant_ultrasound || 
                    order?.pelvis_ultrasound || 
                    order?.neck_ultrasound || 
                    order?.appendix_ultrasound || 
                    order?.avdleb_ultrasound || 
                    order?.avdles_ultrasound || 
                    order?.vdles_ultrasound || 
                    order?.adles_ultrasound || 
                    order?.ankle_apl_apo || 
                    order?.ankle_apl_apo_pf || 
                    order?.ankle_mortisse_view_right_pf || 
                    order?.ankle_both_apl_pf || 
                    order?.arm_apl_right || 
                    order?.axillary_view_pf || 
                    order?.calcaneus_lateral_view || 
                    order?.calcaneus_pf || 
                    order?.cervical_apl_obliques || 
                    order?.cervical_apl_obliques_pf || 
                    order?.cervical_apl_pf || 
                    order?.cervical_apo || 
                    order?.cervicothoracic_spine_apl || 
                    order?.chest_ap_pf || 
                    order?.chest_apl_pf || 
                    order?.chest_cone_down_view_pf || 
                    order?.chest_lateral_view_only_pf || 
                    order?.chest_pa_pf || 
                    order?.chest_pal_pf || 
                    order?.chest_rpo || 
                    order?.chest_spot_view_left_upper_lf || 
                    order?.chest_spot_view_left_upper_lf_pf || 
                    order?.chest_spot_view_right_lower_lf || 
                    order?.chest_spot_view_right_lower_lf_pf || 
                    order?.chest_spot_view_right_ulf || 
                    order?.chest_spot_view_right_ulf_pf || 
                    order?.clavicle_ap_with_cephalic_tilt_pf || 
                    order?.clavicle_r_and_l_pf || 
                    order?.coccyx_ap_pf || 
                    order?.coccyx_apl_pf || 
                    order?.digit_apl_apo_pf || 
                    order?.elbow_both_apl_pf || 
                    order?.foot_ap_pf || 
                    order?.foot_apl_bilateral || 
                    order?.foot_apl_bilateral_pf || 
                    order?.foot_apl_left || 
                    order?.foot_apl_left_pf || 
                    order?.foot_apo_left || 
                    order?.foot_apo_left_pf || 
                    order?.foot_apo_right || 
                    order?.foot_apo_right_pf || 
                    order?.foot_apl_both || 
                    order?.foot_lateral_view_right || 
                    order?.foot_lateral_view_right_pf || 
                    order?.forearm_both_apl_pf || 
                    order?.hand_apl_right_pf || 
                    order?.hand_apo_left || 
                    order?.hand_lateral_view_right || 
                    order?.hand_lateral_view_right_pf || 
                    order?.hand_left_bone_aging || 
                    order?.hand_left_bone_aging_pf || 
                    order?.hard_copy_image_xray || 
                    order?.hip_ap_ct_apl || 
                    order?.hip_ap_ct_apl_pf || 
                    order?.humerus_ap || 
                    order?.humerus_both_apl_pf || 
                    order?.intraop_x_3_shots || 
                    order?.intraop_x_4_shots || 
                    order?.ivp_x_2_shots || 
                    order?.ivp_x_3_shots || 
                    order?.ivp_x_5_shots || 
                    order?.ivp_x_6_shots || 
                    order?.ivp_x_7_shots || 
                    order?.ivp_x_8_shots || 
                    order?.judet_view_left_hip_joint || 
                    order?.judet_view_left_hip_joint_pf || 
                    order?.judet_view_right_hip_joint_pf || 
                    order?.knee_apl_left || 
                    order?.knee_apl_left_pf || 
                    order?.knee_tunnel_view_right || 
                    order?.knee_tunnel_view_left_pf || 
                    order?.knees_both_apl || 
                    order?.knees_both_apl_pf || 
                    order?.kub_xray_pf || 
                    order?.leg_apl_right || 
                    order?.leg_apl_pf || 
                    order?.lumbar_apl_pf || 
                    order?.lumbosacral_ls_oblique || 
                    order?.lumbosacral_ls_oblique_pf || 
                    order?.lumbosacral_spine_apl_oblique_pf || 
                    order?.lumbosacral_spine_apl_pf || 
                    order?.mandible_apo_pf || 
                    order?.mastoid_series || 
                    order?.mastoid_series_pf || 
                    order?.nasal_bone_pf || 
                    order?.orbit_caldwell_pf || 
                    order?.orbit_water_and_caldwell_pf || 
                    order?.os_calcis_view_pf || 
                    order?.paranasal_sinuses_pf || 
                    order?.pelvis_ap_pf || 
                    order?.pelvis_apl_pf || 
                    order?.rgp_x_1_shot || 
                    order?.rgp_x_2_shot || 
                    order?.rgp_x_3_shot || 
                    order?.rgp_x_4_shot || 
                    order?.rgp_x_5_shot || 
                    order?.scapula_lat_pf || 
                    order?.scoliosis_series || 
                    order?.second_copy_of_result_opd_only || 
                    order?.shoulder_ap_l_pf || 
                    order?.shoulder_ap_r_pf || 
                    order?.shoulder_apo_r_pf || 
                    order?.skull_ap_pf || 
                    order?.skull_lateral_view_pf || 
                    order?.skull_series_apl_townes_views_pf || 
                    order?.skull_submentovertex_pf || 
                    order?.skull_waters_view_pf || 
                    order?.tbc_apl || 
                    order?.tbc_with_obliques || 
                    order?.temporo_mandibular_joint_pf || 
                    order?.thoracic_bony_cage_ap_pf || 
                    order?.thoracic_bony_cage_apl_pf || 
                    order?.thoracic_bony_cage_r_l_oblique_pf || 
                    order?.thoracic_bony_cage_with_obliques_pf || 
                    order?.thoraco_bony_cage_tbc_with_obliques || 
                    order?.thoracolumbar_ap || 
                    order?.thoracolumbar_apl || 
                    order?.tibial_plateau_both_obliques || 
                    order?.wrist_apl_left || 
                    order?.wrist_apo_left || 
                    order?.wrist_apo_right || 
                    order?.wrist_apo_pf || 
                    order?.wrist_both_apl 
                );
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
    console.log("Radiology Image", order)
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
							<div>
							{order?.relationships?.patient ? (
								<Fade key={`order-${order?.id}`}>
									<div>
										<PatientProfile
											patient={
												order?.relationships?.patient
											}
										/>
                                        
                                         <>
                                {order?.type?.name === 'ARTERIAL DOPPLER LOWER EXT SINGLE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'APPENDIX' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'GUIDED ASPIRATION' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'ARTERIOVENOUS DOPPLER LOWER EXT BOTH' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'ARTERIOVENOUS DOPPLER LOWER EXT SINGLE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'GUIDED BIOPSY' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'BPS' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'BREAST BOTH' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'BREAST ELASTO' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'BREAST ULTRASOUND (SINGLE)' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CHEST / THORAX' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'HBT' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'INGUINAL ULTRASOUND' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'INGUINOSCROTAL' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'KUB ONLY' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'KUB/PELVIS ULTRASOUND' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'KUB/PROSTATE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'LOWER ABDOMEN' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'NECK' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'NECK USD' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'PELVIS' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'PREGNANT' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'SCROTUM/ TESTES' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'SUPERFICIAL SOFT TISSUE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'THYROID USD' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'TVS' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'UPPER ABDOMEN' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'VENOUS DOPPLER LOWER EXT SINGLE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'WAB + APPENDIX' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'WHOLE ABDOMEN' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'ANKLE APL/APO' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'ANKLE APL/APO + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'ANKLE BOTH APL + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'ANKLE MORTISSE VIEW (RIGHT) + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'ARM APL RIGHT' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'AXILLARY VIEW + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CALCANEUS (LATERAL VIEW)' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CALCANEUS + PORTABLE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CERVICAL APL + OBLIQUES' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CERVICAL APL + OBLIQUES + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CERVICAL APO' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CERVICOTHORACIC SPINE APL' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CHEST APL + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CHEST AP + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CHEST CONE DOWN VIEW + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Chest Lateral View Only + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CHEAST PAL + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CHEST PA + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CHEST RPO  RIGHT POSTERIOR OBLIQUE ' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CHEST SPOT VIEW LEFT UPPER LF' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CHEST SPOT VIEW LEFT UPPER LF + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CHEST SPOT VIEW RIGHT LOWER LF' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CHEST SPOT VIEW RIGHT LOWER LF + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CHEST SPOT VIEW RIGHT ULF' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CHEST SPOT VIEW RIGHT ULF + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CLAVICLE AP WITH CEPHALIC TILT+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'CLAVICLE R and L+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'COCCYX APL + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'COCCYX AP + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'DIGIT APL/APO+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Elbow, Both APL+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Foot APL  BILATERAL ' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Foot APL  BILATERAL + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'FOOT APL BOTH' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Foot APL  left ' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'FOOT APL  Left + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'FOOT APO  Left ' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Foot APO  left + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Foot APO  right ' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Foot APO  right + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'FOOT AP+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Foot Lateral View  right ' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Foot Lateral View  right + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Forearm, Both APL+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'HAND APL RIGHT + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Hand APO  left ' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Hand Lateral View  right ' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Hand Lateral View  right + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Hand Left  Bone Aging ' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Hand Left  Bone Aging + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'HARD COPY IMAGE X-RAY' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'HIP AP / CT APL' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'HIP AP / CT APL+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Humerus AP' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Humerus, Both APL + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'INTRA-OP X 3 SHOTS' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'INTRA-OP X 4 SHOTS' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'IVP X 2 SHOTS' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'IVP X 3 SHOTS' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'IVP X 5 SHOTS' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'IVP X 6 SHOTS' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'IVP X 7 SHOTS' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'IVP X 8 SHOTS' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'JUDET VIEW-LEFT,HIP JOINT' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'JUDET VIEW-LEFT,HIP JOINT+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'JUDET VIEW-RIGHT,HIP JOINT+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Knee APL  left ' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Knee APL  left + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Knees, Both APL' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Knees, Both APL+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Knee, Tunnel View Left + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Knee Tunnel View right ' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'KUB  x-ray + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'LEG APL+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Leg APL  right ' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'LUMBAR APL+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'LUMBOSACRAL  L/S  OBLIQUE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'LUMBOSACRAL  L/S  OBLIQUE+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'LUMBOSACRAL SPINE APL + OBLIQUE+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'LUMBOSACRAL SPINE APL+ PORTABLE FEE"' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'MANDIBLE APO+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'MASTOID SERIES' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'MASTOID SERIES+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'NASAL BONE+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'ORBIT CALDWELL+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'ORBIT WATER AND CALDWELL+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'OS CALCIS VIEW+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'PARANASAL SINUSES+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'PELVIS APL+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'PELVIS AP+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'RGP X 1 SHOT' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'RGP X 2 SHOT' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'RGP X 3 SHOT' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'RGP X 4 SHOT' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'RGP X 5 SHOT' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'SCAPULA LAT+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Scoliosis Series' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Scoliosis Series+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'SECOND COPY OF RESULT  OPD ONLY ' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'SHOULDER AP L+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'SHOULDER APO  R + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'SHOULDER AP R+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'SKULL AP+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'SKULL LATERAL VIEW+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'SKULL SERIES   APL + Townes views +PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'SKULL SUBMENTOVERTEX+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'SKULL WATERS VIEW+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'TBC APL' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'TBC with obliques' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'TEMPORO MANDIBULAR JOINT+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'THORACIC BONY CAGE APL+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'THORACIC BONY CAGE AP + PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'THORACIC BONY CAGE R & L OBLIQUE+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'THORACIC BONY CAGE with obliques+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'THORACO BONY CAGE  TBC  W/ OBLIQUES' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'THORACOLUMBAR APL' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'THORACOLUMBAR AP' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'TIBIAL PLATEAU  BOTH OBLIQUES ' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'WRIST APO LEFT' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Wrist APL  left ' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'WRIST APO+ PORTABLE FEE' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'WRIST APO RIGHT' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                {order?.type?.name === 'Wrist, Both APL' && (
                                    <>
                                        <div>
                                            <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                            <div className="border border-slate-300 aspect-video relative">
                                                <img 
                                                src={imageView}
                                                className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                />
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                            </>
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
			
			</div>
	</AppLayout>
  )
}

export default RadiologyQueue

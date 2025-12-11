import React, { forwardRef, Fragment, useImperativeHandle, useState } from "react";
import QRCode from 'qrcode.react';
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import useNoBugUseEffect from "../../../hooks/useNoBugUseEffect";
import ActionBtn from "../../buttons/ActionBtn";
import { formatDateTime } from "../../../libs/helpers";

const FormHeading = ({ title }) => (
    <div className="flex items-center h-12">
        <div className="flex items-center"></div>
        <div className="flex-grow slanted bg-blue-500 flex items-center justify-start pl-1">
            <span className="text-white">www.saranganiprovincialhospital.com</span>
        </div>
        <div className="flex-grow slanted-reverse bg-blue-700 flex items-center justify-start pl-1">
            <span className="text-blue-700" value=""></span>
        </div>
    </div>
);

const Status = ({ status }) => {
    const color = () => {
        switch (status) {
            case 'pending':
                return ' text-red-700';
            case 'for-result-reading':
                return ' text-blue-700';
            default:
                return ' text-white';
        }
    };
    return (
        <span className={`${color()} px-2 italic text-center rounded-2xl text-xs py-[2px]`}>
            {status}
        </span>
    );
};

const ViewImgResultModal = (props, ref) => {
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
    const [tests, setTests] = useState([]);
    const [full, setFull] = useState(false);
    useNoBugUseEffect({
        functions: () => {},
    });
    
    useImperativeHandle(ref, () => ({
        show,
        hide,
    }));
    
    const show = (data) => {
        setFull(false);
        setShowData(data);
        setModalOpen(true);
    };
    
    const hide = () => {
        setModalOpen(false);
    };
    const imageView = `${import.meta.env.VITE_IMG_URL}` + (
                    showData?.breast_single || 
                    showData?.chest_thorax || 
                    showData?.inguinal || 
                    showData?.neck_usd || 
                    showData?.scrotum_testes || 
                    showData?.superficial_soft_tissue || 
                    showData?.thyroid_usd || 
                    showData?.whole_abdomen || 
                    showData?.wab_appendix || 
                    showData?.breast_elasto || 
                    showData?.breast_both || 
                    showData?.lower_abdomen || 
                    showData?.upper_abdomen || 
                    showData?.kub_pelvis || 
                    showData?.kub_prostate || 
                    showData?.guided_aspiration || 
                    showData?.guided_biopsy || 
                    showData?.tvs || 
                    showData?.inguinoscrotal || 
                    showData?.bps || 
                    showData?.hbt || 
                    showData?.kub_only || 
                    showData?.pregnant_ultrasound || 
                    showData?.pelvis_ultrasound || 
                    showData?.neck_ultrasound || 
                    showData?.appendix_ultrasound || 
                    showData?.avdleb_ultrasound || 
                    showData?.avdles_ultrasound || 
                    showData?.vdles_ultrasound || 
                    showData?.adles_ultrasound || 
                    showData?.ankle_apl_apo || 
                    showData?.ankle_apl_apo_pf || 
                    showData?.ankle_mortisse_view_right_pf || 
                    showData?.ankle_both_apl_pf || 
                    showData?.arm_apl_right || 
                    showData?.axillary_view_pf || 
                    showData?.calcaneus_lateral_view || 
                    showData?.calcaneus_pf || 
                    showData?.cervical_apl_obliques || 
                    showData?.cervical_apl_obliques_pf || 
                    showData?.cervical_apl_pf || 
                    showData?.cervical_apo || 
                    showData?.cervicothoracic_spine_apl || 
                    showData?.chest_ap_pf || 
                    showData?.chest_apl_pf || 
                    showData?.chest_cone_down_view_pf || 
                    showData?.chest_lateral_view_only_pf || 
                    showData?.chest_pa_pf || 
                    showData?.chest_pal_pf || 
                    showData?.chest_rpo || 
                    showData?.chest_spot_view_left_upper_lf || 
                    showData?.chest_spot_view_left_upper_lf_pf || 
                    showData?.chest_spot_view_right_lower_lf || 
                    showData?.chest_spot_view_right_lower_lf_pf || 
                    showData?.chest_spot_view_right_ulf || 
                    showData?.chest_spot_view_right_ulf_pf || 
                    showData?.clavicle_ap_with_cephalic_tilt_pf || 
                    showData?.clavicle_r_and_l_pf || 
                    showData?.coccyx_ap_pf || 
                    showData?.coccyx_apl_pf || 
                    showData?.digit_apl_apo_pf || 
                    showData?.elbow_both_apl_pf || 
                    showData?.foot_ap_pf || 
                    showData?.foot_apl_bilateral || 
                    showData?.foot_apl_bilateral_pf || 
                    showData?.foot_apl_left || 
                    showData?.foot_apl_left_pf || 
                    showData?.foot_apo_left || 
                    showData?.foot_apo_left_pf || 
                    showData?.foot_apo_right || 
                    showData?.foot_apo_right_pf || 
                    showData?.foot_apl_both || 
                    showData?.foot_lateral_view_right || 
                    showData?.foot_lateral_view_right_pf || 
                    showData?.forearm_both_apl_pf || 
                    showData?.hand_apl_right_pf || 
                    showData?.hand_apo_left || 
                    showData?.hand_lateral_view_right || 
                    showData?.hand_lateral_view_right_pf || 
                    showData?.hand_left_bone_aging || 
                    showData?.hand_left_bone_aging_pf || 
                    showData?.hard_copy_image_xray || 
                    showData?.hip_ap_ct_apl || 
                    showData?.hip_ap_ct_apl_pf || 
                    showData?.humerus_ap || 
                    showData?.humerus_both_apl_pf || 
                    showData?.intraop_x_3_shots || 
                    showData?.intraop_x_4_shots || 
                    showData?.ivp_x_2_shots || 
                    showData?.ivp_x_3_shots || 
                    showData?.ivp_x_5_shots || 
                    showData?.ivp_x_6_shots || 
                    showData?.ivp_x_7_shots || 
                    showData?.ivp_x_8_shots || 
                    showData?.judet_view_left_hip_joint || 
                    showData?.judet_view_left_hip_joint_pf || 
                    showData?.judet_view_right_hip_joint_pf || 
                    showData?.knee_apl_left || 
                    showData?.knee_apl_left_pf || 
                    showData?.knee_tunnel_view_right || 
                    showData?.knee_tunnel_view_left_pf || 
                    showData?.knees_both_apl || 
                    showData?.knees_both_apl_pf || 
                    showData?.kub_xray_pf || 
                    showData?.leg_apl_right || 
                    showData?.leg_apl_pf || 
                    showData?.lumbar_apl_pf || 
                    showData?.lumbosacral_ls_oblique || 
                    showData?.lumbosacral_ls_oblique_pf || 
                    showData?.lumbosacral_spine_apl_oblique_pf || 
                    showData?.lumbosacral_spine_apl_pf || 
                    showData?.mandible_apo_pf || 
                    showData?.mastoid_series || 
                    showData?.mastoid_series_pf || 
                    showData?.nasal_bone_pf || 
                    showData?.orbit_caldwell_pf || 
                    showData?.orbit_water_and_caldwell_pf || 
                    showData?.os_calcis_view_pf || 
                    showData?.paranasal_sinuses_pf || 
                    showData?.pelvis_ap_pf || 
                    showData?.pelvis_apl_pf || 
                    showData?.rgp_x_1_shot || 
                    showData?.rgp_x_2_shot || 
                    showData?.rgp_x_3_shot || 
                    showData?.rgp_x_4_shot || 
                    showData?.rgp_x_5_shot || 
                    showData?.scapula_lat_pf || 
                    showData?.scoliosis_series || 
                    showData?.second_copy_of_result_opd_only || 
                    showData?.shoulder_ap_l_pf || 
                    showData?.shoulder_ap_r_pf || 
                    showData?.shoulder_apo_r_pf || 
                    showData?.skull_ap_pf || 
                    showData?.skull_lateral_view_pf || 
                    showData?.skull_series_apl_townes_views_pf || 
                    showData?.skull_submentovertex_pf || 
                    showData?.skull_waters_view_pf || 
                    showData?.tbc_apl || 
                    showData?.tbc_with_obliques || 
                    showData?.temporo_mandibular_joint_pf || 
                    showData?.thoracic_bony_cage_ap_pf || 
                    showData?.thoracic_bony_cage_apl_pf || 
                    showData?.thoracic_bony_cage_r_l_oblique_pf || 
                    showData?.thoracic_bony_cage_with_obliques_pf || 
                    showData?.thoraco_bony_cage_tbc_with_obliques || 
                    showData?.thoracolumbar_ap || 
                    showData?.thoracolumbar_apl || 
                    showData?.tibial_plateau_both_obliques || 
                    showData?.wrist_apl_left || 
                    showData?.wrist_apo_left || 
                    showData?.wrist_apo_right || 
                    showData?.wrist_apo_pf || 
                    showData?.wrist_both_apl 
                );
                    
    console.log("Image URL:", showData);
    
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
                            <Dialog.Title as="div" className="p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"></Dialog.Title>
                            <div className="flex flex-col-4 m-2">
                                <div>
                                    <img src="/Province_of_Sarangani.png" className="w-24 h-24 object-contain mr-2" />
                                </div>
                                <div className="">
                                    <div className="flex justify-center items-center my-4"></div>
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
                                        <span>CLINICAL IMAGING DEPARTMENT</span>
                                    </div>
                                    <div className="text-base text-center font-bold m-4">
                                        <span>{laboratory_test_type == 1 ? 'LABORATORY RESULT' : 'IMAGING RESULT'}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col text-sm justify-end ml-auto">
                                    <QRCode value={`user-${showData?.scheduledBy?.username}`} className="justify-center m-4" level="H" size={90} />
                                  
                                    
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
                                <div className="flex flex-col text-start w-full mx-auto"></div>
                                <div className="flex flex-col text-center"></div>
                            </div>
                         
                            
                            <div className="p-6 flex flex-col gap-y-4 relative border-t-2">
                                <div className="flex flex-col">
                                <div className="flex flex-col">
                                    <span className={`text-base mb-1 font-bold`}>FINDINGS:</span>
                                    <div className="p-2 italic font-light breal-lines text-justify " dangerouslySetInnerHTML={{ __html: showData?.findings_remarks }}></div>
                                </div>
                                {/* <div className="flex flex-col">
                                    <span className={`text-base mb-1 font-bold `}>IMPRESSION:</span>
                                    <div className="p-2 italic font-light breal-lines text-justify " dangerouslySetInnerHTML={{ __html: showData?.impression_remarks }}></div>
                                </div> */}
                                <div className="flex flex-col">
                                    <span className={`text-base mb-1 font-bold `}>REMARKS:</span>
                                    <div className="p-2 italic font-light breal-lines text-justify " dangerouslySetInnerHTML={{ __html: showData?.impressions_remarks }}></div>
                                </div>
                            </div>
                            <>
                                {showData?.type?.name === 'ARTERIAL DOPPLER LOWER EXT SINGLE' && (
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
                                {showData?.type?.name === 'APPENDIX' && (
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
                                {showData?.type?.name === 'GUIDED ASPIRATION' && (
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
                                {showData?.type?.name === 'ARTERIOVENOUS DOPPLER LOWER EXT BOTH' && (
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
                                {showData?.type?.name === 'ARTERIOVENOUS DOPPLER LOWER EXT SINGLE' && (
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
                                {showData?.type?.name === 'GUIDED BIOPSY' && (
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
                                {showData?.type?.name === 'BPS' && (
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
                                {showData?.type?.name === 'BREAST BOTH' && (
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
                                {showData?.type?.name === 'BREAST ELASTO' && (
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
                                {showData?.type?.name === 'BREAST ULTRASOUND (SINGLE)' && (
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
                                {showData?.type?.name === 'CHEST / THORAX' && (
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
                                {showData?.type?.name === 'HBT' && (
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
                                {showData?.type?.name === 'INGUINAL ULTRASOUND' && (
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
                                {showData?.type?.name === 'INGUINOSCROTAL' && (
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
                                {showData?.type?.name === 'KUB ONLY' && (
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
                                {showData?.type?.name === 'KUB/PELVIS ULTRASOUND' && (
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
                                {showData?.type?.name === 'KUB/PROSTATE' && (
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
                                {showData?.type?.name === 'LOWER ABDOMEN' && (
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
                                {showData?.type?.name === 'NECK' && (
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
                                {showData?.type?.name === 'NECK USD' && (
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
                                {showData?.type?.name === 'PELVIS' && (
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
                                {showData?.type?.name === 'PREGNANT' && (
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
                                {showData?.type?.name === 'SCROTUM/ TESTES' && (
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
                                {showData?.type?.name === 'SUPERFICIAL SOFT TISSUE' && (
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
                                {showData?.type?.name === 'THYROID USD' && (
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
                                {showData?.type?.name === 'TVS' && (
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
                                {showData?.type?.name === 'UPPER ABDOMEN' && (
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
                                {showData?.type?.name === 'VENOUS DOPPLER LOWER EXT SINGLE' && (
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
                                {showData?.type?.name === 'WAB + APPENDIX' && (
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
                                {showData?.type?.name === 'WHOLE ABDOMEN' && (
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
                                {showData?.type?.name === 'ANKLE APL/APO' && (
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
                                {showData?.type?.name === 'ANKLE APL/APO + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'ANKLE BOTH APL + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'ANKLE MORTISSE VIEW (RIGHT) + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'ARM APL RIGHT' && (
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
                                {showData?.type?.name === 'AXILLARY VIEW + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'CALCANEUS (LATERAL VIEW)' && (
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
                                {showData?.type?.name === 'CALCANEUS + PORTABLE' && (
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
                                {showData?.type?.name === 'CERVICAL APL + OBLIQUES' && (
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
                                {showData?.type?.name === 'CERVICAL APL + OBLIQUES + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'CERVICAL APO' && (
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
                                {showData?.type?.name === 'CERVICOTHORACIC SPINE APL' && (
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
                                {showData?.type?.name === 'CHEST APL + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'CHEST AP + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'CHEST CONE DOWN VIEW + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'Chest Lateral View Only + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'CHEAST PAL + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'CHEST PA + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'CHEST RPO  RIGHT POSTERIOR OBLIQUE ' && (
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
                                {showData?.type?.name === 'CHEST SPOT VIEW LEFT UPPER LF' && (
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
                                {showData?.type?.name === 'CHEST SPOT VIEW LEFT UPPER LF + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'CHEST SPOT VIEW RIGHT LOWER LF' && (
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
                                {showData?.type?.name === 'CHEST SPOT VIEW RIGHT LOWER LF + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'CHEST SPOT VIEW RIGHT ULF' && (
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
                                {showData?.type?.name === 'CHEST SPOT VIEW RIGHT ULF + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'CLAVICLE AP WITH CEPHALIC TILT+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'CLAVICLE R and L+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'COCCYX APL + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'COCCYX AP + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'DIGIT APL/APO+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'Elbow, Both APL+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'Foot APL  BILATERAL ' && (
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
                                {showData?.type?.name === 'Foot APL  BILATERAL + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'FOOT APL BOTH' && (
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
                                {showData?.type?.name === 'Foot APL  left ' && (
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
                                {showData?.type?.name === 'FOOT APL  Left + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'FOOT APO  Left ' && (
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
                                {showData?.type?.name === 'Foot APO  left + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'Foot APO  right ' && (
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
                                {showData?.type?.name === 'Foot APO  right + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'FOOT AP+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'Foot Lateral View  right ' && (
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
                                {showData?.type?.name === 'Foot Lateral View  right + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'Forearm, Both APL+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'HAND APL RIGHT + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'Hand APO  left ' && (
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
                                {showData?.type?.name === 'Hand Lateral View  right ' && (
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
                                {showData?.type?.name === 'Hand Lateral View  right + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'Hand Left  Bone Aging ' && (
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
                                {showData?.type?.name === 'Hand Left  Bone Aging + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'HARD COPY IMAGE X-RAY' && (
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
                                {showData?.type?.name === 'HIP AP / CT APL' && (
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
                                {showData?.type?.name === 'HIP AP / CT APL+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'Humerus AP' && (
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
                                {showData?.type?.name === 'Humerus, Both APL + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'INTRA-OP X 3 SHOTS' && (
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
                                {showData?.type?.name === 'INTRA-OP X 4 SHOTS' && (
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
                                {showData?.type?.name === 'IVP X 2 SHOTS' && (
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
                                {showData?.type?.name === 'IVP X 3 SHOTS' && (
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
                                {showData?.type?.name === 'IVP X 5 SHOTS' && (
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
                                {showData?.type?.name === 'IVP X 6 SHOTS' && (
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
                                {showData?.type?.name === 'IVP X 7 SHOTS' && (
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
                                {showData?.type?.name === 'IVP X 8 SHOTS' && (
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
                                {showData?.type?.name === 'JUDET VIEW-LEFT,HIP JOINT' && (
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
                                {showData?.type?.name === 'JUDET VIEW-LEFT,HIP JOINT+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'JUDET VIEW-RIGHT,HIP JOINT+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'Knee APL  left ' && (
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
                                {showData?.type?.name === 'Knee APL  left + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'Knees, Both APL' && (
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
                                {showData?.type?.name === 'Knees, Both APL+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'Knee, Tunnel View Left + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'Knee Tunnel View right ' && (
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
                                {showData?.type?.name === 'KUB  x-ray + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'LEG APL+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'Leg APL  right ' && (
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
                                {showData?.type?.name === 'LUMBAR APL+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'LUMBOSACRAL  L/S  OBLIQUE' && (
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
                                {showData?.type?.name === 'LUMBOSACRAL  L/S  OBLIQUE+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'LUMBOSACRAL SPINE APL + OBLIQUE+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'LUMBOSACRAL SPINE APL+ PORTABLE FEE"' && (
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
                                {showData?.type?.name === 'MANDIBLE APO+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'MASTOID SERIES' && (
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
                                {showData?.type?.name === 'MASTOID SERIES+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'NASAL BONE+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'ORBIT CALDWELL+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'ORBIT WATER AND CALDWELL+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'OS CALCIS VIEW+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'PARANASAL SINUSES+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'PELVIS APL+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'PELVIS AP+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'RGP X 1 SHOT' && (
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
                                {showData?.type?.name === 'RGP X 2 SHOT' && (
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
                                {showData?.type?.name === 'RGP X 3 SHOT' && (
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
                                {showData?.type?.name === 'RGP X 4 SHOT' && (
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
                                {showData?.type?.name === 'RGP X 5 SHOT' && (
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
                                {showData?.type?.name === 'SCAPULA LAT+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'Scoliosis Series' && (
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
                                {showData?.type?.name === 'Scoliosis Series+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'SECOND COPY OF RESULT  OPD ONLY ' && (
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
                                {showData?.type?.name === 'SHOULDER AP L+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'SHOULDER APO  R + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'SHOULDER AP R+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'SKULL AP+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'SKULL LATERAL VIEW+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'SKULL SERIES   APL + Townes views +PORTABLE FEE' && (
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
                                {showData?.type?.name === 'SKULL SUBMENTOVERTEX+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'SKULL WATERS VIEW+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'TBC APL' && (
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
                                {showData?.type?.name === 'TBC with obliques' && (
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
                                {showData?.type?.name === 'TEMPORO MANDIBULAR JOINT+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'THORACIC BONY CAGE APL+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'THORACIC BONY CAGE AP + PORTABLE FEE' && (
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
                                {showData?.type?.name === 'THORACIC BONY CAGE R & L OBLIQUE+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'THORACIC BONY CAGE with obliques+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'THORACO BONY CAGE  TBC  W/ OBLIQUES' && (
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
                                {showData?.type?.name === 'THORACOLUMBAR APL' && (
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
                                {showData?.type?.name === 'THORACOLUMBAR AP' && (
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
                                {showData?.type?.name === 'TIBIAL PLATEAU  BOTH OBLIQUES ' && (
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
                                {showData?.type?.name === 'WRIST APO LEFT' && (
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
                                {showData?.type?.name === 'Wrist APL  left ' && (
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
                                {showData?.type?.name === 'WRIST APO+ PORTABLE FEE' && (
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
                                {showData?.type?.name === 'WRIST APO RIGHT' && (
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
                                {showData?.type?.name === 'Wrist, Both APL' && (
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
                            </div>
                            <div className="px-4 py-4 border-t flex items-center justify-end bg-slate-">
                                <ActionBtn type="danger" className="px-5" onClick={hide}>
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
export default forwardRef(ViewImgResultModal);
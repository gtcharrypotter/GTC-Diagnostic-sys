/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import ActionBtn from '../../../components/buttons/ActionBtn';
import CollapseDiv from '../../../components/CollapseDiv';
import { abdomenLib, alcoholHist, chestLib, digitalRectalLib, drugsHist, familyHistory, genitourinaryLib, heartLib, heentLib, immunizationAdult, immunizationChildren, immunizationElder, immunizationPregnant, medicalSurgicalHistories, neuroLib, sexualHist, skinLib, smokingHist } from '../../../libs/appointmentOptions';
import { Controller, useForm } from 'react-hook-form';
import TextInputField from '../../../components/inputs/TextInputField';
import { keyByValue } from '../../../libs/helpers';
import RadioInput from '../../../components/inputs/RadioInput';
import ReactSelectInputField from '../../../components/inputs/ReactSelectInputField';
import { typeOfDelivery } from '../../../libs/patientFormOptions';
import TextAreaField from '../../../components/inputs/TextAreaField';
import FlatIcon from '../../../components/FlatIcon';
import Axios from '../../../libs/axios';
import { toast } from 'react-toastify';

const ConsultationServices = (props) => {
    const {appointment, onSuccess} = props
	
    const {
		register,
		getValues,
		setValue,
		control,
		reset,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [loading, setLoading] = useState(false);
	const submit = (data) => {
		setLoading(true);
		console.log("Form Data Submitted:", data);
		const formData = new FormData();
			formData.append("patient_id", appointment?.patient?.id);

			formData.append("anicteric_sclerae", data?.anicteric_sclerae);
			formData.append("exudates", data?.exudates);
			formData.append("essentially_normal_heent", data?.essentially_normal_heent);
			formData.append("abnormal_pupillary", data?.abnormal_pupillary);
			formData.append("cervical_lympadenopathy", data?.cervical_lympadenopathy);
			formData.append("dry_mucous_membrane", data?.dry_mucous_membrane);
			formData.append("icteric_sclerae", data?.icteric_sclerae);
			formData.append("pale_conjunctivae", data?.pale_conjunctivae);
			formData.append("sunken_eyeballs", data?.sunken_eyeballs);
			formData.append("sunken_fontanelle", data?.sunken_fontanelle);
			formData.append("intact_tympanic", data?.intact_tympanic);
			formData.append("pupils_brisky", data?.pupils_brisky);
			formData.append("tonsillopharyngeal", data?.tonsillopharyngeal);
			formData.append("hypertropic_tonsils", data?.hypertropic_tonsils);
			formData.append("alar_flaring", data?.alar_flaring);
			formData.append("nasal_discharge", data?.nasal_discharge);
			formData.append("aural_discharge", data?.aural_discharge);
			formData.append("palpable_mass", data?.palpable_mass);
			formData.append("others_heent", data?.others_heent);
			
			//chest
			formData.append("symmetrical", data?.symmetrical);
			formData.append("lumps_over_breast", data?.lumps_over_breast);
			formData.append("clear_breath_sounds", data?.clear_breath_sounds);
			formData.append("retractions", data?.retractions);
			formData.append("crackles", data?.crackles);
			formData.append("wheezes", data?.wheezes);
			formData.append("essentially_normal_chest", data?.essentially_normal_chest);
			formData.append("asymmetrical_chest_expansion", data?.asymmetrical_chest_expansion);
			formData.append("decreased_breath_sounds", data?.decreased_breath_sounds);
			formData.append("enlarge_axillary", data?.enlarge_axillary);
			formData.append("others_chest", data?.others_chest);
		
			//heart
			formData.append("adynamic_precordium", data?.adynamic_precordium);
			formData.append("regular_rhythm", data?.regular_rhythm);
			formData.append("heaves", data?.heaves);
			formData.append("murmurs", data?.murmurs);
			formData.append("essentially_normal_heart", data?.essentially_normal_heart);
			formData.append("apex_beat", data?.apex_beat);
			formData.append("irregular_rhythm", data?.irregular_rhythm);
			formData.append("muffled_heart", data?.muffled_heart);
			formData.append("pericardial_bulge", data?.pericardial_bulge);
			formData.append("others_heart", data?.others_heart);
			
			
			//genitourinary
			formData.append("essentially_normal_genitourinary", data?.essentially_normal_genitourinary);
			formData.append("blood_stained", data?.blood_stained);
			formData.append("cervical_dilatation", data?.cervical_dilatation);
			formData.append("abnormal_discharge", data?.abnormal_discharge);
			formData.append("others_genitourinary", data?.others_genitourinary);
			
			//digital
			formData.append("essentially_normal_digital", data?.essentially_normal_digital);
			formData.append("enlarge_prospate", data?.enlarge_prospate);
			formData.append("mass", data?.mass);
			formData.append("hemorrhoids", data?.hemorrhoids);
			formData.append("pus", data?.pus);
			formData.append("not_applicable", data?.not_applicable);
			formData.append("others_digital", data?.others_digital);
			
			//skin
			formData.append("essentially_normal_skin", data?.essentially_normal_skin);
			formData.append("weak_pulses", data?.weak_pulses);
			formData.append("clubbing", data?.clubbing);
			formData.append("cold_clammy", data?.cold_clammy);
			formData.append("cyanosis", data?.cyanosis);
			formData.append("edema_swelling", data?.edema_swelling);
			formData.append("decreased_mobility", data?.decreased_mobility);
			formData.append("pale_nailbeds", data?.pale_nailbeds);
			formData.append("poor_skin_turgor", data?.poor_skin_turgor);
			formData.append("rashes_petechiae", data?.rashes_petechiae);
			formData.append("others_skin", data?.others_skin);

			//abdomen
			formData.append("flat", data?.flat);
			formData.append("hyperactive_bowel", data?.hyperactive_bowel);
			formData.append("tympanitic", data?.tympanitic);
			formData.append("uterine_contraction", data?.uterine_contraction);
			formData.append("flabby", data?.flabby);
			formData.append("globullar", data?.globullar);
			formData.append("muscle_guarding", data?.muscle_guarding);
			formData.append("tenderness_abdomen", data?.tenderness_abdomen);
			formData.append("palpable_mass", data?.palpable_mass);
			formData.append("essentially_normal_abodomen", data?.essentially_normal_abodomen);
			formData.append("abdomen_rigidity", data?.abdomen_rigidity);
			formData.append("abdominal_tenderness", data?.abdominal_tenderness);
			formData.append("other_abdomen", data?.other_abdomen);

			//neuro
			formData.append("developmental_delay", data?.developmental_delay);
			formData.append("abnormal_reflex", data?.abnormal_reflex);
			formData.append("poor_altered", data?.poor_altered);
			formData.append("poor_muscle_tone", data?.poor_muscle_tone);
			formData.append("poor_coordination", data?.poor_coordination);
			formData.append("seizures", data?.seizures);
			formData.append("normal", data?.normal);
			formData.append("motor_deficit", data?.motor_deficit);
			formData.append("sensory_deficit", data?.sensory_deficit);
			formData.append("essentially_normal_neuro", data?.essentially_normal_neuro);
			formData.append("abnormal_gait", data?.abnormal_gait);
			formData.append("abnormal_position", data?.abnormal_position);
			formData.append("abnormal_sensation", data?.abnormal_sensation);
			formData.append("others_neuro", data?.others_neuro);

			const config = {
			headers: { "Content-Type": "multipart/form-data" },
			};
		Axios.post(`/v1/opd-standalone/update-pertinent/${appointment.id}`, formData, config)
            .then(() => {
                setTimeout(() => {
                    setLoading(false);
                    onSuccess && onSuccess();
                    toast.success("Successfully updated!");
                }, 300);
            })
            .catch((err) => {
                setLoading(false);
                toast.error("Failed to update data.");
            });
	};
	console.log("Immunization DAta", appointment)
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 ">
								{appointment?.status == (['pending-doctor-consultation']) ? (
									""
								) : (
									<>
									<div className="lg:col-span-12">
									<CollapseDiv
										defaultOpen={false}
										withCaret={true}
										title="Medical Surgical History"
										headerClassName={`bg-blue-50 ${
											medicalSurgicalHistories?.some(
											(data) =>
												appointment?.patient?.surgical_history &&
												appointment.patient?.surgical_history[data?.name] !== "false" &&
												appointment.patient?.surgical_history[data?.name] !== "undefined" &&
												appointment.patient?.surgical_history[data?.name] !== null
											)
											? "text-blue-600"
											: "text-black"
										}`}
										bodyClassName="p-0"
									>
									
										<h4 className="border-y-2 text-base font-semibold p-2 mb-4">
											Medical Surgical History
										</h4>

										<div className="table table-bordered">
											<table className="bordered">
												<thead>
													<tr>
														<th className="w-1/3">
															Click if patient has an
															experience
														</th>
														<th>
															Details (i.e.
															medications taken, year
															diagnosed, year of
															surgery or injury, etc.)
														</th>
													</tr>
												</thead>
												<tbody>
													{medicalSurgicalHistories?.map(
														(data) => {
															return (
																<tr
																	key={`${keyByValue(
																		data?.label
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 p-2 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				checked={
																					appointment?.patient?.surgical_history &&
																					appointment
																						?.patient?.surgical_history[
																						data
																							?.name
																					] !==
																						"false" &&
																					appointment
																						?.patient?.surgical_history[
																						data
																							?.name
																					] !==
																						"undefined" &&
																						appointment
																						?.patient?.surgical_history[
																						data
																							?.name
																					] !==
																						null
																				}
																				readOnly
																				{...register(
																					data?.name,
																					{}
																				)}
																			/>
																			<span>
																				{
																					data?.label
																				}
																			</span>
																		</label>
																	</td>
																	<td className="p-1">
																		<TextInputField
																			inputClassName="bg-white"
																			placeholder={`${data?.label} details...`}
																			disabled={
																				appointment?.patient?.surgical_history &&
																				appointment
																					?.patient?.surgical_history[
																					data
																						?.name
																				]
																					? false
																					: true
																			}
																			{...register(
																				`${data?.name}_details`,
																				{}
																			)}
																		/>
																	</td>
																</tr>
															);
														}
													)}
												</tbody>
											</table>
										</div>
									
									</CollapseDiv>
									</div>
									<div className="lg:col-span-12">
									<CollapseDiv
										defaultOpen={false}
										withCaret={true}
										title="Family & Personal History"
										headerClassName={`bg-blue-50 ${
											familyHistory?.some(
											(data) =>
												appointment?.patient?.family_history &&
												appointment.patient?.family_history[data?.name] !== "false" &&
												appointment.patient?.family_history[data?.name] !== "undefined" &&
												appointment.patient?.family_history[data?.name] !== null
											)
											? "text-blue-600"
											: "text-black"
										}`}
										bodyClassName="p-0"
									>
									<div className="lg:col-span-12">
										<h4 className="border-y-2 text-base font-semibold p-2 mb-3">
											Family History
										</h4>
										<div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4 px-2 w-full">
										<div className="flex flex-col lg:col-span-4">
											{familyHistory?.map(
														(data, index) => {
															if (index <= 6)
															return (
																<tr
																	key={`${keyByValue(
																		data?.label
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 p-2 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				checked={
																					appointment?.patient?.family_history &&
																					appointment
																						?.patient?.family_history[
																						data
																							?.name
																					] !==
																						"false" &&
																						appointment
																						?.patient?.family_history[
																						data
																							?.name
																					] !==
																						"undefined" &&
																					appointment
																						?.patient?.family_history[
																						data
																							?.name
																					] !==
																						null
																				}
																				readOnly
																				{...register(
																					data?.name,
																					{}
																				)}
																			/>
																			<span>
																				{
																					data?.label
																				}
																			</span>
																		</label>
																	</td>
																</tr>
															);
														}
											)}		
										</div>
										<div className="flex flex-col lg:col-span-3">
											{familyHistory?.map(
														(data, index) => {
															if (
																	index > 6 &&
																	index <=13
																)
															return (
																<tr
																	key={`${keyByValue(
																		data?.label
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 p-2 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				checked={
																					appointment?.patient?.family_history &&
																					appointment
																						?.patient?.family_history[
																						data
																							?.name
																					] !==
																						"false" &&
																						appointment
																						?.patient?.family_history[
																						data
																							?.name
																					] !==
																						"undefined" &&
																					appointment
																						?.patient?.family_history[
																						data
																							?.name
																					] !==
																						null
																				}
																				readOnly
																				{...register(
																					data?.name,
																					{}
																				)}
																			/>
																			<span>
																				{
																					data?.label
																				}
																			</span>
																		</label>
																	</td>
																</tr>
															);
														}
											)}	
										</div>
										<div className="flex flex-col lg:col-span-5">
											{familyHistory?.map(
														(data, index) => {
															if (
																	index > 13
																)
															return (
																<tr
																	key={`${keyByValue(
																		data?.label
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 p-2 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				checked={
																					appointment?.patient?.family_history &&
																					appointment
																						?.patient?.family_history[
																						data
																							?.name
																					] !==
																						"false" &&
																						appointment
																						?.patient?.family_history[
																						data
																							?.name
																					] !==
																						"undefined" &&
																					appointment
																						?.patient?.family_history[
																						data
																							?.name
																					] !==
																						null
																				}
																				readOnly
																				{...register(
																					data?.name,
																					{}
																				)}
																			/>
																			<span>
																				{
																					data?.label
																				}
																			</span>
																		</label>
																		{data?.specify ? (
																				<TextInputField
																					labelClassName="whitespace-nowrap"
																					className="flex items-center gap-4"
																					inputClassName="!p-2 !h-8"
																					label={`${data?.specify}:`}
																					placeholder="Please specify"
																					disabled={
																						!watch(
																							data?.name
																						)
																					}
																					{...register(
																						`${data?.name}_details`
																					)}
																				/>
																			) : (
																				""
																			)}
																	</td>
																</tr>
															);
														}
											)}	
										</div>
										</div>
										
									</div>
									<div className="lg:col-span-12 mt-2">
									<h4 className="border-y-2 text-base font-semibold p-2 mb-3">
										Personal/Social History
									</h4>

									{/* SMOKING */}
									<div>
										<span className="text-blue-600 text-sm font-bold px-2">Smoking</span>
										<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
										{smokingHist?.map((data) => (
											<label
											key={keyByValue(data?.label)}
											className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600"
											>
											<input
												type="radio"
												value={data?.label}
												checked={
												appointment?.patient?.social_history?.smoker === data?.label
												}
												readOnly
												{...register("smoker")}
											/>
											<span>{data?.label}</span>
											</label>
										))}
										</div>
									</div>

									{/* ALCOHOL */}
									<div>
										<span className="text-blue-600 text-sm font-bold px-2">Alcohol</span>
										<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
										{alcoholHist?.map((data) => (
											<label
											key={keyByValue(data?.label)}
											className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600"
											>
											<input
												type="radio"
												value={data?.label}
												checked={
												appointment?.patient?.social_history?.alcohol_drinker === data?.label
												}
												readOnly
												{...register("alcohol_drinker")}
											/>
											<span>{data?.label}</span>
											</label>
										))}
										</div>
									</div>

									{/* DRUGS */}
									<div>
										<span className="text-blue-600 text-sm font-bold px-2">Ilicit Drugs</span>
										<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
										{drugsHist?.map((data) => (
											<label
											key={keyByValue(data?.label)}
											className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600"
											>
											<input
												type="radio"
												value={data?.label}
												checked={
												appointment?.patient?.social_history?.drug_user === data?.label
												}
												readOnly
												{...register("drug_user")}
											/>
											<span>{data?.label}</span>
											</label>
										))}
										</div>
									</div>

									{/* SEXUAL HISTORY */}
									<div>
										<span className="text-blue-600 text-sm font-bold px-2">
										Sexual History Screening
										</span>
										<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
										{sexualHist?.map((data) => (
											<label
											key={keyByValue(data?.label)}
											className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600"
											>
											<input
												type="radio"
												value={data?.label}
												checked={
												appointment?.patient?.social_history?.sexually_active === data?.label
												}
												readOnly
												{...register("sexually_active")}
											/>
											<span>{data?.label}</span>
											</label>
										))}
										</div>
									</div>
									</div>

									</CollapseDiv>
									</div>
									<div className="lg:col-span-12">
									<CollapseDiv
										defaultOpen={false}
										withCaret={true}
										title="Immunizations"
										headerClassName={`bg-blue-50 ${
											immunizationChildren?.some(
											(data) =>
												appointment?.patient?.immunization_child &&
												appointment.patient?.immunization_child[data?.name] !== "false" &&
												appointment.patient?.immunization_child[data?.name] !== 'undefined' &&
												appointment.patient?.immunization_child[data?.name] !== null 
											) ||
											immunizationAdult?.some(
											(data) =>
												appointment?.patient?.immunization_adult &&
												appointment.patient?.immunization_adult[data?.name] !== "false" &&
												appointment.patient?.immunization_adult[data?.name] !== 'undefined' &&
												appointment.patient?.immunization_adult[data?.name] !== null
											) ||
											immunizationPregnant?.some(
											(data) =>
												appointment?.patient?.immunization_pregnant &&
												appointment.patient?.immunization_pregnant[data?.name] !== "false" &&
												appointment.patient?.immunization_pregnant[data?.name] !== 'undefined' &&
												appointment.patient?.immunization_pregnant[data?.name] !== null
											) ||
											immunizationElder?.some(
											(data) =>
												appointment?.patient?.immunization_elder &&
												appointment.patient?.immunization_elder[data?.name] !== "false" &&
												appointment.patient?.immunization_elder[data?.name] !== 'undefined' &&
												appointment.patient?.immunization_elder[data?.name] !== null
											)
											? "text-blue-600"
											: "text-black"
										}`}
										bodyClassName="p-0"
									>
									<div className="lg:col-span-12">
										<div className="grid grid-cols-2">
											<table className="">
												<thead>
													<tr>
														<th className="w-1/4">
															For Children
														</th>
													</tr>
												</thead>
												<tbody>
													{immunizationChildren?.map(
														(data) => {
															return (
																<tr
																	key={`${keyByValue(
																		data?.label
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 p-2 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				checked={
																					appointment?.patient?.immunization_child &&
																					appointment
																						?.patient?.immunization_child[
																						data
																							?.name
																					] !==
																						"false" &&
																					appointment
																						?.patient?.immunization_child[
																						data
																							?.name
																					] !==
																						'undefined' &&
																					appointment
																						?.patient?.immunization_child[
																						data
																							?.name
																					] !==
																						null
																						
																				}
																				readOnly
																				{...register(
																					data?.name,
																					{}
																				)}
																			/>
																			<span>
																				{
																					data?.label
																				}
																			</span>
																		</label>
																	</td>
																</tr>
															);
														}
													)}
												</tbody>
											</table>
											<table className="">
												<div className="flex flex-col gap-2">
													<>
													<thead>
													<tr>
														<th className="">
															For Adult
														</th>
														
													</tr>
												</thead>
												<tbody>
													{immunizationAdult?.map(
														(data) => {
															return (
																<tr
																	key={`${keyByValue(
																		data?.label
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 p-2 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				checked={
																					appointment?.patient?.immunization_adult &&
																					appointment
																						?.patient?.immunization_adult[
																						data
																							?.name
																					] !==
																						"false" &&
																					appointment
																						?.patient?.immunization_adult[
																						data
																							?.name
																					] !==
																						'undefined'
																						&&
																					appointment
																						?.patient?.immunization_adult[
																						data
																							?.name
																					] !==
																						null
																				}
																				readOnly
																				{...register(
																					data?.name,
																					{}
																				)}
																			/>
																			<span>
																				{
																					data?.label
																				}
																			</span>
																		</label>
																	</td>
																</tr>
															);
														}
													)}
												</tbody>
													</>
													<>
													<thead>
													<tr>
														<th className="">
															For Pregnant Women
														</th>
														
													</tr>
												</thead>
												<tbody>
													{immunizationPregnant?.map(
														(data) => {
															return (
																<tr
																	key={`${keyByValue(
																		data?.label
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 p-2 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				checked={
																					appointment?.patient?.immunization_pregnant &&
																					appointment
																						?.patient?.immunization_pregnant[
																						data
																							?.name
																					] !==
																						"false" &&
																					appointment
																						?.patient?.immunization_pregnant[
																						data
																							?.name
																					] !==
																						'undefined' &&
																					appointment
																						?.patient?.immunization_pregnant[
																						data
																							?.name
																					] !==
																						null
																				}
																				readOnly
																				{...register(
																					data?.name,
																					{}
																				)}
																			/>
																			<span>
																				{
																					data?.label
																				}
																			</span>
																		</label>
																	</td>
																</tr>
															);
														}
													)}
												</tbody>
													</>
													<>
													<thead>
													<tr>
														<th className="">
															For Elderly & Immunocompromised
														</th>
														
													</tr>
												</thead>
												<tbody>
													{immunizationElder?.map(
														(data) => {
															return (
																<tr
																	key={`${keyByValue(
																		data?.label
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 p-2 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				checked={
																					appointment?.patient?.immunization_elder &&
																					appointment
																						?.patient?.immunization_elder[
																						data
																							?.name
																					] !==
																						"false" &&
																					appointment
																						?.patient?.immunization_elder[
																						data
																							?.name
																					] !==
																						'undefined' &&
																					appointment
																						?.patient?.immunization_elder[
																						data
																							?.name
																					] !==
																						null
																				}
																				readOnly
																				{...register(
																					data?.name,
																					{}
																				)}
																			/>
																			<span>
																				{
																					data?.label
																				}
																			</span>
																		</label>
																	</td>
																</tr>
															);
														}
													)}
												</tbody>
													</>
												</div>
											</table>
											
										</div>
									</div>
									</CollapseDiv>
									</div>
									{appointment?.patient?.gender == "Female" ? (
										<div className="lg:col-span-12">
									<CollapseDiv
										defaultOpen={false}
										withCaret={true}
										title="OB-Gyne History"
										headerClassName={`bg-blue-50 ${
												appointment?.patient?.pregnancy_history && appointment?.patient?.pregnancy_history !== null
												? 'text-black'
												: 'text-blue-600'
											}`}
										bodyClassName="p-0"
									>
									<div className="lg:col-span-12 mb-4">
										<h4 className="border-y-2 text-base font-semibold p-2 mb-3 ">
											Family Planning
										</h4>
										<RadioInput
																
											label={
												<>
												With access to family planning counseling?
												
												</>
											}
										>
											{[
												{
													label: "Yes",
													value: "Yes",
												},
												{
													label: "No",
													value: "No",
												},
											]?.map(
												(
													option,
													indx
												) => {
													return (
														<label
															className="flex items-center gap-1 font-light text-sm"
															key={`rdio-${option?.value}`}
														>
															<input
																type="radio"
																value={
																	option?.value
																}
																id={`irdio-${option?.value}`}
																checked={
																			appointment?.patient?.pregnancy_history?.family_planning === option.value
																		}
																		readOnly
															/>
															{
																option?.label
															}
														</label>
													);
												}
											)}
										</RadioInput>
									</div>
									<div className="grid grid-cols-2 gap-2 divide-x-2 divide-gray-200">
									<div className="mb-4 p-2">
										<h4 className="border-y-2 text-base font-semibold p-2 mb-3 ">
											Menstrual History
										</h4>
										<RadioInput
																
											label={
												<>
												With access to family planning counseling?
												
												</>
											}
										>
											{[
												{
													label: "Applicable",
													value: "Applicable",
												},
												{
													label: "Not Applicable",
													value: "Not Applicable",
												},
											]?.map(
												(
													option,
													indx
												) => {
													return (
														<label
															className="flex items-center gap-1 font-light text-sm"
															key={`rdio-${option?.value}`}
														>
															<input
																type="radio"
																value={
																	option?.value
																}
																id={`irdio-${option?.value}`}
																checked={
																			appointment?.patient?.pregnancy_history?.menstrual_history === option.value
																		}
																readOnly
																			
															/>
															{
																option?.label
															}
														</label>
													);
												}
											)}
										</RadioInput>
										<div className="grid grid-cols-1 lg:grid-cols-12 gap-2 mt-8">
											<TextInputField
												label="Menarche"
												className="w-1/2 lg:col-span-6"
												value={
													appointment?.patient?.pregnancy_history?.menarche 
														? appointment.patient?.pregnancy_history.menarche
														: ""
												}
												readOnly
												{...register(
															"menarche",
														)}
											/>
											<TextInputField
												label="Birth Control Method"
												className="w-1/2 lg:col-span-6"
												value={
													appointment?.patient?.pregnancy_history?.birth_control 
														? appointment.patient?.pregnancy_history.birth_control
														: ""
												}
												readOnly
											/>
											<TextInputField
												label="Last Menstrual Period"
												className="w-1/2 lg:col-span-6"
												type="date"
												value={
													appointment?.patient?.pregnancy_history?.last_menstrual_period 
														? appointment.patient?.pregnancy_history.last_menstrual_period
														: ""
												}
												readOnly
											/>
											<TextInputField
												label="Interval Cycle"
												className="w-1/2 lg:col-span-6"
												value={
													appointment?.patient?.pregnancy_history?.interval_cycle 
														? appointment.patient?.pregnancy_history.interval_cycle
														: ""
												}
												readOnly
											/>
											<TextInputField
												label="Period Duration"
												className="w-1/2 lg:col-span-6"
												value={
													appointment?.patient?.pregnancy_history?.period_duration 
														? appointment.patient?.pregnancy_history.period_duration
														: ""
												}
												readOnly
											/>
											<RadioInput
												label={
													<>
													Menopause
													
													</>
												}
											>
												{[
													{
														label: "Yes",
														value: "Yes",
													},
													{
														label: "No",
														value: "No",
													},
												]?.map(
													(
														option,
														indx
													) => {
														return (
															<label
																className="flex items-center gap-1 font-light text-sm"
																key={`rdio-${option?.value}`}
															>
																<input
																	type="radio"
																	value={
																		option?.value
																	}
																	id={`irdio-${option?.value}`}
																	checked={
																			appointment?.patient?.pregnancy_history?.menopause === option.value
																		}
																		readOnly
																/>
																{
																	option?.label
																}
															</label>
														);
													}
												)}
											</RadioInput>
											<TextInputField
												label="No. of Pads/Day During Menstruation"
												className="w-1/2 lg:col-span-6"
												value={
													appointment?.patient?.pregnancy_history?.pads_per_menstual 
														? appointment.patient?.pregnancy_history.pads_per_menstual
														: ""
												}
												readOnly
											/>
											<TextInputField
												label="if yes, what age?"
												className="w-1/2 lg:col-span-6"
												value={
													appointment?.patient?.pregnancy_history?.age_menopause 
														? appointment.patient?.pregnancy_history.age_menopause
														: ""
												}
												readOnly
											/>
											<TextInputField
												label="Onset of Sexual Intercourse"
												className="w-1/2 lg:col-span-6"
												value={
													appointment?.patient?.pregnancy_history?.sexual_intercourse 
														? appointment.patient?.pregnancy_history.sexual_intercourse
														: ""
												}
												readOnly
											/>
										</div>
									</div>
									<div className="mb-4 p-2">
										<h4 className="border-y-2 text-base font-semibold p-2 mb-3 ">
											Pregnancy History
										</h4>
										<RadioInput
																
											label={
												<>
												With access to family planning counseling?
												
												</>
											}
										>
											{[
												{
													label: "Applicable",
													value: "Applicable",
												},
												{
													label: "Not Applicable",
													value: "Not Applicable",
												},
											]?.map(
												(
													option,
													indx
												) => {
													return (
														<label
															className="flex items-center gap-1 font-light text-sm"
															key={`rdio-${option?.value}`}
														>
															<input
																type="radio"
																value={
																	option?.value
																}
																id={`irdio-${option?.value}`}
																checked={
																			appointment?.patient?.pregnancy_history?.pregnancy_history === option.value
																		}
																		readOnly
															/>
															{
																option?.label
															}
														</label>
													);
												}
											)}
										</RadioInput>
										<div className="grid grid-cols-1 lg:grid-cols-12 gap-2 mt-8">
											<TextInputField
												label="Gravidity (No. of Pregnancy)"
												className="w-1/2 lg:col-span-6"
												value={
													appointment?.patient?.pregnancy_history?.gravidity 
														? appointment.patient?.pregnancy_history.gravidity
														: ""
												}
												readOnly
											/>
											<TextInputField
												label="No. of Premature"
												className="w-1/2 lg:col-span-6"
												value={
													appointment?.patient?.pregnancy_history?.premature 
														? appointment.patient?.pregnancy_history.premature
														: ""
												}
												readOnly
											/>
											<TextInputField
												label="Parity (No. of Delivery)"
												className="w-1/2 lg:col-span-6"
												value={
													appointment?.patient?.pregnancy_history?.parity 
														? appointment.patient?.pregnancy_history.parity
														: ""
												}
												readOnly
											/>
											<TextInputField
												label="No. of Abortion"
												className="w-1/2 lg:col-span-6"
												value={
													appointment?.patient?.pregnancy_history?.abortion 
														? appointment.patient?.pregnancy_history.abortion
														: ""
												}
												readOnly
											/>
											<div className=" lg:col-span-6">
												<RadioInput
																
											label={
												<>
												Type of Delivery
												
												</>
											}
										>
											{[
												{
													label: "Applicable",
													value: "Applicable",
												},
												{
													label: "Not Applicable",
													value: "Not Applicable",
												},
											]?.map(
												(
													option,
													indx
												) => {
													return (
														<label
															className="flex items-center gap-1 font-light text-sm"
															key={`rdio-${option?.value}`}
														>
															<input
																type="radio"
																value={
																	option?.value
																}
																id={`irdio-${option?.value}`}
																checked={
																			appointment?.patient?.pregnancy_history?.type_delivery === option.value
																		}
																		readOnly
															/>
															{
																option?.label
															}
														</label>
													);
												}
											)}
												</RadioInput>
											</div>
												
											
											
											<TextInputField
												label="No. of Living Children"
												className="w-1/2 lg:col-span-6"
												value={
													appointment?.patient?.pregnancy_history?.living_children 
														? appointment.patient?.pregnancy_history.living_children
														: ""
												}
												readOnly
											/>
											<TextInputField
												label="No. of Full Term"
												className="w-1/2 lg:col-span-6"
												value={
													appointment?.patient?.pregnancy_history?.full_term 
														? appointment.patient?.pregnancy_history.full_term
														: ""
												}
												readOnly
											/>
											<div className=" lg:col-span-6">
												<RadioInput
																
											label={
												<>
												Pregnancy-induced hypertension(Pre-eclampsia)
												
												</>
											}
										>
											{[
												{
													label: "YES",
													value: "YES",
												},
											]?.map(
												(
													option,
													indx
												) => {
													return (
														<label
															className="flex items-center gap-1 font-light text-sm"
															key={`rdio-${option?.value}`}
														>
															<input
																type="radio"
																value={
																	option?.value
																}
																id={`irdio-${option?.value}`}
																checked={
																			appointment?.patient?.pregnancy_history?.induced_hypertension === option.value
																		}
																		readOnly
															/>
															{
																option?.label
															}
														</label>
													);
												}
											)}
												</RadioInput>
											</div>
											
										</div>
									</div>
									</div>
									
									</CollapseDiv>
										</div>
									) : (
										""
									)}
									{appointment?.status === 'in-service-result-reading' ? (
										<>
										<div className="lg:col-span-12">
									
									</div>
										</>
									) : ("")}
									
							
								
									</>
								)}
							</div>
    </div>
  )
}

export default ConsultationServices

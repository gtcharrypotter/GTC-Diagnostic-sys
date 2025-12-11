/* eslint-disable react/prop-types */
import React from 'react'
import { abdomenLib, chestLib, digitalRectalLib, genitourinaryLib, heartLib, heentLib, neuroLib, skinLib } from '../libs/appointmentOptions';
import { keyByValue } from '../libs/helpers';
import CollapseDiv from './CollapseDiv';
import RadioInput from './inputs/RadioInput';
import TextInputField from './inputs/TextInputField';
import { alcoholHist, drugsHist, familyHistory, immunizationAdult, immunizationChildren, immunizationElder, immunizationPregnant, medicalSurgicalHistories, sexualHist, smokingHist } from '../libs/appointmentOptions';
import { useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import ActionBtn from './buttons/ActionBtn';

const Card = ({ title, children, icon, color }) => {
	return (
		<div className="shadow-sm rounded-xl flex items-center p-3 w-1/2 2xl:w-[calc(100%/3-24px)] border-[0.5px] border-blue-300">
			<div className="flex flex-col pb-3">
				<h3
					className="text-base font-bold text-gray-900 mb-0 text-opacity-75"
					style={{ color: color }}
				>
					{title}
				</h3>
				<div className="h-[3px] w-4/5 bg-blue-300 mb-[1px]" />
				<div className="h-[2px] w-2/5 bg-red-300 mb-3" />
				{children}
			</div>
			<div className="p-1 bg-white bg-opacity-5 rounded-xl ml-auto">
				<img
					src={`/vitals/${icon}.png`}
					className="w-10 object-contain"
				/>
			</div>
		</div>
	);
};

const HealthAssessment = (props) => {
    const { patient } = props;
	const componentRef = React.useRef(null);
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
	const handlePrint = useReactToPrint({
			content: () => componentRef.current,
		});
        console.log('cccccccccccc', patient)
  return (
    <>

	<div className="grid grid-cols-1 lg:grid-cols-12 gap-3" id="phic-form-printable" ref={componentRef}>
									<>
									<div className="lg:col-span-12">
									<CollapseDiv
										defaultOpen={true}
										withCaret={true}
										title="Medical Surgical History"
										headerClassName={`bg-blue-50 ${
											medicalSurgicalHistories?.some(
											(data) =>
												patient?.surgical_history &&
												patient.surgical_history[data?.name] !== "false" &&
												patient.surgical_history[data?.name] !== "undefined" &&
												patient.surgical_history[data?.name] !== null
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
																					patient?.surgical_history &&
																					patient
																						?.surgical_history[
																						data
																							?.name
																					] !==
																						"false" &&
																					patient
																						?.surgical_history[
																						data
																							?.name
																					] !==
																						"undefined" &&
																						patient
																						?.surgical_history[
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
																				patient?.surgical_history &&
																				patient
																					?.surgical_history[
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
										defaultOpen={true}
										withCaret={true}
										title="Family & Personal History"
										headerClassName={`bg-blue-50 ${
											familyHistory?.some(
											(data) =>
												patient?.family_history &&
												patient.family_history[data?.name] !== "false" &&
												patient.family_history[data?.name] !== "undefined" &&
												patient.family_history[data?.name] !== null
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
																					patient?.family_history &&
																					patient
																						?.family_history[
																						data
																							?.name
																					] !==
																						"false" &&
																						patient
																						?.family_history[
																						data
																							?.name
																					] !==
																						"undefined" &&
																					patient
																						?.family_history[
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
																					patient?.family_history &&
																					patient
																						?.family_history[
																						data
																							?.name
																					] !==
																						"false" &&
																						patient
																						?.family_history[
																						data
																							?.name
																					] !==
																						"undefined" &&
																					patient
																						?.family_history[
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
																					patient?.family_history &&
																					patient
																						?.family_history[
																						data
																							?.name
																					] !==
																						"false" &&
																						patient
																						?.family_history[
																						data
																							?.name
																					] !==
																						"undefined" &&
																					patient
																						?.family_history[
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
												patient?.social_history?.smoker === data?.label
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
												patient?.social_history?.alcohol_drinker === data?.label
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
												patient?.social_history?.drug_user === data?.label
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
												patient?.social_history?.sexually_active === data?.label
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
										defaultOpen={true}
										withCaret={true}
										title="Immunizations"
										headerClassName={`bg-blue-50 ${
											immunizationChildren?.some(
											(data) =>
												patient?.immunization_child &&
												patient.immunization_child[data?.name] !== "false" &&
												patient.immunization_child[data?.name] !== 'undefined' &&
												patient.immunization_child[data?.name] !== null 
											) ||
											immunizationAdult?.some(
											(data) =>
												patient?.immunization_adult &&
												patient.immunization_adult[data?.name] !== "false" &&
												patient.immunization_adult[data?.name] !== 'undefined' &&
												patient.immunization_adult[data?.name] !== null
											) ||
											immunizationPregnant?.some(
											(data) =>
												patient?.immunization_pregnant &&
												patient.immunization_pregnant[data?.name] !== "false" &&
												patient.immunization_pregnant[data?.name] !== 'undefined' &&
												patient.immunization_pregnant[data?.name] !== null
											) ||
											immunizationElder?.some(
											(data) =>
												patient?.immunization_elder &&
												patient.immunization_elder[data?.name] !== "false" &&
												patient.immunization_elder[data?.name] !== 'undefined' &&
												patient.immunization_elder[data?.name] !== null
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
																					patient?.immunization_child &&
																					patient
																						?.immunization_child[
																						data
																							?.name
																					] !==
																						"false" &&
																					patient
																						?.immunization_child[
																						data
																							?.name
																					] !==
																						'undefined' &&
																					patient
																						?.immunization_child[
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
																					patient?.immunization_adult &&
																					patient
																						?.immunization_adult[
																						data
																							?.name
																					] !==
																						"false" &&
																					patient
																						?.immunization_adult[
																						data
																							?.name
																					] !==
																						'undefined'
																						&&
																					patient
																						?.immunization_adult[
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
																					patient?.immunization_pregnant &&
																					patient
																						?.immunization_pregnant[
																						data
																							?.name
																					] !==
																						"false" &&
																					patient
																						?.immunization_pregnant[
																						data
																							?.name
																					] !==
																						'undefined' &&
																					patient
																						?.immunization_pregnant[
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
																					patient?.immunization_elder &&
																					patient
																						?.immunization_elder[
																						data
																							?.name
																					] !==
																						"false" &&
																					patient
																						?.immunization_elder[
																						data
																							?.name
																					] !==
																						'undefined' &&
																					patient
																						?.immunization_elder[
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
									{patient?.gender == "Female" ? (
										<div className="lg:col-span-12">
									<CollapseDiv
										defaultOpen={true}
										withCaret={true}
										title="OB-Gyne History"
										headerClassName={`bg-blue-50 ${
												patient?.pregnancy_history && patient?.pregnancy_history !== null
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
																			patient?.pregnancy_history?.family_planning === option.value
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
																			patient?.pregnancy_history?.menstrual_history === option.value
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
													patient?.pregnancy_history?.menarche 
														? patient.pregnancy_history.menarche
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
													patient?.pregnancy_history?.birth_control 
														? patient.pregnancy_history.birth_control
														: ""
												}
												readOnly
											/>
											<TextInputField
												label="Last Menstrual Period"
												className="w-1/2 lg:col-span-6"
												type="date"
												value={
													patient?.pregnancy_history?.last_menstrual_period 
														? patient.pregnancy_history.last_menstrual_period
														: ""
												}
												readOnly
											/>
											<TextInputField
												label="Interval Cycle"
												className="w-1/2 lg:col-span-6"
												value={
													patient?.pregnancy_history?.interval_cycle 
														? patient.pregnancy_history.interval_cycle
														: ""
												}
												readOnly
											/>
											<TextInputField
												label="Period Duration"
												className="w-1/2 lg:col-span-6"
												value={
													patient?.pregnancy_history?.period_duration 
														? patient.pregnancy_history.period_duration
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
																			patient?.pregnancy_history?.menopause === option.value
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
													patient?.pregnancy_history?.pads_per_menstual 
														? patient.pregnancy_history.pads_per_menstual
														: ""
												}
												readOnly
											/>
											<TextInputField
												label="if yes, what age?"
												className="w-1/2 lg:col-span-6"
												value={
													patient?.pregnancy_history?.age_menopause 
														? patient.pregnancy_history.age_menopause
														: ""
												}
												readOnly
											/>
											<TextInputField
												label="Onset of Sexual Intercourse"
												className="w-1/2 lg:col-span-6"
												value={
													patient?.pregnancy_history?.sexual_intercourse 
														? patient.pregnancy_history.sexual_intercourse
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
																			patient?.pregnancy_history?.pregnancy_history === option.value
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
													patient?.pregnancy_history?.gravidity 
														? patient.pregnancy_history.gravidity
														: ""
												}
												readOnly
											/>
											<TextInputField
												label="No. of Premature"
												className="w-1/2 lg:col-span-6"
												value={
													patient?.pregnancy_history?.premature 
														? patient.pregnancy_history.premature
														: ""
												}
												readOnly
											/>
											<TextInputField
												label="Parity (No. of Delivery)"
												className="w-1/2 lg:col-span-6"
												value={
													patient?.pregnancy_history?.parity 
														? patient.pregnancy_history.parity
														: ""
												}
												readOnly
											/>
											<TextInputField
												label="No. of Abortion"
												className="w-1/2 lg:col-span-6"
												value={
													patient?.pregnancy_history?.abortion 
														? patient.pregnancy_history.abortion
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
																			patient?.pregnancy_history?.type_delivery === option.value
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
													patient?.pregnancy_history?.living_children 
														? patient.pregnancy_history.living_children
														: ""
												}
												readOnly
											/>
											<TextInputField
												label="No. of Full Term"
												className="w-1/2 lg:col-span-6"
												value={
													patient?.pregnancy_history?.full_term 
														? patient.pregnancy_history.full_term
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
																			patient?.pregnancy_history?.induced_hypertension === option.value
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
									<div className="lg:col-span-12">
									<CollapseDiv
										defaultOpen={true}
										withCaret={true}
										title="Pertinent Findings Per System"
										headerClassName="bg-blue-50"
										bodyClassName="p-0"
									>
									<div className="lg:col-span-12">
										<div className="grid grid-cols-3">
											<table className="">
												<div>
												<thead>
													<tr>
														<th className="w-1/4">
															A. HEENT
															<span className="text-danger ml-1">
																				*
															</span>
															{heentLib.some((data) => errors[data?.name]) && (
																<p className="text-red-500 text-xs mt-1">
																This field is required
																</p>
															)}
														</th>
													</tr>
												</thead>
												<tbody>
													{heentLib?.map(
														(data) => {
															return (
																<tr
																	key={`${keyByValue(
																		data?.value
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				checked={
																					patient?.heent_libraries &&
																					patient
																						?.heent_libraries[
																						data
																							?.name
																					] !==
																						"false" &&
																					patient
																						?.heent_libraries[
																						data
																							?.name
																					] !==
																						'undefined' &&
																					patient
																						?.heent_libraries[
																						data
																							?.name
																					] !==
																						null
																						
																				}
																				readOnly
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
												</div>
												<div className='mt-2'>
												<thead>
													<tr>
														<th className="w-1/4 ">
															D. GENITOURINARY
															<span className="text-danger ml-1">
																				*
															</span>
															{genitourinaryLib.some((data) => errors[data?.name]) && (
																<p className="text-red-500 text-xs mt-1">
																This field is required
																</p>
															)}
														</th>
													</tr>
												</thead>
												<tbody>
													{genitourinaryLib?.map(
														(data) => {
															return (
																<tr
																	key={`${keyByValue(
																		data?.value
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				
																				checked={
																					patient?.genitourinary_libraries &&
																					patient
																						?.genitourinary_libraries[
																						data
																							?.name
																					] !==
																						"false" &&
																					patient
																						?.genitourinary_libraries[
																						data
																							?.name
																					] !==
																						'undefined' &&
																					patient
																						?.genitourinary_libraries[
																						data
																							?.name
																					] !==
																						null
																						
																				}
																				readOnly
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
												</div>
												<div className='mt-2'>
												<thead>
													<tr>
														<th className="w-1/4 ">
															G. ABDOMEN
															<span className="text-danger ml-1">
																				*
															</span>
															{abdomenLib.some((data) => errors[data?.name]) && (
																<p className="text-red-500 text-xs mt-1">
																This field is required
																</p>
															)}
														</th>
													</tr>
												</thead>
												<tbody>
													{abdomenLib?.map(
														(data) => {
															return (
																<tr
																	key={`${keyByValue(
																		data?.value
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				
																				checked={
																					patient?.abdomen_libraries &&
																					patient
																						?.abdomen_libraries[
																						data
																							?.name
																					] !==
																						"false" &&
																					patient
																						?.abdomen_libraries[
																						data
																							?.name
																					] !==
																						'undefined' &&
																					patient
																						?.abdomen_libraries[
																						data
																							?.name
																					] !==
																						null
																						
																				}
																				readOnly
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
												</div>
											</table>
											<table className="">
												<div>
												<thead>
													<tr>
														<th className="w-1/4">
															B. CHEST/BREAST/LUNGS
															<span className="text-danger ml-1">
																				*
															</span>
															{chestLib.some((data) => errors[data?.name]) && (
																<p className="text-red-500 text-xs mt-1">
																This field is required
																</p>
															)}
														</th>
													</tr>
												</thead>
												<tbody>
													{chestLib?.map(
														(data) => {
															return (
																<tr
																	key={`${keyByValue(
																		data?.value
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				
																				checked={
																					patient?.chest_libraries &&
																					patient
																						?.chest_libraries[
																						data
																							?.name
																					] !==
																						"false" &&
																					patient
																						?.chest_libraries[
																						data
																							?.name
																					] !==
																						'undefined' &&
																					patient
																						?.chest_libraries[
																						data
																							?.name
																					] !==
																						null
																						
																				}
																				readOnly
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
												</div>
												<div className='mt-2'>
												<thead>
													<tr>
														<th className="w-1/4 ">
															E. DIGITAL RECTAL EXAMINATION
															<span className="text-danger ml-1">
																				*
															</span>
															{digitalRectalLib.some((data) => errors[data?.name]) && (
																<p className="text-red-500 text-xs mt-1">
																This field is required
																</p>
															)}
														</th>
													</tr>
												</thead>
												<tbody>
													{digitalRectalLib?.map(
														(data) => {
															return (
																<tr
																	key={`${keyByValue(
																		data?.value
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				
																				checked={
																					patient?.digital_rectal_libraries &&
																					patient
																						?.digital_rectal_libraries[
																						data
																							?.name
																					] !==
																						"false" &&
																					patient
																						?.digital_rectal_libraries[
																						data
																							?.name
																					] !==
																						'undefined' &&
																					patient
																						?.digital_rectal_libraries[
																						data
																							?.name
																					] !==
																						null
																						
																				}
																				readOnly
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
												</div>
												<div className='mt-2'>
												<thead>
													<tr>
														<th className="w-1/4 ">
														H. NEUROLOGY
															<span className="text-danger ml-1">
																				*
															</span>
															{neuroLib.some((data) => errors[data?.name]) && (
																<p className="text-red-500 text-xs mt-1">
																This field is required
																</p>
															)}
														</th>
													</tr>
												</thead>
												<tbody>
													{neuroLib?.map(
														(data) => {
															return (
																<tr
																	key={`${keyByValue(
																		data?.value
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				
																				checked={
																					patient?.neuro_libraries &&
																					patient
																						?.neuro_libraries[
																						data
																							?.name
																					] !==
																						"false" &&
																					patient
																						?.neuro_libraries[
																						data
																							?.name
																					] !==
																						'undefined' &&
																					patient
																						?.neuro_libraries[
																						data
																							?.name
																					] !==
																						null
																						
																				}
																				readOnly
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
												</div>
											</table>
											<table className="">
												<div>
												<thead>
													<tr>
														<th className="w-1/4">
															C. HEART
															<span className="text-danger ml-1">
																				*
															</span>
															{heartLib.some((data) => errors[data?.name]) && (
																<p className="text-red-500 text-xs mt-1">
																This field is required
																</p>
															)}
														</th>
													</tr>
												</thead>
												<tbody>
													{heartLib?.map(
														(data) => {
															return (
																<tr
																	key={`${keyByValue(
																		data?.value
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		<label className=" mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				
																				checked={
																					patient?.heart_libraries &&
																					patient
																						?.heart_libraries[
																						data
																							?.name
																					] !==
																						"false" &&
																					patient
																						?.heart_libraries[
																						data
																							?.name
																					] !==
																						'undefined' &&
																					patient
																						?.heart_libraries[
																						data
																							?.name
																					] !==
																						null
																						
																				}
																				readOnly
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
												</div>
												<div className='mt-2'>
												<thead>
													<tr>
														<th className="w-1/4 ">
															F. SKIN/EXTREMITIES
															<span className="text-danger ml-1">
																				*
															</span>
															{skinLib.some((data) => errors[data?.name]) && (
																<p className="text-red-500 text-xs mt-1">
																This field is required
																</p>
															)}
														</th>
													</tr>
												</thead>
												<tbody>
													{skinLib?.map(
														(data) => {
															return (
																<tr
																	key={`${keyByValue(
																		data?.value
																	)}`}
																>
																	<td className="!py-0 align-middle">
																		
																		<label className=" mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																			<input
																				type="checkbox"
																				
																				checked={
																					patient?.skin_libraries &&
																					patient
																						?.skin_libraries[
																						data
																							?.name
																					] !==
																						"false" &&
																					patient
																						?.skin_libraries[
																						data
																							?.name
																					] !==
																						'undefined' &&
																					patient
																						?.skin_libraries[
																						data
																							?.name
																					] !==
																						null
																						
																				}
																				readOnly
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
												</div>
											</table>
										</div>
									</div>
									
									</CollapseDiv>
									</div>
									</>
								<div className="lg:col-span-12">
									<CollapseDiv
									defaultOpen={true}
									withCaret={true}
									title="Vital Signs"
									headerClassName="bg-blue-50"
									bodyClassName="p-0"
									>
										<div className="flex items-start justify-start flex-wrap gap-6 pb-11 w-full px-0">
											<Card
												color="black"
												title="Blood Pressure"
												icon="blood-pressure"
											>
												<div className="flex items-center gap-2">
													<b className="text-2xl text-darker">
														{patient?.blood_systolic}
													</b>
													<span className="text-base text-placeholder">
														/
													</span>
													<b className="text-2xl text-darker">
														{patient?.blood_diastolic}
													</b>
													<span className="text-placeholder text-base">
														mmHG
													</span>
												</div>
											</Card>
											<Card color="red" title="Heart Rate" icon="heart-rate">
												<div className="flex items-center gap-2">
													<b className="text-2xl text-darker">
														{patient?.pulse}
													</b>
													<span className="text-placeholder text-base">
														bpm
													</span>
												</div>
											</Card>
											<Card
												color="blue"
												title="Respiratory Rate"
												icon="respiration"
											>
												<div className="flex items-center gap-2">
													<b className="text-2xl text-darker">
														{patient?.respiratory}
													</b>
													<span className="text-placeholder text-base">
														bpm
													</span>
												</div>
											</Card>
											<Card
												color="darkorange"
												title="Temperature"
												icon="temperature-celcius"
											>
												<div className="flex items-center gap-2">
													<b className="text-2xl text-darker">
														{patient?.temperature}
													</b>
													<span className="text-placeholder text-base">
														°C
													</span>
												</div>
											</Card>
											<Card color="green" title="Height" icon="height">
												<div className="flex items-center gap-2">
													<b className="text-2xl text-darker">
														{patient?.height}
													</b>
													<span className="text-placeholder text-base">
														cm
													</span>
												</div>
											</Card>
											<Card color="brown" title="Weight" icon="weight">
												<div className="flex items-center gap-2">
													<b className="text-2xl text-darker">
														{patient?.weight}
													</b>
													<span className="text-placeholder text-base">
														kg
													</span>
												</div>
											</Card>

											<Card color="blue" title="BMI" icon="weight">
												<div className="flex items-center gap-2">
													<b className="text-xl text-darker">{patient?.bmi}</b>
													<span className="text-placeholder text-base"></span>
												</div>
											</Card>
											<Card color="red" title="Covid 19" icon="swab">
												<div className="flex items-center gap-2">
													<b className="text-xl text-darker">
														{patient?.covid_19}
													</b>
													<span className="text-placeholder text-base"></span>
												</div>
											</Card>
											<Card
												color="orange"
												title="Tubercolosis"
												icon="mycobacterium-tuberculosis"
											>
												<div className="flex items-center gap-2">
													<b className="text-xl text-darker">{patient?.tuberculosis}</b>
													<span className="text-placeholder text-base"></span>
												</div>
											</Card>
											<Card color="red" title="Blood Type" icon="blood-donation">
												<div className="flex items-center gap-2">
													<b className="text-xl text-darker">
														{patient?.blood_type == "undefined"
															? "N/A"
															: patient?.blood_type || "-"}
													</b>
													<span className="text-placeholder text-base"></span>
												</div>
											</Card>
										</div>
									</CollapseDiv>
								</div>
	</div>
	<ActionBtn
		// size="lg"
		type="primary"
		// loading={saving}
		className="px-5 ml-auto"
		onClick={handlePrint}
	>
		PRINT
	</ActionBtn>
	</>
  )
}

export default HealthAssessment

/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import FlatIcon from "../../../components/FlatIcon";
import Img from "../../../components/Img";
import ActionBtn from "../../../components/buttons/ActionBtn";
import {
	calculateAge,
	calculateAgeV3,
	formatDateMMDDYYYYHHIIA,
	patientFullName,
} from "../../../libs/helpers";
import CollapseDiv from "../../../components/CollapseDiv";
import { Controller, useForm } from "react-hook-form";
import ReactSelectInputField from "../../../components/inputs/ReactSelectInputField";
import useNetworkStatus from "../../../hooks/useNetworkStatus";
import IsolatePatientModal from "../../../components/modal/IsolatePatientModal";

const Card = ({ title, children, icon, color }) => {
	return (
		<div className="shadow-sm rounded-xl flex items-center p-3 w-1/2 2xl:w-[calc(100%/3-24px)] border-[0.5px] border-blue-300">
			<div className="flex flex-col pb-3">
				<h3
					className="text-xs font-bold text-gray-900 mb-0 text-opacity-75"
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
const ReferralListItem = ({
	acceptPatient,
	sendPatientIsolation,
	updateVitals,
	show = false,
	viewOnly = false,
	updatePatientVital,
	referred,
	isolate,
	reading = false,
}) => {
	const {
			register,
			watch,
			getValues,
			control,
			handleSubmit,
			formState: { errors },
		} = useForm();
	const { isOnline } = useNetworkStatus();
	const isolatePatientRef = useRef(null);
	const [showInfo, setShowInfo] = useState(show);
	const [updatedVitals, setUpdatedVitals] = useState(false);
	const selectedType = watch('referralType');
	// const referralData = JSON.parse(referred?.referral_data) || {};
	console.log("REFERRAL ACCEPT DATA", referred)
	return (
		<div className="flex flex-col border rounded-xl relative">
			<div className="grid grid-cols-1 lg:grid-cols-5">
			<div className="lg:col-span-4 flex items-center gap-3 p-3">
				<div className="w-14 h-14 overflow-hidden bg-slate-200 rounded-lg">
					<Img src={referred?.case_picture} type="user" name={referred?.patient_name} />
				</div>
				<div className="flex flex-col">
					<h6 className="font-bold mb-1 text-left">
						{/* {referral?.patient_name} */}
						{patientFullName(referred?.patient)}
					</h6>
					<div className="flex items-center text-xs divide-x gap-3">
						<span className="flex items-center gap-1">
							<FlatIcon icon="rr-venus-mars" />
							<span className="font-light capitalize">
								{referred?.patient?.gender}
							</span>
						</span>
						<span className="flex items-center gap-1 pl-3">
							<FlatIcon icon="rr-calendar" />
							<span className="font-light">
								{calculateAge(referred?.patient?.birthday)} yrs. old
							</span>
						</span>
					</div>
				</div>
			</div>
			<div className="lg:col-span-1 p-2 items-center justify-end">
				<div className="flex flex-col gap-2">
					{viewOnly ? (
							""
						) : (
							<>
								{!reading ? (
									<>
										<ActionBtn
											size="sm"
											type="primary-dark"
											className=""
											onClick={() => {
												setShowInfo(
													(prevShow) => !prevShow
												);
											}}
										>
											Info
											{showInfo ? (
												<FlatIcon
													icon="rr-caret-up"
													className="ml-1"
												/>
											) : (
												<FlatIcon
													icon="rr-caret-down"
													className="ml-1"
												/>
											)}
										</ActionBtn>
										<div className="">
											<Controller
											name="referralType"
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
												fieldState: {
													invalid,
													isTouched,
													isDirty,
													error,
												},
											}) => (
												<ReactSelectInputField
													isClearable={false}
													inputClassName=" "
													ref={ref}
													value={value}
													onChange={onChange}
													onBlur={onBlur} // notify when input is touched
													error={error?.message}
													placeholder="Select type"
													options={[
															{
																label: "General",
																value: "General",
															},
															{
																label: "Isolation",
																value: "Isolation",
															}
													]}
												/>
											)}
										/>
									</div>
										
									</>
								) : (
									""
								)}
								{selectedType === "General" && (
									<>
									<ActionBtn
										size="lg"
										disabled={referred?.vitals}
										type="primary-dark"
										className=""
										onClick={() => {
											setUpdatedVitals(true);
											updatePatientVital(
												referred?.vitals
													? {
															...JSON.parse(
																referred?.vitals
															)[0],
															id: referred?.id,
													}
													: { id: referred?.id }
											);
										}}
									>
										Vitals
									</ActionBtn>
									<ActionBtn
									size="lg"
									type="success"
									// disabled={referred?.vitals ? false : true}
									onClick={() => {
										acceptPatient(referred);
									}}
								>
									Accept
									<FlatIcon
										icon="rr-assept-document"
										className="ml-1"
									/>
								</ActionBtn>
									</>
								)}
								{selectedType === "Isolation" && (
									<ActionBtn
									size="lg"
									type="danger"
									onClick={() => {
										isolatePatientRef.current.show(referred);
									}}
								>
									Isolation
									<FlatIcon
										icon="rr-right"
										className="ml-1"
									/>
								</ActionBtn>
								)}
							</>
						)}
					</div>
				</div>
			</div>
			
			

			<span className="flex text-xs items-center gap-2 mb-1 px-3 pb-3 ">
				<span className="font- w-1/4">Referral Date & Time:</span>
				<span className="font-bold">
					{formatDateMMDDYYYYHHIIA(
						new Date(`${referred?.date_refer} ${referred?.time_refer}`)
					)}
				</span>
			</span>
			{console.log("referralData", referred)}
			{showInfo ? (
				<>
				<CollapseDiv
				defaultOpen={true}
				withCaret={true}
				title="Referral Information"
				headerClassName="bg-primary-dark"
			>
				<div className="flex flex-col p-3 border-t gap-4">
					{/* <span className="font-semibold text-blue-800 mb-3 pb-2 border-b">
						
					</span> */}
					<span className="flex text-xs items-center gap-2 mb-1">
						<span className="font-light w-1/4">Doctor:</span>
						<span className="font-bold">
							{referred?.refer_by?.title || "Dr. "}
							{referred?.referredToDoctor?.name}
						</span>
					</span>
					<span className="flex text-xs items-center gap-2 mb-1">
						<span className="font-light w-1/4">
							Chief complaint:
						</span>
						<span className="font-bold">
							{referred?.chief_complaint || "Test"}
						</span>
					</span>
					<span className="flex flex-col w-full text-xs items- mb-1 mt-1">
						<span className="font-light w-full">
							Brief Clinical History and Pertinent Physical
							Examination:
						</span>
						<span className="font-bold ">
							{referred?.brief_clinical || "Test"}
						</span>
					</span>
					<span className="flex flex-col w-full text-xs items- mb-1 mt-1">
						<span className="font-light w-full">
							Laboratory Findings (Including ECG, X-ray, and other
							diagnostic procedures):
						</span>
						<span className="font-bold ">
							{referred?.laboratory_findings || "Test"}
						</span>
					</span>
					<span className="flex flex-col w-full text-xs items- mb-1 mt-1">
						<span className="font-light w-full">Impression:</span>
						<span className="font-bold ">
							{referred?.impression || "Test"}
						</span>
					</span>
					<span className="flex flex-col w-full text-xs items- mb-1 mt-1">
						<span className="font-light w-full">Action Taken:</span>
						<span className="font-bold ">
							{referred?.action_taken || "Test"}
						</span>
					</span>
					<span className="flex flex-col w-full text-xs items- mb-1 mt-1">
						<span className="font-light w-full">
							Reason for Referral:
						</span>
						<span className="font-bold ">
							{referred?.reason || "Test"}
						</span>
					</span>
				</div>
			</CollapseDiv>
			<CollapseDiv
				defaultOpen={false}
				withCaret={true}
				title="Patient Referral Vitals"
				headerClassName="bg-primary-dark"
			>
				<div className="flex items-start justify-start flex-wrap gap-6 pb-11 w-full px-0">
					<Card
						color="black"
						title="Blood Pressure"
						icon="blood-pressure"
					>
						<div className="flex items-center gap-2">
							<b className="text-2xl text-darker">
								{referred?.blood_systolic}
							</b>
							<span className="text-base text-placeholder">
								/
							</span>
							<b className="text-2xl text-darker">
								{referred?.blood_diastolic}
							</b>
							<span className="text-placeholder text-base">
								mmHG
							</span>
						</div>
					</Card>
					<Card color="red" title="Heart Rate" icon="heart-rate">
						<div className="flex items-center gap-2">
							<b className="text-2xl text-darker">
								{referred?.pulse}
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
								{referred?.respiratory}
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
								{referred?.temperature}
							</b>
							<span className="text-placeholder text-base">
								°C
							</span>
						</div>
					</Card>
					<Card color="green" title="Height" icon="height">
						<div className="flex items-center gap-2">
							<b className="text-2xl text-darker">
								{referred?.height}
							</b>
							<span className="text-placeholder text-base">
								cm
							</span>
						</div>
					</Card>
					<Card color="brown" title="Weight" icon="weight">
						<div className="flex items-center gap-2">
							<b className="text-2xl text-darker">
								{referred?.weight}
							</b>
							<span className="text-placeholder text-base">
								kg
							</span>
						</div>
					</Card>

					<Card color="blue" title="BMI" icon="weight">
						<div className="flex items-center gap-2">
							<b className="text-xl text-darker">{referred?.bmi}</b>
							<span className="text-placeholder text-base"></span>
						</div>
					</Card>
					<Card color="red" title="Covid 19" icon="swab">
						<div className="flex items-center gap-2">
							<b className="text-xl text-darker">
								{referred?.covid_19}
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
							<b className="text-xl text-darker">{referred?.tb}</b>
							<span className="text-placeholder text-base"></span>
						</div>
					</Card>
					<Card color="red" title="Blood Type" icon="blood-donation">
						<div className="flex items-center gap-2">
							<b className="text-xl text-darker">
								{referred?.bloody_type == "undefined"
									? "N/A"
									: referred?.bloody_type || "-"}
							</b>
							<span className="text-placeholder text-base"></span>
						</div>
					</Card>
				</div>
			</CollapseDiv>
				</>
				
				
			) : (
				""
			)}
			<IsolatePatientModal isOnline={isOnline} ref={isolatePatientRef}/>
		</div>
	);
};

export default ReferralListItem;

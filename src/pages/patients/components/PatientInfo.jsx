/* eslint-disable react/prop-types */
import { useRef } from "react";
import ActionBtn from "../../../components/buttons/ActionBtn";
import FlatIcon from "../../../components/FlatIcon";
import Img from "../../../components/Img";
import PatientImg from "../../../components/PatientImg";
import {
	calculateAge,
	formatDate,
	patientAddress,
	patientFullName,
} from "../../../libs/helpers";

const PatientInfo = ({ patient, appointment, children, patientSelfie }) => {
	return (
		<>
			<div className="group relative h-[108px] w-[108px] min-h-[108px] min-w-[108px] rounded-full aspect-square bg-background">
				<PatientImg
					type="user"
					name={`${patient?.lastname}-${patient?.firstname}-${patient?.middle}`}
					src={patientSelfie ? patientSelfie : patient?.avatar || ""}
					className="min-h-[108px] min-w-[108px] aspect-square object-cover rounded-xl"
					alt=""
					id="user-image-sample"
					key={`key-${patient?.id}-${patient?.avatar}`}
				/>
			</div>
			<div className=" pl-2 !text-xs">
				<h6
					className={` text-2xl mb-1 font-semibold flex items-center capitalize ${
						String(patient?.gender).toLowerCase() == "male"
							? "text-blue-800"
							: "text-pink-800"
					} mb-0`}
				>
					{patientFullName(patient)}
				</h6>
				<div className="flex flex-col lg:flex-row gap-6 mb-2">
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
					<div className="flex items-center gap-2 text-base">
						<FlatIcon icon="rr-venus-mars" className="text-base" />
						{String(patient?.gender).toLowerCase() == "male" ? (
							<span className="text-blue-700">Male</span>
						) : (
							<span className="text-pink-700">Female</span>
						)}
					</div>
				</div>
				<div className="flex items-center mb-2 gap-2 text-base">
					<FlatIcon icon="rr-map-marker" className="text-base" />
					<span className="capitalize gap-1 flex flex-wrap">
						{patientAddress(patient)}
					</span>
				</div>
			</div>
			{children}
		</>
	);
};

export default PatientInfo;

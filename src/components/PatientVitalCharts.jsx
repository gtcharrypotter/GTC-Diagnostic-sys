/* eslint-disable react/prop-types */
import { useRef } from "react";
import ContentTitle from "./buttons/ContentTitle";


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
const PatientVitalCharts = (props) => {
	const { patient, allowCreate } = props;

	return (
		<div className="flex flex-col items-start">
			<ContentTitle title="Patient Vital Charts"></ContentTitle>
			<div>
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
			</div>
		</div>
	);
};

export default PatientVitalCharts;

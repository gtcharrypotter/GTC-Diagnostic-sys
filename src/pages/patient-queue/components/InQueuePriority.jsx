/* eslint-disable react/prop-types */
import FlatIcon from "../../../components/FlatIcon";

const InQueuePriority = ({
	number = "1",
	patientName = "",
	priorityType = "Senior Citizen", //senior citizen, emergency, PWD
}) => {
	return (
		<div className="p-3 gap-3 rounded-[20px] border border-yellow-300 bg-yellow-50 flex items-center justify-start">
			<span className="flex items-center justify-center bg-orange-100 text-orange-500 tracking-tight rounded-[18px] font-bold w-12 aspect-square">
				#{number}
			</span>
			<span className="capitalize tracking-tight font-bold text-lg">
				{patientName}
			</span>
			<span className="font-light flex items-center text-xs text-slate-600 ml-auto">
				{priorityType}
				<FlatIcon
					icon="rr-sort-amount-up-alt"
					className="text-red-600 text-lg ml-2 mt-1"
				/>
			</span>
		</div>
	);
};

export default InQueuePriority;

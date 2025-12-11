import FlatIcon from "../../../components/FlatIcon";
import ActionBtn from "../../../components/buttons/ActionBtn";

const InQueueForRelease = ({
	children,
	onClick,
	referAction,
	number,
	selected,
	patientName,
	date
}) => {
	return (
		<div
			className={`p-3 gap-3 relative rounded-[20px] border border-orange-300 bg-orange-50  cursor-pointer hover:bg-indigo-100 hover:border-indigo-500 duration-200 ${
				selected
					? "!bg-red-50 !border-red-800 shadow-sm shadow-red-500"
					: ""
			}`}
			onClick={onClick}
		>
			<div className="flex items-center gap-4">
				<span className="flex items-center justify-center bg-orange-100 text-orange-500 tracking-tight rounded-[18px] font-bold w-12 aspect-square">
					#{number}
				</span>
				<span className="tracking-tight font-bold text-lg text-red-950">
					{date ? (
					<div className="capitalize flex items-center gap-2 text-sm -mt-4 -ml-3">
						<FlatIcon icon="rr-calendar" />
						{date}
					</div>
				) : (
					""
				)}
					<span className="capitalize tracking-tight font-bold text-lg">
					{patientName}
				</span>
				</span>
			</div>
			{children}
		</div>
	);
};

export default InQueueForRelease;

import FlatIcon from "../../../components/FlatIcon";
import ActionBtn from "../../../components/buttons/ActionBtn";

const DoctorInQueuePrescription = ({
	acceptAction,
	onClick,
	className = "",
	number,
	patientName,
}) => {
	return (
		<div
			className={`p-3 gap-3 relative rounded-[20px] border border-green-300 bg-green-100 flex items-center justify-start ${className}`}
			onClick={onClick}
		>
			<span className="flex items-center justify-center bg-green-50 border border-green-700 text-green-800 tracking-tight rounded-full font-bold w-12 aspect-square">
				#{number}
			</span>
			<span className="tracking-tight font-bold text-lg select-none">
				{patientName}
			</span>
			{/* <span className="font-light text-xs text-slate-600 ml-auto">
				Regular
				<FlatIcon icon="rr-bars-sort" className="text-green-600 ml-2" />
			</span> */}
			{acceptAction ? (
				<ActionBtn
					type="success"
					className="absolute right-4 !rounded-3xl"
					onClick={acceptAction}
				>
					<FlatIcon icon="rr-check" className=" font-bold" /> Accept
				</ActionBtn>
			) : (
				""
			)}
		</div>
	);
};

export default DoctorInQueuePrescription;

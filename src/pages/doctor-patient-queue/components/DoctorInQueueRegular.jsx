import FlatIcon from "../../../components/FlatIcon";
import ActionBtn from "../../../components/buttons/ActionBtn";

const DoctorInQueueRegular = ({
	acceptAction,
	onClick,
	className = "",
	number,
	patientName,
	date,
}) => {
	return (
		<div
			className={`p-3 gap-3 relative rounded-[20px] border border-blue-300 bg-blue-100 flex items-center justify-start ${className}`}
			onClick={onClick}
		>
			<span className="flex items-center justify-center bg-blue-50 border border-blue-700 text-blue-800 tracking-tight rounded-full font-bold w-12 aspect-square">
				#{number}
			</span>

			<div>
				{date ? (
					<div className="flex items-center gap-2 text-sm -ml-3 -mt-3">
						<FlatIcon icon="rr-calendar" />
						{date}
					</div>
				) : (
					""
				)}
				<span className="capitalize tracking-tight font-bold text-lg select-none">
					{patientName}
				</span>
			</div>
			{/* <span className="font-light text-xs text-slate-600 ml-auto">
				Regular
				<FlatIcon icon="rr-bars-sort" className="text-blue-600 ml-2" />
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

export default DoctorInQueueRegular;

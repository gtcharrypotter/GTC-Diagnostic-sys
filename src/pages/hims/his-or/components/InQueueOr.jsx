
import FlatIcon from '../../../../components/FlatIcon';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import { useAuth } from '../../../../hooks/useAuth';

const InQueueOr = ({ onClick, children, number, patientName, date}) => {
  return (
    <div
			// className="p-3 gap-3 relative rounded-[20px] border border-blue-300 bg-blue-50  cursor-pointer hover:bg-green-100 hover:border-green-500 duration-200"
			className="p-3 relative rounded-[20px] border border-blue-300 bg-blue-50 hover:border-green-500 duration-200"
			// onClick={onClick}
		>
			<div className="flex items-center gap-4">
				<span className="flex items-center justify-center bg-blue-100 text-blue-500 tracking-tight rounded-[18px] font-bold w-12 aspect-square">
					#{number}
				</span>
				<span className="tracking-tight font-bold text-lg">
					{date ? (
					<div className="flex items-center gap-2 text-sm -mt-4 -ml-3">
						<FlatIcon icon="rr-calendar" />
						{date}
					</div>
				) : (
					""
				)}
				<ActionBtn
				type="success"
				className="absolute right-4 !rounded-3xl"
				onClick={onClick}
			>
				<FlatIcon icon="rr-check" className=" font-bold" /> Accept
			</ActionBtn>
					{patientName}
				</span>
			</div>
			
			{children}
		</div>
  )
}

export default InQueueOr

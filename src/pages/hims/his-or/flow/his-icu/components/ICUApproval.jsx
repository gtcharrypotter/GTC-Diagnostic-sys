import React, { useState } from 'react'
import useNoBugUseEffect from '../../../../../../hooks/useNoBugUseEffect';
import { useAuth } from '../../../../../../hooks/useAuth';
import FlatIcon from '../../../../../../components/FlatIcon';
import ActionBtn from '../../../../../../components/buttons/ActionBtn';
import { formatDateTime } from '../../../../../../libs/helpers';
import { v4 as uuidv4 } from "uuid";
const uniq_id = uuidv4();
/* eslint-disable react/prop-types */
const InfoText = ({
	className = "",
	valueClassName = "",
	label,
	icon,
	value,
}) => {
	return (
		<div className={`flex flex-col ${className}`}>
			{label ? (
				<span className="text-slate-800 text-xs capitalize mb-1">
					{label}
				</span>
			) : (
				""
			)}
			<div className="flex items-center mb-0 gap-2">
				<span className="flex items-center justify-center">
					<FlatIcon
						icon={icon || "bs-arrow-turn-down-right"}
						className="text-[10px] text-slate-600 ml-1"
					/>
				</span>
				<span
					className={`capitalize gap-1 text-slate-900 flex text-base flex-wrap ${valueClassName} `}
				>
					{value} &nbsp;
				</span>
			</div>
		</div>
	);
};
const ICUApproval = (props) => {
    const { loading: btnLoading, appointment, patient, onSave } = props;
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);
	const componentRef = React.useRef(null);
	useNoBugUseEffect({
		functions: () => {
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		},
		params: [appointment],
	});
	const handleSave = () => {
		if (onSave) {
			onSave();
		}

    // const handleHousekeepingApproval = () => {
    //     if ()
    // }
		// Logic for saving the invoice
		// You can implement your save logic here
	};
  return (
    <div className="relative">
			{loading ? (
				<div className="absolute top-0 left-0 h-full w-full flex items-start justify-center bg-slate-200 bg-opacity-95 backdrop-blur pt-[244px] z-10">
					<div className="flex items-center justify-center text-2xl animate-pulse">
						Loading, please wait...
					</div>
				</div>
			) : (
				""
			)}
			<InfoText
								className="lg:col-span-4"
								label="Time In:"
								value={formatDateTime(appointment?.start_time_in)}
							/>
			<div className="m-2">
				<div className=" gap-2 text-base">
					<FlatIcon icon="rr-wallet" className="text-base" />
					<span className="text-lg font-semibold m-2">
						Status: {""}
						<span className="text-yellow-700">Patient Room</span>
						{/* {billingStatus === "pending" ? (
							<span className="text-yellow-700">Pending</span>
						) : (
							<span className="text-green-700">MGH</span>
						)} */}
					</span>
				</div>
			</div>

			<div className="border shadow p-2">
				<div className="text-justify mt-12" ref={componentRef}>
				<div className="flex items-center gap-2 text-xl font-bold ml-3 -mt-3">
				Room
			</div>
					<div
			className={`p-3 gap-3 relative rounded-[20px] border border-blue-300 bg-blue-100 flex items-center justify-start `}
		>
			
			<span className="flex items-center justify-center bg-blue-50 border border-blue-700 text-blue-800 rounded-md font-light p-2">
				{/* #{number} */}
				{/* {appointment?.room_number} */}
			</span>

			<div>
				{/* {date ? (
					<div className="flex items-center gap-2 text-sm -ml-3 -mt-3">
						<FlatIcon icon="rr-calendar" />
						{date}
					</div>
				) : (
					""
				)} */}
				{/* <div className="flex items-center gap-2 text-sm ml-3 -mt-3">
						<FlatIcon icon="rr-calendar" />
					
					</div> */}
				<span className="tracking-tight font-semibold text-lg select-none">
					{/* {appointment?.created_at} */}
				</span>
			</div>
			{/* <span className="font-light text-xs text-slate-600 ml-auto">
				Regular
				<FlatIcon icon="rr-bars-sort" className="text-blue-600 ml-2" />
			</span> */}

		</div>
				</div>

				<div className="p-4 flex items-center justify-end">
					
					{/* Adding more billing-related information here if needed */}
					<ActionBtn
						type="success"
						className="ml-2"
						loading={btnLoading}
						onClick={handleSave}
					>
						<FlatIcon icon="rr-check" />
						Send To Nurse Station
					</ActionBtn>
					{/* <ActionBtn className="ml-2" onClick={handleDownload}>
                    Download
                  </ActionBtn>  */}
				</div>
			</div>
		</div>
  )
}

export default ICUApproval

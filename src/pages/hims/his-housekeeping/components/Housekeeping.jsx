import React, { useState } from 'react'
/* eslint-disable react/prop-types */
import { useAuth } from '../../../../hooks/useAuth';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import FlatIcon from '../../../../components/FlatIcon';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import InfoTextForPrint from '../../../../components/InfoTextForPrint';
import { dateToday, keyByValue } from '../../../../libs/helpers';
import TextInputField from '../../../../components/inputs/TextInputField';
import { useForm } from 'react-hook-form';
import { bedRoom } from '../../../../libs/appointmentOptions';

const Housekeeping = (props) => {
    const { loading: btnLoading, appointment, patient, onSave } = props;
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);
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
			<div className="m-2">
				<div className=" gap-2 text-base">
					<FlatIcon icon="rr-wallet" className="text-base" />
					<span className="text-lg font-semibold m-2">
						Status: {""}
						<span className="text-yellow-700">For Room Inspection</span>
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
				{appointment?.room_number}
			</span>

			<div>
				
				<span className="tracking-tight font-semibold text-lg select-none">
					{appointment?.created_at}
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
						// disabled={bedRoom?.length == 0}
						loading={btnLoading}
						onClick={handleSave}
					>
						<FlatIcon icon="rr-check" />
						Approve for Cashier
					</ActionBtn>
					{/* <ActionBtn className="ml-2" onClick={handleDownload}>
                    Download
                  </ActionBtn>  */}
				</div>
			</div>
		</div>
  )
}

export default Housekeeping

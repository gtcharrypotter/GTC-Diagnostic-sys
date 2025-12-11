import FlatIcon from "../../../components/FlatIcon";
import ActionBtn from "../../../components/buttons/ActionBtn";
import { useAuth } from "../../../hooks/useAuth";
import { patientFullName } from "../../../libs/helpers";

/* eslint-disable react/prop-types */
const DoctorInServiceItem = ({
	room = "1",
	data,
	openProfileAction,
	labOrdersStr = "",
	patientQueueName = "#1 - John Doe",
	doctor = {
		title: "Dr.",
		name: "Tanya White",
		specialty: "Cardiologists",
	},
}) => {
	const isForResultReading = () => {
		return (
			data?.status == "pending-or-refer" ||
			data?.has_for_reading?.length
		);
	};
	console.log("Doctors Data--------------->>>>>>>", data?.room_number)
	return (
		<div
			className={`flex flex-col border  p-4 rounded-xl ${
				isForResultReading()
					? " bg-orange-50 border-orange-100 "
					: " bg-green-50 border-blue-100 "
			}`}
		>
			{isForResultReading() ? (
				<span className=" text-red-500 mb-4 text-center italic rounded-xl px-3 text-xs">
					Pending{" "}
					<span className="text-red-500 font-medium ">
						for
						{labOrdersStr.includes(`"type":"imaging"`) &&
						labOrdersStr.includes(`"type":"laboratory-test"`)
							? " IMAGING and LABORATORY "
							: labOrdersStr.includes(`"type":"imaging"`)
							? " IMAGING "
							: " LABORATORY "}
						result reading
					</span>
				</span>
			) : (
				""
			)}
			
			<div className="grid grid-cols-1 lg:grid-cols-2 divide-x">
				<div className="flex flex-col justify-center items-center">
					<span className="font-light text-sm text-slate-600 mb-1">
						Room No
					</span>
					<h2
						className={`text-3xl font-bold ${
							isForResultReading()
								? "text-indigo-600"
								: "text-success"
						} -mb-1`}
					>
						{data?.room_number}
						
					</h2>
				</div>{" "}
				<div className="flex flex-col justify-center items-center">
					<span className="font-light text-sm text-slate-600 mb-1">
						Patient
					</span>
					<h2
						className={`capitalize text-3xl tracking-tight text-center font-bold ${
							isForResultReading()
								? "text-indigo-600"
								: "text-success"
						} -mb-1`}
					>
						{`#${data?.id} - ${patientFullName(data?.patient)}`}
					</h2>
				</div>
			</div>
			
			

			<span className="border-b  pb-4 mb-4 "></span>

			<span className="font-light mb-1 text-center text-xs text-slate-500">
				Patient Profile
			</span>
			<ActionBtn
				// size="sm"
				type={
					data?.status == "pending-or-refer"
						? "secondary"
						: "success"
				}
				className="mx-auto px-11 !rounded-[50px] !cursor-pointer"
				onClick={openProfileAction}
			>
				<FlatIcon icon="rr-clipboard-user" className="text-" />
				Click to open Patient Profile
			</ActionBtn>
		</div>
	);
};

export default DoctorInServiceItem;

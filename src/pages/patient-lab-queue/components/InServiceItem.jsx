/* eslint-disable react/prop-types */
const InServiceItem = ({
	room = "1",
	patientQueueName = "#1 - John Doe",
	doctor = {
		title: "Dr.",
		name: "Tanya White",
		specialty: "Cardiologists",
	},
}) => {
	return (
		<div className="flex flex-col bg-green-50 border border-blue-100 p-4 rounded-xl">
			<div className="grid grid-cols-1 lg:grid-cols-2 divide-x">
				<div className="flex flex-col justify-center items-center">
					<span className="font-light text-sm text-slate-600 mb-1">
						Room No
					</span>
					<h2 className=" text-3xl font-bold text-success -mb-1">
						{room}
					</h2>
				</div>{" "}
				<div className="flex flex-col justify-center items-center">
					<span className="font-light text-sm text-slate-600 mb-1">
						Patient
					</span>
					<h2 className=" text-3xl tracking-tight text-center font-bold text-success -mb-1">
						{patientQueueName}
					</h2>
				</div>
			</div>

			<span className="border-b  pb-4 mb-4 "></span>

			<span className="font-light mb-1     text-center text-xs text-slate-500">
				Doctor Assigned
			</span>
			<h4 className="text-lg text-center  font-bold text-indigo-900 -mb-1">
				{`${doctor?.title} ${doctor?.name}`}
			</h4>
			<span className=" text-center font-light text-sm text-slate-600">
				{doctor?.specialty?.length
					? doctor?.specialty
					: "General Practitioner"}
			</span>
		</div>
	);
};

export default InServiceItem;

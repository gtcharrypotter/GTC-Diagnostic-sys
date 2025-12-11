import FlatIcon from "../components/FlatIcon";

const OldDashboard = () => {
	return (
		<div className="p-5 w-full">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
				<div className="lg:col-span-4">
					<div className="p-4 border-[0.5px] border-yellow-500 border-l-[8px] flex flex-col rounded shadow-lg">
						<div className="bg-yellow-100 px-2 mb-4 rounded-xl font-semibold text-sm text-yellow-500 mr-auto p-1">
							NEW
						</div>
						<div className="flex items-center gap-2">
							<FlatIcon
								icon="rs-calendar"
								className="text-5xl text-yellow-500"
							/>
							<div className="ml-auto flex flex-col justify-center items-center">
								<span className="text-3xl text-yellow-600">
									0
								</span>

								<span className="uppercase text-xs text-yellow-500">
									Appointment
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="lg:col-span-4">
					<div className="p-4 border-[0.5px] border-blue-500 border-l-[8px] flex flex-col rounded shadow-lg">
						<div className="bg-blue-100 mb-4 px-2 rounded-xl font-semibold text-sm text-blue-700 mr-auto p-1">
							APPROVED
						</div>

						<div className="flex items-center gap-2">
							<FlatIcon
								icon="rs-calendar-day"
								className="text-5xl text-blue-500"
							/>
							<div className="ml-auto flex flex-col justify-center items-center">
								<span className="text-3xl text-blue-600">
									0
								</span>

								<span className="uppercase text-xs text-blue-500">
									Appointment
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="lg:col-span-4">
					<div className="p-4 border-[0.5px] border-green-500 border-l-[8px] flex flex-col rounded shadow-lg">
						<div className="bg-green-100 mb-4 px-2 rounded-xl font-semibold text-sm text-green-700 mr-auto p-1">
							COMPLETED
						</div>

						<div className="flex items-center gap-2">
							<FlatIcon
								icon="rs-calendar-check"
								className="text-5xl text-green-500"
							/>
							<div className="ml-auto flex flex-col justify-center items-center">
								<span className="text-3xl text-green-600">
									0
								</span>

								<span className="uppercase text-xs text-green-500">
									Appointment
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="lg:col-span-6">
					<div className="border-[0.5px] border-blue-500 shadow rounded">
						<div className="border-b-[0.5px] bg-blue-50 rounded-t border-b-blue-500 p-4 text-lg text-blue-700 font-semibold flex items-center gap-2">
							<FlatIcon icon="rr-calendar" className="text-xl" />
							Today's Appointments
						</div>
						<div className="p-4 flex flex-col">
							<div className="border-[0.5px] border-blue-200 p-4 rounded-lg flex items-center gap-4">
								<div className="h-20 w-20 bg-slate-100 rounded-xl flex items-center justify-center">
									<span className="text-blue-800 text-5xl">
										2
									</span>
								</div>
								<div className="flex flex-col">
									<h3 className="text-lg font-bold">
										John Doe
									</h3>
									<p className="text-slate-400 text-sm">
										Reason: consultation
									</p>
								</div>
								<div className="mb-auto ml-auto text-blue-600 text-sm flex items-center gap-1">
									<FlatIcon
										icon="rr-clock"
										className="-mb-1"
									/>
									<span className="-mt-[2px]">
										8:00 AM - 8:30 AM
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="lg:col-span-6">
					<div className="border-[0.5px] border-green-500 shadow rounded">
						<div className="border-b-[0.5px] bg-green-50 rounded-t border-b-green-500 p-4 text-lg text-green-700 font-semibold flex items-center gap-2">
							<FlatIcon
								icon="rr-calendar-check"
								className="text-xl"
							/>
							Done
						</div>
						<div className="p-4 flex flex-col">
							<div className="border-[0.5px] border-green-200 p-4 rounded-lg flex items-center gap-4">
								<div className="h-20 w-20 bg-slate-100 rounded-xl flex items-center justify-center">
									<span className="text-green-800 text-5xl">
										1
									</span>
								</div>
								<div className="flex flex-col">
									<h3 className="text-lg font-bold">
										John Doe
									</h3>
									<p className="text-slate-400 text-sm">
										Reason: consultation
									</p>
								</div>
								<div className="mb-auto ml-auto text-green-600 text-sm flex items-center gap-1">
									<FlatIcon
										icon="rr-clock"
										className="-mb-1"
									/>
									<span className="-mt-[2px]">
										8:00 AM - 8:30 AM
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OldDashboard;

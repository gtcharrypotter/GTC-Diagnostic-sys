import useDataTable from "../../../../hooks/useDataTable";
import { doctorName, doctorSpecialty } from "../../../../libs/helpers";
import Table from "../../../table/Table";
import { v4 as uuidv4 } from "uuid";
/* eslint-disable react/prop-types */
const uniq_id = uuidv4();
const ProfessionalFeeSOA = (props) => {
	const { appointment, patient } = props;
	const { loading, data } = useDataTable({
		url: `/v1/professional-fee`,
		// url of API for patient that has a pending that need performed
	});
	return (
		<>
			<div className="border shadow p-2">
				{/* <h5 className="text-sm font-semibold text-center mb-4 ">
					Professional Fee */}
				<h5 className="text-sm font-semibold text-center bg-gray-700 font-mono text-white">
					PROFESSIONAL FEE
				</h5>

				{/* <div className="border rounded-md mt-2">
					<div className="border bg-gray-100 rounded-sm grid grid-cols-7 divide-x text-sm font-semibold text-center"> */}
					<div className="border ">
					<div className="border bg-blue-200 rounded-sm grid grid-cols-6 divide-x text-sm font-semibold text-center font-mono items-center">
						<div className="col-span-2">PARTICULARS</div>
						<div className="col-span-1">ACTUAL CHARGES</div>
						<div className="col-span-1">
							SENIOR CITIZEN / PWD DISCOUNT
						</div>
						<div className="col-span-1">PHIC</div>
						<div className="col-span-1">BALANCE</div>
					</div>
					<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
						<div className="col-span-2 text-left ml-2">
							<div className="flex flex-col">
											<span>
												{doctorName(
													appointment?.referredToDoctor
												)}
											</span>
											<span className="text-xs font-light">
												{doctorSpecialty(
													appointment?.referredToDoctor
												)}
											</span>
										</div>
						</div>
						<div className="col-span-1">
							{/* add a code for Debit database */}
							500.00
						</div>
						<div className="col-span-1"></div>
						<div className="col-span-1"></div>
						
						<div className="col-span-1">500.00</div>
					</div>

					<div className="grid grid-cols-6 border-t divide-x text-sm font-semibold text-center mt-2 font-mono">
						<div className="col-span-2 text-right mr-1">Total:</div>
						<div className="col-span-1">
							{/* add a code for Debit database */}
							500.00
						</div>
						<div className="col-span-1">
							{patient?.total_senior_pwd}
						</div>
						<div className="col-span-1">{patient?.total_phic}</div>
						<div className="col-span-1">500.00</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfessionalFeeSOA;

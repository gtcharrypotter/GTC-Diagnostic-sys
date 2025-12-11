/* eslint-disable react/prop-types */
import FlatIcon from "../../../components/FlatIcon";
import InfoText from "../../../components/InfoText";
import ActionBtn from "../../../components/buttons/ActionBtn";
import ContentTitle from "../../../components/buttons/ContentTitle";
import { doctorName } from "../../../libs/helpers";

const ReleaseMedStep1 = ({ appointment, releasePrescription }) => {
	return (
		<>
			<ContentTitle title="Patient Prescriptions">
				<span className="ml-1 text-xs font-bold text-red-600">
					APPROVED FOR RELEASE
				</span>
			</ContentTitle>
			<InfoText
				className="w-full"
				title="Prescribed By"
				value={doctorName(appointment?.prescribedByDoctor)}
			/>
			<div className="table w-full">
				<table>
					<thead>
						<tr>
							<th>Item Code</th>
							<th>Item Information</th>
							<th className="text-center">Qty</th>
							<th>Unit</th>
						</tr>
					</thead>
					<tbody>
						{appointment?.prescriptions?.map((item) => {
							return (
								<>
									<tr key={`opri-${item?.id}`}>
										<td>{item?.item?.code}</td>
										<td>{item?.item?.name}</td>
										<td className="text-center">
											{item?.quantity}
										</td>
										<td>{item?.item?.unit_measurement}</td>
									</tr>
									<tr>
										<td
											colSpan={
												3
											}
										>
											<div className="flex gap-4">
												<span className="font-bold">
													{" "}
													Sig.:
												</span>
												<div
													className="bg-yellow-100 px-4"
													dangerouslySetInnerHTML={{
														__html: item?.details,
													}}
												></div>
											</div>
										</td>
									</tr>
								</>
							);
						})}
					</tbody>
				</table>
			</div>

			<ActionBtn
				className="px-4 !rounded-2xl w-1/2 mx-auto mt-5"
				type="success"
				onClick={releasePrescription}
			>
				<FlatIcon icon="rr-check" className="mr-2 text-xl" />
				Release Prescription
			</ActionBtn>
		</>
	);
};

export default ReleaseMedStep1;

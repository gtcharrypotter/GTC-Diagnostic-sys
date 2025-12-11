/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useRef } from "react";
import ActionBtn from "../../../components/buttons/ActionBtn";
import CollapseDiv from "../../../components/CollapseDiv";
import FlatIcon from "../../../components/FlatIcon";
import { formatDate, formatDateMMDDYYYY } from "../../../libs/helpers";
import { marital_status_lists } from "../../../libs/patientFormOptions";
import UpdateAddressModal from "../../../components/modal/UpdateAddressModal";
import { useAuth } from "../../../hooks/useAuth";
import UpdatePatientDetailsModal from "../../../components/modal/UpdatePatientDetailsModal";
import UpdateMemberModal from "../../../components/modal/UpdateMemberModal";

const TRow = ({ title, value }) => {
	return (
		<tr>
			<td className="text-sm pb-2">
				<span className="text-slate-500 text-xs">{title}</span>
			</td>
			<td className="text-sm pb-2 px-2">
				{typeof value == "object"
					? JSON.stringify(value)
					: value || "-"}
			</td>
		</tr>
	);
};
const PatientProfileContent = ({ patient }) => {
	console.log("Philhealth Member", patient)
	const {user, checkUserType} = useAuth();
	const updateAddressRef = useRef(null);
	const updateDetailsRef = useRef(null);
	const updateMemberRef = useRef(null);
	
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
			<CollapseDiv
				defaultOpen={true}
				title="I. PERSONAL DETAILS"
				bodyClassName="p-0"
			>
				<div className="square-table w-full">
					<table className="">
						<tbody className="">
							<TRow
								title="Case No:"
								value={patient?.case_no}
							/> 
							<TRow
										title="PHIC ID:"
										value={patient?.philhealth}
									/> 
							<TRow title="Lastname:" value={patient?.lastname} />
							<TRow
								title="Firstname:"
								value={patient?.firstname}
							/>
							<TRow title="Middlename:" value={patient?.middle} />
							<TRow title="Suffix:" value={patient?.suffix} />
							<TRow title="Gender:" value={patient?.gender} />
							<TRow
								title="Civil Status:"
								value={
									patient?.information
										? marital_status_lists.find(
												(x) =>
													x.value ==
													patient?.information
														?.marital_status
										)?.label
										: patient?.civil_status
								}
							/>
							{patient?.information?.mother_maiden_name ? (
								<>
									<TRow
										title="Mothers Maiden Name:"
										value={
											patient?.information
												?.mother_maiden_name
										}
									/>
								</>
							) : (
								<>
									<TRow
										title="Mothers Maiden Lastname:"
										value={patient?.mother_lastname}
									/>
									<TRow
										title="Mothers Maiden Firstname:"
										value={patient?.mother_firstname}
									/>
									<TRow
										title="Mothers Maiden Middlename:"
										value={patient?.mother_middlename}
									/>
									<TRow
										title="Client Type:"
										value={patient?.patient_member_phic_type}
									/> 
									<TRow
										title="Enlist Date:"
										value={formatDateMMDDYYYY(new Date(patient?.enlistment_date))}
									/> 
                                    
								</>
							)}
						</tbody>
					</table>
					{checkUserType("admin") ? (
						<div className="p-2">
						<ActionBtn
							className="px-4 rounded-full"
							size="sm"
							type="success"
							onClick={() => {
								updateDetailsRef.current.show();
								// setUpdate(true);
							}}
						>
							<FlatIcon icon="rr-edit" className="" />
							Update patient details
						</ActionBtn>
					</div>
					) : ("")}
				</div>
			</CollapseDiv>
			<CollapseDiv
				defaultOpen={true}
				title="II. ADDRESS AND CONTACT DETAILS"
			>
				<div className="square-table w-full">
					<table className="">
						<tbody className="">
							<TRow title="Latitude:" value={patient?.lat} />
							<TRow title="longitude:" value={patient?.lng} />
							<TRow title="Region:" value={patient?.region} />
							{/* <TRow title="Province:" value={patient?.province} /> */}
							<TRow title="Province:" value="SARANGANI" />
							<TRow
								title="Municipality:"
								value={patient?.municipality}
							/>
							<TRow title="Barangay:" value={patient?.barangay} />
							<TRow title="Purok:" value={patient?.purok} />
							<TRow
								title="Street:"
								value={
									patient?.household?.street
										? patient?.household?.street
										: patient?.street
								}
							/>
							<TRow
								title="UNIT/Room No./Floor:"
								value={patient?.unit || "N/A"}
							/>
							<TRow
								title="Lot/Blk/phase/House No.:"
								value={
									patient?.household?.house_number
										? patient?.household?.house_number
										: patient?.house_number
								}
							/>
							<TRow
								title="Subdivision:"
								value={patient?.subdivision || "N/A"}
							/>
						</tbody>
					</table>
					{checkUserType("admin") ? (
						<div className="p-2">
						<ActionBtn
							className="px-4 rounded-full"
							size="sm"
							type="success"
							onClick={() => {
								updateAddressRef.current.show();
								// setUpdate(true);
							}}
						>
							<FlatIcon icon="rr-edit" className="" />
							Update Address
						</ActionBtn>
					</div>
					) : ("")}
					
				</div>
			</CollapseDiv>
			<CollapseDiv
				defaultOpen={true}
				title="III. PHILHEALTH MEMBER"
			>
				{/* {patient?.members?.map((member) => {
					return (
						<div className="square-table w-full border p-2 rounded-lg mb-2">
							<table className="">
								<tbody className="">
									<TRow
										title="Member Pin:"
										value={member?.m_pin}
									/>
									<TRow
										title="Lastname:"
										value={member?.m_lastname}
									/>
									<TRow
										title="Firstname:"
										value={member?.m_firstname}
									/>
									<TRow
										title="Middlename:"
										value={member?.m_middlename || ""}
									/>
									<TRow
										title="Birthday:"
										value={member?.m_birthday}
									/>
								</tbody>
							</table>
						</div>
					);
				})}
				{patient?.members?.length == 0 ? (
					<p className="text-slate-200 italic">
						No Member declared.
					</p>
				) : (
					""
				)} */}
				<div className="square-table w-full border p-2 rounded-lg mb-2">
							<table className="">
								<tbody className="">
									<TRow
										title="Member Pin:"
										value={patient?.m_pin?.replace(/(\d{2})(\d{9})(\d{1})/, '$1-$2-$3')}
									/>
									<TRow
										title="Lastname:"
										value={patient?.m_lastname}
									/>
									<TRow
										title="Firstname:"
										value={patient?.m_firstname}
									/>
									<TRow
										title="Middlename:"
										value={patient?.m_middlename || ""}
									/>
									<TRow
										title="suffix:"
										value={patient?.m_suffix || ""}
									/>
									<TRow
										title="Birthday:"
										value={patient?.m_birthday}
									/>
									<TRow
										title="Category:"
										value={patient?.m_category}
									/>
									<TRow
										title="Employer PEN:"
										value={patient?.employer_pen}
									/>
									<TRow
										title="Employer Name:"
										value={patient?.employer_name}
									/>
								</tbody>
							</table>
							{checkUserType("admin") ? (
						<div className="p-2">
						<ActionBtn
							className="px-4 rounded-full"
							size="sm"
							type="success"
							onClick={() => {
								updateMemberRef.current.show();
								// setUpdate(true);
							}}
						>
							<FlatIcon icon="rr-edit" className="" />
							Update Philhealth Member
						</ActionBtn>
					</div>
					) : ("")}
						</div>
			</CollapseDiv>
			{/* <CollapseDiv
				defaultOpen={true}
				title="III. DECLARATION OF DEPENDENTS"
			>
				{patient?.dependents?.map((dependent) => {
					return (
						<div className="square-table w-full border p-2 rounded-lg mb-2">
							<table className="">
								<tbody className="">
									<TRow
										title="Lastname:"
										value={dependent?.lastname}
									/>
									<TRow
										title="Firstname:"
										value={dependent?.firstname}
									/>
									<TRow
										title="Middlename:"
										value={dependent?.middle_name || ""}
									/>
									<TRow
										title="Relationship:"
										value={dependent?.relationship}
									/>
								</tbody>
							</table>
						</div>
					);
				})}
				{patient?.dependents?.length == 0 ? (
					<p className="text-slate-200 italic">
						No dependents declared.
					</p>
				) : (
					""
				)}
			</CollapseDiv> */}
			{/* <CollapseDiv defaultOpen={true} title="IV. MEMBER TYPE">
				<div className="square-table w-full mb-4">
					<table className="">
						<tbody className="">
							<TRow
								title="Philhealth No.:"
								value={patient?.philhealth?.replace(/(\d{2})(\d{9})(\d{1})/, '$1-$2-$3')}
							/>
							<TRow title="TIN:" value={patient?.tin} />
						</tbody>
					</table>
				</div>
				<div className="square-table w-full mb-4">
					<table className="">
						<tbody className="">
							<TRow
								title="Direct Contributor:"
								value={patient?.direct_contributor}
							/>
							<TRow
								title="Indirect Contributor:"
								value={patient?.indirect_contributor}
							/>
						</tbody>
					</table>
				</div>
				<div className="square-table w-full mb-2">
					<table className="">
						<tbody className="">
							<TRow
								title="Profession:"
								value={patient?.profession || "-"}
							/>
							<TRow
								title="Salary:"
								value={patient?.salary || "-"}
							/>
						</tbody>
					</table>
				</div>
			</CollapseDiv> */}
			<UpdateAddressModal 
			patient={patient}
			ref={updateAddressRef}
			/>
			<UpdatePatientDetailsModal 
			patient={patient}
			ref={updateDetailsRef}
			/>
			<UpdateMemberModal 
			patient={patient}
			ref={updateMemberRef}
			/>
		</div>
	);
};

export default PatientProfileContent;

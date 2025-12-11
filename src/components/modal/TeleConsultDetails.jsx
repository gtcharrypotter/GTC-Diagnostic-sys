/* eslint-disable react/prop-types */
import React from 'react'
import { doctorName, doctorSpecialty, formatDateMMDDYYYY } from '../../libs/helpers';
import ActionBtn from '../buttons/ActionBtn';
import FlatIcon from '../FlatIcon';

const TeleConsultDetails = ({ teleconsult, videoCallRef, hide }) => {
  return (
   <div className="p-6 border-t">
			<div className="table w-full">
				<table>
					<tbody>
						<tr>
							<th>Date</th>
							<td>
								{formatDateMMDDYYYY(
									new Date(teleconsult?.date)
								)}
							</td>
						</tr>
						<tr>
							<th>Time slot</th>
							<td>
								{teleconsult?.slot?.start_time} -{" "}
								{teleconsult?.slot?.end_time}
							</td>
						</tr>
						<tr>
							<th>Doctor</th>
							<td>
								<div className="flex flex-col">
									<b>{doctorName(teleconsult?.doctor)}</b>
									<span>
										{doctorSpecialty(teleconsult?.doctor)}
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th>Notes</th>
							<td>{teleconsult?.notes}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="flex items-center justify-center pt-11">
				<ActionBtn
					type="secondary"
					className="!rounded-[40px] gap-3"
					size="xl"
					onClick={() => {
						videoCallRef.current.show(teleconsult);
						if (hide) hide();
					}}
				>
					<FlatIcon icon="rr-camera" />
					Start Video Call
				</ActionBtn>
			</div>
		</div>
  )
}

export default TeleConsultDetails

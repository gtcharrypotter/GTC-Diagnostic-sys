import React from 'react'
import ContentTitle from '../../../../components/buttons/ContentTitle'
import PatientORContent from './PatientORContent'
/* eslint-disable react/prop-types */
const PatientORProfile = ({patient}) => {
    console.log("dataaaaaaa------------------->", patient);
  return (
    <div className="flex flex-col items-start">
			<ContentTitle title={"Patient Information"} />
			<PatientORContent patient={patient} />
			
		</div>
  )
}

export default PatientORProfile

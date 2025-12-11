/* eslint-disable react/prop-types */
import React from 'react'
import FlatIcon from '../components/FlatIcon'
import { calculateAge, formatDate, patientAddress, patientFullName } from '../libs/helpers'
import PatientImg from '../components/PatientImg'

const PatientSatisfactionInfo = ({ appointment, children, patientSelfie }) => {
  console.log("Appointment Satisfaction Data 1", appointment);
  
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-lg p-6 rounded-lg flex flex-col items-center">
        <div className="group relative h-[250px] w-[250px] min-h-[250px] min-w-[250px] rounded-full aspect-square bg-background">
          <PatientImg
            type="user"
            name={`${appointment?.patient?.lastname}-${appointment?.patient?.firstname}-${appointment?.patient?.middle}`}
            src={patientSelfie ? patientSelfie : appointment?.patient_selfie || ""}
            className="min-h-[250px] min-w-[250px] aspect-square object-cover rounded-xl"
            alt=""
            id="user-image-sample"
            key={`key-${appointment?.patient?.id}-${appointment?.patient?.selfie}`}
          /> 
        </div>

        <div className="pl-2 !text-xs text-center">
          <h6
            className={`text-2xl mb-1 font-semibold flex items-center justify-center capitalize ${
              String(appointment?.patient?.gender).toLowerCase() == "male"
                ? "text-blue-800"
                : "text-pink-800"
            } mb-0`}
          >
            {patientFullName(appointment?.patient)}
          </h6>
          
          <div className="flex flex-col lg:flex-row gap-6 mb-2 justify-center">
            <div className="flex items-center gap-2 text-base">
              <FlatIcon icon="rr-calendar-clock" className="text-base" />
              <span>{calculateAge(appointment?.patient?.birthday)} yrs. old</span>
            </div>
            <div className="flex items-center gap-2 text-base">
              <FlatIcon icon="rr-calendar" className="text-base" />
              <span>{formatDate(appointment?.patient?.birthday)}</span>
            </div>
            <div className="flex items-center gap-2 text-base">
              <FlatIcon icon="rr-venus-mars" className="text-base" />
              {String(appointment?.patient?.gender).toLowerCase() == "male" ? (
                <span className="text-blue-700">Male</span>
              ) : (
                <span className="text-pink-700">Female</span>
              )}
            </div>
          </div>
          <div className="flex items-center mb-2 gap-2 text-base justify-center">
            <FlatIcon icon="rr-map-marker" className="text-base" />
            <span className="capitalize gap-1 flex flex-wrap">
              {patientAddress(appointment?.patient)}
            </span>
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}

export default PatientSatisfactionInfo

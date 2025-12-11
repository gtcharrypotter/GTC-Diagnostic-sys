/* eslint-disable react/prop-types */
import React from 'react';
import FlatIcon from './FlatIcon';
import { patientFullName } from '../libs/helpers';
import PatientImg from './PatientImg';

const PatientWidget = ({ appointment, active = false, ...rest }) => {
  const satisfactionData = [
    { label: 'Very Satisfied', value: 'very satisfied', img: '/happy.png', percentage: 80 },
    { label: 'Neutral', value: 'neutral', img: '/neutral.png', percentage: 50 },
    { label: 'Unsatisfied', value: 'unsatisfied', img: '/sad.png', percentage: 25 },
  ];

  // Find the matching satisfaction item based on appointment's satisfaction value
  const satisfaction = satisfactionData.find(
    (item) => item.value === appointment?.satisfaction
  ) || satisfactionData[0]; // Default to the first item if not found

  // Determine background color class based on satisfaction level
  const satisfactionBgClass = {
    'very satisfied': 'bg-green-200',
    neutral: 'bg-yellow-200',
    unsatisfied: 'bg-red-200',
  }[satisfaction.value] || 'bg-gray-200'; // Default to `bg-gray-200` if value not matched

  console.log('appointment data', appointment);

  return (
    <div
      className={`outline-none cursor-pointer rounded-xl p-3 flex items-center gap-3 duration-300 border shadow-lg ${satisfactionBgClass}`}
      {...rest}
    >
      <PatientImg
        src={appointment?.patient?.avatar || ''}
        type="user"
        name={patientFullName(appointment?.patient)}
        className="h-14 w-14 rounded-full object-contain bg-slate-400"
      />
      <div className="flex">
        <span className="text-base text-slate-800 font-semibold capitalize">
          {patientFullName(appointment?.patient)}
        </span>
      </div>

      <div className="flex flex-col ml-auto">
        {/* Render the satisfaction image based on the appointment's satisfaction value */}
        <img
          src={satisfaction.img}
          alt={satisfaction.label}
          className="w-12 h-12 object-contain"
        />
      </div>
    </div>
  );
};

export default PatientWidget;

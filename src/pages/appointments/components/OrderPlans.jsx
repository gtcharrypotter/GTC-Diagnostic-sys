/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import { formatDateTime } from '../../../libs/helpers';

const OrderPlans = (props) => {
    const {appointment, 
		  patient, } = props;
	const labOrders = appointment?.lab_orders || {};
	console.log("Laboratory Orders Data",appointment?.lab_orders );
  return (
    <div className="grid grid-cols-2 gap-2">
		{labOrders?.fbs !== null ? (
			<>
				<div className="border rounded-md table p-5">
            <h4 className="text-md text-sky-500  font-bold mb-4">
				Fasting Blood Sugar(FBS)
			</h4>
            <div className="grid grid-cols-2 text-slate-500 text-sm mb-4">
			<span>Date of Lab/Imaging Exam </span>
            <span>{formatDateTime(appointment?.labOrders?.created_at)}</span>
							{/* {formatDateTime(appointment?.type?.created_at)} */}
			</div>
            <div className="grid grid-cols-2 text-slate-500 text-sm mb-4">
			<span>Result</span>
            <span>{labOrders?.fbs}</span>
							{/* {formatDateTime(appointment?.type?.created_at)} */}
			</div>
			</div>
			</>
		) : ("")}
		{labOrders?.rbs !== null ? (
			<>
				<div className="border rounded-md table p-5">
            <h4 className="text-md text-sky-500  font-bold mb-4">
				Fasting Blood Sugar(FBS)
			</h4>
            <div className="grid grid-cols-2 text-slate-500 text-sm mb-4">
			<span>Date of Lab/Imaging Exam </span>
            <span>Result</span>
							{/* {formatDateTime(appointment?.type?.created_at)} */}
			</div>
            <div className="grid grid-cols-2 text-slate-500 text-sm mb-4">
			<span>Result</span>
            <span>{labOrders?.rbs}</span>
							{/* {formatDateTime(appointment?.type?.created_at)} */}
			</div>
			</div>
			</>
		) : ("")}
        
	</div>
  )
}

export default OrderPlans

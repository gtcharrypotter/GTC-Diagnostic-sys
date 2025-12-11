import { useEffect, useState } from "react";
import useDataTable from "../../../../hooks/useDataTable";
import Table from "../../../table/Table";
import { v4 as uuidv4 } from "uuid";
import useNoBugUseEffect from "../../../../hooks/useNoBugUseEffect";
/* eslint-disable react/prop-types */

const SummaryOfCharges = (props) => {
	const { appointment, patient } = props;
	const [totalPharmacyPrice, setTotalPharmacyPrice] = useState(0);
	const [totalCSRPrice, setTotalCSRPrice] = useState(0);
	const [totalLabPrice, setTotalLabPrice] = useState(0);
	const [pharmacyDiscount, setPharmacyDiscount] = useState(0);
	const [csrDiscount, setCSRDiscount] = useState(0);
	const [labDiscount, setLabDiscount] = useState(0);
	

// 	useEffect(() => {
//   if (pharmacyOrders && pharmacyOrders.length > 0) {
//     const totalPharmacy = pharmacyOrders.reduce((acc, order) => {
//       const price = order.pharmacy_price || 0;
//       const quantity = order.quantity || 0;
//       return acc + price * quantity;
//     }, 0);
//     setTotalPharmacyPrice(totalPharmacy);

//     const age = patient?.age || 60;
//     const isPwd = patient?.is_pwd || false;

//     if (age >= 60 || isPwd) {
//       setPharmacyDiscount(totalPharmacy * 0.20);
//     } else {
//       setPharmacyDiscount(0);
//     }
//   }

//   if (csrOrders && csrOrders.length > 0) {
//     const totalCSR = csrOrders.reduce((acc, order) => {
//       const price = order.csr_price || 0;
//       const quantity = order.quantity || 0;
//       return acc + price * quantity;
//     }, 0);
//     setTotalCSRPrice(totalCSR);

//     const age = patient?.age || 60;
//     const isPwd = patient?.is_pwd || false;

//     if (age >= 60 || isPwd) {
//       setCSRDiscount(totalCSR * 0.20);
//     } else {
//       setCSRDiscount(0);
//     }
//   }

//   if (labOrders && labOrders.length > 0) {
//     const totalLab = labOrders.reduce((acc, order) => {
//       const price = order.laboratory_test_type?.lab_rate || 0;
//       return acc + price;
//     }, 0);
//     setTotalLabPrice(totalLab);

//     const age = patient?.age || 60;
//     const isPwd = patient?.is_pwd || false;

//     if (age >= 60 || isPwd) {
//       setLabDiscount(totalLab * 0.20);
//     } else {
//       setLabDiscount(0);
//     }
//   }
// }, [pharmacyOrders, csrOrders, labOrders, patient]);


  const discountedPharmacyPrice = totalPharmacyPrice - pharmacyDiscount;
  const discountedCSRPrice = totalCSRPrice - csrDiscount;
  const discountedLabPrice = totalLabPrice - labDiscount;
  const totalDiscount = pharmacyDiscount + csrDiscount;
  const finalTotal = discountedPharmacyPrice + discountedCSRPrice + discountedLabPrice +  1000; // Assuming 1000 for Laboratory and Radiology.

  console.log("LABORATORYYYYYYYYYYYYYYYYYYYYYYYYY", appointment)
	return (
		<>
			{/* <div className="border shadow p-2">
				<h5 className="text-sm font-semibold text-center mb-4 ">
					Summary of Charges */}
			<div className="">
				<h5 className="text-sm bg-gray-700 font-md font-mono text-center text-white">
					SUMMARY OF CHANGES
				</h5>
				{/* <div className="border rounded-md">
					<div className="border bg-gray-100 rounded-sm grid grid-cols-6 divide-x text-sm font-semibold text-center"> */}
				<div className="">
					<div className="border bg-blue-100  grid grid-cols-6 divide-x text-sm font-semibold text-center font-mono">
						<div className="col-span-2">PARTICULARS</div>
						<div className="col-span-1">DEBIT</div>
						<div className="col-span-1">DISCOUNT</div>
						<div className="col-span-1">CREDIT</div>
						<div className="col-span-1">BALANCE</div>
					</div>
					{/* <div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2"> */}
					<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
						<div className="col-span-2 text-left ml-2">
							Drugs and Medicines (GF)
						</div>
						<div className="col-span-1">{totalPharmacyPrice.toFixed(2)}</div>
						<div className="col-span-1">{pharmacyDiscount.toFixed(2)}</div>
						<div className="col-span-1">0.00</div>
						<div className="col-span-1">{discountedPharmacyPrice.toFixed(2)}</div>
					</div>
					{/* <div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2"> */}
					<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
						<div className="col-span-2 text-left ml-2">
							NonDrugs / Supplies
						</div>
						<div className="col-span-1">{totalCSRPrice.toFixed(2)}</div>
						<div className="col-span-1">{csrDiscount.toFixed(2)}</div>
						<div className="col-span-1">0.00</div>
						<div className="col-span-1">{discountedCSRPrice.toFixed(2)}</div>
					</div>
					<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
						<div className="col-span-2 text-left ml-2">
							Laboratory Examination
						</div>
						<div className="col-span-1">
							{/* add a code for Debit database */}
							{totalLabPrice.toFixed(2)}
						</div>
						<div className="col-span-1">{labDiscount.toFixed(2)}</div>
						<div className="col-span-1">0.00</div>
						<div className="col-span-1">{discountedLabPrice.toFixed(2)}</div>
					</div>
					<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
						<div className="col-span-2 text-left ml-2">
							Radiology
						</div>
						<div className="col-span-1">
							{/* add a code for Debit database */}
							00.00
						</div>
						<div className="col-span-1">0.00</div>
						<div className="col-span-1">0.00</div>
						<div className="col-span-1">00.00</div>
					</div>
					{/* <div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2">
						<div className="col-span-2 text-left ml-2">
							Room and Board
						</div>
						<div className="col-span-1">
							{patient?.room_debit}
						</div>
						<div className="col-span-1">
							{patient?.room_discount}
						</div>
						<div className="col-span-1">{patient?.room_credit}</div>
						<div className="col-span-1">
							{patient?.room_balance}
						</div>
					</div> */}
					<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
						<div className="col-span-2 text-left ml-2">
							Miscellaneous
						</div>
						<div className="col-span-1">
							{/* add a code for Debit database */}
							0.00
						</div>
						<div className="col-span-1">0.00</div>
						<div className="col-span-1">0.00</div>
						<div className="col-span-1">0.00</div>
					</div>
					<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
						<div className="col-span-2 text-left ml-2">PHIC</div>
						<div className="col-span-1">0.00</div>
						<div className="col-span-1">0.00</div>
						<div className="col-span-1">0.00</div>
						<div className="col-span-1">0.o0</div>
					</div>
					<div className="grid grid-cols-6 border-t divide-x text-sm font-semibold text-center mt-2 font-mono">
						<div className="col-span-2 text-right mr-1">Total:</div>
						<div className="col-span-1">
							{/* add a code for Debit database */}
							{(totalPharmacyPrice + totalCSRPrice + 1000).toFixed(2)}
						</div>
						<div className="col-span-1">{totalDiscount.toFixed(2)}</div>
						<div className="col-span-1">0.00</div>
						<div className="col-span-1">{finalTotal.toFixed(2)}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SummaryOfCharges;

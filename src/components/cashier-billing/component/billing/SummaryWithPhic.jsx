import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { procedureRates } from "../../../../libs/procedureRates";
import { caseCodes } from "../../../../libs/caseCodes";
import { formatCurrency } from "../../../../libs/helpers";
import useDataTable from "../../../../hooks/useDataTable";
/* eslint-disable react/prop-types */
const uniq_id = uuidv4();
const SummaryWithPhic = (props) => {
	const { patient, appointment } = props;
	const [summaryData, setSummaryData] = useState(null);
	const [totalPharmacyPrice, setTotalPharmacyPrice] = useState(0);
	const [totalCSRPrice, setTotalCSRPrice] = useState(0);
	const [totalLabPrice, setTotalLabPrice] = useState(0);
	const [pharmacyDiscount, setPharmacyDiscount] = useState(0);
	const [csrDiscount, setCSRDiscount] = useState(0);
	const [labDiscount, setLabDiscount] = useState(0);
	
	const {
        data: pharmacyOrders,
    } = useDataTable({
        url: `/v1/doctor/patient-pharmacy/patient/${appointment?.id}`,
    });
	const {
        data: csrOrders,
    } = useDataTable({
        url: `/v1/doctor/patient-csr/patient/${appointment?.id}`,
    });
	const {
        data: labOrders,
    } = useDataTable({
        url: `/v1/doctor/laboratory-order/patient/${appointment?.id}`,
    });

	useEffect(() => {
  if (pharmacyOrders && pharmacyOrders.length > 0) {
    const totalPharmacy = pharmacyOrders.reduce((acc, order) => {
      const price = order.pharmacy_price || 0;
      const quantity = order.quantity || 0;
      return acc + price * quantity;
    }, 0);
    setTotalPharmacyPrice(totalPharmacy);

    const age = patient?.age || 60;
    const isPwd = patient?.is_pwd || false;

    if (age >= 60 || isPwd) {
      setPharmacyDiscount(totalPharmacy * 0.20);
    } else {
      setPharmacyDiscount(0);
    }
  }

  if (csrOrders && csrOrders.length > 0) {
    const totalCSR = csrOrders.reduce((acc, order) => {
      const price = order.csr_price || 0;
      const quantity = order.quantity || 0;
      return acc + price * quantity;
    }, 0);
    setTotalCSRPrice(totalCSR);

    const age = patient?.age || 60;
    const isPwd = patient?.is_pwd || false;

    if (age >= 60 || isPwd) {
      setCSRDiscount(totalCSR * 0.20);
    } else {
      setCSRDiscount(0);
    }
  }

  if (labOrders && labOrders.length > 0) {
    const totalLab = labOrders.reduce((acc, order) => {
      const price = order.laboratory_test_type?.lab_rate || 0;
      return acc + price;
    }, 0);
    setTotalLabPrice(totalLab);

    const age = patient?.age || 60;
    const isPwd = patient?.is_pwd || false;

    if (age >= 60 || isPwd) {
      setLabDiscount(totalLab * 0.20);
    } else {
      setLabDiscount(0);
    }
  }
}, [pharmacyOrders, csrOrders, labOrders, patient]);


  const discountedPharmacyPrice = totalPharmacyPrice - pharmacyDiscount;
  const discountedCSRPrice = totalCSRPrice - csrDiscount;
  const discountedLabPrice = totalLabPrice - labDiscount;
  const totalDiscount = pharmacyDiscount + csrDiscount;
  const finalTotal = discountedPharmacyPrice + discountedCSRPrice + discountedLabPrice +  1000; // Assuming 1000 for Laboratory and Radiology.
  
	let diagnosis = caseCodes?.find(
		(x) => x.CASE_CODE == appointment?.diagnosis_code
	);
	let procedure = caseCodes?.find(
		(x) => x.CASE_CODE == appointment?.procedure_code
	);
	console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", appointment?.rvs_code)
	return (
		<>
			{/* <div className="border shadow p-2">
				<h5 className="text-sm font-semibold text-center mb-4 ">
					Summary of Charges - PHIC */}
			<div className=" p-2">
				<h5 className="text-sm font-md font-mono text-center  bg-gray-700 text-white">
					SUMMARY OF CHANGES - PHIC
				</h5>

				<div className="flex text-base font-semibold m-2">
					<p>
						ICD-10 Code: {diagnosis?.CASE_CODE} -{" "}
						{procedure?.CASE_RATE_CODE}
					</p>
				</div>

				<div className="grid grid-cols-2">
					<div className="text-xs">
						Firstcase description: {diagnosis?.CASE_DESCRIPTION}
					</div>
					<div className="text-xs">Secondcase description: {procedure?.CASE_DESCRIPTION}</div>
				</div>
				<div className="border rounded-md mt-2">
					<div className="border bg-gray-100 rounded-sm grid grid-cols-7 divide-x text-sm font-semibold text-center">
						<div className="col-span-2">PARTICULARS</div>
						<div className="col-span-1">ACTUAL CHARGES</div>
						<div className="col-span-1">
							SENIOR CITIZEN / PWD DISCOUNT
						</div>
						<div className="col-span-1">FIRST CASE</div>
						<div className="col-span-1">SECOND CASE</div>
						<div className="col-span-1">BALANCE</div>
					</div>
					<div className="grid grid-cols-7 divide-x text-xs font-light text-center mt-2">
						<div className="col-span-2 text-left ml-2 font-mono">
							Hospital Charges
						</div>
						<div className="col-span-1">
							{finalTotal.toFixed(2)}
						</div>
						<div className="col-span-1">{totalDiscount.toFixed(2)}</div>
						<div className="col-span-1">
							{formatCurrency(diagnosis?.HOSPITAL_SHARE)}
						</div>
						<div className="col-span-1">
							{/* {patient?.hc_second_case_rate} */}
						</div>
						<div className="col-span-1">
							{formatCurrency(diagnosis?.HOSPITAL_SHARE)}
						</div>
					</div>
					<div className="grid grid-cols-7 divide-x text-xs font-light text-center mt-2">
						<div className="col-span-2 text-left ml-2 font-mono">
							Professional Fees
						</div>
						<div className="col-span-1">
							{/* add a code for Debit database */}
							{formatCurrency(
								diagnosis?.PROFESSIONAL_FEE_PF_SHARE
							)}
						</div>
						<div className="col-span-1">{totalDiscount.toFixed(2)}</div>
						<div className="col-span-1">
							{formatCurrency(
								diagnosis?.PROFESSIONAL_FEE_PF_SHARE
							)}
						</div>
						<div className="col-span-1"></div>
						<div className="col-span-1">
							{formatCurrency(
								diagnosis?.PROFESSIONAL_FEE_PF_SHARE
							)}
						</div>
					</div>

					<div className="grid grid-cols-7 border-t divide-x text-sm font-semibold text-center mt-2 font-mono">
						<div className="col-span-2 text-right mr-1">Total:</div>
						<div className="col-span-1">
							{/* add a code for Debit database */}
							{formatCurrency(
								parseFloat(diagnosis?.HOSPITAL_SHARE || 0) +
									parseFloat(
										diagnosis?.PROFESSIONAL_FEE_PF_SHARE ||
											0
									)
							)}
						</div>
						<div className="col-span-1">
							{patient?.total_senior_pwd_discount}
						</div>
						<div className="col-span-1">
							{patient?.total_first_case_rate}
						</div>
						<div className="col-span-1">
							{patient?.total_second_case_rate}
						</div>
						<div className="col-span-1">
							{formatCurrency( 
								parseFloat(diagnosis?.HOSPITAL_SHARE || 0) +
									parseFloat(
										diagnosis?.PROFESSIONAL_FEE_PF_SHARE ||
											0
									)
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SummaryWithPhic;

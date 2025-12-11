import React, { useEffect, useState } from 'react'
import InfoTextForPrint from '../../../../components/InfoTextForPrint';
import FlatIcon from '../../../../components/FlatIcon';
import { useForm } from 'react-hook-form';

const CheckBox = ({
	label,
    icon,
	checked = "",
	className = "",
	inputClassName = "",
	...rest
}) => {
	const [inputChecked, setInputChecked] = useState("");
	useEffect(() => {
		let t = setTimeout(() => {
			if (checked == "checked") {
				setInputChecked(checked);
			}
		}, 100);
		return () => {
			clearTimeout(t);
		};
	}, [checked]);

	return (
		<label
			className={`flex items-center text-xs gap-1 font-normal ${className}`}
		>
			<input
				checked={inputChecked}
				type="checkbox"
				className={inputClassName}
				onChange={() => {
					setInputChecked((inputChecked) =>
						inputChecked == "checked" ? "" : "checked"
					);
				}}
				{...rest}
			/>
			{label}
		</label>
	);
};

const CreditCardDetails = () => {
      const { register, setValue, watch, getValues, handleSubmit } = useForm({
		defaultValues: {
			avatar: "",
			prefix: "",
			suffix: "",
			firstname: "",
			lastname: "",
			middlename: "",
			gender: "",
			birthdate: "",
			birthplace: "",
			barangay: "",
			city: "",
			civil_status: "",
			philhealth: "",
			religion: "",
			mother_firstname: "",
			mother_lastname: "",
			mother_middlename: "",
			country: "",
			region: "",
			province: "",
			municipality: "",
			zip_code: "",
			street: "",
			floor: "",
			subdivision: "",
			house_number: "",
			purok: "",
			mobile: "",
			lat: "",
			lng: "",
			tin: "",
			unit: "",
			profession: "",
			salary: "",
			direct_contributor: "",
			indirect_contributor: "",
			spouse_lastname: "",
			spouse_firstname: "",
			spouse_suffix: "",
			spouse_middlename: "",
			mailing_unit: "",
			mailing_building: "",
			mailing_house_number: "",
			mailing_street: "",
			mailing_subdivision: "",
			mailing_barangay: "",
			mailing_municipality: "",
			mailing_city: "",
			mailing_province: "",
			mailing_zip_code: "",
		},
	});
  return (
      <div className="border rounded-sm w-[360px] border-gray-900 ">
					
                    <div className="">
					<div className=" bg-gray-700 text-white  grid grid-cols-1 divide-x  font-light text-start font-mono ">
						<div className="col-span-1 text-xs items-center justify-center flex px-5">
                            
                            IF PAYING BY MASTERCARD,DISCOVER,VISA OR AMERICAN EXPRESS, FILL OUT BELOW

                        </div>
						
					</div>
                    
                    
                    
					<div className="flex flex-row gap-2 px-5 text-xs font-light mt-2 font-mono justify-center">

                    <div className="flex flex-row  ">
										<div className="flex flex-row gap-2 ">
                                        
											<CheckBox
												key={`payment_visa-${watch(
													"civil_status"
												)}`}
												label=""
												value="Visa"
												onChange={(e) => {
													setValue(
														"civil_status",
														e.target.value
													);
												}}
												checked={
													String(
														watch("civil_status")
													)
														.toLowerCase()
														?.includes("visa")
														? "checked"
														: ""
												}
                                                
											/>
                                            <FlatIcon icon="fi fi-brands-visa" className="text-2xl mr-4" />
                                        
                   
											<CheckBox
												key={`payment_amex-${watch(
													"civil_status"
												)}`}
												label=""
												value="Amex"
												onChange={(e) => {
													setValue(
														"civil_status",
														e.target.value
													);
												}}
												checked={
													String(
														watch("civil_status")
													)
														.toLowerCase()
														?.includes("amex")
														? "checked"
														: ""
												}
											/>
                                            <FlatIcon icon="fi fi-brands-american-express" className="text-2xl mr-4" />


                                            
											<CheckBox
												key={`payment_applepay-${watch(
													"civil_status"
												)}`}
												label=""
												value="ApplePay"
												onChange={(e) => {
													setValue(
														"civil_status",
														e.target.value
													);
												}}
												checked={
													String(
														watch("civil_status")
													)
														.toLowerCase()
														?.includes("applepay")
														? "checked"
														: ""
												}
											/>
                                            <FlatIcon icon="fi fi-brands-apple-pay" className="text-2xl mr-4" />

											<CheckBox
												key={`payment_gcash-${watch(
													"civil_status"
												)}`}
												label="Gcash"
												value="gcash"
												onChange={(e) => {
													setValue(
														"civil_status",
														e.target.value
													);
												}}
												checked={
													String(
														watch("civil_status")
													)
														.toLowerCase()
														?.includes("gcash")
														? "checked"
														: ""
												}
											/>
											
										</div>
									</div>

                   
						
                        
					</div>

                    <div className="flex flex-row columns-3 w-full text-sm font-light font-mono border-t border-t-slate-500 ">

						<div className=" w-full  border-r border-dashed border-r-slate-500 px-7">
                        
                        <InfoTextForPrint
                            contentClassName="text-sm"
                            title="Card no."
                            value=""/>
						</div>

						<div className="w-full  px-5 ">
                        <InfoTextForPrint
                            contentClassName="text-sm "
                            title="Security Code."
                            value=""/>
                        </div>

                        
						
                        
					</div>
					

                    
				</div>
               </div>
  )
}

export default CreditCardDetails

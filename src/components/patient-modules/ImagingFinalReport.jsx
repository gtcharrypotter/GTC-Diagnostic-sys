/* eslint-disable react/prop-types */
import React from 'react'
import ActionBtn from '../buttons/ActionBtn';
import { useReactToPrint } from 'react-to-print';
import InfoTextForPrint from '../InfoTextForPrint';
import QRCode from "qrcode.react";
import { formatDateTime } from '../../libs/helpers';

const FormHeading = ({ title }) => {
	return (

		<div className="flex items-center h-12">
		<div className="flex items-center">

		</div>
		<div className="flex-grow slanted bg-blue-500 flex items-center justify-start pl-1">
		<span className="text-white">www.saranganiprovincialhospital.com</span>
		</div>
		<div className="flex-grow slanted-reverse bg-blue-700 flex items-center justify-start pl-1">
		<span className="text-blue-700" value="">.</span>
		</div>

		<div className="slanted bg-blue-500 flex items-center justify-start pl-4"></div>


	</div>
	);
};


const ImagingFinalReport = (props) => {
    const { patient, appointment } = props;
	const componentRef = React.useRef(null);
	const handlePrint = useReactToPrint({
			content: () => componentRef.current,
		});
        const imageView = `${import.meta.env.VITE_IMG_URL}` + appointment?.appendix_ultrasound;
	console.log("Image URL:", appointment?.appendix_ultrasound);
  return (
    <div className="">
		<div className="text-justify w-[9.5in]" ref={componentRef}>
		<>
		<div className="flex flex-col-4">
			<div>
					<img
						src="/Province_of_Sarangani.png"
						className="w-24 h-24 object-contain m-2"
					/>
			</div>
				<div className="">
				<div className="flex justify-center items-center my-4">
				
				</div>
					<div className="text-xs font-semibold">
					<span>SARANGANI PROVINCIAL HOSPITAL</span>
				</div>
				<div className="text-xs font-light ">
					<span>Capitol Complex, Alabel, Sarangani</span>
				</div>
				<div className="text-xs font-light ">
					<span>Tel. No. 083 508 0262</span>
				</div>
                <div className="text-xs font-semibold">
					<span>HOSPITAL LABORATORY DEPARTMENT</span>
				</div>
				
                </div>
										
			<div className="flex text-sm ml-auto mt-2">
				<div>
                    <InfoTextForPrint
								contentClassName="text-sm"
								title="Fullname"
								value={`${patient?.lastname}, ${patient?.firstname}, ${patient?.middle}`}
							/>
							<InfoTextForPrint
								contentClassName="text-sm"
								title="Address"
								value={`${patient?.street}, ${patient?.zone}, ${
									patient?.barangay
								}, ${
									patient?.municipality
								}, `} //add a city ${patient?.city?.name}
							/>
                            <InfoTextForPrint
								contentClassName="text-sm"
								title="Account No."
								value={appointment?.order_number}
							/>
							<InfoTextForPrint
								contentClassName="text-sm"
								title="Date/Time."
								value={formatDateTime(appointment?.type?.created_at)}
							/>

							{/* <InfoTextForPrint
								contentClassName="text-sm"
								title="Attending Dr"
								// value={patient?.civil_status}
							/> */}

							{/* <InfoTextForPrint
								contentClassName="text-sm"
								title="Room"
								// value={patient?.civil_status}
							/> */}
                            <div className="text-base text-red-500 font-bold">
                                <span>IMAGING REPORT</span>
                            </div>
                </div>
                 <QRCode
					value={`user-${appointment?.scheduledBy?.username}`}
					className="ml-4"
					level="H"
					size={48}
				/>
			
			</div>
           
		</div>
										
	<FormHeading title="" />
		

		<div className="flex flex-col p-2 text-sm relative ">
			<b>IMPORTANT REMINDERS:</b>
		
			<p className="text-xs ">
				PLEASE WRITE IN CAPITAL <b>LETTERS</b>
			</p>
			<p className="text-xs">
				All information, fields and trick boxes required in
				this form are necessary. Claim forms with incomplete
				information shall not be processed.
			</p>{" "}
			<b className="text-xs">
				FALSE/INCORRECT INFORMATION OR MISREPRESENTATION
				SHALL BE SUBJECT TO CRIMINAL, CIVIL OR
				ADMINISTRATIVE LIABILITIES.
			</b>
		</div>

		<div className="p-6 flex flex-col gap-y-4 relative border-t-2">
			<div className="text-center font-mono text-sm font-semibold">FINAL REPORT</div>
		
                                <div className="p-6 flex flex-col gap-y-4 relative border-t-2">
                                    <div className="flex flex-col">
                                    <div className="flex flex-col">
                                        <span className={`text-base mb-1 font-bold`}>FINDINGS:</span>
                                        <div className="p-2 italic font-light " dangerouslySetInnerHTML={{ __html: appointment?.lab_result_notes }}></div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-base mb-1 font-bold `}>IMPRESSION:</span>
                                        <div className="p-2 italic font-light " dangerouslySetInnerHTML={{ __html: appointment?.lab_result_notes }}></div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-base mb-1 font-bold `}>ADVICE:</span>
                                        <div className="p-2 italic font-light " dangerouslySetInnerHTML={{ __html: appointment?.lab_result_notes }}></div>
                                    </div>
                                </div>
                                    {appointment?.type?.name === 'APPENDIX' && (
                                        <>
                                            <div>
                                                <span className={`text-sm mb-1 font-bold `}>IMAGE RESULT</span>
                                                <div className="border border-slate-300 aspect-video relative">
                                                    <img 
                                                    src={imageView}
                                                    className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300" 
                                                    />
                                                </div>
                                            </div>
                                            
                                        </>
                                    )}
                                </div>
			
		</div>
		</>
		</div>
      
							

								<div className="px-4 py-4 border-t flex items-center justify-end bg-slate-">
									<ActionBtn
										// size="lg"
										type="primary-dark"
										className="px-5"
										onClick={handlePrint}
									>
										Print
									</ActionBtn>
								</div>
    </div>
  )
}

export default ImagingFinalReport

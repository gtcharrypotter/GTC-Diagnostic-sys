/* eslint-disable react/prop-types */

import { useRef } from "react";
import UpdatePatientOperation from "./modal/UpdatePatientOperation";
import ActionBtn from "../../../../components/buttons/ActionBtn";
import FlatIcon from "../../../../components/FlatIcon";
import { useAuth } from "../../../../hooks/useAuth";


const InQueueAnesthesia = ({
    children,
    number,
    patientName,
    patient,
    data
}) => {
  const { checkUserType } = useAuth(); 
   const updateProcedureRef = useRef(null);
	console.log('Patient:------', patient);

    return (
        <div className={`p-3 gap-3 relative rounded-[20px] border border-blue-300 bg-blue-50 duration-200`}>
            <div className="flex items-center gap-4">
                <span className="flex items-center justify-center bg-blue-100 text-blue-500 tracking-tight rounded-[18px] font-bold w-12 aspect-square">
                    #{number}
                </span>
                <span className="tracking-tight font-bold text-lg">
                    {patientName}
                </span>
                <div className="ml-auto">
                    {checkUserType("ANESTHESIA") ? (
				<ActionBtn className="!rounded-full"
				onClick={() => {
							// Access patient ID and show the update procedure modal
							updateProcedureRef.current.show(data);
							console.log("Patient:", patient);
				}}
				>
					Update <FlatIcon icon="rr-refresh"/>
				</ActionBtn> 
                ) : (
					""
				)}
			</div>
            </div>
                
            
            <div className="border-t mt-1">
                {children}
            </div>
            <UpdatePatientOperation
                patient={patient}
                  ref={updateProcedureRef}
            />
        </div>
    );
};

export default InQueueAnesthesia;

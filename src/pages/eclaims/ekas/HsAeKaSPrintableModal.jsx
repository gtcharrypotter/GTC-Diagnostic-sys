import React, { forwardRef, Fragment, useImperativeHandle, useState } from 'react'
import { calculateAge, formatDateWithOffset, patientFullName } from '../../../libs/helpers';
import TextAreaField from '../../../components/inputs/TextAreaField';
import RadioInput from '../../../components/inputs/RadioInput';
import PerformedOrder from '../../../components/patient-modules/modals/PerformedOrder';
import FlatIcon from '../../../components/FlatIcon';
import ActionBtn from '../../../components/buttons/ActionBtn';
import { Dialog, Transition } from '@headlessui/react';
import { useReactToPrint } from 'react-to-print';
import HsaEkasOrder from '../../../components/patient-modules/modals/HsaEkasOrder';

const HsAeKaSPrintableModal = (props, ref) => {
  const {patient, appointment} = props;
    const [modalOpen, setModalOpen] = useState(false);
    const [result, setResult] = useState(null);
    const componentRef = React.useRef(null);
    const handlePrint = useReactToPrint({
    content: () => componentRef.current,
        onAfterPrint: () => hide(),
    });
    useImperativeHandle(ref, () => ({
            show: show,
            hide: hide,
        }));
    const show = (data) => {
		setModalOpen(true);
	};
    const hide = () => {
		setModalOpen(false);
	};
    
  return (
    <Transition appear show={modalOpen} as={Fragment}>
			<Dialog as="div" className="" onClose={hide}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur z-[300]" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto !z-[350]">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full lg:max-w-7xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									<span className="text-xl text-center font-bold  text-blue-900">
										ELECTRONIC KONSULTA AVAILMENT SLIP (eKAS)
									</span>
								</Dialog.Title>
                                <div className="bg-gray-600 p-11 min-h-[14in]  overflow-auto phic-forms">
                                    <ActionBtn
                                    type="primary-dark"
                                    className={`mr-5 mb-5 py-4 !text-lg`}
                                    size="md"
                                    onClick={handlePrint}
                                    >
                                    <FlatIcon icon="rr-print" className="text-white mr-1" />
                                    Print
                                    </ActionBtn>
                                    <div className="bg-white p-[0.5in] w-[9.5in] gap-y-6 mx-auto"
                                    id="phic-form-printable" ref={componentRef}
                                    >
                                        <div className="bg-white border-2 !border-blue-300 flex flex-col w-[8.5in] min-h-[13in]">
                                    <div className="flex items-center relative justify-center gap-2 p-4">
                                                    <img
                                                        className="w-[100px] object-contain"
                                                        src="/phic-1.png"
                                                    />
                                                    <div className="flex flex-col text-left w-full mx-auto">
                                                        <p className="text-sm">
                                                            <div className='underline font-bold'>ELECTRONIC KONSULTA AVAILMENT SLIP (eKAS)</div>
                                                        </p>
                                                    </div>
                                                    
                                            </div>
                                            <div className="flex flex-col gap-2">
                                            <div className="flex gap-4 px-4">
                                                <div className="flex text-[10px]">
                                                    <span className="font-light">HCI Name: &nbsp;</span>
                                                    <span className="font-light underline">{appointment?.rhu?.name}</span>
                                                </div>
                                                <div className="flex text-[10px]">
                                                    <span className="font-light">Case No: &nbsp;</span>
                                                    <span className="font-light underline">{patient?.case_no}</span>
                                                </div>
                                                <div className="flex text-[10px]">
                                                    <span className="font-light">HCI Accreditation No: &nbsp;</span>
                                                    <span className="font-light underline">{appointment?.rhu?.accreditation_number}</span>
                                                </div>
                                                <div className="flex text-[10px]">
                                                    <span className="font-light">Transaction No: &nbsp;</span>
                                                    <span className="font-light underline">{patient?.profiling_no}</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-4 px-4">
                                                <div className="flex text-[10px] col-span-2">
                                                    <span className="font-light ">Patient Name <span className='text-xs font-bold'>(pangalan ng pasyente)</span>: &nbsp;</span>
                                                    <span className="capitalize font-light underline">{patientFullName(patient)}</span>
                                                </div>
                                                <div className="flex text-[10px] col-span-1">
                                                    <span className="font-light">Age <span className='text-xs font-bold'>(Edad)</span>: &nbsp;</span>
                                                    <span className="font-light underline">{calculateAge(patient?.birthday)} years old</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 px-4">
                                                    <div className="flex text-[10px]">
                                                        <span className="font-light">PIN <span className='text-[10px] font-bold'>(Philhealth Indentification Number)</span>: &nbsp;</span>
                                                        <span className="font-light underline">{patient?.philhealth}</span>
                                                    </div>
                                                    <div className="flex text-[10px]">
                                                        <span className="font-light">Contact No: &nbsp;</span>
                                                        <span className="font-light underline">{patient?.mobile}</span>
                                                    </div>
                                                    <div className="flex text-[10px]">
                                                        <span className="font-light">Membership Category: &nbsp;</span>
                                                        <span className="font-light underline ">{patient?.m_category}</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4 px-4">
                                                
                                                    <div className="flex text-[10px]">
                                                        <span className="font-light">Membership type: &nbsp;</span>
                                                        <span className="font-light underline">{patient?.patient_member_phic_type}</span>
                                                    </div>
                                                    <div className="flex text-[10px]">
                                                    <span className="font-light">Authorization Transaction Code (ATC): &nbsp;</span>
                                                    <span className="font-light underline">
                                                        {patient?.client_type === "walk-in-with-atc"
                                                        ? patient?.atc // Show atc_consultation if the mode is walk-in-with-atc
                                                        : patient?.client_type === "walk-in-without-atc"
                                                        ? "" // Leave blank if the mode is walk-in-without-atc
                                                        : patient?.client_type // Show the original mode_of_consultation for other cases
                                                        }
                                                    </span>
                                                    </div>
                                                </div>
                                            </div>
                                                <div className="border border-black bg-gray-300 mt-4">
                                                    <div className="text-xs font-light m-1">
                                                        <span>To be filled out by the facility (pupunuan ng pasilidad)</span>
                                                    </div>
                                                </div>
                                                
                                                <HsaEkasOrder
                                                patient={patient}
                                                />
                                                <div className="border border-black bg-gray-300">
                                                    <div className="text-xs font-light m-1">
                                                        <span>To be filled out by the patient (pupunuan ng pasyente)</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 ml-8 gap-4 mt-2">
                                                <div className="flex">
                                                        <div className="flex flex-col text-sm">
                                                        <span className="font-light">Have you recieved the above-mentioned essential services? &nbsp;</span>
                                                        <span className="text-xs font-semibold">(Natanggap mo ba ang mga essential services na nabangit)? &nbsp;</span>
                                                    </div>
                                                    <RadioInput
                                                                                        >
                                                                                            {[
                                                                                                {
                                                                                                    label: "Yes",
                                                                                                    value: "Yes",
                                                                                                },
                                                                                                {
                                                                                                    label: "No",
                                                                                                    value: "No",
                                                                                                },
                                                                                            ]?.map(
                                                                                                (
                                                                                                    option,
                                                                                                    indx
                                                                                                ) => {
                                                                                                    return (
                                                                                                        <label
                                                                                                            className="flex items-center gap-1 font-light text-sm"
                                                                                                            key={`rdio-${option?.value}`}
                                                                                                        >
                                                                                                            <input
                                                                                                                type="radio"
                                                                                                                value={
                                                                                                                    option?.value
                                                                                                                }
                                                                                                                id={`irdio-${option?.value}`}
                                                                                                                // {...register(
                                                                                                                // 	"gender",
                                                                                                                // 	{
                                                                                                                // 		required:
                                                                                                                // 			{
                                                                                                                // 				value: true,
                                                                                                                // 				message:
                                                                                                                // 					"This field is required.",
                                                                                                                // 			},
                                                                                                                // 	}
                                                                                                                // )}
                                                                                                            />
                                                                                                            {
                                                                                                                option?.label
                                                                                                            }
                                                                                                        </label>
                                                                                                    );
                                                                                                }
                                                                                            )}
                                                                            </RadioInput>
                                                </div>
                                                    
                                                    <div className="flex">
                                                    <div className="flex flex-col text-sm">
                                                        <span className="font-light">How satisfied are you with the services provided? &nbsp;</span>
                                                        <span className="text-xs font-semibold">(Gaano ka nasiyahan sa natanggap mong serbisyo)? &nbsp;</span>
                                                    </div>
                                                            <div className="flex">
                                                            <div
                                                                className={`flex flex-row text-sm items-center justify-center rounded-full px-5 text-center  duration-200 ${
                                                                result == "very satisfied"
                                                                    ? "!grayscale-0 bg-green-500 opacity-100"
                                                                    : "opacity-70"
                                                                }`}
                                                                // onClick={() => {
                                                        
                                                                // 	updateData("very satisfied");
                                                                // }}
                                                            >
                                                                <label className=" mb-0 p-2 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
                                                                                                                <input
                                                                                                                    type="checkbox"
                                                                                                                />
                                                                                                            </label>
                                                                <img className="h-8 w-8" src="/happy.png" />
                                                            </div>
                                                            <div
                                                                className={`flex flex-row text-sm items-center justify-center rounded-full px-5 text-center  duration-200 ${
                                                                result == "neutral"
                                                                    ? "!grayscale-0 bg-yellow-200 opacity-100"
                                                                    : "opacity-70"
                                                                }`}
                                                                // onClick={() => {
                                                                // 	updateData("neutral");
                                                                // }}
                                                            >
                                                                <label className=" mb-0 p-2 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
                                                                                                                <input
                                                                                                                    type="checkbox"
                                                                                                                />
                                                                                                            </label>
                                                                <img className="h-8 w-8" src="/neutral.png" />
                                                            </div>
                                                            <div
                                                                className={`flex flex-row text-sm items-center justify-center rounded-full px-5 text-center  duration-200 ${
                                                                result == "unsatisfied"
                                                                    ? "!grayscale-0 bg-red-500 opacity-100"
                                                                    : "opacity-70"
                                                                }`}
                                                                // onClick={() => {
                                                                // 	updateData("unsatisfied");
                                                                // }}
                                                            >
                                                                <label className=" mb-0 p-2 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
                                                                                                                <input
                                                                                                                    type="checkbox"
                                                                                                                />
                                                                                                            </label>
                                                                <img className="h-8 w-8" src="/sad.png" />
                                                            </div>
                                                            
                                                            </div>
                                                    </div>
                                                    
                                                    <div className="flex flex-col m-2">
                                                    <div className="flex flex-col text-sm">
                                                        <span className="font-light">For your comment, suggestion or complaint: &nbsp;</span>
                                                        <span className="text-xs font-light">(Para sa iyong komento, mungkahi o reklamo)&nbsp;</span>
                                                    
                                                </div>
                                                    <TextAreaField
                                                        // error={
                                                        //   errors?.treatment_plan
                                                        //     ?.message
                                                        // }
                                                        className="rounded-xl"
                                                        rows="2"
                                                        // {...register("treatment_plan", {
                                                        //   required:
                                                        //     "This field is required!",
                                                        // })}
                                                    />
                                                    </div>
                                                    
                                                </div>
                                                <div className="border border-black bg-gray-300 m-2"></div>
                                                <div className="border border-black bg-gray-300 m-2"></div>

                                                <div className="flex flex-col m-2">
                                                <span className="font-light">Under the penalty of law, I attest that the information I provided in this slip are true and accurate &nbsp;</span>
                                                <span className="font-semibold text-xs">Sa ilalim ng batas, pinatunayan ko na ang impormasyong ibinigay ko ay totoo at tama &nbsp;</span>
                                                </div>

                                                <div className="grid grid-cols-2">
                                                    <div className="flex flex-col ml-4">
                                                    <div className="mt-8 text-xs">
                                                        {patientFullName(patient)}
                                                    </div>
                                                    <div className="text-xs">______________________________________</div>
                                                    <div className="text-xs">Signature over printed name of patient</div>
                                                    <div className="text-xs">(Lagda sa nakalimbag na pangalan ng pasyente)</div>
                                                    </div>
                                                    <div className="flex flex-col ml-4">
                                                        <div className="ml-20 mt-8 text-sm">
                                                        &nbsp;
                                                    </div>
                                                    <div className="text-xs flex"><p>Next Consultation Date:</p> &nbsp;<p className='underline'>{formatDateWithOffset(appointment?.updated_at)}</p></div>
                                                    <div className="text-[8px] font-semibold">(Petsa ng susunod na konsultasyon)</div>
                                                    </div>
                                                    <div className="flex flex-col ml-4 mt-4">
                                                    <div className="text-sm">
                                                        Note:
                                                    </div>
                                                    
                                                    <div className="text-xs">Accomplished form shall be submitted to PhilHealth</div>
                                                    <div className="text-[12px] font-semibold">(Ang Kumpletong form ay dapat isumite sa PhilHealth)</div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
  )
}

export default forwardRef(HsAeKaSPrintableModal)

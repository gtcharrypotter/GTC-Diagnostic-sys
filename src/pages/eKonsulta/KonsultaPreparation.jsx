/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { formatDate, formatDateTime, patientFullName } from '../../libs/helpers';
import { marital_status_lists } from '../../libs/patientFormOptions';
import MenuTitle from '../../components/buttons/MenuTitle';
import ActionBtn from '../../components/buttons/ActionBtn';
import Axios from '../../libs/axios';
import { toast } from 'react-toastify';
import ConsultEkasPrintableModal from '../eclaims/ekas/ConsultEkasPrintableModal';
import ConsultePresSPrintableModal from '../eclaims/epress/ConsultePresSPrintableModal';
import HsAeKaSPrintableModal from '../eclaims/ekas/HsAeKaSPrintableModal';
const TRow = ({ title, value }) => {
	return (
		<tr>
			<td className="text-sm pb-2">
				<span className="text-slate-500 text-xs">{title}</span>
			</td>
			<td className="text-sm pb-2 px-2">
				{typeof value == "object"
					? JSON.stringify(value)
					: value || "-"}
			</td>
		</tr>
	);
};
const KonsultaPreparation = (props) => {
    const { patient, appointment, onSuccess, } = props;
    const [loading, setLoading] = useState(false);
    const hSAeKasRef = useRef();
    const consulteKasRef = useRef();
    const consultePressRef = useRef();
	const {
			register,
			getValues,
			setValue,
			control,
			reset,
			watch,
			handleSubmit,
			formState: { errors },
		} = useForm();
    const validateHSAXML = async () => {
        setLoading(true);
    try {
        const payload = {
        patient
      };
        const response = await Axios.post(`/v1/diagnostic/konsulta/validate-hsa/${patient?.id}`, {
            patient: patient?.id,
            payload
        });
        toast.success("Health Screening Validated Successfully!");
    } catch (error) {
        toast.error(`Upload failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
    }
    
    const submitHSAXML = async () => {
        setLoading(true);
        try {
            const payload = {
            appointment,
            patient
        };
            const response = await Axios.post(`/v1/diagnostic/konsulta/submit-hsa/${patient?.id}`, {
                patient: patient?.id,
                payload
            });
            toast.success("Health Screening Uploaded Successfully!");
        } catch (error) {
            toast.error(`Upload failed: ${error.response?.data?.message || error.message}`);
        } finally {
        setLoading(false);
        }
    }
    const validateConsultXML = async () => {
        setLoading(true);
    try {
        const payload = {
        appointment,
        patient
      };
        const response = await Axios.post(`/v1/diagnostic/konsulta/validate-consult/${appointment?.id}`, {
            appointment_id: appointment?.id,
            payload
        });
        toast.success("Validated Successfully!");
    } catch (error) {
        toast.error(`Upload failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
    }
    const submitConsultXML = async () => {
        setLoading(true);
        try {
            const payload = {
            appointment,
            patient
        };
            const response = await Axios.post(`/v1/diagnostic/konsulta/submit-consult/${appointment?.id}`, {
                appointment_id: appointment?.id,
                payload
            });
            toast.success("Cosultation Uploaded Successfully!");
        } catch (error) {
            toast.error(`Upload failed: ${error.response?.data?.message || error.message}`);
        } finally {
        setLoading(false);
        }
    }
        console.log("PROFILE Data", appointment)
  return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
                <div className="lg:col-span-6  flex flex-col gap-y-4">
                    <div className="flex flex-col gap-2">
                    <h1 className="text-sm font-bold font-opensans text-gray-600 tracking-wider -mb-1">
					Patient Information
                    </h1>
                    <div className="border w-full p-2">
                        <table className="">
                            <tbody className="">
                                <TRow
                                    title="Patient ID:"
                                    value={appointment?.patient?.id}
                                /> 
                                <TRow
                                    title="Enlistment No:"
                                    value={appointment?.patient?.transaction_no}
                                /> 
                                <TRow
                                    title="Case No:"
                                    value={appointment?.patient?.case_no}
                                /> 
                                <TRow
                                            title="PHIC ID:"
                                            value={appointment?.patient?.philhealth}
                                        /> 
                                <TRow title="Lastname:" value={appointment?.patient?.lastname} />
                                <TRow
                                    title="Firstname:"
                                    value={appointment?.patient?.firstname}
                                />
                                <TRow title="Middlename:" value={appointment?.patient?.middle} />
                                <TRow title="Suffix:" value={appointment?.patient?.suffix} />
                                <TRow title="Birthday:" value={appointment?.patient?.birthday} />
                                <TRow title="Age:" value={appointment?.patient?.gender} />
                                <TRow title="Gender:" value={appointment?.patient?.gender} />
                                <TRow
                                    title="Civil Status:"
                                    value={
                                        patient?.information
                                            ? marital_status_lists.find(
                                                    (x) =>
                                                        x.value ==
                                                        patient?.information
                                                            ?.marital_status
                                            )?.label
                                            : patient?.civil_status
                                    }
                                />
                                <TRow title="Claimed:" value='' />
                                <TRow title="Actual Amount:" value='' />
                                
                                
                            </tbody>
                        </table>
                    </div>
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="text-sm font-bold font-opensans text-gray-600 tracking-wider -mb-1">
					Member Information
                    </h1>
                    <div className="border w-full p-2">
						
                        <table className="">
								<tbody className="">
									<TRow
										title="Member Pin:"
										value={patient?.m_pin?.replace(/(\d{2})(\d{9})(\d{1})/, '$1-$2-$3')}
									/>
									<TRow
										title="Lastname:"
										value={patient?.m_lastname}
									/>
									<TRow
										title="Firstname:"
										value={patient?.m_firstname}
									/>
									<TRow
										title="Middlename:"
										value={patient?.m_middlename || ""}
									/>
									<TRow
										title="Middlename:"
										value={patient?.m_suffix || ""}
									/>
									<TRow
										title="Birthday:"
										value={patient?.m_birthday}
									/>
									<TRow
										title="Category:"
										value={patient?.m_category}
									/>
								</tbody>
						</table>
                    </div>
					</div>
                </div>
                <div className="lg:col-span-6 flex flex-col gap-4">
                    <div className=" flex flex-col gap-2">
						<h1 className="text-sm font-bold font-opensans text-gray-600 tracking-wider -mb-1">
                        Health Screening Transmittal Information
                        </h1>
                        <div className="border w-full p-2">
                            <table className="">
                                    <tbody className="">
                                        <TRow
                                            title="pHciAccreNo:"
                                            value={appointment?.rhu?.accreditation_number}
                                        />
                                        <TRow
                                            title="pPMCCNo:"
                                            value={appointment?.rhu?.pmcc_number || ""}
                                        />
                                        <TRow
                                            title="pCertificationId:"
                                            value={appointment?.rhu?.software_certificate || ""}
                                        />
                                        <TRow
                                            title="pEnlistTotalCnt:"
                                            value={patient?.enlistment_stat}
                                        />
                                        <TRow
                                            title="pProfileTotalCnt:"
                                            value={patient?.enlistment_stat}
                                        />
                                        <TRow
                                            title="pSoaTotalCnt:"
                                            value={patient?.enlistment_stat}
                                        />
                                        <TRow
                                            title="pHciTransmittalNumber:"
                                            value={patient?.transmittal_no}
                                        />
                                        <TRow
                                            title="HCIName:"
                                            value={appointment?.rhu?.name}
                                        />
                                        <TRow
                                            title="CipherKey:"
                                            value={appointment?.rhu?.cipher_key}
                                        />
                                        <TRow
                                            title="UserId:"
                                            value={patientFullName(appointment?.createdBy)}
                                        />
                                        <TRow
                                            title="dateTrans:"
                                            value={formatDate(appointment?.created_at)}
                                        />
                                    </tbody>
                            </table>
                        </div>
                        <div className="flex gap-2 justify-center">
                        <ActionBtn
                            type="foreground-dark"
							loading={loading}
							size="sm"
							className="!rounded-xl lg:col-span-3"
							onClick={() => {
                                hSAeKasRef.current.show();
                            }}
                            // disabled={patient?.is_validate === 1 }
						>
							<MenuTitle src="/file.png">
								eKaS
							</MenuTitle>
						</ActionBtn>
                        <ActionBtn
                            type="foreground-dark"
							loading={loading}
							size="sm"
							className="!rounded-xl lg:col-span-3"
							onClick={handleSubmit(validateHSAXML)}
                            disabled={patient?.is_validate === 1 }
						>
							<MenuTitle src="/validates.png">
								Validate
							</MenuTitle>
						</ActionBtn>
                        <ActionBtn
                            type="foreground-dark"
							loading={loading}
							size="sm"
							className="!rounded-xl lg:col-span-3"
                            disabled={patient?.healthScreeningAssessment?.status === 'submitted'}
							onClick={handleSubmit(submitHSAXML)}
						>
							<MenuTitle src="/send.png">
								Submit
							</MenuTitle>
						</ActionBtn>
                        </div>
                        
					</div>
                    <div className=" flex flex-col gap-2">
						<h1 className="text-sm font-bold font-opensans text-gray-600 tracking-wider -mb-1">
                        Consultation Transmittal Information
                        </h1>
                        <div className="border w-full p-2">
                            
                            <table className="">
                                    <tbody className="">
                                        <TRow
                                            title="pHciAccreNo:"
                                            value={appointment?.rhu?.accreditation_number}
                                        />
                                        <TRow
                                            title="pPMCCNo:"
                                            value={appointment?.rhu?.pmcc_number || ""}
                                        />
                                        <TRow
                                            title="pCertificationId:"
                                            value={appointment?.rhu?.software_certificate || ""}
                                        />
                                        <TRow
                                            title="pEnlistTotalCnt:"
                                            value={patient?.enlistment_stat}
                                        />
                                        <TRow
                                            title="pProfileTotalCnt:"
                                            value={patient?.enlistment_stat}
                                        />
                                        <TRow
                                            title="pSoaTotalCnt:"
                                            value={patient?.enlistment_stat}
                                        />
                                        <TRow
                                            title="pHciTransmittalNumber:"
                                            value={appointment?.transmittal_no}
                                        />
                                        <TRow
                                            title="HCIName:"
                                            value={appointment?.rhu?.name}
                                        />
                                        <TRow
                                            title="CipherKey:"
                                            value={appointment?.rhu?.cipher_key}
                                        />
                                        <TRow
                                            title="UserId:"
                                            value={patientFullName(appointment?.createdBy)}
                                        />
                                        <TRow
                                            title="dateTrans:"
                                            value={formatDate(appointment?.created_at)}
                                        />
                                    </tbody>
                            </table>
                        </div>
                        <div className="flex gap-2 justify-center">
                        <ActionBtn
                            type="foreground-dark"
							loading={loading}
							size="sm"
							className="!rounded-xl lg:col-span-3"
							onClick={() => {
                                consulteKasRef.current.show();
                            }}
                            // disabled={patient?.is_validate === 1 }
						>
							<MenuTitle src="/file.png">
								eKaS
							</MenuTitle>
						</ActionBtn>
                        <ActionBtn
                            type="foreground-dark"
							loading={loading}
							size="sm"
							className="!rounded-xl lg:col-span-3"
							onClick={() => {
                                consultePressRef.current.show();
                            }}
						>
							<MenuTitle src="/file.png">
								ePresS
							</MenuTitle>
						</ActionBtn>
                        <ActionBtn
                            type="foreground-dark"
							loading={loading}
							size="sm"
							className="!rounded-xl lg:col-span-3"
							onClick={handleSubmit(validateConsultXML)}
                            disabled={appointment?.is_validate === 1 }
						>
							<MenuTitle src="/validates.png">
								Validate
							</MenuTitle>
						</ActionBtn>
                        <ActionBtn
                            type="foreground-dark"
							loading={loading}
							size="sm"
							className="!rounded-xl lg:col-span-3"
							onClick={handleSubmit(submitConsultXML)}
                            disabled={appointment?.ConsultationAssessment?.status === 'submitted' }
						>
							<MenuTitle src="/send.png">
								Submit
							</MenuTitle>
						</ActionBtn>
                        </div>
					</div>
                </div>
            </div>
            <ConsultEkasPrintableModal ref={consulteKasRef} patient={patient} appointment={appointment}/>
            <ConsultePresSPrintableModal ref={consultePressRef} patient={patient} appointment={appointment}/>
            <HsAeKaSPrintableModal ref={hSAeKasRef} patient={patient} appointment={appointment}/>
        </div>
  )
}

export default KonsultaPreparation

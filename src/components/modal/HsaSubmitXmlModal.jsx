/* eslint-disable react/prop-types */
import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react'
import FlatIcon from '../FlatIcon';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import Axios from '../../libs/axios';
import ActionBtn from '../buttons/ActionBtn';

const HsaSubmitXmlModal = (props, ref) => {
const { appointment, patient } = props;
  const { user } = useAuth();
  
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState(null);
  

  useImperativeHandle(ref, () => ({
    show: show,
    hide: hide,
    setAppointment: (appointmentData) => setCurrentAppointment(appointmentData),
  }));

  const show = () => {
    setModalOpen(true);
    setSubmissionStatus(null); // Reset status on modal open
  };
  const hide = () => {
    setModalOpen(false);
  };
  const noHide = () => {};
 const fetchAppointmentDetails = async (appointment_id) => {
    setLoading(true);
    try {
      const response = await Axios.get(`/api/appointments/${appointment_id}`);
      setCurrentAppointment(response.data);
    } catch (error) {
      console.error('Error fetching appointment details:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchPatientDetails = async (patient_id) => {
    setLoading(true);
    try {
      const response = await Axios.get(`/api/patient/${patient_id}`);
      setCurrentAppointment(response.data);
    } catch (error) {
      console.error('Error fetching appointment details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Example, where `appointmentId` is passed to this component
  useEffect(() => {
    if (appointment?.id) {
      fetchAppointmentDetails(appointment.id); // Load the appointment data on change
    }
    if (patient?.id) {
      fetchPatientDetails(patient.id); // Load the appointment data on change
    }
  }, [appointment, patient]);

  const submitForm = async () => {
    setLoading(true);
    setSubmissionStatus(null);
    try {
      const payload = {
        user,
        appointment: currentAppointment,
        patient: currentAppointment?.patient,
        appointment_id: currentAppointment?.id,
        patient_id: currentAppointment?.patient?.id,
      };
      const response = await Axios.post(`/v1/diagnostic/philhealth/hsa-xml/${currentAppointment?.id}`, payload);
      setSubmissionStatus('success');
      alert(response.data.message || 'XML Submit successfully!');
    } catch (error) {
      setSubmissionStatus('failed');
      setSubmissionStatus(error.response?.data?.error || 'Unknown submission error.');
    } finally {
      setLoading(false);
    }
  };
 console.log("submit hsa ekonsulta", currentAppointment)
  return (
    <Transition appear show={modalOpen} as={Fragment}>
            <Dialog as="div" className="" onClose={noHide}>
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
                            leaveTo="opacity-10 scale-95"
                        >
                            <Dialog.Panel className="w-full lg:max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all">
                                <Dialog.Title
                                    as="div"
                                    className="bg-green-700 py-3 px-4 flex flex-col border-b-8 border-yellow-400"
                                >
                                    <span className="text-xl font-bold text-white">EKONSULTA SUBMISSION</span>
                                    <span className="text-sm font-light text-white">Submission of eKonsulta xml</span>
                                    <span
                                        className="bg-red-600 text-white h-8 px-4 gap-2 rounded-lg flex items-center justify-center right-4 absolute cursor-pointer hover:bg-red-800 duration-500"
                                        onClick={hide}
                                    >
                                        <FlatIcon icon="rr-cross" />
                                    </span>
                                </Dialog.Title>
                                <div className="bg-white p-4">
                                    <div className="bg-white p-[0.5in] w-[9.5in] gap-y-6 mx-auto">
                                        <div className="bg-white flex flex-col">
                                            <div className="flex items-center relative justify-center px-2 pt-2 pb-1">
                                                <img className="w-[144px] left-2 object-contain" src="/philhealth.png" />
                                                <div className="flex flex-col text-left w-full mx-auto">
                                                    <p className="text-xs text-center">
                                                        <i>Republic of the Philippines</i>
                                                    </p>
                                                    <h4 className="font-bold text-xl text-center">
                                                        PHILIPPINE HEALTH INSURANCE CORPORATION
                                                    </h4>
                                                    <p className="text-xs text-center">
                                                        Citystate Centre 709 Shaw Boulevard, Pasig City
                                                    </p>
                                                    <p className="text-xs text-center">
                                                        Call Center (02) 441-7442 | Trunkline (02) 441-7444
                                                    </p>
                                                    <p className="text-xs text-center">www.philhealth.gov.ph</p>
                                                    <p className="text-xs text-center">
                                                        email: actioncenter@philhealth.gov.ph
                                                    </p>
                                                </div>
                                                <img className="w-[100px] left-2 object-contain" src="/benifits.png" />
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <div className="text-lg font-extrabold text-center">
                                                    {loading ? <span>Submitting...</span> : null}
                                                      {submissionStatus === 'success' && <p className="text-green-500">eKonsulta XML Submitted Successfully!</p>}
                                                      {submissionStatus === 'failed' && (
                                                      <div>
                                                          <p className="text-red-500">Validation Failed!</p>
                                                      </div>
                                                      )}
                                                  </div>
                                                <div className="flex flex-col gap-4 mt-8">
                                                    <div className="grid grid-cols-2">
                                                        <span className="text-sm">TRANSACTION REFERENCE NUMBER:</span>
                                                        <span className="font-semibold">
                                                            {currentAppointment?.patient?.case_no}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <span className="text-sm">ENLISTMENT REFERENCE NUMBER:</span>
                                                        <span className="font-semibold">{currentAppointment?.patient?.transaction_no}</span>
                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <span className="text-sm">REPORT TRANCHE:</span>
                                                        <span className="font-semibold">
                                                            {currentAppointment?.status === null ? 'First Tranche' : ' '}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <span className="text-sm">EFFECTIVITY YEAR OF ENLISTMENT:</span>
                                                        <span className="font-semibold">{currentAppointment?.patient?.effective_year}</span>
                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <span className="text-sm ">MEMBER PIN:</span>
                                                        <span className="font-semibold">{currentAppointment?.patient?.philhealth}</span>
                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <span className="text-sm">LAST STATUS:</span>
                                                        <span className="font-semibold">
                                                            {submissionStatus === 'success' ? 'UPLOADED' : ''}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <span className="text-sm">STATUS LOGS:</span>
                                                        <span className="font-semibold">{submissionStatus === 'success' ? 'Successfully Uploaded HSA XML' : ''}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 flex items-center justify-center bg-slate-100 border-t">
                                        <ActionBtn
                                            disabled={loading || submissionStatus === 'success'}
                                            className="ml-4"
                                            onClick={handleSubmit(submitForm)}
                                        >
                                            SUBMIT
                                        </ActionBtn>
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

export default forwardRef(HsaSubmitXmlModal)

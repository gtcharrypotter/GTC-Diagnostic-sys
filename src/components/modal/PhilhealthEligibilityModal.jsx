/* eslint-disable react/prop-types */
import { Dialog, Transition } from '@headlessui/react';
import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useRef, useState } from 'react'
import PBEF from '../../pages/hims/his-billing/component/pmrf-claims/PBEF';
import { useAuth } from '../../hooks/useAuth';
import { useReactToPrint } from 'react-to-print';
import ActionBtn from '../buttons/ActionBtn';
import FlatIcon from '../FlatIcon';
import { formatDate, formatDateTime, patientFullName } from '../../libs/helpers';
import Axios from '../../libs/axios';

const PhilhealthEligibilityModal = (props, ref) => {
    const {patient} = props;
    const componentRef = useRef(null);
	const isRegistered = !!patient?.philhealth; // Check if the patient record exists
      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    const [modalOpen, setModalOpen] = useState(false);
    useImperativeHandle(ref, () => ({
            show: show,
            hide: hide,
        }));
        const show = () => {
            setModalOpen(true);
        };
        const hide = () => {
            setModalOpen(false);
        };
        const noHide = () => {};
		console.log("PBEF data", patient)
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
                  <span className="text-xl font-bold text-white">MASTERLIST CHECK</span>
                  <span className="text-sm font-light text-white">Check member/dependent registration</span>
                  <span
                    className="bg-red-600 text-white h-8 px-4 gap-2 rounded-lg flex items-center justify-center right-4 absolute cursor-pointer hover:bg-red-800 duration-500"
                    onClick={hide}
                  >
                    <FlatIcon icon="rr-cross" />
                  </span>
                </Dialog.Title>
                <div className="bg-white p-4">
                  <div className="flex gap-2">
                    <ActionBtn
                      type="primary"
                      className="ml-auto py-2 !text-xs"
                      size="md"
                      onClick={handlePrint}
                    >
                      <FlatIcon icon="rr-print" className="text-white" />
                    </ActionBtn>
                  </div>
                  <div
                    className="bg-white p-[0.5in] w-[9.5in] gap-y-6 mx-auto"
                    id="phic-form-printable"
                    ref={componentRef}
                  >
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
                            Call Center (02) 441-7442 l Trunkline (02) 441-7444
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
                          {isRegistered ? (
                            <span className="text-green-700">MEMBER/DEPENDENT IS REGISTERED</span>
                          ) : (
                            <span className="text-red-700">MEMBER/DEPENDENT IS NOT-REGISTERED</span>
                          )}
                        </div>
                        <div className="flex flex-col gap-4 mt-16">
                          <div className="flex gap-2">
                            <span className="text-lg">ASSIGNED NAME:</span>
                            <span className="text-lg">
                              {patient?.lastname}, {patient?.firstname},{' '}
                              {patient?.middle || ''} {patient?.suffix || ''}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-lg">ASSIGNED PIN:</span>
                            <span className="text-lg">{patient?.philhealth || 'N/A'}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-lg">ASSIGNED SEX:</span>
                            <span className="text-lg">{patient?.gender || 'N/A'}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-lg">ASSIGNED BIRTHDAY:</span>
                            <span className="text-lg">{patient?.birthday || 'N/A'}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-lg">ASSIGNED TYPE:</span>
                            <span className="text-lg">{patient?.patient_member_phic_type}</span>
                          </div>
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

export default forwardRef(PhilhealthEligibilityModal)

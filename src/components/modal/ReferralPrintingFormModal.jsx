import { Dialog, Transition } from "@headlessui/react";
import React, {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useState,
} from "react";
import { patientFullName } from "../../libs/helpers";
import ActionBtn from "../buttons/ActionBtn";

const ReferralPrintingFormModal = (props, ref) => {
    const {patient, onSubmit } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  useImperativeHandle(ref, () => ({
    show: (data) => {
      setFormData(data);
      setModalOpen(true);
    },
    hide: hide,
  }));

  const hide = () => {
    setModalOpen(false);
  };

  const handlePrint = () => {
  };
  const submit = () => {
    if (onSubmit && formData) {
      onSubmit(formData); // pass data to parent
    }
    hide(); // close modal after confirm
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
          <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur z-20" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto !z-[100]">
          <div className="flex min-h-full items-center justify-center p-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full lg:max-w-3xl transform overflow-hidden rounded-2xl bg-sky-200 text-left align-middle shadow-xl transition-all p-6">
                <div className="flex flex-col gap-2 justify-center items-center border-b border-black">
                    <img
							src="/Province_of_Sarangani.png"
							className="w-24 h-24 object-contain "
					/>
                    <div className="   pb-2 mb-4 text-center">
                        <h2 className="text-2xl font-bold text-blue-900">
                            Referral Slip
                        </h2>
                        <p className="text-sm text-gray-600">
                            Hospital Referral Form
                        </p>
                    </div>
                </div>
                
                

                {/* Patient Info */}
                {formData && (
                  <div className="space-y-4 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <p>
                        <span className="font-semibold">Patient Name:</span>{" "}
                        {patientFullName(patient)}
                      </p>
                      <p>
                        <span className="font-semibold">Patient ID:</span>{" "}
                        {formData?.patient?.id}
                      </p>
                      <p>
                        <span className="font-semibold">Date of Referral:</span>{" "}
                        {formData?.date_refer}
                      </p>
                      <p>
                        <span className="font-semibold">Time:</span>{" "}
                        {formData?.time_refer}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold underline">
                        Clinical Information
                      </h4>
                      <p>
                        <span className="font-semibold">Chief Complaint:</span>{" "}
                        {formData?.chief_complaint}
                      </p>
                      <p>
                        <span className="font-semibold">Brief Clinical:</span>{" "}
                        {formData?.brief_clinical}
                      </p>
                      <p>
                        <span className="font-semibold">
                          Laboratory Findings:
                        </span>{" "}
                        {formData?.laboratory_findings}
                      </p>
                      <p>
                        <span className="font-semibold">Impression:</span>{" "}
                        {formData?.impression}
                      </p>
                      <p>
                        <span className="font-semibold">Action Taken:</span>{" "}
                        {formData?.action_taken}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold underline">Coverage</h4>
                      <p>
                        <span className="font-semibold">Covered:</span>{" "}
                        {formData?.coverage}
                      </p>
                      {formData?.coverage === "yes" && (
                        <p>
                          <span className="font-semibold">
                            Type of Coverage:
                          </span>{" "}
                          {formData?.type_of_coverage}
                        </p>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold underline">Reason</h4>
                      <p>{formData?.reason_for_refer}</p>
                    </div>
                  </div>
                )}

                {/* Footer buttons */}
                <div className="mt-6 flex justify-between no-print">
                    <ActionBtn
                        type="danger"
                        className="mr-auto"
                        onClick={hide}
                        >
                        Close
                    </ActionBtn>
                    <div className="flex gap-2">
                        <ActionBtn
                        type="primary"
                        className="ml-auto"
                        onClick={handlePrint}
                        >
                        Print
                    </ActionBtn>
                    <ActionBtn
                        type="success"
                        className="ml-auto"
                        onClick={submit}
                        >
                        Confirm
                    </ActionBtn>
                    </div>
                    
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default forwardRef(ReferralPrintingFormModal);

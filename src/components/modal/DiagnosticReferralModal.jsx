import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react'
import ActionBtn from '../buttons/ActionBtn'
import { Dialog, Transition } from '@headlessui/react';
import ReactSelectInputField from '../inputs/ReactSelectInputField';
import { Controller, useForm } from 'react-hook-form';
import useNoBugUseEffect from '../../hooks/useNoBugUseEffect';
import Axios from '../../libs/axios';
import useClinic from '../../hooks/useClinic';

const DiagnosticReferralModal = (props, ref) => {
      const {patient, onSubmit } = props;
      const [modalOpen, setModalOpen] = useState(false);
      const [formData, setFormData] = useState(null);
      const [HUList, setHUList] = useState([]);
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
    useEffect(() => {
            let t = setTimeout(() => {
            }, 400);
            return () => {
                clearTimeout(t);
            };
        }, []);
      useImperativeHandle(ref, () => ({
        show: (data) => {
          setFormData(data);
          setModalOpen(true);
        },
        hide: hide,
      }));
    useNoBugUseEffect({
            functions: () => {
                if (watch("location_type")) getHUList(watch("location_type"));
            },
            params: [watch("location_type")],
        });
        const getHUList = (type) => {
		Axios.get(`v1/health-unit/list?type=${type}`)
			.then((res) => {
				setHUList(res.data.data);
			})
			.finally(() => {});
	};
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
      const noHide = () => {};
  return (
    <Transition appear show={modalOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-y-auto !z-[1000]" onClose={hide}>
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
              <Dialog.Panel className="w-full  lg:max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-6">
                <div className="flex flex-col gap-2 justify-center items-center border-b border-black ">
                    <img
							src="/Province_of_Sarangani.png"
							className="w-24 h-24 object-contain "
					/>
                    <div className="   pb-2 mb-4 text-center">
                        <h2 className="text-2xl font-bold text-blue-900">
                            Diagnostic Referral
                        </h2>
                        <p className="text-sm text-gray-600">
                            Referral Form
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 pt-8 pb-8">
                    <span className='text-xl font-bold'>LABORATORY TEST :</span>
                    <span className='text-xl font-bold'>{formData?.selectedTest?.name || "No Test Selected"}</span>
                </div>
                <div className="">
					<div className="lg:cols-span-2">
						<h4 className=" text-base font-bold p-2 mb-2 lg:col-span-12">
							<span className='text-red-700 animate-none'>REFER TO FACILITY</span>
						</h4>
						<div className="flex gap-6">
							<Controller
							name="location_type"
							control={control}
							rules={{
								required: {
									value: true,
									message:
										"This field is required",
								},
							}}
							render={({
								field: {
									onChange,
									onBlur,
									value,
									name,
									ref,
								},
								fieldState: {
									invalid,
									isTouched,
									isDirty,
									error,
								},
							}) => (
								<ReactSelectInputField
									isClearable={false}
									inputClassName=" "
									ref={ref}
									value={value}
									label="Select Location Type"
									onChange={onChange}
									onBlur={onBlur} // notify when input is touched
									error={error?.message}
									placeholder="Select type"
									options={[
										{
											label: "Rural Health Unit",
											value: "RHU",
											
										},
										{
											label: "Sarangani Provincial Hospital",
											value: "SPH",
											
										},
									]}
								/>
							)}
						/>
						<Controller
							name="health_unit_id"
							control={control}
							rules={{
								required: {
									value: true,
									message:
										"This field is required",
								},
							}}
							render={({
								field: {
									onChange,
									onBlur,
									value,
									name,
									ref,
								},
								fieldState: {
									invalid,
									isTouched,
									isDirty,
									error,
								},
							}) => (
								<ReactSelectInputField
									isClearable={false}
									onChangeGetData={(
										data
									) => {}}
									inputClassName=" "
									ref={ref}
									value={value}
									onChange={onChange}
									onData
									label="Select Health Unit"
									onBlur={onBlur} // notify when input is touched
									error={error?.message}
									placeholder={`Select Health Unit`}
									options={HUList?.map(
										(unit) => ({
											label: unit?.name,
											value: unit?.id,
											rooms: unit?.rooms,
										})
									)}
								/>
							)}
						/>
						</div>
					</div>
				</div>
              
                {/* Footer buttons */}
                <div className="mt-80 flex justify-between no-print">
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
                        // onClick={handlePrint}
                        >
                        Print
                    </ActionBtn>
                    <ActionBtn
                        type="success"
                        className="ml-auto"
                        // onClick={submit}
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
  )
}

export default forwardRef(DiagnosticReferralModal)

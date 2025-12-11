/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import React, { Fragment, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import ActionBtn from '../../../../../components/buttons/ActionBtn';
import { Controller, useForm } from 'react-hook-form';
import useNoBugUseEffect from '../../../../../hooks/useNoBugUseEffect';
import Axios from '../../../../../libs/axios';
import { toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import ReactSelectInputField from '../../../../../components/inputs/ReactSelectInputField';
import ReactQuillField from '../../../../../components/inputs/ReactQuillField';
import TextInputField from '../../../../../components/inputs/TextInputField';
import { patientFullName } from '../../../../../libs/helpers';
import axios from 'axios';

const UpdatePatientOperation = (props, ref) => {
	const { patient, onSuccess } = props;
	console.log('patient------------------------>', patient)
	const {
		control,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [showData, setShowData] = useState(null);
	const [saving, setSaving] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [operation, setOperation] = useState(null);
	const [loading, setLoading] = useState(false);

	useNoBugUseEffect({
		functions: () => {},
	});
	// useEffect(()=> {
	// 	axios.get('/v1/anesthesia/operation-procedure/list')
	// 	.then(res => setOperation(res.operation))
	// 	.catch(err => console.log(err));
	// })
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setShowData(data);
		console.log("procedure ID---------------->>>", showData?.id);
		// console.log("/v1/anesthesia/operation-procedure/list");
		setModalOpen(true);
		getOperationProcedure(data);
		
	};
	
	const hide = () => {
		setModalOpen(false);
	};
	


	const submit = (data) => {
    setSaving(true);
    console.log("dataaaa---------------- submit", showData?.id);
    let formData = new FormData();
	const operationNotesPlainText = data?.operation_notes.replace(/<[^>]+>/g, '');
    formData.append("_method", "PATCH");
    formData.append("operation_status", data?.operation_status);
    formData.append("operation_notes", operationNotesPlainText);
    Axios.post(`v1/anesthesia/operation-procedure/update/${showData?.id}`, formData)
        .then((res) => {
            if (onSuccess) onSuccess();
            setTimeout(() => {
                setLoading(false);
                toast.success("Operation Procedure updated successfully!");
                if (data?.operation_status === "For Discharge") {
                    mutateOperatingRoom(); 
                    mutateResu(); 
                    mutateDone(); 
                }
            }, 400);
            hide();
        })
        .catch((error) => {
            console.error("Error updating operation procedure:", error);
            toast.error("Error updating operation procedure.");
        })
        .finally(() => {
            setSaving(false);
        });
};

	const getOperationProcedure = (operationData) => {
    Axios.get(`v1/anesthesia/operation-procedure/updated-procedure/${operationData?.id}`)
        .then((res) => {
            const responseData = res.data.data;
            if (responseData) {
                setOperation(responseData);
                setValue("operation_status", responseData?.operation_status);
				setValue("operation_notes", responseData?.operation_notes);
				
            } else {
                console.error("No data found for the operation procedure.");
            }
        })
        .catch((error) => {
            console.error("Error fetching operation procedure:", error);
        });
};
	
	const hasError = (name) => {
		return errors[name]?.message;
	};
	
	
	const noHide = () => {};

	 const getStatusOptions = (currentStatus) => {
        const options = [
            { label: "For Operation", value: "For Operation" },
            { label: "Operating Room", value: "Operating Room" },
            { label: "RESU", value: "RESU" },
            { label: "DONE", value: "DONE" },
            { label: "For Discharge", value: "For Discharge" },
        ];

        switch (currentStatus) {
            case "For Operation":
                return options.filter(opt => opt.value === "Operating Room");
            case "Operating Room":
                return options.filter(opt => ["RESU", "DONE"].includes(opt.value));
            case "RESU":
                return options.filter(opt => opt.value === "DONE");
            case "DONE":
                return options.filter(opt => opt.value === "For Discharge");
            default:
                return [];
        }
    };
	
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
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full lg:max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									<span className="text-xl text-center font-bold  text-blue-900">
										Operating Procedure
									</span>
								</Dialog.Title>
								<div className="p-6 flex flex-col gap-y-4 relative">
									<div className="flex items-center gap-16 mb-2">
													<span className="text-base">
														Procedure ID:
													</span>
													<span className="font-bold text-sm text-slate-700 italic ml-16">
														{showData?.operation_number}
													</span>
										</div>
										<div className="flex items-center gap-16 mb-2">
													<span className="text-base">
														Procedure:
													</span>
													<span className="font-bold text-base text-red-800 ml-20">
														{showData?.procedure}
													</span>
										</div>
									<div className="flex items-center gap-16 mb-2">
													<span className="text-base">
														Fullname
													</span>
													<span className="font-bold text-sm text-slate-700 italic ml-24">
														{patientFullName(showData?.relationships?.patient)}
													</span>
										</div>
									{/* <div className="flex items-center gap-16 mb-2">
													<span className="text-base ">
														Date Operation:
													</span>
													<span className="font-bold text-sm text-slate-700 italic ml-12">
														{showData?.operation_date}
													</span>
										</div>
									<div className="flex items-center gap-16 mb-2">
													<span className="text-base">
														Time Operation:
													</span>
													<span className="font-bold text-sm text-slate-700 italic ml-12">
														{showData?.operation_time}
													</span>
										</div> */}

										<div className="flex items-center gap-16 mb-2">
													<span className="text-base ">
														Date:
													</span>
													<span className="font-bold text-sm text-slate-700 italic ml-32">
														{/* {showData?.operation_date} */}
														<TextInputField
															type="date"
															className="focus:outline-none focus:border-blue-500"
															value={showData?.operation_date}
															onChange={(e) => setShowData({ ...showData, operation_date: e.target.value })}
														/>
													</span>
										</div>
									<div className="flex items-center gap-16 mb-2">
													<span className="text-base">
														Time:
													</span>
													<span className="font-bold text-sm text-slate-700 italic ml-32">
														{/* {showData?.operation_time} */}
														 <TextInputField
															type="time"
															className="focus:outline-none focus:border-blue-500"
															value={showData?.operation_time}
															onChange={(e) => setShowData({ ...showData, operation_time: e.target.value })}
														/>
													</span>
										</div>
									{/* <Controller
										name="operation_status"
										control={control}
										rules={{
											required: "The operation status field is required", // Specify the required rule
										}}
										render={({ field }) => (
											<ReactSelectInputField
												isClearable={false}
												label={
													<>
														Status
														<span className="text-danger ml-1">*</span>
													</>
												}
												inputClassName=" "
												{...field}
												error={errors.operation_status?.message} // Show error message if validation fails
												placeholder="Select Status"
												options={[
													{
														label: "For Operation",
														value: "Operating-Room",
													},
													{
														label: "RESU",
														value: "RESU",
													},
													{
														label: "Done",
														value: "DONE",
													},
													{
														label: "For Discharge",
														value: "For Discharge",
													},
												]}
											/>
										)}
									/> */}
									<Controller
    name="operation_status"
    control={control}
    rules={{
        required: "The operation status field is required", // Specify the required rule
    }}
    render={({ field }) => (
        <ReactSelectInputField
            isClearable={false}
            label={
                <>
                    Status
                    <span className="text-danger ml-1">*</span>
                </>
            }
            inputClassName=" "
            {...field}
            error={errors.operation_status?.message} // Show error message if validation fails
            placeholder="Select Status"
			options={getStatusOptions(field.value)}
            // options={[
			// 	 {
			// 	 	label: "Operating Room",
			// 	 	value: "Operating Room",
			// 	 },
			// 	 {
			// 	 	label: "RESU",
			// 	 	value: "RESU",
			// 	 },
			// 	 {
			// 	 	label: "DONE",
			// 	 	value: "DONE",
			// 	 },
            //     ...(field.value === "DONE"
            //         ? [
            //               {
            //                   label: "For Discharge",
            //                   value: "For Discharge",
            //               },
            //           ]
            //         : []),
            // ]}

        />
    )}
/>
									<Controller
										name="operation_notes"
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
											<ReactQuillField
												name={name}
												error={error}
												label="Notes"
												value={value}
												onChange={onChange}
											/>
										)}
									/>
								
								</div>
								

								<div className="px-4 py-4 border-t flex items-center justify-end bg-slate-">
									<ActionBtn
										// size="lg"
										type="danger"
										// loading={saving}
										className="px-5 mr-auto"
										onClick={hide}
									>
										CLOSE
									</ActionBtn>
									<ActionBtn
										// size="lg"
										type="success"
										loading={saving}
										className="px-5"
										onClick={handleSubmit(submit)}
									>
										SUBMIT
									</ActionBtn>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
  )
}

export default forwardRef(UpdatePatientOperation)

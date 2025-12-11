import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import React, { forwardRef, Fragment, useImperativeHandle, useState } from 'react'
import Axios from '../../libs/axios';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import ReactSelectInputField from '../inputs/ReactSelectInputField';

const UploadPhilhealthMasterlistModal = (props, ref) => {
	const [modalOpen, setModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
	const [selected, setSelected] = useState(null);
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
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
		console.log(e.target.files[0]); 
    };

    const handleUpload = async () => {
        let formData = new FormData();
        let config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
        if (!selectedFile) {
            setUploadStatus('Please select a file before uploading.');
            return;
        }
        formData.append("_method", "POST");
        formData.append('file', selectedFile);

		Axios.post(`v1/opd-standalone/upload-konsulta-xml`, formData, config)
			.then((res) => {
				toast.success("Masterlist uploaded successfully!");
				hide();
			})
			.catch((error) => { // Use catch to handle the error
				toast.error(error.response?.data?.error || 'Upload failed.');
			});
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
							<Dialog.Panel className="w-full lg:max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all">
								<div className="flex flex-col gap-2 p-4 mx-auto bg-white rounded shadow">
                                    <h2 className="text-lg font-semibold mb-2">UPLOAD</h2>
                                    <div className="flex flex-col gap-4">
										<div className="w-full">
										<Controller
											name="upload"
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
													labelClassName="font-bold"
													isClearable={
														false
													}
													inputClassName=" "
													ref={ref}
													value={
														value
													}
													onChange={(
														val
													) => {
														console.log(
															"onChangeonChange",
															val
														);
														setSelected(
															String(
																val
															).toLowerCase()
														);
														if (
															onChange
														) {
															onChange(
																val
															);
														}
													}}
													onBlur={
														onBlur
													} // notify when input is touched
													error={
														error?.message
													}
													placeholder="Consultation type"
													options={[
														{
															label: "REGISTRATION MASTERLIST",
															value: "registration masterlist",
														},
														{
															label: "EKONSULTA XML DATA",
															value: "ekonsulta xml",
														},
													]}
												/>
											)}
										/>
									</div>
									{selected === 'registration masterlist' ? (
										<div className="flex flex-col">
											<span className='text-center font-semibold'>Registration Masterlist</span>
											<input
												type="file"
												accept=".xml,.enc,application/xml,text/xml,application/octet-stream"
												onChange={handleFileChange}
												className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
											/>
											<button
												onClick={handleUpload}
												className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
											>
												Upload
											</button>
											{uploadStatus && (
												<div className="mt-4 text-sm text-center">
													{uploadStatus}
												</div>
											)}
										</div>
									) : selected === 'ekonsulta xml' ? (
										<div className="flex flex-col gap-2">
											<div className="flex flex-col">
												<span className='text-center font-semibold'>eKonsulta XML Data</span>
												<span className='text-center text-danger text-xs font-light'>(ENLISTMENT/PROFILING/DIAGNOSTICEXAM/MEDICINE)</span>
											</div>
											<input
												type="file"
												accept=".xml,.enc,application/xml,text/xml,application/octet-stream"
												onChange={handleFileChange}
												className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
											/>
											<button
												onClick={handleUpload}
												className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
											>
												Upload
											</button>
											{uploadStatus && (
												<div className="mt-4 text-sm text-center">
													{uploadStatus}
												</div>
											)}
										</div>
									) : (
										<div className="h-24">

										</div>
									)}
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

export default forwardRef(UploadPhilhealthMasterlistModal)

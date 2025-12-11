import { Dialog, Transition } from '@headlessui/react';
import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import ReactSelectInputField from '../inputs/ReactSelectInputField';
import { civilStatusOptions, educational_attainment, genderOptions, ip_tribes, packageType, religion_choices } from '../../libs/patientFormOptions';
import TextInputField from '../inputs/TextInputField';
import ActionBtn from '../buttons/ActionBtn';
import Axios from '../../libs/axios';
import { toast } from 'react-toastify';

const UpdatePatientDetailsModal = (props, ref) => {
    const { patient, onSuccess } = props;
    const {
                register,
                getValues,
                setValue,
                control,
                reset,
                trigger,
                watch,
                handleSubmit,
                formState: { errors },
            } = useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [civilStatus, setCivilStatus] = useState([]);
    const [gender, setGender] = useState([]);
    const [religion, setReligion] = useState([]);
    const [education, setEducation] = useState([]);
    const [indigenous, setIndigenous] = useState([]);
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

    const submit = (data) => {
        setLoading(true);
        let formdata = new FormData();
        formdata.append("tin", data?.tin || " ");
        formdata.append("suffix", data?.suffix || " ");
		formdata.append("firstname", data?.firstname || " ");
		formdata.append("lastname", data?.lastname || " ");
		formdata.append("middle", data?.middle || " ");
		formdata.append("gender", data?.gender || " ");
        formdata.append("mobile", data?.mobile || " ");
        formdata.append("telephone", data?.telephone || " ");
        formdata.append("religion", data?.religion || " ");
        formdata.append("educational_attainment", data?.educational_attainment || " ");
        formdata.append("ip_type", data?.ip_type || " ");
		formdata.append("mother_firstname", data?.mother_firstname || " ");
		formdata.append("mother_lastname", data?.mother_lastname || " ");
		formdata.append("mother_middlename", data?.mother_middlename || " ");
        formdata.append("employer_pen", data?.employer_pen || " ");
		formdata.append("employer_name", data?.employer_name || " ");
        Axios.post(`v1/opd-standalone/update-details/${patient?.id}`, formdata, {})
            .then((res) => {
                // return resolve(res.data);
                setTimeout(() => {
                    toast.success("Update details successfully!");
                    hide();
                }, 400);
                        if (onSuccess) {
                    onSuccess();
                } 
                setLoading(false);
                
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                // return reject(err);
            });
    }
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
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full lg:max-w-6xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<div className="flex flex-col gap-y-4 relative">
									<div className="flex flex-col p-4 border-b">
										<span className="text-xl font-bold  text-blue-900">
											Update personal details
										</span>
										<span className="text-sm font-light text-blue-900 ">
											Complete form to update the personal details
										</span>
									</div>
									<div className="px-4 pb-4">
                                        <div className="flex flex-col lg:col-span-12 gap-6">
                                            <div className="grid grid-cols-1 lg:grid-cols-3">
                                            <TextInputField
												label={
													<>
														TIN
													</>
												}
												placeholder="TIN"
												className="lg:col-span-1"
                                                value={patient?.tin}
												{...register(
													"tin",
												)}
											/>
                                            </div>
                                             <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4">
															<TextInputField
																label={
																	<>
																		Lastname
																		<span className="text-danger ml-1">
																			*
																		</span>
																	</>
																}
																placeholder="Lastname"
																className=" lg:col-span-4"
																error={
																	errors?.lastname
																		?.message
																}
                                                                
																{...register(
																	"lastname",
																	{
																		required:
																			"This field is required",
																		
																	}
																)}
                                                                defaultValue={patient?.lastname}
																
															/>
															<TextInputField
																label={
																	<>
																		Firstname
																		<span className="text-danger ml-1">
																			*
																		</span>
																	</>
																}
																placeholder="Firstname"
																className="lg:col-span-4"
																
																error={
																	errors
																		?.firstname
																		?.message
																}
																defaultValue={patient?.firstname}
																{...register(
																	"firstname",
																	{
																		required:
																			"This field is required",
																	}
																)}
															/>
															<TextInputField
																label="Middlename"
																placeholder="Middlename"
																className="lg:col-span-2"
                                                                defaultValue={patient?.middle}
																{...register(
																	"middle",
																	{
																		required: false,
																	}
																)}
															/>
															<TextInputField
																label="Suffix"
																placeholder="Suffix"
																className="lg:col-span-2"
                                                                defaultValue={patient?.suffix}
																{...register(
																	"suffix",
																	{
																		required: false,
																	}
																)}
															/>
															<TextInputField
																label={
																	<>
																		Birthdate
																		<span className="text-danger ml-1">
																			*
																		</span>
																	</>
																}
																placeholder="Birthdate"
																className="lg:col-span-4"
																type="date"
																
																error={
																	errors
																		?.birthdate
																		?.message
																}
																defaultValue={patient?.birthday}
																{...register(
																	"birthdate",
																	{
																		required:
																			"This field is required",
																	}
																)}
															/>
															<TextInputField
																label={
																	<>
																		Place of
																		birth
																		<span className="text-danger ml-1">
																			*
																		</span>
																	</>
																}
																placeholder="Place of birth"
																className="lg:col-span-8"
																error={
																	errors
																		?.birthplace
																		?.message
																}
                                                                defaultValue={patient?.birthplace}
																{...register(
																	"birthplace",
																	{
																		required:
																			"This field is required",
																	}
																)}
															/>
															<div className="lg:col-span-3">
																<Controller
																	name="gender"
																	control={control}
																	rules={{
																		required: {
																			value: true,
																			message: "This field is required",
																		},
																	}}
																	render={({
																		field: { onChange, onBlur, value, name, ref },
																		fieldState: { error },
																	}) => (
																		<ReactSelectInputField
																			className="mb-3"
																			isClearable={true}
																			labelClassName="font-bold"
																			label={
																				<>
																					Sex at Birth
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			inputClassName=""
																			ref={ref}
																		
																		onChange={(
																			val
																		) => {
																			console.log(
																				"onChangeonChange",
																				val
																			);
																			setGender(
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
																			onBlur={onBlur}
																			error={error?.message}
																			placeholder="sex at birth"
                                                                            value={patient?.gender}
																			options={genderOptions?.map((data) => ({
																							label: data?.label,
																							value: data?.value,
																						}))}
																		/>
																	)}
																/>
																
															</div>
															<div className="lg:col-span-3">
																<Controller
																	name="civil_status"
																	control={control}
																	rules={{
																		required: {
																			value: true,
																			message: "This field is required",
																		},
																	}}
																	render={({
																		field: { onChange, onBlur, value, name, ref },
																		fieldState: { error },
																	}) => (
																		<ReactSelectInputField
																			className="mb-3"
																			isClearable={true}
																			labelClassName="font-bold"
																			label={
																				<>
																					Civil Status
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			inputClassName=""
																			ref={ref}
                                                                            
																		onChange={(
																			val
																		) => {
																			console.log(
																				"onChangeonChange",
																				val
																			);
																			setCivilStatus(
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
																			onBlur={onBlur}
																			error={error?.message}
																			placeholder="Civil Status"
                                                                            value={patient?.civil_status}
																			options={civilStatusOptions?.map((data) => ({
																							label: data?.label,
																							value: data?.value,
																						}))}
																		/>
																	)}
																/>
															</div>
															<TextInputField
																label="Mobile Number"
																placeholder="Mobile Number"
																className="lg:col-span-3"
                                                                defaultValue={patient?.mobile}
																{...register(
																	"mobile",
																	{
																		required: false,
																	}
																)}
															/>
															<TextInputField
															label="Telephone Number"
																placeholder="Telephone Number"
																className="lg:col-span-3"
                                                                defaultValue={patient?.telephone}
																{...register(
																	"telephone",
																	{
																		required: false,
																	}
																)}
															/>
															<div className="lg:col-span-4">
																<Controller
																	name="religion"
																	control={control}
																	rules={{
																		required: {
																			value: true,
																			message: "This field is required",
																		},
																	}}
																	render={({
																		field: { onChange, onBlur, value, name, ref },
																		fieldState: { error },
																	}) => (
																		<ReactSelectInputField
																			className="mb-3"
																			isClearable={true}
																			labelClassName="font-bold"
																			label={
																				<>
																					Religion
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			inputClassName=""
																			ref={ref}
																		onChange={(
																			val
																		) => {
																			console.log(
																				"onChangeonChange",
																				val
																			);
																			setReligion(
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
																			onBlur={onBlur}
																			error={error?.message}
																			placeholder="Religion"
                                                                            value={patient?.religion}
																			options={religion_choices?.map((data) => ({
																							label: data?.label,
																							value: data?.value,
																						}))}
																		/>
																	)}
																/>
															</div>
															<div className="lg:col-span-4">
																<Controller
																	name="educational_attainment"
																	control={control}
																	rules={{
																		required: {
																			value: true,
																			message: "This field is required",
																		},
																	}}
																	render={({
																		field: { onChange, onBlur, value, name, ref },
																		fieldState: { error },
																	}) => (
																		<ReactSelectInputField
																			className="mb-3"
																			isClearable={true}
																			labelClassName="font-bold"
																			label={
																				<>
																					Educational Attainment
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			inputClassName=""
																			ref={ref}
																			
																		onChange={(
																			val
																		) => {
																			console.log(
																				"onChangeonChange",
																				val
																			);
																			setEducation(
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
																			onBlur={onBlur}
																			error={error?.message}
																			placeholder="Educational Attainment"
                                                                            value={patient?.education_attainment}
																			options={educational_attainment?.map((data) => ({
																							label: data?.label,
																							value: data?.value,
																						}))}
																		/>
																	)}
																/>
															</div>
															<div className="lg:col-span-4">
																<Controller
																	name="ip_type"
																	control={control}
																	rules={{
																		required: {
																			value: true,
																			message: "This field is required",
																		},
																	}}
																	render={({
																		field: { onChange, onBlur, value, name, ref },
																		fieldState: { error },
																	}) => (
																		<ReactSelectInputField
																			className="mb-3"
																			isClearable={true}
																			labelClassName="font-bold"
																			label={
																				<>
																					Indigenous
																					<span className="text-danger ml-1">
																						*
																					</span>
																				</>
																			}
																			inputClassName=""
																			ref={ref}
																			
																		onChange={(
																			val
																		) => {
																			console.log(
																				"onChangeonChange",
																				val
																			);
																			setIndigenous(
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
																			onBlur={onBlur}
																			error={error?.message}
																			placeholder="Indigenous Tribe"
                                                                            value={patient?.ip_type}
																			options={ip_tribes?.map((data) => ({
																							label: data?.label,
																							value: data?.value,
																						}))}
																						
																		/>
																	)}
																/>
															</div>
															
														{/* Mothers information */}
														<div className="grid grid-cols-1 border p-2 rounded-md bg-slate-50 lg:grid-cols-12 gap-2 col-span-12">
															<div className="col-span-12 text-md font-bold -mb-2 text-black">
																MOTHER'S MAIDEN
																NAME
															</div>
															<TextInputField
																inputClassName="bg-white"
																label={
																	<>
																		Lastname
																		<span className="text-danger ml-1">
																			*
																		</span>
																	</>
																}
																placeholder="Lastname"
																className="lg:col-span-4"
																error={
																	errors
																		?.mother_lastname
																		?.message
																}
                                                                defaultValue={patient?.mother_lastname}
																{...register(
																	"mother_lastname",
																	{
																		required:
																			"This field is required",
																	}
																)}
															/>
															<TextInputField
																inputClassName="bg-white"
																label={
																	<>
																		Firstname
																		<span className="text-danger ml-1">
																			*
																		</span>
																	</>
																}
																placeholder="Firstname"
																className="lg:col-span-4"
																error={
																	errors
																		?.mother_firstname
																		?.message
																}
                                                                defaultValue={patient?.mother_firstname}
																{...register(
																	"mother_firstname",
																	{
																		required:
																			"This field is required",
																	}
																)}
															/>
															<TextInputField
																inputClassName="bg-white"
																label="Middlename"
																placeholder="Middlename"
																className="lg:col-span-4"
                                                                defaultValue={patient?.mother_middlename}
																{...register(
																	"mother_middlename",
																	{
																		required: false,
																	}
																)}
															/>
														</div>
														{/* employers information */}
														<div className="grid grid-cols-1 border p-2 rounded-md bg-sky-50 lg:grid-cols-12 gap-4 col-span-12">
															<div className="col-span-12 text-md font-bold -mb-2 text-black">
																MEMBER'S EMPLOYER INFORMATION
															</div>
															<div className="lg:col-span-12 flex flex-col gap-2">
																<TextInputField
																inputClassName="bg-white"
																label={
																	<>
																		Philhealth Employers Number (PEN)
																	</>
																}
																placeholder="Philhealth Employers Number (PEN)"
																className="w-1/4"
                                                                defaultValue={patient?.employer_pen}
																{...register(
																	"employer_pen",
																	
																)}
																/>
																<TextInputField
																inputClassName="bg-white"
																label={
																	<>
																		Employer's Name
																	</>
																}
																placeholder="Employer's Name"
                                                                defaultValue={patient?.employer_name}
																{...register(
																	"employer_name",
																	
																)}
																/>
															</div>
															
														</div>
											</div>
                                        </div>
										
									</div>
								</div>
								<div className="px-4 py-2 flex items-center justify-center bg-slate-100 border-t">
									<ActionBtn
										// type="danger"
										loading={loading}
										className="ml-4 "
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

export default forwardRef(UpdatePatientDetailsModal)

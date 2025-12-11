import React, { forwardRef, Fragment, useImperativeHandle, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import ActionBtn from '../buttons/ActionBtn';
import { Dialog, Transition } from '@headlessui/react';
import TextInputField from '../inputs/TextInputField';
import { v4 as uuidv4 } from "uuid";
import PhilhealthMasterlistModal from './PhilhealthMasterlistModal';
import Axios from '../../libs/axios';
import { toast } from 'react-toastify';

const UpdateMemberModal = (props, ref) => {
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
    const phicMembersListRef = useRef(null);	
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
    const [members, setMembers] = useState([{
            id: uuidv4(),
            m_pin: "",
            m_lastname: "",
            m_firstname: "",
            m_middlename: "",
            m_suffix: "",
            m_birthday: "",
            m_gender: "",
            m_category: "",
            m_relationship: "",
        }])
        const [dependent, setDependent] = useState([{
            id: uuidv4(),
            philhealth: "",
            lastname: "",
            firstname: "",
            middle: "",
            suffix: "",
            birthday: "",
            gender: "",
            relation_desc: "",
        }])
    const handlePinClick = (data) => {
    setMembers((prev) => ({
        ...prev,
        m_pin: data?.mem_pin || '',
        m_lastname: data?.mem_lastname || '',
        m_firstname: data?.mem_firstname || '',
        m_middlename: data?.mem_middlename || '',
        m_suffix: data?.mem_suffix || '',
        m_birthday: data?.mem_birthday || '',
        m_gender: data?.mem_sex || '',
        m_category: data?.mem_categ_desc || '',
        m_relationship: data?.relation_desc || '',
    }));
    setDependent({
        philhealth: '',
        lastname: '',
        firstname: '',
        middle: '',
        suffix: '',
        gender: '',
        birthday: '',
    });
    };

    const handleDepPinClick = (data) => {
    setMembers((prev) => ({
        ...prev,
        m_pin: data?.mem_pin || '', // Use the dependent's `pen` value here
        m_lastname: data?.mem_lastname || '',
        m_firstname: data?.mem_firstname || '',
        m_middlename: data?.mem_middlename || '',
        m_suffix: data?.mem_suffix || '',
        m_birthday: data?.mem_birthday || '',
        m_gender: data?.mem_sex || '',
        m_category: data?.mem_categ_desc || '',
        m_relationship: data?.relation_desc || '',
    }));
    setDependent((prev) => ({
        ...prev,
        philhealth: data?.pen || '',
        lastname: data?.dep_lastname || '',
        firstname: data?.dep_firstname || '',
        middle: data?.dep_middlename || '',
        suffix: data?.dep_suffix || '',
        birthday: data?.dep_birthday || '',
        gender: data?.dep_sex || '',
        relationship: data?.relation_desc || '',
    }));
    };
    const submit = (data) => {
        setLoading(true);
        let formdata = new FormData();
        formdata.append("m_pin", members?.m_pin || " ");
		formdata.append("m_firstname", members?.m_firstname || " ");
		formdata.append("m_lastname", members?.m_lastname || " ");
		formdata.append("m_middlename", members?.m_middlename || " ");
		formdata.append("m_suffix", members?.m_suffix || " ");
		formdata.append("m_birthday", members?.m_birthday || " ");
		formdata.append("m_gender", members?.m_gender || " ");
		formdata.append("m_category", members?.m_category || " ");
		formdata.append("patient_relationship", data?.patient_relationship || " ");
        Axios.post(`v1/opd-standalone/update-member/${patient?.id}`, formdata, {})
            .then((res) => {
                // return resolve(res.data);
                setTimeout(() => {
                    toast.success("Update member details successfully!");
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
											Update Philhealth Member
										</span>
										<span className="text-sm font-light text-blue-900 ">
											Complete form to update the philhealth member
										</span>
									</div>
                                    <div className="px-4 pb-4">
                                        <div className="grid grid-col-1 lg:grid-cols-12 gap-4">
                                        <TextInputField
                                        label={
                                            <>
                                                Philhealth Identification No.(PIN)
                                                
                                            </>
                                        }
                                        placeholder="Pin..."
                                        className="lg:col-span-4"
                                        iconRight={"rr-search"}
                                        onIconRightClick={() => phicMembersListRef.current.show()}
                                        // error={
                                        // 	errors
                                        // 		?.philhealth
                                        // 		?.message
                                        // }
                                        value={dependent.philhealth || members.m_pin}
                                        {...register("philhealth")} 
                                        />
                                        <TextInputField
                                        label={
                                            <>
                                                Patient Type
                                            </>
                                        }
                                        placeholder="Member/Dependent..."
                                        className="lg:col-span-4"
                                        // error={
                                        // 	errors
                                        // 		?.patient_member_phic_type
                                        // 		?.message
                                        // }
                                         value={dependent.philhealth ? "Dependent" : "Member" }
                                           disabled
                                        {...register("patient_member_phic_type", { required: true })}
                                        />
                                        </div>
                                        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
                                            <div className="w-1/4 lg:col-span-12">
                                                    <TextInputField
                                                        label={
                                                            <>
                                                                Member Pin
                                                                
                                                            </>
                                                        }
                                                        placeholder="Member Pin"
                                                        className="lg:col-span-4"
                                                        value={members.m_pin}
                                                        disabled
                                                        onChange={(e) =>
                                                            setMembers((prev) => ({ ...prev, m_pin: e.target.value }))
                                                        }
                                                        {...register(
                                                            "m_pin",
                                                        )}
                                                    />
                                            </div>
                                            <>
                                                <TextInputField
                                                    label={
                                                        <>
                                                            Member's Lastname
                                                            
                                                        </>
                                                    }
                                                    placeholder="Member's  Lastname"
                                                    className="lg:col-span-4"
                                                    disabled
                                                    value={members.m_lastname}
                                                    onChange={(e) =>
                                                            setMembers((prev) => ({ ...prev, m_lastname: e.target.value }))
                                                        }
                                                    {...register(
                                                            "m_lastname",
                                                        )}
                                                />
                                                <TextInputField
                                                    label={
                                                        <>
                                                            Member's  Firstname
                                                            
                                                        </>
                                                    }
                                                    placeholder="Member's  Firstname"
                                                    className="lg:col-span-4"
                                                    disabled
                                                    value={members.m_firstname}
                                                    onChange={(e) =>
                                                            setMembers((prev) => ({ ...prev, m_firstname: e.target.value }))
                                                        }
                                                    {...register(
                                                            "m_firstname",
                                                        )}
                                                />
                                                <TextInputField
                                                    label="Member's  Middlename"
                                                    placeholder="Member's  Middlename"
                                                    className="lg:col-span-2"
                                                    disabled
                                                    value={members.m_middlename}
                                                    onChange={(e) =>
                                                            setMembers((prev) => ({ ...prev, m_middlename: e.target.value }))
                                                        }
                                                        {...register(
                                                            "m_middlename",
                                                        )}
                                                />
                                                <TextInputField
                                                    label="Member's  Suffix"
                                                    placeholder="Member's  Suffix"
                                                    className="lg:col-span-2"
                                                    disabled
                                                    value={members.m_suffix}
                                                    onChange={(e) =>
                                                            setMembers((prev) => ({ ...prev, m_suffix: e.target.value }))
                                                        }
                                                        {...register(
                                                            "m_suffix",
                                                        )}
                                                />
                                                <TextInputField
                                                    label={
                                                        <>
                                                            Gender
                                                        </>
                                                    }
                                                    placeholder="Gender"
                                                    className="lg:col-span-2"
                                                    disabled
                                                    value={members.m_gender || dependent.gender}
                                                    onChange={(e) =>
                                                            setMembers((prev) => ({ ...prev, m_gender: e.target.value }))
                                                        }
                                                    {...register(
                                                            "m_gender",
                                                        )}
                                                />
                                                <TextInputField
                                                    label={
                                                        <>
                                                            Member's Birthdate
                                                            
                                                        </>
                                                    }
                                                    className="lg:col-span-2"
                                                    type="date"
                                                    disabled
                                                    value={members.m_birthday}
                                                    onChange={(e) =>
                                                            setMembers((prev) => ({ ...prev, m_birthday: e.target.value }))
                                                        }
                                                        {...register(
                                                            "m_birthday",
                                                        )}
                                                />
                                            </>
                                            <TextInputField
                                                label={
                                                    <>
                                                        Member's Type
                                                        
                                                    </>
                                                }
                                                placeholder="Member's  Firstname"
                                                className="lg:col-span-8"
                                                disabled
                                                value={members.m_category}
                                                onChange={(e) =>
                                                        setMembers((prev) => ({ ...prev, m_category: e.target.value }))
                                                    }
                                                {...register(
                                                        "m_category",
                                                    )}
                                            />
                                            <TextInputField
                                                label={
                                                    <>
                                                        Relationship
                                                    </>
                                                }
                                                placeholder="Relationship to patient"
                                                className="lg:col-span-4"
                                                disabled
                                                value={members.m_relationship || dependent.relation_desc}
                                                onChange={(e) =>
                                                        setMembers((prev) => ({ ...prev, m_relationship: e.target.value }))
                                                    }
                                                {...register(
                                                        "patient_relationship",
                                                    )}
                                            />
                                                                                                    
                                                                                                            
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
                    <PhilhealthMasterlistModal 
                    // appointment={order}
                    ref={phicMembersListRef}
                    onPinClick={handlePinClick}
                    onDepPinClick={handleDepPinClick}
                    />
				</div>
			</Dialog>
		</Transition>
  )
}

export default forwardRef(UpdateMemberModal)

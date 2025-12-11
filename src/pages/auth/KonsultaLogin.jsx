import { Dialog, Transition } from '@headlessui/react';
import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useRef, useState } from 'react'
import FlatIcon from '../../components/FlatIcon';
import ActionBtn from '../../components/buttons/ActionBtn';
import Img from '../../components/Img';
import TextInputField from '../../components/inputs/TextInputField';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import Axios from '../../libs/axios';
import { toast } from 'react-toastify';

const KonsultaLogin = (props, ref) => {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate(); 
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);
    const submitBtnRef = useRef(null);
    const { user } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/',
    });
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
        useEffect(() => {
        if (user?.healthUnit) {
            const { name, accreditation_number, software_certificate, pmcc_number, cipher_key } = user.healthUnit;
            setValue('name', name || '');
            setValue('accreditation_number', accreditation_number || '');
            setValue('software_certificate', software_certificate || '');
            setValue('pmcc_number', pmcc_number || '');
            setValue('cipher_key', cipher_key || '');
        }
    }, [user?.healthUnit, setValue]);
        const submit = async (data) => {
            setLoading(true);
            try {
                const response = await Axios.post('/v1/diagnostic/konsulta-login', data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const result = await response.data;

                if (response.status === 200 && result.success) {
                    console.log('Success:', result);
                    toast.success('Login successful!');
                    // Redirect to the decrypted data page with necessary data
                     if (user?.type === 'GDIS-ADMIN') {
                            navigate('/ekonsulta-admin');
                        } else if (user?.type === 'GDIS-CASHIER') {
                            navigate('/ekonsulta-cashier');
                        }else {
                // Default navigation if type is neither NURSE nor CASHIER
                           return null;
                        }
                } else {
                    console.error('Error:', result);
                    toast.error(result.message || 'Login failed.');
                }
            } catch (error) {
                console.error('Unexpected Error:', error);
                toast.error('An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };
        console.log('users data', user)
  return (
     <Transition appear show={modalOpen} as={Fragment}>
            <Dialog
                as="div"
                className=""
                onClose={hide}
            >
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
                            <Dialog.Panel className="w-full lg:max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="div"
                                    className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-blue-100 border-b"
                                >
                                    <span className="text-xl font-bold text-blue-900">
                                        <span className="flex items-center text-blue-600 gap-2 text-lg -mb-[2px]">
                                            <FlatIcon
                                                icon="rr-network-cloud"
                                                className="text-base"
                                            />
                                            eKonsulta Server Login
                                        </span>
                                    </span>
                                    <span className="text-sm font-light text-blue-900 ">
                                        Login eKonsulta Server
                                    </span>
                                    <span
                                        className="bg-red-600 text-white h-8 w-8 rounded-full flex items-center justify-center right-4 absolute cursor-pointer hover:bg-red-800 duration-500"
                                        onClick={hide}
                                    >
                                        <FlatIcon icon="rr-cross-small" />
                                    </span>
                                </Dialog.Title>
                                    <div className="p-4  relative duration-200 flex flex-col items-center">
                                        <Img
                                            src={user?.avatar}
                                            type="user"
                                            name={user?.name}
                                            className="w-[144px] mb-2 !rounded-md"
                                        />
                                        <h5 className="flex gap-2 text-success font-bold text-xl uppercase mt-5 ">
                                            <FlatIcon icon="ss-user" /> {user?.name}
                                        </h5>
                                        <h5 className="text-gray-500 font-light uppercase mb-5 ">
                                            Enter Konsulta Credentials
                                        </h5>
                                        <form className="w-full" onSubmit={handleSubmit(submit)}>
                                            <TextInputField
                                                className="w-full mb-4"
                                                iconRight="rr-user"
                                                id="name"
                                                {...register('name', {
                                                    required: 'This field is required',
                                                })}
                                                error={errors?.name?.message}
                                            />
                                            <TextInputField
                                                className="w-full mb-6"
                                                iconRight="rr-hospital"
                                                type={showPasswords ? 'text' : 'password'}
                                                {...register('accreditation_number', {
                                                    required: 'This field is required',
                                                })}
                                                error={errors?.accreditation_number?.message}
                                            />
                                            <TextInputField
                                                className="w-full mb-6"
                                                iconRight="rr-badge"
                                                type={showPasswords ? 'text' : 'password'}
                                                {...register('software_certificate', {
                                                    required: 'This field is required',
                                                })}
                                                error={errors?.software_certificate?.message}
                                            />
                                            <TextInputField
                                                className="w-full mb-6"
                                                iconRight="rr-envelope"
                                                type={showPasswords ? 'text' : 'password'}
                                                {...register('pmcc_number', {
                                                    required: 'This field is required',
                                                })}
                                                error={errors?.pmcc_number?.message}
                                            />
                                            <TextInputField
                                                className="w-full mb-6"
                                                iconRight="rr-lock"
                                                type={showPasswords ? 'text' : 'password'}
                                                {...register('cipher_key', {
                                                    required: 'This field is required',
                                                })}
                                                error={errors?.cipher_key?.message}
                                            />
                                            <div className="flex justify-center items-center mb-6">
                                                <input
                                                    type="checkbox"
                                                    id="showPasswords"
                                                    className="mr-2"
                                                    checked={showPasswords}
                                                    onChange={() => setShowPasswords(!showPasswords)}
                                                />
                                                <label htmlFor="showPasswords" className="text-sm">
                                                    Show
                                                </label>
                                            </div>
                                            <ActionBtn
                                                buttonType="submit"
                                                type="primary-dark"
                                                className="w-1/2 mx-auto flex justify-center items-center"
                                                ref={submitBtnRef}
                                                loading={loading}
                                                onClick={handleSubmit(submit)}
                                            >
                                                Login
                                            </ActionBtn>
                                        </form>
                                    </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
  )
}

export default forwardRef(KonsultaLogin)

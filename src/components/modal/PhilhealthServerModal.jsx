/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react';
import FlatIcon from '../FlatIcon';
import ActionBtn from '../buttons/ActionBtn';
import { Dialog, Transition } from '@headlessui/react';
import Axios from '../../libs/axios';
import useNoBugUseEffect from '../../hooks/useNoBugUseEffect';

const PhilhealthServerModal = (props, ref) => {
    const { isOnline, testUrl} = props;
    const [mount, setMount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [testing, setTesting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [serverStatus, setServerStatus] = useState('unknown'); // online, offline, unknown

    useEffect(() => {
        let t = setTimeout(() => {
            setMount(1);
        }, 400);
        return () => {
            clearTimeout(t);
        };
    }, []);

    useNoBugUseEffect({
        functions: () => {
            if (!isOnline) {
                hide();
            }
        },
        params: [isOnline],
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

    const testServerConnection = async () => {
    setTesting(true); // Indicate testing in progress
    setServerStatus('unknown'); // Reset status initially

    try {
        const response = await Axios.post('/v1/opd-standalone/check-server-status', { url: testUrl });
        const { status } = response.data;

        setServerStatus(status); // Set status based on backend response
    } catch (error) {
        console.error('Error testing server connection:', error);
        setServerStatus('error'); // Fallback to error status
    } finally {
        setTesting(false); // Reset testing state
    }
};




console.log("Testing URL:", testUrl);
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
                                            eKonsulta Server Status
                                        </span>
                                    </span>
                                    <span className="text-sm font-light text-blue-900 ">
                                        Check the server connection status
                                    </span>
                                    <span
                                        className="bg-red-600 text-white h-8 w-8 rounded-full flex items-center justify-center right-4 absolute cursor-pointer hover:bg-red-800 duration-500"
                                        onClick={hide}
                                    >
                                        <FlatIcon icon="rr-cross-small" />
                                    </span>
                                </Dialog.Title>
                                <div className="pb-20 px-14 pt-16 flex flex-col gap-y-6 relative duration-200">
                                    <ActionBtn
                                        size="xl"
                                        type={testing ? 'primary-dark' : 'primary'}
                                        className="!rounded-3xl relative"
                                        onClick={testServerConnection}
                                    >
                                        {testing ? (
                                            <span className="flex items-center animate-pulse gap-2">
                                                <span className="animate-spin flex items-center justify-center text-xl">
                                                    <FlatIcon
                                                        icon="sr-loading"
                                                        className="animate-pulse text-xl"
                                                    />
                                                </span>
                                                Testing Server Connection...
                                            </span>
                                        ) : (
                                            <span>
                                                Test Server Connection
                                            </span>
                                        )}
                                    </ActionBtn>
                                    <div className="text-center font-light tracking-wide">
                                        <span className={`text-2xl animate-pulse ${
                                            serverStatus === 'online' ? 'text-green-600' : 
                                            serverStatus === 'offline' ? 'text-red-600' : 
                                            serverStatus === 'timeout' ? 'text-orange-600' : 
                                            serverStatus === 'error' ? 'text-red-700' : 
                                            'text-gray-600'
                                        }`}>
                                            {serverStatus === 'online' && "Server is now online."}
                                            {serverStatus === 'offline' && "Server is offline. Please check your connection or server address."}
                                            {serverStatus === 'timeout' && "Server request timed out. Please try again later."}
                                            {serverStatus === 'error' && "Server responded with an error. Please contact support."}
                                            {serverStatus === 'unknown' && "Server status unknown."}
                                        </span>
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

export default forwardRef(PhilhealthServerModal);
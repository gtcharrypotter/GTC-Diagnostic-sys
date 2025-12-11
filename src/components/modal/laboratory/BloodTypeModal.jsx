/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */

import { Fragment, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import useClinic from '../../../hooks/useClinic';
import Axios from '../../../libs/axios';
import { toast } from 'react-toastify';
import ActionBtn from '../../buttons/ActionBtn';
import FileInput from '../../inputs/FileInput';
import FlatIcon from '../../FlatIcon';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';

const Modal = (props, ref) => {
    const {
        register,
        // getValues,
        watch,
        handleSubmit,
        formState: {errors},
    } = useForm();
     const {title, children, size = "modal-md", onSuccessCallBack} = props;
    const {getDoctors} = useClinic();
    const [mount, setMount] = useState(0);
    const [patient, setPatient] = useState(null);
    const [doctor, setDoctors] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [bloodtype_image, setBloodImage] = useState("");

    useEffect (() => {
        let t = setTimeout (() => {
            setMount(1);
        }, 400);
        return () => {
            clearTimeout(t);
        };
    }, []);

    useEffect(() => {}, []);

    useImperativeHandle(ref, () => ({
        show: show,
        hide: hide,
    }));

    const show = (data) => {
        if (data) {
            setPatient(data);
        }
        getDoctors().then((res) => {
            setDoctors(res.data.data);
        });
        setModalOpen(true);
    };
    const hide = () => {
        setModalOpen(false);
    };
     const submit = (data) => {
         let formData = new FormData();

         formData.append('doctor_id', data?.doctor_id);
         formData.append('patient_id', patient?.id);
        formData.append('bloodtype', data?.bloodtype);
         formData.append('bloodtype_image', data?.bloodtype_image);
         formData.append('bloodtype_remarks', data?.bloodtype_remarks);

         Axios.post(`v1/laboratory/bloodtype`, formData).then((res) => {
             toast.success('Blood Typing Exam created success!');
             onSuccessCallBack();
             hide();
         });
     };

  return (
    <Transition appear show={modalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={hide}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex max-h-auto item-center justify-center p-4 text-center">
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full lg:max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                    as="div"
                                    className="p-4 font-medium leading-6 flex items-center text-gray-900"
                            >
                                <span className="text-lg">
                                    Blood Typing Test
                                </span>
                                <span
										className="absolute right-4 flex items-center justify-center w-8 h-8 rounded-full bg-red-50 hover:bg-red-200 duration-200 cursor-pointer text-red-600"
										onClick={hide}
									>
										<FlatIcon
											icon="rr-cross-small"
											className="text-lg"
										/>
									</span>
                            </Dialog.Title>
                            
      <div className="px-4 flex flex-col gap-y-4">
        <div className="flex flex-col lg:flex-row gap-4">

        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
    <h2 className="text-2xl font-bold mb-4">Choose a Blood Type:</h2>

    <div className="grid grid-cols-7 gap-2">
      <button className="bg-red-500 text-white p-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 hold">
        O
      </button>
      <button className="bg-red-500 text-white p-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300 hold"
    //   onChange={(e) => {
    //     set
    //   }}
      >
        A+
      </button>
      <button className="bg-red-500 text-white p-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 hold">
        B+
      </button>
      <button className="bg-red-500 text-white p-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300 hold">
        A-
      </button>
      <button className="bg-red-500 text-white p-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300 hold">
        B-
      </button>
      <button className="bg-red-500 text-white p-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300 hold">
        AB+
      </button>
      <button className="bg-red-500 text-white p-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300 hold">
        AB-
      </button>
    </div>
  </div> 
      </div>  
      </div>

    <FileInput 
    onChange = {(data) => {
        setBloodImage(data.target.value)

    }}
    ></FileInput>

        <div className="p-4 flex items-center justify-end">
			<ActionBtn
				className="ml-auto"
				onClick={handleSubmit(submit)}
			>
				Submit
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

export default forwardRef(Modal);

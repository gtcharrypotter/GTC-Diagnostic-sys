/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import { Dialog, Transition } from '@headlessui/react';
import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useState, useMemo } from 'react'
import ActionBtn from '../../buttons/ActionBtn';
import FlatIcon from '../../FlatIcon';
import TextInputField from '../../inputs/TextInputField';
import { toast } from 'react-toastify';
import Axios from '../../../libs/axios';
import { dateYYYYMMDD } from '../../../libs/helpers';
import { v4 as uuidv4 } from "uuid";
import { useForm } from 'react-hook-form';

const uniq_id = uuidv4();

const CreateTargetedServicesModal = (props, ref) => {
  const { patient, onSuccess } = props;
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [modalOpen, setModalOpen] = useState(false);
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [filteredTests, setFilteredTests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({ show, hide }));

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      return age - 1;
    }
    return age;
  };

  const age = calculateAge(patient?.birthday);

  const filterTestsBasedOnAge = (age) => {
    switch (true) {
      case age <= 1:
        return ['COMPLETE BLOOD COUNT (CBC)'];
      case age >= 2 && age <= 4:
        return ['COMPLETE BLOOD COUNT (CBC)', 'FECALYSIS', 'URINALYSIS'];
      case age >= 5 && age <= 9:
        return ['COMPLETE BLOOD COUNT (CBC)', 'FECALYSIS', 'URINALYSIS', 'PDD test'];
      case age >= 10 && age <= 19:
        return ['COMPLETE BLOOD COUNT (CBC)', 'FECALYSIS', 'URINALYSIS', 'PAP SMEAR', 'CHEST AP + PORTABLE FEE'];
      case age >= 20:
        return ['COMPLETE BLOOD COUNT (CBC)', 'FECALYSIS', 'URINALYSIS', 'PAP SMEAR', 'CHEST AP + PORTABLE FEE', 'CHEST APL + PORTABLE FEE', 'SPUTUM AFB STAIN (2x)', 'ORAL GLUCOSE TOLERANCE TEST (OGTT)', 'ECG', 'LIPID PROFILE', 'GLUCOSE- FBS', 'GLUCOSE- RBS', 'CREATININE', 'FOBT'];
      default:
        return [];
    }
  };

  const allowedTests = useMemo(() => filterTestsBasedOnAge(age), [age]);

  const show = (data, appointmentData, type = null) => {
    getLaboratoryTests(type);
    setTimeout(() => {
      if (appointmentData?.id) {
        setValue("appointment_id", appointmentData?.id);
      }
      setValue("order_date", dateYYYYMMDD());
    }, 200);
    setModalOpen(true);
  };

  const hide = () => {
    setModalOpen(false);
    reset();
    setSelectedTest(null);
  };

  const getLaboratoryTests = (type) => {
    setLoading(true);
    Axios.get(`/v1/laboratory/tests/list?type=${type || ''}`)
      .then((res) => {
        const filtered = res.data.data.filter(test => allowedTests.includes(test.name));
        setTests(filtered);
        setFilteredTests(filtered);
      })
      .catch((error) => {
        console.error("Failed to fetch laboratory tests", error);
      })
      .finally(() => setLoading(false));
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = tests.filter((test) => test.name.toLowerCase().includes(query));
    setFilteredTests(filtered);
  };

  const submit = (data) => {
    let formData = new FormData();
    formData.append("laboratory_test_type", selectedTest?.id);
    formData.append("order_date", data?.order_date);
    formData.append("patient_id", patient?.id);
    formData.append("appointment_id", data?.appointment_id);

    Axios.post(`v1/doctor/laboratory-order/store`, formData).then((res) => {
      reset();
      toast.success("Order created successfully!");
      onSuccess();
      hide();
    });
  };

  return (
    <Transition appear show={modalOpen} as={Fragment}>
      <Dialog as="div" className="" onClose={() => {}}>
        <div className="fixed inset-0 z-[300] bg-black bg-opacity-25" />
        <div className="fixed inset-0 overflow-y-auto z-[350]">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-full max-w-3xl border border-blue-200 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
              <Dialog.Title className="p-3 font-medium leading-6 flex justify-between items-center text-gray-900 bg-slate-50 border-b">
                <span className="text-xl font-bold">Add Targeted Services Order</span>
                <ActionBtn type="danger" size="sm" onClick={hide}>
                  <FlatIcon icon="br-cross-small" /> Close
                </ActionBtn>
              </Dialog.Title>
              <form onSubmit={handleSubmit(submit)} className="p-4">
                <div className="flex gap-2 mb-4">
                  <TextInputField
                    label="Select Date"
                    type="date"
                    error={errors?.order_date?.message}
                    {...register("order_date", { required: "This field is required" })}
                  />
                  <TextInputField
                    label="Search Tests"
                    placeholder="Search tests..."
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                <div className="overflow-auto border px-2 bg-gray-200 py-2 shadow-inner h-[400px]">
                  {loading ? (
                    <div className="flex justify-center items-center h-full">
                      <span className="text-lg font-medium">Loading....</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {filteredTests.map((test) => (
                        <div
                          key={test.id}
                          className={`p-3 bg-white border shadow-md rounded cursor-pointer ${selectedTest?.id === test.id ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}
                          onClick={() => setSelectedTest(test)}
                        >
                          <h2 className="text-xs font-semibold text-center">{test.name}</h2>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end mt-4">
                  <ActionBtn type="primary" disabled={!selectedTest}>
                    Submit Order
                  </ActionBtn>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default forwardRef(CreateTargetedServicesModal);
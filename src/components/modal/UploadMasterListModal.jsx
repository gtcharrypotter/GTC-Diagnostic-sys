import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useRef, useState } from 'react'
import useDataTable from '../../hooks/useDataTable';
import Pagination from '../table/Pagination';
import UploadPhilhealthMasterlistModal from './UploadPhilhealthMasterlistModal';
import { Dialog, Transition } from '@headlessui/react';
import TextInput from '../inputs/TextInput';
import FlatIcon from '../FlatIcon';
import ActionBtn from '../buttons/ActionBtn';
import DatabaseTable from '../table/DatabaseTable';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../libs/helpers';

const UploadMasterListModal = (props, ref) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const masterlistUploadRef = useRef(null);
    const [patientType, setPatientType] = useState("");
    const { user } = useAuth();
    const {
    page,
    setPage,
    meta,
    loading,
    paginate,
    setPaginate,
    data,
    setFilters,
  } = useDataTable({
    url: `/v1/patients`,
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
        if (searchInput.trim() !== "") {
            const foundPatient = data.find(patient => patient.philhealth === searchInput);
            if (foundPatient) {
                setPatientType(foundPatient.patient_member_phic_type === 'Member' ? "Patient is a Member" : "Patient is a Dependent");
            } else {
                setPatientType("Patient not found");
            }
        } else {
            setPatientType("");
        }
    }, [searchInput, data]);
    const downloadXML = () => {
        const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
        const xmlContent = data.map(patient => `
            <Patient>
                <pHciTransNo>${patient.transaction_no || ''}</pHciTransNo>
                <pHciCaseNo>${patient.case_no || ''}</pHciCaseNo>
                <pEffYear>${patient.effective_year || ''}</pEffYear>
                <pEnlistStat>${patient.enlistment_stat || ''}</pEnlistStat>
                <pEnlistDate>${patient.enlistment_date || ''}</pEnlistDate>
                <pPackageType>${patient.package_type || ''}</pPackageType>
                <pMemPin>${patient.m_pin || ''}</pMemPin>
                <pMemFname>${patient.m_firstname || ''}</pMemFname>
                <pMemMname>${patient.m_middlename || ''}</pMemMname>
                <pMemLname>${patient.m_lastname || ''}</pMemLname>
                <pMemExtname>${patient.m_suffix || ''}</pMemExtname>
                <pMemDob>${patient.m_birthday || ''}</pMemDob>
                <pPatientPin>${patient.philhealth || ''}</pPatientPin>
                <pPatientFname>${patient.firstname || ''}</pPatientFname>
                <pPatientMname>${patient.middle || ''}</pPatientMname>
                <pPatientLname>${patient.lastname || ''}</pPatientLname>
                <pPatientExtname>${patient.suffix || ''}</pPatientExtname>
                <pPatientSex>${patient.gender || ''}</pPatientSex>
                <pPatientDob>${patient.birthday || ''}</pPatientDob>
                <pPatientType>${patient.patient_member_phic_type || ''}</pPatientType>
                <pPatientMobileNo>${patient.mobile || ''}</pPatientMobileNo>
                <pWithConsent>${patient.consent || ''}</pWithConsent>
                <pTransDate>${patient.created_at || ''}</pTransDate>
                <pCreatedBy>${patient.created_by || ''}</pCreatedBy>
                <pHciAccreNo>${patient.mem_categ_desc || ''}</pHciAccreNo>
            </Patient>
        `).join("\n");

        const xmlFinal = `${xmlHeader}<Patients>\n${xmlContent}\n</Patients>`;
        const blob = new Blob([xmlFinal], { type: "application/xml" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "masterlist.xml";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    console.log('data of hci', data);
  return (
    <Transition appear show={modalOpen} as={Fragment}>
      <Dialog as="div" onClose={hide}>
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
              <Dialog.Panel className="w-full  transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all">
                 <Dialog.Title
                  as="div"
                  className="bg-green-700 py-3 px-4 flex flex-col border-b-8 border-yellow-400"
                >
                  <span className="text-xl font-bold text-white">UPLOADED REGISTRATION MASTERLIST</span>
                  <span className="text-sm font-light text-white">Check member/dependent registration</span>
                  <span
                    className="bg-red-600 text-white h-8 px-4 gap-2 rounded-lg flex items-center justify-center right-4 absolute cursor-pointer hover:bg-red-800 duration-500"
                    onClick={hide}
                  >
                    <FlatIcon icon="rr-cross" />
                  </span>
                </Dialog.Title>
              
                  <div className="p-5 text-lg">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="">
                         <TextInput
                        label="Philhealth Identification No.(PIN)"
                        iconLeft={"rr-search"}
                        placeholder="Search patient..."
                        onChange={(e) => {
                          const keyword = e.target.value;
                          setSearchInput(keyword); // Update search input state
                          setFilters((prevFilters) => ({
                            ...prevFilters,
                            keyword,
                          }));
                        }}
                      />
                      <span>{patientType}</span>
                        </div>
                      
                        <div className="flex flex-col gap-2 ml-auto">
                           {/* <ActionBtn
                            type="secondary"
                            title="Download XML"
                            className="!rounded-full"
                            onClick={downloadXML}
                        >
                            <FlatIcon icon="rr-download" className="text-xl" />
                            Download
                      </ActionBtn> */}
                        <ActionBtn
                        type="primary"
                        title="Upload Masterlist"
                        className="!rounded-full "
                        onClick={() => {
                          masterlistUploadRef.current.show();
                        }}
                      >
                        <FlatIcon
                          icon="rr-upload"
                          className="text-xl"
                        />
                        Upload
                      </ActionBtn>
                     
                        </div>
                      
                    </div>

                  
                   
                      <DatabaseTable
                        className={`pb-2`}
                        loading={loading}
                        columns={[
                          {
                            header: "No.",
                            className: "w-[200px] text-left",
                            tdClassName: "text-left",
                            key: "id",
                         
                          },
                          {
                            header: "pHciTransNo",
                            className: "w-[200px] text-left",
                            tdClassName: "text-left",
                            key: "transaction_no",
                         
                          },
                          {
                            header: "pHciCaseNo",
                            className: "w-[200px] text-left",
                            tdClassName: "text-left",
                            key: "case_no",
                          },
                          {
                            header: "pEffYear",
                            className: "w-[200px] text-left",
                            tdClassName: "text-left",
                            key: "effective_year",
                          },
                          {
                            header: "pEnlistStat",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "enlistment_stat",
                          },
                          {
                            header: "pEnlistDate",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "enlistment_date",
                          },
                          {
                            header: "pPackageType",
                            className: "w-[100px] text-center",
                            tdClassName: "text-center",
                            key: "package_type",
                          },
                          {
                            header: "pMemPin",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "m_pin",
                          },
                          {
                            header: "pMemFname",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "m_firstname",
                          },
                          {
                            header: "pMemMname",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "m_middlename",
                          },
                          {
                            header: "pMemLname",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "m_lastname",
                          },
                          {
                            header: "pMemExtname",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "m_suffix",
                          },
                          {
                            header: "pMemDob",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "m_birthday",
                          },
                          {
                            header: "pPatientPin",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "philhealth",
                          },
                          {
                            header: "pPatientFname",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "firstname",
                          },
                          {
                            header: "pPatientMname",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "middle",
                          },
                          {
                            header: "pPatientLname",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "lastname",
                          },

                          {
                            header: "pPatientExtname",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "suffix",
                          },
                          {
                            header: "pPatientSex",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "gender",
                          },
                          {
                            header: "pPatientDob",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "birthday",
                          },
                          {
                            header: "pPatientType",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "patient_member_phic_type",
                            cell: (data) => {
                              return data?.patient_member_phic_type === "Member" ? "MM" : "" || data?.patient_member_phic_type === 'Dependent' ?  "DD" : " ";
                            },
                          },
                          {
                            header: "pPatientMobileNo",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "mobile",
                          },
                          {
                            header: "pWithConsent",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "consent",
                          },
                          {
                            header: "pTransDate",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "enlistment_date",
                            
                          },
                          {
                            header: "pCreatedBy",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "createdBy",
                            cell: (data) => {
                              return (
                                <div className="flex flex-col">
                                  <span className="uppercase text-slate-800 font-[500] flex items-center ">
                                  {data?.createdBy?.firstname} {data?.createdBy?.lastname}
                                  </span>
                                </div>
                              );
                            },
                          },
                          {
                            header: "pReportStatus",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            // key: "mem_categ_desc",
                          },
                          {
                            header: "pHciAccreNo",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "accreditation_no",
                            cell: (data) => {
                              return (
                                <div className="flex flex-col">
                                  <span className="text-slate-800 font-[500] flex items-center ">
                                  {user?.healthUnit?.accreditation_number}
                                  </span>
                                </div>
                              );
                            },
                          },
                          

                        ]}
                        data={data}
                      />
                    <div className="flex justify-center items-center mt-4">
                      <Pagination
                        page={page}
                        setPage={setPage}
                        pageCount={meta?.last_page}
                        pageSize={paginate}
                        setPageSize={setPaginate}
                      />
                    </div>
                  </div>
                
              </Dialog.Panel>
            </Transition.Child>
          </div>
          <UploadPhilhealthMasterlistModal ref={masterlistUploadRef} />
        </div>
      </Dialog>
    </Transition>
  )
}

export default forwardRef(UploadMasterListModal)
import React, {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import useDataTable from "../../hooks/useDataTable";
import { Dialog, Transition } from "@headlessui/react";
import Table from "../table/Table";
import Pagination from "../table/Pagination";
import ActionBtn from "../buttons/ActionBtn";
import FlatIcon from "../FlatIcon";
import UploadPhilhealthMasterlistModal from "./UploadPhilhealthMasterlistModal";
import TextInput from "../inputs/TextInput";
import useNoBugUseEffect from "../../hooks/useNoBugUseEffect";
import { formatDate, formatDateMMDDYYYYHHIIA } from "../../libs/helpers";

const uniq_id = uuidv4();
const PhilhealthMasterlistModal = (props, ref) => {
  const { mutateAll, pendingOrdersRef, patient, onPinClick, onDepPinClick } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [view, setView] = useState("members"); // Toggle between members and dependents
  const [searchInput, setSearchInput] = useState(""); // Track search input
  const masterlistUploadRef = useRef(null);
  const [validationResult, setValidationResult] = useState(null);
  const currentYear = new Date().getFullYear();
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
    url: `v1/opd-standalone/konsulta-phic-masterlist`,
    defaultFilters: {
			year_registered: currentYear,
		},
  });

  useNoBugUseEffect(() => {
    setPaginate(5);
  }, []);
  
  useImperativeHandle(ref, () => ({
    show: show,
    hide: hide,
  }));

  const show = () => {
    setModalOpen(true);
    setFilters((prev) => ({
    ...prev,
    year_registered: currentYear,  // <-- REAPPLY FILTER ON OPEN
  }));
  };

  const hide = () => {
    setModalOpen(false);
  };

  // Update view state dynamically based on the search term
  useNoBugUseEffect(() => {
  const input = searchInput.toLowerCase();

  if (input.includes("pin")) {
    setView("members");
    setValidationResult("member");
  } else if (input.includes("pen")) {
    setView("dependents");
    setValidationResult("dependent");
  } else {
    setValidationResult("none");
  }
}, [searchInput]);

  const renderPinCell = (row) => (
    <span
      className="text-blue-700 flex items-center justify-center cursor-pointer hover:bg-slate-200 py-2 px-4 rounded-lg gap-1"
      onClick={() => {
        onPinClick && onPinClick(row);
        hide();
      }}
    >
      {row?.mem_pin || "N/A"}
    </span>
  );

  const renderDepPinCell = (row) => (
    <span
      className="text-blue-700 flex items-center justify-center cursor-pointer hover:bg-slate-200 py-2 px-4 rounded-lg gap-1"
      onClick={() => {
        onDepPinClick && onDepPinClick(row);
        hide();
      }}
    >
      {row?.pen || "N/A"}
    </span>
  );

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
              <Dialog.Panel className="w-full lg:max-w-7xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all">
                 <Dialog.Title
                  as="div"
                  className="bg-green-700 py-3 px-4 flex flex-col border-b-8 border-yellow-400"
                >
                  <span className="text-xl font-bold text-white">MASTERLIST CHECK</span>
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
                      <TextInput
                        label="Philhealth Identification No. (PIN)"
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
                     {validationResult && (
                      <div className="text-sm mt-1 ml-1">
                        {validationResult === "member" && (
                          <span className="text-green-700">✔ Member: Yes</span>
                        )}
                        {validationResult === "dependent" && (
                          <span className="text-green-700">✔ Dependent: Yes</span>
                        )}
                        {validationResult === "none" && (
                          <span className="text-red-600">✘ Not a dependent</span>
                        )}
                      </div>
                    )}
                    </div>

                  
                    <div className="flex gap-2 mb-2">
                    <ActionBtn
                      type="foreground"
                      className={`px-2 py-1 rounded text-sm ${
                      view === "members" ? " text-black" : " text-black"
                      }`}
                      onClick={() => setView("members")}
                    >
                      Members
                    </ActionBtn>
                    <ActionBtn
                      type="foreground"
                      className={`px-2 py-1 rounded text-sm ${
                      view === "dependents" ? " text-black" : " text-black"
                      }`}
                      onClick={() => setView("dependents")}
                    >
                      Dependents
                    </ActionBtn>
                    </div>
                    
                    {view === "members" && (
                      <Table
                        className={`pb-2`}
                        loading={loading}
                        columns={[
                          {
                            header: "MEMBER'S PIN",
                            className: "w-[50px] text-left",
                            tdClassName: "text-left",
                            key: "mem_pin",
                            cell: renderPinCell,
                          },
                          {
                            header: "Firstname",
                            className: "w-[200px] text-left",
                            tdClassName: "text-left",
                            key: "mem_firstname",
                          },
                          {
                            header: "Middlename",
                            className: "w-[200px] text-left",
                            tdClassName: "text-left",
                            key: "mem_middlename",
                          },
                          {
                            header: "Lastname",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "mem_lastname",
                          },
                          {
                            header: "Birthday",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "mem_birthday",
                          },
                          {
                            header: "Gender",
                            className: "w-[100px] text-center",
                            tdClassName: "text-center",
                            key: "mem_sex",
                          },
                          {
                            header: "Category",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "pin_type",
                          },
                          {
                            header: "Effective Year ",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "date_registered",
                            cell: (data) => {
                              const date = new Date(data?.date_registered);
                              return date.getFullYear(); // <-- only the year
                            },
                          },
                        ]}
                        data={data}
                      />
                    )}
                    {view === "dependents" && (
                      <Table
                        className={`pb-2`}
                        loading={loading}
                        columns={[
                          {
                            header: "DEPENDENT PIN",
                            className: "w-[200px] text-left",
                            tdClassName: "text-left",
                            key: "pen",
                            cell: renderDepPinCell,
                          },
                          {
                            header: "Firstname",
                            className: "w-[200px] text-left",
                            tdClassName: "text-left",
                            key: "dep_firstname",
                          },
                          {
                            header: "Middlename",
                            className: "w-[200px] text-left",
                            tdClassName: "text-left",
                            key: "dep_middlename",
                          },
                          {
                            header: "Lastname",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "dep_lastname",
                          },
                          {
                            header: "Birthday",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "dep_birthday",
                          },
                          {
                            header: "Gender",
                            className: "w-[100px] text-center",
                            tdClassName: "text-center",
                            key: "dep_sex",
                          },
                          {
                            header: "Category",
                            className: "w-[200px] text-center",
                            tdClassName: "text-center",
                            key: "pen_type",
                          },
                          {
                            header: "Relationship",
                            className: "w-[100px] text-center",
                            tdClassName: "text-center",
                            key: "relation_desc",
                          },
                        ]}
                        data={data}
                      />
                    )}

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
  );
};

export default forwardRef(PhilhealthMasterlistModal);

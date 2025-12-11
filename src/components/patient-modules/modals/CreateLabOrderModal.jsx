/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import {
	Fragment,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
	dateToday,
	dateYYYYMMDD,
	formatDateMMDDYYYY,
	formatDateYYYYMMDD,
	patientFullName,
} from "../../../libs/helpers";
import ActionBtn from "../../buttons/ActionBtn";
import Axios from "../../../libs/axios";
import TextInputField from "../../inputs/TextInputField";
import ReactSelectInputField from "../../inputs/ReactSelectInputField";
import useNoBugUseEffect from "../../../hooks/useNoBugUseEffect";
import FlatIcon from "../../FlatIcon";
import useDataTable from "../../../hooks/useDataTable";
import { v4 as uuidv4 } from "uuid";
import DiagnosticReferralModal from "../../modal/DiagnosticReferralModal";
const uniq_id = uuidv4();

const CreateLabOrderModal = (props, ref) => {
	const { patient, onSuccess } = props;
	const {
	  register,
	  getValues,
	  watch,
	  control,
	  setValue,
	  reset,
	  handleSubmit,
	  formState: { errors },
	} = useForm();
	const {
	  page,
	  reloadData,
	  setPage,
	  meta,
	  setMeta,
	  loading,
	  setLoading,
	  paginate,
	  setPaginate,
	  data,
	  setData,
	  column,
	  setColumn,
	  direction,
	  setDirection,
	  filters,
	  setFilters,
	} = useDataTable({
	  url: `v1/laboratory/tests/list`,
	  defaultFilters: {
		key: uniq_id,
	  },
	});
	const [showData, setShowData] = useState(null);
	const [labType, setLabType] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [tests, setTests] = useState([]);
	const [selectedTest, setSelectedTest] = useState([]); // Add state for selected test
	const [filteredTests, setFilteredTests] = useState([])
	const [searchQuery, setSearchQuery] = useState("");
	const [isGridView, setIsGridView] = useState(true);
	const [full, setFull] = useState(false);
	const [selectionCounts, setSelectionCounts] = useState({});
	const [recentTest, setRecentTest] = useState(null);
	const diagnosticReferRef = useRef();
	useImperativeHandle(ref, () => ({
	  show: show,
	  hide: hide,
	}));
	
	const show = (data, appointmentData, type = null) => {
	  setFull(false);
	  setLabType(type);
	  getLaboratoryTests(type);
	  setShowData(data);
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
	  reset({
		laboratory_test_type: "",
		// notes: "",
		order_date: "",
		patient_id: "",
		appointment_id: "",
	  });
	  setSelectedTest(null); // Reset selected test
	};
	useEffect(() => {
		// Load frequently selected or recent test from localStorage on mount
		const storedCounts = JSON.parse(localStorage.getItem("selectionCounts")) || {};
		const lastSelected = JSON.parse(localStorage.getItem("recentTest")) || null;
		setSelectionCounts(storedCounts);
		setRecentTest(lastSelected);
	}, []);
	
	useEffect(() => {
		// Update selection counts in localStorage
		localStorage.setItem("selectionCounts", JSON.stringify(selectionCounts));
	}, [selectionCounts]);
	
	useEffect(() => {
		// Automatically select the most frequent or recent test in the filtered list when in Grid view
		if (isGridView && filteredTests.length > 0) {
			let testToSelect = null;
	
			// 1. If recentTest exists and is part of the filteredTests, select it
			if (recentTest && filteredTests.some(test => test.id === recentTest.id)) {
				testToSelect = recentTest;
			}
	
			// 2. If no recentTest or it's not in the current filtered list, select the most frequent one
			if (!testToSelect) {
				testToSelect = filteredTests.reduce((prev, curr) => {
					const prevCount = selectionCounts[prev.id] || 12;
					const currCount = selectionCounts[curr.id] || 10;
					return currCount > prevCount ? curr : prev;
				}, filteredTests[0]);
			}
	
			// Automatically select the determined test
			setSelectedTest(testToSelect);
		}
	}, [filteredTests, isGridView, recentTest, selectionCounts]);


	const getLaboratoryTests = (type) => {
		// Set loading to true before starting the request
		setLoading(true);
		
		Axios.get(`/v1/laboratory/tests/list?type=${type}`)
		  .then((res) => {
			setTests(res.data.data);
			setFilteredTests(res.data.data); // Initialize filtered tests
		  })
		  .catch((error) => {
			console.error("Failed to fetch laboratory tests", error);
		  })
		  .finally(() => {
			// Set loading to false after the request is finished
			setLoading(false);
		  });
	  };
	const handleSearch = (e) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);
		const filtered = tests.filter((test) =>
		  test.name.toLowerCase().includes(query)
		);
		setFilteredTests(filtered); // Update filtered tests based on search query
	  };
	const noHide = () => {};

	const submit = (data) => {
		let formData = new FormData();
		// formData.append("_method", "PATCH");
		formData.append("laboratory_test_type", selectedTest?.id);
		// formData.append("notes", data?.notes);
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
			<div className="fixed inset-0  z-[300]" />
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
		
				<Dialog.Panel className={`w-full lg:max-w-3xl border  border-blue-200 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all`}>
				  <Dialog.Title
					as="div"
					className=" p-3 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
				  >
					<div className="flex gap-4 items-end">
					<span className="text-xl text-center font-bold  text-gray-700">
					  {/* Add{" "} */}
					  {labType == "imaging" ? "Imaging" : "Laboratory"} Order Request
					</span>
					
					</div>
					<ActionBtn
					  type="danger"
					  size="sm"
					  className="absolute top-4 right-4 "
					  onClick={hide}
					>
					  <FlatIcon icon="br-cross-small" /> Close
					</ActionBtn>
				  </Dialog.Title>

			<div className="p-3 flex flex-col">
				<div className="flex p-2 gap-2 items-center">
					
					<TextInputField
					  label="Select Date"
					  type="date"
					  error={errors?.order_date?.message}
					  placeholder="Enter order date"
					  {...register("order_date", {
						required: {
						  value: true,
						  message: "This field is required",
						},
					  })}
					/>
                    <TextInputField
                      label="Search Tests"
                      placeholder="Search tests..."
                      value={searchQuery}
                      onChange={handleSearch}

                    />
					
				</div>
				  
				<div className="overflow-auto border px-2 bg-gray-200 py-2 shadow-inner h-[500px]">
						{loading ? (
							<div className="p-5 flex items-center justify-center w-full">
							<h2 className="text-2xl font-bold animate-pulse flex items-center mt-[120px] gap-2">
								<l-cardio
								size="45"
								stroke="4"
								speed="0.90"
								color="black"
								></l-cardio>
							</h2>
							</div>
						) : 
							isGridView ? (
							<div className="grid grid-cols-4 gap-2 ">
								{filteredTests.map((test) => (
								<div
									key={test.id}
									className={`p-3 bg-white border shadow-xl gap-2 flex flex-col justify-center items-center rounded cursor-pointer ${
									selectedTest?.id === test.id
										? "border-blue-500 !bg-blue-100"
										: "border-gray-300"
									}`}
									onClick={() => setSelectedTest(test)}
								>
									<h1 className="text-xs font-bold">{test.name}</h1>
									<p className="text-xs text-green-700">
									{/* Price: <b>₱{test.lab_rate}</b> */}
									</p>
								</div>
								))}
							</div>
										) : (
                 ""
                )}

              </div>

					
				  </div>
				  <div className="px-4 py-4 border-t flex items-center justify-end  bg-slate-">
					<ActionBtn
					type="danger"
					className="mr-auto px-5"
					disabled={!selectedTest}
					onClick={handleSubmit((formData) => {
						diagnosticReferRef.current.show({
						...formData,
						patient,
						selectedTest, 
						});
					})}
					>
					REFER TO
					</ActionBtn>
					<ActionBtn
					  // size="lg"
					  
					  type="primary"
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
		  <DiagnosticReferralModal 
			ref={diagnosticReferRef}
			patient={patient} 
			onSubmit={(data) => {
					submit(data);
				}}/>
		</Dialog>
		
	  </Transition>
	  
	);
};

export default forwardRef(CreateLabOrderModal);

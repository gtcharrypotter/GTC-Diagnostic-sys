import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { useAuth } from '../../../../../../hooks/useAuth';
import { Controller, useForm } from 'react-hook-form';
import useNoBugUseEffect from '../../../../../../hooks/useNoBugUseEffect';
import Axios from '../../../../../../libs/axios';
import { toast } from 'react-toastify';
import FlatIcon from '../../../../../../components/FlatIcon';
import ActionBtn from '../../../../../../components/buttons/ActionBtn';
import { doctorName, doctorSpecialty } from '../../../../../../libs/helpers';
import ReactSelectInputField from '../../../../../../components/inputs/ReactSelectInputField';
import TextInputField from '../../../../../../components/inputs/TextInputField';
import AddCsr from '../../../components/AddCsr';
import CollapseDiv from '../../../../../../components/CollapseDiv';
import AddPharmacy from '../../../components/AddPharmacy';
import PatientCSROrder from '../../../../../department/his-nurse/components/PatientCSROrder';
import PatientPharmacyOrder from '../../../../../department/his-nurse/components/PatientPharmacyOrder';
const uniq_id = uuidv4();
const PatientSurgeryServices = (props) => {
    const { patient, appointment, setAppointment, mutateAll, onSuccess } = props;
	const { user } = useAuth();
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

	useNoBugUseEffect({
		functions: () => {
			getItems();
			getHUList("RHU");
		},
		params: [appointment?.id],
	});

	const [loading, setLoading] = useState(false);
	const [isSelectorLoading, setIsSelectorLoading] = useState(false);
	const [items, setItems] = useState([]);
	const [doctorList, setDoctorList] = useState([]);
	const [doctors, setDoctors] = useState([]);
	const [selectedItemsPharmacy, setSelectedItemsPharmacy] = useState([]);
	const [selectedItemsCsr, setSelectedItemsCsr] = useState([]);
    const roomType = watch('roomType');
	useNoBugUseEffect({
		functions: () => {
			if (getValues("rhu_id")) {
				getDoctors();
			}
		},
		params: [watch("rhu_id")],
	});

	useNoBugUseEffect({
		functions: () => {
			if (user?.health_unit_id) {
				setValue("rhu_id", user?.health_unit_id);
			}
		},
		params: [user?.health_unit_id],
	});
	const getDoctors = () => {
		Axios.get(
			`v1/clinic/doctors-by-location?health_unit_id=${getValues(
				"rhu_id"
			)}`
		).then((res) => {
			setDoctorList(res.data.data);
		});
	};
	const getItems = () => {
		Axios.get(`v1/item-inventory?location_id=${user?.health_unit_id}`).then(
			(res) => {
				setItems(res.data.data);
			}
		);
	};

	

	const sendToSurgery = () => {
		setLoading(true);
		let formdata = new FormData();
		formdata.append("rhu_id", appointment?.rhu_id);
		formdata.append("_method", "PATCH");

		Axios.post(`v1/hospital/send-from-surgery-to-or/${appointment?.id}`, formdata)
			.then((response) => {
				let data = response.data;
				// console.log(data);
				setTimeout(() => {
					// setAppointment(null);
				}, 100);
				setTimeout(() => {
					toast.success("Patient referral success!");
					setLoading(false);

				}, 200);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});

	}

	const hasError = (name) => {
		return errors[name]?.message;
	};
	const [HUList, setHUList] = useState([]);
	useNoBugUseEffect({
		functions: () => {
			setTimeout(() => {
				setValue("location_type", user?.healthUnit?.type);
				setValue("health_unit_id", user?.health_unit_id);
			}, 200);
		},
		params: [user?.id],
	});

	const getHUList = (type) => {
		Axios.get(`v1/health-unit/list?type=${type}`)
			.then((res) => {
				setHUList(res.data.data);
			})
			.finally(() => {
				setIsSelectorLoading(false);
			});
	};


	
  return (
    <div className="flex flex-col items-start">
			{appointment?.status == "pending-for-operation-release" ? (
				<>
					<div className="flex items-center w-full justify-center px-4 pb-4 gap-4">
						
					</div>
					
				</>
			) : (
				<div className="flex flex-col w-full gap-4 pb-2">
					<div className="p-0 flex flex-col gap-y-4 relative w-full">
						<h4 className="text-md text-indigo-800 border-b border-b-indigo-600 pb-1 font-bold mb-0">
							Send patient to Room
						</h4>
                       
						<CollapseDiv
								// defaultOpen={
								// 	appointment?.status ==
								// 		"pending-or-refer"
								// 	}
								defaultOpen={true}
								withCaret={true}
								title="Pharmacy"
								headerClassName="bg-blue-50"
								bodyClassName="p-0"
								>
								
                                <PatientPharmacyOrder patient={patient} appointment={appointment} />
								</CollapseDiv>

								<CollapseDiv
								// defaultOpen={
								// 	appointment?.status ==
								// 		"pending-or-refer"
								// 	}
								defaultOpen={true}
								withCaret={true}
								title="CSR"
								headerClassName="bg-blue-50"
								bodyClassName="p-0"
								>
                                <PatientCSROrder patient={patient} appointment={appointment} />
								</CollapseDiv>
						{/* <ActionBtn
                                className="px-4 !rounded-2xl w-full"
                                type="success"
                                size="lg"
                                loading={loading}
                                // onClick={handleSubmit(sendToSurgery)}
								onClick={sendToSurgery}
                            >
                                <FlatIcon
                                    icon="rr-check"
                                    className="mr-2 text-xl"
                                />
                                PATIENT SEND FOR SURGERY OPERATION
                            </ActionBtn> */}
					</div>
				</div>
			)}
			
		</div>
  )
}

export default PatientSurgeryServices

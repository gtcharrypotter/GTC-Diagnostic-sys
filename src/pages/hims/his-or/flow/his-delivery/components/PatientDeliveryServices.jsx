import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { useAuth } from '../../../../../../hooks/useAuth';
import { Controller, useForm } from 'react-hook-form';
import useNoBugUseEffect from '../../../../../../hooks/useNoBugUseEffect';
import Axios from '../../../../../../libs/axios';
import { toast } from 'react-toastify';
import TextInputField from '../../../../../../components/inputs/TextInputField';
import ReactSelectInputField from '../../../../../../components/inputs/ReactSelectInputField';
import { doctorName, doctorSpecialty } from '../../../../../../libs/helpers';
import FlatIcon from '../../../../../../components/FlatIcon';
import ActionBtn from '../../../../../../components/buttons/ActionBtn';
import CollapseDiv from '../../../../../../components/CollapseDiv';
import AddCsr from '../../../components/AddCsr';
import AddPharmacy from '../../../components/AddPharmacy';
import PatientCSROrder from '../../../../../department/his-nurse/components/PatientCSROrder';
import PatientPharmacyOrder from '../../../../../department/his-nurse/components/PatientPharmacyOrder';
const uniq_id = uuidv4();
const PatientDeliveryServices = (props) => {
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

	

	
	const sendToDelivery = () => {
		setLoading(true);
		let formdata = new FormData();
		formdata.append("rhu_id", appointment?.rhu_id);
		formdata.append("_method", "PATCH");

		Axios.post(`v1/hospital/send-from-delivery-to-or/${appointment?.id}`, formdata)
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
			{appointment?.status == "pending-for-delivery" ? (
				<>
					<div className="flex flex-col w-full gap-4 pb-2">
					<div className="p-0 flex flex-col gap-y-4 relative w-full">
						<h4 className="text-md text-indigo-800 border-b border-b-indigo-600 pb-1 font-bold mb-0">
							Add Medicines & CSR
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
								{/* <AddPharmacy 
								items={items}
								setItems={setItems}
								selectedItemsPharmacy={selectedItemsPharmacy}
								setSelectedItemsPharmacy={setSelectedItemsPharmacy}
								// prescribeItemsPharmacy={prescribeItemsPharmacy}
								loading={loading}
								/> */}
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
								{/* <AddCsr 
								items={items}
								setItems={setItems}
								selectedItemsCsr={selectedItemsCsr}
								setSelectedItemsCsr={setSelectedItemsCsr}
								// prescribeItemsCSR={prescribeItemsCSR}
								loading={loading}
								/> */}
                                <PatientCSROrder patient={patient} appointment={appointment} />
								</CollapseDiv>

						{/* <ActionBtn
                                className="px-4 !rounded-2xl w-full"
                                type="success"
                                size="lg"
                                loading={loading}
                                // onClick={handleSubmit(sendToDelivery)}
								onClick={sendToDelivery}
                            >
                                <FlatIcon
                                    icon="rr-check"
                                    className="mr-2 text-xl"
                                />
                                PATIENT SEND FOR DELIVERY OPERATION
                            </ActionBtn> */}
					</div>
				</div>
					
				</>
			) : (
				""
			)}
			
		</div>
  )
}

export default PatientDeliveryServices

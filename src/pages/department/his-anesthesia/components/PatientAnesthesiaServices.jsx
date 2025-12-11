import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import Axios from '../../../../libs/axios';
import { toast } from 'react-toastify';
import FlatIcon from '../../../../components/FlatIcon';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../../../../hooks/useAuth';
import ReactSelectInputField from '../../../../components/inputs/ReactSelectInputField';
import { doctorName, doctorSpecialty } from '../../../../libs/helpers';
import TextInputField from '../../../../components/inputs/TextInputField';
import CollapseDiv from '../../../../components/CollapseDiv';
import AddPharmacy from '../../../hims/his-or/components/AddPharmacy';
import AddCsr from '../../../hims/his-or/components/AddCsr';
import PatientPharmacyOrder from '../../his-nurse/components/PatientPharmacyOrder';
import PatientCSROrder from '../../his-nurse/components/PatientCSROrder';
const uniq_id = uuidv4();
const PatientAnesthesiaServices = (props) => {
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
    const procedureType = watch('procedureType');
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
                                <PatientPharmacyOrder
								patient={patient} 
								appointment={appointment}
								/>
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
                                <PatientCSROrder patient={appointment?.patient} />
								</CollapseDiv>



						{/* {procedureType === "Delivery" && (
                            <ActionBtn
                                className="px-4 !rounded-2xl w-full"
                                type="success"
                                size="lg"
                                loading={loading}
                                onClick={sendToDelivery}
                            >
                                <FlatIcon
                                    icon="rr-check"
                                    className="mr-2 text-xl"
                                />
                                Send patient to Delivery
                            </ActionBtn>
                        )}
                        {procedureType === "Surgery" && (
                            <ActionBtn
                                className="px-4 !rounded-2xl w-full"
                                type="success"
                                size="lg"
                                loading={loading}
                                onClick={sendToSurgery}
                            >
                                <FlatIcon
                                    icon="rr-check"
                                    className="mr-2 text-xl"
                                />
                                Send patient to Surgery
                            </ActionBtn>
                        )} */}
					</div>
				</div>
			)}

		</div>
  )
}

export default PatientAnesthesiaServices

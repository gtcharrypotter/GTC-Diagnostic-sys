import React, { useState } from 'react'
import ActionBtn from '../../../../../../components/buttons/ActionBtn';
import FlatIcon from '../../../../../../components/FlatIcon';
import AddCsr from '../../../components/AddCsr';
import CollapseDiv from '../../../../../../components/CollapseDiv';
import AddPharmacy from '../../../components/AddPharmacy';
import Axios from '../../../../../../libs/axios';
import useNoBugUseEffect from '../../../../../../hooks/useNoBugUseEffect';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PatientCSROrder from '../../../../../department/his-nurse/components/PatientCSROrder';
import PatientPharmacyOrder from '../../../../../department/his-nurse/components/PatientPharmacyOrder';

const PatientICUServices = (props) => {
    const { patient, appointment, setAppointment, mutateAll, onSuccess } = props;
    const [selectedItemsPharmacy, setSelectedItemsPharmacy] = useState([]);
	const [selectedItemsCsr, setSelectedItemsCsr] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
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

	
    const sendToNurse = () => {
		setLoading(true);
		let formdata = new FormData();
		formdata.append("rhu_id", appointment?.rhu_id);
		formdata.append("_method", "PATCH");

		Axios.post(`v1/hospital/send-from-icu-to-nurse-station/${appointment?.id}`, formdata)
			.then((response) => {
				let data = response.data;
				// console.log(data);
				setTimeout(() => {
					setAppointment(null);
				}, 100);
				setTimeout(() => {
					toast.success("Patient Return to Room!");
					setLoading(false);

				}, 200);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});

	}
	
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
							Add CSR and Pharmacy
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
                                <ActionBtn
                                className="px-4 !rounded-2xl w-full"
                                type="success"
                                size="lg"
                                loading={loading}
                                onClick={handleSubmit(sendToNurse)}
                                >
                                <FlatIcon
                                    icon="rr-check"
                                    className="mr-2 text-xl"
                                />
                                Proceed to Room
                            </ActionBtn>
					</div>
				</div>
			)}
			
		</div>
  )
}

export default PatientICUServices

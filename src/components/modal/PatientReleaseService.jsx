import React, { useState } from 'react'
import Axios from '../../libs/axios';
import { toast } from 'react-toastify';
import ActionBtn from '../buttons/ActionBtn';
import FlatIcon from '../FlatIcon';
import { dataURItoBlob } from '../../libs/helpers';
import ReleaseMedStep1 from '../../pages/appointments/components/ReleaseMedStep1';
import ReleaseMedStep2 from '../../pages/appointments/components/ReleaseMedStep2';
import ReleaseMedStep3 from '../../pages/appointments/components/ReleaseMedStep3';

const PatientReleaseService = (props) => {
    const {appointment, setAppointment, mutateAll} = props;
	const [step, setStep] = useState(1);
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [imageCaptured, setImageCaptured] = useState(null);
	const [satisfaction, setStatisfaction] = useState(null);

	const releasePrescription = (data) => {
		let formData = new FormData();
		formData.append("_method", "PATCH");
		appointment?.prescriptions.map((data) => {
			formData.append("inventory_id[]", data.inventory_id);
			formData.append("quantity[]", data.quantity);
			formData.append("items[]", data?.item?.id);
			formData.append("sig[]", data?.sig);
			formData.append("details[]", "medicine released");
		});
		Axios.post(
			`/v1/opd-standalone/released-medicine/${appointment?.id}`,
			formData
		)
			.then((res) => {
				setStep(2);
				toast.success("Prescription released!");
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const submitSatisfaction = () => {
		const formData = new FormData();
		formData.append("_method", "PATCH");
		formData.append("satisfaction", satisfaction);
		Axios.post(
			`/v1/opd-standalone/satisfaction-rate/${appointment?.id}`,
			formData
		)
			.then((res) => {
				// addToList(data);
				// setTimeout(() => {
				// setLoading(false);
				setStep(3);
				toast.success("Satisfaction successfully submitted!");
				// }, 400);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const submitSelfie = () => {
		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
			// onUploadProgress: progressEvent => onProgress(progressEvent),
		};
		const formData = new FormData();
		const file = dataURItoBlob(imageCaptured);
		formData.append("_method", "PATCH");
		formData.append("selfie", file);
		Axios.post(
			`/v1/opd-standalone/selfie/${appointment?.id}`,
			formData,
			config
		).then((res) => {
			setTimeout(() => {
				setAppointment(null);
				if (mutateAll) mutateAll();
			}, 100);
			setTimeout(() => {
				toast.success("Selfie successfully submitted!");
				setStep(1);
				setAppointment(null);
			}, 300);
		});
	};
	
    const patientRelease = () => {
		setLoading(true);
		let formdata = new FormData();
		formdata.append("rhu_id", appointment?.rhu_id);
		formdata.append("_method", "PATCH");

		Axios.post(`v1/hospital/mark-as-paid/${appointment?.id}`, formdata)
			.then((response) => {
				let data = response.data;
				// console.log(data);
				setTimeout(() => {
					// setAppointment(null);
				}, 100);
				setTimeout(() => {
					toast.success("Patient Successfully Release!");
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
			{appointment?.status === "pending-for-pharmacy-medicine-release"  ? (
			<>
					<div className="flex items-center w-full justify-center px-4 pb-4 gap-4">
						<div
							className={`h-14 w-1/4 rounded-lg bg-slate-200 flex items-center justify-center  flex-col duration-200 ${
								step == 1
									? "opacity-100 !bg-green-100"
									: "opacity-50"
							}`}
						>
							<b className="text-sm">Step 1</b>
							<span className="text-xs">
								Release medicine form
							</span>
						</div>
						<div
							className={`h-14 w-1/4 rounded-lg bg-slate-200 flex items-center justify-center  flex-col duration-200 ${
								step == 2
									? "opacity-100 !bg-green-100"
									: "opacity-50"
							}`}
						>
							<b className="text-sm">Step 2</b>
							<span className="text-xs">Satisfaction Rating</span>
						</div>
						<div
							className={`h-14 w-1/4 rounded-lg bg-slate-200 flex items-center justify-center  flex-col duration-200 ${
								step == 3
									? "opacity-100 !bg-green-100"
									: "opacity-50"
							}`}
						>
							<b className="text-sm">Step 3</b>
							<span className="text-xs">
								Proof of Patient and Personnel
							</span>
						</div>
					</div>
					<div className="p-5 mx-auto w-4/5 border rounded-xl">
						{step == 1 ? (
							<ReleaseMedStep1
								loading={loading}
								setLoading={setLoading}
								appointment={appointment}
								releasePrescription={releasePrescription}
							/>
						) : (
							""
						)}
						{step == 2 ? (
							<ReleaseMedStep2
								loading={loading}
								setLoading={setLoading}
								appointment={appointment}
								satisfaction={satisfaction}
								setStatisfaction={setStatisfaction}
								submitSatisfaction={submitSatisfaction}
							/>
						) : (
							""
						)}
						{step == 3 ? (
							<ReleaseMedStep3
								imageCaptured={imageCaptured}
								setImageCaptured={setImageCaptured}
								loading={loading}
								setLoading={setLoading}
								appointment={appointment}
								submitSelfie={submitSelfie}
							/>
						) : (
							""
						)}
					</div>
				</>
		) : (
				""
			)}
			
		</div>
  )
}

export default PatientReleaseService

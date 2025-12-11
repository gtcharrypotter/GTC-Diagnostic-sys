/* eslint-disable react/jsx-key */
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
import ActionBtn from "../buttons/ActionBtn";
import FlatIcon from "../FlatIcon";
import useClinic from "../../hooks/useClinic";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Img from "../Img";
import PrivacyPolicyDetails from "../PrivacyPolicyDetail";
import Axios from "../../libs/axios";

const PrivacyPolicyModal = (props, ref) => {
	const { newPatient = false, setPatientSelfie, onSuccess } = props;
	const {
		register,
		getValues,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [mount, setMount] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);

	const [stream, setStream] = useState(null);
	const [imageCaptured, setImageCaptured] = useState(null);
	const videoRef = useRef(null);

	useEffect(() => {
		let t = setTimeout(() => {
			setMount(1);
		}, 400);
		return () => {
			clearTimeout(t);
		};
	}, []);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};

	const submit = (data) => {
		 let formData = new FormData();
		 Axios.post(`v1/opd-standalone/case-code`, formData).then((res) => {
		 	// toast.success("New appointment created successfully!");
		 });
	};

	const startCamera = async () => {
		try {
			const mediaStream = await navigator.mediaDevices.getUserMedia({
				video: true,
			});
			setStream(mediaStream);
			videoRef.current.srcObject = mediaStream;
		} catch (error) {
			console.error("Error accessing camera:", error);
		}
	};

	const stopCamera = () => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
			setStream(null);
		}
	};
	const captureImage = async () => {
		const canvas = document.createElement("canvas");
		canvas.width = videoRef.current.videoWidth;
		canvas.height = videoRef.current.videoHeight;
		canvas
			.getContext("2d")
			.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

		const capturedImage = canvas.toDataURL("image/jpeg"); // Convert canvas to base64 JPEG

		// Now you can send the capturedImage to your server using Axios
		try {
			setImageCaptured(capturedImage);
			stopCamera();
			//   await axios.post('YOUR_UPLOAD_URL', { image: capturedImage });
			console.log("Image uploaded successfully", capturedImage);
		} catch (error) {
			console.error("Error uploading image:", error);
		}
	};

	return (
		<Transition appear show={modalOpen} as={Fragment}>
			<Dialog as="div" className="" onClose={hide}>
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
							<Dialog.Panel className="w-full lg:max-w-6xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<div className="pb-4 flex flex-col gap-y-4 relative text-justify">
									<div className="grid grid-cols-1 lg:grid-cols-12 w-full !rounded-t-xl">
										<div className="col-span-3 flex flex-col border-r border-r-blue-500 p-3">
											<p className="text-lg text-blue-600 tracking-tight font-opensans">
												I have read and give my consent
												to let GTC process my health
												information according to rules
												set forth by the Data Privacy
												Act.
											</p>
											<label className="flex items-center text-sm gap-3 mb-0 mt-4 text-gray-600">
												<span
													className={
														errors?.agree?.message
															? "text-red-500"
															: ""
													}
												>
													Check if you agree
												</span>

												<input
													type="checkbox"
													className={`${
														errors?.agree?.message
															? "border-red-500"
															: ""
													}`}
													{...register("agree", {
														required:
															"This field is required",
													})}
												/>
											</label>
											{errors?.agree?.message ? (
												<span className="text-red-500">
													{errors?.agree?.message}
												</span>
											) : (
												""
											)}
											{newPatient ? (
												""
											) : (
												<label className="flex items-center text-sm gap-2 mb-4 mt-2 text-gray-600">
													<span>
														Check to update profile
														picture
													</span>

													<input
														type="checkbox"
														{...register(
															"update_profile",
															{}
														)}
													/>
												</label>
											)}

											<div className="flex flex-col items-center mt-4 justify-center">
												<div className="flex flex-col mb-2">
													<video
														ref={videoRef}
														className={`border w-[256px] h-[256px] bg-black ${
															imageCaptured &&
															!stream
																? "hidden"
																: ""
														}`}
														autoPlay
														playsInline
														style={{
															transform:
																"scaleX(-1)",
														}}
													/>
													<img
														src={imageCaptured}
														className={`border w-[256px] h-[256px] bg-black object-contain ${
															imageCaptured ==
																null || stream
																? "hidden"
																: ""
														}`}
														style={{
															transform:
																"scaleX(-1)",
														}}
													/>
													{stream ? (
														<ActionBtn
															size="sm"
															type="danger"
															className="!rounded-none"
															onClick={
																captureImage
															}
														>
															<FlatIcon icon="rr-camera" />
															Capture
														</ActionBtn>
													) : (
														<ActionBtn
															size="sm"
															type="success"
															className="!rounded-none"
															onClick={
																startCamera
															}
														>
															<FlatIcon icon="rr-record" />
															Start Camera
														</ActionBtn>
													)}
												</div>
												<p className="text-blue-600 text-lg mb-0 w-full text-center uppercase">
													Selfie of the patient
												</p>
											</div>
											<ActionBtn
												className="mt-3"
												disabled={
													!imageCaptured ||
													errors?.agree?.message
												}
												onClick={handleSubmit(
													(data) => {
														setPatientSelfie(
															imageCaptured
														);
														onSuccess(data);
														hide();
														(submit)
													}
												)}
											>
												Click to proceed
											</ActionBtn>
										</div>
										<div className="col-span-9 p-3 flex flex-col max-h-[calc(100dvh-200px)] overflow-auto px-10">
											<h5 className="text-center text-2xl mb-5 font-bold">
												PRIVACY POLICY
											</h5>
											<p className="text-lg font-bold mb-3">
												INTRODUCTION
											</p>
											<p className="text-lg font-medium font-opensans tracking-tight mb-3">
												GLOBAL TELEMEDICINE (GTC) CORP.
												respects and values your privacy
												and commits to ensure that all
												information especially personal
												data collected from you, our
												clients and customers, are
												processed in compliance with
												Republic Act No. 10173 or the
												Data Privacy Act of 2012 (DPA),
												its Implementing Rules and
												Regulations, and other relevant
												laws regulations, and policies,
												including issuances of the
												National Privacy Commission This
												Policy describes the Company's
												data processing practices which
												includes the collection, use,
												storage, disclosure and security
												of the information provided as
												well as the exercise of your
												rights over your personal data.
												SCOPE and LIMITATION
											</p>
											<p className="text-lg font-medium font-opensans tracking-tight mb-3">
												All Company personnel as well as
												the Company's third-party
												providers must comply with the
												terms set out in this Policy,
												observing at all times the
												general principles of
												transparency, legitimate
												purpose, and proportionality.
											</p>
											<PrivacyPolicyDetails
												title="SCOPE and LIMITATION"
												paragraphs={[
													"All Company personnel as well as the Company’s third-party providers must comply with the terms set out in this Policy, observing at all times the general principles of transparency, legitimate purpose, and proportionality.",
													"This Policy covers all data processing activities, whether collected online or offline, including those collected when you use the Company’s software application, mobile applications, and other sites owned and operated by the Company (collectively the “Site”) as well as other channels such as third party social networks, points of sale, and customer/client engagement services. ",
												]}
											/>
											<PrivacyPolicyDetails
												title="INFORMATION GATHERED"
												paragraphs={[
													"GLOBAL TELEMEDICINE (GTC) CORP. may collect the following information about you directly and/or from third party providers, as well as those collected automatically through the use of the Site and other various channels or availing of our services and depending on how you interact with the Company:",
													<div className="flex flex-col pl-5">
														<b>
															•Personal Contact
															Information
														</b>
														<p className="pl-4">
															The Personal
															information the
															Company collects
															includes full name,
															physical address,
															email address,
															telephone number,
															identifiers that
															allow physical or
															online contacting or
															the location of you
															and other
															demographic
															information.
														</p>
													</div>,
													<div className="flex flex-col pl-5">
														<b>
															• Health or Medical
															Information
														</b>
														<p className="pl-4">
															The Company may also
															collect health or
															medical information
															such as medical or
															health history,
															health status and
															laboratory testing
															results, and
															diagnostic images
															(still or moving) as
															well as audio files,
															prescriptions,
															treatment and
															examination notes
															and such other
															information or
															documents prepared
															by the healthcare
															providers who
															provide services
															through the Site/or
															our other channels.
														</p>
													</div>,
													<div className="flex flex-col pl-5">
														<b>
															• Other information
														</b>
														<p className="pl-4">
															By registering and
															creating an account,
															the Company will
															also collect user
															identification and
															password and any
															information that you
															voluntarily share
															about your
															experience of using
															our products and
															services. Other
															information which
															may be collected
															includes the billing
															or payment
															information that you
															provide us, such as
															debit/credit card or
															bank account
															information.
														</p>
													</div>,
													<div className="flex flex-col pl-5">
														<b>
															• Web traffic and
															Cookies
														</b>
														<p className="pl-4">
															In the use of the
															Site and other
															channels owned by
															the Company,
															information about
															you and your
															interaction with and
															activity in the Site
															are automatically
															tracked, collected
															and stored by
															employing cookies
															and web server logs.
															These pieces of
															information include:
														</p>
														<ul className="pl-10 py-4">
															<li>
																Internet
																Protocol (IP)
																address
															</li>
															<li>
																Uniform Resource
																Locators (URL)
															</li>
															<li>
																domain name{" "}
															</li>
															<li>
																type of
																computer; and{" "}
															</li>
															<li>
																type of web
																browser and
																location.{" "}
															</li>
														</ul>
														<p>
															Cookies are small
															data files sent and
															saved to your device
															to improve use
															experiences on the
															Site by
															personalizing
															content on the
															Company’s pages such
															as presenting
															information of
															greatest interest to
															you when you visit
															the Site.{" "}
														</p>
													</div>,
													<div className="flex flex-col pl-0">
														<b>
															USE OF THE
															INFORMATION
														</b>
														<p>
															<p>
																The Company
																process all
																information
																collected for
																the following
																purposes:
															</p>
															<ol
																className="pl-10"
																style={{
																	listStyleType:
																		"lower-alpha",
																}}
															>
																<li>
																	contact you
																	with company
																	updates,
																	product
																	information,
																	software
																	updates/release
																	notes or to
																	provide
																	technical
																	support and
																	assistance,
																	to respond
																	to your
																	inquiries,
																	to send
																	offers and
																	other
																	promotional
																	communications,
																	and for
																	other
																	customer/client
																	service
																	purposes.
																</li>
																<li>
																	display
																	advertisements
																	in the Site
																	or other
																	channels
																</li>
																<li>
																	facilitate
																	communications
																	between you
																	and a
																	healthcare
																	provider{" "}
																</li>
																<li>
																	the
																	provision of
																	services{" "}
																</li>
																<li>
																	help resolve
																	disputes and
																	troubleshoot
																	problems
																</li>
																<li>
																	collect fees
																	and charges{" "}
																</li>
															</ol>
														</p>
													</div>,
													<div className="flex flex-col">
														<b>
															SHARING YOUR
															INFORMATION
														</b>
														<p>
															The Company may
															disclose information
															including sensitive
															personal information
															to the following
															authorized third
															parties as well as
															agents acting on
															their behalf:
															<ul className="pl-10 list-disc">
																<li>
																	Healthcare
																	Providers.
																	As directed
																	and
																	consented to
																	by you, the
																	relevant
																	information
																	you provided
																	shall be
																	shared to
																	your
																	Healthcare
																	Provider of
																	your choice
																	in order to
																	render the
																	service/s
																	required.
																</li>
																<li>
																	Third party
																	email
																	service
																	providers.
																</li>
																<li>
																	Service
																	providers
																	for payment
																	processing.
																</li>
																<li>
																	mobile
																	health data
																	devises, and
																	others
																	authorized
																	by you.
																</li>
															</ul>
															<p>
																The Company may
																share contact
																data with the
																foregoing to the
																extent permitted
																under this
																Policy and for
																the purposes you
																specified.
															</p>
															<p>
																The Company
																shall also
																disclose the
																information
																collected to the
																appropriate
																government
																agency,
																department or
																bureau or such
																other authorized
																third party in
																compliance with
																the law, a
																judicial
																proceeding,
																court order, or
																other legal
																process.
															</p>
														</p>
													</div>,
													<div className="flex flex-col">
														<b>
															STORAGE AND SECURITY
														</b>
														<p>
															<p>
																The privacy and
																security of your
																information
																especially your
																sensitive
																personal
																information is
																recognized under
																the law. The
																Company is
																committed to
																maintain your
																information
																strictly
																confidential and
																secure.
															</p>
															<p>
																In ensuring that
																all information
																under its
																custody are
																adequately
																protected
																against any
																accidental or
																unlawful
																destruction,
																alteration and
																disclosure and
																against any
																other unlawful
																processing, the
																Company
																implements
																reasonable
																technical,
																physical,
																administrative,
																and
																organizational
																safeguards in
																storing
																collected
																information.{" "}
															</p>
															<p>
																All information
																gathered shall
																be retained for
																as long as
																necessary to
																satisfy the
																purposes for
																which your
																information were
																gathered and for
																such duration as
																may be permitted
																by law.
															</p>
														</p>
													</div>,
													<div className="flex flex-col">
														<b>
															RIGHTS OVER YOUR
															PERSONAL DATA
														</b>
														<p>
															You have the right
															to reasonable access
															to your personal
															information and
															review the same. In
															line with this right
															but subject to such
															limitations provided
															by law, you may (1)
															dispute the
															inaccuracy or error
															in the personal data
															and demand the
															correction thereof;
															(2) update your
															personal
															information; (3)
															request the
															suspension,
															withdrawal,
															blocking, removal or
															destruction of all
															or some of your
															personal information
															(4) lodge a
															complaint
														</p>
													</div>,
													<div className="flex flex-col">
														<b>CONTACT US</b>
														<p>
															For any inquiry or
															concerns, you may
															contact us by using
															the Contact Us form
															or send a letter or
															email to the mailing
															address listed
															below.
														</p>
														<div className="table">
															<table>
																<tr>
																	<td className="text-center">
																		Attention:
																		<br />
																		<br />
																		<br />
																		<br />
																	</td>
																	<td>
																		[Hazel
																		A.
																		Alfonso]
																		<br />
																		[AMANI
																		GRAND
																		Citigate,
																		Davao
																		City]
																		<br />
																		[globaltelemedicinecorp@gmail.com]
																		<br />
																		[09175393771]
																		<br />
																	</td>
																</tr>
															</table>
															<p>
																Kindly include
																your complete
																name, contact
																information and
																a detailed
																description of
																your request or
																privacy concern.
															</p>
														</div>
													</div>,
													<div className="flex flex-col pl-0">
														<b className="text-center w-full">
															USER’S CONSENT
														</b>
														<p>
															I hereby acknowledge
															that I have read and
															completely
															understood the
															Policy and warrant
															that I know and
															understood my rights
															therein. I give my
															consent to the
															processing including
															sharing of my
															personal information
															by the Company, any
															of its authorized
															third parties as
															well as agents
															acting on their
															behalf in accordance
															with the Policy.
														</p>
													</div>,
												]}
											/>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default forwardRef(PrivacyPolicyModal);

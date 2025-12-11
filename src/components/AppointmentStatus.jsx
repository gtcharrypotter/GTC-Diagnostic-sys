const AppointmentStatus = ({
	customStatus = null,
	forResult = false,
	appointment,
}) => {
	const renderStatus = () => {
		if (customStatus) {
			return <span className="text-orange-500">{customStatus}</span>;
		}
		if (appointment?.status == "pending" && appointment?.vital_id == null) {
			return (
				<span className="text-orange-500">
					Pending for patient vitals
				</span>
			);
		}
		if (appointment?.status == "pending" && appointment?.vital_id != null) {
			return <span className="text-orange-600">Pending for service</span>;
		}
		if (appointment?.status == "pending-for-billing-release") {
			return <span className="text-red-600">Pending for release</span>;
		}
		if (appointment?.status == "pending-or-refer") {
			return <span className="text-orange-500">Pending for Operating Room</span>;
		}
		if (forResult) {
			return (
				<span className="text-orange-500">
					Pending for laboratory tests reading
				</span>
			);
		}

		if (appointment?.has_for_reading?.length > 0) {
			return (
				<span className="text-orange-500">
					Pending for Result Reading
				</span>
			);
		}
		if (appointment?.status == "pending" && appointment?.vital_id == null) {
			return (
				<span className="text-orange-500">
					Pending for patient vitals
				</span>
			);
		}
		if (appointment?.status == "pending" && appointment?.vital_id != null) {
			return <span className="text-orange-600">Pending for service</span>;
		}
		if (
			appointment?.status == "pending-doctor-confirmation" &&
			appointment?.vital_id != null &&
			appointment?.referred_to != null
		) {
			return (
				<span className="text-orange-600">
					Pending for doctor&apos;s confirmation
				</span>
			);
		}
		if (
			appointment?.status == "pending-for-pharmacy-release" &&
			appointment?.prescribed_by == null
		) {
			return (
				<span className="text-orange-600">For Doctor Prescription</span>
			);
		}
		if (
			appointment?.status == "pending-for-pharmacy-release" &&
			appointment?.prescribed_by != null
		) {
			return (
				<span className="text-orange-600">For Medicine release</span>
			);
		}
		if (appointment?.status == "in-service-consultation") {
			return (
				<span className="text-orange-600">
					CONSULTATION WITH DOCTOR
				</span>
			);
		}
		
		if (appointment?.status == "pending-for-anesthesia-schedule") {
			return (
				<span className="text-orange-600">
					PENDING FOR ANESTHESIA
				</span>
			);
		}
		if (appointment?.status == "pending-for-surgery") {
			return (
				<span className="text-orange-600">
					PENDING FOR SURGERY
				</span>
			);
		}
		if (appointment?.status == "pending-for-delivery") {
			return (
				<span className="text-orange-600">
					PENDING FOR DELIVERY 
				</span>
			);
		}
		if (appointment?.status == "pending-for-surgery-release") {
			return (
				<span className="text-orange-600">
					PENDING FOR SURGERY RELEASE
				</span>
			);
		}
		if (appointment?.status == "pending-for-delivery-release") {
			return (
				<span className="text-orange-600">
					PENDING FOR DELIVERY RELEASE
				</span>
			);
		}
		if (appointment?.status == "pending-icu") {
			return (
				<span className="text-orange-600">
					ICU MONITORING
				</span>
			);
		}
		if (appointment?.status == "pending-pacu") {
			return (
				<span className="text-orange-600">
					PACU MONITORING
				</span>
			);
		}
		if (appointment?.status == "pending-icu-release") {
			return (
				<span className="text-orange-600">
					ICU FOR RELEASE
				</span>
			);
		}
		if (appointment?.status == "pending-pacu-release") {
			return (
				<span className="text-orange-600">
					PACU FOR RELEASE
				</span>
			);
		}
		return (
			<span className="text-red-600 uppercase">
				{String(appointment?.status).replaceAll("-", " ")}
			</span>
		);
	};
	return renderStatus();
};
export default AppointmentStatus;

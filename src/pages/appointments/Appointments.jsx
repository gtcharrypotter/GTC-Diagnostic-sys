import { useEffect, useRef, useState } from "react";
import FlatIcon from "../../components/FlatIcon";
import LayoutContainer from "../../components/container/LayoutContainer";
import Header from "../../components/layout/Header";
import AppLayout from "../../components/container/AppLayout";
import PageHeader from "../../components/layout/PageHeader";
import TextInput from "../../components/inputs/TextInput";
import Img from "../../components/Img";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ActionBtn from "../../components/buttons/ActionBtn";
import NewAppointmentModal from "../../components/modal/NewAppointmentModal";
import Axios from "../../libs/axios";
import { useAuth } from "../../hooks/useAuth";
import ShowAppointmentModal from "../../components/modal/ShowAppointmentModal";
import { dateMMDDYYYY } from "../../libs/helpers";

const localizer = momentLocalizer(moment);
const CustomToolbar = ({ toolbar, setView, view }) => {
	const currentDate = moment().format( "dddd, MMMM DD, YYYY");
	return (
			<div className="flex justify-between custom-toolbar m-2">
			<div className="flex gap-1 navigation-buttons">
				<ActionBtn
					className="back-button bg-white"
					onClick={() => toolbar.onNavigate("PREV")}
				>
					<FlatIcon icon="rr-angle-left" className="text-black" />
				</ActionBtn>
				<ActionBtn
					className="today-button bg-white"
					onClick={() => toolbar.onNavigate("TODAY")}
				>
					<span className="text-black">{toolbar.label}</span>
				</ActionBtn>
				<ActionBtn
					className="next-button bg-white"
					onClick={() => toolbar.onNavigate("NEXT")}
				>
					<FlatIcon icon="rr-angle-right" className="text-black" />
				</ActionBtn>
			</div>
			<div className="label text-center">
				<span>{toolbar.label}</span>
			</div>
			<div className="flex gap-1 date-buttons items-end">
				<ActionBtn
					className={`back-button ${
						view === "month" ? "bg-gray-200" : ""
					}`}
					onClick={() => setView("month")} // Set Month view
				>
					<span>Month</span>
				</ActionBtn>
				<ActionBtn
					className={`today-button ${
						view === "week" ? "bg-gray-200" : ""
					}`}
					onClick={() => setView("week")} // Set Week view
				>
					<span>Week</span>
				</ActionBtn>
				<ActionBtn
					className={`next-button ${
						view === "day" ? "bg-gray-200" : ""
					}`}
					onClick={() => setView("day")} // Set Day view
				>
					<span>Day</span>
				</ActionBtn>
			</div>
		</div>
	);
};
const Appointments = () => {
	const { user } = useAuth();
	const newAppointmentRef = useRef(null);
	const showAppointmentModal = useRef(null);

	const [view, setView] = useState("week"); // Default view is monthly
	const [appointments, setAppointments] = useState([]); // Default view is monthly

	const views = ["month", "week", "day"];
	useEffect(() => {
		let t = setTimeout(() => {
			getAppointments();
		}, 200);
		return () => {
			clearTimeout(t);
		};
	}, [user?.id]);


	const getAppointments = () => {
		Axios.get(`v1/telemedicine/all-schedules?date=${dateMMDDYYYY()}`).then(
			(res) => {
				setAppointments(res.data.data);
			}
		);
	};
	
	return (
		<AppLayout>
			<PageHeader title="Appointments" icon="rr-clipboard-user">
				<div className="ml-auto">
					<ActionBtn
						className="gap-2"
						onClick={() => {
							newAppointmentRef.current.show();
						}}
					>
						<FlatIcon icon="rr-square-plus" /> New appointment
					</ActionBtn>
				</div>
			</PageHeader>
			<div className="container mx-auto p-5">
				<div className="h-[calc(100dvh-188px)]">
					<Calendar
						key={`views-${view}`}
						localizer={localizer}
						onSelectEvent={(event) => {
							console.log("onSelectEvent", event);
							showAppointmentModal.current.show(
								event?.appointment
							);
						}}
						min={
							new Date(
								new Date().getFullYear(),
								new Date().getMonth(),
								new Date().getDate(),
								8
							)
						}
						events={appointments?.map((appointment) => {
							let date = `${appointment?.date}, ${String(
								appointment?.slot?.start_time
							).substring(0, 5)} ${String(
								appointment?.slot?.start_time
							).substring(5, 7)}`;
							return {
								appointment: appointment,
								title: `Teleconsult PATIENT: ${appointment?.patient?.firstname} ${appointment?.patient?.lastname}`,
								start: moment(date).toDate(),
								end: moment(date).add(30, "minute").toDate(),
							};
						})}
						startAccessor="start"
						endAccessor="end"
						defaultView={view}
						step={30}
						timeslots={1}
						views={views}
						components={{
							toolbar: (toolbar) => (
								<CustomToolbar
									toolbar={toolbar}
									setView={setView}
									view={view}
								/>
							),
						}}
					/>
				</div>
			</div>
			<NewAppointmentModal ref={newAppointmentRef} />
			<ShowAppointmentModal ref={showAppointmentModal} />
		</AppLayout>
	);
};

export default Appointments;

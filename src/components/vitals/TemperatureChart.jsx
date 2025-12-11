/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	CartesianGrid,
	Label,
	Legend,
	Line,
	LineChart,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import Axios from "../../libs/axios";
/* const data = [
	{ name: " 8:00 PM", data: 36.5 },
	{ name: " 9:00 PM", data: 37.2 },
	{ name: "10:00 PM", data: 38.3 },
	{ name: "11:00 PM", data: 38.5 },
	{ name: "12:00 PM", data: 39 },
]; */

const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const CustomTooltip = ({ active, payload, label }) => {
	console.log("payloadpayload", label);
	let d = new Date(label);
	const getValue = (v) => {
		console.log("getValuegetValue", v);
		if (v < 36.5) {
			return <span className={`font-bold text-temp-low`}>{v} °C</span>;
		} else if (v >= 36.5 && v <= 37.5) {
			return <span className={`font-bold text-temp-normal`}>{v} °C</span>;
		} else if (v >= 37.5 && v <= 37.5) {
			return <span className={`font-bold text-temp-medium`}>{v} °C</span>;
		} else if (v > 37.5) {
			return <span className={`font-bold text-temp-high`}>{v} °C</span>;
		}
		return <span className={`font-bold text-temp-normal`}>{v} °C</span>;
	};
	if (active && payload && payload.length) {
		let v = parseFloat(payload[0].value);
		let color = "text-temp-normal";

		return (
			<div className="bg-white rounded-xl shadow flex flex-col gap-y-1 p-2 items-center justify-center">
				<label className="text-sm mb-0">Temperature</label>
				<label className="text-sm mb-0 text-secondary">
					{payload[0]?.payload?.time}
				</label>
				{getValue(payload[0].value)}
			</div>
		);
	}

	return null;
};
const TemperatureChart = ({ w, h, patient }) => {
	const [data, setData] = useState([]);
	useEffect(() => {
		if (patient?.id) {
			getData();
		}
	}, [patient?.id]);
	const getData = () => {
		Axios.get(
			`/v1/clinic/patient-charts/${patient?.id}?chart_type=temperature`
		).then((res) => {
			let _labels = res.data?.labels;
			let _values = res.data?.values;
			setData(
				_values?.map((item, index) => ({
					name: _labels[index],
					data: _values[index],
					time: _labels[index],
				}))
			);
		});
	};
	return (
		<LineChart
			width={w}
			height={h + 20}
			data={data.reverse()}
			margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
		>
			<Legend verticalAlign="top" height={36} />
			<Line
				name="Temperature"
				type="monotone"
				dataKey="data"
				stroke="#e95555"
				activeDot={{ r: 16 }}
			/>
			<CartesianGrid stroke="#ccc" strokeDasharray="10 10" />
			<XAxis dataKey="name">
				<Label value="Time" offset={0} position="insideBottom" />
			</XAxis>
			<YAxis
				label={{
					value: "Temperature",
					angle: -90,
					position: "insideLeft",
				}}
				id={34}
				domain={[34, 40]}
			/>
			<Tooltip content={CustomTooltip} />
		</LineChart>
	);
};

export default TemperatureChart;

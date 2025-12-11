/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
} from "recharts";
import Axios from "../../libs/axios";
/* const data = [
	{ time: " 8:00 PM", data: 4 },
	{ time: " 9:00 PM", data: 6 },
	{ time: "10:00 PM", data: 2 },
	{ time: "11:00 PM", data: 4 },
	{ time: "12:00 PM", data: 5 },
]; */
const CustomTooltip = ({ active, payload, label }) => {
	const getValue = (v) => {
		return <span className={`font-bold text-darker`}>{v}</span>;
	};
	if (active && payload && payload.length) {
		return (
			<div className="bg-white rounded-xl shadow flex flex-col gap-y-1 p-2 items-center justify-center">
				<label className="text-sm mb-0">Glucose levels: </label>
				{getValue(payload[0].value)} mmol/L
			</div>
		);
	}

	return null;
};
const GlucoseChart = ({ w, h, patient }) => {
	const { id } = useParams();
	const [data, setData] = useState([]);
	useEffect(() => {
		if (patient?.id) {
			getData();
		}
	}, [patient?.id]);
	const getData = () => {
		Axios.get(
			`/v1/clinic/patient-charts/${patient?.id}?chart_type=glucose`
		).then((res) => {
			let _labels = res.data?.labels;
			let _values = res.data?.values;
			setData(
				_values?.map((item, index) => ({
					name: _labels[index],
					data: _values[index],
				}))
			);
		});
	};

	return (
		<LineChart
			width={w}
			height={h}
			data={data.reverse()}
			margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
		>
			<Line
				type="monotone"
				dataKey="data"
				stroke="#8884d8"
				activeDot={{ r: 16 }}
			/>
			<CartesianGrid stroke="#ccc" strokeDasharray="10 10" />
			<XAxis dataKey="time" />
			<YAxis id={34} domain={[0, 10]} />
			<Tooltip content={CustomTooltip} />
		</LineChart>
	);
};

export default GlucoseChart;

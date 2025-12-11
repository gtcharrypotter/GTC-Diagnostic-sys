import { useEffect, useState } from "react";
import Axios from "../libs/axios";

import { v4 as uuidv4 } from "uuid";
const useDataTable = (props) => {
	const { url = "", defaultFilters } = props;
	const [loading, setLoading] = useState(true);
	const [paginate, setPaginate] = useState(10);
	const [page, setPage] = useState(1);
	const [meta, setMeta] = useState(null);
	const [data, setData] = useState([]);

	const [column, setColumn] = useState("");
	const [direction, setDirection] = useState("");
	const [filters, setFilters] = useState(defaultFilters || {});
	let stringFilters = JSON.stringify(filters);
	const transformFilters = () => {
		let str = "";
		Object.keys(filters).map((key, index) => {
			str += `${index == 0 ? "" : "&"}${key}=${filters[key]}`;
		});
		return str;
	};
	useEffect(() => {
		let t = setTimeout(() => {
			// console.log("useEffecttttttt", page, paginate, stringFilters);
			fetchData();
		}, 250);
		return () => {
			clearTimeout(t);
		};
	}, [page, paginate, stringFilters]);
	const fetchData = () => {
		setLoading(true);
		Axios.get(
			`${url}?page=${page}&paginate=${paginate}&${transformFilters()}`
		)
			.then((res) => {
				setData(res?.data?.data);
				setMeta(res?.data?.meta);
				setLoading(false);
			})
			.catch((e) => {
				console.log("error loading", e, e?.message);
				setLoading(false);
			});
	};

	const reloadData = () => {
		setFilters((prevFilters) => ({
			...prevFilters,
			...defaultFilters,
			reloadKey: uuidv4(),
		}));
	};

	return {
		page,
		setPage,
		meta,
		setMeta,
		loading,
		setLoading,
		paginate,
		setPaginate,
		data,
		setData,
		column,
		setColumn,
		direction,
		setDirection,
		filters,
		setFilters,
		reloadData,
	};
};

export default useDataTable;

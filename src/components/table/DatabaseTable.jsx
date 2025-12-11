/* eslint-disable react/prop-types */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FlatIcon from "../FlatIcon";

const uniqID = uuidv4();

const TH = ({ col, onSort }) => {
	const [direction, setDirection] = useState(null);
	const triggerDirection = () => {
		setDirection((prev) => (prev === null ? "desc" : prev === "desc" ? "asc" : null));
		if (onSort) onSort(col?.key, direction);
	};

	return (
		<th
			className={`text-sm p-2 bg-gray-200 border border-gray-300 text-left ${col?.className} ${
				col?.sortable ? "cursor-pointer" : ""
			}`}
			onClick={col?.sortable ? triggerDirection : undefined}
			style={{ minWidth: "150px", maxWidth: "250px" }}
		>
			<div className={`relative ${col?.headerClassName || ""}`}>
				{col?.header}
				{col?.sortable && (
					<span className="flex flex-col absolute right-1 top-[-2px] scale-125">
						<FlatIcon
							icon="sr-caret-up"
							className={`${!direction ? "opacity-25" : direction === "desc" ? "opacity-25" : "opacity-100"}`}
						/>
						<FlatIcon
							icon="sr-caret-down"
							className={`${direction === null ? "opacity-25" : direction === "desc" ? "opacity-100" : "opacity-25"}`}
						/>
					</span>
				)}
			</div>
		</th>
	);
};

const DatabaseTable = ({ loading = true, columns = [], data = [], onSort }) => {
	const [selectedRow, setSelectedRow] = useState(null);

	return (
		<div className="w-full overflow-auto border border-gray-300" style={{ maxHeight: "500px" }}>
			<table className="min-w-max border-collapse">
				<thead>
					<tr>
						{columns.slice(0, 30).map((col, index) => (
							<TH key={`${uniqID}-th-${index}`} col={col} onSort={onSort} />
						))}
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<tr>
							<td colSpan={columns.length} className="text-center py-4">
								Loading...
							</td>
						</tr>
					) : data.length === 0 ? (
						<tr>
							<td colSpan={columns.length} className="text-center py-4">
								No data to display.
							</td>
						</tr>
					) : (
						data.map((rowData, trIndex) => (
							<tr
								key={`${uniqID}-tr-${trIndex}`}
								className={`border ${selectedRow === trIndex ? "bg-blue-100" : "hover:bg-gray-100"}`}
								onClick={() => setSelectedRow(trIndex)}
							>
								{columns.slice(0, 30).map((col, tdIndex) => (
									<td
										key={`${uniqID}-td-${trIndex}-${tdIndex}`}
										className={`border p-2 text-sm`}
										style={{
											minWidth: "150px",
											maxWidth: "250px",
											whiteSpace: "nowrap",
										}}
									>
										{col?.cell ? col.cell(rowData) : rowData[col?.key]}
									</td>
								))}
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default DatabaseTable;

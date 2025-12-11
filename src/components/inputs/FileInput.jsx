import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
/* eslint-disable react/prop-types */
const FileInput = (props) => {
	const { label, className = "", type = "file" } = props;
	const [file, setFile] = useState(null);
	const fileChange = (e) => {
		const selectedFile = e.target.files[0];

		if (selectedFile) {
			const reader = new FileReader();

			reader.onload = (event) => {
				setFile({
					preview: event.target.result,
					name: selectedFile.name,
				});
			};

			reader.readAsDataURL(selectedFile);
		} else {
			setFile(null);
		}
	};
	return (
		<div className=" items-start justify-start">
			<h2 className="block text-sm font-medium leading-6 text-gray-900">
				Result Image Upload
			</h2>
			<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6-py-10">
				<div className="text-center">
					<PhotoIcon
						className="mx-auto h-12 w-12 text-gray-300"
						aria-hidden="true"
					/>
					<div className="mt-4 flex text-sm leading-b text-gray-600">
						<label
							htmlFor="file-input"
							className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
						>
							Upload a Image
							<input
								type="file"
								id="file-input"
								accept="image/*"
								className="sr-only"
								onChange={fileChange}
							/>
						</label>
					</div>
					<p className="text-xs leading-5 text-gray-600">
						PNG, JPG, GIF
					</p>
				</div>
			</div>
			{file && (
				<div className="mt-2">
					<img
						src={file.preview}
						alt={`Preview of ${file.name}`}
						style={{ maxWidth: "600px", maxHeight: "600px" }}
					/>
					<p className="italic text-xs">Image Name: {file.name}</p>
				</div>
			)}
		</div>
	);
};

export default FileInput;

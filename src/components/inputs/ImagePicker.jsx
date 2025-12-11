/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

let uniq_id = uuidv4();
const ImagePicker = ({
	className = "",
	children,
	onChange,
	defaultImg = null,
}) => {
	const [imagePreview, setImagePreview] = useState(defaultImg);

	const handleChangeImage = (event) => {
		let reader = new FileReader();
		let file = event.target.files[0];

		reader.onload = (event) => {
			setImagePreview(event.target.result);
		};
		reader.readAsDataURL(file);
	};

	useEffect(() => {
		let t = setTimeout(() => {
			if (onChange && imagePreview) {
				onChange(imagePreview);
			}
		}, 200);
		return () => {
			clearTimeout(t);
		};
	}, [imagePreview]);

	return (
		<label className={`cursor-pointer ${className}`}>
			<div className="absolute h-0 w-0 overflow-hidden">
				<input
					type="file"
					key={`img-picker-${uniq_id}`}
					onChange={handleChangeImage}
					accept="image/*"
				/>
			</div>
			{children({ imagePreview })}
		</label>
	);
};

export default ImagePicker;

import React from 'react'

const PatientImg = ({ type, src, name, ...rest }) => {
  const srcRender = () => {
		if (src && src?.length) {
			return `${import.meta.env.VITE_IMG_URL}${src}`;
		} else {
			switch (type) {
				case "user":
					return `https://api.dicebear.com/7.x/initials/svg?seed=${name}&backgroundType=gradientLinear`;

				default:
					return "";
			}
		}
	};
	return <img src={srcRender()} alt="name" {...rest} />;
}

export default PatientImg

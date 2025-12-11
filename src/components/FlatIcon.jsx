/* eslint-disable react/prop-types */
const FlatIcon = (props) => {
	const { icon, className = "" } = props;
	return (
		<i
			className={`fi fi-${icon} ${className}`}
			style={{ marginBottom: -4 }}
		/>
	);
};

export default FlatIcon;

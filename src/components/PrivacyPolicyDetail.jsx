/* eslint-disable react/prop-types */
const PrivacyPolicyDetails = ({ title, paragraphs }) => {
	return (
		<div>
			<p className="text-lg font-bold mb-3">{title}</p>
			{paragraphs?.map((data) => {
				return (
					<p
						key={``}
						className="text-lg font-medium font-opensans tracking-tight mb-3"
					>
						{data}
					</p>
				);
			})}
		</div>
	);
};

export default PrivacyPolicyDetails;

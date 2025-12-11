import Img from "../../Img";
const PromotionCard = ({ src, title, content }) => {
	return (
		<div className="flex items-center border shadow-sm">
			<div className="flex flex-col items-center justify-center gap-3 lg:grid lg:grid-cols-12">
				<div className="lg:col-span-3">
					<Img src={src} className="object-cover aspect-[3/2]" />
				</div>
				<div className="lg:col-span-9 flex flex-col items-start gap-1">
					<h6 className="text-sm font-bold font-opensans text-blue-600">
						{title}
					</h6>
					<p className="text-xs font-roboto font-light">{content}</p>
				</div>
			</div>
		</div>
	);
};

export default PromotionCard;

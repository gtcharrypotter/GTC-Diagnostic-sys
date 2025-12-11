import { useEffect, useRef } from "react";
import FlatIcon from "../components/FlatIcon";
import AppLayout from "../components/container/AppLayout";
import PageHeader from "../components/layout/PageHeader";
import PromotionsModal from "../components/modal/PromotionsModal";
import { useAuth } from "../hooks/useAuth";
import useNoBugUseEffect from "../hooks/useNoBugUseEffect";
import PromotionCarousels from "../components/carousels/PromotionCarousels";
import PromotionCard from "../components/cards/promotions/PromotionCard";

import image4 from "../assets/images/img4.jpg";
import image5 from "../assets/images/img5.jpg";
import image6 from "../assets/images/img6.jpg";
import image7 from "../assets/images/img7.jpg";
import DashboardCarousels from "../components/carousels/DashboardCarousels";

const Dashboard = () => {
	const { user } = useAuth();
	const promotionModalRef = useRef(null);
	useNoBugUseEffect({
		functions: () => {
			setTimeout(() => {
				promotionModalRef.current.show();
			}, 400);
		},
		params: [1],
	});
	return (
		<>
				<div className="grid grid-cols-1 lg:grid-cols-12 p-5">
					<div className="lg:col-span-8">
						<DashboardCarousels />
					</div>
					<div className="lg:col-span-4 px-4">
						<div className="bg-green-600 mb-4 p-3 relative rounded-3xl flex items-center justify-center">
							<span className="text-white font-bold font-opensans">
								Big Medicine Discount!!!
							</span>
							<span className="bg-white rounded-full px-2 absolute right-3 pb-1 text-green-500 pt-[7px]">
								<FlatIcon icon="br-dollar" className="" />
							</span>
						</div>
						<div className="flex flex-col gap-y-4">
							<PromotionCard
								src={image4}
								title="Health"
								content="COVID Vaccines Compared"
							/>
							<PromotionCard
								src={image5}
								title="Health"
								content="Humans Harness AI To Speed Drug Development"
							/>
							<PromotionCard
								src={image6}
								title="Health"
								content="How a racing heart may alter decision-making brain circuits
                                            "
							/>
							<PromotionCard
								src={image7}
								title="Health"
								content="Get Your Blood Checked"
							/>
						</div>
					</div>
				</div>

			<PromotionsModal ref={promotionModalRef} />
		</>
	);
};

export default Dashboard;

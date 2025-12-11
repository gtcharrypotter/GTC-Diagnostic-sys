/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import AppLayout from '../components/container/AppLayout'
import PageHeader from '../components/layout/PageHeader'
import { useAuth } from '../hooks/useAuth';
import MenuTitle from '../components/buttons/MenuTitle';
import TabGroup from '../components/TabGroup';
import Dashboard from './Dashboard';
import CauseConsultation from './CauseConsultation';
import PromotionsModal from '../components/modal/PromotionsModal';
import useNoBugUseEffect from '../hooks/useNoBugUseEffect';
import SatisfactoryRating from './SatisfactoryRating';
import useClinic from '../hooks/useClinic';
import useDataTable from '../hooks/useDataTable';
import CashierClaimsMonitoring from './CashierClaimsMonitoring';
import DoctorsPhilhealthCollection from './DoctorsPhilhealthCollection';
import AtcTestData from './AtcTestData';

const DashboardCensus = () => {
    const { user, checkUserType } = useAuth();
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
    <AppLayout>
        <PageHeader
			title="Dashboard"
			subtitle={
				<>
					Welcome back,{" "}
					<b className="text-black">{user?.name}</b>! 👋
				</>
			}
			// icon="rr-home"
		/>

        <div className="p-4 h-full ">
			{checkUserType("DOCTOR") ? (
				<TabGroup
					tabClassName={`py-3 bg-slate-100 border-b`}
					contents={[
						{
							title: (
								<MenuTitle src="/profile.png">
									News
								</MenuTitle>
							),
							content: (
								<Dashboard />
							),
						},
						{
							title: (
								<MenuTitle src="/profile.png">
									Satisfaction Rating
								</MenuTitle>
							),
							content: (
							<SatisfactoryRating />
							),
						},
						// {
						// 	title: (
						// 		<MenuTitle src="/patient.png">
						// 			Census
						// 		</MenuTitle>
						// 	),
						// 	content: (
						// 		<CauseConsultation />
						// 	),
						// },
						// {
						// 	title: (
						// 		<MenuTitle src="/patient.png">
						// 			Doctors Fee Collection
						// 		</MenuTitle>
						// 	),
						// 	content: (
						// 		<DoctorsPhilhealthCollection />
						// 	),
						// },
					]}
				/>
			) : checkUserType("CASHIER") ? (
				<TabGroup
					tabClassName={`py-3 bg-slate-100 border-b`}
					contents={[
						{
							title: (
								<MenuTitle src="/profile.png">
									News
								</MenuTitle>
							),
							content: (
								<Dashboard />
							),
						},
						{
							title: (
								<MenuTitle src="/profile.png">
									Satisfaction Rating
								</MenuTitle>
							),
							content: (
							<SatisfactoryRating 
							/>
							),
						},
						// {
						// 	title: (
						// 		<MenuTitle src="/patient.png">
						// 			Census
						// 		</MenuTitle>
						// 	),
						// 	content: (
						// 		<CauseConsultation />
						// 	),
						// },
						// {
						// 	title: (
						// 		<MenuTitle src="/patient.png">
						// 			Claims Monitoring
						// 		</MenuTitle>
						// 	),
						// 	content: (
						// 		<CashierClaimsMonitoring />
						// 	),
						// },
					]}
				/>
			) : checkUserType("NURSE") ? (
				<TabGroup
					tabClassName={`py-3 bg-slate-100 border-b`}
					contents={[
						{
							title: (
								<MenuTitle src="/profile.png">
									News
								</MenuTitle>
							),
							content: (
								<Dashboard />
							),
						},
						{
							title: (
								<MenuTitle src="/profile.png">
									Satisfaction Rating
								</MenuTitle>
							),
							content: (
							<SatisfactoryRating 
							/>
							),
						},
						// {
						// 	title: (
						// 		<MenuTitle src="/patient.png">
						// 			Census
						// 		</MenuTitle>
						// 	),
						// 	content: (
						// 		<CauseConsultation />
						// 	),
						// },
						// {
						// 	title: (
						// 		<MenuTitle src="/patient.png">
						// 			ATC TEST DATA 
						// 		</MenuTitle>
						// 	),
						// 	content: (
						// 		<AtcTestData />
						// 	),
						// },
					]}
				/>
			) : (
				<TabGroup
					tabClassName={`py-3 bg-slate-100 border-b`}
					contents={[
						{
							title: (
								<MenuTitle src="/profile.png">
									News
								</MenuTitle>
							),
							content: (
								<Dashboard />
							),
						},
						{
							title: (
								<MenuTitle src="/profile.png">
									Satisfaction Rating
								</MenuTitle>
							),
							content: (
							<SatisfactoryRating />
							),
						},
						// {
						// 	title: (
						// 		<MenuTitle src="/patient.png">
						// 			Census
						// 		</MenuTitle>
						// 	),
						// 	content: (
						// 		<CauseConsultation />
						// 	),
						// },
					]}
				/>
			)}
											
                        
        </div>
        <PromotionsModal ref={promotionModalRef} />
    </AppLayout>
  )
}

export default DashboardCensus

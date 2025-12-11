import React from 'react'
import FlatIcon from '../../FlatIcon';
import useDataTable from '../../../hooks/useDataTable';
import { doctorName, formatDateMMDDYYYY } from '../../../libs/helpers';
import Table from '../../table/Table';

const Status = ({ status }) => {
    const renderIcon = () => {
		switch (status) {
            case "not-performed":
				return <FlatIcon icon="rr-cross-small"/>;
			case "for-result-reading":  
            case "done":  
				return <FlatIcon icon="rr-check" />;
			default:
				return null;
		}
	};
	return (
        <span className="flex items-center justify-center gap-2 px-2 italic text-center rounded-2xl text-xs py-[2px]">
            {renderIcon()}
        </span>
	);
};
	// const konsultaData = [
	// 	...(appointment?.vital_id
	// 		? [
	// 				{
	// 					id: `vital-${appointment.vital_id}`,
	// 					order_status: 'done',
	// 					order_date: appointment?.created_at,
	// 					type: {
	// 						name: 'History and Physical Examination (vitals, anthropometrics...)',
	// 					},
	// 					relationships: {
	// 						doctor: appointment?.doctor ?? null,
	// 					},
	// 				},
	// 		]
	// 		: []),
	// 	...(data || []),
	// ];
    // console.log("Konsulta Service:", data)
const HsaEkasOrder = (props) => {
	const { patient } = props;

	const { loading, data } = useDataTable({
        url: `/v1/doctor/laboratory-order/patient-ekas`,
    });
	const konsultaData = [
		...(patient?.height || patient?.weight || patient?.temperature || patient?.pulse
			? [
				{
				id: `vital-${patient?.id}`,
				order_status: 'done',
				order_date: patient?.created_at,
				type: {
					name: 'History and Physical Examination (vitals, anthropometrics...)',
				},
				relationships: {
					doctor: patient?.createdBy ?? null,
				},
				},
			]
			: []),
		...(patient?.fbs_checker
			? [
				{
				id: `vital-${patient?.id}`,
				order_status: 'done',
				order_date: patient?.created_at,
				type: {
					name: 'Fasting Blood Sugar',
				},
				relationships: {
					doctor: patient?.createdBy ?? null,
				},
				},
			]
			: []),
		...(patient?.rbs_checker
			? [
				{
				id: `vital-${patient?.id}`,
				order_status: 'done',
				order_date: patient?.created_at,
				type: {
					name: 'Random Blood Sugar',
				},
				relationships: {
					doctor: patient?.createdBy ?? null,
				},
				},
			]
			: []),
		
		];

	console.log("Konsulta Service:", data);
  return (
    <div className='flex flex-col items-start'>
			<Table
				className={`pb-2`}
				loading={loading}
				columns={[
					{
						header: "Konsulta Services",
						className: "text-center",
						tdClassName: "text-left",
						key: "type",
						cell: (data) => {
							return (
								<div className="flex flex-col">
									<span className='text-xs'>{data?.type?.name}</span>
								</div>
							);
						},
					},
					
					{
						header: (<div className="flex flex-col text-xs text-center gap-2">
                           <span className="font-semibold"><FlatIcon icon="rr-check"/> Performed (nagawa)</span>
                            <span className="font-semibold"><FlatIcon icon="rr-cross-small"/> Not Performed (hindi nagawa)</span>
                        </div>),
						className: "item-center w-[150px]",
						tdClassName: "text-center",
						key: "order_status",
						cell: (data) => {
							return <Status status={data?.order_status} />;
						},
					},
                    {
						header: (<div className="flex flex-col text-xs text-center">
                          <span className="font-semibold">Date performed</span>
                          <span className="font-semibold">(petsa kung kelan ginawa)</span>
                        </div>),
						className: "text-left w-[150px]",
						tdClassName: "text-left w-[150px]",
						key: "date",
						cell: (data) => {
							return formatDateMMDDYYYY(
								new Date(data?.order_date)
							);
						},
					},
                    {
						header: (<div className="flex flex-col text-xs text-center">
                          <span className="font-semibold">Perform by (Ginawa ni)</span>
                              <span className="font-semibold">(Initial/Signature of Helath care Provider/Technician)</span>
                              <span className="font-semibold">(Initial o lagda ng Health care Provider/Technician</span>
                        </div>),
                        className: "text-left w-[150px]",
						tdClassName: "text-left w-[150px]",
						key: "doctor",
						cell: (data) => {
							return (
								<div className="flex flex-col">
									<span className="font-medium text-black -mb-[4px]">
										{doctorName(
											data?.relationships?.doctor
										)}
									</span>
								</div>
							);
						},
					},
					
				]}
				data={konsultaData}
			/>
			
    </div>
  )
}

export default HsaEkasOrder

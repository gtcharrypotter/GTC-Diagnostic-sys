/* eslint-disable react/prop-types */
import React from 'react'
import Table from '../../table/Table';
import useDataTable from '../../../hooks/useDataTable';
import FlatIcon from '../../FlatIcon';
import { doctorName, formatDateMMDDYYYY } from '../../../libs/helpers';

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

const PerformedOrder = (props) => {
    const {
        appointment,
        patient,
        laboratory_test_type,
        order_id,
    } = props;

    const { loading, data } = useDataTable({
        url: `/v1/doctor/laboratory-order/patient-ekas/${patient?.id}`,
        defaultFilters: {
            ...(order_id ? { order_id } : {}),
            ...(laboratory_test_type ? { laboratory_test_type } : {}),
            ...(appointment?.id > 0 ? { appointment_id: appointment?.id } : {}),
        },
    });

    // normalize doctor reference
    const konsultaData = [
        ...(appointment?.vital_id
            ? [
                {
                    id: `vital-${appointment.vital_id}`,
                    order_status: 'done',
                    order_date: appointment?.created_at,
                    type: {
                        name: 'History and Physical Examination (vitals, anthropometrics...)',
                    },
                    relationships: {
                        doctor: appointment?.doctor ?? null,
                    },
                },
            ]
            : []),
        ...(data || []).map(item => ({
            ...item,
            relationships: {
                ...item.relationships,
                doctor: item.relationships?.doctor 
                    ?? item.doctor 
                    ?? appointment?.doctor 
                    ?? null,
            },
        })),
    ];

    console.log("Konsulta Service:", konsultaData);

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
                        cell: (data) => (
                            <div className="flex flex-col">
                                <span className='text-xs'>{data?.type?.name}</span>
                            </div>
                        ),
                    },
                    {
                        header: (
                            <div className="flex flex-col text-xs text-center gap-2">
                                <span className="font-semibold"><FlatIcon icon="rr-check"/> Performed (nagawa)</span>
                                <span className="font-semibold"><FlatIcon icon="rr-cross-small"/> Not Performed (hindi nagawa)</span>
                            </div>
                        ),
                        className: "item-center w-[150px]",
                        tdClassName: "text-center",
                        key: "order_status",
                        cell: (data) => <Status status={data?.order_status} />,
                    },
                    {
                        header: (
                            <div className="flex flex-col text-xs text-center">
                                <span className="font-semibold">Date performed</span>
                                <span className="font-semibold">(petsa kung kelan ginawa)</span>
                            </div>
                        ),
                        className: "text-left w-[150px]",
                        tdClassName: "text-left w-[150px]",
                        key: "date",
                        cell: (data) => formatDateMMDDYYYY(new Date(data?.order_date)),
                    },
                    {
                        header: (
                            <div className="flex flex-col text-xs text-center">
                                <span className="font-semibold">Perform by (Ginawa ni)</span>
                                <span className="font-semibold">(Initial/Signature of Health care Provider/Technician)</span>
                            </div>
                        ),
                        className: "text-left w-[150px]",
                        tdClassName: "text-left w-[150px]",
                        key: "doctor",
                        cell: (data) => (
                            <div className="flex flex-col">
                                <span className="font-medium text-black -mb-[4px]">
                                    {doctorName(data?.relationships?.doctor)}
{/* 
									Dr OPD DOCTOR */}
                                </span>
                            </div>
                        ),
                    },
                ]}
                data={konsultaData}
            />
        </div>
    );
};

export default PerformedOrder;

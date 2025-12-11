/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import Table from '../components/table/Table';
import ActionBtn from '../components/buttons/ActionBtn';
import FlatIcon from '../components/FlatIcon';
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const CustomToolbar = ({ toolbar, onViewChange, }) => {
    const handleMonthChange = (direction) => {
        const newDate =
            direction === 'prev'
                ? moment(toolbar.date).subtract(1, 'month')
                : moment(toolbar.date).add(1, 'month');
        toolbar.onNavigate('DATE', newDate.toDate());
        onViewChange(newDate.month() + 1, newDate.year());
    };

    return (
        <div className="flex justify-between custom-toolbar m-2">
            <div className="flex gap-1 navigation-buttons">
                <ActionBtn
                    className="back-button bg-white"
                    onClick={() => handleMonthChange('prev')}
                >
                    <FlatIcon icon="rr-angle-left" className="text-black" />
                </ActionBtn>
                {/* <ActionBtn
                    className="today-button bg-white"
                    onClick={() => toolbar.onNavigate('TODAY')}
                >
                    <span className="text-black">Today</span>
                </ActionBtn> */}
                <ActionBtn
                    className="next-button bg-white"
                    onClick={() => handleMonthChange('next')}
                >
                    <FlatIcon icon="rr-angle-right" className="text-black" />
                </ActionBtn>
            </div>
            <div className="label text-center">
                <span className="text-black">
                    {moment(toolbar.date).format('MMMM YYYY')}
                </span>
            </div>
        </div>
    );
};

const DoctorsPhilhealthCollection = () => {
    const [loading, setLoading] = useState(false);
    const [doctorCollection, setDoctorCollection] = useState([]);
     const [currentMonth, setCurrentMonth] = useState(moment().month() + 1); // 1-based month
        const [currentYear, setCurrentYear] = useState(moment().year());
    const componentRef = useRef(null);
          const handlePrint = useReactToPrint({
            content: () => componentRef.current,
          });
  return (
    <div className="">
        <div className='flex flex-col gap-2 mx-auto'>
            <div className="flex flex-col text-lg font-semibold mb-4">
                <span className="text-xl font-bold text-blue-900">Doctors Philhealth Collection</span>
                <span className="text-sm font-light text-blue-900">Collection...</span>
                <div className="h-[1.5px] w-2/5 bg-indigo-300 mb-[0.5px]" />
                <div className="h-[1px] w-2/5 bg-red-300 mb-4" />
            </div>
            <div className="flex flex-col bg-white printable-area" ref={componentRef}>
                  <div className="">
							<div className="flex justify-center items-center my-4">
								<img
										src="/Province_of_Sarangani.png"
										className="w-24 h-24 object-contain "
									/>
							</div>
								<div className="text-sm text-center font-semibold">
								<span>SARANGANI PROVINCIAL HOSPITAL</span>
							</div>
							<div className="text-xs text-center font-light ">
								<span>Capitol Complex, Alabel, Sarangani</span>
							</div>
							<div className="text-xs text-center font-light ">
								<span>Tel. No. 083 508 0262</span>
							</div>
                            <div className="text-sm text-center font-semibold m-4">
								<span>Professional Fee</span>
							</div>
						
				</div>
                  <CustomToolbar
                                toolbar={{
                                    date: new Date(currentYear, currentMonth - 1),
                                    onNavigate: (action, date) => {
                                        if (action === 'TODAY') {
                                            const today = moment();
                                            setCurrentMonth(today.month() + 1);
                                            setCurrentYear(today.year());
                                        } else {
                                            setCurrentMonth(moment(date).month() + 1);
                                            setCurrentYear(moment(date).year());
                                        }
                                    },
                                }}
                                onViewChange={(month, year) => {
                                    setCurrentMonth(month);
                                    setCurrentYear(year);
                                }}
                                currentMonth={currentMonth}
                                currentYear={currentYear}
                            />
                <Table
                className="pb-2 table-auto"
                loading={loading}
                columns={[
                    { 
                        header: 'Date', 
                        className: 'text-center w-[150px]', 
                        tdClassName: 'text-left', 
                        key: 'date' },
                    {
                        header: 'Reference no.',
                        className: 'text-left w-[200px]',
                        tdClassName: 'text-left',
                        key: 'referenceNo',
                    },
                    {
                        header: 'Patient Name',
                        className: 'text-left w-[600px]',
                        tdClassName: 'text-left',
                        key: 'patientName',
                    },
                    {
                        header: 'Amount',
                        className: 'text-center w-[120px]',
                        tdClassName: 'text-center',
                        key: 'claimAmount',
                    },
                ]}
                data={doctorCollection}
            />
            <div className="flex ml-auto text-sm gap-2">
                <span className='font-semibold'>Amount Paid:</span>
                <span className='font-semibold'>1,000,000</span>
                <span className='font-semibold'>Pesos</span>
            </div>
            </div>
        </div>
        <ActionBtn
          type="primary-dark"
          className="mt-4"
          size="md"
          onClick={handlePrint}
        >
          <FlatIcon icon="rr-print" className="text-white mr-1" />
          Print
        </ActionBtn>
    </div>
  )
}

export default DoctorsPhilhealthCollection

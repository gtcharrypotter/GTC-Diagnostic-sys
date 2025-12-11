import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Pagination from '../components/table/Pagination';
import TextInput from '../components/inputs/TextInput';
import { useEffect, useRef, useState } from 'react';
import useDataTable from '../hooks/useDataTable';
import PatientWidget from '../components/PatientWidget';
import PatientSatisfactoryProfileModal from '../components/patient-modules/modals/PatientSatisfactoryProfileModal';
import { data } from 'autoprefixer';

const SatisfactoryRating = () => {
    const patientInfoRef = useRef(null);
    const [result, setResult] = useState(null);
    const {
        data: patients,
        setData: setPatients,
        loading,
        page,
        setPage,
        meta,
        filters,
        paginate,
        setPaginate,
        setFilters,
    } = useDataTable({
        url: `/v1/opd-standalone/satisfied-rating`,
    });
    const [overallSatisfaction, setOverallSatisfaction] = useState({
        verySatisfied: 0,
        neutral: 0,
        unsatisfied: 0,
    });
    const CustomLegend = ({ payload }) => (
    <div className="flex justify-center gap-4 mt-4">
        {payload.map((entry) => {
            let imgSrc = '';
            switch (entry.value) {
                case 'Very Satisfied':
                    imgSrc = '/happy.png';
                    break;
                case 'Neutral':
                    imgSrc = '/neutral.png';
                    break;
                case 'Unsatisfied':
                    imgSrc = '/sad.png';
                    break;
                default:
                    break;
            }
            return (
                <div key={entry.value} className="flex items-center gap-2">
                    <img src={imgSrc} alt={entry.value} className="h-6 w-6" />
                    <span>{entry.value}</span>
                </div>
            );
        })}
    </div>
);
    useEffect(() => {
        // Calculate overall satisfaction percentage
        if (patients.length > 0) {
            const totalPatients = patients.length;
            const verySatisfiedCount = patients.filter((data) => data.satisfaction === 'very satisfied').length;
            const neutralCount = patients.filter((data) => data.satisfaction === 'neutral').length;
            const unsatisfiedCount = patients.filter((data) => data.satisfaction === 'unsatisfied').length;
            setOverallSatisfaction({
                verySatisfied: ((verySatisfiedCount / totalPatients) * 100).toFixed(2),
                neutral: ((neutralCount / totalPatients) * 100).toFixed(2),
                unsatisfied: ((unsatisfiedCount / totalPatients) * 100).toFixed(2),
            });
        }
    }, [patients]);

    const updateData = (data) => {
        setResult(data);
        // Delay the update of the patient list by 1 second
        setTimeout(() => {
            // Filter the patients based on the selected satisfaction
            const filteredPatients = patients.filter((patient) => patient.satisfaction === data);
            setPatients(filteredPatients);
        }, 300); // 1 second delay
    };


    const satisfactionData = [
        { label: 'Very Satisfied', value: 'very satisfied', img: '/happy.png' },
        { label: 'Neutral', value: 'neutral', img: '/neutral.png' },
        { label: 'Unsatisfied', value: 'unsatisfied', img: '/sad.png' },
    ];

    // Preparing data for bar chart
    const barChartData = [
    { satisfaction: '', percentage: overallSatisfaction.verySatisfied },
    { satisfaction: '', percentage: overallSatisfaction.neutral },
    { satisfaction: '', percentage: overallSatisfaction.unsatisfied },
];
console.log("Patient Data:", patients)
    return (
        <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-y-4">
                    <div className="pr-5">
                        <TextInput
                            iconLeft={"rr-search"}
                            placeholder="Search patient..."
                            onChange={(e) => {
                                setFilters((prevFilters) => ({
                                    ...prevFilters,
                                    keyword: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    {/* Patient Widget Section */}
                    <div className="flex flex-col gap-y-4 relative">
                        <div className="flex flex-col gap-y-2 max-h-[calc(100vh-312px)] overflow-auto pr-5">
                            {patients?.map((data) => (
                                <PatientWidget 
                                appointment={data} 
                                onClick={() => {
											patientInfoRef.current.show(data);
										}}
                                key={`result-${data?.id}`}
                                />
                            ))}
                        </div>
                        
                    </div>
                </div>

                {/* Satisfactory Rating Section */}
                <div className="lg:col-span-7 xl:col-span-8">
                    <div className="flex flex-col gap-6">
                        {/* Overall Satisfaction */}
                        <div className="flex flex-col border rounded-md p-4 bg-white shadow-sm">
                            <span className="text-xl font-semibold">Overall Satisfaction Rating</span>
                            <span className="text-6xl font-bold mt-4">{overallSatisfaction.verySatisfied}%</span>
                        </div>

                       {/* Satisfaction Selection */}
                        <div className="flex justify-between border rounded-md p-4 bg-white shadow-sm">
                            {satisfactionData.map(({ label, value, img }) => (
                                <div
                                    key={value}
                                    className={`flex flex-col items-center gap-2 cursor-pointer ${
                                        result === value ? '!grayscale-0 bg-yellow-200 opacity-100' : 'opacity-70'
                                    } p-4 rounded-lg hover:grayscale-0 duration-200`}
                                    onClick={() => updateData(value)}
                                >
                                    <img className="h-16 w-16" src={img} alt={label} />
                                    <span className="text-lg font-semibold">{label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Bar Chart for Satisfaction */}
                            <div className="mt-4 mr-4 ">
                                    <BarChart
                                        width={1000}
                                        height={300}
                                        data={barChartData}
                                        layout="vertical" // Adjust for horizontal bars
                                    >
                                        <XAxis type="number"  tickFormatter={(value) => `${value}%`}/>
                                        <YAxis
                                            type="category"
                                            dataKey="satisfaction"
                                          
                                        />
                                        <Tooltip />
                                        <Legend content={<CustomLegend />} />
                                        
                                        {/* Very Satisfied Bar */}
                                        {overallSatisfaction.verySatisfied > 0 && (
                                            <Bar
                                                dataKey="percentage"
                                                name="Very Satisfied"
                                                fill="#34D399"
                                            />
                                        )}

                                        {/* Neutral Bar */}
                                        {overallSatisfaction.neutral > 0 && (
                                            <Bar
                                                dataKey="percentage"
                                                name="Neutral"
                                                fill="#F59E0B"
                                            />
                                        )}

                                        {/* Unsatisfied Bar */}
                                        {overallSatisfaction.unsatisfied > 0 && (
                                            <Bar
                                                dataKey="percentage"
                                                name="Unsatisfied"
                                                fill="#EF4444"
                                            />
                                        )}
                                    </BarChart>
                            </div>
                    </div>
                </div>
            </div>
            <PatientSatisfactoryProfileModal ref={patientInfoRef}/>
        </div>
    );
};

export default SatisfactoryRating;

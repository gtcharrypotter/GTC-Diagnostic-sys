import React, { useState } from 'react'
import useDataTable from '../../hooks/useDataTable';
import useNoBugUseEffect from '../../hooks/useNoBugUseEffect';
import Axios from '../../libs/axios';
import { useAuth } from '../../hooks/useAuth';
import { v4 as uuidv4 } from "uuid";
import Pagination from '../../components/table/Pagination';
import LoadingScreen from '../../components/loading-screens/LoadingScreen';
import TextInput from '../../components/inputs/TextInput';
import AppLayout from '../../components/container/AppLayout';
import { Fade } from 'react-reveal';
import ActionBtn from '../../components/buttons/ActionBtn';
import FlatIcon from '../../components/FlatIcon';
import DatabaseTable from '../../components/table/DatabaseTable';
import { formatDateMMDDYYYY } from '../../libs/helpers';
import PatientMenu from '../../components/buttons/PatientMenu';
import PatientProfile from '../patients/PatientProfile';
import TransmittalMenu from '../../components/buttons/TransmittalMenu';
import KonsultaPreparation from './KonsultaPreparation';
import EkonsultaPage from '../eclaims/EkonsultaPage';
import { data } from 'autoprefixer';
const uniq_id = uuidv4();
const KonsultaTransmittal = () => {
    const {
      data: appointments,
      setData: setAppointments,
      loading,
      page,
      setPage,
      meta,
      filters,
      paginate,
      setPaginate,
      setFilters,
    } = useDataTable({
      url: `/v1/clinic/appointments`,
      defaultFilters: {
        status: 'done'
      }
    });
	const [patient, setPatient] = useState(null);
	const [appointment, setAppointment] = useState(null);
	const [key, setKey] = useState(uniq_id);
    useNoBugUseEffect({
		functions: () => {
			setPaginate(10);
		},
	});
	const refreshData = () => {
		Axios.get(`v1/hospital/get-appointment/${appointment?.id}`).then(
			(res) => {
				setAppointment(res.data.data);
				setKey(uuidv4());
			}
		);
	};
    const { checkUserType } = useAuth();
    console.log('TRANSMITAL DATA', appointments)
  return (
    <EkonsultaPage>
      <div className="p-4 h-full overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 divide-x">
          <div className="lg:col-span-3 flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2 max-h-[calc(100vh-312px)] overflow-auto pr-5">
                <h1 className="text-xl font-bold font-opensans text-primary-dark tracking-wider -mb-1">
              Transmittal List
            </h1>
            <span className="noto-sans-thin text-slate-500 text-sm font-light">
              Patients service for transmittal
            </span>
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
              <div className="flex flex-col gap-y-4 relative">
                  {loading ? <LoadingScreen /> : ""}
                  <div className="flex flex-col gap-y-2 max-h-[calc(100vh-312px)] overflow-auto pr-5">
                        {appointments?.map((appointmentData) => {
                          return (
                            <TransmittalMenu
                              onClick={() => {
                                console.log(
                                  "setPatient",
                                  appointmentData
                                );
                                setPatient(appointmentData?.patient);
                                setAppointment(appointmentData);
                              }}
                              patient={appointmentData?.patient}
                              appointment={appointmentData}
                              active={
                                appointmentData?.patient?.id == patient?.id
                              }
                              key={`appointment-${appointmentData?.id}`}
                            />
                          );
                        })}
                      </div>
                      <Pagination
                        setPageSize={setPaginate}
                        page={page}
                        setPage={setPage}
                        pageCount={meta?.last_page}
                      />
                </div>
            </div>
          </div>
          <div className="lg:col-span-9 pl-4">
            <div className="flex flex-col gap-y-4">
              <h1 className="text-xl font-bold font-opensans text-success-dark tracking-wider -mb-1">
                Preparations...
              </h1>
              <span className="noto-sans-thin text-slate-500 text-sm font-light">
              Patients service for transmittal
              </span>
              {appointment ? (
                <Fade key={`patient-profile-${patient?.id}`}>
                  <KonsultaPreparation patient={patient} appointment={appointment} onSuccess={() => {
                        refreshData();
                      }} />
                </Fade>
              ) : (
                ""
              )}
            </div>
        </div>
       
      </div>
    </div>
    </EkonsultaPage>
  )
}

export default KonsultaTransmittal

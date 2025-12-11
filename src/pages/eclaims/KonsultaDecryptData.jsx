/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import Pagination from '../../components/table/Pagination';
import ContentTitle from '../../components/buttons/ContentTitle';
import Table from '../../components/table/Table';
import { v4 as uuidv4 } from "uuid";
import useDataTable from '../../hooks/useDataTable';
import FlatIcon from '../../components/FlatIcon';
import { useLocation } from 'react-router-dom';
import ActionBtn from '../../components/buttons/ActionBtn';
import { formatDateMMDDYYYY } from '../../libs/helpers';
import Axios from '../../libs/axios';
import TextInput from '../../components/inputs/TextInput';
import useNoBugUseEffect from '../../hooks/useNoBugUseEffect';
import EkonsultaPage from './EkonsultaPage';
import DatabaseTable from '../../components/table/DatabaseTable';
import { useAuth } from '../../hooks/useAuth';
import HsaSubmitXmlModal from '../../components/modal/HsaSubmitXmlModal';
import ConsultaSubmitXmlModal from '../../components/modal/ConsultaSubmitXmlModal';
const KonsultaDecryptData = () => {
	const submittionRef = useRef(null);
	const validateXmlRef = useRef(null);
	const [view, setView] = useState("members");
	const [searchInput, setSearchInput] = useState("");
	const {checkUserType} = useAuth();
	
    const {
		page,
		setPage,
		meta,
		setMeta,
		loading,
		setLoading,
		paginate,
		setPaginate,
		data,
		setData,
		column,
		setColumn,
		direction,
		setDirection,
		filters,
		setFilters,
	} = useDataTable({
		url: `v1/opd-standalone/philhealth/show-hsa-xml`,
	});
	useNoBugUseEffect(() => {
    if (searchInput.toLowerCase().includes("pin")) {
      setView("members");
    } else if (searchInput.toLowerCase().includes("pen")) {
      setView("dependents");
    }
  }, [searchInput]);
	const checkUploadStatus = async (data) => {
		try {
			const response = await Axios.post(
					`/v1/diagnostic/philhealth/check-upload-status}`,
					{
			transmittal_id: data.hsa_transaction_no, // Assuming `data` has `transmittalId`
					}
				);

			// Log or handle the successful response
			console.log('Upload status: ', response.data);

			// Optionally show a success message (can be replaced by modal, toast, etc.)
			alert('Upload status: ' + response.data.message);

		} catch (error) {
			console.error('Error checking upload status: ', error);
			alert('Failed to retrieve upload status');
		}
		};
	console.log("decrypted data", data)
  return (
	<EkonsultaPage>
		<div className="">
		<div className="flex items-center justify-center px-2 pt-2 pb-1 border-b-8">
			<img className="w-[144px] object-contain mr-2" src="/philhealth.png" />
			<div className="flex flex-col items-center mx-auto">
				<p className="text-xs text-center">
				<i>Republic of the Philippines</i>
				</p>
				<h4 className="font-bold text-xl text-center">
				PHILIPPINE HEALTH INSURANCE CORPORATION
				</h4>
				<p className="text-xs text-center">
				Citystate Centre 709 Shaw Boulevard, Pasig City
				</p>
				<p className="text-xs text-center">
				Call Center (02) 441-7442 l Trunkline (02) 441-7444
				</p>
				<p className="text-xs text-center">www.philhealth.gov.ph</p>
				<p className="text-xs text-center">
				email: actioncenter@philhealth.gov.ph
				</p>
			</div>
			<img className="w-[100px] object-contain ml-2" src="/benifits.png" />
			</div>
			
	<div className="flex flex-col p-4">
		
		<div className="flex flex-col justify-center items-center gap-4 mb-4">
			<TextInput
              label="Philhealth Identification No.(PIN)"
              placeholder="INPUT PIN..."
              onChange={(e) => {
                const keyword = e.target.value;
                setSearchInput(keyword); // Update search input state
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  keyword,
                }));
              }}
            />
			<div className="flex gap-4">
				<TextInput
              label="Lastname"
              placeholder="INPUT LASTNAME..."
              onChange={(e) => {
                const keyword = e.target.value;
                setSearchInput(keyword); // Update search input state
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  keyword,
                }));
              }}
            />
			<TextInput
              label="Firstname"
              placeholder="INPUT FIRSTNAME..."
              onChange={(e) => {
                const keyword = e.target.value;
                setSearchInput(keyword); // Update search input state
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  keyword,
                }));
              }}
            />
			<TextInput
              label="Middlename"
              placeholder="INPUT MIDDLENAME..."
              onChange={(e) => {
                const keyword = e.target.value;
                setSearchInput(keyword); // Update search input state
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  keyword,
                }));
              }}
            />
			</div>
		</div>
			<>
			<DatabaseTable
				className={`pb-2`}
				loading={loading}
				columns={[
					{
						header: 'eKonsulta',
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "action",
						cell:(data)=> {
							return (
								<div className='flex items-center justify-center flex-wrap gap-2'>
									{checkUserType("NURSE") ? (
										<ActionBtn
									size="sm"
									type="primary"
									onClick={() => {
										validateXmlRef.current.show();
										validateXmlRef.current.setAppointment(data); 
									}}
									disabled={data?.status === 'hsa-submitted' || data?.status === 'consult-submitted' || data?.vitals === null}
									>
										<FlatIcon 
										icon="rr-paper-plane"
										className="mr-1"
										/>
										HSA Upload
									</ActionBtn>
									) : (
										<ActionBtn
									size="sm"
									type="success"
									onClick={() => {
										submittionRef.current.show();
										submittionRef.current.setAppointment(data); 
									}}
									disabled={data?.status !== 'consultation-submitted'}
									>
										<FlatIcon 
										icon="rr-paper-plane"
										className="mr-1"
										/>
										Consult Upload
									</ActionBtn>
									)}
									
									
								</div>
							)
						}
					},
					{
						header: "Id",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "id",
						cell: (data) => data?.id || "-",
						
					},
					{
						header: "pUsername",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "registered_pin",
						cell: (data) => data?.username || "-",
						
					},
					{
						header: "pPassword",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "registered_pin",
						cell: (data) => data?.password || "-",
						
					},
					{
						header: "pHciAccreNo",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "registered_pin",
						cell: (data) => data?.accreditation_no || "-",
						
					},
					{
						header: "pPMCCNo",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "registered_pin",
						cell: (data) => data?.pmcc_number || "-",
						
					},
					{
						header: "pCertificationId",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "registered_pin",
						cell: (data) => data?.software_certificate || "-",
						
					},
					{
						header: "pEnlistTotalCnt",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "registered_pin",
						cell: (data) => data?.enlistment_stat || "-",
						
					},
					{
						header: "pProfileTotalCnt",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						// key: "registered_pin",
						// cell: (data) => data?.m_firstname || "-",
						
					},
					{
						header: "pSoaTotalCnt",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						// key: "registered_pin",
						// cell: (data) => data?.m_middlename || "-",
						
					},
					{
						header: "pHciTransmittalNumber",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "registered_pin",
						cell: (data) => data?.transmittal_no || "-",
						
					},
					{
						header: "HCIName",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "registered_pin",
						cell: (data) => data?.name || "-",
						
					},
					{
						header: "CipherKey",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "registered_pin",
						cell: (data) => data?.cipher_key || "-",
						
					},

					{
						header: "UserId",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "primary_pin",
						cell: (data) => data.appointment?.created_by || "-",
					},
					{
						header: "dateTrans",
						className: "w-[150px] text-center",
						tdClassName: "text-center",
						key: "created_at",
						cell: (data) => {
							return formatDateMMDDYYYY(
								new Date(data?.appointment?.created_at ) || "-"
							);
						} ,
					},

				]}
				data={data}
			/>
			<div className="flex justify-center w-full pt-4">
            <Pagination
                page={page}
                setPage={setPage}
                pageCount={meta?.last_page}
                pageSize={paginate}
                setPageSize={setPaginate}
            />
			<ConsultaSubmitXmlModal ref={submittionRef}
			appointment={data}
			patient={data?.patient}
			/>
			<HsaSubmitXmlModal ref={validateXmlRef}
			appointment={data}
			patient={data?.patient}
			/>
			</div>
			</>
		
		
			
			
			
		</div>
	</div>
	</EkonsultaPage>
	
        
   
  )
}

export default KonsultaDecryptData

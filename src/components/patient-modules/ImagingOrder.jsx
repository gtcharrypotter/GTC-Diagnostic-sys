/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import useDataTable from '../../hooks/useDataTable';
import useNoBugUseEffect from '../../hooks/useNoBugUseEffect';
import FlatIcon from '../FlatIcon';
import ContentTitle from '../buttons/ContentTitle';
import ActionBtn from '../buttons/ActionBtn';
import Table from '../table/Table';
import Pagination from '../table/Pagination';
import DeleteOrderModal from './modals/DeleteOrderModal';
import CreateLabOrderModal from './modals/CreateLabOrderModal';
import UploadADLESModal from './modals/imaging/ultrasound/UploadADLESModal';
import UploadAppendixModal from './modals/imaging/ultrasound/UploadAppendixModal';
import UploadAspirationModal from './modals/imaging/ultrasound/UploadAspirationModal';
import UploadAVDLEBModal from './modals/imaging/ultrasound/UploadAVDLEBModal';
import UploadAVDLESModal from './modals/imaging/ultrasound/UploadAVDLESModal';
import UploadBiopsyModal from './modals/imaging/ultrasound/UploadBiopsyModal';
import UploadBPSModal from './modals/imaging/ultrasound/UploadBPSModal';
import UploadBreastBothModal from './modals/imaging/ultrasound/UploadBreastBothModal';
import UploadBreastElastoModal from './modals/imaging/ultrasound/UploadBreastElastoModal';
import UploadBreastSingleModal from './modals/imaging/ultrasound/UploadBreastSingleModal';
import UploadChestThoraxModal from './modals/imaging/ultrasound/UploadChestThoraxModal';
import UploadHBTModal from './modals/imaging/ultrasound/UploadHBTModal';
import UploadInguinalModal from './modals/imaging/ultrasound/UploadInguinalModal';
import UploadInguinoscrotalModal from './modals/imaging/ultrasound/UploadInguinoscrotalModal';
import UploadKUBOnlyModal from './modals/imaging/ultrasound/UploadKUBOnlyModal';
import UploadKUBPelvisModal from './modals/imaging/ultrasound/UploadKUBPelvisModal';
import UploadKUBProstateModal from './modals/imaging/ultrasound/UploadKUBProstateModal';
import UploadLowerAbdomenModal from './modals/imaging/ultrasound/UploadLowerAbdomenModal';
import UploadNeckModal from './modals/imaging/ultrasound/UploadNeckModal';
import UploadNeckUSDModal from './modals/imaging/ultrasound/UploadNeckUSDModal';
import UploadPelvisModal from './modals/imaging/ultrasound/UploadPelvisModal';
import UploadPregnantModal from './modals/imaging/ultrasound/UploadPregnantModal';
import UploadScrotumModal from './modals/imaging/ultrasound/UploadScrotumModal';
import UploadSuperFacialSoftTissueModal from './modals/imaging/ultrasound/UploadSuperFacialSoftTissueModal';
import UploadThyroidUSDModal from './modals/imaging/ultrasound/UploadThyroidUSDModal';
import UploadTVSModal from './modals/imaging/ultrasound/UploadTVSModal';
import UploadUpperAbdomenModal from './modals/imaging/ultrasound/UploadUpperAbdomenModal';
import UploadVDLESModal from './modals/imaging/ultrasound/UploadVDLESModal';
import UploadWabAppendixModal from './modals/imaging/ultrasound/UploadWabAppendixModal';
import UploadWholeAbdomenModal from './modals/imaging/ultrasound/UploadWholeAbdomenModal';
import { doctorName, doctorSpecialty, formatDateMMDDYYYY } from '../../libs/helpers';
import { useAuth } from '../../hooks/useAuth';
import UploadAnkleAPLModal from './modals/imaging/xray/UploadAnkleAPLModal';
import UploadAnkleAPLPortableFeeModal from './modals/imaging/xray/UploadAnkleAPLPortableFeeModal';
import UploadAnkleBothAplPortableFeeModal from './modals/imaging/xray/UploadAnkleBothAplPortableFeeModal';
import UploadAnkleMortisseViewModal from './modals/imaging/xray/UploadAnkleMortisseViewModal';
import UploadArmAplRightModal from './modals/imaging/xray/UploadArmAplRightModal';
import UploadAxillaryViewPortableFeeModal from './modals/imaging/xray/UploadAxillaryViewPortableFeeModal';
import UploadCalcaneusLateralViewModal from './modals/imaging/xray/UploadCalcaneusLateralViewModal';
import UploadCalceneusPortableModal from './modals/imaging/xray/UploadCalceneusPortableModal';
import UploadCervicalAplObliquesModal from './modals/imaging/xray/UploadCervicalAplObliquesModal';
import UploadCervicalAplObliquesPortableFeeModal from './modals/imaging/xray/UploadCervicalAplObliquesPortableFeeModal';
import UploadCervicalApoModal from './modals/imaging/xray/UploadCervicalApoModal';
import UploadCervicothoracicModal from './modals/imaging/xray/UploadCervicothoracicModal';
import UploadChestAplPortableFeeModal from './modals/imaging/xray/UploadChestAplPortableFeeModal';
import UploadChestApPortableFeeModal from './modals/imaging/xray/UploadChestApPortableFeeModal';
import UploadChestConeDownViewModal from './modals/imaging/xray/UploadChestConeDownViewModal';
import UploadChestLateralViewOnlyModal from './modals/imaging/xray/UploadChestLateralViewOnlyModal';
import UploadChestPalPortableFeeModal from './modals/imaging/xray/UploadChestPalPortableFeeModal';
import UploadChestPAPortableFeeModal from './modals/imaging/xray/UploadChestPAPortableFeeModal';
import UploadChestRPOModal from './modals/imaging/xray/UploadChestRPOModal';
import UploadChestSpotViewLULFModal from './modals/imaging/xray/UploadChestSpotViewLULFModal';
import UploadChestSpotViewLULFPortableFeeModal from './modals/imaging/xray/UploadChestSpotViewLULFPortableFeeModal';
import UploadChestSpotViewRLLFModal from './modals/imaging/xray/UploadChestSpotViewRLLFModal';
import UploadChestSpotViewRLLFPortableFeeModal from './modals/imaging/xray/UploadChestSpotViewRLLFPortableFeeModal';
import UploadChestSpotViewRUModal from './modals/imaging/xray/UploadChestSpotViewRUModal';
import UploadChestSpotViewRUPortableFeeModal from './modals/imaging/xray/UploadChestSpotViewRUPortableFeeModal';
import UploadClavicleApWithCephalicModal from './modals/imaging/xray/UploadClavicleApWithCephalicModal';
import UploadClavicleRLPortableFee from './modals/imaging/xray/UploadClavicleRLPortableFee';
import UploadCoccyxAPLModal from './modals/imaging/xray/UploadCoccyxAPLModal';
import UploadCoccyxAPModal from './modals/imaging/xray/UploadCoccyxAPModal';
import UploadDigitAplApoPortableFeeModal from './modals/imaging/xray/UploadDigitAplApoPortableFeeModal';
import UploadElbowBothAplPortableFeeModal from './modals/imaging/xray/UploadElbowBothAplPortableFeeModal';
import UploadFootAPLBilateralModal from './modals/imaging/xray/UploadFootAPLBilateralModal';
import UploadFootAPLBilateralPortableFeeModal from './modals/imaging/xray/UploadFootAPLBilateralPortableFeeModal';
import UploadFootAPLBothModal from './modals/imaging/xray/UploadFootAPLBothModal';
import UploadFootAPLLeftModal from './modals/imaging/xray/UploadFootAPLLeftModal';
import UploadFootAPLLeftPortableFeeModal from './modals/imaging/xray/UploadFootAPLLeftPortableFeeModal';
import UploadFootAPOLeftModal from './modals/imaging/xray/UploadFootAPOLeftModal';
import UploadFootAPOLeftPortableFeeModal from './modals/imaging/xray/UploadFootAPOLeftPortableFeeModal';
import UploadFootAPORightModal from './modals/imaging/xray/UploadFootAPORightModal';
import UploadFootAPORightPortableFeeModal from './modals/imaging/xray/UploadFootAPORightPortableFeeModal';
import UploadFootApPortableFeeModal from './modals/imaging/xray/UploadFootApPortableFeeModal';
import UploadFootLateralViewRightModal from './modals/imaging/xray/UploadFootLateralViewRightModal';
import UploadFootLateralViewRightPortableFeeModal from './modals/imaging/xray/UploadFootLateralViewRightPortableFeeModal';
import UploadForearmBothAPLPortableFeeModal from './modals/imaging/xray/UploadForearmBothAPLPortableFeeModal';
import UploadHandAPLRightPortableFeeModal from './modals/imaging/xray/UploadHandAPLRightPortableFeeModal';
import UploadHandAPOLeftModal from './modals/imaging/xray/UploadHandAPOLeftModal';
import UploadHandLateralViewRightModal from './modals/imaging/xray/UploadHandLateralViewRightModal';
import UploadHandLateralViewRightPortableFeeModal from './modals/imaging/xray/UploadHandLateralViewRightPortableFeeModal';
import UploadHandLeftBoneAgingModal from './modals/imaging/xray/UploadHandLeftBoneAgingModal';
import UploadHandLeftBoneAgingPortableFeeModal from './modals/imaging/xray/UploadHandLeftBoneAgingPortableFeeModal';
import UploadHardCopyImageXRayModal from './modals/imaging/xray/UploadHardCopyImageXRayModal';
import UploadHIPAPCTAPLModal from './modals/imaging/xray/UploadHIPAPCTAPLModal';
import UploadHIPAPCTAPLPortableFeeModal from './modals/imaging/xray/UploadHIPAPCTAPLPortableFeeModal';
import UploadHumerusAPModal from './modals/imaging/xray/UploadHumerusAPModal';
import UploadHumerusBothAPLPortableFeeModal from './modals/imaging/xray/UploadHumerusBothAPLPortableFeeModal';
import UploadIntraOPX3ShotsModal from './modals/imaging/xray/UploadIntraOPX3ShotsModal';
import UploadIntraOPX4ShotsModal from './modals/imaging/xray/UploadIntraOPX4ShotsModal';
import UploadIVPX2ShotsModal from './modals/imaging/xray/UploadIVPX2ShotsModal';
import UploadIVPX3ShotsModal from './modals/imaging/xray/UploadIVPX3ShotsModal';
import UploadIVPX5ShotsModal from './modals/imaging/xray/UploadIVPX5ShotsModal';
import UploadIVPX6ShotsModal from './modals/imaging/xray/UploadIVPX6ShotsModal';
import UploadIVPX7ShotsModal from './modals/imaging/xray/UploadIVPX7ShotsModal';
import UploadIVPX8ShotsModal from './modals/imaging/xray/UploadIVPX8ShotsModal';
import UploadJudetViewLeftHipJointModal from './modals/imaging/xray/UploadJudetViewLeftHipJointModal';
import UploadJudetViewLeftHipJointPortableFeeModal from './modals/imaging/xray/UploadJudetViewLeftHipJointPortableFeeModal';
import UploadJudetViewRightHipJointPortableFeeModal from './modals/imaging/xray/UploadJudetViewRightHipJointPortableFeeModal';
import UploadKneeAPLLeftModal from './modals/imaging/xray/UploadKneeAPLLeftModal';
import UploadKneeAPLLeftPortableFeeModal from './modals/imaging/xray/UploadKneeAPLLeftPortableFeeModal';
import UploadKneesBothAPLModal from './modals/imaging/xray/UploadKneesBothAPLModal';
import UploadKneesBothAPLPortableFeeModal from './modals/imaging/xray/UploadKneesBothAPLPortableFeeModal';
import UploadKneeTunnelViewLeftPortableFeeModal from './modals/imaging/xray/UploadKneeTunnelViewLeftPortableFeeModal';
import UploadKneeTunnelViewRightModal from './modals/imaging/xray/UploadKneeTunnelViewRightModal';
import UploadKUBXRayPortableFeeModal from './modals/imaging/xray/UploadKUBXRayPortableFeeModal';
import UploadLegAPLPortableFeeModal from './modals/imaging/xray/UploadLegAPLPortableFeeModal';
import UploadLegAPLRightModal from './modals/imaging/xray/UploadLegAPLRightModal';
import UploadLumbarAPLPortableFeeModal from './modals/imaging/xray/UploadLumbarAPLPortableFeeModal';
import UploadLumbosacralLSObliqueModal from './modals/imaging/xray/UploadLumbosacralLSObliqueModal';
import UploadLumbosacralLSObliquePortableFeeModal from './modals/imaging/xray/UploadLumbosacralLSObliquePortableFeeModal';
import UploadLumbosacralSpineAPLObliquePortableFeeModal from './modals/imaging/xray/UploadLumbosacralSpineAPLObliquePortableFeeModal';
import UploadLumbosacralSpineAPLPortableFeeModal from './modals/imaging/xray/UploadLumbosacralSpineAPLPortableFeeModal';
import UploadMandibleAPOPortableFeeModal from './modals/imaging/xray/UploadMandibleAPOPortableFeeModal';
import UploadMastoidSeriesModal from './modals/imaging/xray/UploadMastoidSeriesModal';
import UploadMastoidSeriesPortableFeeModal from './modals/imaging/xray/UploadMastoidSeriesPortableFeeModal';
import UploadNasalBonePortableFeeModal from './modals/imaging/xray/UploadNasalBonePortableFeeModal';
import UploadOrbitCaldwellPortableFeeModal from './modals/imaging/xray/UploadOrbitCaldwellPortableFeeModal';
import UploadOrbitWaterAndCaldwellPortableFeeModal from './modals/imaging/xray/UploadOrbitWaterAndCaldwellPortableFeeModal';
import UploadOSCalcisViewPortableFeeModal from './modals/imaging/xray/UploadOSCalcisViewPortableFeeModal';
import UploadParanasalSinusesPortableFeeModal from './modals/imaging/xray/UploadParanasalSinusesPortableFeeModal';
import UploadPelvisAPLPortableFeeModal from './modals/imaging/xray/UploadPelvisAPLPortableFeeModal';
import UploadPelvisAPPortableFeeModal from './modals/imaging/xray/UploadPelvisAPPortableFeeModal';
import UploadRGPX1ShotModal from './modals/imaging/xray/UploadRGPX1ShotModal';
import UploadRGPX2ShotModal from './modals/imaging/xray/UploadRGPX2ShotModal';
import UploadRGPX3ShotModal from './modals/imaging/xray/UploadRGPX3ShotModal';
import UploadRGPX4ShotModal from './modals/imaging/xray/UploadRGPX4ShotModal';
import UploadRGPX5ShotModal from './modals/imaging/xray/UploadRGPX5ShotModal';
import UploadScapulaLATPortableFeeModal from './modals/imaging/xray/UploadScapulaLATPortableFeeModal';
import UploadScoliosisSeriesModal from './modals/imaging/xray/UploadScoliosisSeriesModal';
import UploadScoliosisSeriesPortableFeeModal from './modals/imaging/xray/UploadScoliosisSeriesPortableFeeModal';
import UploadSecondCopyOfResultOPDOnlyModal from './modals/imaging/xray/UploadSecondCopyOfResultOPDOnlyModal';
import UploadShoulderAPLPortableFeeModal from './modals/imaging/xray/UploadShoulderAPLPortableFeeModal';
import UploadShoulderAPORPortableFeeModal from './modals/imaging/xray/UploadShoulderAPORPortableFeeModal';
import UploadShoulderAPRPortableFeeModal from './modals/imaging/xray/UploadShoulderAPRPortableFeeModal';
import UploadSkullAPPortableFeeModal from './modals/imaging/xray/UploadSkullAPPortableFeeModal';
import UploadSkullLateralViewPortableFeeModal from './modals/imaging/xray/UploadSkullLateralViewPortableFeeModal';
import UploadSkullSeriesAPLTownesViewsPortableFeeModal from './modals/imaging/xray/UploadSkullSeriesAPLTownesViewsPortableFeeModal';
import UploadSkullSubmentovertexPortableFeeModal from './modals/imaging/xray/UploadSkullSubmentovertexPortableFeeModal';
import UploadSkullWatersViewPortableFeeModal from './modals/imaging/xray/UploadSkullWatersViewPortableFeeModal';
import UploadTBCAPLModal from './modals/imaging/xray/UploadTBCAPLModal';
import UploadTBCwithObliquesModal from './modals/imaging/xray/UploadTBCwithObliquesModal';
import UploadTemporoMandibularJointPortableFeeModal from './modals/imaging/xray/UploadTemporoMandibularJointPortableFeeModal';
import UploadThoracicBonyCageAPLPortableFeeModal from './modals/imaging/xray/UploadThoracicBonyCageAPLPortableFeeModal';
import UploadThoracicBonyCageAPPortableFeeModal from './modals/imaging/xray/UploadThoracicBonyCageAPPortableFeeModal';
import UploadThoracicBonyCageRandLObliquePortableFeeModal from './modals/imaging/xray/UploadThoracicBonyCageRandLObliquePortableFeeModal';
import UploadThoracicBonyCageWithObliquesPortableFeeModal from './modals/imaging/xray/UploadThoracicBonyCageWithObliquesPortableFeeModal';
import UploadThoracoBonyCageTBCwithObliquesModal from './modals/imaging/xray/UploadThoracoBonyCageTBCwithObliquesModal';
import UploadThoracolumbarAPLModal from './modals/imaging/xray/UploadThoracolumbarAPLModal';
import UploadThoracolumbarAPModal from './modals/imaging/xray/UploadThoracolumbarAPModal';
import UploadTibialPlateauBothObliquesModal from './modals/imaging/xray/UploadTibialPlateauBothObliquesModal';
import UploadWirstAPOLeftModal from './modals/imaging/xray/UploadWirstAPOLeftModal';
import UploadWristAPLLeftModal from './modals/imaging/xray/UploadWristAPLLeftModal';
import UploadWristAPOPortableFeeModal from './modals/imaging/xray/UploadWristAPOPortableFeeModal';
import UploadWristAPORightModal from './modals/imaging/xray/UploadWristAPORightModal';
import UploadWristBothAPLModal from './modals/imaging/xray/UploadWristBothAPLModal';
import ViewImgResultModal from './modals/ViewImgResultModal';
import RefusedOrderModal from './modals/RefusedOrderModal';

const Status = ({ status }) => {
	const color = () => {
		switch (status) {
			case "pending":
				return " text-red-700";
			case "final-result":
				return " text-blue-700";
			case "for-result-reading":
				return " text-green-700";
			default:
				return " text-white";
		}
	};
	return (
		<span
			className={`${color()} px-2 italic text-center rounded-2xl text-xs py-[2px]`}
		>
			{status}
		</span>
	);
};
const ImagingOrder = (props) => {
  const {
		showTitle = true,
		appointment,
		patient,
		laboratory_test_type,
		allowCreate = true,
		onUploadLabResultSuccess,
		order_id,
	} = props;
	const { user } = useAuth();

	const isLaboratoryUser = () => {
		return user?.type == "GCE-IMAGING" || user?.type == "GCE-LABORATORY";
	};
	const isXrayUser = () => {
		return user?.type === "GCE-IMAGING";
	};
	// const testHeader = isXrayUser() ? "Imaging Test" : "Laboratory Test";
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
		reloadData,
	} = useDataTable({
		url: `/v1/doctor/laboratory-order/patient/${patient?.id}`,
		defaultFilters: {
			...(order_id ? { order_id: order_id } : {}),
			...(laboratory_test_type
				? { laboratory_test_type: laboratory_test_type }
				: {}),
			...(appointment?.id > 0 ? { appointment_id: appointment?.id } : {}),
		},
	});
	
	useNoBugUseEffect({
		functions: () => {
			setFilters((prevFilters) => ({
				...prevFilters,

				order_id: order_id,
			}));
		},
	});
	const createLabOrderRef = useRef(null);
	const uploadLabResultRef = useRef(null);
	const viewImgResultRef = useRef(null);

	//chemistry ref
	const uploadADLESRef = useRef(null);
	const uploadAppendixRef = useRef(null);
	const uploadGuidedAspirationRef = useRef(null);
	const uploadAVDLEBRef = useRef(null);
	const uploadAVDLESRef = useRef(null);
	const uploadGuidedBiopsyRef = useRef(null);
	const uploadBPSRef = useRef(null);
	const uploadBreastBothRef = useRef(null);
	const uploadBreastElastoRef = useRef(null);
	const uploadBreastUSDSingleRef = useRef(null);
	const uploadChestThoraxRef = useRef(null);
	const uploadHBTRef = useRef(null);
	const uploadInguinalRef = useRef(null);
	const uploadInguinoscrotalRef = useRef(null);
	const uploadKUBOnlyRef = useRef(null);
	const uploadKUBPelvisRef = useRef(null);
	const uploadKUBProstateRef = useRef(null);
	const uploadLowerAbdomenRef = useRef(null);
	const uploadNeckRef = useRef(null);
	const uploadNeckUsdRef = useRef(null);
	const uploadPelvisRef = useRef(null);
	const uploadPregnantRef = useRef(null);
	const uploadScrotumRef = useRef(null);
	const uploadSuperficialRef = useRef(null);
	const uploadThyroidUSDRef = useRef(null);
	const uploadTVSRef = useRef(null);
	const uploadUpperAbdomenRef = useRef(null);
	const uploadVDLESRef = useRef(null);
	const uploadWabAppendixRef = useRef(null);
	const uploadWholeAbdomenRef = useRef(null);

	const uploadAnkleAPLAporef = useRef(null);
	const uploadAnkleAPLApoPFref = useRef(null);
	const uploadAMVRPFref = useRef(null);
	const uploadAnkleBothAPLPFref = useRef(null);
	const uploadArmAplRightref = useRef(null);
	const uploadAxillaryViewPFref = useRef(null);
	const uploadCalcaneusLateralViewref = useRef(null);
	const uploadCalcaneusPortableref = useRef(null);
	const uploadCervicalAPLObliquesref = useRef(null);
	const uploadCervicalAPLOPref = useRef(null);
	const uploadCervicalAPOref = useRef(null);
	const uploadCervicothoracicSpineAPLref = useRef(null);
	const uploadChestAPLPFref = useRef(null);
	const uploadChestAPPFref = useRef(null);
	const uploadChestConeDownViewPFref = useRef(null);
	const uploadChestLateralViewOnlyPFref = useRef(null);
	const uploadCheastPalPFref = useRef(null);
	const uploadCheastPAPFref = useRef(null);
	const uploadCheastRPOref = useRef(null);
	const uploadChestSpotViewLeftUpperLFref = useRef(null);
	const uploadChestSpotViewLeftUpperLFPFref = useRef(null);
	const uploadChestSpotViewRightLowerLFref = useRef(null);
	const uploadChestSpotViewRightLowerLFPFref = useRef(null);
	const uploadChestSpotViewRightUlfref = useRef(null);
	const uploadChestSpotViewRightUlfPFref = useRef(null);
	const uploadClavincleAPCephalicTiltPFref = useRef(null);
	const uploadClavinceRightLeftPFref = useRef(null);
	const uploadCoccyxAPLPFref = useRef(null);
	const uploadCoccyxAPPFref = useRef(null);
	const uploadDigitAPLAPOPFref = useRef(null);
	const uploadElbowBothAPLPFref = useRef(null);
	const uploadFootAPLBilateralref = useRef(null);
	const uploadFootAPLBilateralPFref = useRef(null);
	const uploadFootAPLBothref = useRef(null);
	const uploadFootAPLLeftref = useRef(null);
	const uploadFootAPLLeftPFref = useRef(null);
	const uploadFootAPOLeftref = useRef(null);
	const uploadFootAPOLeftPFref = useRef(null);
	const uploadFootAPORightref = useRef(null);
	const uploadFootAPORightPFref = useRef(null);
	const uploadFootAPPFref = useRef(null);
	const uploadFootLateralViewRightref = useRef(null);
	const uploadFootLateralViewRightPFref = useRef(null);
	const uploadForearmBothAPLPFref = useRef(null);
	const uploadHandAPLRightPFref = useRef(null);
	const uploadHandAPOLeftref = useRef(null);
	const uploadHandLateralViewRightref = useRef(null);
	const uploadHandLateralViewRightPFref = useRef(null);
	const uploadHandLeftBoneAgingref = useRef(null);
	const uploadHandLeftBoneAgingPFref = useRef(null);
	const uploadHardCopyImageXrayref = useRef(null);
	const uploadHIPAPCTAPLref = useRef(null);
	const uploadHIPAPCTAPLPFref = useRef(null);
	const uploadHumerusAPref = useRef(null);
	const uploadHumerusBothAPLPFref = useRef(null);
	const uploadIntraOP3Shotsref = useRef(null);
	const uploadIntraOP4Shotsref = useRef(null);
	const uploadIVP2Shotsref = useRef(null);
	const uploadIVP3Shotsref = useRef(null);
	const uploadIVP5Shotsref = useRef(null);
	const uploadIVP6Shotsref = useRef(null);
	const uploadIVP7Shotsref = useRef(null);
	const uploadIVP8Shotsref = useRef(null);
	const uploadJudetViewLeftHIPJointref = useRef(null);
	const uploadJudetViewLeftHIPJointPFref = useRef(null);
	const uploadJudetViewRightHIPJointPFref = useRef(null);
	const uploadKneeAPLLeftref = useRef(null);
	const uploadKneeAPLLeftPFref = useRef(null);
	const uploadKneeBothAPLref = useRef(null);
	const uploadKneeBothAPLPFref = useRef(null);
	const uploadKneeTunnelViewLeftPFref = useRef(null);
	const uploadKneeTunnelViewRightref = useRef(null);
	const uploadKubXrayPFref = useRef(null);
	const uploadLegAPLPFref = useRef(null);
	const uploadLegAPLRightref = useRef(null);
	const uploadLumbarAPLPFref = useRef(null);
	const uploadLumbosacralLSObliqueref = useRef(null);
	const uploadLumbosacralLSObliquePFref = useRef(null);
	const uploadLumbosacralSpineAPLObliquePFref = useRef(null);
	const uploadLumbroscralSpineAPLPFref = useRef(null);
	const uploadMandibleAPOPFref = useRef(null);
	const uploadMastoidSeriesref = useRef(null);
	const uploadMastoidSeriesPFref = useRef(null);
	const uploadNasalBonePFref = useRef(null);
	const uploadOrbitCaldwellPFref = useRef(null);
	const uploadOrbitWaterCaldwellPFref = useRef(null);
	const uploadOSCalcisViewPFref = useRef(null);
	const uploadParanasalSinusesPFref = useRef(null);
	const uploadPelvisAPLPFref = useRef(null);
	const uploadPelvisAPPFref = useRef(null);
	const uploadRGP1Shotref = useRef(null);
	const uploadRGP2Shotref = useRef(null);
	const uploadRGP3Shotref = useRef(null);
	const uploadRGP4Shotref = useRef(null);
	const uploadRGP5Shotref = useRef(null);
	const uploadScapulaLatPFref = useRef(null);
	const uploadScoliosisSeriesref = useRef(null);
	const uploadScoliosisSeriesPFref = useRef(null);
	const uploadSecondCopyOfResultOPDOnlyref = useRef(null);
	const uploadShoulderAPLPFref = useRef(null);
	const uploadShoulderAPORPFref = useRef(null);
	const uploadShoulderAPRPFref = useRef(null);
	const uploadSkullAPPFref = useRef(null);
	const uploadSkullLateralViewPFref = useRef(null);
	const uploadSkullSeriesAPLTownesViewPFref = useRef(null);
	const uploadSkullSubmentovertexPFref = useRef(null);
	const uploadSkullWaterViewPFref = useRef(null);
	const uploadTBCAPLref = useRef(null);
	const uploadTBCObliquesref = useRef(null);
	const uploadTemporoMandibularJointPFref = useRef(null);
	const uploadThoracicBonyCageAPLPFref = useRef(null);
	const uploadThoracicBonyCageAPPFref = useRef(null);
	const uploadThoracicBonyCageRLObliquePFref = useRef(null);
	const uploadThoracicBonyCageObliquePFref = useRef(null);
	const uploadThroracicBonyCageTBCObliquesref = useRef(null);
	const uploadThrocolumbarAPLref = useRef(null);
	const uploadThrocolumbarAPref = useRef(null);
	const uploadTibialPlateauBothObliquesref = useRef(null);
	const uploadWristAPOLeftref = useRef(null);
	const uploadWristAPLLeftref = useRef(null);
	const uploadWristAPOPFref = useRef(null);
	const uploadWristAPORightref = useRef(null);
	const uploadWristBothAPLref = useRef(null);


	const deleteLabOrderRef = useRef(null);
	const refusedOrderRef = useRef(null);
	const isDoctor = () => {
		return String(user?.type || "")
			.toLowerCase()
			.includes("doctor");
	};

	const renderResultCell = (data) => {
    if (data?.order_status === "pending") {
        if (isXrayUser()) {
            const imgModalRefs = {
				//Chemistry
                "ARTERIAL  DOPPLER LOWER EXT SINGLE": uploadADLESRef,
                "APPENDIX": uploadAppendixRef,
                "GUIDED ASPIRATION": uploadGuidedAspirationRef,
                "ARTERIOVENOUS DOPPLER LOWER EXT BOTH": uploadAVDLEBRef,
                "ARTERIOVENOUS DOPPLER LOWER EXT SINGLE": uploadAVDLESRef,
                "GUIDED BIOPSY": uploadGuidedBiopsyRef,
                "BPS": uploadBPSRef,
                "BREAST BOTH": uploadBreastBothRef,
                "BREAST ELASTO": uploadBreastElastoRef,
                "BREAST ULTRASOUND (SINGLE)": uploadBreastUSDSingleRef,
                "CHEST / THORAX": uploadChestThoraxRef,
                "HBT": uploadHBTRef,
				"INGUINAL ULTRASOUND": uploadInguinalRef,
                "INGUINOSCROTAL": uploadInguinoscrotalRef,
                "KUB ONLY": uploadKUBOnlyRef,
                "KUB/PELVIS ULTRASOUND": uploadKUBPelvisRef,
                "KUB/PROSTATE": uploadKUBProstateRef,
                "LOWER ABDOMEN": uploadLowerAbdomenRef,
                "NECK": uploadNeckRef,
                "NECK USD": uploadNeckUsdRef,
				"PELVIS": uploadPelvisRef,
                "PREGNANT": uploadPregnantRef,
                "SCROTUM/ TESTES": uploadScrotumRef,
                "SUPERFICIAL SOFT TISSUE": uploadSuperficialRef,
                "THYROID USD": uploadThyroidUSDRef,
                "TVS": uploadTVSRef,
				"UPPER ABDOMEN": uploadUpperAbdomenRef,
				"VENOUS DOPPLER LOWER EXT SINGLE": uploadVDLESRef,
                "WAB + APPENDIX": uploadWabAppendixRef,
                "WHOLE ABDOMEN": uploadWholeAbdomenRef,

				"ANKLE APL/APO": uploadAnkleAPLAporef,
				"ANKLE APL/APO + PORTABLE FEE": uploadAnkleAPLApoPFref,
                "ANKLE BOTH APL + PORTABLE FEE": uploadAMVRPFref,
                "ANKLE MORTISSE VIEW (RIGHT) + PORTABLE FEE": uploadAnkleBothAPLPFref,
				"ARM APL RIGHT": uploadArmAplRightref,
				"AXILLARY VIEW + PORTABLE FEE": uploadAxillaryViewPFref,
				"CALCANEUS (LATERAL VIEW)": uploadCalcaneusLateralViewref,
                "CALCANEUS + PORTABLE": uploadCalcaneusPortableref,
                "CERVICAL APL + OBLIQUES": uploadCervicalAPLObliquesref,
				"CERVICAL APL + OBLIQUES + PORTABLE FEE": uploadCervicalAPLOPref,
				"CERVICAL APO": uploadCervicalAPOref,
				"CERVICOTHORACIC SPINE APL": uploadCervicothoracicSpineAPLref,
                "CHEST APL + PORTABLE FEE": uploadChestAPLPFref,
                "CHEST AP + PORTABLE FEE": uploadChestAPPFref,
				"CHEST CONE DOWN VIEW + PORTABLE FEE": uploadChestConeDownViewPFref,
				"Chest Lateral View Only + PORTABLE FEE": uploadChestLateralViewOnlyPFref,
				"CHEAST PAL + PORTABLE FEE": uploadCheastPalPFref,
                "CHEST PA + PORTABLE FEE": uploadCheastPAPFref,
                "CHEST RPO  RIGHT POSTERIOR OBLIQUE ": uploadCheastRPOref,
				"CHEST SPOT VIEW LEFT UPPER LF": uploadChestSpotViewLeftUpperLFref,
				"CHEST SPOT VIEW LEFT UPPER LF + PORTABLE FEE": uploadChestSpotViewLeftUpperLFPFref,
				"CHEST SPOT VIEW RIGHT LOWER LF": uploadChestSpotViewRightLowerLFref,
                "CHEST SPOT VIEW RIGHT LOWER LF + PORTABLE FEE": uploadChestSpotViewRightLowerLFPFref,
                "CHEST SPOT VIEW RIGHT ULF": uploadChestSpotViewRightUlfref,
				"CHEST SPOT VIEW RIGHT ULF + PORTABLE FEE": uploadChestSpotViewRightUlfPFref,
				"CLAVICLE AP WITH CEPHALIC TILT+ PORTABLE FEE": uploadClavincleAPCephalicTiltPFref,
				"CLAVICLE R and L+ PORTABLE FEE": uploadClavinceRightLeftPFref,
                "COCCYX APL + PORTABLE FEE": uploadCoccyxAPLPFref,
                "COCCYX AP + PORTABLE FEE": uploadCoccyxAPPFref,
				"DIGIT APL/APO+ PORTABLE FEE": uploadDigitAPLAPOPFref,
				"Elbow, Both APL+ PORTABLE FEE": uploadElbowBothAPLPFref,
				"Foot APL  BILATERAL ": uploadFootAPLBilateralref,
                "Foot APL  BILATERAL + PORTABLE FEE": uploadFootAPLBilateralPFref,
                "FOOT APL BOTH": uploadFootAPLBothref,
				"Foot APL  left ": uploadFootAPLLeftref,
				"FOOT APL  Left + PORTABLE FEE": uploadFootAPLLeftPFref,
				"FOOT APO  Left ": uploadFootAPOLeftref,
                "Foot APO  left + PORTABLE FEE": uploadFootAPOLeftPFref,
                "Foot APO  right ": uploadFootAPORightref,
				"Foot APO  right + PORTABLE FEE": uploadFootAPORightPFref,
				"FOOT AP+ PORTABLE FEE": uploadFootAPPFref,
				"Foot Lateral View  right ": uploadFootLateralViewRightref,
                "Foot Lateral View  right + PORTABLE FEE": uploadFootLateralViewRightPFref,
                "Forearm, Both APL+ PORTABLE FEE": uploadForearmBothAPLPFref,
				"HAND APL RIGHT + PORTABLE FEE": uploadHandAPLRightPFref,
				"Hand APO  left ": uploadHandAPOLeftref,
				"Hand Lateral View  right ": uploadHandLateralViewRightref,
                "Hand Lateral View  right + PORTABLE FEE": uploadHandLateralViewRightPFref,
                "Hand Left  Bone Aging ": uploadHandLeftBoneAgingref,
				"Hand Left  Bone Aging + PORTABLE FEE": uploadHandLeftBoneAgingPFref,
				"HARD COPY IMAGE X-RAY": uploadHardCopyImageXrayref,
				"HIP AP / CT APL": uploadHIPAPCTAPLref,
                "HIP AP / CT APL+ PORTABLE FEE": uploadHIPAPCTAPLPFref,
                "Humerus AP": uploadHumerusAPref,
				"Humerus, Both APL + PORTABLE FEE": uploadHumerusBothAPLPFref,
				"INTRA-OP X 3 SHOTS": uploadIntraOP3Shotsref,
				"INTRA-OP X 4 SHOTS": uploadIntraOP4Shotsref,
                "IVP X 2 SHOTS": uploadIVP2Shotsref,
                "IVP X 3 SHOTS": uploadIVP3Shotsref,
				"IVP X 5 SHOTS": uploadIVP5Shotsref,
				"IVP X 6 SHOTS": uploadIVP6Shotsref,
				"IVP X 7 SHOTS": uploadIVP7Shotsref,
                "IVP X 8 SHOTS": uploadIVP8Shotsref,
                "JUDET VIEW-LEFT,HIP JOINT": uploadJudetViewLeftHIPJointref,
				"JUDET VIEW-LEFT,HIP JOINT+ PORTABLE FEE": uploadJudetViewLeftHIPJointPFref,
				"JUDET VIEW-RIGHT,HIP JOINT+ PORTABLE FEE": uploadJudetViewRightHIPJointPFref,
				"Knee APL  left ": uploadKneeAPLLeftref,
                "Knee APL  left + PORTABLE FEE": uploadKneeAPLLeftPFref,
                "Knees, Both APL": uploadKneeBothAPLref,
				"Knees, Both APL+ PORTABLE FEE": uploadKneeBothAPLPFref,
				"Knee, Tunnel View Left + PORTABLE FEE": uploadKneeTunnelViewLeftPFref,
				"Knee Tunnel View right ": uploadKneeTunnelViewRightref,
                "KUB  x-ray + PORTABLE FEE": uploadKubXrayPFref,
                "LEG APL+ PORTABLE FEE": uploadLegAPLPFref,
				"Leg APL  right ": uploadLegAPLRightref,
				"LUMBAR APL+ PORTABLE FEE": uploadLumbarAPLPFref,
				"LUMBOSACRAL  L/S  OBLIQUE": uploadLumbosacralLSObliqueref,
                "LUMBOSACRAL  L/S  OBLIQUE+ PORTABLE FEE": uploadLumbosacralLSObliquePFref,
                "LUMBOSACRAL SPINE APL + OBLIQUE+ PORTABLE FEE": uploadLumbosacralSpineAPLObliquePFref,
				"LUMBOSACRAL SPINE APL+ PORTABLE FEE": uploadLumbroscralSpineAPLPFref,
				"MANDIBLE APO+ PORTABLE FEE": uploadMandibleAPOPFref,
				"MASTOID SERIES": uploadMastoidSeriesref,
                "MASTOID SERIES+ PORTABLE FEE": uploadMastoidSeriesPFref,
                "NASAL BONE+ PORTABLE FEE": uploadNasalBonePFref,
				"ORBIT CALDWELL+ PORTABLE FEE": uploadOrbitCaldwellPFref,
				"ORBIT WATER AND CALDWELL+ PORTABLE FEE": uploadOrbitWaterCaldwellPFref,
				"OS CALCIS VIEW+ PORTABLE FEE": uploadOSCalcisViewPFref,
                "PARANASAL SINUSES+ PORTABLE FEE": uploadParanasalSinusesPFref,
                "PELVIS APL+ PORTABLE FEE": uploadPelvisAPLPFref,
				"PELVIS AP+ PORTABLE FEE": uploadPelvisAPPFref,
				"RGP X 1 SHOT": uploadRGP1Shotref,
				"RGP X 2 SHOT": uploadRGP2Shotref,
                "RGP X 3 SHOT": uploadRGP3Shotref,
                "RGP X 4 SHOT": uploadRGP4Shotref,
				"RGP X 5 SHOT": uploadRGP5Shotref,
				"SCAPULA LAT+ PORTABLE FEE": uploadScapulaLatPFref,
				"Scoliosis Series": uploadScoliosisSeriesref,
                "Scoliosis Series+ PORTABLE FEE": uploadScoliosisSeriesPFref,
                "SECOND COPY OF RESULT  OPD ONLY ": uploadSecondCopyOfResultOPDOnlyref,
				"SHOULDER AP L+ PORTABLE FEE": uploadShoulderAPLPFref,
				"SHOULDER APO  R + PORTABLE FEE": uploadShoulderAPORPFref,
				"SHOULDER AP R+ PORTABLE FEE": uploadShoulderAPRPFref,
                "SKULL AP+ PORTABLE FEE": uploadSkullAPPFref,
                "SKULL LATERAL VIEW+ PORTABLE FEE": uploadSkullLateralViewPFref,
				"SKULL SERIES   APL + Townes views +PORTABLE FEE": uploadSkullSeriesAPLTownesViewPFref,
				"SKULL SUBMENTOVERTEX+ PORTABLE FEE": uploadSkullSubmentovertexPFref,
				"SKULL WATERS VIEW+ PORTABLE FEE": uploadSkullWaterViewPFref,
                "TBC APL": uploadTBCAPLref,
                "TBC with obliques": uploadTBCObliquesref,
				"TEMPORO MANDIBULAR JOINT+ PORTABLE FEE": uploadTemporoMandibularJointPFref,
				"THORACIC BONY CAGE APL+ PORTABLE FEE": uploadThoracicBonyCageAPLPFref,
				"THORACIC BONY CAGE AP + PORTABLE FEE": uploadThoracicBonyCageAPPFref,
                "THORACIC BONY CAGE R & L OBLIQUE+ PORTABLE FEE": uploadThoracicBonyCageRLObliquePFref,
                "THORACIC BONY CAGE with obliques+ PORTABLE FEE": uploadThoracicBonyCageObliquePFref,
				"THORACO BONY CAGE  TBC  W/ OBLIQUES": uploadThroracicBonyCageTBCObliquesref,
				"THORACOLUMBAR APL": uploadThrocolumbarAPLref,
				"THORACOLUMBAR AP": uploadThrocolumbarAPref,
                "TIBIAL PLATEAU  BOTH OBLIQUES ": uploadTibialPlateauBothObliquesref,
                "WRIST APO LEFT": uploadWristAPOLeftref,
				"Wrist APL  left ": uploadWristAPLLeftref,
				"WRIST APO+ PORTABLE FEE": uploadWristAPOPFref,
                "WRIST APO RIGHT": uploadWristAPORightref,
				"Wrist, Both APL": uploadWristBothAPLref,
				
			};
            const modalRef = imgModalRefs[data?.type?.name] || uploadLabResultRef;
            return (
                <span
                    className="text-blue-700 flex items-center justify-center cursor-pointer hover:bg-slate-200 py-2 rounded-3xl gap-1"
                    onClick={() => modalRef.current.show(data)}
                >
                    <FlatIcon icon="rr-upload" />
                    {data?.type?.name === "ARTERIAL  DOPPLER LOWER EXT SINGLE" ? "Add Result" : "Upload"}
                </span>
            );
        } else {
            return <Status status={data?.order_status} />;
        }
    } else if (data?.order_status === "for-result-reading") {
		return (
		<span
                className="text-green-700 flex items-center justify-center cursor-pointer hover:bg-slate-200 py-2 rounded-3xl gap-1"
                // onClick={() => viewImgResultRef.current.show({...data, appointment})}
            >
                <FlatIcon icon="rs-document" />
                Reading of Result
        </span>
        );
	} else if (data?.order_status === "final-result") {
		return (
		<span
                className="text-blue-700 flex items-center justify-center cursor-pointer hover:bg-slate-200 py-2 rounded-3xl gap-1"
                onClick={() => viewImgResultRef.current.show({...data, appointment})}
            >
                <FlatIcon icon="rs-document" />
                View Final Result
        </span>
        );
	} else {
        return null;
    }
};
  return (
    <div className="flex flex-col items-start">
			{showTitle ? (
				<ContentTitle
					title={
						laboratory_test_type == 1
							? "Imaging Order Request"
							: "Laboratory Order Request"
					}
				>
					{user?.type == "GCE-DOCTOR" && allowCreate ? (
						<ActionBtn
							className="px-4 rounded-xl"
							size="sm"
							type="success"
							onClick={() => {
								createLabOrderRef.current.show(
									patient,
									appointment,
									laboratory_test_type == 1
										? "imaging"
										: "laboratory-test"
								);
								// setUpdate(true);
							}}
						>
							<FlatIcon icon="rr-edit" className="mr-1" />
							Create{" "}
							{laboratory_test_type == 1
								? "Imaging"
								: "Laboratory"}{" "}
							Order
						</ActionBtn>
					) : (
						""
					)}
				</ContentTitle>
			) : (
				""
			)}
			<Table
				className={`pb-2`}
				loading={loading}
				columns={[
					{
						header: "Order Date",
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
						header: "Imaging Examination",
						className: "text-left",
						tdClassName: "text-left",
						key: "type",
						cell: (data) => {
							return data?.type?.name;
						},
					},
					// {
					// 	header: "Notes",
					// 	className: "text-left",
					// 	tdClassName: "text-left",
					// 	key: "notes",
					// },
					{
						header: "Doctor",
						className: "text-left",
						tdClassName: "text-left",
						key: "doctor",
						cell: (data) => {
							return (
								<div className="flex flex-col">
									<span className="font-medium text-black -mb-[4px]">
										{doctorName(
											data?.relationships?.doctor
										)}
									</span>
									<span className="text-[10px] font-light">
										{doctorSpecialty(
											data?.relationships?.doctor
										)}
									</span>
								</div>
							);
						},
					},
					{
						header: "Status",
						className: "text-center ",
						tdClassName: "text-center",
						key: "order_status",
						cell: (data) => {
							return <Status status={data?.order_status} />;
						},
					},
					{
						header: "Result",
						className: "text-center",
						tdClassName: "text-center",
						key: "order_status",
						cell: renderResultCell,
					},
					{
						header: "Remarks",
						className: `text-center w-[100px] ${isDoctor() ? "" : "hidden"}`,
						tdClassName: `text-center ${
							isDoctor() ? "" : "hidden"
						}`,
						key: "delete",
						cell: (data) => {
							return (
								<div className="flex flex-col gap-2">
									{/* {JSON.stringify(data)} */}
									<ActionBtn
										size="sm"
										type="teal"
										disabled={
											data?.order_status ==
											"for-result-reading" ||
											data?.order_status ==
											"final-result" ||
											data?.order_status ==
											"refused"
										}
										className=""
										onClick={() => {
											refusedOrderRef.current.show(
												data
											);
										}}
									>
										<FlatIcon icon="rr-head-side-cough-slash" /> Refuse
									</ActionBtn>
									<ActionBtn
										size="sm"
										type="danger"
										disabled={
											data?.order_status ==
											"for-result-reading" ||
											data?.order_status ==
											"final-result" ||
											data?.order_status ==
											"refused"
										}
										className=""
										onClick={() => {
											deleteLabOrderRef.current.show(
												data
											);
										}}
									>
										<FlatIcon icon="rr-trash" /> Not Applicable
									</ActionBtn>
								</div>
							);
						},
					},
				]}
				data={data}
			/>
			<Pagination
				page={page}
				setPage={setPage}
				pageCount={meta?.last_page}
				pageSize={paginate}
				setPageSize={setPaginate}
			/>
			<CreateLabOrderModal
				patient={patient}
				onSuccess={() => {
					setTimeout(() => {
					reloadData();
					});
				}}
				ref={createLabOrderRef}
			/>

			<UploadAnkleAPLModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadAnkleAPLAporef}
			/>
			<UploadAnkleAPLPortableFeeModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadAnkleAPLApoPFref}
			/>
			<UploadAnkleBothAplPortableFeeModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadAMVRPFref}
			/>
			<UploadAnkleMortisseViewModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadAnkleBothAPLPFref}
			/>



			<UploadADLESModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadADLESRef}
			/>
			<UploadAppendixModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadAppendixRef}
			/>
			<UploadAspirationModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadGuidedAspirationRef}
			/>
			<UploadAVDLEBModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadAVDLEBRef}
			/>
			<UploadAVDLESModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadAVDLESRef}
			/>
			<UploadBiopsyModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadGuidedBiopsyRef}
			/>
			<UploadBPSModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadBPSRef}
			/>
			<UploadBreastBothModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadBreastBothRef}
			/>
			<UploadBreastElastoModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadBreastElastoRef}
			/>
			<UploadBreastSingleModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadBreastUSDSingleRef}
			/>
			<UploadChestThoraxModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadChestThoraxRef}
			/>
			<UploadHBTModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadHBTRef}
			/>
			<UploadInguinalModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadInguinalRef}
			/>
			<UploadInguinoscrotalModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadInguinoscrotalRef}
			/>
			<UploadKUBOnlyModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadKUBOnlyRef}
			/>
			<UploadKUBPelvisModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadKUBPelvisRef}
			/>
			<UploadKUBProstateModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadKUBProstateRef}
			/>
			<UploadLowerAbdomenModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadLowerAbdomenRef}
			/>
			<UploadNeckModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadNeckRef}
			/>
			<UploadNeckUSDModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadNeckUsdRef}
			/>
			<UploadPelvisModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadPelvisRef}
			/>
			<UploadPregnantModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadPregnantRef}
			/>
			<UploadScrotumModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadScrotumRef}
			/>
			<UploadSuperFacialSoftTissueModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadSuperficialRef}
			/>
			<UploadThyroidUSDModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadThyroidUSDRef}
			/>
			<UploadTVSModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadTVSRef}
			/>
			<UploadUpperAbdomenModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadUpperAbdomenRef}
			/>
			<UploadVDLESModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadVDLESRef}
			/>
			<UploadWabAppendixModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadWabAppendixRef}
			/>
			<UploadWholeAbdomenModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadWholeAbdomenRef}
			/>


			<UploadAnkleAPLModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadAnkleAPLAporef} />
			<UploadAnkleAPLPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadAnkleAPLApoPFref} />
			<UploadAnkleAPLPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadAMVRPFref} />
			<UploadAnkleMortisseViewModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadAnkleBothAPLPFref} />
			<UploadArmAplRightModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadArmAplRightref} />
			<UploadAxillaryViewPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadAxillaryViewPFref} />
			<UploadCalcaneusLateralViewModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadCalcaneusLateralViewref} />
			<UploadCalceneusPortableModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadCalcaneusPortableref} />
			<UploadCervicalAplObliquesModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadCervicalAPLObliquesref} />
			<UploadCervicalAplObliquesPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadCervicalAPLOPref} />
			<UploadCervicalApoModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadCervicalAPOref} />
			<UploadCervicothoracicModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadCervicothoracicSpineAPLref} />
			<UploadChestAplPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadChestAPLPFref} />
			<UploadChestApPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadChestAPPFref} />
			<UploadChestConeDownViewModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadChestConeDownViewPFref} />
			<UploadChestLateralViewOnlyModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadChestLateralViewOnlyPFref} />
			<UploadChestPalPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadCheastPalPFref} />
			<UploadChestPAPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadCheastPAPFref} />
			<UploadChestRPOModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadCheastRPOref} />
			<UploadChestSpotViewLULFModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadChestSpotViewLeftUpperLFref} />
			<UploadChestSpotViewLULFPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadChestSpotViewLeftUpperLFPFref} />
			<UploadChestSpotViewRLLFModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadChestSpotViewRightLowerLFref} />
			<UploadChestSpotViewRLLFPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadChestSpotViewRightLowerLFPFref} />
			<UploadChestSpotViewRUModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadChestSpotViewRightUlfref} />
			<UploadChestSpotViewRUPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadChestSpotViewRightUlfPFref} />
			<UploadClavicleApWithCephalicModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadClavincleAPCephalicTiltPFref} />
			<UploadClavicleRLPortableFee patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadClavinceRightLeftPFref} />
			<UploadCoccyxAPLModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadCoccyxAPLPFref} />
			<UploadCoccyxAPModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadCoccyxAPPFref} />
			<UploadDigitAplApoPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadDigitAPLAPOPFref} />
			<UploadElbowBothAplPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadElbowBothAPLPFref} />
			<UploadFootAPLBilateralModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadFootAPLBilateralref} />
			<UploadFootAPLBilateralPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadFootAPLBilateralPFref} />
			<UploadFootAPLBothModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadFootAPLBothref} />
			<UploadFootAPLLeftModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadFootAPLLeftref} />
			<UploadFootAPLLeftPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadFootAPLLeftPFref} />
			<UploadFootAPOLeftModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadFootAPOLeftref} />
			<UploadFootAPOLeftPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadFootAPOLeftPFref} />
			<UploadFootAPORightModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadFootAPORightref} />
			<UploadFootAPORightPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadFootAPORightPFref} />
			<UploadFootApPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadFootAPPFref} />
			<UploadFootLateralViewRightModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadFootLateralViewRightref} />
			<UploadFootLateralViewRightPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadFootLateralViewRightPFref} />
			<UploadForearmBothAPLPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadForearmBothAPLPFref} />
			<UploadHandAPLRightPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadHandAPLRightPFref} />
			<UploadHandAPOLeftModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadHandAPOLeftref} />
			<UploadHandLateralViewRightModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadHandLateralViewRightref} />
			<UploadHandLateralViewRightPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadHandLateralViewRightPFref} />
			<UploadHandLeftBoneAgingModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadHandLeftBoneAgingref} />
			<UploadHandLeftBoneAgingPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadHandLeftBoneAgingPFref} />
			<UploadHardCopyImageXRayModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadHardCopyImageXrayref} />
			<UploadHIPAPCTAPLModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadHIPAPCTAPLref} />
			<UploadHIPAPCTAPLPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadHIPAPCTAPLPFref} />
			<UploadHumerusAPModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadHumerusAPref} />
			<UploadHumerusBothAPLPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadHumerusBothAPLPFref} />
			<UploadIntraOPX3ShotsModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadIntraOP3Shotsref} />
			<UploadIntraOPX4ShotsModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadIntraOP4Shotsref} />
			<UploadIVPX2ShotsModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadIVP2Shotsref} />
			<UploadIVPX3ShotsModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadIVP3Shotsref} />
			<UploadIVPX5ShotsModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadIVP5Shotsref} />
			<UploadIVPX6ShotsModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadIVP6Shotsref} />
			<UploadIVPX7ShotsModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadIVP7Shotsref} />
			<UploadIVPX8ShotsModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadIVP8Shotsref} />
			<UploadJudetViewLeftHipJointModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadJudetViewLeftHIPJointref} />
			<UploadJudetViewLeftHipJointPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadJudetViewLeftHIPJointPFref} />
			<UploadJudetViewRightHipJointPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadJudetViewRightHIPJointPFref} />
			<UploadKneeAPLLeftModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadKneeAPLLeftref} />
			<UploadKneeAPLLeftPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadKneeAPLLeftPFref} />
			<UploadKneesBothAPLModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadKneeBothAPLref} />
			<UploadKneesBothAPLPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadKneeBothAPLPFref} />
			<UploadKneeTunnelViewLeftPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadKneeTunnelViewLeftPFref} />
			<UploadKneeTunnelViewRightModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadKneeTunnelViewRightref} />
			<UploadKUBXRayPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadKubXrayPFref} />
			<UploadLegAPLPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadLegAPLPFref} />
			<UploadLegAPLRightModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadLegAPLRightref} />
			<UploadLumbarAPLPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadLumbarAPLPFref} />
			<UploadLumbosacralLSObliqueModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadLumbosacralLSObliqueref} />
			<UploadLumbosacralLSObliquePortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadLumbosacralLSObliquePFref} />
			<UploadLumbosacralSpineAPLObliquePortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadLumbosacralSpineAPLObliquePFref} />
			<UploadLumbosacralSpineAPLPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadLumbroscralSpineAPLPFref} />
			<UploadMandibleAPOPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadMandibleAPOPFref} />
			<UploadMastoidSeriesModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadMastoidSeriesref} />
			<UploadMastoidSeriesPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadMastoidSeriesPFref} />
			<UploadNasalBonePortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadNasalBonePFref} />
			<UploadOrbitCaldwellPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadOrbitCaldwellPFref} />
			<UploadOrbitWaterAndCaldwellPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadOrbitWaterCaldwellPFref} />
			<UploadOSCalcisViewPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadOSCalcisViewPFref} />
			<UploadParanasalSinusesPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadParanasalSinusesPFref} />
			<UploadPelvisAPLPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadPelvisAPLPFref} />
			<UploadPelvisAPPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadPelvisAPPFref} />
			<UploadRGPX1ShotModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadRGP1Shotref} />
			<UploadRGPX2ShotModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadRGP2Shotref} />
			<UploadRGPX3ShotModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadRGP3Shotref} />
			<UploadRGPX4ShotModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadRGP4Shotref} />
			<UploadRGPX5ShotModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadRGP5Shotref} />
			<UploadScapulaLATPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadScapulaLatPFref} />
			<UploadScoliosisSeriesModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadScoliosisSeriesref} />
			<UploadScoliosisSeriesPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadScoliosisSeriesPFref} />
			<UploadSecondCopyOfResultOPDOnlyModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadSecondCopyOfResultOPDOnlyref} />
			<UploadShoulderAPLPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadShoulderAPLPFref} />
			<UploadShoulderAPORPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadShoulderAPORPFref} />
			<UploadShoulderAPRPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadShoulderAPRPFref} />
			<UploadSkullAPPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadSkullAPPFref} />
			<UploadSkullLateralViewPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadSkullLateralViewPFref} />
			<UploadSkullSeriesAPLTownesViewsPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadSkullSeriesAPLTownesViewPFref} />
			<UploadSkullSubmentovertexPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadSkullSubmentovertexPFref} />
			<UploadSkullWatersViewPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadSkullWaterViewPFref} />
			<UploadTBCAPLModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadTBCAPLref} />
			<UploadTBCwithObliquesModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadTBCObliquesref} />
			<UploadTemporoMandibularJointPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadTemporoMandibularJointPFref} />
			<UploadThoracicBonyCageAPLPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadThoracicBonyCageAPLPFref} />
			<UploadThoracicBonyCageAPPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadThoracicBonyCageAPPFref} />
			<UploadThoracicBonyCageRandLObliquePortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadThoracicBonyCageRLObliquePFref} />
			<UploadThoracicBonyCageWithObliquesPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadThoracicBonyCageObliquePFref} />
			<UploadThoracoBonyCageTBCwithObliquesModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadThroracicBonyCageTBCObliquesref} />
			<UploadThoracolumbarAPLModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadThrocolumbarAPLref} />
			<UploadThoracolumbarAPModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadThrocolumbarAPref} />
			<UploadTibialPlateauBothObliquesModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadTibialPlateauBothObliquesref} />
			<UploadWirstAPOLeftModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadWristAPOLeftref} />
			<UploadWristAPLLeftModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadWristAPLLeftref} />
			<UploadWristAPOPortableFeeModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadWristAPOPFref} />
			<UploadWristAPORightModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadWristAPORightref} />
			<UploadWristBothAPLModal patient={patient} onSuccess={() => { onUploadLabResultSuccess(); reloadData(); }} ref={uploadWristBothAPLref} />
			



			<ViewImgResultModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={viewImgResultRef}
			/>
			<DeleteOrderModal
				ref={deleteLabOrderRef}
				onSuccess={() => {
					reloadData();
				}}
			/>
			<RefusedOrderModal 
			ref={refusedOrderRef}
			onSuccess={() => {
				reloadData();
			}}
			/>
			
	</div>
  )
}

export default ImagingOrder

/* eslint-disable react/prop-types */
import { useRef } from "react";
import useDataTable from "../../hooks/useDataTable";
import {
	doctorName,
	doctorSpecialty,
	formatDateMMDDYYYY,
	formatDateMMDDYYYYHHIIA,
} from "../../libs/helpers";
import FlatIcon from "../FlatIcon";
import ActionBtn from "../buttons/ActionBtn";
import ContentTitle from "../buttons/ContentTitle";
import Pagination from "../table/Pagination";
import Table from "../table/Table";
import CreateLabOrderModal from "./modals/CreateLabOrderModal";
import { useAuth } from "../../hooks/useAuth";
import useNoBugUseEffect from "../../hooks/useNoBugUseEffect";
import UploadLabResultModal from "./modals/UploadLabResultModal";
import ViewLabResultModal from "./modals/ViewLabResultModal";
import DeleteOrderModal from "./modals/DeleteOrderModal";
import UploadOGTTModal from "./modals/laboratory/chemistry/UploadOGTTModal";
import UploadPregnancyTestModal from "./modals/laboratory/microscopy/urine-examination/UploadPregnancyTestModal";
import UploadFBSModal from "./modals/laboratory/chemistry/UploadFBSModal";
import UploadRBSModal from "./modals/laboratory/chemistry/UploadRBSModal";
import UploadCreatinineModal from "./modals/laboratory/chemistry/UploadCreatinineModal";
import UploadUricAcidModal from "./modals/laboratory/chemistry/UploadUricAcidModal";
import UploadSGOTModal from "./modals/laboratory/chemistry/UploadSGOTModal";
import UploadSGPTModal from "./modals/laboratory/chemistry/UploadSGPTModal";
import UploadAlkalinePhosModal from "./modals/laboratory/chemistry/UploadAlkalinePhosModal";
import UploadLDHModal from "./modals/laboratory/chemistry/UploadLDHModal";
import UploadGGTModal from "./modals/laboratory/chemistry/UploadGGTModal";
import UploadMagnesiumModal from "./modals/laboratory/chemistry/UploadMagnesiumModal";
import UploadPhosphurosModal from "./modals/laboratory/chemistry/UploadPhosphurosModal";
import UploadAmylaseModal from "./modals/laboratory/chemistry/UploadAmylaseModal";
import UploadCultureSensitiveInitialModal from "./modals/laboratory/chemistry/UploadCultureSensitiveInitialModal";
import UploadLipidProfileModal from "./modals/laboratory/chemistry/UploadLipidProfileModal";
import UploadElectrolytesModal from "./modals/laboratory/chemistry/UploadElectrolytesModal";
import UploadBilirubinModal from "./modals/laboratory/chemistry/UploadBilirubinModal";
import UploadTotalProteinModal from "./modals/laboratory/chemistry/UploadTotalProteinModal";
import UploadUreaModal from "./modals/laboratory/chemistry/UploadUreaModal";
import UploadUrineCreatinineClearanceModal from "./modals/laboratory/chemistry/UploadUrineCreatinineClearanceModal";
import UploadCompleteBloodCountModal from "./modals/laboratory/hematology/UploadCompleteBloodCountModal";
import UploadCuagulationStudiesModal from "./modals/laboratory/hematology/UploadCuagulationStudiesModal";
import UploadDifferentialCountModal from "./modals/laboratory/hematology/UploadDifferentialCountModal";
import UploadErythrocyteModal from "./modals/laboratory/hematology/UploadErythrocyteModal";
import UploadPlateletCountModal from "./modals/laboratory/hematology/UploadPlateletCountModal";
import UploadRedCellIndicesModal from "./modals/laboratory/hematology/UploadRedCellIndicesModal";
import UploadReticulocyteCount from "./modals/laboratory/hematology/UploadReticulocyteCount";
import UploadAFBStainModal from "./modals/laboratory/microbiology/UploadAFBStainModal";
import UploadCultureSensitivityFinalModal from "./modals/laboratory/microbiology/UploadCultureSensitivityFinalModal";
import UploadGramStainModal from "./modals/laboratory/microbiology/UploadGramStainModal";
import UploadKOHModal from "./modals/laboratory/microbiology/UploadKOHModal";
import UploadAscarisModal from "./modals/laboratory/microscopy/fecalysis/UploadAscarisModal";
import UploadEntamoebaColiCystModal from "./modals/laboratory/microscopy/fecalysis/UploadEntamoebaColiCystModal";
import UploadEntamoebaColiTrophozoiteModal from "./modals/laboratory/microscopy/fecalysis/UploadEntamoebaColiTrophozoiteModal";
import UploadEntamoebaHistolyticaCystModal from "./modals/laboratory/microscopy/fecalysis/UploadEntamoebaHistolyticaCystModal";
import UploadEntamoebaHistolyticaTrophozoiteModal from "./modals/laboratory/microscopy/fecalysis/UploadEntamoebaHistolyticaTrophozoiteModal";
import UploadFecalOccultBloodModal from "./modals/laboratory/microscopy/fecalysis/UploadFecalOccultBloodModal";
import UploadGiardiaLambliaCystModal from "./modals/laboratory/microscopy/fecalysis/UploadGiardiaLambliaCystModal";
import UploadGiardiaLambliaTrophozoiteModal from "./modals/laboratory/microscopy/fecalysis/UploadGiardiaLambliaTrophozoiteModal";
import UploadHookWormModal from "./modals/laboratory/microscopy/fecalysis/UploadHookWormModal";
import UploadMacroscopicModal from "./modals/laboratory/microscopy/fecalysis/UploadMacroscopicModal";
import UploadMicroscopicModal from "./modals/laboratory/microscopy/fecalysis/UploadMicroscopicModal";
import UploadTrichiurisModal from "./modals/laboratory/microscopy/fecalysis/UploadTrichiurisModal";
import UploadCastsModal from "./modals/laboratory/microscopy/urine-examination/UploadCastsModal";
import UploadCrystalsModal from "./modals/laboratory/microscopy/urine-examination/UploadCrystalsModal";
import UploadChemicalExamModal from "./modals/laboratory/microscopy/urine-examination/UploadChemicalExamModal";
import UploadMacroscopicExamModal from "./modals/laboratory/microscopy/urine-examination/UploadMacroscopicExamModal";
import UploadMicroscopicExamModal from "./modals/laboratory/microscopy/urine-examination/UploadMicroscopicExamModal";
import UploadAntiHBSModal from "./modals/laboratory/serology/UploadAntiHBSModal";
import UploadAntiHCVModal from "./modals/laboratory/serology/UploadAntiHCVModal";
import UploadASOModal from "./modals/laboratory/serology/UploadASOModal";
import UploadCKMBModal from "./modals/laboratory/serology/UploadCKMBModal";
import UploadCRPModal from "./modals/laboratory/serology/UploadCRPModal";
import UploadDengueDuoModal from "./modals/laboratory/serology/UploadDengueDuoModal";
import UploadHBsAgModal from "./modals/laboratory/serology/UploadHBsAgModal";
import UploadRheumatoidModal from "./modals/laboratory/serology/UploadRheumatoidModal";
import UploadSyphilisModal from "./modals/laboratory/serology/UploadSyphilisModal";
import UploadTroponinModal from "./modals/laboratory/serology/UploadTroponinModal";
import UploadTyphoidTestModal from "./modals/laboratory/serology/UploadTyphoidTestModal";
import UploadWidalTestModal from "./modals/laboratory/serology/UploadWidalTestModal";
import UploadBloodTypingModal from "./modals/laboratory/UploadBloodTypingModal";
import UploadCovidRapidTestModal from "./modals/laboratory/UploadCovidRapidTestModal";
import UploadCrossMatchingModal from "./modals/laboratory/UploadCrossMatchingModal";
import UploadMiscellaneousFormModal from "./modals/laboratory/UploadMiscellaneousFormModal";
import UploadAnkleAPLModal from "./modals/imaging/xray/UploadAnkleAPLModal";
import UploadAnkleAPLPortableFeeModal from "./modals/imaging/xray/UploadAnkleAPLPortableFeeModal";
import UploadAnkleBothAplPortableFeeModal from "./modals/imaging/xray/UploadAnkleBothAplPortableFeeModal";
import UploadAnkleMortisseViewModal from "./modals/imaging/xray/UploadAnkleMortisseViewModal";
import UploadAlbuminModal from "./modals/laboratory/chemistry/UploadAlbuminModal";
import RefusedOrderModal from "./modals/RefusedOrderModal";
import UploadPapSmearModal from "./modals/laboratory/UploadPapSmearModal";
const Status = ({ status }) => {
	const getStatusConfig = () => {
		switch (status) {
			case "pending":
				return {
					className: "bg-red-100 text-red-700 font-bold",
					label: "Not Yet Done",
				};
			case "for-result-reading":
				return {
					className: "bg-blue-100 text-blue-700 font-bold",
					label: "For Reading",
				};
			case "refused":
				return {
					className: "bg-teal-100 text-teal-700 font-bold",
					label: "Refused",
				};
			default:
				return {
					className: "bg-gray-100 text-gray-600",
					label: status || "Unknown",
				};
		}
	};

	const { className, label } = getStatusConfig();

	return (
		<span
			className={`${className} px-2 py-[2px] rounded-2xl text-xs italic`}
		>
			{label}
		</span>
	);
};
const LaboratoryOrders = (props) => {
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
		return user?.type == "GDIS-IMAGING" || user?.type == "GDIS-LABORATORY";
	};
	const isXrayUser = () => {
		return user?.type === "GDIS-DOCTOR";
	};
	// const testHeader = isLaboratoryUser() ? "Imaging Test" : "Laboratory Test";
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
	const viewLabResultRef = useRef(null);

	//chemistry ref
	const uploadFBSRef = useRef(null);
	const uploadRBSRef = useRef(null);
	const uploadCreatinineRef = useRef(null);
	const uploadUricAcidRef = useRef(null);
	const uploadSGOTRef = useRef(null);
	const uploadSGPTRef = useRef(null);
	const uploadAlbuminRef = useRef(null);
	const uploadAlkalinePhosRef = useRef(null);
	const uploadLDHRef = useRef(null);
	const uploadGGTRef = useRef(null);
	const uploadMagnesiumRef = useRef(null);
	const uploadPhophorusRef = useRef(null);
	const uploadAmylaseRef = useRef(null);
	const uploadcultureInitialRef = useRef(null);
	const uploadLipidProfileRef = useRef(null);
	const uploadElectrolytesRef = useRef(null);
	const uploadBilirubinRef = useRef(null);
	const uploadTotalProteinRef = useRef(null);
	const uploadUreaRef = useRef(null);
	const uploadOralGlucoseRef = useRef(null);
	const uploadUrineCreatinineRef = useRef(null);
	// hematology ref
	const uploadCBCResultRef = useRef(null);
	const uploadCuagulationStudiesRef = useRef(null);
	const uploadDifferentialCountRef = useRef(null);
	const uploadErythrocyteRef = useRef(null);
	const uploadPlateletCountRef = useRef(null);
	const uploadRedcellInficesRef = useRef(null);
	const uploadReticulocyteRef = useRef(null);
	// microbiology ref
	const uploadAFBStainRef = useRef(null);
	const uploadCultureSensitivityFinalRef = useRef(null);
	const uploadGramStainRef = useRef(null);
	const uploadKOHRef = useRef(null);
	// microscopy ref
		// fecalysis ref
		const uploadAscarisRef = useRef(null);
		const uploadEntomoebaCystRef = useRef(null);
		const uploadEntomoebaTrophozoiteRef = useRef(null);
		const uploadFecalOccultRef = useRef(null);
		const uploadGiardiaCystRef = useRef(null);
		const uploadGiardiaTrophozoiteRef = useRef(null);
		const uploadHookwormRef = useRef(null);
		const uploadMacroscopicFecalysisRef = useRef(null);
		const uploadMicroscopicFecalysisRef = useRef(null);
		const uploadTrichiurisRef = useRef(null);
		const uploadEntamoebaHistolyticaCystRef = useRef(null);
		const uploadEntamoebaHistolyticaTrophozoiteRef = useRef(null);
		// urine ref
		const uploadCastsRef = useRef(null);
		const uploadChemicalRef = useRef(null);
		const uploadCrystalRef = useRef(null);
		const uploadMacroscopicUrineRef = useRef(null);
		const uploadMicroscopicUrineRef = useRef(null);
		const uploadPregnancyTestRef = useRef(null);
	// serology ref
	const uploadAntiHBSRef = useRef(null);
	const uploadAntiHCVRef = useRef(null);
	const uploadASORef = useRef(null);
	const uploadCKMBRef = useRef(null);
	const uploadCRPRef = useRef(null);
	const uploadDengueDuoRef = useRef(null);
	const uploadHBsAGRef = useRef(null);
	const uploadRheumatoidRef = useRef(null);
	const uploadSyphilisRef = useRef(null);
	const uploadTroponinRef = useRef(null);
	const uploadTyphoidRef = useRef(null);
	const uploadWidalTestRef = useRef(null);

	const uploadBloodTypeRef = useRef(null);
	const uploadCovidTestRef = useRef(null);
	const uploadCrossMatchingRef = useRef(null);
	const uploadMiscellaneousRef = useRef(null);

	const uploadAnkleAPLAporef = useRef(null);
	const uploadAnkleAPLApoPFref = useRef(null);
	const uploadAMVRPFref = useRef(null);
	const uploadAnkleBothAPLPFref = useRef(null);

	const uploadPAPSmearRef = useRef(null);

	const deleteLabOrderRef = useRef(null);
	const refusedOrderRef = useRef(null);
	const isDoctor = () => {
		return String(user?.type || "")
			.toLowerCase()
			.includes("doctor");
	};

	const renderResultCell = (data) => {
    if (data?.order_status === "pending") {
        if (isLaboratoryUser()) {
            const labModalRefs = {
				//Chemistry
                "24 HOUR CREATININE CLEARANCE": uploadUrineCreatinineRef,
                // "24 HOUR URINE CALCIUM": uploadUrineCalciumRef,
                // "24 HOUR URINE CREATININE": uploadUrineCreatinineRef,
                // "2HOUR POST PRANDIAL BLOOD SUGAR": uploadPostPrandialBloodSugarRef,
                "ALBUMIN": uploadAlbuminRef,
                "ALKALINE PHOSPHATASE": uploadAlkalinePhosRef,
                "AMYLASE": uploadAmylaseRef,
                "BLOOD UREA NITROGEN": uploadUreaRef,
                // "BODY FLUID GLUCOSE": uploadBodyFluidGlucoseRef,
                "BODY FLUID LDH": uploadLDHRef,
                // "BODY FLUID TOTAL PROTEIN": uploadBodyFluidTotalProteinRef,
                // "CALCIUM IONIZED": uploadCalciumIonizedRef,
                // "CHLORIDE": uploadChlorideRef,
                // "CHOLESTEROL": uploadCholesterolRef,
                "CREATININE": uploadCreatinineRef,
				"CULTURE & SENSITIVITY INITIAL RESULT": uploadcultureInitialRef,
                "ELECTROLYTES": uploadElectrolytesRef,
                // "FERRITIN": uploadFerritinRef,
                "GGT": uploadGGTRef,
                "GLUCOSE- FBS": uploadFBSRef,
                "GLUCOSE- RBS": uploadRBSRef,
                // "HBA1C": uploadHB1ACRef,
                // "HBA1C (HPLC)": uploadHB1ACHPLCRef,
                // "HDL-CHOLESTEROL": uploadHDLCholesterolRef,
                // "HEMOGLUCOSTAT (HGT)": uploadHGTRef,
                // "LDL-CHOLESTEROL": uploadLDLCholesterolRef,
                "LIPID PROFILE": uploadLipidProfileRef,
                "MAGNESIUM ": uploadMagnesiumRef,
                // "NEWBORN SCREENING EXPANDED": uploadNewbornScreeningExpandedRef,
                // "NEWBORN SCREENING REGULAR": uploadNewbornScreeningRegularRef,
                // "ORAL GLUCOSE CHALLENGE TEST (OGCT)": uploadOGCTRef,
                "ORAL GLUCOSE TOLERANCE TEST (OGTT)": uploadOralGlucoseRef,
                "PHOSPHORUS": uploadPhophorusRef,
                "SGOT (AST)": uploadSGOTRef,
                "SGPT (ALT)": uploadSGPTRef,
                // "SODIUM": uploadSodiumRef,
                "TOTAL BILIRUBIN(B1B2)": uploadBilirubinRef,
                "TOTAL PROTEIN": uploadTotalProteinRef,
                // "TPAG": uploadTPAGRef,
                // "TRIGLYCERIDES": uploadTriglyceridesRef,
                "URIC ACID": uploadUricAcidRef,
                // "URINE POTASSIUM": uploadUrinePotassiumRef,
                // "URINE SODIUM": uploadUrineSodiumRef,

				//Hematology
				// "APTT": uploadAPTTResultRef,
				// "APTT w MIXING STUDIES": uploadAPTTwMixingStudiesResultRef,
				// "BLEEDING TIME": uploadBleedingTimeRef,
				// "BSMP": uploadBSMPRef,
				// "CLOTTING TIME": uploadClottingTimeRef,
				// "CLOTTING TIME/BLEEDING TIME (CTBT)": uploadCTBTRef,
				"COMPLETE BLOOD COUNT (CBC)": uploadCBCResultRef,
                "Cuagulation Studies": uploadCuagulationStudiesRef,
                "Differential Count": uploadDifferentialCountRef,
                "ERYTHROCYTE SEDIMENTATON RATE (ESR)": uploadErythrocyteRef,
                // "HEMATOCRIT": uploadHematocritRef,
                // "HEMOGLOBIN": uploadHemoglobinRef,
                // "PERIPHERAL BLOOD SMEAR": uploadPeripheralBloodSmearRef,
                "PLATELET COUNT": uploadPlateletCountRef,
                // "PROTHROMBIN TIME": uploadProthrombinTimeRef,
                "Red Cell Indices": uploadRedcellInficesRef,
				"Rerticulocyte Count": uploadReticulocyteRef,
				// "D-DIMER": uploadDDimerRef,

				//Microbiology
				"AFB STAIN (ROUTINE)": uploadAFBStainRef,
				"CULTURE & SENSITIVITY": uploadCultureSensitivityFinalRef,
				// "BLOOD CULTURE ONLY": uploadBloodCultureOnlyRef,
                // "Culture Sensitivity Final Result": uploadCultureSensitivityFinalRef,
                // "Culture ONLY": uploadCultureOnlyRef,
                "SPUTUM AFB STAIN (2x)": uploadGramStainRef,
				"KOH PREPARATION": uploadKOHRef,
				// "SPUTUM AFB STAIN (2x)": uploadSputumAFBStainRef,

				//Microscopy
					//fecalysis
					"Ascaris Lumbricoides Ova": uploadAscarisRef,
					"Entamoeba Coli Cyst ": uploadEntomoebaCystRef,
					"Entamoeba Coli Trophozoite": uploadEntomoebaTrophozoiteRef,
					"Entamoeba Histolytica Cyst": uploadEntamoebaHistolyticaCystRef,
					"Entamoeba Histolytica Trophozoite": uploadEntamoebaHistolyticaTrophozoiteRef,
					"Fecal Occult Blood": uploadFecalOccultRef,
					"FECALYSIS": uploadFecalOccultRef,
					"Fecalysis Macroscopic Examination": uploadMacroscopicFecalysisRef,
					"Fecalysis Microscopic Examination": uploadMicroscopicFecalysisRef,
					"Giardia Lamblia Cyst": uploadGiardiaCystRef,
					"Giardia Lamblia Trophozoite": uploadGiardiaTrophozoiteRef,
					"Hookworm Ova": uploadHookwormRef,
					// "MICRAL TEST (URINE MICRO ALBUMIN)": uploadMicralTestUMARef,
					// "SEMENALYSIS": uploadSemenalysisRef,
					"STOOL OCCULT BLOOD": uploadFecalOccultRef,
					"Trichiuris trichiura Ova": uploadTrichiurisRef,
					//Urine
					"Casts": uploadCastsRef,
					"Chemical Examination": uploadChemicalRef,
					"Crystal": uploadCrystalRef,
					"PREGNANCY TEST -URINE": uploadPregnancyTestRef,
					"URINALYSIS": uploadMacroscopicUrineRef,
					// "URINE KETONE": uploadUrineKetoneRef,
					// "Urine Macroscopic Examination": uploadMacroscopicUrineRef,
					"Urine Microscopic Examination": uploadMicroscopicUrineRef,
					// "URINE SUGAR/PROTEIN": uploadUrineSugarProteinRef,

				//Serology
				"ANTI-HBS(QUALITATIVE) ": uploadAntiHBSRef,
				"ANTI-HCV": uploadAntiHCVRef,
				"ANTISTREPTOLYSIN-O (ASO) TITER": uploadASORef,
				"BLOOD TYPING (ABO+Rh)": uploadBloodTypeRef,
				// "CD4 COUNT": uploadCD4CountRef,
				"CK - MB": uploadCKMBRef,
				"C-REACTIVE PROTEIN (CRP)": uploadCRPRef,
				"CROSSMATCHING": uploadCrossMatchingRef,
				"DENGUE DUO": uploadDengueDuoRef,
				// "DIRECT COOMB'S TEST ": uploadDirectCoombTestRef,
				// "FT3": uploadFT3Ref,
				// "FT4": uploadFT4Ref,
				// "H.PYLORI": uploadHPyloriRef,
				// "HAV IGM": uploadHavIGMRef,
				// "INDIRECT COOMB'S TEST ": uploadIndirectCoombTestRef,
				"HBsAg (QUALITATIVE)": uploadHBsAGRef,
				// "PREGNANCY TEST-SERUM": uploadPregnacyTestSerumRef,
				// "PROCALCITONIN": uploadProcalcitoninRef,
				"RA/RF (Rheumatoid Factor)": uploadRheumatoidRef,
				// "REVERSE TYPING": uploadReverseTypingRef,
				// "RHEUMATOID FACTOR (RF)": uploadRheumatoidFactorRef,
				// "SARS-COV2 RAPID ANTIGEN ": uploadSarsCov2RapidAntigenRef,
				"Syphilis (Rapid Test)": uploadSyphilisRef,
				// "T3": uploadT3Ref,
				// "T4": uploadT4Ref,
				// "TPSA": uploadTPSARef,
				"TROPONIN I (QUALITATIVE)": uploadTroponinRef,
				// "TROPONIN I (QUANTITATIVE)": uploadTroponinIRef,
				// "TROPONIN T (QUALITATIVE)": uploadTroponinTRef,W
				// "TSH": uploadTSHRef,
				"TYPHOID": uploadTyphoidRef,
				"WIDAL TEST": uploadWidalTestRef,

				"Covid-19 Rapid Test": uploadCovidTestRef,
				"Miscellaneous Form": uploadMiscellaneousRef,

				//Histopathology
				// "BIOPSY LEVEL I": uploadBiopsyLevel1Ref,
				// "BIOPSY LEVEL II OR III": uploadBiopsyLevel2or3Ref,
				// "BIOPSY LEVEL IV": uploadBiopsyLevel4Ref,
				// "BIOPSY LEVEL V": uploadBiopsyLevel5Ref,
				// "BIOPSY LEVEL VI": uploadBiopsyLevel6Ref,
				// "BONE MARROW SMEAR": uploadBoneMarrowSmearRef,
				// "CELLBLOCK": uploadCellblockRef,
				// "CELLCYTOLOGY": uploadCellcytologyRef,
				// "CELLCYTOLOGY": uploadCellcytologyRef,
				// "CERVICAL PUNCH BIOPSY": uploadCervicalPunchBiopsyRef,
				// "FNAB": uploadFNABRef,
				"PAP SMEAR": uploadPAPSmearRef,
				// "SEND-OUT FEE": uploadSendoutFeeRef,
				
			};
     const modalRef = labModalRefs[data?.type?.name] || uploadLabResultRef;
            return (
                <span
                    className="text-blue-700 flex items-center justify-center cursor-pointer hover:bg-slate-200 py-2 rounded-3xl gap-1"
                    onClick={() => modalRef.current.show(data)}
                >
                    <FlatIcon icon="rr-upload" />
                    {data?.type?.name === "CBC" ? "Add Result" : "Upload"}
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
    } else if (data?.order_status === "final-result" || data?.order_status === "done") {
        return (
            <span
                className="text-blue-700 flex items-center justify-center cursor-pointer hover:bg-slate-200 py-2 rounded-3xl gap-1"
                onClick={() => viewLabResultRef.current.show({...data, appointment})}
            >
                <FlatIcon icon="rs-document" />
                View Result
            </span>
        );
    } else if (data?.order_status === "refused") {
        return (
           <Status status={data?.order_status} />
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
					{user?.type == "GDIS-DOCTOR" && allowCreate ? (
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
						header: "Laboratory Examination",
						className: "text-left",
						tdClassName: "text-left",
						key: "type",
						cell: (data) => {
							return data?.type?.name;
						},
					},
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
					reloadData();
				}}
				ref={createLabOrderRef}
			/>

			<UploadLabResultModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadLabResultRef}
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
			{/* chemistry modal */}
			{/* <UploadFBSModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadFBSRef}
			/> */}
			<UploadFBSModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadFBSRef}
			/>
			<UploadRBSModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadRBSRef}
			/>
			<UploadCreatinineModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadCreatinineRef}
			/>
			<UploadUricAcidModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadUricAcidRef}
			/>
			<UploadSGOTModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadSGOTRef}
			/>
			<UploadSGPTModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadSGPTRef}
			/>
			<UploadAlkalinePhosModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadAlkalinePhosRef}
			/>
			<UploadAlbuminModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadAlbuminRef}
			/>
			<UploadLDHModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadLDHRef}
			/>
			<UploadGGTModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadGGTRef}
			/>
			<UploadMagnesiumModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadMagnesiumRef}
			/>
			<UploadPhosphurosModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadPhophorusRef}
			/>
			<UploadAmylaseModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadAmylaseRef}
			/>
			<UploadCultureSensitiveInitialModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadcultureInitialRef}
			/>
			<UploadLipidProfileModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadLipidProfileRef}
			/>
			<UploadElectrolytesModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadElectrolytesRef}
			/>
			<UploadBilirubinModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadBilirubinRef}
			/>
			<UploadTotalProteinModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadTotalProteinRef}
			/>
			<UploadUreaModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadUreaRef}
			/>
			<UploadOGTTModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadOralGlucoseRef}
			/>
			<UploadUrineCreatinineClearanceModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadUrineCreatinineRef}
			/>
			{/* Hematology Modal */}
			<UploadCompleteBloodCountModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadCBCResultRef}
			/>
			<UploadCuagulationStudiesModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadCuagulationStudiesRef}
			/>
			<UploadDifferentialCountModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadDifferentialCountRef}
			/>
			<UploadErythrocyteModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadErythrocyteRef}
			/>
			<UploadPlateletCountModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadPlateletCountRef}
			/>
			<UploadRedCellIndicesModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadRedcellInficesRef}
			/>
			<UploadReticulocyteCount
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadReticulocyteRef}
			/>

			{/* Microbiology Modal */}
			<UploadAFBStainModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadAFBStainRef}
			/>
			<UploadCultureSensitivityFinalModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadCultureSensitivityFinalRef}
			/>
			<UploadGramStainModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadGramStainRef}
			/>
			<UploadKOHModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadKOHRef}
			/>
			{/* Microscopy Modal */}
				{/* Fecalysis Modal */}
				<UploadAscarisModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadAscarisRef}
			/>
			<UploadEntamoebaColiCystModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadEntomoebaCystRef}
			/>
			<UploadEntamoebaColiTrophozoiteModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadEntomoebaTrophozoiteRef}
			/>
			<UploadEntamoebaHistolyticaCystModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadEntamoebaHistolyticaCystRef}
			/>
			<UploadEntamoebaHistolyticaTrophozoiteModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadEntamoebaHistolyticaTrophozoiteRef}
			/>
			<UploadFecalOccultBloodModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadFecalOccultRef}
			/>
			<UploadGiardiaLambliaCystModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadGiardiaCystRef}
			/>
			<UploadGiardiaLambliaTrophozoiteModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadGiardiaTrophozoiteRef}
			/>
			<UploadHookWormModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadHookwormRef}
			/>
			<UploadMacroscopicModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadMacroscopicFecalysisRef}
			/>
			<UploadMicroscopicModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadMicroscopicFecalysisRef}
			/>
			<UploadTrichiurisModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadTrichiurisRef}
			/>
				{/* Urine Modal */}
				<UploadCastsModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadCastsRef}
			/>
			<UploadChemicalExamModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadChemicalRef}
			/>
			<UploadCrystalsModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadCrystalRef}
			/>
			<UploadMacroscopicExamModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadMacroscopicUrineRef}
			/>
			<UploadMicroscopicExamModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadMicroscopicUrineRef}
			/>
			<UploadPregnancyTestModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadPregnancyTestRef}
			/>
			{/* Serology Modal */}
			<UploadAntiHBSModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadAntiHBSRef}
			/>
			<UploadAntiHCVModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadAntiHCVRef}
			/>
			<UploadASOModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadASORef}
			/>
			<UploadCKMBModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadCKMBRef}
			/>
			<UploadCRPModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadCRPRef}
			/>
			<UploadDengueDuoModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadDengueDuoRef}
			/>
			<UploadHBsAgModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadHBsAGRef}
			/>
			<UploadRheumatoidModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadRheumatoidRef}
			/>
			<UploadSyphilisModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadSyphilisRef}
			/>
			<UploadTroponinModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadTroponinRef}
			/>
			<UploadTyphoidTestModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadTyphoidRef}
			/>
			<UploadWidalTestModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadWidalTestRef}
			/>


			<UploadBloodTypingModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadBloodTypeRef}
			/>
			<UploadCovidRapidTestModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadCovidTestRef}
			/>
			<UploadCrossMatchingModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadCrossMatchingRef}
			/>
			<UploadMiscellaneousFormModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={uploadMiscellaneousRef}
			/>
			<UploadPapSmearModal 
			ref={uploadPAPSmearRef}
			patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
			/>

		
			<ViewLabResultModal
				patient={patient}
				onSuccess={() => {
					onUploadLabResultSuccess();
					reloadData();
				}}
				ref={viewLabResultRef}
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
	);
};

export default LaboratoryOrders;

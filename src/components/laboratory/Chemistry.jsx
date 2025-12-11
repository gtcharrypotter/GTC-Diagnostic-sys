
import { useRef } from "react";
import FlatIcon from "../../components/FlatIcon";
import ActionBtn from "../../components/buttons/ActionBtn";
import CultureInitialModal from "../../components/modal/laboratory/CultureInitialModal";
import FbsModal from "../../components/modal/laboratory/chemistry-lab/FbsModal";
import MagnesiumModal from "../../components/modal/laboratory/chemistry-lab/MagnesiumModal";
import PhophorusModal from "../../components/modal/laboratory/chemistry-lab/PhophorusModal";
import AmylaseModal from "../../components/modal/laboratory/chemistry-lab/AmylaseModal";
import RbsModal from "../../components/modal/laboratory/chemistry-lab/RbsModal";
import CreatinineChemModal from "../../components/modal/laboratory/chemistry-lab/CreatinineChemModal";
import UricAcidModal from "../../components/modal/laboratory/chemistry-lab/UricAcidModal";
import SgptModal from "../../components/modal/laboratory/chemistry-lab/SgptModal";
import AlkalineModal from "../../components/modal/laboratory/chemistry-lab/AlkalineModal";
import LdhModal from "../../components/modal/laboratory/chemistry-lab/LdhModal";
import GgtModal from "../../components/modal/laboratory/chemistry-lab/GgtModal";
import SgotModal from "../../components/modal/laboratory/chemistry-lab/SgotModal";
import InfoText from "../../components/InfoText";
import OralGlucoseModal from "../../components/modal/laboratory/chemistry-lab/oral-glucose/OralGlucoseModal";
import GramsOralGlucoseModal from "../../components/modal/laboratory/chemistry-lab/oral-glucose/GramsOralGlucoseModal";
import BloodGlucoseModal from "../../components/modal/laboratory/chemistry-lab/oral-glucose/BloodGlucoseModal";
import UrineGlucoseModal from "../../components/modal/laboratory/chemistry-lab/oral-glucose/UrineGlucoseModal";

/* eslint-disable react/prop-types */


const Chemistry = (props) => {
  const { patient} = props;
  const fbsRef = useRef(null);
  const rbsRef = useRef(null);
  const creatinineRef = useRef(null);
  const uricAcidRef = useRef(null);
  const sgotchemRef = useRef(null);
  const sgptRef = useRef(null);
  const alkalineRef = useRef(null);
  const ldhRef = useRef(null);
  const ggtRef = useRef(null);
  const magnesiumRef = useRef(null);
  const phophorusRef = useRef(null);
  const amylaseRef = useRef(null);
  const cultureRef = useRef(null);
  const oralGlucoseRef = useRef(null);
  const bloodGlucoseRef = useRef(null);
  const UrineGlucoseRef = useRef(null);
  const gramsGucoseRef = useRef(null);
  return (
    <div className="flex flex-col gap-y-2 w-full">

   
      <div className="flex items-center justify-between w-full">
    <div className="italic border-b w-full flex items-center font-semibold pb-2"> 
                <InfoText
					icon="rr-notes"
					labelClassName="flex justify-between"
					title="Laboratory Test"
					contentClassName="pl-2"
					// value={appointment?.order_laboratories}
				/>
    </div>
    </div>
    <div className="flex lg:flex-row gap-4 ">
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				fbsRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> FBS
		</ActionBtn>
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				rbsRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> RBS
		</ActionBtn>
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				creatinineRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Creatinine
		</ActionBtn>
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				uricAcidRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Uric Acid
		</ActionBtn>
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				sgotchemRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> SGOT
      
		</ActionBtn>
    </div>
    <div className="flex lg:flex-row gap-4 ">
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				sgptRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> SGPT
		</ActionBtn>
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				alkalineRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Alkaline Phos.
		</ActionBtn>
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				ldhRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> LDH
		</ActionBtn>
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				ggtRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> GGT
		</ActionBtn>
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				magnesiumRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Magnesium
		</ActionBtn>
    </div>
    <div className="flex lg:flex-row gap-4 ">
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				phophorusRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Phophorus
		</ActionBtn>
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				amylaseRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Amylase
		</ActionBtn>
		</div>
		<div className="flex lg:flex-row gap-4 ">
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				cultureRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Culture And Sensitive Initial Result
		</ActionBtn>
</div>
<div className="flex lg:flex-row gap-4 ">
		<ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				oralGlucoseRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Oral Glucose Tolerance 
		</ActionBtn>
		<ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				bloodGlucoseRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Blood Glucose
		</ActionBtn>
		<ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				UrineGlucoseRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Urine Glucose
		</ActionBtn>
		<ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				gramsGucoseRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> 50 Grams Oral Glucose
		</ActionBtn>
</div>
    <CultureInitialModal 
    ref={cultureRef}
    />

    <FbsModal ref={fbsRef}/>
    <RbsModal ref={rbsRef}/>
    <CreatinineChemModal ref={creatinineRef} />
    <UricAcidModal ref={uricAcidRef} />
    <SgotModal ref={sgotchemRef}/>
    <SgptModal ref={sgptRef}/>
    <AlkalineModal ref={alkalineRef} />
    <LdhModal ref={ldhRef}/>
    <GgtModal ref={ggtRef}/>
    <MagnesiumModal ref={magnesiumRef} />
    <PhophorusModal ref={phophorusRef} />
    <AmylaseModal ref={amylaseRef} />
	<OralGlucoseModal ref={oralGlucoseRef} />
	<BloodGlucoseModal ref={bloodGlucoseRef} />
	<UrineGlucoseModal ref={UrineGlucoseRef} />
	<GramsOralGlucoseModal ref={gramsGucoseRef} />
    </div>
    

  )
}

export default Chemistry
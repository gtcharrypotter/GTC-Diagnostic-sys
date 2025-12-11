import { useRef } from "react";
import FlatIcon from "../../components/FlatIcon";
import ActionBtn from "../../components/buttons/ActionBtn";
import InfoText from "../../components/InfoText";
import AntiHBSModal from "../../components/modal/laboratory/serology-lab/AntiHBSModal";
import AntiHCVModal from "../../components/modal/laboratory/serology-lab/AntiHCVModal";
import AntistrptolysinModal from "../../components/modal/laboratory/serology-lab/AntistrptolysinModal";
import DengueDouModal from "../../components/modal/laboratory/serology-lab/DengueDouModal";
import HepaBModal from "../../components/modal/laboratory/serology-lab/HepaBModal";
import ReactiveProteinModal from "../../components/modal/laboratory/serology-lab/ReactiveProteinModal";
import RheumatoidModal from "../../components/modal/laboratory/serology-lab/RheumatoidModal";
import SyphilisModal from "../../components/modal/laboratory/serology-lab/SyphilisModal";
import TyphoidModal from "../../components/modal/laboratory/serology-lab/TyphoidModal";
import WidalModal from "../../components/modal/laboratory/serology-lab/WidalModal";

/* eslint-disable react/prop-types */

const Serology = (props) => {
  const {patient} = props;
  const antiHbsRef = useRef(null);
  const antiHcvRef = useRef(null);
  const antistreptolysinRef = useRef(null);
  const dengueDouRef = useRef(null);
  const HepaBRef = useRef(null);
  const ReactiveProRef = useRef(null);
  const RheumatoidRef = useRef(null);
  const syphilisRef = useRef(null);
  const typhoidRef = useRef(null);
  const widalRef = useRef(null);
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
				antiHbsRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Anti HBS
		</ActionBtn>
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				antiHcvRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Anti HCV
		</ActionBtn>
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				antistreptolysinRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Antistretolysin
		</ActionBtn>
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				dengueDouRef?.current?.show(patient);
			}}p
		>
			<FlatIcon icon="rr-plus" /> Dengue Dou
		</ActionBtn>
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				HepaBRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Hepa B
      
		</ActionBtn>
    </div>
    <div className="flex lg:flex-row gap-4 ">
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				ReactiveProRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Reactive
		</ActionBtn>
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				RheumatoidRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Rheumatoid
		</ActionBtn>
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				syphilisRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Syphilis
		</ActionBtn>
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				typhoidRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Typhoid
		</ActionBtn>
    <ActionBtn
			className="text-base gap-2 !w-[200px] mr-2"
			onClick={() => {
				widalRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Widal
		</ActionBtn>
    </div>

    <AntiHBSModal ref={antiHbsRef}/>
    <AntiHCVModal ref={antiHcvRef}/>
    <AntistrptolysinModal ref={antistreptolysinRef}/>
    <DengueDouModal ref={dengueDouRef}/>
    <HepaBModal ref={HepaBRef}/>
    <ReactiveProteinModal ref={ReactiveProRef}/>
    <RheumatoidModal ref={RheumatoidRef}/>
    <SyphilisModal ref={syphilisRef}/>
    <TyphoidModal ref={typhoidRef}/>
    <WidalModal ref={widalRef}/>
    </div>
  )
}

export default Serology
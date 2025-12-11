import { useRef } from "react";
import FlatIcon from "../../components/FlatIcon";
import ActionBtn from "../../components/buttons/ActionBtn";
import HematologyExamModal from "../../components/modal/laboratory/HematologyExamModal";
import CoagulationModal from "../../components/modal/laboratory/CoagulationModal";

/* eslint-disable react/prop-types */
const Card = ({ title, children, icon, color }) => {
  return (
    <div className="shadow-sm rounded-xl flex items-center p-3 w-1/2 2xl:w-[calc(100%/3-24px)] border-[0.5px] border-blue-300">
      <div className="flex flex-col pb-3">
        <h3
          className="text-base font-bold text-gray-900 mb-0 text-opacity-75"
          style={{ color: color }}
        >
            {title}
          </h3>
          <div className="h-[3px] w-4/5 bg-blue-300 mb-[1px]" />
          <div className="h-[2px] w-2/5 bg-red-300 mb-3" />
          {children}
        </div>
        <div className="p-1 bg-white bg-opacity-5 rounded-xl ml-auto">
          <img
            src={`/laboratory/${icon}.png`}
            className="w-10 object-contain"
          />
        </div>
      </div>
    );
   };

const Hematology = (props) => {
const { patient} = props;
const hematologyRef = useRef(null);
const coagulationRef = useRef(null);

  return (
    <div className="flex flex-col gap-y-2 w-full">
      <div className="flex items-center justify-between w-full">
    <div className="italic border-b w-full flex items-center font-semibold pb-2"> 
    <span className="mr-4">HEMATOLOGY</span> 
     <ActionBtn
			className="text-base gap-2 !w-[250px] mr-2"
			onClick={() => {
				hematologyRef?.current?.show(patient);
			}}
		>  
			<FlatIcon icon="rr-plus" /> Hematology Examination
		</ActionBtn>
    <ActionBtn
			className="text-base gap-2 !w-[250px] mr-2"
			onClick={() => {
				coagulationRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Coagulation Examination
		</ActionBtn>
    </div>
    </div>
    <HematologyExamModal 
      ref={hematologyRef}
      />
      <CoagulationModal 
      ref={coagulationRef}
      />
    <div className="flex items-start justify-start flex-wrap gap-3 mb-3 w-full px-0">
      <Card
      color="red"
      title="Cuagulation Studies"
      icon="result"
      >
      </Card>
      <Card
      color="red"
      title="Complete Blood Count"
      icon="result"
      >
      </Card>
      <Card
      color="red"
      title="Red Cell Indices"
      icon="result"
      >
      </Card>
      <Card
      color="red"
      title="Erythrocyte Sedimentation Rate"
      icon="result"
      >
      </Card>
      <Card
      color="red"
      title="Differential Count"
      icon="result"
      >
      </Card>
      <Card
      color="red"
      title="Platelet Count"
      icon="result"
      >
      </Card>
      <Card
      color="red"
      title="Reticulocyte Count"
      icon="result"
      >
      </Card>
      </div>
    </div>
  )
}

export default Hematology
import { useRef } from "react";
import FlatIcon from "../../components/FlatIcon";
import ActionBtn from "../../components/buttons/ActionBtn";
import UltrasoundModal from "../../components/modal/laboratory/UltrasoundModal";

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

const Ultrasound = (props) => {
  const { patient} = props;
  const ultrasoundRef = useRef(null);
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <div className="flex items-center justify-between w-full">
    <div className="italic border-b w-full flex items-center font-semibold pb-2"> 
    <span className="mr-4">ULTRASOUND</span> 
     <ActionBtn
			className="text-base gap-2 !w-[250px] mr-2"
			onClick={() => {
				ultrasoundRef?.current?.show(patient);
			}}
		>  
			<FlatIcon icon="rr-plus" /> Ultrasound Report
		</ActionBtn>
    </div>
    </div>
      <UltrasoundModal 
      ref={ultrasoundRef}
      />
    <div className="flex items-start justify-start flex-wrap gap-3 mb-3 w-full px-0">
      <Card
      color="red"
      title="Ultrasound Result"
      icon="result"
      >
      </Card>
      </div>
    </div>
  )
}

export default Ultrasound
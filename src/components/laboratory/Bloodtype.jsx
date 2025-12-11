// import { useForm } from "react-hook-form";
import FlatIcon from "../../components/FlatIcon";
import ActionBtn from "../../components/buttons/ActionBtn";
import { useRef } from "react";
import BloodTypeModal from "../../components/modal/laboratory/BloodTypeModal";

/* eslint-disable react/prop-types */
const Bloodtype = (props) => {
const { patient} = props;
const bloodtypeRef = useRef(null);


  return (
<div className="flex flex-col items-start">
	<div className="border-b w-full flex items-center pb-2">
		<span className="text-base font-semibold text-tertiary">
			Blood Typing Examination
		</span>
		<ActionBtn
			className="ml-5 h-8 text-base gap-2 !w-[200px]"
			onClick={() => {
				bloodtypeRef?.current?.show(patient);
			}}
		>
			<FlatIcon icon="rr-plus" /> Blood Typing
		</ActionBtn>
	</div>

	<BloodTypeModal 
	ref={bloodtypeRef}
	/>
</div>
  )
}

export default Bloodtype
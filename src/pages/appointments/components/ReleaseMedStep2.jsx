import { useState } from "react";
import ContentTitle from "../../../components/buttons/ContentTitle";
import ActionBtn from "../../../components/buttons/ActionBtn";
import FlatIcon from "../../../components/FlatIcon";

const ReleaseMedStep2 = ({
	satisfaction,
	loading,
	setStatisfaction,
	submitSatisfaction,
}) => {
	const [result, setResult] = useState(null);
	const updateData = (data) => {
		setResult(data);
		if (setStatisfaction) {
			setStatisfaction(data);
		}
	};
	return (
		<>
			<div className="flex flex-col items-center justify-center mb-4 text-center">
				<ContentTitle title="Satisfaction Rating" />
			</div>
			<div className="flex flex-col items-center justify-center">
				<span className="mb-1 text-sm">
					How satisfied are you with the service provided?{" "}
				</span>
				<b className="text-xs mb-8">
					(Gaano ka nasiyahan sa natanggap mong serbisyo?)
				</b>
				<div className="flex items-center justify-center gap-4">
					<div
						className={`flex flex-col text-sm gap-4 items-center justify-center grayscale hover:bg-yellow-200 rounded-full px-5 text-center py-5 hover:grayscale-0 duration-200 ${
							result == "very satisfied"
								? "!grayscale-0 bg-yellow-200 opacity-100"
								: "opacity-70"
						}`}
						onClick={() => {
							updateData("very satisfied");
						}}
					>
						<img className="h-11 w-11" src="/happy.png" />
					</div>
					<div
						className={`flex flex-col text-sm gap-4 items-center justify-center grayscale hover:bg-yellow-200 rounded-full px-5 text-center py-5 hover:grayscale-0 duration-200 ${
							result == "neutral"
								? "!grayscale-0 bg-yellow-200 opacity-100"
								: "opacity-70"
						}`}
						onClick={() => {
							updateData("neutral");
						}}
					>
						<img className="h-11 w-11" src="/neutral.png" />
					</div>
					<div
						className={`flex flex-col text-sm gap-4 items-center justify-center grayscale hover:bg-yellow-200 rounded-full px-5 text-center py-5 hover:grayscale-0 duration-200 ${
							result == "unsatisfied"
								? "!grayscale-0 bg-yellow-200 opacity-100"
								: "opacity-70"
						}`}
						onClick={() => {
							updateData("unsatisfied");
						}}
					>
						<img className="h-11 w-11" src="/sad.png" />
					</div>
				</div>
				<div>
					<p className="text-center w-full">
						You are
						<b> {result || "undecided"} </b> with our service.
					</p>
				</div>
			</div>
			<ActionBtn
				className="px-4 !rounded-2xl w-1/2 mt-5 mx-auto"
				type="success"
				disabled={!result}
				loading={loading}
				onClick={submitSatisfaction}
			>
				Proceed to next step
				<FlatIcon
					icon="rr-angle-double-small-right"
					className="mr-2 text-xl"
				/>
			</ActionBtn>
		</>
	);
};

export default ReleaseMedStep2;

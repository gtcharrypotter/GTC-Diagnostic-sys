import React from "react";
import TextInput from "../../../../../components/inputs/TextInput";

const GramsOralGlucose = ({ register, errors }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full">
			<div className="p-3 mt-2">
				<div className="flex flex-col lg:flex-row gap-4 ">
					<p className="italic  text-lg font-semibold">
						50 Grams Oral Glucose Challenge Test
					</p>
				</div>
				<div className="flex flex-col lg:flex-row gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Result
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("result", {
							required: true,
						})}
						placeholder="Result"
						InputLabelProps={{ shrink: true }}
						error={errors?.result}
						helperText={errors?.result && "This field is required"}
					/>
				</div>
			</div>
		</div>
	);
};

export default GramsOralGlucose;

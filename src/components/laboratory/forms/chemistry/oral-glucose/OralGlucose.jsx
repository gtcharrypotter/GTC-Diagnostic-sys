import React from "react";
import TextInput from "../../../../../components/inputs/TextInput";

const OralGlucose = ({ register, errors }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full">
			<div className="p-3 mt-2">
				<div className="flex flex-col lg:flex-row gap-4 ">
					<p className="italic  text-lg font-semibold">
						OGTT-Oral Glucose Tolerance Test
					</p>
				</div>
				<div className="flex flex-col lg:flex-row gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Glucose Load
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("glucose_load", {
							required: true,
						})}
						placeholder="Glucose Load"
						InputLabelProps={{ shrink: true }}
						error={errors?.glucose_load}
						helperText={
							errors?.glucose_load && "This field is required"
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default OralGlucose;

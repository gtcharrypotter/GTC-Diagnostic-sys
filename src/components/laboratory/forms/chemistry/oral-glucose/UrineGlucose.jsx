import React from "react";
import TextInput from "../../../../../components/inputs/TextInput";

const UrineGlucose = ({ register, errors }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full">
			<div className="p-3 mt-2">
				<div className="flex flex-col lg:flex-row gap-4 ">
					<p className="italic  text-lg font-semibold">
						Urine Glucose
					</p>
				</div>
				<div className="flex flex-col lg:flex-row gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Fasting
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fasting", {
							required: true,
						})}
						placeholder="Fasting"
						InputLabelProps={{ shrink: true }}
						error={errors?.fasting}
						helperText={errors?.fasting && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								1st Hour
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("first_hour", {
							required: true,
						})}
						placeholder="1st Hour"
						InputLabelProps={{ shrink: true }}
						error={errors?.first_hour}
						helperText={
							errors?.first_hour && "This field is required"
						}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								2nd Hour
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("second_hour", {
							required: true,
						})}
						placeholder="2nd Hour"
						InputLabelProps={{ shrink: true }}
						error={errors?.second_hour}
						helperText={
							errors?.second_hour && "This field is required"
						}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								3rd Hour
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("third_hour", {
							required: true,
						})}
						placeholder="3rd Hour"
						InputLabelProps={{ shrink: true }}
						error={errors?.third_hour}
						helperText={
							errors?.third_hour && "This field is required"
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default UrineGlucose;

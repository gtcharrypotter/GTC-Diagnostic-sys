import TextInput from "../../../../components/inputs/TextInput";

/* eslint-disable react/prop-types */
const LipidProfile = ({ register, errors }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full">
			<div className="p-3 mt-2">
				<div className="flex flex-col lg:flex-row gap-4 ">
					<p className="italic  text-lg font-semibold">
						Lipid Profile
					</p>
				</div>
				<div className="flex flex-col lg:flex-row gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Cholesterol
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("cholesterol", {
							required: true,
						})}
						placeholder="Cholesterol"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Triglyceride
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("triglyceride", {
							required: true,
						})}
						placeholder="Triglyceride"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								HDL
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("hdl", {
							required: true,
						})}
						placeholder="HDL"
						InputLabelProps={{ shrink: true }}
						error={errors?.creatinine}
						helperText={
							errors?.creatinine && "This field is required"
						}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								LDL
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("ldl", {
							required: true,
						})}
						placeholder="LDL"
						InputLabelProps={{ shrink: true }}
						error={errors?.uric_acid}
						helperText={
							errors?.uric_acid && "This field is required"
						}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								HbA1C
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("hba1c", {
							required: true,
						})}
						placeholder="HbA1C"
						InputLabelProps={{ shrink: true }}
						error={errors?.sgot}
						helperText={errors?.sgot && "This field is required"}
					/>
				</div>
			</div>
		</div>
	);
};

export default LipidProfile;

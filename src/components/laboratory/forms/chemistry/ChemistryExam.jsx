/* eslint-disable react/prop-types */

import TextInput from "../../../../components/inputs/TextInput";

const ChemistryExam = ({ register, errors }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full">
			<div className="p-3">
				<div className="flex flex-col lg:flex-row gap-4 ">
					<p className="italic  text-lg font-semibold">
						Chemistry Examination Result
					</p>
				</div>
				<div className="flex lg:flex-row gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								FBS
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="FBS"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								RBS
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("rbs", {
							required: true,
						})}
						placeholder="RBS"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Creatinine
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("creatinine", {
							required: true,
						})}
						placeholder="Creatinine"
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
								Uric Acid
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("uric_acid", {
							required: true,
						})}
						placeholder="Uric Acid"
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
								SGOT
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("sgot", {
							required: true,
						})}
						placeholder="SGOT"
						InputLabelProps={{ shrink: true }}
						error={errors?.sgot}
						helperText={errors?.sgot && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								SGPT
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("sgpt", {
							required: true,
						})}
						placeholder="SGPT"
						InputLabelProps={{ shrink: true }}
						error={errors?.sgpt}
						helperText={errors?.sgpt && "This field is required"}
					/>
				</div>
				<div className="flex flex-col lg:flex-row gap-4 mb-2 ">
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Alkaline Phos.
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("alkaline_phos", {
							required: true,
						})}
						placeholder="Alkaline Phos."
						InputLabelProps={{ shrink: true }}
						error={errors?.alkaline_phos}
						helperText={
							errors?.alkaline_phos && "This field is required"
						}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								LDH
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("ldh", {
							required: true,
						})}
						placeholder="LDH"
						InputLabelProps={{ shrink: true }}
						error={errors?.ldh}
						helperText={errors?.ldh && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								GGT
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("ggt", {
							required: true,
						})}
						placeholder="GGT"
						InputLabelProps={{ shrink: true }}
						error={errors?.ggt}
						helperText={errors?.ggt && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Magnesium
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("magnesium", {
							required: true,
						})}
						placeholder="Magnesium"
						InputLabelProps={{ shrink: true }}
						error={errors?.magnesium}
						helperText={
							errors?.magnesium && "This field is required"
						}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Phosphorus
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("phosphorus", {
							required: true,
						})}
						placeholder="Phosphorus"
						InputLabelProps={{ shrink: true }}
						error={errors?.phosphorus}
						helperText={
							errors?.phosphorus && "This field is required"
						}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Amylase
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("amylase", {
							required: true,
						})}
						placeholder="Amylase"
						InputLabelProps={{ shrink: true }}
						error={errors?.amylase}
						helperText={errors?.amylase && "This field is required"}
					/>
				</div>
			</div>
		</div>
	);
};

export default ChemistryExam;

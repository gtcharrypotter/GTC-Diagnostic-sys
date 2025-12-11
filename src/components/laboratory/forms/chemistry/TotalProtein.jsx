/* eslint-disable react/prop-types */

import TextInput from "../../../../components/inputs/TextInput";

const TotalProtein = ({ register, errors }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full">
			<div className="p-3 mt-2">
				<div className="flex flex-col lg:flex-row gap-4 ">
					<p className="italic  text-lg font-semibold">
						TP A/G (Total Protein A/G Ratio)
					</p>
				</div>
				<div className="flex flex-col lg:flex-row gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Total Protein
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Total Protein"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Albumin
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("rbs", {
							required: true,
						})}
						placeholder="Albumin"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Globulin
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("creatinine", {
							required: true,
						})}
						placeholder="Globulin"
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
								A/G Ratio
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("uric_acid", {
							required: true,
						})}
						placeholder="A/G Ratio"
						InputLabelProps={{ shrink: true }}
						error={errors?.uric_acid}
						helperText={
							errors?.uric_acid && "This field is required"
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default TotalProtein;

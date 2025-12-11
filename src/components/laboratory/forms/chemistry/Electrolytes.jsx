import TextInput from "../../../../components/inputs/TextInput";

/* eslint-disable react/prop-types */
const Electrolytes = ({ register, errors }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full">
			<div className="p-3 mt-2">
				<div className="flex flex-col lg:flex-row gap-4 ">
					<p className="italic  text-lg font-semibold">
						Electrolytes
					</p>
				</div>
				<div className="flex flex-col lg:flex-row gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Sodium
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Sodium"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Potassium
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("rbs", {
							required: true,
						})}
						placeholder="Potassium"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Calcium (Total)
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("creatinine", {
							required: true,
						})}
						placeholder="Calcium (Total)"
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
								Calcium (Ionized)
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("uric_acid", {
							required: true,
						})}
						placeholder="Calcium (Ionized)"
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
								pH
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("sgot", {
							required: true,
						})}
						placeholder="pH"
						InputLabelProps={{ shrink: true }}
						error={errors?.sgot}
						helperText={errors?.sgot && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Chloride
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("sgot", {
							required: true,
						})}
						placeholder="Chloride"
						InputLabelProps={{ shrink: true }}
						error={errors?.sgot}
						helperText={errors?.sgot && "This field is required"}
					/>
				</div>
			</div>
		</div>
	);
};

export default Electrolytes;

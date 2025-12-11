import TextInput from "../../../../components/inputs/TextInput";

/* eslint-disable react/prop-types */
const HoursUrineCreatinine = ({ register, errors }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full">
			<div className="p-3 mt-2">
				<div className="flex flex-col lg:flex-row gap-4 ">
					<p className="italic  text-lg font-semibold">
						24 HOUR URINE CREATININE
					</p>
				</div>
				<div className="flex flex-col lg:flex-row gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								24 Hours Urine Volume
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="24 Hours Urine Volume"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Serum Creatinine
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("rbs", {
							required: true,
						})}
						placeholder="Serum Creatinine"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Urine Creatinine
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("creatinine", {
							required: true,
						})}
						placeholder="Urine Creatinine"
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
								24 Hours Urine Creatinine
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("uric_acid", {
							required: true,
						})}
						placeholder="24 Hours Urine Creatinine"
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
								Creatinine Clearance
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("sgot", {
							required: true,
						})}
						placeholder="Creatinine Clearance"
						InputLabelProps={{ shrink: true }}
						error={errors?.sgot}
						helperText={errors?.sgot && "This field is required"}
					/>
				</div>
			</div>
		</div>
	);
};

export default HoursUrineCreatinine;

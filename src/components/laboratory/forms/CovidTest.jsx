import TextInput from "../../../components/inputs/TextInput";

const CovidTest = ({ register, errors }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full">
			<div className="p-3">
				<div className="flex flex-row lg:flex-col gap-4 ">
					<p className="italic  text-lg font-semibold">
						Covid-19 Rapid Antigen Test
					</p>
				</div>
				<div className="flex lg:flex-col gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Type of Specimen
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Type of Specimen"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Test Kit Brand
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Test Kit Brand"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Method
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Method"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Result
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Result"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Value
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Value"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
				</div>
			</div>
			<TextInput
				className="w-full bg-white"
				label={
					<>
						Remarks
						<b className="text-red-500 ml-1">*</b>
					</>
				}
				variant="outlined"
				{...register("fbs", {
					required: true,
				})}
				placeholder="Remarks"
				InputLabelProps={{ shrink: true }}
				error={errors?.fbs}
				helperText={errors?.fbs && "This field is required"}
			/>
		</div>
	);
};

export default CovidTest;

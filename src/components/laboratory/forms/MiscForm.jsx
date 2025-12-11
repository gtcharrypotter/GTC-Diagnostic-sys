import TextInput from "../../../components/inputs/TextInput";

const MiscForm = ({ register, errors }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full">
			<div className="p-3">
				<div className="flex flex-row lg:flex-col gap-4 ">
					<p className="italic  text-lg font-semibold">
						Miscellaneous Form
					</p>
				</div>
				<div className="flex lg:flex-col gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Test Name/Method
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
						className="w-full bg-white lg:w-1/2"
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
						placeholder="FBS"
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
				placeholder="FBS"
				InputLabelProps={{ shrink: true }}
				error={errors?.fbs}
				helperText={errors?.fbs && "This field is required"}
			/>
		</div>
	);
};

export default MiscForm;

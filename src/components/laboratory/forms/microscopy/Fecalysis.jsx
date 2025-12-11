import TextInput from "../../../../components/inputs/TextInput";

const Fecalysis = ({ register, errors }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full">
			<div className="p-3">
				<div className="flex flex-row lg:flex-col gap-4 ">
					<p className="italic  text-lg font-semibold">
						Macroscopic Exam
					</p>
				</div>
				<div className="flex lg:flex-row gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Color
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Color"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Consistency
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("rbs", {
							required: true,
						})}
						placeholder="Consistency"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
				</div>
			</div>
			<div className="p-3">
				<div className="flex flex-col lg:flex-row gap-4 ">
					<p className="italic  text-lg font-semibold">
						Microscopic Examination
					</p>
				</div>
				<div className="flex lg:flex-row gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								RBC
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="RBC"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								WBC
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("rbs", {
							required: true,
						})}
						placeholder="WBC"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Fat Globules
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("rbs", {
							required: true,
						})}
						placeholder="Fat Globules"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Yeast Cells
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("rbs", {
							required: true,
						})}
						placeholder="Yeast Cells"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
				</div>
			</div>
			<div className="p-3">
				<div className="flex flex-row lg:flex-col gap-4 ">
					<p className="italic text-lg font-semibold">
						Fecal Occult Blood
					</p>
				</div>
				<div className="flex lg:flex-col gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Fecal Occult Blood
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Fecal Occult Blood"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Ascaris Lumbricoides Ova
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Ascaris Lumbricoides Ova"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Trichiuris Trichiura Ova
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Trichiuris Trichiura Ova"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Hookworm Ova
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Hookworm Ova"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Entamoeba histolytica Cyst
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Entamoeba histolytica Cyst"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								E. histolytica Trophozoite
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="E. histolytica Trophozoite"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Giardia lamblia Cyst
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Giardia lamblia Cyst"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Giardia lamblia Trophozoite
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Giardia lamblia Trophozoite"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
				</div>
			</div>
			<TextInput
				className="w-full bg-white font-bold"
				label={
					<>
						Others
						<b className="text-red-500 ml-1">*</b>
					</>
				}
				variant="outlined"
				{...register("fbs", {
					required: true,
				})}
				placeholder="Others"
				InputLabelProps={{ shrink: true }}
				error={errors?.fbs}
				helperText={errors?.fbs && "This field is required"}
			/>
			<TextInput
				className="w-full bg-white font-bold"
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

export default Fecalysis;

import TextInput from "../../../../components/inputs/TextInput";

const SerologyExam = ({ register, errors }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full">
			<div className="p-3">
				<div className="flex flex-row lg:flex-col gap-4 ">
					<p className="italic  text-lg font-semibold">
						Fluoresce Enzyme Immunoassay
					</p>
				</div>
				<div className="flex flex-row lg:flex-col gap-4 ">
					<p className="italic  text-xl font-semibold">
						Cardiac Markers
					</p>
				</div>
				<div className="flex lg:flex-row gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Troponin - I
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Troponin - I"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								CK - MB
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("rbs", {
							required: true,
						})}
						placeholder="CK - MB"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
				</div>
			</div>
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

			<div className="p-3">
				<div className="flex flex-col lg:flex-row gap-4 ">
					<p className="italic  text-lg font-semibold"></p>
				</div>
				<div className="flex lg:flex-col gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								HBsAg (Hepatitis B Surface Antigen)
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Hepatitis B Surface Antigen"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Anti - HBS
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("rbs", {
							required: true,
						})}
						placeholder="Anti - HBS"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Anti - HCV
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("rbs", {
							required: true,
						})}
						placeholder="Anti - HCV"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Syphilis (Rapid Test)
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("rbs", {
							required: true,
						})}
						placeholder="Syphilis (Rapid Test)"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								ASO (Antistreptolysin O Titer)
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("rbs", {
							required: true,
						})}
						placeholder="ASO (Antistreptolysin O Titer)"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								RA/RF (Rheumatoid Factor)
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("rbs", {
							required: true,
						})}
						placeholder="RA/RF (Rheumatoid Factor)"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								CRP (C-Reactive Protein)
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("rbs", {
							required: true,
						})}
						placeholder="CRP (C-Reactive Protein)"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Troponin - I
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("rbs", {
							required: true,
						})}
						placeholder="Troponin - I"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
				</div>
			</div>
			<div className="p-3">
				<div className="flex flex-col lg:flex-row gap-4 ">
					<p className="italic  text-lg font-semibold">Dengue Duo</p>
				</div>
				<div className="flex lg:flex-row gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								NS1
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="NS1"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								IgG
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("rbs", {
							required: true,
						})}
						placeholder="IgG"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								IgM
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("rbs", {
							required: true,
						})}
						placeholder="IgM"
						InputLabelProps={{ shrink: true }}
						error={errors?.rbs}
						helperText={errors?.rbs && "This field is required"}
					/>
				</div>
			</div>
			<div className="p-3">
				<div className="flex flex-row lg:flex-col gap-4 ">
					<p className="italic text-lg font-semibold">Typhoid Test</p>
				</div>
				<div className="flex lg:flex-row gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								IgG
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="IgG"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								IgM
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="IgM"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
				</div>
			</div>
			<div className="p-3">
				<div className="flex flex-row lg:flex-col gap-4 ">
					<p className="italic text-lg font-semibold">Widal Test</p>
				</div>
				<div className="flex lg:flex-col gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Salmonella Typhi H
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Salmonella Typhi H"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Salmonella Paratyphi AH
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Salmonella Paratyphi AH"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Salmonella Paratyphi BH
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Salmonella Paratyphi BH"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Salmonella Paratyphi CH
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Salmonella Paratyphi CH"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Salmonella Typhi O
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Salmonella Typhi O"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Salmonella Paratyphi AO
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Salmonella Paratyphi AO"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Salmonella Paratyphi BO
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Salmonella Paratyphi BO"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Salmonella Paratyphi CO
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Salmonella Paratyphi CO"
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

export default SerologyExam;

import TextInput from "./inputs/TextInput";

/* eslint-disable react/prop-types */
const VitalsForm = ({ register, errors }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full">
			<div className="flex flex-col lg:flex-row gap-4 ">
				<TextInput
					className="w-full bg-white  lg:w-1/4"
					label={
						<>
							Temperature
							<b className="text-red-500 ml-1">*</b>
						</>
					}
					variant="outlined"
					{...register("temperature", {
						required: true,
					})}
					placeholder="°C"
					InputLabelProps={{ shrink: true }}
					error={errors?.temperature}
					helperText={errors?.temperature && "This field is required"}
				/>
				<TextInput
					className="w-full bg-white  lg:w-1/4"
					label={
						<>
							Pulse
							<b className="text-red-500 ml-1">*</b>
						</>
					}
					variant="outlined"
					placeholder="bpm"
					{...register("pulse", {
						required: true,
					})}
					InputLabelProps={{ shrink: true }}
					error={errors?.pulse}
					helperText={errors?.pulse && "This field is required"}
				/>
			</div>
			<div className="flex flex-col lg:flex-row gap-4 ">
				<TextInput
					className="w-full bg-white  lg:w-1/4"
					label={
						<>
							Systolic Blood Pressure
							<b className="text-red-500 ml-1">*</b>
						</>
					}
					variant="outlined"
					{...register("blood_systolic", {
						required: true,
					})}
					placeholder="Systolic Blood Pressure"
					InputLabelProps={{ shrink: true }}
					error={errors?.blood_systolic}
					helperText={
						errors?.blood_systolic && "This field is required"
					}
				/>
				<TextInput
					className="w-full bg-white  lg:w-1/4"
					label={
						<>
							Diastolic Blood Pressure
							<b className="text-red-500 ml-1">*</b>
						</>
					}
					variant="outlined"
					{...register("blood_diastolic", {
						required: true,
					})}
					placeholder="Diastolic Blood Pressure"
					InputLabelProps={{ shrink: true }}
					error={errors?.blood_diastolic}
					helperText={
						errors?.blood_diastolic && "This field is required"
					}
				/>
			</div>
			<TextInput
				className="w-full bg-white  lg:w-1/4"
				label={
					<>
						Respiratory Rate
						{/* <b className="text-red-500 ml-1">*</b> */}
					</>
				}
				variant="outlined"
				{...register("respiratory", {
					required: false,
				})}
				placeholder="Breaths per minute"
				InputLabelProps={{ shrink: true }}
				error={errors?.respiratory}
				helperText={errors?.respiratory && "This field is required"}
			/>
			<div className="flex flex-col lg:flex-row gap-4 ">
				<TextInput
					className="w-full bg-white  lg:w-1/4"
					label={
						<>
							Height
							<b className="text-red-500 ml-1">*</b>
						</>
					}
					variant="outlined"
					{...register("height", {
						required: true,
					})}
					placeholder="feet"
					InputLabelProps={{ shrink: true }}
					error={errors?.height}
					helperText={errors?.height && "This field is required"}
				/>
				<TextInput
					className="w-full bg-white  lg:w-1/4"
					label={
						<>
							Weight
							<b className="text-red-500 ml-1">*</b>
						</>
					}
					variant="outlined"
					{...register("weight", {
						required: true,
					})}
					placeholder="KG"
					InputLabelProps={{ shrink: true }}
					error={errors?.weight}
					helperText={errors?.weight && "This field is required"}
				/>
			</div>
			<div className="flex flex-col lg:flex-row gap-4 ">
				<TextInput
					className="w-full bg-white  lg:w-1/4"
					label={
						<>
							Glucose
							{/* <b className="text-red-500 ml-1">*</b> */}
						</>
					}
					variant="outlined"
					{...register("glucose", {
						required: false,
					})}
					placeholder="mM"
					InputLabelProps={{ shrink: true }}
					error={errors?.glucose}
					helperText={errors?.glucose && "This field is required"}
				/>
				<TextInput
					className="w-full bg-white  lg:w-1/4"
					label={
						<>
							Uric Acid
							{/* <b className="text-red-500 ml-1">*</b> */}
						</>
					}
					variant="outlined"
					{...register("uric_acid", {
						required: false,
					})}
					placeholder="mM"
					InputLabelProps={{ shrink: true }}
					error={errors?.glucose}
					helperText={errors?.glucose && "This field is required"}
				/>
			</div>
			<TextInput
				className="w-full bg-white  lg:w-1/4"
				label={
					<>
						Cholesterol
						{/* <b className="text-red-500 ml-1">*</b> */}
					</>
				}
				variant="outlined"
				{...register("cholesterol", {
					required: false,
				})}
				placeholder="mg/dL"
				InputLabelProps={{ shrink: true }}
				error={errors?.cholesterol}
				helperText={errors?.cholesterol && "This field is required"}
			/>
		</div>
	);
};

export default VitalsForm;

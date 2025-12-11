import TextInput from "../../../../components/inputs/TextInput";
import FileInput from "../../../inputs/FileInput";

const PregnancyTest = ({ register, errors }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full">
			<div className="flex flex-col lg:flex-row gap-4 ">
				<TextInput
					className="w-full bg-white lg:w-1/2"
					label={
						<>
							Specimen
							<b className="text-red-500 ml-1">*</b>
						</>
					}
					variant="outlined"
					{...register("fbs", {
						required: true,
					})}
					placeholder="Specimen"
					InputLabelProps={{ shrink: true }}
					error={errors?.fbs}
					helperText={errors?.fbs && "This field is required"}
				/>
			</div>
			<div className="flex flex-col lg:flex-row gap-4 ">
				<TextInput
					className="w-full bg-white lg:w-1/2"
					label={
						<>
							Result
							<b className="text-red-500 ml-1">*</b>
						</>
					}
					variant="outlined"
					{...register("rbs", {
						required: true,
					})}
					placeholder="Result"
					InputLabelProps={{ shrink: true }}
					error={errors?.rbs}
					helperText={errors?.rbs && "This field is required"}
				/>
			</div>
			<div className="flex flex-col lg:flex-row gap-4 ">
				<FileInput />
			</div>
		</div>
	);
};

export default PregnancyTest;

import FileInput from "../../../../components/inputs/FileInput";
import TextInput from "../../../../components/inputs/TextInput";

const UltrasoundExam = ({ register, errors }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full">
			<div className="p-3">
				<div className="flex flex-row lg:flex-col gap-4 ">
					<p className="italic  text-lg font-semibold">
						Examination Performed
					</p>
				</div>
				<div className="flex lg:flex-row gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
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

			<div className="flex flex-row lg:flex-col gap-4 ">
				<p className="italic  text-lg font-semibold">Result</p>
			</div>
			<FileInput />
		</div>
	);
};

export default UltrasoundExam;

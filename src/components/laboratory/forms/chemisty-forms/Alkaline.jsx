/* eslint-disable react/prop-types */
import TextInput from "../../../../components/inputs/TextInput";

const Alkaline = ({ register, errors }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full">
			<div className="p-3">
				<div className="flex flex-col lg:flex-row gap-4 ">
					<p className="italic  text-lg font-semibold">
						Chemistry Examination Result
					</p>
				</div>
				<div className="flex lg:flex-row gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/4"
						label={
							<>
								Alkaline Phos.
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("alkaline_phos", {
							required: true,
						})}
						placeholder="Alkaline Phos."
						InputLabelProps={{ shrink: true }}
						error={errors?.alkaline_phos}
						helperText={
							errors?.alkaline_phos && "This field is required"
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default Alkaline;

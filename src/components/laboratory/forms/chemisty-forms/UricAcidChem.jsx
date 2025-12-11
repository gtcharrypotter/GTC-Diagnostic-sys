/* eslint-disable react/prop-types */

import TextInput from "../../../../components/inputs/TextInput";

const UricAcidChem = ({ register, errors }) => {
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
								Uric Acid
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("uric_acid", {
							required: true,
						})}
						placeholder="Uric Acid"
						InputLabelProps={{ shrink: true }}
						error={errors?.uric_acid}
						helperText={
							errors?.uric_acid && "This field is required"
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default UricAcidChem;

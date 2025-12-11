import React from "react";
import TextInput from "../../../../components/inputs/TextInput";

const AntiHBS = ({ register, errors }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full">
			<div className="p-3">
				<div className="flex flex-col lg:flex-row gap-4 ">
					<p className="italic  text-lg font-semibold"></p>
				</div>
				<div className="flex lg:flex-col gap-4 ">
					<TextInput
						className="w-full bg-white lg:w-1/2"
						label={
							<>
								Anti - HBS
								<b className="text-red-500 ml-1">*</b>
							</>
						}
						variant="outlined"
						{...register("fbs", {
							required: true,
						})}
						placeholder="Anti - HBS"
						InputLabelProps={{ shrink: true }}
						error={errors?.fbs}
						helperText={errors?.fbs && "This field is required"}
					/>
				</div>
			</div>
		</div>
	);
};

export default AntiHBS;

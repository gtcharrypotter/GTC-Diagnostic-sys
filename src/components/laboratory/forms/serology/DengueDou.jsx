import React from "react";
import TextInput from "../../../../components/inputs/TextInput";

const DengueDou = ({ register, errors }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full">
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
		</div>
	);
};

export default DengueDou;

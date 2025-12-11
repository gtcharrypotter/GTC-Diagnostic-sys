import ActionBtn from "../../../components/buttons/ActionBtn";
import { symptoms } from "../../../libs/appointmentOptions";

/* eslint-disable react/prop-types */
const TBConfirmation = ({
	appointment,
	register,
	setValue,
	handleSubmit,
	reset,
	trigger,
	control,
	watch,
	errors,
	submitPositive,
	submitNegative,
}) => {
	return (
		<>
			<div className="pb-3 flex items-center gap-4 px-2">
				<div className="flex flex-col w-1/2">
					<label>Refered by: </label>
					<b className="text-lg">
						{appointment?.bhs?.name
							? appointment?.bhs?.name
							: appointment?.rhu?.name}
					</b>
				</div>
				<div className="flex flex-col w-1/2">
					<label>Initial diagnosis: </label>
					<b className="text-lg">Tuberculosis</b>
				</div>
			</div>
			<div className="flex flex-col">
				<span className="text-base font-semibold mb-3">
					Specimen Picture
				</span>
				<div className="relative">
					<div className="pt-[45%]" />
					<img
						src={appointment?.specimen_picture}
						className="w-full h-full absolute top-0 bg-black border object-contain border-black left-0"
					/>
				</div>
			</div>
			<div>
				{appointment?.tb_symptoms != null ? (
					<div className="flex w-full lg:w-1/2 px-2 flex-col gap-1 mt-3 !shadow-yellow-600 rounded-sm bg-white">
						<ul>
							<li className="text-base font-semibold mb-2">
								Symptoms
							</li>
							{symptoms?.map((symp) => {
								return (
									<li
										className="!text-sm flex justify-between"
										key={`symp-${symp?.value}`}
									>
										<span>{symp.label} - </span>
										<b className="text-center">
											{appointment?.tb_symptoms[
												symp.value
											]
												? "YES"
												: "no "}
										</b>
									</li>
								);
							})}
						</ul>
					</div>
				) : (
					""
				)}
			</div>
			<div className="text-base capitalize font-bold mt-5 pb-3">
				Tuberculosis Test Procedures
			</div>
			<div className="flex flex-col relative gap-y-3 px-2">
				<label className="flex items-center gap-3 pl-2  text-sm">
					<input
						type="checkbox"
						id="step-1"
						className="scale-150"
						{...register("step1", {
							required: "This field is required",
						})}
					/>
					<span
						className={errors?.step1?.message ? "text-red-500" : ""}
					>
						Step 1 - Examine specimen picture
					</span>
				</label>
				<label className="flex items-center gap-3 pl-2  text-sm">
					<input
						type="checkbox"
						className="scale-150"
						disabled={!watch("step1") || watch("negative")}
						{...register("positive", {
							required: !watch("negative"),
						})}
					/>
					<span
						className={errors?.step1?.message ? "text-red-500" : ""}
					>
						Step 2.A - Check if POSITIVE
					</span>
				</label>
				<label className="flex items-center gap-3 pl-2 text-sm">
					<input
						type="checkbox"
						className="scale-150"
						disabled={!watch("step1") || watch("positive")}
						{...register("negative", {
							required: !watch("positive"),
						})}
					/>
					<span
						className={errors?.step1?.message ? "text-red-500" : ""}
					>
						Step 2.B - Check if NEGATIVE.
					</span>
				</label>
				<ActionBtn
					disabled={!(watch("negative") || watch("positive"))}
					onClick={() => {
						if (!watch("step1") || watch("positive")) {
							submitPositive();
						} else if (!watch("step1") || watch("negative")) {
							submitNegative();
						}
					}}
				>
					Submit
				</ActionBtn>
			</div>
		</>
	);
};

export default TBConfirmation;

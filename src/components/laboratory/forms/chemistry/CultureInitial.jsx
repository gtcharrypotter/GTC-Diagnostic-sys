import TextInput from "../../../../components/inputs/TextInput"

/* eslint-disable react/prop-types */
const CultureInitial = ({register, errors}) => {
  return (
    <div className="flex flex-col gap-y-2 w-full">
        <div className="flex flex-col lg:flex-row gap-4 ">
            <p className="italic  text-lg font-semibold">Culture And Sensitivity Initial Result</p>
        </div>
        <div className="flex lg:flex-row gap-4 ">
            <TextInput 
            className="w-full bg-white lg:w-1/4"
            label={
                <>
                Specimen Type
                <b className="text-red-500 ml-1">*</b>
                </>
            }variant="outlined"
            {...register('specimen_type', {
                required: true,
            })}
            placeholder="Specimen Type"
            InputLabelProps={{ shrink: true }}
			error={errors?.specimen_type}
			helperText={errors?.specimen_type && "This field is required"}
            />
            <TextInput 
            className="w-full bg-white lg:w-1/4"
            label={
                <>
                Source of Specimen
                <b className="text-red-500 ml-1">*</b>
                </>
            }variant="outlined"
            {...register('source_specimen', {
                required: true,
            })}
            placeholder="Source of Specimen"
            InputLabelProps={{ shrink: true }}
			error={errors?.source_specimen}
			helperText={errors?.source_specimen && "This field is required"}
            />
            <TextInput 
            className="w-full bg-white lg:w-1/4"
            label={
                <>
                Result
                <b className="text-red-500 ml-1">*</b>
                </>
            }variant="outlined"
            {...register('uric_acid', {
                required: true,
            })}
            placeholder="Result"
            InputLabelProps={{ shrink: true }}
			error={errors?.uric_acid}
			helperText={errors?.uric_acid && "This field is required"}
            />          
        </div>
    </div>
  )
}

export default CultureInitial

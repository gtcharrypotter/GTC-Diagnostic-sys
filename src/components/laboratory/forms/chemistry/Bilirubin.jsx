

/* eslint-disable react/prop-types */

import TextInput from "../../../../components/inputs/TextInput"

const Bilirubin = ({register, errors}) => {
  return (
    <div className="flex flex-col gap-y-2 w-full">
        <div className="flex flex-col lg:flex-row gap-4 ">
            <p className="italic  text-lg font-semibold">Bilirubin</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 ">
            <TextInput 
            className="w-full bg-white lg:w-1/4"
            label={
                <>
                Total Bilirubin
                <b className="text-red-500 ml-1">*</b>
                </>
            }variant="outlined"
            {...register('fbs', {
                required: true,
            })}
            placeholder="FBS"
            InputLabelProps={{ shrink: true }}
			error={errors?.fbs}
			helperText={errors?.fbs && "This field is required"}
            />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 ">
            <TextInput 
            className="w-full bg-white lg:w-1/4"
            label={
                <>
                Direct Bilirubin
                <b className="text-red-500 ml-1">*</b>
                </>
            }variant="outlined"
            {...register('rbs', {
                required: true,
            })}
            placeholder="RBS"
            InputLabelProps={{ shrink: true }}
			error={errors?.rbs}
			helperText={errors?.rbs && "This field is required"}
            />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 ">
            <TextInput 
            className="w-full bg-white lg:w-1/4"
            label={
                <>
                Indirect Bilirubin
                <b className="text-red-500 ml-1">*</b>
                </>
            }variant="outlined"
            {...register('creatinine', {
                required: true,
            })}
            placeholder="Creatinine"
            InputLabelProps={{ shrink: true }}
			error={errors?.creatinine}
			helperText={errors?.creatinine && "This field is required"}
            />
            </div>
    </div>
  )
}

export default Bilirubin

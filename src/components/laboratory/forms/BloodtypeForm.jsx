import FileInput from "../../../components/inputs/FileInput"



const BloodtypeForm = () => {
  return (
    <div>
      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex flex-col lg:flex-row gap-4">

        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
    <h2 className="text-2xl font-bold mb-4">Choose a Blood Type:</h2>

    <div className="grid grid-cols-7 gap-2">
      <button className="bg-red-500 text-white p-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 hold">
        O
      </button>
      <button className="bg-red-500 text-white p-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300 hold">
        A+
      </button>
      <button className="bg-red-500 text-white p-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 hold">
        B+
      </button>
      <button className="bg-red-500 text-white p-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300 hold">
        A-
      </button>
      <button className="bg-red-500 text-white p-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300 hold">
        B-
      </button>
      <button className="bg-red-500 text-white p-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300 hold">
        AB+
      </button>
      <button className="bg-red-500 text-white p-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300 hold">
        AB-
      </button>
    </div>
  </div> 
      </div>  
      </div>
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
    <FileInput 
    ></FileInput>
     </div>
    </div>
  )
}

export default BloodtypeForm

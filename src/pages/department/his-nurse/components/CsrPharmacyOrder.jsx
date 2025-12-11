
import PatientCSROrder from './PatientCSROrder';
import PatientPharmacyOrder from './PatientPharmacyOrder';

const CsrPharmacyOrder = (props) => {
	const {patient}= props;
    
  return (
    <div className='flex flex-col gap-8'>
    
	{/* <PatientCSROrder patient={patient}/>
	<PatientPharmacyOrder patient={patient}/> */}
   
    </div>
  )
}

export default CsrPharmacyOrder

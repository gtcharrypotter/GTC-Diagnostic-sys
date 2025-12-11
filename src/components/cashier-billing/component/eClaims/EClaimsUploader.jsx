import React, { useState } from 'react'
import AppLayout from '../../../container/AppLayout';
import Axios from '../../../../libs/axios';

const EClaimsUploader = () => {
  const [file, setFile] = useState(null);
  const [rtn, setRtn] = useState(null);
  const [tcn, setTcn] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Function to generate unique RTN and TCN (could be based on current date, random numbers, or provided by a backend)
  const generateReceiptTicketNumber = () => {
    return `RTN-${Math.floor(Math.random() * 1000000)}`;
  };

  const generateTransmissionControlNumber = () => {
    return `TCN-${Math.floor(Math.random() * 1000000)}`;
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload and receipt/tcn generation
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    setUploading(true);
    setError(null);

    try {
      // Assuming you'd upload the file to a backend here
       const response = await Axios.post(`/v1/opd-standalone/philhealth/upload-eclaims`);  
       const { eClaimsURL } = response.data;

      // After successful upload, generate RTN and TCN
      setRtn(generateReceiptTicketNumber());
      setTcn(generateTransmissionControlNumber());
      setUploading(eClaimsURL);
    } catch (err) {
      setError("Failed to upload file.");
      setUploading(false);
    }
  };
  return (
    <AppLayout>
         <div className="eclaims-uploader">
      <h2>Upload eClaims</h2>

      {/* File Input */}
      <input
        type="file"
        accept=".xml"
        onChange={handleFileChange}
      />

      {/* Error or upload status */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Upload Button */}
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {/* Show RTN and TCN */}
      {rtn && <p><strong>Receipt Ticket Number (RTN):</strong> {rtn}</p>}
      {tcn && <p><strong>Transmission Control Number (TCN):</strong> {tcn}</p>}
    </div>
    </AppLayout>
    
  )
}

export default EClaimsUploader

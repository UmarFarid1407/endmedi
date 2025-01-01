import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { decodeToken } from '../../../../../../sharedimports/auth';
const FileUploadAdd = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
const [userId, setUserId] = useState<number>(0);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  useEffect(() => {
    const shouldDecode = true;
    const getdecodedToken = decodeToken(shouldDecode);

    if (getdecodedToken && typeof getdecodedToken === "object") {
      setUserId(getdecodedToken.id);
      
    }

    if (getdecodedToken == null) {
      return console.log("user not found");
    }

  }, [userId]);

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('userId', userId.toString());

   if(userId!==0){
     try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Failed to upload the file.');
    }
   }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload New Image</h2>

      <div style={{ marginBottom: '20px' }}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload} style={{ marginLeft: '10px' }}>
          Upload
        </button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUploadAdd;

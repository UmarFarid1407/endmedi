import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar } from '@mui/material';
import { decodeToken } from '../../../../../../sharedimports/auth';

interface FileMetadata {
  id: number;
  filename: string;
  createdAt: string;
}

interface FileUploadEditProps {
  imageId: number;
  onFileUpdated: () => void;
}

const FileUploadEdit: React.FC<FileUploadEditProps> = ({ imageId, onFileUpdated }) => {
  const [imagePreviews, setImagePreviews] = useState<{ [key: number]: string }>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const fetchImagePreview = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/upload/${id}`, {
        responseType: 'blob',
      });
      const imageURL = URL.createObjectURL(response.data);
      setImagePreviews((prev) => ({
        ...prev,
        [id]: imageURL,
      }));
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  useEffect(() => {
    fetchImagePreview(imageId);
  }, [imageId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleEditFile = async () => {
    if (!selectedFile) {
      setMessage('Please select a new file to update.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.put(`http://localhost:5000/upload/edit/${imageId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      onFileUpdated(); // Trigger parent callback to refresh the file list
    } catch (error) {
      console.error('Error updating file:', error);
      setMessage('Failed to update the file.');
    }
  };

  return (
    <div>
      {message && <p>{message}</p>}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleEditFile}>Update File</button>
    </div>
  );
};

export default FileUploadEdit;

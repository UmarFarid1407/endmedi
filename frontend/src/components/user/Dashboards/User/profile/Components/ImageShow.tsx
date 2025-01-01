import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar } from '@mui/material';
import { decodeToken } from '../../../../../../sharedimports/auth';
import { getProfilePicture } from '../../../../Api/api';
interface FileMetadata {
  id: number;
  filename: string;
  createdAt: string;
}

const FileUploadEdit = () => {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [imagePreviews, setImagePreviews] = useState<{ [key: number]: string }>({});
 const [userId, setUserId] = useState<number>();
  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/upload');
      setFiles(response.data);

      response.data.forEach((file: FileMetadata) => {
        fetchImagePreview(file.id); // Fetch image preview for each file
      });
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

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

  return (
    <div>
      {message && <p>{message}</p>}

      {files.length === 0 ? (
        <p>No files found</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              {imagePreviews[file.id] && (
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mb: 1.5,
                    overflow: 'hidden', 
                  }}
                >
                  <img
                    src={imagePreviews[file.id]}
                    alt="File preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover', 
                    }}
                  />
                </Avatar>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUploadEdit;

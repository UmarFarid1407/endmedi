import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface FileMetadata {
  id: number;
  filename: string;
  createdAt: string;
}

const FileUpload = () => {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [imagePreviews, setImagePreviews] = useState<{ [key: number]: string }>({});

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      fetchFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Failed to upload the file.');
    }
  };

  const handleEditFile = async (id: number) => {
    const newFile = selectedFile;
    if (!newFile) {
      setMessage('Please select a new file to update.');
      return;
    }

    const formData = new FormData();
    formData.append('file', newFile);

    try {
      const response = await axios.put(`http://localhost:5000/upload/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      fetchFiles(); // Refresh file list after updating
    } catch (error) {
      console.error('Error updating file:', error);
      setMessage('Failed to update the file.');
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
    <div style={{ padding: '20px' }}>
      <h2>File Upload</h2>

      <div style={{ marginBottom: '20px' }}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload} style={{ marginLeft: '10px' }}>
          Upload
        </button>
      </div>

      {message && <p>{message}</p>}

      <h3>Uploaded Files</h3>
      {files.length === 0 ? (
        <p>No files found</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              {file.filename} - Uploaded on {new Date(file.createdAt).toLocaleString()}
              {imagePreviews[file.id] && (
                <div>
                  <img
                    src={imagePreviews[file.id]}
                    alt="File preview"
                    style={{ width: '100px', height: 'auto', marginTop: '10px' }}
                  />
                  <div>
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={() => handleEditFile(file.id)} style={{ marginLeft: '10px' }}>
                      Edit Image
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;

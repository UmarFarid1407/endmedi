import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { decodeToken } from "../../../../../../sharedimports/auth";
import FileUploadAdd from "./FileUpload";
import FileUploadEditDialog from "./FileUploadEditDialog";

interface FileMetadata {
  id: number;
  filename: string;
  createdAt: string;
}

const FileUploadEdit = () => {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [imagePreviews, setImagePreviews] = useState<{ [key: number]: string }>(
    {}
  );
  const [userId, setUserId] = useState<number | null>(null);
  const [editingFileId, setEditingFileId] = useState<number | null>(null);

  useEffect(() => {
    const shouldDecode = true;
    const getDecodedToken = decodeToken(shouldDecode);

    if (getDecodedToken && typeof getDecodedToken === "object") {
      setUserId(getDecodedToken.id);
    } else {
      console.log("User not found");
    }
  }, []);

  useEffect(() => {
    if (userId !== null) {
      fetchFiles();
    }
  });

  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/upload/userimage/${userId}`
      );
      const file = response.data;

      if (file && typeof file === "object" && file.length !== 0) {
        setFiles([file]);
        fetchImagePreview(file.id);
      } else {
        setFiles([]);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      setFiles([]);
    }
  };

  const fetchImagePreview = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/upload/${id}`, {
        responseType: "blob",
      });
      const imageURL = URL.createObjectURL(response.data);
      setImagePreviews((prev) => ({
        ...prev,
        [id]: imageURL,
      }));
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    return () => {
      Object.values(imagePreviews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  if (files.length === 0) {
    return <FileUploadAdd />;
  }

  return (
    <div>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {imagePreviews[file.id] && (
              <div style={{ position: "relative", display: "inline-block" }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mb: 1.5,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={imagePreviews[file.id]}
                    alt="File preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Avatar>
                <IconButton
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                  }}
                  onClick={() => setEditingFileId(file.id)}
                >
                  <EditIcon />
                </IconButton>
              </div>
            )}
          </li>
        ))}
      </ul>

      {editingFileId && (
        <FileUploadEditDialog
          imageId={editingFileId}
          onClose={() => setEditingFileId(null)}
          onFileUpdated={fetchFiles}
        />
      )}
    </div>
  );
};

export default FileUploadEdit;

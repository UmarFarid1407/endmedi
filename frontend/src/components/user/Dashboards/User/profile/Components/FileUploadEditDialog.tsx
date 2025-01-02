import React from "react";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import FileUploadEdit from "./FileShowEdit";

interface FileUploadEditDialogProps {
  imageId: number;
  onClose: () => void;
  onFileUpdated: () => void;
}

const FileUploadEditDialog: React.FC<FileUploadEditDialogProps> = ({
  imageId,
  onClose,
  onFileUpdated,
}) => {
  const handleFileUpdate = () => {
    onFileUpdated();
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogContent>
        <FileUploadEdit imageId={imageId} onFileUpdated={handleFileUpdate} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadEditDialog;

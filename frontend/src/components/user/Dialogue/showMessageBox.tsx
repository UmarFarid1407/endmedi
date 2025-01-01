import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';

interface ShowMessageBoxProps {
  messages: any[];  
  onClose: () => void;
}

const ShowMessageBox: React.FC<ShowMessageBoxProps> = ({ messages, onClose }) => {
  const messageArray = Array.isArray(messages) ? messages : [];

  return (
    <Backdrop open={messageArray.length > 0} onClick={onClose} sx={{ color: '#fff', zIndex: 10 }}>
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          textAlign: 'center',
          boxShadow: 3,
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {messageArray.map((msg, index) => (
          <Typography key={index} variant="h6" color="primary" sx={{ marginBottom: 1 }}>
            {msg}
          </Typography>
        ))}
      </Box>
    </Backdrop>
  );
};

export default ShowMessageBox;

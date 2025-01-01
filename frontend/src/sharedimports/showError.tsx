import React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const ActionAlerts: React.FC = (props :any) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning" onClose={() => {}}>
      <p> {props}</p>
      </Alert>
      {/* <Alert
        severity="success"
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
      >
        This Alert uses a Button component for its action.
      </Alert> */}
    </Stack>
  );
};

export default ActionAlerts;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, TextField, Typography } from '@mui/material';
import ViewContainer from 'App/ViewContainer';
import { useDashboardStore } from 'stores/dashboardStore';

const CreateDashboardView = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>();
  const { createDashboard } = useDashboardStore();
  const navigate = useNavigate();

  const handleCreateClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name === '') {
      setError('Field is empty');
      return;
    }
    if (name.length > 40) {
      setError('Name exceedes 100 characters');
      return;
    }
    if (error) setError(null);
    createDashboard(name);
    navigate('/');
  };

  return (
    <ViewContainer>
      <Box
        component="form"
        onSubmit={handleCreateClick}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          ml: 'auto',
          mr: 'auto',
          mt: 4,
        }}
      >
        <Typography variant="body2">New dashboard name</Typography>
        <TextField
          sx={{ width: '40ch', mb: 2 }}
          id="name"
          onChange={(e) => setName(e.target.value)}
          error={!!error}
          helperText={error ?? ' '}
        />
        <Button type="submit" variant="outlined">
          Create
        </Button>
      </Box>
    </ViewContainer>
  );
};

export default CreateDashboardView;

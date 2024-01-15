// src/components/FormPage.tsx
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const FormPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const showMessage = location.state && location.state.showMessage;

  const handleSubmit = () => {
    // Save user details to local storage
    const userDetails = { name, phoneNumber, email };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    // Redirect to the second page
    navigate('/second-page');
  };

  return (
    <Container>
      {showMessage && (
        <Typography variant="body1" color="error" paragraph>
          Please enter your details before accessing the page.
        </Typography>
      )}
      <Typography variant="h4" gutterBottom>
        User Information Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <Button sx={{marginTop:'5px'}} type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default FormPage;

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
  
  // Validation state
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const showMessage = location.state && location.state.showMessage;

  const handleSubmit = () => {
    // Perform validation before submission
    if (!validateName() || !validatePhoneNumber() || !validateEmail()) {
      return;
    }

    // Save user details to local storage
    const userDetails = { name, phoneNumber, email };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    // Redirect to the second page
    navigate('/second-page');
  };

  const validateName = () => {
    if (name.trim() === '') {
      setNameError('Name is required');
      return false;
    }
    setNameError(null);
    return true;
  };

  const validatePhoneNumber = () => {
    if (phoneNumber.trim() === '') {
      setPhoneError('Phone Number is required');
      return false;
    }
    // Add additional validation logic for phone number if needed
    setPhoneError(null);
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError(null);
    return true;
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
              onBlur={validateName}
              error={Boolean(nameError)}
              helperText={nameError}
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
              onBlur={validatePhoneNumber}
              error={Boolean(phoneError)}
              helperText={phoneError}
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
              onBlur={validateEmail}
              error={Boolean(emailError)}
              helperText={emailError}
              required
            />
          </Grid>
        </Grid>
        <Button sx={{ marginTop: '5px' }} type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default FormPage;

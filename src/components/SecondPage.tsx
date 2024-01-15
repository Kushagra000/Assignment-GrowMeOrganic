// src/components/SecondPage.tsx
import React, { useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DataList from './DataList';
import DataTable from './DataTable';

const SecondPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user details are present in local storage
    const userDetailsString = localStorage.getItem('userDetails');

    if (!userDetailsString) {
      // Redirect back to the first page if details are not present
      navigate('/', { state: { showMessage: true } });
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove user details from local storage
    localStorage.removeItem('userDetails');

    // Redirect back to the first page
    navigate('/');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {/* <DataList/> */}
        <DataTable/>
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default SecondPage;

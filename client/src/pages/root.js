import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { useSelector } from 'react-redux';
import { EMPTY } from '../config/constants';
import { Box, ThemeProvider } from '@mui/material';
import { mainContainer } from '../style/style';
import { appTheme } from '../lib/mui';
// import root from '../assets/root.jpg';

export default function Root() {
  const { authentication } = useSelector((store) => store);
  const navigate = useNavigate();
  useEffect(() => {
    if (authentication?.email === EMPTY && authentication?.token === EMPTY && window.location.pathname != '/signup')
      navigate('/login');
  }, []);
  return (
    <ThemeProvider theme={appTheme}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          // backgroundImage: `url(${root})`,
          backgroundSize: 'cover',
          backgroundColor: '#dbd5b2'
        }}>
        <main style={{ flexGrow: 1 }}>
          <Header style={{ flexGrow: 0 }} />
          <Box sx={mainContainer}>
            <Outlet />
          </Box>
          <Footer style={{ flexGrow: 0 }} />
        </main>
      </div>
    </ThemeProvider>
  );
}

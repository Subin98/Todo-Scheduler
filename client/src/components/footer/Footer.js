import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { stickToBottom } from './style';

export const Footer = () => {
  return (
    <Box sx={stickToBottom}>
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="#fff" variant="h6">
              My Todos
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="#fff" variant="body2">
              {`© ${new Date().getFullYear()}. All Rights Reserved. `}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;

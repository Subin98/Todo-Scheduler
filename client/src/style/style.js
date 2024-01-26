// import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Paper } from '@mui/material';
const getBackgroundColor = (index) => {
  const colors = ['#fdf3b4', '#d1eaed', '#ffdadb', '#ffd4aa']; // Add your desired colors
  return colors[index % colors.length];
};
export const Item = styled(Paper)(({ theme, index }) => ({
  backgroundColor: getBackgroundColor(index),

  color: theme?.palette?.text?.primary,
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  ...theme.typography.body2,
  paddingTop: '15px',
  paddingBottom: '15px',
  textAlign: 'center',
  height: '100%'
  // width: '100%'
}));

export const mainContainer = {
  minHeight: '75vh',
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 2,
  marginRight: 2
};

export const minHeight = {
  header: { minHeight: '20%' },
  description: {
    marginTop: '10px',
    minHeight: '50%'
  },
  footer: { minHeight: '20%', display: 'flex' }
};
export const wrapperBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '20px' /* Adjust the margin value according to your needs */
};

import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

export const appTheme = createTheme({
  palette: {
    primary: {
      main: '#1769aa'
    },
    secondary: {
      main: grey[700]
    },
    custom: {
      pageTitle: grey[700],
      heading: '#000'
    }
  }
});
export const mr30 = {
  marginRight: '30px'
};
export const footerBox = {
  display: 'flex',
  minHeight: '40px',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'left'
};

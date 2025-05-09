import React, { useMemo } from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../AppRedux/store';

const AppTheme= ({ children }) => {
  const prefersDarkMode = useSelector((state) => state.app.prefersDarkMode);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
      },
    }), [prefersDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
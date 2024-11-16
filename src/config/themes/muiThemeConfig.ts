import { createTheme } from '@mui/material';
import { Theme, ThemeName } from '~/types';

export const getMuiThemeConfig = (currentTheme: Theme, themeName: ThemeName) => {
  return createTheme({
    palette: {
      mode: themeName,
    },
    typography: {
      fontFamily: 'Montserrat, sans-serif', // Use Montserrat globally
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '@global': {
            '@font-face': [
              {
                fontFamily: 'Montserrat',
                src: 'url(https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap)',
                fontWeight: 400,
                fontStyle: 'normal',
              },
            ],
          },
          body: {
            background: currentTheme.backgroundPrimary,
            color: currentTheme.textPrimary,
            fontFamily: 'Montserrat, sans-serif', // Apply globally
          },
        },
      },
    },
  });
};

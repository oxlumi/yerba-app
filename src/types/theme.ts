import { Theme as MuiTheme } from '@mui/material';
import { Theme as RainbowTheme } from '@rainbow-me/rainbowkit';

export type ThemeName = 'light' | 'dark';

export interface Theme {
  type: ThemeName;
  textPrimary: string;
  textSecondary: string;
  backgroundPrimary: string;
  backgroundSecondary: string;
  titleColor: string;
  titleFontFamily: string;
  textFontFamily: string;
  borderRadius: string;
  secondaryBorderRadius: string;
  border: string;
}

export interface PropTheme {
  theme: Theme;
}

export interface CustomThemes {
  main: {
    light: Theme;
    dark: Theme;
  };
  getMui: (currentTheme: Theme, themeName: ThemeName) => MuiTheme;
  rainbow: RainbowTheme;
}

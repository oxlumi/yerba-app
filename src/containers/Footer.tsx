import { styled } from '@mui/material/styles';
import { useCustomTheme } from '~/hooks/useTheme';
import { FOOTER_HEIGHT } from '~/utils';

export const Footer = () => {
  return (
    <FooterContainer>
      <Subtitle>
        <p>Web3 Boiler Plate from <a href='https://defi.sucks'>Wonderland 🐇</a> | Made with 🤍 by @d4rm5, @santi-nihany and @oxlumi</p>
      </Subtitle>
    </FooterContainer>
  );
};

const FooterContainer = styled('footer')(() => {
  const { currentTheme } = useCustomTheme();
  return {
    display: 'flex',
    height: `${FOOTER_HEIGHT}rem`,
    padding: '0 8rem',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: currentTheme.backgroundSecondary,
    borderTop: currentTheme.border,
    width: '100%',
  };
});

const Subtitle = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  '& p': {
    display: 'inline-block',
  },
  '& a': {
    textDecoration: 'none',
    color: 'inherit',
  },
});

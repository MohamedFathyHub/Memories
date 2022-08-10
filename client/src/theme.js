import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material';
import { Button } from '@mui/material';
import { Card, CardActions, CardContent, CardMedia, Typography, Chip  } from '@mui/material'

export const ButtonWithPadding = styled(Button)(({theme}) => ({
  margin: theme.spacing(8)
}))

export const CardwithPadding = styled(Card)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    marginBottom: '10px',
}))


const createCustomTheme = () => {
  const theme = createTheme({

  });


  return createTheme(theme, {
    components: {
        MuiButton: {
            styleOverrides: {
                root: { 
                  margin: theme.spacing(1)
                }
            }
        }
    },
    palette: {
      primary: {
        main: '#0052cc',
      },
      secondary: {
        main: '#f50057',
      },
    },
});
};

export const theme = createTheme(createCustomTheme());
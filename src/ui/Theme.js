import { createTheme } from '@mui/material/styles';

const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';
const arcGrey = '#868686';

export default createTheme({
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: arcBlue,
          fontWeight: 700,
        },
        labelPlacementStart: {
          marginLeft: 0,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        standard: {
          color: arcBlue,
          fontSize: '1rem',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: arcGrey,
          fontWeight: 300,
          fontSize: '1rem',
        },
        underline: {
          '&:before': {
            borderBottom: `2px solid ${arcBlue}`,
          },
          '&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before':
            {
              borderBottom: `2px solid ${arcBlue}`,
            },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: arcOrange,
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          '&.MuiSelect-icon': {
            fill: arcOrange,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontSize: '1rem',
          fontWeight: 700,
          color: arcBlue,
          borderColor: arcBlue,
          borderWidth: 2,
        },
        body: {
          color: arcGrey,
          borderColor: arcBlue,
          borderWidth: 2,
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: arcOrange,
          },
          '&.Mui-active': {
            color: arcOrange,
          },
        },
        icon: {
          fill: arcOrange,
        },
      },
    },
  },
  palette: {
    common: {
      blue: arcBlue,
      orange: arcOrange,
    },
    primary: {
      main: arcBlue,
    },
    secondary: {
      main: arcOrange,
    },
  },
  typography: {
    caption: {
      fontSize: '1rem',
      fontWeight: 300,
      color: arcGrey,
    },
    body1: {
      fontSize: '1.25rem',
      color: arcGrey,
      fontWeight: 300,
    },
    estimate: {
      fontFamily: 'Pacifico',
      fontSize: '1rem',
      textTransform: 'none',
      color: '#fff',
    },
    learnButton: {
      borderColor: arcBlue,
      color: arcBlue,
      borderWidth: 2,
      textTransform: 'none',
      borderRadius: 50,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
    },
    h1: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: '2.5rem',
      color: arcBlue,
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: 'Pacifico',
      fontSize: '2.5rem',
      color: arcBlue,
    },
    h4: {
      fontFamily: 'Raleway',
      fontSize: '1.75rem',
      color: arcBlue,
      fontWeight: 700,
    },
    h6: {
      fontWeight: 500,
      fontFamily: 'Raleway',
      color: arcBlue,
      lineHeight: 1,
    },
    subtitle1: {
      fontSize: '1.25rem',
      fontWeight: 300,
      color: arcGrey,
    },
    subtitle2: {
      color: 'white',
      fontSize: '1.25rem',
      fontWeight: 300,
    },
    tab: {
      fontFamily: 'Raleway',
      fontSize: '1rem',
      fontWeight: 700,
      color: '#fff',
      textTransform: 'none',
    },
  },
});

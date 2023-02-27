import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#0BA4E0'
        },
        secondary: {
            main: '#2B93BC'
        }
    },
    transitions: {
        
    }
})

export const dackTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#0BA4E0'
        },
        secondary: {
            main: '#696969'
        }
    }
})
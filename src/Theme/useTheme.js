import React from 'react'

export const useTheme = () => {
    const [theme, setTheme] = React.useState('dark')

    React.useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return { theme, setTheme }
}
import React from 'react'

export const useTheme = () => {
    const [theme, setTheme] = React.useState(window.localStorage.getItem('theme') || 'light')

    React.useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        window.localStorage.setItem('theme', theme)
    }, [theme])

    return { theme, setTheme }
}
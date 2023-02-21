import React from 'react'
import { Stack, TextField, Alert, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth'
import { useForm } from 'react-hook-form'
import style from './Login.module.scss'
import logo from '../../assets/logo.png'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { styled } from '@mui/system'

const Login = () => {
    const isAuth = useSelector(selectIsAuth)
    const { error } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => setShowPassword(show => !show)
    const handleMouseDownPassword = event => event.preventDefault()

    const { register, handleSubmit, formState: { errors } } = useForm()

    if (isAuth) {
        return <Navigate to='/' />
    }

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values))
        if ('token' in data.payload) {
            localStorage.setItem('token', data.payload.token)
        } else {
            alert('Не удалось авторизоваться')
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.wrap}>
            <div className={style.login}>
                <div className={style.logo}>
                    <img src={logo} alt="" />
                    <div className={style.auth}>
                        <h2>Code Kids</h2>
                        <p>Авторизация</p>
                    </div>
                </div>
                <Stack spacing={2} style={{ width: 260 }} className={style.input}>
                    <div className={style.log}>
                        <CssTextField style={{ width: '100%' }} error={errors.login && true} size='small' label='Логин' {...register('login', { required: true })} />
                    </div>
                    <div className={style.pass}>
                        <FormControl>
                            <InputLabel error={errors.password && true} size='small'>Пароль</InputLabel>
                            <CssOutlinedInput
                                size='small'
                                error={errors.password && true}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                {...register('password', { required: true })}
                                label="Пароль"
                            />
                        </FormControl>
                        {/* <TextField style={{ width: '100%' }} error={errors.password && true} type='password' size='small' label='Пароль' {...register('password', { required: true })} /> */}
                    </div>
                    {Object.keys(errors).length !== 0 && <Alert severity='error'>Все поля должны быть заполнены</Alert>}
                    {Object.keys(errors).length === 0 && error && <Alert severity='error'>{error.message}</Alert>}
                </Stack>
                <button type='submit'>Войти</button>
            </div>
        </form>
    )
}

const CssTextField = styled(TextField)({
    '& label.Mui-root': {
        '& fieldset': {
            borderColor: 'b5b5b5',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#0BA4E0',
        },
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'b5b5b5',
        },
        '&:hover fieldset': {
            borderColor: '#2B93BC',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#0BA4E0',
        },
    },
});

const CssOutlinedInput = styled(OutlinedInput)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'b5b5b5',
        },
        '&:hover fieldset': {
            borderColor: '#2B93BC',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#0BA4E0',
        },
    },
});

export default Login
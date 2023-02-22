import { Stack, TextField, Alert, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, ThemeProvider } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import React from 'react'
import logo from '../../assets/logo.png'
import './forms.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import 'react-phone-input-2/lib/style.css'
import { doNotMatchPassword, fetchUpdatePassword } from '../../redux/slices/password'
import { theme } from '../../muiTheme/theme'

const UpdatePassword = () => {
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.auth)
    const { error, success } = useSelector(state => state.password)

    const [showOldPassword, setShowOldPassword] = React.useState(false)
    const handleClickOldPassword = () => setShowOldPassword(show => !show)
    const handleMouseDownPassword = event => event.preventDefault()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (values) => {
        if (values.newPassword !== values.confirmationPassword) {
            await dispatch(doNotMatchPassword())
            return
        }
        const params = {
            id: data._id,
            ...values
        }
        await dispatch(fetchUpdatePassword(params))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <div className='form-logo'>
                <img src={logo} alt="" />
                <div className='form-logo-title'>
                    <h2>Code Kids</h2>
                    <p>Изменение пароля</p>
                </div>
            </div>
            <ThemeProvider theme={theme}>
                <Stack spacing={2} sx={{ width: 250 }} className='form-input'>
                    <FormControl>
                        <InputLabel error={errors.oldPassword && true} size='small'>Старый пароль</InputLabel>
                        <OutlinedInput
                            size='small'
                            error={errors.oldPassword && true}
                            type={showOldPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickOldPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            {...register('oldPassword', { required: true })}
                            label="Старый пароль"
                        />
                    </FormControl>

                    <TextField type='password' style={{ width: '100%' }} error={errors.newPassword && true} size='small' label='Новый пароль' {...register('newPassword', { required: true })} />
                    <TextField type='password' style={{ width: '100%' }} error={errors.confirmationPassword && true} size='small' label='Подтвердите пароль' {...register('confirmationPassword', { required: true })} />

                    {Object.keys(errors).length !== 0 && <Alert severity='error'>Все поля должны быть заполнены</Alert>}
                    {Object.keys(errors).length === 0 && error && <Alert severity='error'>{error.message}</Alert>}
                    {success && <Alert severity='success'>Пароль успешно изменён:)</Alert>}
                </Stack>
            </ThemeProvider>
            <button className='form-button'>Изменить</button>
        </form>
    )
}

export default UpdatePassword
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Stack, TextField, Alert, ThemeProvider } from '@mui/material'
import logo from '../../assets/logo.png'
import './forms.scss'
import { fetchAddRemider, fetchRemider } from '../../redux/slices/remiders'
import MainButton from '../../UI/Buttons/MainButton'
import { dackTheme, lightTheme } from '../../muiTheme/theme'
import { useTheme } from '../../Theme/useTheme'

const AddRemider = ({ onClose }) => {
    const dispatch = useDispatch()
    const { theme } = useTheme()
    const { data } = useSelector(state => state.auth)
    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm()

    const onSubmit = async (values) => {
        const teacher = data._id
        const value = {
            ...values,
            teacher
        }
        await dispatch(fetchAddRemider(value))
        await dispatch(fetchRemider())
        onClose()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <div className='form-header'>
                <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </div>
            <div className='form-logo'>
                <img src={logo} alt="" />
                <div className='form-logo-title'>
                    <h2>Code Kids</h2>
                    <p>Создание заметки</p>
                </div>
            </div>
            <ThemeProvider theme={theme === 'light' ? lightTheme : dackTheme}>
                <Stack spacing={2} sx={{ width: 350 }} className='form-input'>
                    <TextField label='Название заметки' error={errors.title && true} size='small' {...register('title', { required: 'Все красные поля должны быть заполнены' })} />
                    <TextField label='Текст заметки' multiline maxRows={Infinity} size='small' {...register('content')} />
                    {errors.title && <Alert severity='error'>{errors.title?.message}</Alert>}
                    <MainButton content='Cоздать' />
                </Stack>
            </ThemeProvider>
        </form>
    )
}

export default AddRemider
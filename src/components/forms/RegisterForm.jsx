import React from 'react'
import { Stack, TextField, Alert } from '@mui/material'
import logo from '../../assets/logo.png'
import './forms.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { fetchRegister, fetchTeacher, doNotMatchPassword } from '../../redux/slices/teachers'

const RegisterForm = ({ onClose }) => {
    const dispatch = useDispatch()
    const { error } = useSelector(state => state.teachers)

    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
        defaultValues: {
            name: '',
            surname: '',
            login: '',
            password: '',
            confirmationPassword: '',
        }
    })

    const onSubmit = async (values) => {
        if (values.password !== values.confirmationPassword) {
            await dispatch(doNotMatchPassword())
            return
        }

        await dispatch(fetchRegister(values))
        await dispatch(fetchTeacher())
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
                    <p>Регистрация учителя</p>
                </div>
            </div>
            <Stack spacing={2} sx={{ maxWidth: 350 }} className='form-input'>
                <div className='form-name'>
                    <TextField error={errors.name && true} size='small' label='Имя' {...register('name', { required: true })} />
                    <TextField error={errors.surname && true} size='small' label='Фамилия' {...register('surname', { required: true })} />
                </div>
                <Stack className='form-login'>
                    <TextField error={errors.login && true} size='small' label='Логин' {...register('login', { required: true })} />
                </Stack>
                <Stack spacing={2} className='form-pass'>
                    <TextField error={errors.password && true} type='password' size='small' label='Пароль' {...register('password', { required: true })} />
                    <TextField error={errors.confirmationPassword && true} type='password' size='small' label='Поддтвердите пароль' {...register('confirmationPassword', { required: true })} />
                </Stack>
                {Object.keys(errors).length !== 0 && <Alert severity='error'>Все поля должны быть заполнены</Alert>}
                {Object.keys(errors).length === 0 && error && <Alert  severity='error'>{error.message}</Alert>}
                <button className='form-button'>Зарегистрировать</button>
            </Stack>
        </form>
    )
}

export default RegisterForm
import React from 'react'
import { Stack, TextField, Alert } from '@mui/material'
import logo from '../../assets/logo.png'
import './forms.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import avatar from '../../assets/user.png'
import 'react-phone-input-2/lib/style.css'
import { fetchAuthMe, fetchUpdateMeData, fetchUpdatePassword } from '../../redux/slices/auth'
import Popup from 'reactjs-popup'

const UpdatePassword = ({ onClose }) => {
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.auth)

    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmationPassword: '',
        }
    })

    const onSubmit = async (values) => {
        const params = {
            id: data._id,
            ...values
        }
        dispatch(fetchUpdatePassword(params))
        onClose()
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
            <Stack spacing={2} sx={{ maxWidth: 350 }} className='form-input'>
                <TextField type='password' style={{ width: '100%' }} error={errors.name && true} size='small' label='Старый пароль' {...register('oldPassword', { required: 'Все поля должны быть заполнены' })} />
                <TextField type='password' style={{ width: '100%' }} error={errors.name && true} size='small' label='Новый пароль' {...register('newPassword', { required: 'Все поля должны быть заполнены' })} />
                <TextField type='password' style={{ width: '100%' }} error={errors.name && true} size='small' label='Подтвердите пароль' {...register('confirmationPassword', { required: 'Все поля должны быть заполнены' })} />
            </Stack>
            <button className='form-button'>Изменить</button>
        </form>
    )
}

export default UpdatePassword
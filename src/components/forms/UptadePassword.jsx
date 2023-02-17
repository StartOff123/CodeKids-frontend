import { Stack, TextField, Alert } from '@mui/material'
import React from 'react'
import logo from '../../assets/logo.png'
import './forms.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import 'react-phone-input-2/lib/style.css'
import { closeError, doNotMatchPassword, fetchUpdatePassword } from '../../redux/slices/password'
import Popup from 'reactjs-popup'
import Confirmation from '../Сonfirmation/inedx'

const UpdatePassword = ({ onClose }) => {
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.auth)
    const { error, success } = useSelector(state => state.password)

    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmationPassword: '',
        }
    })

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
            <Stack spacing={2} sx={{ width: 250 }} className='form-input'>
                <TextField type='password' style={{ width: '100%' }} error={errors.oldPassword && true} size='small' label='Старый пароль' {...register('oldPassword', { required: true })} />
                <TextField type='password' style={{ width: '100%' }} error={errors.newPassword && true} size='small' label='Новый пароль' {...register('newPassword', { required: true })} />
                <TextField type='password' style={{ width: '100%' }} error={errors.confirmationPassword && true} size='small' label='Подтвердите пароль' {...register('confirmationPassword', { required: true })} />
               
                {Object.keys(errors).length !== 0 && <Alert severity='error'>Все поля должны быть заполнены</Alert>}
                {Object.keys(errors).length === 0 && error && <Alert  severity='error'>{error.message}</Alert>}
                {success && <Alert severity='success'>Пароль успешно изменён:)</Alert>}
            </Stack>
            <button className='form-button'>Изменить</button>
        </form>
    )
}

export default UpdatePassword
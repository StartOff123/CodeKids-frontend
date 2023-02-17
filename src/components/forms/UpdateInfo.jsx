import React from 'react'
import { Stack, TextField, Alert } from '@mui/material'
import logo from '../../assets/logo.png'
import './forms.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import avatar from '../../assets/user.png'
import 'react-phone-input-2/lib/style.css'
import { fetchAuthMe, fetchUpdateMeData } from '../../redux/slices/auth'
import Popup from 'reactjs-popup'
import UpdatePassword from './UptadePassword'

const UpdateInfo = ({ onClose }) => {
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.auth)

    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
        defaultValues: {
            name: data.name,
            surname: data.surname,
        }
    })

    const onSubmit = async (values) => {
        const params = {
            id: data._id,
            ...values
        }
        await dispatch(fetchUpdateMeData(params))
        dispatch(fetchAuthMe())
        onClose()
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <div className='form-logo'>
                <img src={logo} alt="" />
                <div className='form-logo-title'>
                    <h2>Code Kids</h2>
                    <p>{data.name} {data.surname}</p>
                </div>
            </div>
            <Stack spacing={2} sx={{ maxWidth: 350 }} className='form-input'>
                <div className='form-top'>
                    <div className='form-avatar'>
                        <img src={avatar} alt="img" />
                    </div>
                    <div className='form-settings-name'>
                        <TextField style={{ width: '100%' }} error={errors.name && true} size='small' label='Имя' {...register('name', { required: true })} />
                        <TextField style={{ width: '100%', marginTop: 10 }} error={errors.surname && true} size='small' label='Фамилия' {...register('surname', { required: true })} />
                    </div>
                </div>
                {Object.keys(errors).length !== 0 && <Alert severity='error'>Все поля должны быть заполнены</Alert>}
                <button className='form-button'>Изменить</button>
            </Stack>
        </form>
    )
}

export default UpdateInfo
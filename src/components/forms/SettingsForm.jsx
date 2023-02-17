import React from 'react'
import { Stack } from '@mui/material'
import logo from '../../assets/logo.png'
import './forms.scss'
import { useDispatch, useSelector } from 'react-redux'
import 'react-phone-input-2/lib/style.css'
import Popup from 'reactjs-popup'
import UpdatePassword from './UptadePassword'
import UpdateInfo from './UpdateInfo'
import { closeError } from '../../redux/slices/password'

const SettingsForm = () => {
    const dispatch = useDispatch()

     return (
        <div className='form'>
            <div className='form-logo'>
                <img src={logo} alt="" />
                <div className='form-logo-title'>
                    <h2>Code Kids</h2>
                    <p>Изменение профиля</p>
                </div>
            </div>
            <Stack spacing={2} sx={{ maxWidth: 350, marginTop: 0 }} className='form-input'>
                <Popup
                    position='left center'
                    trigger={<div className='form-button' style={{ display: 'inline-block', width: 'auto', textAlign: 'center' }}>Изменить информацию</div>}
                    overlayStyle={{ background: 'transparent' }}
                >
                    {close => <UpdateInfo onClose={close} />}
                </Popup>
                <Popup
                    position='left center'
                    trigger={<div className='form-button' onClick={dispatch(closeError())} style={{ display: 'inline-block', width: 'auto', textAlign: 'center' }}>Изменить пароль</div>}
                    overlayStyle={{ background: 'transparent' }}
                >
                    {close => <UpdatePassword onClose={close} />}
                </Popup> 
            </Stack>
        </div>
    )
}

export default SettingsForm
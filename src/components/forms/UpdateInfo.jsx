import React from 'react'
import { Stack, TextField, Alert, ThemeProvider } from '@mui/material'
import logo from '../../assets/logo.png'
import './forms.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import 'react-phone-input-2/lib/style.css'
import { fetchAuthMe, fetchUpdateMeData } from '../../redux/slices/auth'
import { theme } from '../../muiTheme/theme'
import axios from '../../axios'
import MainButton from '../../UI/Buttons/MainButton'

const UpdateInfo = ({ onClose }) => {
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.auth)
    const [imageUrl, setImageUrl] = React.useState(data.avatarUrl)
    const inputFileRef = React.useRef(null)

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: data.name,
            surname: data.surname,
        }
    })

    const onSubmit = async (values) => {
        const params = {
            id: data._id,
            avatarUrl: imageUrl,
            ...values
        }
        await dispatch(fetchUpdateMeData(params))
        dispatch(fetchAuthMe())
        onClose()
    }

    const addAvatar = async (event) => {
        const formData = new FormData()
        formData.append('image', event.target.files[0])
        const { data } = await axios.post('/upload', formData)
        setImageUrl(data.url)
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
            <ThemeProvider theme={theme}>
                <Stack spacing={2} sx={{ maxWidth: 350 }} className='form-input'>
                    <div className='form-top'>
                        <div className='form-avatar'>
                            <label>
                                {imageUrl ?
                                    <div style={{ background: `url(http://localhost:5555${imageUrl})`, backgroundPosition: 'center', backgroundSize: 'cover', objectFit: 'cover', height: '100%' }}></div> :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#396794" class="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg>
                                }
                                <input ref={inputFileRef} onChange={addAvatar} type='file' accept='.jpg, .png, .jpeg' hidden />
                                <span>+</span>
                            </label>
                        </div>
                        <div className='form-settings-name'>
                            <TextField style={{ width: '100%' }} error={errors.name && true} size='small' label='Имя' {...register('name', { required: true })} />
                            <TextField style={{ width: '100%', marginTop: 10 }} error={errors.surname && true} size='small' label='Фамилия' {...register('surname', { required: true })} />
                        </div>
                    </div>
                    {Object.keys(errors).length !== 0 && <Alert severity='error'>Все поля должны быть заполнены</Alert>}
                    <MainButton content='Изменить'/>
                </Stack>
            </ThemeProvider>
        </form>
    )
}

export default UpdateInfo
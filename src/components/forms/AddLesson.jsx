import React from 'react'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Stack, TextField, TextareaAutosize, Select, MenuItem, InputLabel, FormControl, Alert } from '@mui/material'
import logo from '../../assets/logo.png'
import './forms.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { fetchAddLesson, fetchLessons } from '../../redux/slices/lessons'

const AddLesson = ({ onClose }) => {
    const dispatch = useDispatch()
    const { studentsArr } = useSelector(state => state.students)
    const { data } = useSelector(state => state.auth)
    const [date, setDate] = React.useState(null)

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            theme: '',
            studentId: '',
            date: date,
        }
    })

    const onSubmit = async (values) => {
        const { date, ...value } = values
        const ISOdate = new Date(date).toISOString()
        const params = {
            date: ISOdate,
            teacherId: data._id,
            ...value
        }
        console.log(params)
        // await dispatch(fetchAddLesson(params))
        // await dispatch(fetchLessons())
        // onClose()
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
                    <p>Добавление урока</p>
                </div>
            </div>
            <Stack spacing={2} sx={{ width: 400 }} className='form-input'>
                <TextField error={errors.title && true} size='small' label='Название' type="text" {...register('title', { required: true })} />
                <TextareaAutosize color='secondary' placeholder='Описание урока' {...register('theme')} />
                <FormControl className='form-studetn'>
                    <InputLabel error={errors.studentId && true} size='small' id="demo-simple-select-label">Ученик</InputLabel>
                    <Controller
                        as={
                            <Select error={errors.studentId && true} size='small' label='Ученик' labelId='demo-simple-select-label'>
                                {studentsArr.map((option) =>
                                    <MenuItem key={option._id} value={option._id}>{option.name} {option.surname}</MenuItem>
                                )}
                            </Select>
                        }
                        name='studentId'
                        control={control}
                    />
                </FormControl>
                <DateTimePicker
                    label='Дата и время урока'
                    renderInput={params => <TextField error={errors.date && true} size='small' {...params} {...register('date', { required: true })} />}
                    value={date}
                    onChange={newDate => setDate(newDate)}
                />
                {Object.keys(errors).length !== 0 && <Alert severity='error'>Все поля должны быть заполнены</Alert>}
                <button className='form-button'>Запланировать</button>
            </Stack>
        </form>
    )
}

export default AddLesson
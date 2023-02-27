import React from 'react'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Stack, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import moment from 'moment'
import logo from '../../assets/logo.png'
import './forms.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { fetchLessons, fetchUpdateLesson } from '../../redux/slices/lessons'
import { ThemeProvider } from '@emotion/react'
import { theme } from '../../muiTheme/theme'
import MainButton from '../../UI/Buttons/MainButton'
import { dackTheme, lightTheme } from '../../muiTheme/theme'
import { useTheme } from '../../Theme/useTheme'


const UpdateLesson = ({ onClose, lesson }) => {
    const dispatch = useDispatch()
    const { studentsArr } = useSelector(state => state.students)
    const { theme } = useTheme()

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            title: lesson.title,
            theme: lesson.theme,
            studentId: lesson.student,
            date: moment(lesson.date).format('L LT')
        }
    })

    const onSubmit = async (values) => {
        console.log(values)
        const { date, student, ...value } = values
        const ISOdate = new Date(date).toISOString()
        const params = {
            id: lesson._id,
            date: ISOdate,
            student,
            ...value
        }
        await dispatch(fetchUpdateLesson(params))
        await dispatch(fetchLessons())
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
                    <p>Редактирование</p>
                </div>
            </div>
            <ThemeProvider theme={theme === 'light' ? lightTheme : dackTheme}>
                <Stack spacing={2} sx={{ width: 400 }} className='form-input'>
                    <TextField error={errors.title && true} size='small' label='Название' {...register('title', { required: 'Все поля должны быть заполнены' })} />
                    <TextField multiline maxRows={Infinity} size='small' label='Описание урока' {...register('theme')} />
                    <FormControl className='form-studetn'>
                        <InputLabel error={errors.studentId && true} size='small' id="demo-simple-select-label">Ученик</InputLabel>
                        <Controller
                            render={({ field }) => {
                                return (
                                    <Select
                                        error={errors.studentId && true}
                                        defaultValue={field.value}
                                        size='small'
                                        label='Ученик'
                                        labelId='demo-simple-select-label'
                                        inputProps={{
                                            name: 'studentId'
                                        }}
                                        onChange={value => field.onChange(value.target.value)}
                                    >
                                        {studentsArr.map((option) =>
                                            <MenuItem key={option._id} value={option._id}>{option.name} {option.surname}</MenuItem>
                                        )}
                                    </Select>
                                )
                            }}
                            rules={{
                                required: true
                            }}
                            name='studentId'
                            control={control}
                        />
                    </FormControl>
                    <Controller
                        render={({ field }) => {
                            return (
                                <DateTimePicker
                                    label='Дата и время урока'
                                    renderInput={params => <TextField size='small' {...params} error={errors.date && true} {...register('date', { required: true })} />}
                                    value={field.value}
                                    onChange={value => field.onChange(value)}
                                />
                            )
                        }}
                        rules={{
                            required: true
                        }}
                        name='date'
                        control={control}
                    />
                    <MainButton content='Изменить'/>
                </Stack>
            </ThemeProvider>
        </form>
    )
}

export default UpdateLesson
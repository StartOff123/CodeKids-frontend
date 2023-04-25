import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TextField, ThemeProvider, Alert } from '@mui/material'
import moment from 'moment'
import { Controller, useForm } from 'react-hook-form'
import MainButton from '../../../UI/Buttons/MainButton'
import { useDispatch, useSelector } from 'react-redux'
import loading2 from '../../../assets/loading2.svg'
import './reports.scss'
import { fetchMonthy } from '../../../redux/slices/report'
import { setMonthyPeriod } from '../../../redux/slices/report'
import { dackTheme, lightTheme } from '../../../muiTheme/theme'
import { useTheme } from '../../../Theme/useTheme'

const Monthy = () => {
    const dispatch = useDispatch()
    const { theme } = useTheme()
    const { monthy, monthyPeriod, monthyStatus } = useSelector(state => state.report)
    const { studentsArr } = useSelector(state => state.students)
    const { teachersArr } = useSelector(state => state.teachers)
    const isReportLoading = monthyStatus === 'loading'

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            date: null,
        }
    })

    const arr = [
        { gt: '-12-31T19:00:00.000Z', lt: '-01-31T19:00:00.000Z' },
        { gt: '-01-31T19:00:00.000Z', lt: '-02-28T19:00:00.000Z' },
        { gt: '-02-28T19:00:00.000Z', lt: '-03-31T19:00:00.000Z' },
        { gt: '-03-31T19:00:00.000Z', lt: '-04-30T19:00:00.000Z' },
        { gt: '-04-30T19:00:00.000Z', lt: '-05-31T19:00:00.000Z' },
        { gt: '-05-31T19:00:00.000Z', lt: '-06-30T19:00:00.000Z' },
        { gt: '-06-30T19:00:00.000Z', lt: '-07-31T19:00:00.000Z' },
        { gt: '-07-31T19:00:00.000Z', lt: '-08-31T19:00:00.000Z' },
        { gt: '-08-31T19:00:00.000Z', lt: '-09-30T19:00:00.000Z' },
        { gt: '-09-30T19:00:00.000Z', lt: '-10-31T19:00:00.000Z' },
        { gt: '-10-31T19:00:00.000Z', lt: '-11-30T19:00:00.000Z' },
        { gt: '-11-30T19:00:00.000Z', lt: '-12-31T19:00:00.000Z' },
    ]

    const onSubmit = async (values) => {
        const dateArr = String(values.date).split(' ')
        const gt = String(dateArr[3]) + arr[moment(values.date).format('M') - 1].gt
        const lt = String(dateArr[3]) + arr[moment(values.date).format('M') - 1].lt
        dispatch(fetchMonthy({ gt, lt }))
        dispatch(setMonthyPeriod(moment(gt).format('DD.MM.YYYY') + ' - ' + moment(lt).format('DD.MM.YYYY')))
    }

    return (
        <div className='monthy'>
            <div className="monthy__header">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ThemeProvider theme={theme === 'light' ? lightTheme : dackTheme}>
                        <Controller
                            render={({ field }) => {
                                return (
                                    <DatePicker
                                        label='Месяц'
                                        views={['month', 'year']}
                                        renderInput={params => <TextField size='small' style={{ width: 350 }} {...params} error={errors.date && true} {...register('date', { required: true })} />}
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
                    </ThemeProvider>
                    {Object.keys(errors).length !== 0 && <Alert severity='error'>Выберите месяц</Alert>}
                    <MainButton content='Сформировать отчет' />
                </form>
            </div>
            <div className="monthy__content">
                <h1>Ежемесячный отчет</h1>
                {isReportLoading ?
                    <div className='monthy__content--loading'>
                        <img src={loading2} alt="" />
                    </div> :
                    monthy ?
                        monthy.length === 0 ?
                            <div className='monthy__content--poyasn'>
                                <p>В этом месяце не проведено ни одного урока</p>
                            </div> :
                            <table className='monthy__content--tabel'>
                                <thead>
                                    <th colSpan={5} style={{ paddingBottom: 15 }}>{monthyPeriod}</th>
                                </thead>
                                <thead >
                                    <th style={{ paddingBottom: 5 }}>№</th>
                                    <th style={{ paddingBottom: 5 }}>Учитель</th>
                                    <th style={{ paddingBottom: 5 }}>Ученик</th>
                                    <th style={{ paddingBottom: 5 }}>Тема урока</th>
                                    <th style={{ paddingBottom: 5 }}>Дата проведения</th>
                                </thead>
                                {monthy.map((report, index) =>
                                    <tr>
                                        <td>{monthy.length - index}</td>
                                        <td>{teachersArr && `${teachersArr.find(item => item._id === report.teacher).name} ${teachersArr.find(item => item._id === report.teacher).surname}`}</td>
                                        <td>{studentsArr && `${studentsArr.find(item => item._id === report.student).name} ${studentsArr.find(item => item._id === report.student).surname}`}</td>
                                        <td>{report.title}</td>
                                        <td>{moment(report.date).format('DD.MM.YYYY HH:mm')}</td>
                                    </tr>
                                )}
                                <tfoot>
                                    <td style={{ paddingTop: 15 }} colSpan={4}>Итого:</td>
                                    <td style={{ paddingTop: 15 }}>{monthy.length}</td>
                                </tfoot>
                            </table> :
                        <div className='monthy__content--poyasn'>
                            <p>Заполните все нужные поля и сформируйте отчет</p>
                        </div>
                }
            </div>
        </div>
    )
}

export default Monthy
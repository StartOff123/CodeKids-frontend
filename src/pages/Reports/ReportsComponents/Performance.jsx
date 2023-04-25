import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TextField, ThemeProvider, Alert } from '@mui/material'
import moment from 'moment'
import { Controller, useForm } from 'react-hook-form'
import MainButton from '../../../UI/Buttons/MainButton'
import { useDispatch, useSelector } from 'react-redux'
import loading2 from '../../../assets/loading2.svg'
import './reports.scss'
import { fetchPerformance } from '../../../redux/slices/report'
import { setPerformancePeriod } from '../../../redux/slices/report'
import { dackTheme, lightTheme } from '../../../muiTheme/theme'
import { useTheme } from '../../../Theme/useTheme'

import './reports.scss'

const Performance = () => {
    const dispatch = useDispatch()
    const { theme } = useTheme()
    const { performance, performancePeriod, performanceStatus } = useSelector(state => state.report)
    const { studentsArr } = useSelector(state => state.students)
    const { teachersArr } = useSelector(state => state.teachers)
    const isReportLoading = performanceStatus === 'loading'

    const arr = [
        { month: 'Январь', count: performance && performance.filter(item => item.date > performancePeriod + '-01-01T19:00:00.000+00:00' & item.date < performancePeriod + '-01-31T19:00:00.000+00:00').length },
        { month: 'Февраль', count: performance && performance.filter(item => item.date > performancePeriod + '-02-01T19:00:00.000+00:00' & item.date < performancePeriod + '-02-28T19:00:00.000+00:00').length },
        { month: 'Март', count: performance && performance.filter(item => item.date > performancePeriod + '-03-01T19:00:00.000+00:00' & item.date < performancePeriod + '-03-31T19:00:00.000+00:00').length },
        { month: 'Апрель', count: performance && performance.filter(item => item.date > performancePeriod + '-04-01T19:00:00.000+00:00' & item.date < performancePeriod + '-04-30T19:00:00.000+00:00').length },
        { month: 'Май', count: performance && performance.filter(item => item.date > performancePeriod + '-05-01T19:00:00.000+00:00' & item.date < performancePeriod + '-05-31T19:00:00.000+00:00').length },
        { month: 'Июнь', count: performance && performance.filter(item => item.date > performancePeriod + '-06-01T19:00:00.000+00:00' & item.date < performancePeriod + '-06-30T19:00:00.000+00:00').length },
        { month: 'Июль', count: performance && performance.filter(item => item.date > performancePeriod + '-07-01T19:00:00.000+00:00' & item.date < performancePeriod + '-07-31T19:00:00.000+00:00').length },
        { month: 'Август', count: performance && performance.filter(item => item.date > performancePeriod + '-08-01T19:00:00.000+00:00' & item.date < performancePeriod + '-08-31T19:00:00.000+00:00').length },
        { month: 'Сентябрь', count: performance && performance.filter(item => item.date > performancePeriod + '-09-01T19:00:00.000+00:00' & item.date < performancePeriod + '-09-30T19:00:00.000+00:00').length },
        { month: 'Октябрь', count: performance && performance.filter(item => item.date > performancePeriod + '-10-01T19:00:00.000+00:00' & item.date < performancePeriod + '-10-31T19:00:00.000+00:00').length },
        { month: 'Ноябрь', count: performance && performance.filter(item => item.date > performancePeriod + '-11-01T19:00:00.000+00:00' & item.date < performancePeriod + '-11-30T19:00:00.000+00:00').length },
        { month: 'Декабрь', count: performance && performance.filter(item => item.date > performancePeriod + '-12-01T19:00:00.000+00:00' & item.date < performancePeriod + '-12-31T19:00:00.000+00:00').length },
    ]

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            date: null,
        }
    })

    const onSubmit = async (values) => {
        const dateArr = String(values.date).split(' ')
        console.log(dateArr[3])
        const gt = dateArr[3] + '-01-01T19:00:00.000Z'
        const lt = dateArr[3] + '-12-31T19:00:00.000Z'
        dispatch(fetchPerformance({ gt, lt }))
        dispatch(setPerformancePeriod(dateArr[3]))
        console.log(arr)
    }

    return (
        <div>
            <div className='monthy'>
                <div className="monthy__header">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ThemeProvider theme={theme === 'light' ? lightTheme : dackTheme}>
                            <Controller
                                render={({ field }) => {
                                    return (
                                        <DatePicker
                                            label='Год'
                                            views={['year']}
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
                        {Object.keys(errors).length !== 0 && <Alert severity='error'>Выберите год</Alert>}
                        <MainButton content='Сформировать отчет' />
                    </form>
                </div>
                <div className="monthy__content">
                    <h1>Отчет эффективности</h1>
                    {isReportLoading ?
                        <div className='monthy__content--loading'>
                            <img src={loading2} alt="" />
                        </div> :
                        performance ?
                            
                                <table className='monthy__content--pertabel'>
                                    <thead>
                                        <th colSpan={3} style={{ paddingBottom: 15 }}>{performancePeriod} год</th>
                                    </thead>
                                    <thead >
                                        <th style={{ paddingBottom: 5 }}>№</th>
                                        <th style={{ paddingBottom: 5 }}>Месяц</th>
                                        <th style={{ paddingBottom: 5 }}>Кол-во уроков</th>
                                    </thead>
                                    {arr.slice().reverse().map((report, index) =>
                                        <tr>
                                            <td>{arr.length - index}</td>
                                            <td>{report.month}</td>
                                            <td>{report.count}</td>
                                        </tr>
                                    )}
                                    <tfoot>
                                        <td style={{ paddingTop: 15 }} colSpan={2}>Итого:</td>
                                        <td style={{ paddingTop: 15 }}>{performance.length}</td>
                                    </tfoot>
                                </table>
                             :
                            <div className='monthy__content--poyasn'>
                                <p>Заполните все нужные поля и сформируйте отчет</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Performance
import React from 'react'
import style from './Reports.module.scss'
import TitleButton from '../../UI/Buttons/TitleButton'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRemoveAllReport, fetchReport } from '../../redux/slices/report'
import { fetchStudents } from '../../redux/slices/students'
import { fetchTeacher } from '../../redux/slices/teachers'
import loading from '../../assets/loading2.svg'

const Reports = () => {
    document.title = 'CodeKids | Отчёты'
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.auth)
    const { reportArr, status } = useSelector(state => state.report)
    const isReportLoading = status === 'loading'

    React.useEffect(() => {
        dispatch(fetchReport())
    }, [])

    const onAllRemove = () => {
        dispatch(fetchRemoveAllReport())
    }

    return (
        <div className={style.reports}>
            <div className={style.title}>
                <div className={style.titleInfo}>
                    <h1>Управление</h1>
                    <p>Отчёты</p>
                </div>
                <div className={style.buttons}>
                    <TitleButton content='Сформировать ежемесячный отчет' />
                    <TitleButton content='Сформировать отчет эффективности' />
                </div>
            </div>
            <div className={style.reportsContent}>
                
            </div>
        </div>
    )
}

export default Reports
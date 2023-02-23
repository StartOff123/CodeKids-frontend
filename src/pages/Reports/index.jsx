import React from 'react'
import style from './Reports.module.scss'
import Popup from 'reactjs-popup'
import Button from '../../UI/Button'
import Table from './ReportsComponents/Table'
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
        dispatch(fetchTeacher())
        dispatch(fetchStudents())
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
                {data.status === 'genadmin' &&
                    <div className={style.buttons}>
                        <Button onClick={onAllRemove} content='Отчистить отчет' />
                    </div>
                }
            </div>
            <div className={style.reportsContent}>
                {reportArr &&
                    !isReportLoading ?
                    reportArr.length == 0 ? <h2>Отчет пуст</h2>
                    : <Table reports={reportArr} />
                    : <div style={{ width: '100%', textAlign: 'center' }}>
                        <img className={style.load} src={loading} alt="" />
                    </div>
                }
            </div>
        </div>
    )
}

export default Reports
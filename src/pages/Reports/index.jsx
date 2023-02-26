import React from 'react'
import style from './Reports.module.scss'
import TitleButton from '../../UI/Buttons/TitleButton'
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
                        <TitleButton
                            onClick={onAllRemove}
                            content='Отчистить отчет'
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                </svg>
                            }
                        />
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
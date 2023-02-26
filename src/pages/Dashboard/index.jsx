import React from 'react'
import style from './Dashboard.module.scss'
import Info from './DashboardComponents/Info'
import { useDispatch, useSelector } from 'react-redux'
import ComingLessons from './DashboardComponents/ComingLessons'
import { fetchStudents } from '../../redux/slices/students'
import SchoolStatistics from './DashboardComponents/SchoolStatistics'
import { fetchTeacher } from '../../redux/slices/teachers'
import { fetchAllLessons } from '../../redux/slices/lessons'

const Dashboard = () => {
    document.title = 'CodeKids | Панель управления'

    const dispatch = useDispatch()
    const { data } = useSelector(state => state.auth)

    React.useEffect(() => {
        dispatch(fetchStudents())
        dispatch(fetchTeacher())
        dispatch(fetchAllLessons())
    }, [])

    return (
        <div className={style.dashboard}>
            <div className={style.title}>
                <div className={style.titleInfo}>
                    <h1>Управление</h1>
                    <p>Панель управления</p>
                </div>
            </div>
            <div className={style.dashboardContent}>
                <div className={style.top}>
                    <Info data={data}/>
                    <ComingLessons />
                </div>
                <div className={style.bottom}>
                    <SchoolStatistics />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
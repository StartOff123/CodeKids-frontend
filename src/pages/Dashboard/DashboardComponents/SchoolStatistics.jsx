import React from 'react'
import { useSelector } from 'react-redux'
import style from '../Dashboard.module.scss'
import loading from '../../../assets/loading2.svg'

const SchoolStatistics = () => {
    const { teachersArr } = useSelector(state => state.teachers)
    const { studentsArr } = useSelector(state => state.students)
    const { allLessonsArr } = useSelector(state => state.lessons)

    const heldLessons = allLessonsArr && allLessonsArr.filter(lesson => lesson.status === 'held')

    const isLessonsLoading = useSelector(state => state.lessons.allLessonsStatus) === 'loading'
    const isStudentsLoading = useSelector(state => state.students.status) === 'loading'
    const isTeachersLoading = useSelector(state => state.teachers.status) === 'loading'

    return (
        <div className={style.component}>
            <h1>Статистика школы</h1>
            <div className={style.schoolInfo}>
                <p>Учителей в системе:
                    {isTeachersLoading ? <img src={loading} alt="loading" /> : <font> {teachersArr.length}</font>}
                </p>
                <p>Учеников в системе:
                    {isStudentsLoading ? <img src={loading} alt="loading" /> : <font> {studentsArr.length}</font>}
                </p>
                <p>Всего проведенных уроков:
                    {isLessonsLoading ? <img src={loading} alt="loading" /> : <font> {heldLessons.length}</font>}
                </p>
            </div>
        </div>
    )
}

export default SchoolStatistics
import React from 'react'
import { useSelector } from 'react-redux'
import style from '../Dashboard.module.scss'
import loading from '../../../assets/loading2.svg'
import Lesson from './Lesson'

const ComingLessons = () => {
    const { lessonsArr, status } = useSelector(state => state.lessons)
    const comingLessons = lessonsArr && lessonsArr.filter(lesson => lesson.status === 'coming')
    const isLessonsLoading = status === 'loading'

    return (
        <div className={style.component}>
            <h1>Запланированные уроки</h1>
            <div className={style.lessonsContent}>
                {isLessonsLoading ? <img src={loading} alt="loading" /> :
                    comingLessons.length === 0 ? <p>Нет запланированных уроков</p> :
                        comingLessons.slice().reverse().map((lesson) =>
                            <Lesson key={lesson._id} lesson={lesson} />
                        )
                }
            </div>
        </div>
    )
}

export default ComingLessons
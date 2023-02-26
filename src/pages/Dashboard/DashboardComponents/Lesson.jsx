import React from 'react'
import style from '../Dashboard.module.scss'
import moment from 'moment'
import { useSelector } from 'react-redux'

const Lesson = ({ lesson }) => {
    const { studentsArr, status } = useSelector(state => state.students)
    const isStudentsLoading = status === 'loading'

    return (
        <div className={style.lesson}>
            <div className={style.lessonTop}>
                <h1>{lesson.title}</h1>
                <h1>{moment(lesson.date).format('DD.MM.YYYY HH:mm')}</h1>
            </div>
            <div className={style.lessonInfo}>
                <h1>{lesson.theme}</h1>
                <h1>Ученик: {
                    isStudentsLoading ? '' :
                        studentsArr.filter(student => student._id === lesson.student)[0].name + ' ' + studentsArr.filter(student => student._id === lesson.student)[0].surname}
                </h1>
            </div>
        </div>
    )
}

export default Lesson
import React from 'react'
import style from './Lessons.module.scss'
import Popup from 'reactjs-popup'
import Button from '../../UI/Button'
import Lesson from './LessonsComponents/Lesson'
import loading from '../../assets/loading2.svg'
import AddLesson from '../../components/forms/AddLesson'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudents } from '../../redux/slices/students'

const Lessons = () => {
    document.title = 'CodeKids | Уроки'
    const dispatch = useDispatch()
    const { lessonsArr, status } = useSelector(state => state.lessons)
    const comingLessons = lessonsArr && lessonsArr.filter(lesson => lesson.status === 'coming')
    const heldLessons = lessonsArr && lessonsArr.filter(lesson => lesson.status === 'held')
    const isLessonsLoading = status === 'loading'

    React.useEffect(() => {
        dispatch(fetchStudents())
    }, [])

    return (
        <div className={style.lessons}>
            <div className={style.title}>
                <div className={style.titleInfo}>
                    <h1>Управление</h1>
                    <p>Уроки</p>
                </div>
                <div className={style.buttons}>
                    <Popup
                        position="center center"
                        trigger={<Button content='Запланировать урок' />}
                        modal
                    >
                        {close => <AddLesson onClose={close} />}
                    </Popup>
                </div>
            </div>
            <div className={style.lessonsContent}>
                <div className={style.lessonsStatus}>
                    <h1>Запланированные уроки</h1>
                    {comingLessons &&
                        !isLessonsLoading ?
                        comingLessons.length == 0 ? <h5>Нет запланированнх уроков</h5>
                            : comingLessons.slice().reverse().map((lesson) =>
                                <Lesson key={lesson._id} lessons={lesson} isCarriedOut={false} />
                            )
                        : <div style={{ width: '100%', textAlign: 'center' }}>
                            <img className={style.load} src={loading} alt="" />
                        </div>
                    }
                </div>
                <div className={style.lessonsStatus}>
                    <h1>История уроков</h1>
                    {heldLessons &&
                        !isLessonsLoading ?
                        heldLessons.length == 0 ? <h5>Вы еще не провели ни одного урока</h5>
                            : heldLessons.slice().reverse().map((lesson) =>
                                    <Lesson key={lesson._id} lessons={lesson} isCarriedOut={true} />
                            )
                        : <div style={{ width: '100%', textAlign: 'center' }}>
                            <img className={style.load} src={loading} alt="" />
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default Lessons
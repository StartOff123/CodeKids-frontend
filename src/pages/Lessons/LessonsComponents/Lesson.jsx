import React from 'react'
import style from '../Lessons.module.scss'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCouductLesson, fetchLessons, fetchRemoveLesson } from '../../../redux/slices/lessons'
import Popup from 'reactjs-popup'
import UpdateLesson from '../../../components/forms/UpdateLesson'
import Button from '../../../UI/Button'

const Lesson = ({ lessons, isCarriedOut }) => {
    const dispatch = useDispatch()
    const date = lessons.date

    const onRemove = () => {
        dispatch(fetchRemoveLesson(lessons._id))
        dispatch(fetchLessons())
    }

    const onConduct = () => {
        dispatch(fetchCouductLesson(lessons._id))
        dispatch(fetchLessons())
    }

    return (
        <div className={style.lesson}>
            <div className={style.top}>
                <h2>{lessons.title}</h2>
                <h3>{moment(date).format('DD.MM.YYYY HH:mm')}</h3>
            </div>
            <p>{lessons.theme}</p>
            <h4>Ученик: {lessons.student}</h4>
            {!isCarriedOut ?
                <div className={style.buttonss}>
                    <button onClick={onConduct}>Провести</button>
                    <Popup
                        position="center center"
                        trigger={<Button content='Изменить' />}
                        closeOnEscape
                        modal
                    >
                        {(close) => <UpdateLesson onClose={close} lesson={lessons} /> }
                    </Popup>
                    <button onClick={onRemove}>Удалить</button>
                </div>
                :
                <div className={style.helded}>
                    <h1>Проведён</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#30aa00" class="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                    </svg>
                </div>
            }
        </div>
    )
}

export default Lesson
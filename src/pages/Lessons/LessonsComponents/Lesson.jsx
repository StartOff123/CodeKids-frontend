import React from 'react'
import style from '../Lessons.module.scss'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCouductLesson, fetchLessons, fetchRemoveLesson } from '../../../redux/slices/lessons'
import loading from '../../../assets/loading2.svg'
import Popup from 'reactjs-popup'
import UpdateLesson from '../../../components/forms/UpdateLesson'
import RemoveButton from '../../../UI/Buttons/RemoveButton'
import ContextButton from '../../../UI/Buttons/ContextButton'
import Сonfirmation from '../../../components/forms/Сonfirmation'

const Lesson = ({ lessons, isCarriedOut }) => {
    const dispatch = useDispatch()
    const { studentsArr, status } = useSelector(state => state.students)
    const isStudentsLoading = status === 'loading'
    const date = lessons.date

    const onRemove = async () => {
        await dispatch(fetchRemoveLesson(lessons._id))
        dispatch(fetchLessons())
    }

    const onConduct = async () => {
        await dispatch(fetchCouductLesson(lessons._id))
        dispatch(fetchLessons())
    }

    return (
        <div className={style.lesson}>
            <div className={style.top}>
                <h2>{lessons.title}</h2>
                <h3>{moment(date).format('DD.MM.YYYY HH:mm')}</h3>
            </div>
            <p>{lessons.theme}</p>
            <h4>Ученик: {isStudentsLoading ? <img src={loading} alt="loading" style={{ height: 20 }} /> : studentsArr.filter(student => student._id === lessons.student)[0].name + ' ' + studentsArr.filter(student => student._id === lessons.student)[0].surname}</h4>
            {!isCarriedOut ?
                <div className={style.buttonss}>
                    <ContextButton
                        content='Провести'
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                        }
                        onClick={() => onConduct()} />
                    <Popup
                        position="center center"
                        trigger={
                            <ContextButton content='Изменить'
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                    </svg>}
                            />
                        }
                        closeOnEscape
                        modal
                    >
                        {(close) => <UpdateLesson onClose={close} lesson={lessons} />}
                    </Popup>
                    <Popup
                        position='center center'
                        trigger={
                            <RemoveButton
                                content='Удалить'
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>}
                            />
                        }
                        closeOnEscape
                        modal
                    >
                        {close => 
                            <Сonfirmation action={onRemove} onClose={close} title={`Уралить урок: ${lessons.title}?`} btnContent='Удалить' />
                        }
                    </Popup>

                </div>
                :
                <div className={style.helded}>
                    <h1>Проведён</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#30aa00" class="bi bi-check2-all" viewBox="0 0 16 16">
                        <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                        <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                    </svg>
                </div>
            }
        </div>
    )
}

export default Lesson
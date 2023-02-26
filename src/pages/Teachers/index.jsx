import React from 'react'
import style from './Teachers.module.scss'
import Popup from 'reactjs-popup'
import TitleButton from '../../UI/Buttons/TitleButton'
import CardItem from './TeachersComponents/CardItem'
import loading from '../../assets/loading2.svg'
import RegisterForm from '../../components/forms/RegisterForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTeacher } from '../../redux/slices/teachers'

const Teachers = () => {
    document.title = 'CodeKids | Учителя'
    const dispatch = useDispatch()
    const { teachersArr, status } = useSelector(state => state.teachers)
    const { data } = useSelector(state => state.auth)
    const isTeachersLoading = status === 'loading'

    var filterArrTeachers = new Array()
    var notMeArrTeachers = new Array()

    if (teachersArr) {
        filterArrTeachers = teachersArr.filter(teacher => teacher._id === data._id)
        notMeArrTeachers = teachersArr.filter(teacher => teacher._id !== data._id)
        filterArrTeachers.push(...notMeArrTeachers)
    }

    React.useEffect(() => {
        dispatch(fetchTeacher())
    }, [])

    return (
        <div className={style.teachers}>
            <div className={style.title}>
                <div className={style.titleInfo}>
                    <h1>Управление</h1>
                    <p>Учителя</p>
                </div>
                {data.status !== 'defaultTeacher' &&
                    <div className={style.buttons} >
                        <Popup
                            position="center center"
                            trigger={
                                <TitleButton
                                    content='Добавить учителя'
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                        </svg>
                                    }
                                />
                            }
                            modal
                        >
                            {close => (
                                <RegisterForm onClose={close} />
                            )}
                        </Popup>
                    </div>
                }
            </div>
            <div className={style.teachersContent}>
                <div className={style.card}>
                    {teachersArr &&
                        !isTeachersLoading ?
                        filterArrTeachers.map((teacher) =>
                            <CardItem key={teacher._id} id={teacher._id} teacher={teacher} />
                        ) :
                        <img className={style.load} src={loading} alt="" style={{ gridColumnStart: 2, margin: '0 auto' }} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Teachers
import React from 'react'
import style from './Teachers.module.scss'
import Popup from 'reactjs-popup'
import Button from '../../UI/Button'
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
                {data.status === 'admin' &&
                    <div className={style.buttons} >
                        <Popup
                            position="center center"
                            trigger={<Button content='Добавить учителя' />}
                            modal
                            nested
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
                        teachersArr.map((teacher) =>
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
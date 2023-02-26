import React from 'react'
import style from './Students.module.scss'
import Popup from 'reactjs-popup'
import TitleButton from '../../UI/Buttons/TitleButton'
import CardItem from './StudentsComponents/CardItem'
import loading from '../../assets/loading2.svg'
import AddStudent from '../../components/forms/AddStudent'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudents } from '../../redux/slices/students'

const Studetns = () => {
    document.title = 'CodeKids | Ученики'
    const dispatch = useDispatch()
    const { studentsArr, status } = useSelector(state => state.students)
    const { data } = useSelector(state => state.auth)
    const isStudentsLoading = status === 'loading'

    React.useEffect(() => {
        dispatch(fetchStudents())
    }, [])

    return (
        <div className={style.studetns}>
            <div className={style.title}>
                <div className={style.titleInfo}>
                    <h1>Управление</h1>
                    <p>Ученики</p>
                </div>
                {data.status === 'admin' || 'genadmin' &&
                    <div className={style.buttons}>
                        <Popup
                            position='top center'
                            trigger={
                                <TitleButton
                                    content='Добавить ученика'
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
                                <AddStudent onClose={close} />
                            )}
                        </Popup>
                    </div>
                }
            </div>
            <div className={style.studentsContent}>
                <div className={style.card} style={studentsArr && studentsArr.length == 0 ? { display: 'block', textAlign: 'center' } : {}}>
                    {studentsArr &&
                        !isStudentsLoading ?
                        studentsArr.length == 0 ? <h1>{data.status == 'defaultTeacher' ? 'Список пуст' : 'Список пуст.  Добавьте ученика'}</h1>
                            : studentsArr.map((student) =>
                                <CardItem key={student._id} students={student} />
                            )
                        : <img className={style.load} src={loading} alt="" style={{ gridColumnStart: 2, margin: '0 auto' }} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Studetns
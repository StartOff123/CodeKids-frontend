import React from 'react'
import style from './Students.module.scss'
import Popup from 'reactjs-popup'
import Button from '../../UI/Button'
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
                            trigger={<Button content='Добавить ученика' />}
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
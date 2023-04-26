import React from 'react'
import style from '../Teachers.module.scss'
import moment from 'moment'
import Popup from 'reactjs-popup'
import remove from '../../../assets/remove.png'
import Сonfirmation from '../../../components/forms/Сonfirmation'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRemoveTeacher, fetchTeacher } from '../../../redux/slices/teachers'
import axios from '../../../axios'

const CardItem = ({ teacher }) => {
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.auth)

  const onRemove = async () => {
    await dispatch(fetchRemoveTeacher(teacher._id))
    dispatch(fetchTeacher())
  }

  const root = async () => {
    await axios.patch(`/root/${teacher._id}`)
    dispatch(fetchTeacher())
  }

  const noroot = async () => {
    await axios.patch(`/noroot/${teacher._id}`)
    dispatch(fetchTeacher())
  }

  return (
    <div className={style.cardItem}>
      <div className={style.info}>
        {data.status !== 'defaultTeacher' ?
          <div className={style.cardButtons}>
            {data._id === teacher._id ? <p style={{ fontSize: 14 }}>Вы не можете редактировать и удалить свой аккаунт</p> :
              teacher.status === 'genadmin' ? <p style={{ fontSize: 14 }}>Этот аккаунт невозможно редактировать и удалить</p> :
                <div>
                  {teacher.status !== 'defaultTeacher' ?
                    <Popup
                      position='center center'
                      trigger={
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      }
                      modal
                    >
                      {close =>
                        <Сonfirmation action={noroot} onClose={close} title={`Забрать у учителя: ${teacher.name} ${teacher.surname} права администратора?`} btnContent='Забрать' />
                      }
                    </Popup> :
                    <Popup
                      position='center center'
                      trigger={
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      }
                      modal
                    >
                      {close =>
                        <Сonfirmation action={root} onClose={close} title={`Назначить учителя: ${teacher.name} ${teacher.surname} администратором?`} btnContent='Назначить' />
                      }
                    </Popup>
                  }
                  <Popup
                    position='center center'
                    trigger={
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                      </svg>
                    }
                    modal
                  >
                    {close =>
                      <Сonfirmation action={onRemove} onClose={close} title={`Уралить учителя: ${teacher.name} ${teacher.surname}?`} btnContent='Удалить' />
                    }
                  </Popup>
                </div>
            }
          </div> : ''
        }
        <div className={style.top}>
          <div className={style.img}>
            {teacher.avatarUrl !== '' ?
              <div className={style.img} style={{ background: `url(https://codekids-backend-production.up.railway.app${teacher.avatarUrl})`, backgroundPosition: 'center', backgroundSize: 'cover', objectFit: 'cover', height: '100%' }}></div> :
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
              </svg>
            }
          </div>
          <div className={style.infoInner}>
            <h2>{teacher.name} {teacher.surname} {data._id === teacher._id && '(Вы)'}</h2>
            <p>Статус: {teacher.status === 'defaultTeacher' ? 'Учитель' : 'Директор'}</p>
            <p>Дата регистрации: {moment(teacher.createdAt).format('DD.MM.YYYY')}</p>
          </div>
        </div>
      </div>
    </div >
  )
}

export default CardItem
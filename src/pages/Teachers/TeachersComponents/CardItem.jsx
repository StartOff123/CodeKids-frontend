import React from 'react'
import style from '../Teachers.module.scss'
import avatar from '../../../assets/user.png'
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
  const date = teacher.createdAt

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
            {teacher.status === 'genadmin' ? <p style={{ color: '#6394B6', fontSize: 14 }}>Этот аккаунт невозможно редактировать и удалить</p> :
              <div>
                {teacher.status !== 'defaultTeacher' ?
                  <Popup
                    position='center center'
                    trigger={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6394B6" className="bi bi-star-fill" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>}
                    modal
                  >
                    {close =>
                      <Сonfirmation action={noroot} onClose={close} title={`Забрать у учителя: ${teacher.name} ${teacher.surname} права администратора?`} btnContent='Забрать' />
                    }
                  </Popup> :
                  <Popup
                    position='center center'
                    trigger={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6394B6" className="bi bi-star" viewBox="0 0 16 16">
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>}
                    modal
                  >
                    {close =>
                      <Сonfirmation action={root} onClose={close} title={`Назначить учителя: ${teacher.name} ${teacher.surname} администратором?`} btnContent='Назначить' />
                    }
                  </Popup>
                }
                <Popup
                  position='center center'
                  trigger={<img src={remove} alt="img" />}
                  modal
                >
                  {close =>
                    <Сonfirmation action={onRemove} onClose={close} title={`Уралить учителя: ${teacher.name} ${teacher.surname}?`} btnContent='Удалить' />
                  }
                </Popup>

              </div>}
          </div> : ''
        }
        <div className={style.top}>
          <img src={avatar} alt="" />
          <div className={style.infoInner}>
            <h2>{teacher.name} {teacher.surname} {data._id === teacher._id && '(Вы)'}</h2>
            <p>Статус: {teacher.status === 'defaultTeacher' ? 'Учитель' : 'Учитель-администратор'}</p>
            <p>Дата регистрации: {moment(date).format('DD.MM.YYYY')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardItem
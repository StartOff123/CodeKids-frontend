import React from 'react'
import style from '../Dashboard.module.scss'
import moment from 'moment'
import { useSelector } from 'react-redux'
import loading from '../../../assets/loading2.svg'

const Info = ({ data }) => {
  const { lessonsArr, status } = useSelector(state => state.lessons)
  const comingLessons = lessonsArr && lessonsArr.filter(lesson => lesson.status === 'coming')
  const heldLessons = lessonsArr && lessonsArr.filter(lesson => lesson.status === 'held')
  const isLessonsLoading = status === 'loading'

  return (
    <div className={style.component}>
      <h1>Информация</h1>
      <div className={style.infoTop}>
        <div className={style.avatar}>
          {data.avatarUrl !== '' ?
                                        <div className={style.img} style={{ background: `url(http://localhost:5555${data.avatarUrl})`, backgroundPosition: 'center', backgroundSize: 'cover', objectFit: 'cover', height: '100%' }}></div> :
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#396794" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
          }
        </div>
        <div className={style.infoContent}>
          <h1>
            {data.name + ' ' + data.surname}
            {data.status === 'genadmin' &&
              <svg style={{ marginLeft: 5 }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1B7396" className="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            }
          </h1>
          <h2>Статус: {data.status === 'defaultTeacher' ? 'учитель' : 'учитель-администратор'}</h2>
          <h2>Дата регистрации: {moment(data.createdAt).format('DD.MM.YYYY')}</h2>
        </div>
      </div>
      <div className={style.infoStatistics}>
        {isLessonsLoading ? <img src={loading} alt="loading" /> :
          <>
            <p>Запланированно уроков: <font>{comingLessons.length}</font></p>
            <p>Проведено уроков: <font>{heldLessons.length}</font></p>
          </>
        }
      </div>
    </div>
  )
}

export default Info
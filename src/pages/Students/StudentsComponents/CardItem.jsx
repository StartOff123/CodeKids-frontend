import React from 'react'
import style from '../Students.module.scss'
import remove from '../../../assets/remove.png'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRemoveStudent, fetchStudents } from '../../../redux/slices/students'
import Popup from 'reactjs-popup'
import UpdateStudent from '../../../components/forms/UpdateStudent'
import parsePhoneNumber from 'libphonenumber-js'

const CardItem = ({ students }) => {
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.auth)
  const phoneNumber = parsePhoneNumber(String(students.phone), 'RU').format('NATIONAL')

  const onRemove = async () => {
    await dispatch(fetchRemoveStudent(students._id))
    dispatch(fetchStudents())
  }

  return (
    <div className={style.cardItem}>
      <div className={style.info}>
        {data.status === 'admin' ?
          <div className={style.cardButtons}>
            <div>
              <Popup
                position="center center"
                trigger={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6394B6" class="bi bi-pencil" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>}
                modal
              >
                {(close) => <UpdateStudent onClose={close} student={students} />}
              </Popup>
              <img src={remove} alt="img" onClick={onRemove} />
            </div>
          </div> : ''
        }
        <div className={style.top}>
          <div className={style.infoInner} style={data.status != 'admin' ? { marginTop: 0 } : {}}>
            <h2>{students.name} {students.surname}</h2>
            <p>Номер телефона:  {phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardItem
import React from 'react'
import style from './Header.module.scss'
import user from '../../assets/user.png'
import settings from '../../assets/settings.png'
import exit from '../../assets/exit.png'
import { useDispatch, useSelector } from 'react-redux'
import { setIsVisib } from '../../redux/slices/visib'
import { logout } from '../../redux/slices/auth'
import Popup from 'reactjs-popup'
import SettingsForm from '../forms/SettingsForm'

const Header = () => {
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.auth)
    const { isVisib, menuBtn } = useSelector(state => state.visib)

    const isVisibMenu = () => {
        dispatch(setIsVisib(!isVisib))
    }

    const onClickLogout = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
    }

    return (
        <div className={style.header} style={isVisib ? { width: 'calc(100% - 223px)' } : { width: 'calc(100% - 76px)' }}>
            <div className={style.left}>
                <div className={style.burger} onClick={() => isVisibMenu()}>
                    <div className={menuBtn ? style.burgerInner + ' ' + style.close : style.burgerInner + ' ' + style.open}>
                        <span></span>
                    </div>
                </div>
                <div className={style.search}>
                    <input type="text" placeholder='Поиск...' />
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </div>
            </div>
            <div className={style.right}>
                <div className={style.info}>
                    <div style={{ display: 'flex', justifyContent: 'right' }}>
                        <h2>{data.name} {data.surname}</h2>
                        {data.status === 'genadmin' &&
                            <svg style={{ marginLeft: 5 }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6394B6" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                        }
                    </div>
                    <p>{data.status === 'defaultTeacher' ? 'Учитель' : 'Учитель-администратор'}</p>
                </div>
                <div className={style.bottons}>
                    <img src={user} alt="img" />
                    <Popup
                        position='bottom right'
                        trigger={<img src={settings} alt="img" />}
                        overlayStyle={{ background: 'transparent' }}
                        nested
                    >
                        <SettingsForm />
                    </Popup>
                    <img src={exit} alt="img" onClick={() => onClickLogout()} />
                </div>
            </div>
        </div>
    )
}

export default Header
import React from 'react'
import { useSelector } from 'react-redux'
import style from './Menu.module.scss'
import logo from '../../assets/logo.png'
import dashboard from '../../assets/dashboard.png'
import teacher from '../../assets/teacher.png'
import student from '../../assets/student.png'
import lesson from '../../assets/lesson.png'
import report from '../../assets/report.png'

import { Link, NavLink } from 'react-router-dom'

const Menu = () => {
    const { isVisib } = useSelector(state => state.visib)
    const itemMenu = [
        { title: 'Панель управления', img: dashboard, path: 'dashboard' },
        { title: 'Учителя', img: teacher, path: 'teachers' },
        { title: 'Ученики', img: student, path: 'students' },
        { title: 'Уроки', img: lesson, path: 'lessons' },
        { title: 'Отчёты', img: report, path: 'reports' },
    ]

    return (
        <div className={style.menu} style={isVisib ? { width: 222 } : { width: 75 }}>
            <Link to='/' className={style.logo}>
                <img src={logo} alt="Logo" />
                <h1 style={isVisib ? { opacity: 1 } : { opacity: 0 }}>Code Kids</h1>
            </Link>
            <div className={style.managment}>
                <h1 style={isVisib ? { opacity: 1, padding: 20 } : { opacity: 0 }}>Управление</h1>
            </div>
            <div className={style.menuItem}>
                {itemMenu.map((item, index) =>
                    <NavLink
                        to={item.path}
                        className={({ isActive }) => style.item + ' ' + (isActive ? style.active : '')}
                        key={index}>
                            <img src={item.img} alt="img" style={isVisib ? { marginLeft: 0 } : { marginLeft: 5 }} />
                            <h1 style={isVisib ? { opacity: 1 } : { opacity: 0 }}>{item.title}</h1>
                    </NavLink>
                )}
            </div>
        </div>
    )
}

export default Menu
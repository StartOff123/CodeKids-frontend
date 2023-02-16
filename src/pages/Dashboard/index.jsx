import React from 'react'
import Popup from 'reactjs-popup'
import Button from '../../UI/Button'
import RegisterForm from '../../components/forms/RegisterForm'
import style from './Dashboard.module.scss'

const Dashboard = () => {
    return (
        <div className={style.dashboard}>
            <div className={style.title}>
                <div className={style.titleInfo}>
                    <h1>Управление</h1>
                    <p>Панель управления</p>
                </div>
                <div className={style.buttons}>
                    <Popup
                        position="center center"
                        trigger={<Button content='Добавить учителя' />}
                        modal
                    >
                        {close => (
                            <RegisterForm onClose={close}/>
                        )}
                    </Popup>
                </div>
            </div>
            <div className={style.dashboardContent}>

            </div>
        </div>
    )
}

export default Dashboard
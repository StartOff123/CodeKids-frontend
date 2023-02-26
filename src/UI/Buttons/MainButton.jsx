import React from 'react'
import style from './Button.module.scss'

const MainButton = ({ content, onClick, icon }) => {
  return (
    <button className={style.mainButton} onClick={onClick}>{content}{icon}</button>
  )
}

export default MainButton
import React from 'react'
import style from './Button.module.scss'

const Button = ({ content, onClick, icon }) => {
  return (
    <button className={style.titleButton} onClick={onClick}>{content}{icon}</button>
  )
}

export default Button
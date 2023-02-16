import React from 'react'
import style from './Button.module.scss'

const Button = ({ content, onClick }) => {
  return (
    <button className={style.button} onClick={onClick}>{content}</button>
  )
}

export default Button
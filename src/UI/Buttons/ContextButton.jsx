import React from 'react'
import style from './Button.module.scss'

const ContextButton = ({ content, onClick, icon }) => {
  return (
    <button className={style.contextButton} onClick={onClick}>{content}{icon}</button>
  )
}

export default ContextButton
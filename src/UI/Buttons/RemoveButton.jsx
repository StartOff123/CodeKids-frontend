import React from 'react'
import style from './Button.module.scss'

const RemoveButton = ({ content, onClick, icon }) => {
  return (
    <button className={style.removeButton} onClick={onClick}>{content}{icon}</button>
  )
}

export default RemoveButton
import React from 'react'
import loading from '../../assets/loading.svg'
import style from './Loading.module.scss'

const Loading = () => {
  return (
    <div className={style.loading}>
        <img src={loading} alt="Loading" />
    </div>
  )
}

export default Loading
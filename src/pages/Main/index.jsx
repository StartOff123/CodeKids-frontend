import React from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from 'react-router-dom'
import { selectIsAuth } from "../../redux/slices/auth"
import Menu from '../../components/Menu'
import Header from '../../components/Header'
import style from './Main.module.scss'
import { fetchRemider } from '../../redux/slices/remiders'
import { fetchLessons } from '../../redux/slices/lessons'

const Main = () => {
  const dispatch = useDispatch()
  const { isVisib } = useSelector(state => state.visib)
  const isAuth = useSelector(selectIsAuth)

  React.useEffect(() => {
    dispatch(fetchRemider())
    dispatch(fetchLessons())
  }, [])

  if (!isAuth) {
    return <Navigate to='/login' />
  }
  
  return (
    <div className='wrapper' style={isVisib ? { gridTemplateColumns: '223px 1fr' } : { gridTemplateColumns: '76px 1fr' }}>
      <div className={style.left}>
        <Menu />
      </div>
      <div className={style.right}>
        <Header />
        <div className={style.desktop}>
          <span style={isVisib ? {left: '50%'} : {left: '42%'}} >Code Kids CRM</span>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Main
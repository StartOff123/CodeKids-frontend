import Login from "./pages/Login"
import Main from "./pages/Main"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import "./styles/index.scss"
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Teachers from "./pages/Teachers"
import Studetns from "./pages/Students"
import Lessons from "./pages/Lessons"
import Reports from "./pages/Reports"
import { ru } from 'date-fns/locale'
import Dashboard from "./pages/Dashboard"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAuthMe, notAuth } from "./redux/slices/auth"
import Loading from "./pages/Loading"
import { useTheme } from "./Theme/useTheme"
import Monthy from './pages/Reports/ReportsComponents/Monthy'
import Performance from './pages/Reports/ReportsComponents/Performance'

const App = () => {
  const { theme, setTheme } = useTheme()
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.auth)
  React.useEffect(() => {
    if (window.localStorage.getItem('token')) {
      dispatch(fetchAuthMe())
      return
    }
    dispatch(notAuth())
  }, [])

  return (
    <LocalizationProvider adapterLocale={ru} dateAdapter={AdapterDateFns}>
      <div className="app">
        {status === 'loading' ? <Loading /> :
          <Routes>
            <Route path="/" element={<Main />} >
              <Route path="" element={<Home />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="students" element={<Studetns />} />
              <Route path="lessons" element={<Lessons />} />
              <Route path="reports" element={<Reports />}>
                <Route path="" element={<h2>Выберите вариант отчета для формирования</h2>} />
                <Route path="monthly_report" element={<Monthy />} />
                <Route path="performance_report" element={<Performance />} />
              </Route>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        }
      </div>
    </LocalizationProvider>
  )
}

export default App
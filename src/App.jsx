import Login from "./pages/Login"
import Main from "./pages/Main"
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import "./styles/index.scss"
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Teachers from "./pages/Teachers"
import Studetns from "./pages/Students"
import Lessons from "./pages/Lessons"
import Reports from "./pages/Reports"
import Dashboard from "./pages/Dashboard"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAuthMe, notAuth } from "./redux/slices/auth"
import Loading from "./pages/Loading"

const App = () => {
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="app">
        {status === 'loading' ? <Loading /> :
          <Routes>
            <Route path="/" element={<Main />} >
              <Route path="" element={<Home />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="students" element={<Studetns />} />
              <Route path="lessons" element={<Lessons />} />
              <Route path="reports" element={<Reports />} />
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
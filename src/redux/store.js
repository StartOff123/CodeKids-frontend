import { configureStore } from '@reduxjs/toolkit'
import menuReduser from './slices/visib'
import authReduser from './slices/auth'
import remiderReduser from './slices/remiders'
import teacherReduser from './slices/teachers'
import studentReduser from './slices/students'
import lessonReduser from './slices/lessons'
import reportReduser from './slices/report'

const store = configureStore({
    reducer: {
        visib: menuReduser,
        auth: authReduser,
        remiders: remiderReduser,
        teachers: teacherReduser,
        students: studentReduser,
        lessons: lessonReduser,
        report: reportReduser,
    }
})

export default store
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchStudents = createAsyncThunk('auth/fetchstudents', async () => {
    const { data } = await axios.get('/students')
    return data
}) 

export const fetchAddStudent = createAsyncThunk('auth/fetchAddStudent', async (params) => {
    const { data } = await axios.post('/student/add', params)
    return data
}) 

export const fetchRemoveStudent = createAsyncThunk('auth/fetchRemoveStudent', async (id) => {
    const { data } = await axios.delete(`/student/remove/${id}`)
    return data
}) 

export const fetchUpdateStudent = createAsyncThunk('auth/fetchUpdateStudent', async (params) => {
    const { id, ...values } = params
    const { data } = await axios.patch(`/student/update/${id}`, values)
    return data
}) 

const initialState = {
    studentsArr: null,
    status: 'loading',
}

const studentsArrSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchStudents.pending]: (state) => {
            state.studentsArr = null
            state.status = 'loading'
        },
        [fetchStudents.fulfilled]: (state, action) => {
            state.studentsArr = action.payload
            state.status = 'loaded'
        },
        [fetchStudents.rejected]: (state) => {
            state.studentsArr = null
            state.status = 'error'
        },
        [fetchAddStudent.pending]: (state) => {
            state.studentsArr = null
            state.status = 'loading'
        },
        [fetchAddStudent.fulfilled]: (state, action) => {
            if (state.studentsArr) {
                state.studentsArr.push({
                    ...action.payload,
                })
            } else {
                state.studentsArr = new Array({
                    ...action.payload
                })
            }
            state.status = 'loaded'
        },
        [fetchAddStudent.rejected]: (state) => {
            state.studentsArr = null
            state.status= 'error'
        },
        [fetchRemoveStudent.pending]: (state) => {
            state.studentsArr = null
            state.status = 'loading'
        },
        [fetchRemoveStudent.fulfilled]: (state) => {
            state.status = 'loaded'
        },
        [fetchRemoveStudent.rejected]: (state) => {
            state.studentsArr = null
            state.status= 'error'
        },
        [fetchUpdateStudent.pending]: (state) => {
            state.studentsArr = null
            state.status = 'loading'
        },
        [fetchUpdateStudent.fulfilled]: (state) => {
            state.status = 'loaded'
        },
        [fetchUpdateStudent.rejected]: (state) => {
            state.studentsArr = null
            state.status= 'error'
        },
    }
})

export default studentsArrSlice.reducer
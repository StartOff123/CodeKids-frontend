import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchTeacher = createAsyncThunk('auth/fetchTeacher', async () => {
    const { data } = await axios.get('/teachers')
    return data
}) 

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/registered', params)
    return data
}) 

export const fetchRemoveTeacher = createAsyncThunk('auth/fetchRemoveTeacher', async (params) => {
    const { data } = await axios.delete(`/teacher/remove/${params}`)
    return data
}) 

const initialState = {
    teachersArr: null,
    status: 'loading',
}

const teachersSlice = createSlice({
    name: 'teachers',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTeacher.pending]: (state) => {
            state.teachersArr = null
            state.status = 'loading'
        },
        [fetchTeacher.fulfilled]: (state, action) => {
            state.teachersArr = action.payload
            state.status = 'loaded'
        },
        [fetchTeacher.rejected]: (state) => {
            state.teachersArr = null
            state.status = 'error'
        },
        [fetchRegister.pending]: (state) => {
            state.teachersArr = null
            state.status = 'loading'
        },
        [fetchRegister.fulfilled]: (state, action) => {
            if (state.teachersArr) {
                state.teachersArr.push({
                    ...action.payload,
                })
            } else {
                state.teachersArr = new Array({
                    ...action.payload
                })
            }
            state.status = 'loaded'
        },
        [fetchRegister.rejected]: (state) => {
            state.teachersArr = null
            state.status= 'error'
        },
        [fetchRemoveTeacher.pending]: (state) => {
            state.teachersArr = null
            state.status = 'loading'
        },
        [fetchRemoveTeacher.fulfilled]: (state) => {
            state.status = 'loaded'
        },
        [fetchRemoveTeacher.rejected]: (state) => {
            state.teachersArr = null
            state.status= 'error'
        },
    }
})

export default teachersSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchTeacher = createAsyncThunk('auth/fetchTeacher', async () => {
    const { data } = await axios.get('/teachers')
    return data
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    try {
        const { data } = await axios.post('/auth/registered', params)
        return data
    } catch (error) {
        throw error.pesponse.data
    }
})

export const fetchRemoveTeacher = createAsyncThunk('auth/fetchRemoveTeacher', async (params) => {
    const { data } = await axios.delete(`/teacher/remove/${params}`)
    return data
})

const initialState = {
    teachersArr: null,
    status: 'loading',
    error: null,
}

const teachersSlice = createSlice({
    name: 'teachers',
    initialState,
    reducers: {
        doNotMatchPassword: state => {
            state.error = { message: 'Пароли не совпадают' }
        },
    },
    extraReducers: (bilding) => {
        bilding
            .addCase(fetchTeacher.pending, (state) => {
                state.teachersArr = null
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchTeacher.fulfilled, (state, action) => {
                state.teachersArr = action.payload
                state.status = 'loaded'
                state.error = null
            })
            .addCase(fetchTeacher.rejected, (state, action) => {
                state.teachersArr = null
                state.status = 'error'
                state.error = action.payload
            })
            .addCase(fetchRegister.pending, (state) => {
                state.teachersArr = null
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
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
                state.error = null
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.teachersArr = null
                state.status = 'error'
                state.data = action.payload
            })
            .addCase(fetchRemoveTeacher.pending, (state) => {
                state.teachersArr = null
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchRemoveTeacher.fulfilled, (state) => {
                state.status = 'loaded'
                state.error = null
            })
            .addCase(fetchRemoveTeacher.rejected, (state, action) => {
                state.teachersArr = null
                state.status = 'error'
                state.error = action.payload
            })
    }
})

export const { doNotMatchPassword } = teachersSlice.actions
export default teachersSlice.reducer
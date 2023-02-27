import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchLessons = createAsyncThunk('lesson/fetchLessons', async () => {
    const { data } = await axios.get('/lessons/all')
    return data
})

export const fetchAddLesson = createAsyncThunk('lesson/fetchAddLesson', async (params) => {
    const { data } = await axios.post('/lessons/add', params)
    return data
})

export const fetchRemoveLesson = createAsyncThunk('lesson/fetchRemoveLesson', async (id) => {
    const { data } = await axios.delete(`/lessons/remove/${id}`)
    return data
})

export const fetchUpdateLesson = createAsyncThunk('lesson/fetchUpdateLesson', async (params) => {
    const { id, ...values } = params
    const { data } = await axios.patch(`/lessons/update/${id}`, values)
    return data
})

export const fetchCouductLesson = createAsyncThunk('lesson/fetchCouductLesson', async (params) => {
    const { data } = await axios.patch(`/lessons/held/${params}`)
    return data
})

const initialState = {
    lessonsArr: null,
    status: 'loading',
}

const lessonsSlice = createSlice({
    name: 'lessons',
    initialState,
    reducers: {},
    extraReducers: (bilding) => {
        bilding
            .addCase(fetchLessons.pending, state => {
                state.lessonsArr = null
                state.status = 'loading'
            })
            .addCase(fetchLessons.fulfilled, (state, action) => {
                state.lessonsArr = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchLessons.rejected, state => {
                state.lessonsArr = null
                state.status = 'error'
            })
            .addCase(fetchAddLesson.pending, state => {
                state.lessonsArr = null
                state.status = 'loading'
            })
            .addCase(fetchAddLesson.fulfilled, (state, action) => {
                if (state.lessonsArr) {
                    state.lessonsArr.push({
                        ...action.payload,
                    })
                } else {
                    state.lessonsArr = new Array({
                        ...action.payload
                    })
                }
                state.status = 'loaded'
            })
            .addCase(fetchAddLesson.rejected, state => {
                state.lessonsArr = null
                state.status = 'error'
            })
            .addCase(fetchRemoveLesson.pending, state => {
                state.lessonsArr = null
                state.status = 'loading'
            })
            .addCase(fetchRemoveLesson.fulfilled, state => {
                state.status = 'loaded'
            })
            .addCase(fetchRemoveLesson.rejected, state => {
                state.lessonsArr = null
                state.status = 'error'
            })
            .addCase(fetchUpdateLesson.pending, state => {
                state.lessonsArr = null
                state.status = 'loading'
            })
            .addCase(fetchUpdateLesson.fulfilled, state => {
                state.status = 'loaded'
            })
            .addCase(fetchUpdateLesson.rejected, state => {
                state.lessonsArr = null
                state.status = 'error'
            })
            .addCase(fetchCouductLesson.pending, state => {
                state.lessonsArr = null
                state.status = 'loading'
            })
            .addCase(fetchCouductLesson.fulfilled, state => {
                state.status = 'loaded'
            })
            .addCase(fetchCouductLesson.rejected, state => {
                state.lessonsArr = null
                state.status = 'error'
            })
    }
})

export default lessonsSlice.reducer
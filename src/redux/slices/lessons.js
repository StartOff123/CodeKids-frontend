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
    extraReducers: {
        [fetchLessons.pending]: (state) => {
            state.lessonsArr = null
            state.status = 'loading'
        },
        [fetchLessons.fulfilled]: (state, action) => {
            state.lessonsArr = action.payload
            state.status = 'loaded'
        },
        [fetchLessons.rejected]: (state) => {
            state.lessonsArr = null
            state.status = 'error'
        },
        [fetchAddLesson.pending]: (state) => {
            state.lessonsArr = null
            state.status = 'loading'
        },
        [fetchAddLesson.fulfilled]: (state, action) => {
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
        },
        [fetchAddLesson.rejected]: (state) => {
            state.lessonsArr = null
            state.status= 'error'
        },
        [fetchRemoveLesson.pending]: (state) => {
            state.lessons = null
            state.status = 'loading'
        },
        [fetchRemoveLesson.fulfilled]: (state) => {
            state.status = 'loaded'
        },
        [fetchRemoveLesson.rejected]: (state) => {
            state.lessonsArr = null
            state.status= 'error'
        },
        [fetchUpdateLesson.pending]: (state) => {
            state.lessonsArr = null
            state.status = 'loading'
        },
        [fetchUpdateLesson.fulfilled]: (state) => {
            state.status = 'loaded'
        },
        [fetchUpdateLesson.rejected]: (state) => {
            state.lessonsArr = null
            state.status= 'error'
        },
        [fetchCouductLesson.pending]: (state) => {
            state.lessonsArr = null
            state.status = 'loading'
        },
        [fetchCouductLesson.fulfilled]: (state) => {
            state.status = 'loaded'
        },
        [fetchCouductLesson.rejected]: (state) => {
            state.lessonsArr = null
            state.status= 'error'
        },
    }
})

export default lessonsSlice.reducer
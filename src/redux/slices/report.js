import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchReport = createAsyncThunk('report/fetchReport', async () => {
    const { data } = await axios.get('/report')
    return data
}) 

export const fetchRemoveAllReport = createAsyncThunk('report/fetchRemoveAllReport', async () => {
    const { data } = await axios.delete('/report/remove')
    return data
}) 

const initialState = {
    reportArr: null,
    status: 'loading',
}

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchReport.pending]: (state) => {
            state.reportArr = null
            state.status = 'loading'
        },
        [fetchReport.fulfilled]: (state, action) => {
            state.reportArr = action.payload
            state.status = 'loaded'
        },
        [fetchReport.rejected]: (state) => {
            state.reportArr = null
            state.status = 'error'
        },
        [fetchRemoveAllReport.pending]: (state) => {
            state.reportArr = null
            state.status = 'loading'
        },
        [fetchRemoveAllReport.fulfilled]: (state) => {
            state.reportArr = []
            state.status = 'loaded'
        },
        [fetchRemoveAllReport.rejected]: (state) => {
            state.reportArr = null
            state.status = 'error'
        },
    }
})

export default reportSlice.reducer
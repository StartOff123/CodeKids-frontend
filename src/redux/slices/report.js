import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchMonthy = createAsyncThunk('report/fetchMonthy', async (params) => {
    const { data } = await axios.post('/report/monthly_report', params)
    return data
})

export const fetchPerformance = createAsyncThunk('report/fetchPerformance', async (params) => {
    const { data } = await axios.post('/report/monthly_report', params)
    return data
})

const initialState = {
    monthy: null,
    performance: null,
    monthyPeriod: null,
    performancePeriod: null,
    monthyStatus: 'loaded',
    performanceStatus: 'loaded',
}

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setMonthyPeriod: (state, action) => {
            state.monthyPeriod = action.payload
        },
        setPerformancePeriod: (state, action) => {
            state.performancePeriod = action.payload
        },
    },
    extraReducers: (bilding) => {
        bilding
            .addCase(fetchMonthy.pending, state => {
                state.monthy = null
                state.monthyStatus = 'loading'
            })
            .addCase(fetchMonthy.fulfilled, (state, action) => {
                state.monthy = action.payload
                state.monthyStatus = 'loaded'
            })
            .addCase(fetchMonthy.rejected, state => {
                state.monthy = null
                state.monthyStatus = 'error'
            })
            .addCase(fetchPerformance.pending, state => {
                state.performance = null
                state.performanceStatus = 'loading'
            })
            .addCase(fetchPerformance.fulfilled, (state, action) => {
                state.performance = action.payload
                state.performanceStatus = 'loaded'
            })
            .addCase(fetchPerformance.rejected, state => {
                state.performance = null
                state.performanceStatus = 'error'
            })
    }
   
})

export const { setMonthyPeriod, setPerformancePeriod } = reportSlice.actions
export default reportSlice.reducer
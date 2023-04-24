import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchMonthy = createAsyncThunk('report/fetchMonthy', async (params) => {
    const { data } = await axios.post('/report/monthly_report', params)
    return data
})

const initialState = {
    monthy: null,
    monthyPeriod: null,
    monthyStatus: 'loading',
}

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setMonthyPeriod: (state, action) => {
            state.monthyPeriod = action.payload
        }
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
    }
   
})

export const { setMonthyPeriod } = reportSlice.actions
export default reportSlice.reducer
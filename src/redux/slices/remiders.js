import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchRemider = createAsyncThunk('auth/fetchRemider', async () => {
    const { data } = await axios.get('/remiders/all')
    return data
})

export const fetchAddRemider = createAsyncThunk('auth/fetchAddRemider', async (params) => {
    const { data } = await axios.post('/remiders/add', params)
    return data
}) 

export const fetchRemoveRemider = createAsyncThunk('auth/fetchRemoveRemider', async (params) => {
    const { data } = await axios.delete(`/remiders/remove/${params}`)
    return data
}) 

const initialState = {
    remidersArr: null,
    status: 'loading'
}

const remiderSlice = createSlice({
    name: 'remider',
    initialState,
    extraReducers: {
        [fetchRemider.pending]: (state) => {
            state.remidersArr = []
            state.status = 'loading'
        },
        [fetchRemider.fulfilled]: (state, action) => {
            state.remidersArr = action.payload
            state.status = 'loaded'
        },
        [fetchRemider.rejected]: (state) => {
            state.remidersArr = []
            state.status= 'error'
        },
        [fetchAddRemider.pending]: (state) => {
            state.remidersArr = []
            state.status = 'loading'
        },
        [fetchAddRemider.fulfilled]: (state, action) => {
            if (state.remidersArr) {
                state.remidersArr.push({
                    ...action.payload,
                })
            } else {
                state.remidersArr = new Array({
                    ...action.payload
                })
            }
            state.status = 'loaded'
        },
        [fetchAddRemider.rejected]: (state) => {
            state.remidersArr = []
            state.status= 'error'
        },
        [fetchRemoveRemider.pending]: (state) => {
            state.remidersArr = []
            state.status = 'loading'
        },
        [fetchRemoveRemider.fulfilled]: (state) => {
            state.status = 'loaded'
        },
        [fetchRemoveRemider.rejected]: (state) => {
            state.remidersArr = []
            state.status= 'error'
        },
    }
})

export default remiderSlice.reducer
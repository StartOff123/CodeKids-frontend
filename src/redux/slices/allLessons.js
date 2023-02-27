import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchAllLessons = createAsyncThunk('lesson/fetchAllLessons', async () => {
    const { data } = await axios.get('/lessons')
    return data
})

const initialState = {
    allLessonsArr: null,
    status: 'loading',
}

const allLessonsSlice = createSlice({
    name: 'allLessons',
    initialState,
    extraReducers: (bilding) => {
        bilding
            .addCase(fetchAllLessons.pending, state => {
                state.allLessonsArr = null
                state.status = 'loading'
            })
            .addCase(fetchAllLessons.fulfilled, (state, action) => {
                state.allLessonsArr = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchAllLessons.rejected, state => {
                state.allLessonsArr = null
                state.status = 'error'
            })
    }
})

export default allLessonsSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params)
    return data
}) 

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me')
    return data
}) 

export const fetchUpdateMeData = createAsyncThunk('auth/fetchUpdateMeData', async (params) => {
    const { id, ...values } = params
    const { data } = await axios.patch(`/teacher/update/${id}`, values)
    return data
}) 

export const fetchUpdatePassword = createAsyncThunk('auth/fetchUpdatePassword', async (params) => {
    const { id, confirmationPassword, ...values } = params
    await axios.patch(`/password/${id}`, values)
}) 

const initialState = {
    data: null,
    // status: 'loading',
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.data = null
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
        },
        [fetchAuth.rejected]: (state, action) => {
            state.data = null
            state.status = 'error'
        },
        [fetchAuth.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
        },
        [fetchAuth.rejected]: (state, action) => {
            state.data = null
            state.status = 'error'
        },
        [fetchAuthMe.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
        },
        [fetchAuthMe.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },
        [fetchUpdateMeData.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchUpdateMeData.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
        },
        [fetchUpdateMeData.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },
    }
})

export const selectIsAuth = state => Boolean(state.auth.data)
export default authSlice.reducer
export const { logout } = authSlice.actions
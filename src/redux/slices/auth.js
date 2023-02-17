import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    try {
        const { data } = await axios.post('/auth/login', params)
        return data
    } catch (error) {
        throw error.response.data
    }
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me')
    return data
})

export const fetchUpdateMeData = createAsyncThunk('auth/fetchUpdateMeData', async (params) => {
    try {
        const { id, ...values } = params
        const { data } = await axios.patch(`/teacher/update/${id}`, values)
        return data
    } catch (error) {
        throw error.response.data
    }
})

const initialState = {
    data: null,
    status: 'loading',
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.data = null
        },
        notAuth: state => {
            state.status = 'loaded'
        }
    },
    extraReducers: (bilding) => {
        bilding
            .addCase(fetchAuth.pending, (state) => {
                state.data = null
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'loaded'
                state.error = null
            })
            .addCase(fetchAuth.rejected, (state, action) => {
                state.data = null
                state.status = 'error'
                state.error = action.error
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.data = null
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'loaded'
                state.error = null
            })
            .addCase(fetchAuthMe.rejected, (state, action) => {
                state.data = null
                state.status = 'error'
                state.error = action.error
            })
            .addCase(fetchUpdateMeData.pending, (state) => {
                state.data = null
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchUpdateMeData.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'loaded'
                state.error = null
            })
            .addCase(fetchUpdateMeData.rejected, (state, action) => {
                state.data = null
                state.status = 'error'
                state.error = action.error
            })
    }
})

export const selectIsAuth = state => Boolean(state.auth.data)
export default authSlice.reducer
export const { logout, notAuth } = authSlice.actions
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchUpdatePassword = createAsyncThunk('auth/fetchUpdatePassword', async (params) => {
    try {
        const { id, confirmationPassword, ...values } = params
        const { data } = await axios.patch(`/password/${id}`, values)
        return data
    } catch (error) {
        throw error.response.data
    }
})

const initialState = {
    success: null,
    error: null
}

const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {
        doNotMatchPassword: state => {
            state.error = { message: 'Пароли не совпадают' }
            state.success = null
        },
        closeError: state => {
            state.success = null
            state.error = null
        }
    },
    extraReducers: (bilding) => {
        bilding
            .addCase(fetchUpdatePassword.fulfilled, (state, action) => {
                state.success = action.payload
                state.error = null
            })
            .addCase(fetchUpdatePassword.rejected, (state, action) => {
                state.success = null
                state.error = action.error
            })
    }
})

export default passwordSlice.reducer
export const { doNotMatchPassword, closeError } = passwordSlice.actions
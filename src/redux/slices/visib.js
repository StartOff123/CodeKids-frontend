import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isVisib: true,
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setIsVisib: (state, action) => {
            state.isVisib = action.payload
        },
    }
})

export default menuSlice.reducer
export const { setIsVisib } = menuSlice.actions
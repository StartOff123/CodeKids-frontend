import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isVisib: true,
    menuBtn: true
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setIsVisib: (state, action) => {
            state.isVisib = action.payload
            state.menuBtn = action.payload
        },
    }
})

export default menuSlice.reducer
export const { setIsVisib } = menuSlice.actions
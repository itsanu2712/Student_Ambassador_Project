import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser : null
}

//slice
const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers: {
        saveUserState: (state, action) => {
            state.currentUser = action.payload
        },

        removeUserState: (state) => {
            state.currentUser = null
        },

        updateUserState: (state, action) => {
            state.currentUser = action.payload
        }
    }
})


//export reducers
export const { saveUserState, updateUserState, removeUserState} = userSlice.actions

export default userSlice.reducer;
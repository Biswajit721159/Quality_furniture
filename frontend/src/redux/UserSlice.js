import { createSlice } from '@reduxjs/toolkit'

function fetchInitialData() {
    let user = localStorage.getItem('user');
    if (user === null) {
        return null
    } else {
        user = JSON.parse(user)
        return user
    }
}

function Set_UserData(data) {
    localStorage.setItem('user', JSON.stringify(data))
}

function Clear_User() {
    localStorage.removeItem('user')
}


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: fetchInitialData(),
    },

    reducers: {
        Add_User: (state, action) => {
            state.user = action.payload;
            Set_UserData(action.payload)
        },
        Logout_User: (state, action) => {
            state.user = null
            Clear_User()
        }
    },
})


export const usermethod = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer
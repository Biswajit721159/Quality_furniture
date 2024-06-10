import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const api = process.env.REACT_APP_API

export const loadUser = createAsyncThunk(
  'User/loadUser',
  async (parameter) => {
    try {
      let LowerLimit = parameter.LowerLimit
      let UpperLimit = parameter.UpperLimit
      let searchvalue = parameter?.searchvalue
      if (searchvalue === '') searchvalue = undefined
      let userinfo = parameter?.userinfo
      let responce = await fetch(`${api}/user/searchNameAndEmail/${searchvalue}/${LowerLimit}/${UpperLimit}`, {
        headers: {
          Authorization: `Bearer ${userinfo?.accessToken}`
        }
      })
      let data = await responce.json()
      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const updateUser = createAsyncThunk('Order/updateUser', async (parameter) => {
  try {
    let { formData, userinfo } = parameter
    const response = await fetch(`${api}/user/updateUserinfo/${formData?._id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userinfo?.accessToken}`
      },
      body: JSON.stringify({
        status: formData?.status,
        address: formData?.address,
        isBlackListUser: formData?.isBlackListUser
      }),
    })
    const data = await response.json();
    return { data: data, formData: formData };
  } catch (error) {
    throw error
  }
})

const AlluserSlice = createSlice({
  name: 'Alluser',
  initialState: {
    Alluser: [],
    userLoading: false,
    LowerLimit: 0,
    UpperLimit: 10,
    searchvalue: '',
    error: '',
    prev: false,
    next: false,
    isUserLogin: true,
    UpdatedUserMessage: '',
    UpdatedUserLoading: false
  },

  reducers: {
    ADD_USER: (state, action) => {
      let data = action.payload;
      let n = data.length;
      state.prev = data[n - 1].prev;
      state.next = data[n - 1].next;
      data = data.slice(0, n - 1);
      state.Alluser = data;
    },
    REMOVE_USER: (state, action) => {
      state.Alluser = []
      state.next = false;
      state.prev = false;
    },
    SetLowerLimitHighLimit: (state, action) => {
      state.LowerLimit = action.payload?.LowerLimit
      state.UpperLimit = action.payload?.UpperLimit
    },
    setSearchValue: (state, action) => {
      state.searchvalue = action?.payload
    },
    Reset: (state, action) => {
      let data = action?.payload;
      if (data?.Alluser !== undefined) state.Alluser = data?.Alluser;
      if (data?.prev !== undefined) state.prev = data?.prev;
      if (data?.next !== undefined) state.next = data?.next;
      if (data?.searchvalue !== undefined) state.searchvalue = data?.searchvalue;
      if (data?.LowerLimit !== undefined) state.LowerLimit = data?.LowerLimit;
      if (data?.UpperLimit !== undefined) state.UpperLimit = data?.UpperLimit;
      if (data?.userLoading !== undefined) state.userLoading = data?.userLoading;
      if (data?.isUserLogin !== undefined) state.isUserLogin = data?.isUserLogin;
      if (data?.error !== undefined) state.error = data?.error;
    },
    setUpdatedOrderMessage: (state, action) => {
      state.UpdatedUserMessage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.userLoading = true
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.error = null
        let data = action?.payload?.data
        if (action?.payload?.statusCode === 200) {
          let n = data?.length;
          state.prev = data?.[n - 1]?.prev;
          state.next = data?.[n - 1]?.next;
          data = data?.slice(0, n - 1);
          if (state.LowerLimit === 0) {
            state.Alluser = []
          }
          let newAllusers = data?.slice(0, n - 1);
          let Alluser_ids = state.Alluser.map((data) => {
            return data?._id;
          })
          let flag = true
          let filterAllusers = newAllusers.filter((data) => {
            if (Alluser_ids.includes(data?._id) === false) return data;
            else flag = false;
          })
          state.Alluser = [...state.Alluser, ...filterAllusers];
          if (flag) {
            state.LowerLimit += 10;
            state.UpperLimit += 10;
          }
        }
        else if (action?.payload?.statusCode === 498) {
          state.isUserLogin = false
        }
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.error.message;
      })

      .addCase(updateUser.pending, (state) => {
        state.UpdatedUserLoading = true
        state.UpdatedUserMessage = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.UpdatedUserLoading = false;
        state.UpdatedUserMessage = null;
        let data = action?.payload?.data
        let formData = action?.payload?.formData

        if (action?.payload?.data?.statusCode === 200) {
          let user = state.Alluser
          let UpdatedOrder = user?.map((Data) => {
            if (Data?._id === formData?._id) {
              Data.address = formData?.address
              Data.name = formData?.name
              Data.isBlackListUser = formData?.isBlackListUser
              return Data
            } else {
              return Data
            }
          })
          state.Alluser = UpdatedOrder
          state.UpdatedUserMessage = data?.message
        }
        else if (action?.payload?.data?.statusCode === 498) {
          state.isUserLogin = false
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.UpdatedUserLoading = false;
        state.UpdatedUserMessage = action.error.message;
      })
  }
})

export const Allusermethod = AlluserSlice.actions
const AlluserReducer = AlluserSlice.reducer
export default AlluserReducer
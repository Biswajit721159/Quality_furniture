import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const api = process.env.REACT_APP_API

export const LoadOrder = createAsyncThunk(
    'Order/LoadOrder',
    async (parameter) => {
        try {
            let { userinfo, LowerLimit, UpperLimit } = parameter
            let response = await fetch(`${api}/order/getorderByLimit/${LowerLimit}/${UpperLimit}/${userinfo?.user?.email}`, {
                headers: {
                    Authorization: `Bearer ${userinfo?.accessToken}`
                }
            })
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
);

const initialState = {
    Order: [],
    loadingOrder: false,
    prev: false,
    next: false,
    LowerLimit: 0,
    UpperLimit: 10,
    error: null,
    isOrderLogedin: true
};

const OrderSlice = createSlice({
    name: "Orderstore",
    initialState,
    reducers: {
        clearOrder: (state, action) => {
            state.Order = [];
            state.prev = false;
            state.next = false;
            state.LowerLimit = 0;
            state.UpperLimit = 10;
            state.error = null;
        },
        markisfeedback: (state, action) => {
            let id = action?.payload?.id
            let newOrder = state.Order.map((data) => {
                if (data.id === id) {
                    data.isfeedback = true
                    return data;
                } else {
                    return data;
                }
            })
            state.Order = newOrder
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoadOrder.pending, (state) => {
                state.loadingOrder = true;
                state.error = null;
            })
            .addCase(LoadOrder.fulfilled, (state, action) => {
                state.loadingOrder = false;
                let data = action?.payload
                if (data?.statusCode === 498) {
                    state.isOrderLogedin = false;
                    return;
                }
                let n = data?.data?.length;
                data = data?.data;
                let newOrder = data.slice(0, n - 1);
                state.Order = [...state.Order, ...newOrder];
                state.prev = data?.[n - 1]?.prev;
                state.next = data?.[n - 1]?.next;
                state.LowerLimit += 10;
                state.UpperLimit += 10;
                state.error = null;
            })
            .addCase(LoadOrder.rejected, (state, action) => {
                state.loadingOrder = false;
                state.error = action.error.message;
            })

    }
});


export const Ordermethod = OrderSlice.actions;
const OrderReducer = OrderSlice.reducer;
export default OrderReducer;

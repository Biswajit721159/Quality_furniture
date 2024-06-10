import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const api = process.env.REACT_APP_API;

export const userDashboard = createAsyncThunk(
    'user/UserDashboard',
    async (parameter) => {
        try {
            let { userinfo } = parameter;
            const response = await fetch(`${api}/user/Dashboard/countNumberUser`, {
                headers: {
                    Authorization: `Bearer ${userinfo?.accessToken}`
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
);

export const productDashboard = createAsyncThunk(
    'product/ProductDashboard',
    async (parameter) => {
        try {
            let { userinfo } = parameter;
            const response = await fetch(`${api}/product/Dashboard/findcountNumberProduct`, {
                headers: {
                    Authorization: `Bearer ${userinfo?.accessToken}`
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
);

export const orderDashboard = createAsyncThunk(
    'order/OrderDashboard',
    async (parameter) => {
        try {
            let { userinfo } = parameter;
            const response = await fetch(`${api}/order/Dashboard/countNumberOrder`, {
                headers: {
                    Authorization: `Bearer ${userinfo?.accessToken}`
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
);

export const reviewDashboard = createAsyncThunk(
    'review/ReviewDashboard',
    async (parameter) => {
        try {
            let { userinfo } = parameter;
            const response = await fetch(`${api}/Reviews/Dashboard/countNumberReviews`, {
                headers: {
                    Authorization: `Bearer ${userinfo?.accessToken}`
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
);

const countSlice = createSlice({
    name: 'count',
    initialState: {
        userCount: 0,
        productCount: 0,
        orderCount: 0,
        reviewCount: 0,
        loadingUser: false,
        loadingProduct: false,
        loadingOrder: false,
        loadingReview: false,
        isCountLogin: true,
        errorMessage: ''
    },
    reducers: {
        Reset: (state, action) => {
            let data = action?.payload;
            if (data?.product !== undefined) state.product = data?.product;
            if (data?.prev !== undefined) state.prev = data?.prev;
            if (data?.next !== undefined) state.next = data?.next;
            if (data?.searchvalue !== undefined) state.searchvalue = data?.searchvalue;
            if (data?.LowerLimit !== undefined) state.LowerLimit = data?.LowerLimit;
            if (data?.UpperLimit !== undefined) state.UpperLimit = data?.UpperLimit;
            if (data?.productLoading !== undefined) state.productLoading = data?.productLoading;
            if (data?.isProductLogin !== undefined) state.isProductLogin = data?.isProductLogin;
            if (data?.error !== undefined) state.error = data?.error;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userDashboard.pending, (state) => {
                state.loadingUser = true;
                state.errorMessage = null;
            })
            .addCase(userDashboard.fulfilled, (state, action) => {
                state.loadingUser = false;
                state.errorMessage = null;
                const data = action.payload.data;
                if (action.payload.statusCode === 200) {
                    state.userCount = data
                } else if (action.payload.statusCode === 498) {
                    state.isCountLogin = false;
                }
            })
            .addCase(userDashboard.rejected, (state, action) => {
                state.loadingUser = false;
                state.errorMessage = action.error.message;
            })

            .addCase(productDashboard.pending, (state) => {
                state.loadingProduct = true;
                state.errorMessage = null;
            })
            .addCase(productDashboard.fulfilled, (state, action) => {
                state.loadingProduct = false;
                state.errorMessage = null;
                const data = action.payload.data;
                if (action.payload.statusCode === 200) {
                    state.productCount = data
                } else if (action.payload.statusCode === 498) {
                    state.isCountLogin = false;
                }
            })
            .addCase(productDashboard.rejected, (state, action) => {
                state.loadingProduct = false;
                state.errorMessage = action.error.message;
            })

            .addCase(orderDashboard.pending, (state) => {
                state.loadingOrder = true;
                state.errorMessage = null;
            })
            .addCase(orderDashboard.fulfilled, (state, action) => {
                state.loadingOrder = false;
                state.errorMessage = null;
                const data = action.payload.data;
                if (action.payload.statusCode === 200) {
                    state.orderCount = data
                } else if (action.payload.statusCode === 498) {
                    state.isCountLogin = false;
                }
            })
            .addCase(orderDashboard.rejected, (state, action) => {
                state.loadingOrder = false;
                state.errorMessage = action.error.message;
            })

            .addCase(reviewDashboard.pending, (state) => {
                state.loadingReview = true;
                state.errorMessage = null;
            })
            .addCase(reviewDashboard.fulfilled, (state, action) => {
                state.loadingReview = false;
                state.errorMessage = null;
                const data = action.payload.data;
                if (action.payload.statusCode === 200) {
                    state.reviewCount = data
                } else if (action.payload.statusCode === 498) {
                    state.isCountLogin = false;
                }
            })
            .addCase(reviewDashboard.rejected, (state, action) => {
                state.loadingReview = false;
                state.errorMessage = action.error.message;
            })

    }
});

export const countmethod = countSlice.actions;
const countReducer = countSlice.reducer;
export default countReducer;

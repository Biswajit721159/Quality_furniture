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
        clearALL: (state, action) => {
            state.userCount = 0;
            state.productCount = 0;
            state.orderCount = 0;
            state.reviewCount = 0;
            state.loadingUser = false;
            state.loadingProduct = false;
            state.loadingOrder = false;
            state.loadingReview = false;
            state.isCountLogin = true;
            state.errorMessage = '';
          },
          
        Reset: (state, action) => {
            let data = action?.payload;
            if (data?.userCount !== undefined) state.userCount = data?.userCount;
            if (data?.productCount !== undefined) state.productCount = data?.productCount;
            if (data?.orderCount !== undefined) state.orderCount = data?.orderCount;
            if (data?.reviewCount !== undefined) state.reviewCount = data?.reviewCount;
            if (data?.loadingUser !== undefined) state.loadingUser = data?.loadingUser;
            if (data?.loadingProduct !== undefined) state.loadingProduct = data?.loadingProduct;
            if (data?.loadingOrder !== undefined) state.loadingOrder = data?.loadingOrder;
            if (data?.loadingReview !== undefined) state.loadingReview = data?.loadingReview;
            if (data?.isCountLogin !== undefined) state.isCountLogin = data?.isCountLogin;
            if (data?.errorMessage !== undefined) state.errorMessage = data?.errorMessage;
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

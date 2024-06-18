import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const api = process.env.REACT_APP_API

export const loadReview = createAsyncThunk(
    'Order/loadReview',
    async (parameter) => {
        try {
            let { userinfo, LowerLimit, UpperLimit, product_id } = parameter
            let response = await fetch(`${api}/Reviews/${product_id}/${LowerLimit}/${UpperLimit}`, {
                headers: {
                    Authorization: `Bearer ${userinfo?.accessToken}`
                }
            })
            const data = await response.json();
            return { data: data, product_id: product_id };
        } catch (error) {
            throw error;
        }
    }
);

const initialState = {
    product_id: '',
    ProductReview: [],
    loadingReview: false,
    next: false,
    LowerLimit: 0,
    UpperLimit: 5,
    error: null,
    isReviewLogin: true
};

const ReviewSlice = createSlice({
    name: "Orderstore",
    initialState,
    reducers: {
        clearAll: (state, action) => {
            state.product_id = '';
            state.ProductReview = [];
            state.loadingReview = false;
            state.next = false;
            state.LowerLimit = 0;
            state.UpperLimit = 5;
            state.error = null;
            state.isReviewLogin = true;
        },
        clearOrder: (state, action) => {
            state.product_id = ''
            state.ProductReview = [];
            state.next = false;
            state.LowerLimit = 0;
            state.UpperLimit = 5;
            state.error = null;
        },
        setProductId: (state, action) => {
            state.product_id = action.payload.product_id
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadReview.pending, (state) => {
                state.loadingReview = true;
                state.error = null;
            })
            .addCase(loadReview.fulfilled, (state, action) => {
                state.loadingReview = false;
                let data = action?.payload?.data;
                state.product_id = action?.payload?.product_id
                if (data?.statusCode === 498) {
                    state.isReviewLogin = false;
                    return;
                }
                let n = data?.data?.length;
                data = data?.data;
                let newReview = data.slice(0, n - 1);
                state.ProductReview = [...state.ProductReview, ...newReview];
                state.prev = data?.[n - 1]?.prev;
                state.next = data?.[n - 1]?.next;
                state.LowerLimit += 5;
                state.UpperLimit += 5;
                state.error = null;
            })
            .addCase(loadReview.rejected, (state, action) => {
                state.loadingReview = false;
                state.error = action.error.message;
            })

    }
});


export const Reviewmethod = ReviewSlice.actions;
const ReviewReducer = ReviewSlice.reducer;
export default ReviewReducer;

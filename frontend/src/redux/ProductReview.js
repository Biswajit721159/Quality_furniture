import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const api = process.env.REACT_APP_API

export const loadReview = createAsyncThunk(
    'Review/loadReview',
    async (parameter) => {
        try {
            let { userinfo, LowerLimit, UpperLimit, product_id } = parameter
            let response = await fetch(`${api}/Reviews/${product_id}/${LowerLimit}/${UpperLimit}/${userinfo?.user?.email}`)
            const data = await response.json();
            return { data: data, product_id: product_id };
        } catch (error) {
            throw error;
        }
    }
);

export const updatelikeAnddisLike = createAsyncThunk(
    'Review/updatelikeAnddisLike',
    async (parameter) => {
        try {
            let { userinfo, review_id, option } = parameter
            let response = await fetch(`${api}/Reviews/updateLikeAndDisLike/${review_id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userinfo?.accessToken}`
                },
                body: JSON.stringify({
                    option: option
                })
            })
            const data = await response.json();
            return data;
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
    isReviewLogin: true,
    updateLikeAndDisLike: false,
    review_id: '',
};



const ReviewSlice = createSlice({
    name: "Orderstore",
    initialState,
    reducers: {
        setReviewid: (state, action) => {
            state.review_id = action.payload
        },
        clearAll: (state, action) => {
            state.product_id = '';
            state.ProductReview = [];
            state.loadingReview = false;
            state.next = false;
            state.LowerLimit = 0;
            state.UpperLimit = 5;
            state.error = null;
            state.isReviewLogin = true;
            state.updateLikeAndDisLike = false;
            state.review_id = '';
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
                } else if (data?.statusCode !== 200) {
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

            .addCase(updatelikeAnddisLike.pending, (state) => {
                state.updateLikeAndDisLike = true;
                state.error = null;
            })
            .addCase(updatelikeAnddisLike.fulfilled, (state, action) => {
                state.updateLikeAndDisLike = false;
                let data = action?.payload;
                if (data?.statusCode === 498) {
                    state.isReviewLogin = false;
                    return;
                }
                else if (data?.statusCode === 200) {
                    let newProductReview = state.ProductReview.map((item) => {
                        if (item._id === state.review_id) {
                            return data?.data
                        } else {
                            return item;
                        }
                    })
                    state.ProductReview = newProductReview
                }
            })
            .addCase(updatelikeAnddisLike.rejected, (state, action) => {
                state.updateLikeAndDisLike = false;
                state.error = action.error.message;
            })
    }
});


export const Reviewmethod = ReviewSlice.actions;
const ReviewReducer = ReviewSlice.reducer;
export default ReviewReducer;

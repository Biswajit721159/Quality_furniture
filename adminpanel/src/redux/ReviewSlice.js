import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const api = process.env.REACT_APP_API

export const loadReview = createAsyncThunk(
    'reviews/loadReview',
    async (parameter) => {
        try {
            let { LowerLimit, UpperLimit, userinfo, product_id } = parameter;
            const response = await fetch(`${api}/Reviews/Adninpanel/${LowerLimit}/${UpperLimit}/${product_id}`, {
                headers: {
                    Authorization: `Bearer ${userinfo?.accessToken}`
                },
            })
            const data = await response.json();
            return { data: data, product_id: product_id };
        } catch (error) {
            throw error;
        }
    }
);

export const updateReview = createAsyncThunk('Review/updateReview', async (parameter) => {
    try {
        let { formData, userinfo, review } = parameter
        const response = await fetch(`${api}/Reviews/AdminReviewUpdate/${formData?._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userinfo?.accessToken}`
            },
            body: JSON.stringify({
                review: review
            }),
        })
        const data = await response.json();
        return { data: data, formData: formData };
    } catch (error) {
        throw error
    }
})


const ReviewSlice = createSlice({
    name: 'Review',
    initialState: {
        product_id: '',
        Review: [],
        reviewLoading: false,
        error: '',
        prev: false,
        next: false,
        isReviewLogin: true,
        searchvalue: '',
        LowerLimit: 0,
        UpperLimit: 10,
        UpdatedReviewMessage: '',
        UpdatedReviewLoading: false
    },
    reducers: {
        clearALL: (state, action) => {
            state.product_id = '';
            state.Review = [];
            state.reviewLoading = false;
            state.error = '';
            state.prev = false;
            state.next = false;
            state.isReviewLogin = true;
            state.searchvalue = '';
            state.LowerLimit = 0;
            state.UpperLimit = 10;
            state.UpdatedReviewMessage = '';
            state.UpdatedReviewLoading = false;
          },
          
        setProductID: (state, action) => {
            state.product_id = action?.payload
        },
        setLimit: (state, action) => {
            state.LowerLimit = action.payload.LowerLimit
            state.UpperLimit = action.payload.UpperLimit
        },
        Reset: (state, action) => {
            const data = action?.payload;
            if (data?.Review !== undefined) state.Review = data?.Review;
            if (data?.prev !== undefined) state.prev = data?.prev;
            if (data?.next !== undefined) state.next = data?.next;
            if (data?.searchvalue !== undefined) state.searchvalue = data?.searchvalue;
            if (data?.LowerLimit !== undefined) state.LowerLimit = data?.LowerLimit;
            if (data?.UpperLimit !== undefined) state.UpperLimit = data?.UpperLimit;
            if (data?.reviewLoading !== undefined) state.reviewLoading = data?.reviewLoading;
            if (data?.isReviewLogin !== undefined) state.isReviewLogin = data?.isReviewLogin;
            if (data?.error !== undefined) state.error = data?.error;
            if (data?.UpdatedReviewMessage !== undefined) state.UpdatedReviewMessage = data?.UpdatedReviewMessage;
            if (data?.UpdatedReviewLoading !== undefined) state.UpdatedReviewLoading = data?.UpdatedReviewLoading;
            return state;
        },
        setUpdatedOrderMessage: (state, action) => {
            state.UpdatedReviewMessage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadReview.pending, (state) => {
                state.reviewLoading = true
                state.error = null;
            })
            .addCase(loadReview.fulfilled, (state, action) => {
                state.reviewLoading = false;
                state.error = null;
                let data = action?.payload?.data?.data;
                if (action?.payload?.data?.statusCode === 200) {
                    const n = data.length;
                    state.prev = data[n - 1]?.prev;
                    state.next = data[n - 1]?.next;
                    if (state.LowerLimit === 0) {
                        state.Review = []
                    }
                    let newReview_ids = data?.slice?.(0, n - 1);
                    let Review_ids = state?.Review?.map((data) => {
                        return data?._id;
                    })
                    let flag = true
                    let filterReview_ids = newReview_ids?.filter((data) => {
                        if (Review_ids?.includes(data?._id) === false) return data;
                        else flag = false
                    })
                    state.Review = [...state.Review, ...filterReview_ids];
                    if (flag) {
                        state.LowerLimit += 10;
                        state.UpperLimit += 10;
                    }
                    state.product_id = action.payload?.product_id
                }
                else if (action?.payload?.data?.statusCode === 498) {
                    state.isReviewLogin = false
                }
            })
            .addCase(loadReview.rejected, (state, action) => {
                state.reviewLoading = false;
                state.error = action.error.message;
            })

            .addCase(updateReview.pending, (state) => {
                state.UpdatedReviewLoading = true
                state.UpdatedReviewMessage = null;
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                state.UpdatedReviewLoading = false;
                state.UpdatedReviewMessage = null;
                let data = action?.payload?.data
                let formData = action?.payload?.formData

                if (action?.payload?.data?.statusCode === 200) {
                    let Review = state.Review
                    let UpdatedOrder = Review?.map((Data) => {
                        if (Data?._id === formData?._id) {
                            Data.review = formData?.review
                            return Data
                        } else {
                            return Data
                        }
                    })
                    state.Review = UpdatedOrder
                    state.UpdatedReviewMessage = data?.message
                }
                else if (action?.payload?.data?.statusCode === 498) {
                    state.isReviewLogin = false
                }
            })
            .addCase(updateReview.rejected, (state, action) => {
                state.UpdatedReviewLoading = false;
                state.UpdatedReviewMessage = action.error.message;
            })
    }
})


export const Reviewmethod = ReviewSlice.actions
const ReviewReducer = ReviewSlice.reducer
export default ReviewReducer
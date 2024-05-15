import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const api = process.env.REACT_APP_API

export const loadTopproduct = createAsyncThunk(
    'product/loadTopproduct',
    async () => {
        try {
            let responce = await fetch(`${api}/product/TopOfferProduct/${10}`)
            let data = await responce.json()
            return data.data;
        } catch (error) {
            throw error;
        }
    }
);

export const loadTopOfferProduct = createAsyncThunk('product/loadTopOfferProduct', async () => {
    try {
        let responce = await fetch(`${api}/product/getproductByType/Door`)
        let data = await responce.json()
        return data?.data
    } catch (error) {
        throw error;
    }
})



const initialState = {
    loadTopproduct: null,
    loadTopOfferProduct: null
};

const FrontPageProductSlice = createSlice({
    name: "FrontPageProduct",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(loadTopproduct.fulfilled, (state, action) => {
                state.loadTopproduct = action?.payload
            })
            .addCase(loadTopOfferProduct.fulfilled, (state, action) => {
                state.loadTopOfferProduct = action?.payload;
            })
    }
});


export const FrontPageProductSlicemethod = FrontPageProductSlice.actions;
const FrontPageProductSliceReducer = FrontPageProductSlice.reducer;
export default FrontPageProductSliceReducer;

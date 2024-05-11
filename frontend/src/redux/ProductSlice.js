import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const api = process.env.REACT_APP_API;


export const loadProduct = createAsyncThunk(
    'product/loadProduct',
    async (parameter) => {
        try {

            let lowprice = parameter.lowprice
            let highprice = parameter.highprice
            let selectcatagory = parameter.selectcatagory
            let searchproduct = parameter.searchInput
            let lowerLimit = parameter.lowerLimit
            let higherLimit = parameter.higherLimit
            let userinfo = parameter.userinfo

            if (searchproduct == null || searchproduct.length == 0) searchproduct = "none";
            const response = await fetch(`${api}/product/getproductUponPriceProductTypeAndProductName/${lowprice}/${highprice}/${selectcatagory}/${searchproduct}/${lowerLimit}/${higherLimit}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userinfo.accessToken}`
                },
                body: JSON.stringify({
                    'email': userinfo?.user?.email,
                })
            })
            const data = await response.json();
            return data.data;
        } catch (error) {
            throw error;
        }
    }
);

export const AddToWishList = createAsyncThunk(
    'product/AddToWishList',
    async (parameter) => {
        try {
            let userinfo = parameter.userinfo
            let product_id = parameter.product_id
            let response = await fetch(`${api}/wishlist/AddFavouriteJourney/${product_id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${userinfo.accessToken}`
                },
            })
            const data = await response.json();
            return { data, product_id }
        } catch (error) {
            throw error;
        }
    }
);

export const RemoveToWishList = createAsyncThunk(
    'product/RemoveToWishList',
    async (parameter) => {
        try {
            let userinfo = parameter.userinfo
            let product_id = parameter.product_id
            let response = await fetch(`${api}/wishlist/RemoveFavouriteJourney/${product_id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${userinfo.accessToken}`
                },
            })
            const data = await response.json();
            return { data, product_id }
        } catch (error) {
            throw error;
        }
    }
);

const initialState = {
    product: [],
    allproduct: [],
    Catagory: [],
    lowerLimit: 0,
    higherLimit: 15,
    lowprice: 0,
    highprice: 1000000,
    selectcatagory: 'ALL',
    searchproduct: '',
    previous_page: false,
    next_page: false,
    loadingproduct: false,
    wishlistloader: false,
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        AddEveryThing: (state, action) => {
            let data = action.payload
            state.lowerLimit = data.lowerLimit
            state.higherLimit = data.higherLimit
        },
        Addsearch: (state, action) => {
            state.searchinput = action?.payload?.searchinput
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadProduct.pending, (state) => {
                state.loadingproduct = true;
                state.error = null;
            })
            .addCase(loadProduct.fulfilled, (state, action) => {
                state.loadingproduct = false;
                let n = action.payload.length;
                let data = action.payload
                if (n) {
                    state.previous_page = data[n - 1].prev;
                    state.next_page = data[n - 1].next;
                }
                state.product = data.slice(0, n - 1);
                state.allproduct = data.slice(0, n - 1);
                state.error = null
            })
            .addCase(loadProduct.rejected, (state, action) => {
                state.loadingproduct = false;
                state.error = action.error.message;
            })
            .addCase(AddToWishList.pending, (state) => {
                state.wishlistloader = true
                state.error = null;
            })
            .addCase(AddToWishList.fulfilled, (state, action) => {
                state.wishlistloader = false;
                state.error = null
                let data = action.payload.data
                let product_id = action.payload.product_id
                if (data.statusCode === 201) {
                    let product = state.product
                    let allproduct = state.allproduct
                    product.forEach(element => {
                        if (product_id === element._id) {
                            element.islove = true
                        }
                    });
                    allproduct.forEach(element => {
                        if (product_id === element._id) {
                            element.islove = true
                        }
                    });
                    state.product = product
                    state.allproduct = allproduct
                }
            })
            .addCase(AddToWishList.rejected, (state, action) => {
                state.wishlistloader = false;
                state.error = action.error.message;
            })
            .addCase(RemoveToWishList.pending, (state) => {
                state.wishlistloader = true
                state.error = null;
            })
            .addCase(RemoveToWishList.fulfilled, (state, action) => {
                state.wishlistloader = false;
                state.error = null
                let data = action.payload.data
                let product_id = action.payload.product_id
                if (data.statusCode === 200) {
                    let product = state.product
                    let allproduct = state.allproduct
                    product.forEach(element => {
                        if (product_id === element._id) {
                            element.islove = false
                        }
                    });
                    allproduct.forEach(element => {
                        if (product_id === element._id) {
                            element.islove = false
                        }
                    });
                    state.product = product
                    state.allproduct = allproduct
                }
            })
            .addCase(RemoveToWishList.rejected, (state, action) => {
                state.wishlistloader = false;
                state.error = action.error.message;
            })
    }
})

export const productmethod = productSlice.actions;
export default productSlice.reducer;
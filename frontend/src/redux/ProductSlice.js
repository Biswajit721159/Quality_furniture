import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const api = process.env.REACT_APP_API;

async function findProduct(parameter) {
    let lowprice = parameter.lowprice
    let highprice = parameter.highprice
    let selectcatagory = parameter.selectcatagory
    let searchproduct = parameter.searchInput
    let lowerLimit = parameter.lowerLimit
    let higherLimit = parameter.higherLimit
    let userinfo = parameter.userinfo
    if (searchproduct === null || searchproduct?.length === 0 || searchproduct === undefined) searchproduct = "none";

    const response = await fetch(`${api}/product/getproductUponPriceProductTypeAndProductName/${lowprice}/${highprice}/${selectcatagory}/${searchproduct}/${lowerLimit}/${higherLimit}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userinfo?.user?.email,
        })
    })
    const data = await response.json();
    return data;
}

export const loadProduct = createAsyncThunk(
    'product/loadProduct',
    async (parameter) => {
        try {
            let data = await findProduct(parameter)
            return data;
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
            let response = await fetch(`${api}/wishlist/AddFavourite/${product_id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${userinfo?.accessToken}`
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
            let response = await fetch(`${api}/wishlist/RemoveFavourite/${product_id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${userinfo?.accessToken}`
                },
            })
            const data = await response.json();
            return { data, product_id }
        } catch (error) {
            throw error;
        }
    }
);

export const LoadCatagory = createAsyncThunk(
    'product/LoadCatagory',
    async (parameter) => {
        try {
            let response = await fetch(`${api}/product/Catagory/getallCatagory`)
            const data = await response.json();
            return data
        } catch (error) {
            throw error;
        }
    }
);

export const searchProduct = createAsyncThunk(
    'product/searchProduct',
    async (parameter) => {
        try {
            let data = await findProduct(parameter)
            return data
        } catch (error) {
            throw error
        }
    }
)

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
    catagoryloader: false,
    isProductLogedin: true,
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setCatagory: (state, action) => {
            state.selectcatagory = action.payload;
        },
        clearSearch: (state, action) => {
            state.searchproduct = action.payload
        },
        setLimit: (state) => {
            state.lowerLimit = 0;
            state.higherLimit = 15;
        },
        clearAll: (state) => {
            state.product = [];
            state.allproduct = [];
            state.Catagory = [];
            state.lowerLimit = 0;
            state.higherLimit = 15;
            state.lowprice = 0;
            state.highprice = 1000000;
            state.selectcatagory = 'ALL';
            state.searchproduct = '';
            state.previous_page = false;
            state.next_page = false;
            state.loadingproduct = false;
            state.wishlistloader = false;
            state.catagoryloader = false;
            state.isProductLogedin = true;
            state.error = null;
        },
        AddEveryThing: (state, action) => {
            let data = action.payload
            state.lowerLimit = data.lowerLimit
            state.higherLimit = data.higherLimit
        },
        Addsearch: (state, action) => {
            let searchinput = action?.payload?.searchinput
            let allproduct = action?.payload?.allproduct
            state.searchinput = searchinput
            state.product = allproduct
        },
        setSearchProduct: (state, action) => {
            state.searchproduct = action.payload.searchproduct
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(loadProduct.pending, (state) => {
                state.loadingproduct = true;
                state.error = null;
            })
            .addCase(loadProduct.fulfilled, (state, action) => {
                state.loadingproduct = false;
                let n = action?.payload?.data?.length;
                let data = action?.payload?.data;
                if (action?.payload?.statusCode === 498) {
                    state.isProductLogedin = false
                    return;
                }
                else if (action?.payload?.statusCode === 200) {
                    state.previous_page = data?.[n - 1]?.prev === undefined ? false : data?.[n - 1]?.prev;
                    state.next_page = data?.[n - 1]?.next === undefined ? false : data?.[n - 1]?.next;
                    data = data?.slice?.(0, n - 1)
                    let oldproduct = state.product
                    let oldproductids = oldproduct?.map((item) => {
                        return item._id;
                    })
                    let newproduct = data?.filter((item) => {
                        if (oldproductids?.includes(item._id) === false) {
                            return item;
                        }
                    })
                    state.product = [...state.product, ...newproduct];
                    state.allproduct = [...state.product, ...newproduct];
                }
                state.error = null
            })
            .addCase(loadProduct.rejected, (state, action) => {
                state.loadingproduct = false;
                state.error = action.error.message;
                state.isProductLogedin = false
            })

            .addCase(searchProduct.pending, (state) => {
                state.loadingproduct = true;
                state.error = null;
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.loadingproduct = false;
                let n = action?.payload?.data?.length;
                let data = action?.payload?.data
                if (action?.payload?.statusCode === 498) {
                    state.isProductLogedin = false
                    return;
                }
                else if (action?.payload?.statusCode === 200) {
                    if (n) {
                        state.previous_page = data?.[n - 1]?.prev;
                        state.next_page = data?.[n - 1]?.next;
                    }
                    data = data?.slice?.(0, n - 1)
                    state.product = data;
                    state.allproduct = data;
                }
                state.error = null;
            })
            .addCase(searchProduct.rejected, (state, action) => {
                state.loadingproduct = false;
                state.error = action.error.message;
                state.isProductLogedin = false
            })


            .addCase(AddToWishList.pending, (state) => {
                state.wishlistloader = true
                state.error = null;
            })
            .addCase(AddToWishList.fulfilled, (state, action) => {
                state.wishlistloader = false;
                state.error = null
                let data = action?.payload?.data
                let product_id = action?.payload?.product_id
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
                else if (data.statusCode === 498) {
                    state.isProductLogedin = false
                    return;
                }
            })
            .addCase(AddToWishList.rejected, (state, action) => {
                state.wishlistloader = false;
                state.error = action.error.message;
                state.isProductLogedin = false
            })


            .addCase(RemoveToWishList.pending, (state) => {
                state.wishlistloader = true
                state.error = null;
            })
            .addCase(RemoveToWishList.fulfilled, (state, action) => {
                state.wishlistloader = false;
                state.error = null
                let data = action?.payload?.data
                let product_id = action?.payload?.product_id
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
                else if (data.statusCode === 498) {
                    state.isProductLogedin = false
                }

            })
            .addCase(RemoveToWishList.rejected, (state, action) => {
                state.wishlistloader = false;
                state.error = action.error.message;
                state.isProductLogedin = false
            })


            .addCase(LoadCatagory.pending, (state) => {
                state.catagoryloader = true
                state.error = null;
            })
            .addCase(LoadCatagory.fulfilled, (state, action) => {
                state.catagoryloader = false;
                state.error = null
                let data = action?.payload?.data
                if (action?.payload?.statusCode === 200) {
                    state.Catagory = data
                }
            })
            .addCase(LoadCatagory.rejected, (state, action) => {
                state.catagoryloader = false;
                state.error = action.error.message;
            })
    }
})

export const productmethod = productSlice.actions;
export default productSlice.reducer;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { LoadCatagory, productmethod, searchProduct } from "../redux/ProductSlice";

const Catagory = () => {
    const dispatch = useDispatch()
    const userinfo = useSelector((state) => state?.user)?.user
    const { Catagory: categoryList, lowprice, highprice } = useSelector((state) => state.product)

    useEffect(() => {
        if (categoryList?.length === 0 || !categoryList)
            dispatch(LoadCatagory())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function GoToProduct(selectcatagory) {
        dispatch(productmethod.setCatagory(selectcatagory))
        dispatch(productmethod.setLimit({ lowerLimit: 0, higherLimit: 15 }));
        dispatch(productmethod.clearSearch(''))
        dispatch(searchProduct({ lowprice, highprice, selectcatagory: selectcatagory, searchInput: '', lowerLimit: 0, higherLimit: 15, userinfo }))
    }

    if (!categoryList || categoryList.length === 0) return null;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-stone-800">Shop by Category</h2>
                <Link to="/Product" className="text-sm font-semibold text-brand hover:text-brand-light transition-colors hover:underline">
                    View All →
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categoryList.map((data, ind) => (
                    <Link
                        to={'/Product'}
                        key={ind}
                        onClick={() => GoToProduct(data?.product_type)}
                        className="group block"
                    >
                        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-stone-100 overflow-hidden text-center h-full flex flex-col p-3 pb-4">
                            {/* Circle Image Wrapper */}
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-stone-50 border-4 border-stone-50 group-hover:border-amber-100 transition-colors mb-3">
                                <img
                                    src={data?.firstImage}
                                    alt={data?.product_type}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            
                            <h3 className="text-sm font-bold text-stone-700 group-hover:text-brand transition-colors">
                                {data?.product_type}
                            </h3>
                            <p className="text-[10px] uppercase tracking-wider font-semibold text-stone-400 mt-1">
                                {data?.count} items
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default Catagory;
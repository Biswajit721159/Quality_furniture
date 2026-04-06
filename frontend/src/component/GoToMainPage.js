import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct, productmethod } from "../redux/ProductSlice";
import { IoMdRefresh } from "react-icons/io";

const GoToMainPage = () => {
    const userinfo = useSelector((state) => state?.user)?.user
    const dispatch = useDispatch()
    let { allproduct, lowerLimit, higherLimit, lowprice, highprice, selectcatagory } = useSelector((state) => state?.product)

    function backTOHome() {
        dispatch(productmethod.setSearchProduct({ searchproduct: '' }))
        if (allproduct?.length === 0) {
            dispatch(loadProduct({ lowprice, highprice, selectcatagory, searchproduct: '', lowerLimit, higherLimit, userinfo }))
        }
        else dispatch(productmethod.Addsearch({ searchinput: '', allproduct }));
    }

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-stone-800 mb-2">No Products Found</h2>
            <p className="text-stone-500 text-sm mb-6 text-center max-w-sm">
                We couldn't find any products matching your current filters or search term.
            </p>
            <button
                onClick={backTOHome}
                className="flex items-center gap-2 px-6 py-2.5 bg-stone-800 text-white font-semibold rounded-xl hover:bg-stone-700 transition-all shadow-md"
            >
                <IoMdRefresh size={18} />
                Clear Filters & Refresh
            </button>
        </div>
    )
}
export default GoToMainPage
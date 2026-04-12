import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct, productmethod } from "../redux/ProductSlice";

const GoodToSee = () => {
    const userinfo = useSelector((state) => state?.user)?.user
    const dispatch = useDispatch()
    let { lowerLimit, higherLimit, lowprice, highprice, selectcatagory } = useSelector((state) => state?.product)

    function backTOHome() {
        dispatch(productmethod.setSearchProduct({ searchproduct: '' }))
        dispatch(loadProduct({ lowprice, highprice, selectcatagory, searchproduct: '', lowerLimit, higherLimit, userinfo }))
    }

    return (
        <div className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <span className="text-sm font-medium text-stone-600">Great to see you here! Have a look around.</span>
            </div>
            <button
                onClick={backTOHome}
                className="text-sm font-semibold text-brand hover:text-brand-light hover:underline transition-colors"
            >
                Refresh View
            </button>
        </div>
    )
}
export default GoodToSee
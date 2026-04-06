import React from 'react'
import { PulseLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux'
import { searchProduct, productmethod } from '../redux/ProductSlice'

const Filter = () => {
    const dispatch = useDispatch()
    const userinfo = useSelector((state) => state?.user)?.user

    const { Catagory, lowprice, highprice, selectcatagory, searchproduct, loadingproduct } = useSelector((state) => state?.product)

    function handlePriceFilter(lp, hp) {
        dispatch(productmethod.setPriceRange({ lowprice: lp, highprice: hp }))
        dispatch(productmethod.AddEveryThing({ lowerLimit: 0, higherLimit: 15 }))
        dispatch(searchProduct({ lowprice: lp, highprice: hp, selectcatagory, searchInput: searchproduct, lowerLimit: 0, higherLimit: 15, userinfo }))
    }

    function clearPrice() {
        handlePriceFilter(0, 1000000);
    }

    function handleCategoryFilter(cat) {
        dispatch(productmethod.setCatagory(cat))
        dispatch(productmethod.AddEveryThing({ lowerLimit: 0, higherLimit: 15 }))
        dispatch(searchProduct({ lowprice, highprice, selectcatagory: cat, searchInput: searchproduct, lowerLimit: 0, higherLimit: 15, userinfo }))
    }

    function clearCategory() {
        handleCategoryFilter('ALL');
    }

    const radioClass = "accent-amber-700 w-4 h-4 cursor-pointer mt-0.5";
    const labelClass = "text-sm text-stone-600 cursor-pointer hover:text-stone-900 transition-colors leading-tight";
    const activeLabel = "text-sm text-amber-700 font-semibold cursor-pointer leading-tight";

    const priceRanges = [
        { label: 'Under ₹1,000', lp: 0, hp: 1000 },
        { label: '₹1,000 – ₹2,000', lp: 1000, hp: 2000 },
        { label: '₹2,000 – ₹3,000', lp: 2000, hp: 3000 },
        { label: '₹3,000 – ₹4,000', lp: 3000, hp: 4000 },
        { label: 'Over ₹4,000', lp: 4000, hp: 1000000 }
    ];

    return (
        <div className="w-full">
            {loadingproduct && !Catagory?.length ? (
                <div className="flex justify-center py-6">
                    <PulseLoader color="#7C4B2A" size={10} />
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    <div>
                        <h2 className="text-lg font-bold text-stone-800 mb-0">Filters</h2>
                    </div>

                    {/* Price Range */}
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-bold text-stone-700 uppercase tracking-wide">Price</p>
                            {(lowprice !== 0 || highprice !== 1000000) && (
                                <button onClick={clearPrice} className="text-xs text-amber-700 hover:text-amber-800 font-medium tracking-wide underline underline-offset-2">Clear</button>
                            )}
                        </div>
                        <div className="flex flex-col gap-2.5">
                            {priceRanges.map(({ label, lp, hp }) => {
                                const isChecked = lowprice === lp && highprice === hp;
                                return (
                                    <label key={label} className="flex items-start gap-3 group cursor-pointer">
                                        <input
                                            type="radio"
                                            name="price"
                                            className={radioClass}
                                            checked={isChecked}
                                            onChange={() => handlePriceFilter(lp, hp)}
                                        />
                                        <span className={isChecked ? activeLabel : labelClass}>{label}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <hr className="border-stone-200" />

                    {/* Category */}
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-bold text-stone-700 uppercase tracking-wide">Category</p>
                            {selectcatagory !== "ALL" && (
                                <button onClick={clearCategory} className="text-xs text-amber-700 hover:text-amber-800 font-medium tracking-wide underline underline-offset-2">Clear</button>
                            )}
                        </div>
                        <div className="flex flex-col gap-2.5 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            <label className="flex items-start gap-3 group cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="category"
                                    className={radioClass} 
                                    checked={selectcatagory === 'ALL'} 
                                    onChange={() => handleCategoryFilter('ALL')} 
                                />
                                <span className={selectcatagory === 'ALL' ? activeLabel : labelClass}>All Categories</span>
                            </label>
                            {Catagory && Catagory?.map((item, ind) => (
                                <label key={ind} className="flex items-start gap-3 group cursor-pointer">
                                    <input
                                        type="radio"
                                        name="category"
                                        className={radioClass}
                                        checked={item.product_type === selectcatagory}
                                        onChange={() => handleCategoryFilter(item.product_type)}
                                    />
                                    <span className={item.product_type === selectcatagory ? activeLabel : labelClass}>{item.product_type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Filter
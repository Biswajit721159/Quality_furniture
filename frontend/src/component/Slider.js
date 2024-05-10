import React, { useState, useEffect } from "react";
import CardMedia from '@mui/material/CardMedia';
const Slider = (data) => {

    const [imageindex, setimageindex] = useState(0)
    let item = data.data
    useEffect(() => {
        let id = setInterval(() => {
            setimageindex((imageindex + 1) % item.length)
        }, 800)
        return () => clearInterval(id)
    }, [imageindex])
    return (
        <>
            {
                item.map((data, index) => (
                    <>
                        {index == imageindex && <CardMedia key={index} component="img"
                            height="194"
                            image={data}
                            alt="wait" />}
                    </>
                ))
            }
        </>
    )
}

export default Slider
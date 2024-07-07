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
                    <div key={index}>
                        {index == imageindex &&
                            <CardMedia component="img"
                                height="194"
                                image={data}
                                alt="wait"
                                style={{ marginTop: '2px' }}
                            />
                        }
                    </div>
                ))
            }
        </>
    )
}

export default Slider
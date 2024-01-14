import React,{useState,useEffect} from "react";

const Slider =(data)=>{

    const [imageindex,setimageindex]=useState(0)
    let item=data.data
    useEffect(()=>{
        let id=setInterval(()=>{
            setimageindex((imageindex+1)%item.length)
        },800)
        return ()=>clearInterval(id)
    },[imageindex])
    return(
        <>
        {
            item.map((data,index)=>(
            <>
                {index==imageindex && <img key={index} className="card-img-top" src={data}  alt="Card image cap"/>}
            </>
            ))
        }
        </>
    )
}

export default Slider
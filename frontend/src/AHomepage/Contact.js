import React from "react";
import '../css/Contact.css'
const Contact=()=>{
    return(
        <section className="order" id="order">

            <h3 className="sub-heading"> Message Us</h3>

            <form >

                <div className="inputBox">
                    <div className="input">
                        <span>your name</span>
                        <input type="text" placeholder="enter your name"/>
                    </div>
                    <div className="input">
                        <span>your number</span>
                        <input type="number" placeholder="enter your number"/>
                    </div>
                </div>
                <div className="inputBox">
                    <div className="input">
                        <span>your order</span>
                        <input type="text" placeholder="enter food name"/>
                    </div>
                    <div className="input">
                        <span>additional food</span>
                        <input type="test" placeholder="extra with food"/>
                    </div>
                </div>
                <div className="inputBox">
                    <div className="input">
                        <span>your address</span>
                        <textarea name="" placeholder="enter your address" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div className="input">
                        <span>your message</span>
                        <textarea name="" placeholder="enter your message" id="" cols="30" rows="10"></textarea>
                    </div>
                </div>

                <input type="submit" value="order now" className="btn"/>

            </form>
        
        </section>
    )
}

export default Contact
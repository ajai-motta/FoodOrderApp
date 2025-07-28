import { formmater } from "../utils/formmater";
import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CardContext.jsx";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import userProgressContext from "../store/UserProgressContext.jsx";

export default function CheckOut({}){
    const cartCtx=useContext(CartContext);
    const userContext=useContext(userProgressContext);
    const cartTotal=cartCtx.items.reduce((totalprice,item)=>{
        return totalprice+ item.price *item.quantity
    },0)
    function handleCloseCheckout(){
        userContext.hideCheckout();
    }
    function handleSubmit(event){
        event.preventDefault()
        const eventData=new FormData(event.target);
        const consumerData=Object.fromEntries(eventData.entries());
        fetch('http://localhost:3000/orders',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({
               order: {

                    items: cartCtx.items,
                    customer: consumerData
                }
            })
        })

    }
    return <Modal open={userContext.progress==='checkout'} onClose={handleCloseCheckout}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {formmater.format(cartTotal)}</p>
            <Input label="Full name" type='text' id="name" />
            <Input label="E-mail Address" type='email' id="email"/>
            <Input label="Street" type='text' id="street"/>
            <div className="control-row">
                <Input label="Postal Code" type='text' id="postal-code"/>
                <Input label="City" type='text' id="city"/>
            </div>
            <p className="model-actions">
                <Button type="button" onText onClick={handleCloseCheckout} isCart={false}>Close</Button>
                <Button isCart={false}>Submit Order</Button>
            </p>

        </form>
    </Modal>
}
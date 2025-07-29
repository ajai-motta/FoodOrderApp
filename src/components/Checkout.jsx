import { formmater } from "../utils/formmater";
import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CardContext.jsx";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import userProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "./hooks/useHttp.js";
import Error from "./UI/Error.jsx";
const requestConfig={
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    }
}
export default function CheckOut({}){
    const cartCtx=useContext(CartContext);
    const userContext=useContext(userProgressContext);
    const { data,error,isLoading: isSending,sendRequest}=useHttp('http://localhost:3000/orders',requestConfig)
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
        sendRequest(JSON.stringify({
               order: {

                    items: cartCtx.items,
                    customer: consumerData
                }
            }))


        

    }
    let actions=(<>
                 <Button type="button" onText onClick={handleCloseCheckout} isCart={false}>Close</Button>
                <Button isCart={false}>Submit Order</Button>
                </>)

    if(isSending){
        actions=<span>Order is being submited....</span>
    }
    if(data){
        return <Modal open={userContext.progress==='checkout'} onClose={handleCloseCheckout}>
            <h2>Success</h2>
            <p>We will get back to you in the following minutes</p>
            <p className="modal-actions">
                <Button onClose={handleCloseCheckout}>Okay</Button>
            </p>
        </Modal>
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
            {error && <Error title="An Error Occurred!" message={error} />}
            <p className="modal-actions">
                {actions}
            </p>

        </form>
    </Modal>
}
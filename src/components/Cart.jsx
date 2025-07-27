import Modal from "./UI/Modal";
import { useContext } from 'react';
import CartContext from '../store/CardContext';
import {formmater} from '../utils/formmater';
import Button from "./UI/Button";
import userProgressContext from '../store/UserProgressContext';
import CartItem from "./CartItem";
export default function Cart(){
    const cartCtx=useContext(CartContext);
    const userContext=useContext(userProgressContext);
    const cartTotal=cartCtx.items.reduce((totalprice,item)=>{
        return totalprice+ item.price *item.quantity
    },0)
    function handleCloseCart(){
        userContext.hideCart();
    }
    return <Modal className="cart" open={userContext.progress==='cart'} onClose={userContext.progress==='cart'?handleCloseCart:null}>
        <h2>Your Cart</h2>
        
        <ul>
            {cartCtx.items.map((item)=>{
                return <CartItem key={item.id}
                 name={item.name} 
                 id={item.id}
                 quantity={item.quantity} 
                 price={item.price}
                 removeItem={()=>cartCtx.removeItem(item.id)}
                 addItem={()=>cartCtx.addItem(item)}
                 />
            })}
        </ul>
        <p className="cart-total">{formmater.format(cartTotal)}</p>
        <p className="model-actions">
            <Button onText isCart={false} onClick={handleCloseCart}>Close</Button>
            {cartCtx.items.length >0 && <Button isCart={false} onClick={()=>userContext.showCheckout()}>Procceed To CheckOut</Button>}
        </p>
    </Modal>
}
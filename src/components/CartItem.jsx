import { formmater } from "../utils/formmater";

export default function CartItem({ id,name,quantity,price,removeItem,addItem }) {
return <li className="cart-item">
        
    <p>  
    {name} -{quantity} X {formmater.format(price)}
    </p>
    <p className="cart-item-actions">
        <button onClick={removeItem}>-</button>
        <span>{quantity}</span>
        <button onClick={addItem}>+</button>
    </p>
</li>
}
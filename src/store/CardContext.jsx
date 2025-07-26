import { createContext,useReducer } from "react";
 const CartContext=createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
})
function CartContextReducer(state,action){
    if(action.type==='ADD_ITEM'){
        const existingItemIndex=state.items.findIndex((item)=>{
            return item.id===action.item.id;
        })
        const updatedItems=[...state.items]
        if(existingItemIndex>-1){
             const existingItem=state.items[existingItemIndex];
             const updatedItem={...existingItem, quanity: existingItem.quanity+1}
             updatedItems[existingItemIndex]=updatedItem;
        }
        else{
            updatedItems.push({...action.item,quanity:1});
        }
        return {...state,items: updatedItems}
    }
    if(action.type==='REMOVE_ITEM'){
        const existingItemIndex=state.items.findIndex((item)=>{
            return item.id===action.id;
        })
        const existingCartItem=state.items[existingItemIndex];
        const updatedItems=[...state.items];
        if(existingCartItem.quanity===1){
            updatedItems.splice(existingItemIndex,1)
        } 
        else{
            const updatedItem={...existingCartItem, quanity: existingCartItem.quanity-1}
            updatedItems[existingItemIndex]=updatedItem;
        }
         return {...state,items: updatedItems}
    }
    return state
}
export function CartContextProvider({children}) {
    const [cart,dispatchAction]=useReducer(CartContextReducer,{items:[]});
    function addItem(item){
        dispatchAction({type: 'ADD_ITEM',item})
    }
    function removeItem(id){
        dispatchAction({type:'REMOVE_ITEM', id})
    }
    const cartcontext={items: cart.items,addItem,removeItem};
    console.log(cartcontext)

    return <CartContext value={cartcontext}>{children}</CartContext>
}
export default CartContext;
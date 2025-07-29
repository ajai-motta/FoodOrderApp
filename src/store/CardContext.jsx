import { createContext,useReducer } from "react";
 const CartContext=createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: ()=>{},
})
function CartContextReducer(state,action){
    if(action.type==='ADD_ITEM'){
        const existingItemIndex=state.items.findIndex((item)=>{
            return item.id===action.item.id;
        })
        const updatedItems=[...state.items]
        if(existingItemIndex>-1){
             const existingItem=state.items[existingItemIndex];
             const updatedItem={...existingItem, quantity: existingItem.quantity+1}
             updatedItems[existingItemIndex]=updatedItem;
        }
        else{
            updatedItems.push({...action.item,quantity:1});
        }
        return {...state,items: updatedItems}
    }
    if(action.type==='REMOVE_ITEM'){
        const existingItemIndex=state.items.findIndex((item)=>{
            return item.id===action.id;
        })
       
        const existingCartItem=state.items[existingItemIndex];
        const updatedItems=[...state.items];
       
        if(existingCartItem.quantity===1){
            updatedItems.splice(existingItemIndex,1)
        } 
        else{
            const updatedItem={...existingCartItem, quantity: existingCartItem.quantity-1}
            updatedItems[existingItemIndex]=updatedItem;
        }
         return {...state,items: updatedItems}
    }
    if(action.type==='CLEAR_CART'){
        return {...state,items:[]}
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
    
    function clearCart(){
        dispatchAction({type:'CLEAR_CART'})
    }
    const cartcontext={items: cart.items,addItem,removeItem,clearCart};
    return <CartContext.Provider value={cartcontext}>{children}</CartContext.Provider>
}
export default CartContext;
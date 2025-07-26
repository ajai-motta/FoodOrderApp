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
    if(action.type==='REMOVE_ITEM'){}
    return state
}
export function CartContextProvider({children}) {
    useReducer(CartContextReducer,{items:[]})
    return <CartContext>{children}</CartContext>
}
export default CartContext;
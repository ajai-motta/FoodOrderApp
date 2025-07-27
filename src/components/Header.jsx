import { useContext } from 'react';
import CartContext from '../store/CardContext';
import Logoimg from '../assets/logo.jpg'
import Button from './UI/Button';
import userProgressContext from '../store/UserProgressContext';
export default function Header(){
  const cardCtx=useContext(CartContext);
  const userContext=useContext(userProgressContext)
  const totalNumberOfItems=cardCtx.items.reduce((acc,item)=>{
    return acc + item.quantity;
  },0)
  function handleShowCart(){
    userContext.showCart()
  }
    return <header id="main-header"className="header">
       <div id="title">
         <img src={Logoimg}/>
         <h1></h1>
       </div>
       <nav>
        <Button onClick={handleShowCart}>Cart{totalNumberOfItems}</Button>
       </nav>
    </header>
    };
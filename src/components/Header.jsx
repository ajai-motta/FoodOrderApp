import { useContext } from 'react';
import CartContext from '../store/CardContext';
import Logoimg from '../assets/logo.jpg'
import Button from './UI/Button'
export default function Header(){
  const cardCtx=useContext(CartContext);
  const totalNumberOfItems=cardCtx.items.reduce((acc,item)=>{
    return acc + item.quanity;
  },0)
    return <header id="main-header"className="header">
       <div id="title">
         <img src={Logoimg}/>
         <h1></h1>
       </div>
       <nav>
        <Button>Cart{totalNumberOfItems}</Button>
       </nav>
    </header>
    };
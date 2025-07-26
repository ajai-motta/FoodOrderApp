import Logoimg from '../assets/logo.jpg'
import Button from './UI/Button'
export default function Header(){
    return <header id="main-header"className="header">
       <div id="title">
         <img src={Logoimg}/>
         <h1></h1>
       </div>
       <nav>
        <Button>Cart</Button>
       </nav>
    </header>
    };
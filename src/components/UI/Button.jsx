import {ShoppingCart } from 'lucide-react'
export default function Button({children, onText, isCart=true,className, ...props}) {
    let cssclass=onText ? 'text-button' : 'button';
    cssclass+=' '+className;
    return <button className={cssclass}{...props}>{isCart && <ShoppingCart/>}{children}</button>
}
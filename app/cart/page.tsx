"use client";
import { useCartStore } from "../styles/store/Cart";
import style from '@/app/styles/cart.module.css'
import { CartState } from "../styles/store/Cart";
import { CartItem } from "../styles/store/Cart";
import { useRouter } from "next/navigation";
export default function CartPage() {
  const router = useRouter()

  const cart = useCartStore((state:CartState) => state.cart);
  const removeFromCart = useCartStore((state:CartState) => state.removeFromCart);
  const diminuirQuantity = useCartStore((state:CartState)=> state.decreaseQuantity)
  const total = useCartStore((state:CartState)=> state.getTotalItems())
  const totalPrice = useCartStore((state:CartState)=> state.getTotalPrice())
  const addCart = useCartStore((state:CartState)=>state.addToCart)
  const savebuy = useCartStore((state:CartState)=> state.saveBuy)
  const totalPriceDescont = useCartStore((state:CartState)=> state.getTotalPriceDescont())
  console.log("total",totalPrice,"desconto",totalPriceDescont)

const handleFinish = () => {

  savebuy()
  router.push("/")
}
  return (
    <div>
      <h1>Seu Carrinho</h1>
       <h1>Total {total}</h1>
        <h1>{totalPrice.toFixed(2)}</h1>
          {totalPriceDescont === totalPrice ? "": <h1>Desconto:{totalPriceDescont.toFixed(2)}</h1>}
      {cart.length === 0 && <p>O carrinho está vazio</p>}

      {cart.map((item:CartItem) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>Qtd: {item.quantity}</p>
          <p>R$ {item.price}</p>
          <button onClick={() => removeFromCart(item.id)}>Remover</button>
          <button onClick={()=> diminuirQuantity(item.id)}>-</button>
          <button onClick={()=> addCart(item)}>+</button>
          
        </div>
        
      ))}
   {cart.length >0 && <button className={style.FinishButton} onClick={handleFinish}>Finalizar compra</button> }
    </div>
  );



}



"use client"
import { useState,useEffect } from "react";
import style from "@/app/styles/home.module.css"
import Image from "next/image";
import { useCartStore } from "./styles/store/Cart";
import Link from "next/link";



type Rating ={
  rate:number 
  count: number
}
interface dates  {
  id: number
  title: string
  price:number
  description: string
  image:string
  category: string
  rating:Rating


}
export default function Home() {
  const addCart = useCartStore((state)=> state.addToCart)
 const [products,setProducts] =useState<dates[]>([])
  const [car,setCar]=useState<dates[]>([])
  const [count,seCount] =useState(0)
   const  buscardados = async () => {
    const receber = await fetch('https://fakestoreapi.com/products')
    const transform =await receber.json()
        console.log("hi",transform)
        
    setProducts(transform)

  }

  useEffect(()=> {
  buscardados()
 
  },[])  

  const SubmitAdicionar =(e:dates)=> {
    addCart(e)
    setCar(prev => {
      const novoCar =[...prev,e]
      seCount(novoCar.length)
      return novoCar
    })
  }

  
  return (
    <main className={style.supercontainer}>
      <h1 className={style.count}>{count}</h1>
      <Link href="cart">Ir para o carrinho</Link>
    <div className={style.container}>
      {products && products.map((e:dates)=> {
        return  (
          <div  key={e.id}>
            <div className={style.card}> 
             <Image
             src={e.image}
             alt="imagem"
             width={200}
             height={200}
            />
            <p>{e.title}</p>
            <p>{e.price}</p>
            <p>{e.description}</p>
            <p>{e.category}</p>
             <button onClick={()=>SubmitAdicionar(e) }>Adicionar</button>
            </div>
            
          </div>
          
        )
        
      })}
      </div>
      
    </main>
  );
}

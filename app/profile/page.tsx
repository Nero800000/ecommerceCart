"use client"
import { useState, useEffect } from "react"
import styles from '@/app/styles/profile.module.css'
interface dates  {
  id: number
  title: string
  price:number
  description: string
  image:string
  category: string
  quantity:string
}
const Profile = () => {
  const [buys, setBuys] = useState<dates[]>([])

  useEffect(() => {
    const dados = localStorage.getItem("buy")

    if (dados) {
      setBuys(JSON.parse(dados))
    }
  }, [])

  if (buys.length === 0) {
    return <h1>Você não tem compras ainda</h1>
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Minhas Compras</h2>

      {buys.map((buy:any, index:number) => (
        <div key={index} className={styles.card}>

          {buy.products.map((p:dates) => (
            <div key={p.id} className={styles.product}>
              <img src={p.image} className={styles.image} />

              <div className={styles.info}>
                <p className={styles.name}>{p.title}</p>
                <p className={styles.price}>Categoria: {p.category}</p>
                <p className={styles.price}>Preço: ${p.price}</p>
                <p className={styles.price}>Quantidade: {p.quantity}</p>
                <p className={styles.price}> Data</p>
              </div>
            </div>
          ))}
           <div>Data da compra {buy.date}</div>
          <div className={styles.total}>
            Total da compra: ${buy.total}
          </div>

        </div>
      ))}
    </div>
  )
}

export default Profile


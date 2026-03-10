
import { Providers } from "./providers";
import style from "@/app/styles/header.module.css"
import { AuthButton } from "./components/AuthButton";
import Link from "next/link";

 export default function({children}: {children:React.ReactNode}) {

  return (
    <html lang="pt-Br">
      <body>
       <Providers>
        <header className={style.myheader}>
          <nav className={style.mynav}>
            <h1>logo</h1>
            <ul className={style.list}>
              <Link href="/">Home</Link>
              <Link href="/profile">Perfil</Link>
              <AuthButton/>
              
            </ul>
              
          </nav>
         
        </header>
   {children}</Providers> 
      </body>
    </html>
  )
}

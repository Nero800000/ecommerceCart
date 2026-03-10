"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import style from '@/app/styles/authButton.module.css'

export function AuthButton() {
  const { data: session, status } = useSession();
   const photo = session?.user?.image

  
 

  if (!session) {
    return (
      <li onClick={() => signIn("google")}>
        Cadastrar
      </li>
    );
  }

  return (
<> 
    <div className={style.container}>
      {photo ? <Image className={style.myImage} src={photo} alt="login image" width={38} height={32}/>:"" } 
        
        
    </div>
 <p onClick={()=> signOut()} className={style.logout}>Sair</p>
   </>
  );
}

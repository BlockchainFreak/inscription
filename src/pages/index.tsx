import Image from 'next/image'
import { useState } from 'react'
import { Inter } from 'next/font/google'
import { AuthInterface } from "@/components"
import { useSession, signIn, signOut } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [opened, setOpened] = useState(false)

  const { data: session } = useSession()

  console.log(session)

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
        <div>
          {
            session ? (
              <>
                Signed in as {session.user?.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
              </>
            ) : (
              <>
                Not signed in <br />
                <button onClick={() => signIn()}>Sign in</button>
              </>
            )
          }
        </div>
    </main>
  )
}

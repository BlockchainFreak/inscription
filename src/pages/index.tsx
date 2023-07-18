import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { Button, Container, Title, Text, TextInput } from '@mantine/core'
import useUser from '@/hooks/useUser'
import { useForm } from "@mantine/form"
import { apiClient } from '@/lib/sdk'
import { notifications } from "@mantine/notifications"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter()

  return (
    <Container className='flex flex-col items-center justify-center gap-4 p-4'>
      <Button onClick={() => router.push("/playground")}>
        Link to Playground
      </Button>
    </Container>
  )

  // const { session, user } = useUser()

  // const form = useForm({
  //   initialValues: {
  //     campusId: "",
  //     username: "",
  //   }
  // })

  

  // useEffect(() => {
  //   if (session && user?.verified) {
  //     router.push("/playground")
  //   }
  // }, [session])


  // if (!session) {
  //   return (
  //     <main
  //       className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
  //     >
  //       <div>
  //         <Button onClick={() => signIn("google")}>
  //           Sign In With Google
  //         </Button>
  //       </div>
  //     </main>
  //   )
  // }

  // if(!user) {
  //   return null;
  // }

  // const handleVerificationCode = async () => {
  //   if(session.user?.email && user) {
  //     console.log(session.user.email)
  //     apiClient.sendVerification({
  //       email: session.user.email,
  //       username: form.values.username,
  //       campusId: form.values.campusId
  //     })
  //     .then(({ success, message }) => {notifications.show({ message, color: success ? "green" : "red" })})
  //     .catch(console.error)
  //   }
  // }

  // if(!user.verified) {
  //   return (
  //     <main
  //       className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
  //     >
  //       <Container className='flex flex-col gap-4 p-4'>
  //         <Title order={1}>Welcome to the Playground!</Title>
  //         <Text>Please verify your LUMS email address to continue.</Text>
  //         <Button onClick={handleVerificationCode}>
  //           Send Verification Code
  //         </Button>
  //         <TextInput
  //           label="Campus ID"
  //           placeholder="26110777"
  //           {...form.getInputProps("campusId")}
  //         />
  //         <TextInput
  //           label="Nickname"
  //           placeholder="Umruhaya"
  //           {...form.getInputProps("username")}
  //         />
  //       </Container>
  //     </main>
  //   )
  // }
}
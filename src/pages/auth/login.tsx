import { GetServerSidePropsContext } from "next"
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default function LoginPage() {
  return (
    <div>login</div>
  )
}

export function getServerSideProps({ req, res }: GetServerSidePropsContext) {

    const session = getServerSession(req, res, authOptions)

    return {
        props: {}
    }
}

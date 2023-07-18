import { GetServerSidePropsContext } from "next"
import { signIn, useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Button, Container, Stack, Text } from "@mantine/core"
import { IconBrandGoogle } from "@tabler/icons-react"

export default function LoginPage() {

    const { data } = useSession()

    return (
        <Container className="my-24 grid place-items-center">
            <Stack className="px-6 py-12 w-96 bg-zinc-700 rounded-lg">
                <Text>
                    {JSON.stringify(data,null, 2)}
                </Text>
                <Button onClick={() => signIn("google")}>
                    Login With Google
                </Button>
            </Stack>
        </Container>
    )
}
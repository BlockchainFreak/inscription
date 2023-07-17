import { useAuthState } from "@/hooks"
import { Box, Container } from "@mantine/core"
import LoginInterface from "@/components/Auth/LoginInterface"
import SignupInterface from "@/components/Auth/SignupInterface"
import PasswordResetInterface from "@/components/Auth/PasswordResetInterface"

export default function AuthInterface() {

    const { auth } = useAuthState()

    return (
        <Container size={420} my={40}>
            {(() => {
                if (auth === "login") return <LoginInterface />
                if (auth === "signup") return <SignupInterface />
                if (auth === "reset") return <PasswordResetInterface />
                return <Box>Some Unknown Error Occured</Box>
            })()}
        </Container>
    )
}

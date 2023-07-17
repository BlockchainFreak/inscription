import { useAuthState } from "@/hooks"
import { Container, Title, Text, Anchor, TextInput, Button, Paper, PasswordInput, Checkbox, Group } from "@mantine/core"
import { IconEyeOff, IconEyeCheck } from "@tabler/icons-react"

export default function LoginInterface() {
    const { setAuth } = useAuthState()
    return (
        <Container size={420} my={40}>
            <Title align="center" order={2}>Welcome Back</Title>
            <Text>Do not have an account yet? {' '}<Anchor onClick={() => setAuth("signup")}>Create account</Anchor></Text>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Campus ID" placeholder="2xxxxxxx" required />
                <PasswordInput label="Password" placeholder="Your password" required mt="md"
                    visibilityToggleIcon={({ reveal, size }) => reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />}
                />
                <Group position="apart" mt="lg">
                    <Anchor component="button" size="sm" onClick={() => setAuth("reset")}>
                        Forgot password?
                    </Anchor>
                </Group>
                <Button fullWidth mt="xl">
                    Sign in
                </Button>
            </Paper>
        </Container>
    )
}

import { useAuthState } from "@/hooks"
import {
    createStyles,
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
    rem,
    PinInput,
    PasswordInput,
} from '@mantine/core';
import { useInterval } from "@mantine/hooks";
import { IconArrowLeft } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from "react";

const CountDown = ({ Comp }: { Comp: ({ seconds }: { seconds: number }) => JSX.Element }) => {
    const [seconds, setSeconds] = useState(0)
    const interval = useInterval(() => setSeconds((s) => s + 1), 1000);

    useEffect(() => {
        interval.start()
        if (interval.active) return () => interval.stop()
    }, [])

    useEffect(() => {
        if (seconds >= 60) interval.stop()
    }, [seconds])

    return <Comp seconds={seconds} />
}

export default function SignupInterface() {

    const { setAuth } = useAuthState();
    const [signinProgress, setSigninProgress] = useState("email" as "email" | "verification" | "credentials" | "done")
    const [error, setError] = useState("")
    const [pinRequestTime, setPinRequestTime] = useState(0)
    const [pinCode, setPinCode] = useState("")

    const handlePinComplete = useCallback((code: string) => {
        // set the state to loading and make request to server
        // if success, set the state to credentials
        // if fail, keep the state to verification, set pin to "" and show error
    }, [])

    const EmailInput = useCallback(() => {
        return (
            <>
                <Title align="center">
                    Sign Up
                </Title>

                <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                    <TextInput label="Your Campus ID" placeholder="2xxxxxxx" required />
                    <Text>
                        Already have an account? {' '} <Anchor onClick={() => setAuth("login")}>Sign In</Anchor>
                    </Text>
                    <Button fullWidth mt="xl">
                        Sign Up
                    </Button>
                </Paper>
            </>
        );
    }, [])

    const VerificationInput = useCallback(() => {
        return (
            <>
                <Title align="center">
                    Verify Email
                </Title>

                <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                    <Group position="center">
                        <PinInput length={6} value={pinCode}
                            onChange={(str) => setPinCode(str)}
                            onComplete={handlePinComplete}
                            inputType="tel" inputMode="numeric"
                        />
                    </Group>
                    <CountDown Comp={({ seconds }) => (
                        <Text align="center" mt={10}>
                            {seconds >= 60 ? <Anchor component="button" onClick={handleSendPin}>Resend</Anchor> : `Resend in ${60 - seconds} seconds`}
                        </Text>
                    )}/>
                    {error.length > 0 && <Text mt={10} color="red">{error}</Text>}
                </Paper>
            </>
        );
    }, [])

    const CredentialsInput = useCallback(() => {
        return (
            <>
                <Title align="center">
                    Set Nickname and Password
                </Title>

                <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                    <TextInput label="Nickname" placeholder="Karl Marx Daddy" required />
                    <PasswordInput label="Password" placeholder="Your password" required />
                    <Button fullWidth mt="xl" onClick={handleCredentialSubmit}>
                        Sign Up
                    </Button>
                </Paper>
            </>
        );
    }, [])

    const Done = useCallback(() => {
        return (
            <>
                <Title align="center">
                    Welcome to the club!
                </Title>

                <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                    <Text align="center">
                        You are now a member of the Inscription Cult 😈 {' '} <Anchor onClick={() => setAuth("login")}>Sign In</Anchor>
                    </Text>
                </Paper>
            </>
        );
    }, [])

    if (signinProgress === "email") return <EmailInput />
    if (signinProgress === "verification") return <VerificationInput />
    if (signinProgress === "credentials") return <CredentialsInput />
    if (signinProgress === "done") return <Done />
    return null
}
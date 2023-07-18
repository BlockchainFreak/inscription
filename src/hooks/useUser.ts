import { User } from "@/lib/schema";
import { apiClient } from "@/lib/sdk";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function useUser() {

    const { data: session } = useSession()
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if(session) {
            apiClient.getUserByEmail({ queries: { email: session.user?.email ?? "" } })
                .then(setUser).catch(console.error)
        }
    }, [session])

    return { session, user }
}
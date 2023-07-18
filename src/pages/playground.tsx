import { Playground } from "@/components"
import CourseTable from "@/components/CourseTable"
import CourseLibrary from "@/components/Playground/CourseLibrary"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function PlaygroundPage() {

    // const { data: session } = useSession()
    // const router = useRouter()

    // useEffect(() => {
    //     if(!session) {
    //         router.push("/")
    //     }
    // }, [session])

    // if(!session) {
    //     return null;
    // } 

    return (
        <>
            <Playground />
            <CourseTable />
            <CourseLibrary />
        </>
    )
}
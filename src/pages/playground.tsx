import { Playground } from "@/components"
import CourseTable from "@/components/CourseTable"
import CourseLibrary from "@/components/Playground/CourseLibrary"
import { useEffect } from "react"

export default function PlaygroundPage() {


    return (
        <>
            <Playground />
            <CourseTable />
            <CourseLibrary />
        </>
    )
}
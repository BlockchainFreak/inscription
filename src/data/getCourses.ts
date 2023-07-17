import Courses from "@/data/courses.json"
import { Course } from "@/types"

export default function getCourses() {
    return Courses as unknown as Course[];
}
import { useRef, useEffect } from "react";
import { Course } from "../types";

export default function useStaticCourses() {
    const ref = useRef([]);
    useEffect(() => {
        fetch("courses.json").then(res => res.json()).then(data => {ref.current = data});
    }, []);
    return ref.current as Course[];
}
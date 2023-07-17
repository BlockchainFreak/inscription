import { Course } from "@/types"
import { parseTime } from "@/lib/clash-resolver"

export const quantifyTime = (time: number) => {
    const hour = Math.floor(time / 60)
    const minute = Math.floor((time - hour) * 60)
    return { hour, minute }
}

export const stringifyTime = ({ hour, minute }: { hour: number, minute: number }) => {
    const ampm = hour < 12 ? "AM" : "PM"
    const hourString = hour > 12 ? hour - 12 : hour
    const minuteString = minute < 10 ? `0${minute}` : minute
    return `${hourString}:${minuteString} ${ampm}`
}

export const calculateCourseTableMap = (clashFreeWeeks: Course[]) => {
    const courseTableMap = Array(7).fill(Array(17).fill(null)) as Course[][]
    clashFreeWeeks.forEach(course => {
        course.sections.forEach(section => {
            section.days.split("").forEach(day => {
                const dayIndex = "MTWRFSU".indexOf(day)
                const start = parseTime(section.startTime)
                courseTableMap[dayIndex][start - 8] = course
            })
        })
    })
    return courseTableMap
}
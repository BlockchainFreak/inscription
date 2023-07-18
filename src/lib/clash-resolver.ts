import { Course, TimeRange, DaySchedule, WeekSchedule } from "@/types"
export const dayMap = { M: 0, T: 1, W: 2, R: 3, F: 4, S: 5, U: 6 } as Record<string, number>

export const parseTime = (time: string) => {
    const hours = time.split(":")[0]
    const minutes = time.split(":")[1].slice(0, 2)
    const ampm = time.slice(-2)
    const hourlyOffset = 12 * 60 * (ampm === "PM" ? 1 : 0)
    const case12 = hours === "12" ? 12 * 60 : 0
    return parseInt(hours) * 60 + parseInt(minutes) + hourlyOffset - case12
}

const initWeek = () => [[], [], [], [], [], [], []] as WeekSchedule

// Create Week Schedule from the current Course Stack
const createWeek = (currentCourseStack: Course[]) => {
    const week = initWeek()
    currentCourseStack.forEach(course => {
        const section1 = course.sections[0]

        const weekdays = section1.days.split("").map(day => dayMap[day])
        const startTime = parseTime(section1.startTime)
        const endTime = parseTime(section1.endTime)
        weekdays.forEach(day => {
            week[day].push([startTime, endTime])
        })

        const section2 = course.sections[1]
        if (section2) {
            const weekdays = section2.days.split("").map(day => dayMap[day])
            const startTime = parseTime(section2.startTime)
            const endTime = parseTime(section2.endTime)
            weekdays.forEach(day => {
                week[day].push([startTime, endTime])
            })
        }
    })
    return week
}

const sortWeek = (week: WeekSchedule) => {
    week.forEach(day => day.sort((a, b) => a[0] - b[0]))
}

const isWeekClashing = (week: WeekSchedule) => {
    sortWeek(week)
    for (let di = 0; di < week.length; ++di) {
        const day = week[di]
        for (let ci = 1; ci < day.length; ++ci) {
            if (day[ci - 1][1] >= day[ci][0])
                return true;
        }
    }
    return false;
}

const accumulateByBacktracking = (bucketIdx: number, buckets: Course[][], currentCourseStack: Course[], clashFreeWeeks: Course[][]) => {
    
    if(buckets[bucketIdx] && buckets[bucketIdx].length === 0) {
        accumulateByBacktracking(bucketIdx + 1, buckets, currentCourseStack, clashFreeWeeks)
        return
    }
    
    if (bucketIdx >= buckets.length) {
        const currentWeek = createWeek(currentCourseStack)
        const isClashing = isWeekClashing(currentWeek)
        if (isClashing === false) {
            clashFreeWeeks.push([...currentCourseStack])
        }
        return
    }

    for (const course of buckets[bucketIdx]) {
        // Backtracking
        currentCourseStack.push(course)
        accumulateByBacktracking(bucketIdx + 1, buckets, currentCourseStack, clashFreeWeeks)
        currentCourseStack.pop()
    }
}

const permuteCourseSections = (course: Course) => {
    if (course.sections.length === 1) {
        return [course]
    }
    const mainSection = course.sections[0]
    const otherSections = course.sections.slice(1)

    const perms = otherSections.map(section => ({
        ...course,
        sections: [mainSection, section]
    }))
    return perms
}

export const calculateClashFreeWeeks = (buckets: Course[][]) => {
    const clashFreeWeeks: Course[][] = []
    const currentCourseStack: Course[] = []

    // before backtracking, permute the sections of each course if there are more than 1
    const permutedBuckets = buckets.map(bucket => bucket.map(permuteCourseSections).flat())

    accumulateByBacktracking(0, permutedBuckets, currentCourseStack, clashFreeWeeks)
    return clashFreeWeeks
}
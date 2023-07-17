import { atom } from 'recoil'
import { Course } from '@/types'
import { getStaticCourses } from '@/data'

const courses = getStaticCourses()

//Array<Course[]>(3).fill(getItems(5))
export const playgroundState = atom({
    key: 'playgroundState',
    default: {
        currentActiveBucket: null as null | number,
        buckets: [courses.slice(0,5), courses.slice(10, 14)]
    }
})

export const searchResultsState = atom({
    key: 'searchResultsState',
    default: [] as Course[]
})

export const clashFreeWeeksState = atom({
    key: 'clashFreeWeeksState',
    default: [] as Course[][]   
})

export const authState = atom({
    key: 'authState',
    default: "login" as "login" | "signup" | "reset"
})

export const bucketHoverState = atom({
    key: 'bucketHoverState',
    default: null as null | number
})
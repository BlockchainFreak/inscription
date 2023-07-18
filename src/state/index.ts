import { atom } from 'recoil'
import { Course } from '@/types'
import { getStaticCourses } from '@/data'

// const courses = getStaticCourses()
export const playgroundState = atom({
    key: 'playgroundState',
    default: {
        currentActiveBucket: null as null | number,
        buckets: [[],[]] as Course[][],
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
import { useRecoilState } from "recoil"
import { playgroundState, searchResultsState, clashFreeWeeksState, authState, bucketHoverState } from "@/state"
import { useEffect, useState } from "react"

export const useMounted = () => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
        return () => { setMounted(false) }
    }, [])

    return mounted
}

export const usePlaygroundBuckets = () => {
    const [{ buckets, currentActiveBucket }, setPlayground] = useRecoilState(playgroundState)
    return {
        buckets,
        currentActiveBucket,
        setPlayground,
    }
}

export const useSearchResults = () => {
    const [searchResults, setSearchResults] = useRecoilState(searchResultsState)
    return {
        searchResults,
        setSearchResults,
    }
}

export const useClashFreeWeeks = () => {
    const [clashFreeWeeks, setClashFreeWeeks] = useRecoilState(clashFreeWeeksState)
    return {
        clashFreeWeeks,
        setClashFreeWeeks,
    }
}

export const useAuthState = () => {
    const [auth, setAuth] = useRecoilState(authState)
    return {
        auth,
        setAuth,
    }
}

export const useBucketHover = () => {
    const [bucketHover, setBucketHover] = useRecoilState(bucketHoverState)
    return {
        bucketHover,
        setBucketHover,
    }
}
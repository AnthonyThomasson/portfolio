import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

export const useFetch = <T,>(url: string, initialState: T): [T, Boolean] => {
    const [data, setData] = useState<T>(initialState)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        let isMounted = true
        axios
            .get(url)
            .then((response: AxiosResponse) => {
                if (isMounted) {
                    setData(response.data)
                }
            })
            .catch((err: Error) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
        return () => {
            isMounted = false
        }
    }, [url])
    return [data, loading]
}

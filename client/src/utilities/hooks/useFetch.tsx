import axios, { AxiosResponse } from 'axios'
import { pipe } from 'fp-ts/lib/function'
import TE from 'fp-ts/lib/TaskEither'
import { useEffect, useState } from 'react'

export const useFetch = <T,>(
    url: string,
    initialState: T
): [T, Boolean, Error | null] => {
    const [data, setData] = useState<T>(initialState)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)
    useEffect(() => {
        axios
            .get(url)
            .then((response: AxiosResponse) => {
                setData(response.data)
            })
            .catch((err: Error) => {
                console.log(err)
                setError(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [url])
    return [data, loading, error]
}

export const fetchEither = <ResponseData,>(
    url: string
): TE.TaskEither<Error, ResponseData> =>
    pipe(
        TE.tryCatch(
            async () => await axios.get(url),
            (reason) => new Error(String(reason))
        ),
        TE.map((response) => response.data)
    )

import axios from 'axios'
import E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import TE from 'fp-ts/lib/TaskEither'
import { useEffect, useState } from 'react'

export const useFetch = <T,>(
    url: string,
    initialState: T
): [E.Either<Error, T>, Boolean] => {
    const [data, setData] = useState<E.Either<Error, T>>(E.of(initialState))
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        setLoading(true)
        const fetchData = async (): Promise<E.Either<Error, T>> => {
            return await fetchEither<T>(url)()
        }
        fetchData()
            .then((response) => {
                setData(response)
            })
            .catch((error) => {
                setData(E.left(error))
            })
            .finally(() => setLoading(false))
    }, [url])
    return [data, loading]
}

const fetchEither = <ResponseData,>(
    url: string
): TE.TaskEither<Error, ResponseData> =>
    pipe(
        TE.tryCatch(
            async () => await axios.get(url),
            (reason) => new Error(String(reason))
        ),
        TE.map((response) => response.data)
    )

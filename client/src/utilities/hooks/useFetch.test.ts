import { renderHook } from '@testing-library/react-hooks'
import { describe, expect, it } from 'vitest'
import { useFetch } from './useFetch'

interface ITestResponse {
    userId: number
    id: number
    title: string
    completed: boolean
}

describe('useFetch hook', () => {
    it('should return data', async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            useFetch<ITestResponse | null>(
                'https://jsonplaceholder.typicode.com/todos/1',
                null
            )
        )

        const [dataBefore, loadingBefore] = result.current
        expect(loadingBefore).toBe(true)
        expect(dataBefore).toBe(null)

        await waitForNextUpdate()

        const [dataAfter, loadingAfter] = result.current
        expect(loadingAfter).toBe(false)
        expect(dataAfter).toEqual({
            userId: 1,
            id: 1,
            title: 'delectus aut autem',
            completed: false,
        })
    })

    it.todo('should not return data when unmounted', async () => {
        const { result, unmount } = renderHook(() =>
            useFetch<ITestResponse | null>(
                'https://jsonplaceholder.typicode.com/todos/1',
                null
            )
        )
        unmount()
        const [dataBefore, loadingBefore] = result.current
        expect(loadingBefore).toBe(true)
        expect(dataBefore).toBe(null)

        const [dataAfter, loadingAfter] = result.current
        expect(loadingAfter).toBe(true)
        expect(dataAfter).toBe(null)
    })
})

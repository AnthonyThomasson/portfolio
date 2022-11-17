import { renderHook, waitFor } from '@testing-library/react'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { describe, expect, it } from 'vitest'
import { useFetch } from './useFetch'

const server = setupServer(
    rest.get<ITestResponse>('/api/fetch-example', async (req, res, ctx) => {
        return await res(
            ctx.json([
                {
                    id: 1,
                    name: 'Example Name',
                },
            ])
        )
    })
)
beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

interface ITestResponse {
    id: number
    name: string
}

describe('useFetch', () => {
    it('should return data', async () => {
        const { result } = renderHook(() =>
            useFetch('/api/fetch-example', [{ id: 5, name: 'Starting Data' }])
        )
        await waitFor(() => {
            const [data, loading] = result.current
            expect(loading).toBe(false)
            pipe(
                data,
                E.map((data) =>
                    expect(data).toEqual([{ id: 1, name: 'Example Name' }])
                )
            )
        })
    })
    it('should set starting data', async () => {
        const { result } = renderHook(() =>
            useFetch('/api/fetch-example', [{ id: 5, name: 'Starting Data' }])
        )
        const [data, loading] = result.current
        expect(loading).toBe(true)
        pipe(
            data,
            E.map((data) =>
                expect(data).toEqual([{ id: 5, name: 'Starting Data' }])
            )
        )
    })
    it('should return an error', async () => {
        server.resetHandlers(
            rest.get<ITestResponse>(
                '/api/fetch-example',
                async (req, res, ctx) => {
                    return await res(ctx.status(500))
                }
            )
        )
        const { result } = renderHook(() => useFetch('/api/fetch-example', []))
        await waitFor(() => {
            const [data, loading] = result.current
            expect(loading).toBe(false)
            pipe(
                data,
                E.mapLeft((error) =>
                    expect(error.message).toEqual(
                        'AxiosError: Request failed with status code 500'
                    )
                )
            )
        })
    })
})

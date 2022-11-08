import { renderHook, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { describe, expect, it } from 'vitest'
import { useFetch } from './useFetch'

const server = setupServer(
    rest.get<ITestResponse>('/api/fetch-example', async (req, res, ctx) => {
        return await res(
            ctx.delay(100),
            ctx.json({
                id: 1,
                name: 'Example Name',
            })
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

describe('useFetch hook', () => {
    it('should return data', async () => {
        const { result } = renderHook(() =>
            useFetch<ITestResponse | null>('/api/fetch-example', null)
        )

        const [dataBefore, loadingBefore] = result.current
        expect(loadingBefore).toBe(true)
        expect(dataBefore).toBe(null)

        await waitFor(() => {
            const [dataAfter, loadingAfter] = result.current
            expect(loadingAfter).toBe(false)
            expect(dataAfter).toEqual({
                id: 1,
                name: 'Example Name',
            })
        })
    })
})

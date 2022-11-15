import { sequenceT } from 'fp-ts/lib/Apply'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { describe, expect, it } from 'vitest'
import { fetchEither } from './useFetch'

const server = setupServer(
    rest.get<ITestResponse>('/api/fetch-example', async (req, res, ctx) => {
        return await res(
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

describe.concurrent('fetchEither', () => {
    it('should return data', async () =>
        pipe(
            await fetchEither<ITestResponse>('/api/fetch-example')(),
            E.map((response) =>
                expect(response).toEqual({
                    id: 1,
                    name: 'Example Name',
                })
            )
        ))
    it('should return an error', async () =>
        sequenceT(E.Apply)(
            E.of(
                server.resetHandlers(
                    rest.get<ITestResponse>(
                        '/api/fetch-example',
                        async (req, res, ctx) => {
                            return await res(ctx.status(500))
                        }
                    )
                )
            ),
            E.of(
                pipe(
                    await fetchEither<ITestResponse>('/api/fetch-example')(),
                    E.mapLeft((error) =>
                        expect(error.message).toEqual(
                            'AxiosError: Request failed with status code 500'
                        )
                    )
                )
            )
        ))
})

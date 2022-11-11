import { renderHook, waitFor } from '@testing-library/react'
import { map, mapLeft } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { describe, expect, it } from 'vitest'
import { ISystemNode } from './../files/api'
import { useSystemNodes } from './useSystemNodes'

const server = setupServer(
    rest.get<ISystemNode[]>('/api/systemNodes', async (req, res, ctx) => {
        return await res(
            ctx.json([
                {
                    id: 1,
                    icon: 'folder-icon',
                    name: 'me',
                    type: 'FOLDER',
                    parentId: null,
                    content: 'Content 1',
                },
                {
                    id: 2,
                    icon: 'file-react-icon',
                    name: 'README.md',
                    type: 'FILE',
                    parentId: 1,
                    content: 'Content 2',
                },
                {
                    id: 3,
                    icon: 'folder-icon',
                    name: 'projects',
                    type: 'FOLDER',
                    parentId: null,
                    content: 'Content 3',
                },
                {
                    id: 4,
                    icon: 'folder-icon',
                    name: 'portfolio',
                    type: 'FOLDER',
                    parentId: 3,
                    content: 'Content 4',
                },
                {
                    id: 5,
                    icon: 'file-react-icon',
                    name: 'README.md',
                    type: 'FILE',
                    parentId: 4,
                    content: 'Content 5',
                },
                {
                    id: 6,
                    icon: 'file-react-icon',
                    name: 'technologies.md',
                    type: 'FILE',
                    parentId: 4,
                    content: 'Content 6',
                },
                {
                    id: 7,
                    icon: 'file-react-icon',
                    name: 'future.md',
                    type: 'FILE',
                    parentId: 4,
                    content: 'Content 7',
                },
            ])
        )
    })
)
beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe.concurrent('useSystemNodes hook', async () => {
    describe.concurrent('getNodes', async () => {
        it('should return a multidimensional structure of nodes fetched from the server', async () => {
            const { result } = renderHook(() => useSystemNodes())
            await waitFor(() => {
                const { getNodes } = result.current
                const nodes = getNodes()
                expect(nodes.length).toBeGreaterThan(0)
                expect(nodes).toEqual([
                    {
                        id: 1,
                        icon: 'folder-icon',
                        name: 'me',
                        type: 'FOLDER',
                        parentId: null,
                        content: 'Content 1',
                        open: false,
                        children: [
                            {
                                id: 2,
                                icon: 'file-react-icon',
                                name: 'README.md',
                                type: 'FILE',
                                parentId: 1,
                                content: 'Content 2',
                                selected: false,
                            },
                        ],
                    },
                    {
                        id: 3,
                        icon: 'folder-icon',
                        name: 'projects',
                        type: 'FOLDER',
                        parentId: null,
                        content: 'Content 3',
                        open: false,
                        children: [
                            {
                                id: 4,
                                icon: 'folder-icon',
                                name: 'portfolio',
                                type: 'FOLDER',
                                parentId: 3,
                                content: 'Content 4',
                                open: false,
                                children: [
                                    {
                                        id: 5,
                                        icon: 'file-react-icon',
                                        name: 'README.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 5',
                                        selected: false,
                                    },
                                    {
                                        id: 6,
                                        icon: 'file-react-icon',
                                        name: 'technologies.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 6',
                                        selected: false,
                                    },
                                    {
                                        id: 7,
                                        icon: 'file-react-icon',
                                        name: 'future.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 7',
                                        selected: false,
                                    },
                                ],
                            },
                        ],
                    },
                ])
            })
        })
    })
    describe.concurrent('toggleNode', async () => {
        it('if we pass a valid file ID, we should return a file', async () => {
            const { result } = renderHook(() => useSystemNodes())
            await waitFor(() => {
                pipe(
                    result.current.getNode(2),
                    map((node) =>
                        expect(node).toEqual({
                            id: 2,
                            icon: 'file-react-icon',
                            name: 'README.md',
                            type: 'FILE',
                            parentId: 1,
                            content: 'Content 2',
                            selected: false,
                        })
                    )
                )
            })
        })
        it('if we pass a valid folder ID, we should return a folder', async () => {
            const { result } = renderHook(() => useSystemNodes())
            await waitFor(() => {
                pipe(
                    result.current.getNode(4),
                    map((node: ISystemNode) =>
                        expect(node).toEqual({
                            id: 4,
                            icon: 'folder-icon',
                            name: 'portfolio',
                            content: 'Content 4',
                            parentId: 3,
                            children: [],
                            open: false,
                            type: 'FOLDER',
                        })
                    )
                )
            })
        })
        it('if we pass a invalid node ID, we should return null and error', async () => {
            const { result } = renderHook(() => useSystemNodes())
            await waitFor(() => {
                pipe(
                    result.current.getNode(100),
                    mapLeft((error: Error) => {
                        expect(error).toBeInstanceOf(Error)
                        expect(error.message).toBe(
                            "Node with ID '100' not found"
                        )
                    })
                )
            })
        })
    })
})

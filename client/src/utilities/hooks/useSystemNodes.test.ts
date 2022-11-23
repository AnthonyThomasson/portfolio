import { renderHook, waitFor } from '@testing-library/react'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { describe, expect, it } from 'vitest'
import { ISystemNode } from './../files/api'
import { useSystemNodes } from './useSystemNodes'

const server = setupServer(
    rest.get<ISystemNode[]>(
        '/api/system-nodes',
        async (req, res, ctx) =>
            await res(
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
    )
)
beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe('useSystemNodes hook', async () => {
    describe.concurrent('structure', async () => {
        it('should populate a multidimensional structure of nodes fetched from the server', async () => {
            const { result } = renderHook(() => useSystemNodes())
            await waitFor(() => {
                const structure = pipe(
                    result.current.structure,
                    E.getOrElse(() => [] as ISystemNode[])
                )
                expect(structure.length).toBeGreaterThan(0)
                expect(structure).toEqual([
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
        it('called multiple times', async () => {
            const { result } = renderHook(() => useSystemNodes())
            await waitFor(() => {
                const structure = pipe(
                    result.current.structure,
                    E.getOrElse(() => [] as ISystemNode[])
                )
                expect(structure.length).toBeGreaterThan(0)
                expect(structure).toEqual([
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
    describe('getNode', async () => {
        it('if we pass a valid file ID, we should return a file', async () => {
            const { result } = renderHook(() => useSystemNodes())
            await waitFor(() => {
                expect(result.current.loading).toBeFalsy()
                pipe(
                    result.current.getNode(2),
                    E.fold(
                        (error) => expect(error).toBeNull(),
                        (node) =>
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
                expect(result.current.loading).toBeFalsy()
                pipe(
                    result.current.getNode(4),
                    E.fold(
                        (error) => expect(error).toBeNull(),
                        (node: ISystemNode) =>
                            expect(node).toEqual({
                                id: 4,
                                icon: 'folder-icon',
                                name: 'portfolio',
                                content: 'Content 4',
                                parentId: 3,
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
                    E.fold(
                        (error) => {
                            expect(error).toBeInstanceOf(Error)
                            expect(error.message).toBe(
                                "Node with ID '100' not found"
                            )
                        },
                        (node) => expect(node).toBeNull()
                    )
                )
            })
        })
    })
    describe('select', async () => {
        it("if we pass a valid file ID, we should return a files with 'selected' property toggled to true then false", async () => {
            const { result } = renderHook(() => useSystemNodes())
            await waitFor(async () => {
                pipe(
                    result.current.select(2),
                    E.fold(
                        (error) => expect(error).toBeNull(),
                        (node) =>
                            expect(node).toEqual({
                                id: 2,
                                icon: 'file-react-icon',
                                name: 'README.md',
                                type: 'FILE',
                                parentId: 1,
                                content: 'Content 2',
                                selected: true,
                            })
                    )
                )
                pipe(
                    result.current.select(2),
                    E.fold(
                        (error) => expect(error).toBeNull(),
                        (node) =>
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
        it("if we pass a valid folder ID, we should return a files with 'open' property toggled to true then false", async () => {
            const { result } = renderHook(() => useSystemNodes())
            await waitFor(() => {
                pipe(
                    result.current.select(4),
                    E.fold(
                        (error) => expect(error).toBeNull(),
                        (node) =>
                            expect(node).toEqual({
                                id: 4,
                                icon: 'folder-icon',
                                name: 'portfolio',
                                content: 'Content 4',
                                parentId: 3,
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
                                open: true,
                                type: 'FOLDER',
                            })
                    )
                )
                pipe(
                    result.current.select(4),
                    E.fold(
                        (error) => expect(error).toBeNull(),
                        (node) =>
                            expect(node).toEqual({
                                id: 4,
                                icon: 'folder-icon',
                                name: 'portfolio',
                                content: 'Content 4',
                                parentId: 3,
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
                    result.current.select(100),
                    E.fold(
                        (error) => {
                            expect(error).toBeInstanceOf(Error)
                            expect(error.message).toBe(
                                "Node with ID '100' not found"
                            )
                        },
                        (node) => expect(node).toBeNull()
                    )
                )
            })
        })
        it('if we pass a node ID, and the node has an unrecognizable type', async () => {
            server.resetHandlers(
                rest.get<ISystemNode[]>(
                    '/api/system-nodes',
                    async (req, res, ctx) =>
                        await res(
                            ctx.json([
                                {
                                    id: 1,
                                    icon: 'folder-icon',
                                    name: 'me',
                                    type: 'SOMETHING',
                                    parentId: null,
                                    content: 'Content 1',
                                },
                            ])
                        )
                )
            )
            const { result } = renderHook(() => useSystemNodes())
            await waitFor(() => {
                pipe(
                    result.current.select(1),
                    E.fold(
                        (error) => {
                            expect(error).toBeInstanceOf(Error)
                            expect(error.message).toBe(
                                "Node with ID '1' is not a file or folder"
                            )
                        },
                        (node) => expect(node).toBeNull()
                    )
                )
            })
        })
    })
    describe('expandAll', async () => {
        it('all folders should have their "open" property set to true', async () => {
            const { result } = renderHook(() => useSystemNodes())
            await waitFor(() => {
                expect(result.current.loading).toEqual(false)
                result.current.expandAll()
                const structure = pipe(
                    result.current.structure,
                    E.getOrElse(() => [] as ISystemNode[])
                )
                expect(structure).toEqual([
                    {
                        id: 1,
                        icon: 'folder-icon',
                        name: 'me',
                        type: 'FOLDER',
                        parentId: null,
                        content: 'Content 1',
                        open: true,
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
                        open: true,
                        children: [
                            {
                                id: 4,
                                icon: 'folder-icon',
                                name: 'portfolio',
                                type: 'FOLDER',
                                parentId: 3,
                                content: 'Content 4',
                                open: true,
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
    describe('collapseAll', async () => {
        it('all folders should have their "open" property set to false', async () => {
            const { result } = renderHook(() => useSystemNodes())
            await waitFor(() => {
                expect(result.current.loading).toEqual(false)
                result.current.expandAll()
                result.current.collapseAll()
                const structure = pipe(
                    result.current.structure,
                    E.getOrElse(() => [] as ISystemNode[])
                )
                expect(structure).toEqual([
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
})

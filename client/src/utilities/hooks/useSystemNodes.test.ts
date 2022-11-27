import { renderHook, waitFor } from '@testing-library/react'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { describe, expect, it } from 'vitest'
import { ISystemNode, useSystemNodes } from './useSystemNodes'

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
                    {
                        id: 8,
                        icon: 'file-react-icon',
                        name: 'root.md',
                        type: 'FILE',
                        parentId: null,
                        content: 'Content 8',
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
                expect(result.current.loading).toBe(false)
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
                        breadcrumbs: [],
                        children: [
                            {
                                id: 2,
                                icon: 'file-react-icon',
                                name: 'README.md',
                                type: 'FILE',
                                parentId: 1,
                                content: 'Content 2',
                                selected: false,
                                breadcrumbs: ['me'],
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
                        breadcrumbs: [],
                        children: [
                            {
                                id: 4,
                                icon: 'folder-icon',
                                name: 'portfolio',
                                type: 'FOLDER',
                                parentId: 3,
                                content: 'Content 4',
                                open: false,
                                breadcrumbs: ['projects'],
                                children: [
                                    {
                                        id: 5,
                                        icon: 'file-react-icon',
                                        name: 'README.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 5',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                    {
                                        id: 6,
                                        icon: 'file-react-icon',
                                        name: 'technologies.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 6',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                    {
                                        id: 7,
                                        icon: 'file-react-icon',
                                        name: 'future.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 7',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        content: 'Content 8',
                        icon: 'file-react-icon',
                        id: 8,
                        name: 'root.md',
                        parentId: null,
                        selected: false,
                        type: 'FILE',
                        breadcrumbs: [],
                    },
                ])
            })
        })
    })
    describe('select', async () => {
        it('select a file, then the status is toggled to be "selected"', async () => {
            const { result } = renderHook(() => useSystemNodes())
            await waitFor(async () => {
                const { structure, loading, select } = result.current
                expect(loading).toBe(false)
                pipe(
                    select(8),
                    E.fold(
                        (error) => expect(error).toBeNull(),
                        (node) =>
                            expect(node).toEqual({
                                content: 'Content 8',
                                icon: 'file-react-icon',
                                id: 8,
                                name: 'root.md',
                                parentId: null,
                                selected: true,
                                type: 'FILE',
                                breadcrumbs: [],
                            })
                    )
                )
                expect(
                    pipe(
                        structure,
                        E.getOrElseW(() => [])
                    )
                ).toEqual([
                    {
                        id: 1,
                        icon: 'folder-icon',
                        name: 'me',
                        type: 'FOLDER',
                        parentId: null,
                        content: 'Content 1',
                        open: false,
                        breadcrumbs: [],
                        children: [
                            {
                                id: 2,
                                icon: 'file-react-icon',
                                name: 'README.md',
                                type: 'FILE',
                                parentId: 1,
                                content: 'Content 2',
                                selected: false,
                                breadcrumbs: ['me'],
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
                        breadcrumbs: [],
                        children: [
                            {
                                id: 4,
                                icon: 'folder-icon',
                                name: 'portfolio',
                                type: 'FOLDER',
                                parentId: 3,
                                content: 'Content 4',
                                open: false,
                                breadcrumbs: ['projects'],
                                children: [
                                    {
                                        id: 5,
                                        icon: 'file-react-icon',
                                        name: 'README.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 5',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                    {
                                        id: 6,
                                        icon: 'file-react-icon',
                                        name: 'technologies.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 6',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                    {
                                        id: 7,
                                        icon: 'file-react-icon',
                                        name: 'future.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 7',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        content: 'Content 8',
                        icon: 'file-react-icon',
                        id: 8,
                        name: 'root.md',
                        parentId: null,
                        selected: true,
                        type: 'FILE',
                        breadcrumbs: [],
                    },
                ])
            })
        })
        it('select a file twice, then the status stays "selected"', async () => {
            const { result } = renderHook(() => useSystemNodes())
            await waitFor(async () => {
                const { structure, loading, select } = result.current
                expect(loading).toBe(false)
                select(8)
                pipe(
                    select(8),
                    E.fold(
                        (error) => expect(error).toBeNull(),
                        (node) =>
                            expect(node).toEqual({
                                content: 'Content 8',
                                icon: 'file-react-icon',
                                id: 8,
                                name: 'root.md',
                                parentId: null,
                                selected: true,
                                breadcrumbs: [],
                                type: 'FILE',
                            })
                    )
                )
                expect(
                    pipe(
                        structure,
                        E.getOrElseW(() => [])
                    )
                ).toEqual([
                    {
                        id: 1,
                        icon: 'folder-icon',
                        name: 'me',
                        type: 'FOLDER',
                        parentId: null,
                        content: 'Content 1',
                        open: false,
                        breadcrumbs: [],
                        children: [
                            {
                                id: 2,
                                icon: 'file-react-icon',
                                name: 'README.md',
                                type: 'FILE',
                                parentId: 1,
                                content: 'Content 2',
                                selected: false,
                                breadcrumbs: ['me'],
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
                        breadcrumbs: [],
                        children: [
                            {
                                id: 4,
                                icon: 'folder-icon',
                                name: 'portfolio',
                                type: 'FOLDER',
                                parentId: 3,
                                content: 'Content 4',
                                open: false,
                                breadcrumbs: ['projects'],
                                children: [
                                    {
                                        id: 5,
                                        icon: 'file-react-icon',
                                        name: 'README.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 5',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                    {
                                        id: 6,
                                        icon: 'file-react-icon',
                                        name: 'technologies.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 6',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                    {
                                        id: 7,
                                        icon: 'file-react-icon',
                                        name: 'future.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 7',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        content: 'Content 8',
                        icon: 'file-react-icon',
                        id: 8,
                        name: 'root.md',
                        parentId: null,
                        selected: true,
                        type: 'FILE',
                        breadcrumbs: [],
                    },
                ])
            })
        })
        it('select a nested file, then the file is set to be "selected", and all enclosing folders are set to "open"', async () => {
            const { result } = renderHook(() => useSystemNodes())
            await waitFor(async () => {
                const { structure, loading, select } = result.current
                expect(loading).toBe(false)
                pipe(
                    select(2),
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
                                breadcrumbs: ['me'],
                            })
                    )
                )
                expect(
                    pipe(
                        structure,
                        E.getOrElseW(() => [])
                    )
                ).toEqual([
                    {
                        id: 1,
                        icon: 'folder-icon',
                        name: 'me',
                        type: 'FOLDER',
                        parentId: null,
                        content: 'Content 1',
                        open: true,
                        breadcrumbs: [],
                        children: [
                            {
                                id: 2,
                                icon: 'file-react-icon',
                                name: 'README.md',
                                type: 'FILE',
                                parentId: 1,
                                content: 'Content 2',
                                selected: true,
                                breadcrumbs: ['me'],
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
                        breadcrumbs: [],
                        children: [
                            {
                                id: 4,
                                icon: 'folder-icon',
                                name: 'portfolio',
                                type: 'FOLDER',
                                parentId: 3,
                                content: 'Content 4',
                                open: false,
                                breadcrumbs: ['projects'],
                                children: [
                                    {
                                        id: 5,
                                        icon: 'file-react-icon',
                                        name: 'README.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 5',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                    {
                                        id: 6,
                                        icon: 'file-react-icon',
                                        name: 'technologies.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 6',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                    {
                                        id: 7,
                                        icon: 'file-react-icon',
                                        name: 'future.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 7',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        content: 'Content 8',
                        icon: 'file-react-icon',
                        id: 8,
                        name: 'root.md',
                        parentId: null,
                        selected: false,
                        type: 'FILE',
                        breadcrumbs: [],
                    },
                ])
            })
        })
        it('select a nested file twice, then the file is set to be "selected", and all enclosing folders are set to "open"', async () => {
            const { result } = renderHook(() => useSystemNodes())
            await waitFor(async () => {
                const { structure, loading, select } = result.current
                expect(loading).toBe(false)
                select(2)
                pipe(
                    select(2),
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
                                breadcrumbs: ['me'],
                            })
                    )
                )
                expect(
                    pipe(
                        structure,
                        E.getOrElseW(() => [])
                    )
                ).toEqual([
                    {
                        id: 1,
                        icon: 'folder-icon',
                        name: 'me',
                        type: 'FOLDER',
                        parentId: null,
                        content: 'Content 1',
                        open: true,
                        breadcrumbs: [],
                        children: [
                            {
                                id: 2,
                                icon: 'file-react-icon',
                                name: 'README.md',
                                type: 'FILE',
                                parentId: 1,
                                content: 'Content 2',
                                selected: true,
                                breadcrumbs: ['me'],
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
                        breadcrumbs: [],
                        children: [
                            {
                                id: 4,
                                icon: 'folder-icon',
                                name: 'portfolio',
                                type: 'FOLDER',
                                parentId: 3,
                                content: 'Content 4',
                                open: false,
                                breadcrumbs: ['projects'],
                                children: [
                                    {
                                        id: 5,
                                        icon: 'file-react-icon',
                                        name: 'README.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 5',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                    {
                                        id: 6,
                                        icon: 'file-react-icon',
                                        name: 'technologies.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 6',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                    {
                                        id: 7,
                                        icon: 'file-react-icon',
                                        name: 'future.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 7',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        content: 'Content 8',
                        icon: 'file-react-icon',
                        id: 8,
                        name: 'root.md',
                        parentId: null,
                        selected: false,
                        type: 'FILE',
                        breadcrumbs: [],
                    },
                ])
            })
        })
        it('select a folder, then it should be set to open', async () => {
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
                                breadcrumbs: ['projects'],
                                children: [
                                    {
                                        id: 5,
                                        icon: 'file-react-icon',
                                        name: 'README.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 5',
                                        breadcrumbs: ['projects', 'portfolio'],
                                        selected: false,
                                    },
                                    {
                                        id: 6,
                                        icon: 'file-react-icon',
                                        name: 'technologies.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 6',
                                        breadcrumbs: ['projects', 'portfolio'],
                                        selected: false,
                                    },
                                    {
                                        id: 7,
                                        icon: 'file-react-icon',
                                        name: 'future.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 7',
                                        breadcrumbs: ['projects', 'portfolio'],
                                        selected: false,
                                    },
                                ],
                                open: true,
                                type: 'FOLDER',
                            })
                    )
                )
            })
        })
        it('select a folder twice, then it should be set to closed', async () => {
            const { result } = renderHook(() => useSystemNodes())
            await waitFor(() => {
                result.current.select(4)
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
                                breadcrumbs: ['projects'],
                                parentId: 3,
                                children: [
                                    {
                                        id: 5,
                                        icon: 'file-react-icon',
                                        name: 'README.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 5',
                                        breadcrumbs: ['projects', 'portfolio'],
                                        selected: false,
                                    },
                                    {
                                        id: 6,
                                        icon: 'file-react-icon',
                                        name: 'technologies.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 6',
                                        breadcrumbs: ['projects', 'portfolio'],
                                        selected: false,
                                    },
                                    {
                                        id: 7,
                                        icon: 'file-react-icon',
                                        name: 'future.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 7',
                                        breadcrumbs: ['projects', 'portfolio'],
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
        it('select a invalid node, then return null and error', async () => {
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
        it('select a node, that has an unrecognizable type', async () => {
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
                        breadcrumbs: [],
                        children: [
                            {
                                id: 2,
                                icon: 'file-react-icon',
                                name: 'README.md',
                                type: 'FILE',
                                parentId: 1,
                                content: 'Content 2',
                                selected: false,
                                breadcrumbs: ['me'],
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
                        breadcrumbs: [],
                        children: [
                            {
                                id: 4,
                                icon: 'folder-icon',
                                name: 'portfolio',
                                type: 'FOLDER',
                                parentId: 3,
                                content: 'Content 4',
                                open: true,
                                breadcrumbs: ['projects'],
                                children: [
                                    {
                                        id: 5,
                                        icon: 'file-react-icon',
                                        name: 'README.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 5',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                    {
                                        id: 6,
                                        icon: 'file-react-icon',
                                        name: 'technologies.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 6',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                    {
                                        id: 7,
                                        icon: 'file-react-icon',
                                        name: 'future.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 7',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 8,
                        icon: 'file-react-icon',
                        name: 'root.md',
                        type: 'FILE',
                        parentId: null,
                        content: 'Content 8',
                        selected: false,
                        breadcrumbs: [],
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
                        breadcrumbs: [],
                        children: [
                            {
                                id: 2,
                                icon: 'file-react-icon',
                                name: 'README.md',
                                type: 'FILE',
                                parentId: 1,
                                content: 'Content 2',
                                selected: false,
                                breadcrumbs: ['me'],
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
                        breadcrumbs: [],
                        children: [
                            {
                                id: 4,
                                icon: 'folder-icon',
                                name: 'portfolio',
                                type: 'FOLDER',
                                parentId: 3,
                                content: 'Content 4',
                                open: false,
                                breadcrumbs: ['projects'],
                                children: [
                                    {
                                        id: 5,
                                        icon: 'file-react-icon',
                                        name: 'README.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 5',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                    {
                                        id: 6,
                                        icon: 'file-react-icon',
                                        name: 'technologies.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 6',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                    {
                                        id: 7,
                                        icon: 'file-react-icon',
                                        name: 'future.md',
                                        type: 'FILE',
                                        parentId: 4,
                                        content: 'Content 7',
                                        selected: false,
                                        breadcrumbs: ['projects', 'portfolio'],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 8,
                        icon: 'file-react-icon',
                        name: 'root.md',
                        type: 'FILE',
                        parentId: null,
                        content: 'Content 8',
                        selected: false,
                        breadcrumbs: [],
                    },
                ])
            })
        })
    })
})

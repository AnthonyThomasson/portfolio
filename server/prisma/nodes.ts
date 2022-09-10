import { NodeType, PrismaClient } from '@prisma/client'
export async function seedNodes(client: PrismaClient) {
    client.systemNode.deleteMany()
    await client.systemNode.create({
        data: {
            name: 'me',
            icon: 'folder-icon',
            type: NodeType.FOLDER,
            content: '',
            children: {
                createMany: {
                    data: [
                        {
                            name: 'about.md',
                            icon: 'file-react-icon',
                            type: NodeType.FILE,
                            content: '# Example Content',
                        },
                    ],
                },
            },
        },
    })
    await client.systemNode.create({
        data: {
            name: 'projects',
            icon: 'folder-icon',
            type: NodeType.FOLDER,
            content: '',
            children: {
                create: [
                    {
                        name: 'portfolio',
                        icon: 'folder-icon',
                        type: NodeType.FOLDER,
                        content: '',
                        children: {
                            createMany: {
                                data: [
                                    {
                                        name: 'main.md',
                                        icon: 'file-react-icon',
                                        type: NodeType.FILE,
                                        content: '# main content',
                                    },
                                    {
                                        name: 'technologies.md',
                                        icon: 'file-react-icon',
                                        type: NodeType.FILE,
                                        content: '# technologies content',
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
        },
    })
}

import { NodeType, PrismaClient } from '@prisma/client'

const nodes = [
    {
        name: 'me',
        icon: 'folder-icon',
        type: NodeType.FILE,
        content: '',
        children: {
            create: [
                {
                    name: 'about.md',
                    icon: 'react-file-icon',
                    type: NodeType.FILE,
                    content: '# Example Content',
                },
            ],
        },
    },
    {
        name: 'projects',
        icon: 'folder-icon',
        type: NodeType.FOLDER,
        content: '',
        children: {
            create: [
                {
                    name: 'portfolio',
                    icon: 'folder-icon',
                    type: NodeType.FILE,
                    content: '',
                    children: [
                        {
                            name: 'main.md',
                            icon: 'react-file-icon',
                            type: NodeType.FILE,
                            content: '# main content',
                        },
                        {
                            name: 'technologies.md',
                            icon: 'react-file-icon',
                            type: NodeType.FILE,
                            content: '# technologies content',
                        },
                    ],
                },
            ],
        },
    },
]

export async function seedNodes(client: PrismaClient) {
    client.systemNode.deleteMany()
    return client.systemNode.create({
        data: {
            name: 'me',
            icon: 'folder-icon',
            type: NodeType.FILE,
            content: '',
            parentId: 0,
            children: {
                create: [
                    {
                        name: 'about.md',
                        icon: 'react-file-icon',
                        type: NodeType.FILE,
                        content: '# Example Content',
                    },
                ],
            },
        },
    })
}

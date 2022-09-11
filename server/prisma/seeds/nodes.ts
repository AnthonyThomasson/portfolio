import { NodeType, PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'

const resourcesPath = __dirname + '/../../../prisma/seeds/resources/'

export async function seedNodes(client: PrismaClient) {
    await client.systemNode.deleteMany()
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
                            content: readFileSync(
                                resourcesPath + 'about.md',
                                'utf8'
                            ),
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
                                        content: readFileSync(
                                            resourcesPath + 'main.md',
                                            'utf8'
                                        ),
                                    },
                                    {
                                        name: 'technologies.md',
                                        icon: 'file-react-icon',
                                        type: NodeType.FILE,
                                        content: readFileSync(
                                            resourcesPath + 'technologies.md',
                                            'utf8'
                                        ),
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

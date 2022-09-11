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
                            name: 'README.md',
                            icon: 'file-react-icon',
                            type: NodeType.FILE,
                            content: readFileSync(
                                resourcesPath + 'me/README.md',
                                'utf8'
                            ),
                        },
                    ],
                },
            },
        },
    })
    // await client.systemNode.create({
    //     data: {
    //         name: 'thoughts',
    //         icon: 'folder-icon',
    //         type: NodeType.FOLDER,
    //         content: '',
    //         children: {
    //             create: [
    //                 {
    //                     name: 'README.md',
    //                     icon: 'file-react-icon',
    //                     type: NodeType.FILE,
    //                     content: readFileSync(
    //                         resourcesPath + 'thoughts/README.md',
    //                         'utf8'
    //                     ),
    //                 },
    //             ],
    //         },
    //     },
    // })
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
                                        name: 'README.md',
                                        icon: 'file-react-icon',
                                        type: NodeType.FILE,
                                        content: readFileSync(
                                            resourcesPath +
                                                'projects/portfolio/README.md',
                                            'utf8'
                                        ),
                                    },
                                    {
                                        name: 'technologies.md',
                                        icon: 'file-react-icon',
                                        type: NodeType.FILE,
                                        content: readFileSync(
                                            resourcesPath +
                                                'projects/portfolio/technologies.md',
                                            'utf8'
                                        ),
                                    },
                                    {
                                        name: 'future.md',
                                        icon: 'file-react-icon',
                                        type: NodeType.FILE,
                                        content: readFileSync(
                                            resourcesPath +
                                                'projects/portfolio/future.md',
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

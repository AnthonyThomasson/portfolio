import { PrismaClient } from '@prisma/client'

const technologies = [
    {
        name: 'Golang',
        icon: 'golang.png',
        experience: '2 years',
    },
    {
        name: 'PHP',
        icon: 'golang.png',
        experience: '2 years',
    },
    {
        name: 'JavaScript',
        icon: 'golang.png',
        experience: '2 years',
    },
    {
        name: 'TypeScript',
        icon: 'golang.png',
        experience: '2 years',
    },
    {
        name: 'Kotlin',
        icon: 'golang.png',
        experience: '2 years',
    },
    {
        name: 'Objective-C',
        icon: 'golang.png',
        experience: '2 years',
    },
    {
        name: 'Swift',
        icon: 'golang.png',
        experience: '2 years',
    },
    {
        name: 'React',
        icon: 'golang.png',
        experience: '2 years',
    },
    {
        name: 'Vue',
        icon: 'golang.png',
        experience: '2 years',
    },
    {
        name: 'Node.js',
        icon: 'golang.png',
        experience: '2 years',
    },
    {
        name: 'Express',
        icon: 'golang.png',
        experience: '2 years',
    },
]

export async function seedTechnologies(client: PrismaClient) {
    await client.technology.deleteMany()
    return await client.technology.createMany({
        data: technologies,
    })
}

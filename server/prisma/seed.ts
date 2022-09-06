import { PrismaClient } from '@prisma/client'
import { seedNodes } from './nodes'
import { seedTechnologies } from './technologies'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding technologies...')
    const resTechnologies = await seedTechnologies(prisma)
    console.log('Complete (technologies):', resTechnologies.count)
    console.log('Seeding nodes...')
    const resNodes = await seedNodes(prisma)
    console.log('Complete (nodes):', resNodes.count)
    console.log('Seeding complete.')
}

main()
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

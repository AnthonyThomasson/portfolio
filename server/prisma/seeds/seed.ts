import { PrismaClient } from '@prisma/client'
import { seedNodes } from './nodes'
import { seedTechnologies } from './technologies'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding technologies..')
    await seedTechnologies(prisma)
    console.log('Seeding nodes...')
    await seedNodes(prisma)
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

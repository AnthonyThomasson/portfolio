import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log(`Pretending to seeds ...`)
    // for (const node of nodes) {
    //     await prisma.system_nodes.create({
    //         data: node,
    //     })
    // }
}

main()
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

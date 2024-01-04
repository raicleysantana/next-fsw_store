import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

prisma.$extends({
  model: {
    $allModels: {
      created(params: any) {
        console.log(params);
      },
    },
  },
});

export const prismaClient = prisma;

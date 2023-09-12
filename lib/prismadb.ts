import { PrismaClient } from "@prisma/client";

//타입 스크립트에서의 전역 변수 타입 설정
declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;

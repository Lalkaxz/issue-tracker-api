import { Prisma } from "@prisma/client";

export const usersProfileSelectOptions: Prisma.UserSelect = {
    id: true,
    name: true,
    roles: true,
    createdAt: true
}
import { Prisma } from "@prisma/client";

export const authorSelectOptions: Prisma.UserSelect = {
    id: true,
    name: true,
    displayName: true,
    roles: true,
    createdAt: true
}

export const usersProfileSelectOptions: Prisma.UserSelect = {
    id: true,
    name: true,
    displayName: true,
    roles: true,
    issues: true,
    comments: true,
    createdAt: true
}
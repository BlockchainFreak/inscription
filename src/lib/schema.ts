import { int, mysqlEnum, mysqlTable, serial, uniqueIndex, varchar, boolean, bigint } from 'drizzle-orm/mysql-core';
import { InferModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const UserTable = mysqlTable("user", {
    email: varchar("email", { length: 100 }).primaryKey(),
    campusId: varchar("campusId", { length: 20 }),
    verified: boolean("verified").notNull().default(false),
    nickname: varchar("nickname", { length: 100 }),
    createdAt: bigint("createdAt", { mode: 'number' }).notNull(),
    credits: int("credits").notNull().default(0),
})

export const verificationCodeTable = mysqlTable("verificationCode", {
    campusId: varchar("campusId", { length: 100 }).primaryKey(),
    email: varchar("email", { length: 100 }).notNull(),
    lastUpdate: bigint("lastUpdate", { mode: "number" }).notNull(),
    code: varchar("code", { length: 10 }).notNull(),
})

export const insertUserSchema = createInsertSchema(UserTable);
export const selectUserSchema = createSelectSchema(UserTable);

export const verificationCodeSchema = createInsertSchema(verificationCodeTable);

export type User = InferModel<typeof UserTable>;
export type NewUser = InferModel<typeof UserTable, 'insert'>; 

export type validationCode = InferModel<typeof verificationCodeTable>;
export type NewvalidationCode = InferModel<typeof verificationCodeTable, 'insert'>; 
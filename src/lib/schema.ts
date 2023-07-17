import { int, mysqlEnum, mysqlTable, serial, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';
import { InferModel } from 'drizzle-orm';

export const UserTable = mysqlTable("user", {
    id: serial("id").primaryKey(),
    campusId: varchar("campusId", { length: 10 }).notNull().unique(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    name: varchar("name", { length: 100 }),
    nickname: varchar("nickname", { length: 100 }).notNull(),
    passHash: varchar("passHash", { length: 100 }).notNull(),
    credits: int("credits").notNull().default(0),
    activeSession: varchar("activeSession", { length: 200 }),
})

export const verificationCodeTable = mysqlTable("verificationCode", {
    email: varchar("email", { length: 100 }).primaryKey(),
    lastUpdate: int("lastUpdate").notNull(),
    code: varchar("code", { length: 10 }).notNull(),
})

export const UserSessionTable = mysqlTable("userSession", {
    sessionId: varchar("sessionId", { length: 500 }).primaryKey(),
    userId: int("userId").notNull(),
});


export type User = InferModel<typeof UserTable>;
export type NewUser = InferModel<typeof UserTable, 'insert'>; 

export type validationCode = InferModel<typeof verificationCodeTable>;
export type NewvalidationCode = InferModel<typeof verificationCodeTable, 'insert'>; 

export type UserSession = InferModel<typeof UserSessionTable>;
export type NewUserSession = InferModel<typeof UserSessionTable, 'insert'>;
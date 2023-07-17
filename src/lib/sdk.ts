import { Zodios, makeErrors } from "@zodios/core";
import { z } from "zod";

const defaultErrors = makeErrors([{
    status: "default",
    schema: z.object({
        message: z.string()
    })
}])

export const authClient = new Zodios("/api", [
    {
        method: "post",
        path: "/auth/requestCode",
        alias: "sendVerification",
        description: "Send a verification email to a user",
        parameters: [
            {
                name: "email",
                type: "Body",
                schema: z.object({
                    name: z.string(),
                    email: z.string().email(),
                })
            }
        ],
        response: z.boolean(),
        error: defaultErrors,
    },
    {
        method: "get",
        path: "/auth/getUserBySessionId",
        alias: "getUserBySessionId",
        description: "Get a user by their session id",
        parameters: [
            {
                name: "sessionId",
                type: "Query",
                schema: z.object({
                    sessionId: z.string(),
                })
            }
        ],
        response: z.object({
            campusId: z.string(),
            email: z.string(),
            name: z.string(),
            nickname: z.string(),
            credits: z.number(),
        }),
    },
    {
        method: "get",
        path: "/auth/getUserByEmail",
        alias: "getUserByEmail",
        description: "Get a user by their email",
        parameters: [
            {
                name: "email",
                type: "Query",
                schema: z.object({
                    email: z.string().email(),
                })
            }
        ],
        response: z.object({
            campusId: z.string(),
            email: z.string(),
            name: z.string(),
            nickname: z.string(),
            credits: z.number(),
        }),
        error: defaultErrors,
    },
    {
        method: "post",
        path: "/auth/signup",
        alias: "signup",
        description: "Create a new user",
        parameters: [
            {
                name: "user",
                type: "Body",
                schema: z.object({
                    campusId: z.string(),
                    email: z.string().email(),
                    name: z.string(),
                    nickname: z.string(),
                    password: z.string(),
                    code: z.string(),
                })
            },
        ],
        response: z.boolean(),
        error: defaultErrors,
    }
])
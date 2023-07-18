import { Zodios, makeErrors } from "@zodios/core";
import { selectUserSchema } from "./schema";
import { z } from "zod";

const defaultErrors = makeErrors([{
    status: "default",
    schema: z.object({
        message: z.string()
    })
}])

export const apiClient = new Zodios("/api", [
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
                    username: z.string(),
                    email: z.string(),
                    campusId: z.string().length(8, "Must be exactly 8 characters long"),
                })
            }
        ],
        response: z.object({
            success: z.boolean(),
            message: z.string(),
        }),
        error: defaultErrors,
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
                schema: z.string().email(),
            }
        ],
        response: selectUserSchema,
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
        response: z.object({
            success: z.boolean(),
            message: z.string(),
        }),
        error: defaultErrors,
    },
])
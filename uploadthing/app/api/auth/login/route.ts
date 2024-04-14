import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { COOKIE_NAME, MAX_AGE } from "@/constants";


export async function POST(request: Request){
    // Handle request
    const body = await request.json();

    const {username, password} = body;

    // Hard-coded values (fakeDB)
    if(username !== "admin" || password !== "admin"){
        return NextResponse.json(
            {
            message: "Unauthorized",
            },
            {
            status: 401,
            }
        );
    };

    const jwtSecret = process.env.JWT_SECRET || "";

    const token = sign(
        {
        username,
        },
        jwtSecret, {
            expiresIn: MAX_AGE,
        }
    );
    const seralized = serialize(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict",
        path: "/",
    });

    // Handle response
    const response = {
        message: "Authentication successful", 
    };

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {"Set-Cookie": seralized}
    });
    
}
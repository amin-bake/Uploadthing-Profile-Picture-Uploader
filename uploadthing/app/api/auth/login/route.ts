import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

//cookie expirey date
const MAX_AGE = 60 * 60 * 24 * 30; //30 days

export async function POST(request: Request){
    // Handle request
    const body = await request.json();

    const {username, password} = body;

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
    const seralized = serialize("OutSite", token, {
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
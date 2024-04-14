"use client";

import axios, {AxiosError} from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Login() {
    // 'push' for client routing
    const {push} = useRouter();


    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            username: event.currentTarget.username.value,
            password: event.currentTarget.password.value
        };
        try{
            const {data} = await axios.post("/api/auth/login", payload);
            alert(JSON.stringify(data))
            // redirect user to profile
            push("/dashboard/profile");
        }catch(e){
            const error = e as AxiosError;
            alert(error.message);
        }
    };

    return (
        <main>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="username">Username:</label>
                    <input className="border rounded text-black border-black" type="text" id="username" name="username" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input className="border rounded text-black border-black" type="password" id="password" name="password" required />
                </div>
                <div>
                    <button className="p-2 bg-orange-600 text-white w-fit rounded" type="submit">Submit</button>
                </div>              
            </form>
        </main>
    )
    
}


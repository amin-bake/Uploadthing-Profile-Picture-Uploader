"use client";

import axios, {AxiosError} from "axios";
import { useRouter } from "next/navigation";

export function Login() {
    // 'push' for client routing
    const {push} = useRouter();


    const handlSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            username: event.currentTarget.username.value,
            password: event.currentTarget.password.value
        };
        try{
            const {data} = await axios.post("/api/auth/login", payload);
            alert(JSON.stringify(data))
            // redirect user to profile
            push("/dashboard");
        }catch(e){
            const error = e as AxiosError;
            alert(error.message);
        }
    };

    return (
        <main>
            <h1>Login Page</h1>
            <form onSubmit={handlSubmit} className="flex flex-col gap-4">
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


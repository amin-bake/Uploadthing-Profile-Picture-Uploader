"use client";

import { useState, useEffect } from "react";
import axios, {AxiosError} from "axios";
import { useRouter } from "next/navigation";

interface UserResponse {
    user: string | null;
    error: AxiosError | null;
}

export default function Profile({children,}: {
    children: React.ReactNode
}) {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const router = useRouter();
    useEffect(() => {
        (async () =>{
            const { user, error } = await getUser();            
            // Redirect to login incase of error
            if (error) {
                router.push("/");
                return;
            }
            // Success
            setIsSuccess(true);
            console.log(user);
        })();
    }, []);

    if(!isSuccess){
        return <p>Loading...</p>;
    }
    return (
        <main>
            <header>Navigation</header>
            {children}
        </main>
    )
};

async function getUser(): Promise<UserResponse> {
    try{
        const {data} = await axios.get('/api/auth/dashboard');

        return{
            user: data,
            error: null,
        };
    }catch(e){
        const error = e as AxiosError;

        return {
            user: null,
            error
        }
    }
}
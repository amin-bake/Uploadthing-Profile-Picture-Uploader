"use client";

export function Signup() {
    const handlSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const payload = {
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value
        };
    };

    return(
        
            <div>
                <h1>Sign up Page</h1>
                <form onSubmit={handlSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input className="border rounded border-black" type="text" name="email" id="email" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input className="border rounded border-black" type="password" name="password" id="password" required />
                    </div>
                    <div>
                        <button className="p-2 bg-orange-600 text-white w-fit rounded" type="submit">Sumbit</button>
                    </div>
                </form>
            </div>
        
    )
};
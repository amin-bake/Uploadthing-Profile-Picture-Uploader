"use client";

export default function Login() {
    const handlSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value
        };
    };

    return (
        <main>
            <h1 className="item-center">Login Page</h1>
            <form onSubmit={handlSubmit} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="email">Email:</label>
                    <input className="border rounded border-black" type="text" id="email" name="username" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input className="border rounded border-black" type="text" id="password" name="username" required />
                </div>
                <div>
                    <button className="p-2 bg-orange-600 text-white w-fit rounded" type="submit">Submit</button>
                </div>              
            </form>
        </main>
    )
    
}
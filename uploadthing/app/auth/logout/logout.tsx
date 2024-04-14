import React from 'react'
import axios, {AxiosError} from 'axios';

const Logout = () => {
    const handleSubmit = async () => {
        // event.preventDefault();
        // try{
        //     const {data} = await axios.post("/api/auth/logout", token);
        //     alert(JSON.stringify(data))
        //     // redirect user to profile
        //     push("/");
        // }catch(e){
        //     const error = e as AxiosError;
        //     alert(error.message);
        // }
        alert("loggin out...")
    }
  return (
    <div>
        <button onSubmit={handleSubmit} className="p-2 bg-orange-600 text-white w-fit rounded" type="submit">Logout</button>
    </div>
  )
}

export default Logout
import Image from "next/image";
import { Login } from "./auth/login/login";


export default function Home() {
  return (
    <main >
      <div >
        <Login/>
        {/* <Signup/> */}
      </div>
    </main>
  );
}

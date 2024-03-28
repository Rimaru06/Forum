"use client";
import { login  } from "@/actions/user";
export default function Signup() {

  return (
    <div>
      <button onClick={async () => {
        const data = await login({email: "test", password: "test"});
        console.log(data);
      }}>Sign Up</button>
    </div>
  );
}

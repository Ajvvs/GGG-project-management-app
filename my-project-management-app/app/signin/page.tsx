"use client";

import { useState } from "react";
import { signIn } from "supertokens-web-js/recipe/emailpassword";
import "supertokens-web-js";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Placeholder basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    //placeholder until API calls/authentication are implemented

    try {
      let response = await signIn({
        formFields: [
          { id: "email", value: email },
          { id: "password", value: password }
        ]
      });
      if (response.status === "OK") {
        // Redirect to dashboard page upon successful login
        router.push("/dashboard");//no dashboard yet
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    
    <div className="container">
      <h1>Sign-In</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
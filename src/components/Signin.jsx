import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Navigate } from "react-router-dom";
import useCurrentUser from "../customHooks/useCurrentUser";
import FormContainer from "./FormContainer";
import Button from "./Button";
import InputField from "./InputField";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const { user } = useCurrentUser();


  const handleSignin = async (e) => {
    e.preventDefault();
    setIsSigningIn(true)
    try {
      await Auth.signIn(email, password);
      setIsSigningIn(false)
      // Redirect to homepage
      if (typeof window !== 'undefined') {
        window.location.href = '/'
      }
    } catch (err) {
      console.error("Error signing in:", err);
      setError(err.message);
      setIsSigningIn(false)
    }
  };
  if (user) {
    return <Navigate to='/' />
  }
  return (
    <form onSubmit={handleSignin}>
      <h2 className="text-2xl font-semibold text-center mb-6">Welcome back. Sign in</h2>
      <FormContainer>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="space-y-3">
          <label for="email">Email Address</label>
          <InputField
            name='email'
            type="email"
            placeholder="name@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-3">
          <label for="password">Password</label>
          <InputField
            name='password'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">{isSigningIn ? 'Signing in' : 'Sign in'}</Button>
        <p>New user? <a href="/signup" className="text-primary hover:underline">Sign up</a></p>
      </FormContainer>
    </form>
  );
}

export default Signin;

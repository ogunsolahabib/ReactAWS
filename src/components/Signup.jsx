import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import Button from "./Button";
import FormContainer from "./FormContainer";

function Signup() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [fullName, setFullName] = useState('');

  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          name: fullName
        },
        autoSignIn: true
      });


      // Redirect to email confirmation
      navigate(`/confirm-email?userSub=${res.userSub}`);

    } catch (err) {
      console.error("Error signing up:", err);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2 className="text-2xl font-semibold text-center mb-6">Create an account</h2>
      <FormContainer>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="space-y-3">
          <label for="name">Full Name</label>
          <InputField
            type="name"
            placeholder="Isaac Newton"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-3">
          <label for="email">Email Address</label>
          <InputField
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit">Sign Up</Button>
        <p>Have an account? <a href="signin" className="text-primary hover:underline">Sign in</a></p>
      </FormContainer>
    </form>
  );
}

export default Signup;

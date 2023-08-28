import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useSearchParams } from "react-router-dom";
import FormContainer from "./FormContainer";
import InputField from "./InputField";
import Button from "./Button";
import Container from "./Container";

function ConfirmSignup() {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");

  const [searchParams] = useSearchParams();



  useEffect(() => {
    if (typeof window !== "undefined") {
      setUsername(searchParams.get('userSub'));
    }
  }, [searchParams.get('userSub')]);

  const handleConfirmSignup = async (username) => {
    try {
      if (!username) return;

      await Auth.confirmSignUp(username, confirmationCode,);

      // Redirect to /
      if (typeof window !== 'undefined') {
        window.location.href = '/'
      }

    } catch (err) {
      console.error("Error confirming signup:", err);
      setError(err.message);
    }
  };

  return (
    <Container>

      <form onSubmit={(e) => { e.preventDefault(); handleConfirmSignup(username) }}>
        <h2 className="text-2xl font-semibold text-center mb-6">Verify email address</h2>


        <FormContainer>
          <h4 className="text-md font-semibold mb-3">Enter the verification code sent to your email</h4>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="space-y-3">
            <label for="code">Verification code</label>
            <InputField
              name='code'
              type="text"
              placeholder="Enter Confirmation Code"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
            />
          </div>

          <Button type="submit">
            Confirm Signup</Button>

        </FormContainer>
      </form>
    </Container>
  );
}

export default ConfirmSignup;

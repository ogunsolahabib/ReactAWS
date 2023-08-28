import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useSearchParams } from "react-router-dom";

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

      await Auth.confirmSignUp(username, confirmationCode);

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
    <div>
      <h2>Confirm Email Signup</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Confirmation Code"
        value={confirmationCode}
        onChange={(e) => setConfirmationCode(e.target.value)}
      />
      <button onClick={() => handleConfirmSignup(username)}>
        Confirm Signup
      </button>
    </div>
  );
}

export default ConfirmSignup;

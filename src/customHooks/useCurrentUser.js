import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [isFetchingUser, setIsFetchingUser]=useState(false)

  useEffect(() => {
    fetchUser();
    async function fetchUser() {
    setIsFetchingUser(true)
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
      setIsFetchingUser(false)
    } catch (err) {
      console.error("Error fetching current user:", err);
      setIsFetchingUser(false);
      navigate('/signin')
    }
  }
  }, []);

  const navigate=useNavigate();
  


  return {user, isFetchingUser};
};

export default useCurrentUser;

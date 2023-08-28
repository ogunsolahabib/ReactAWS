import React, { createContext, useContext } from "react";
import "./App.css";
import useCurrentUser from "./customHooks/useCurrentUser";
import CustomersList from "./components/Records";

const AppContent = createContext({
  user: null,
  isFetchingUser: false
});

export const useAppContext = () => useContext(AppContent);
function App() {
  const userObject = useCurrentUser();




  return (
    <AppContent.Provider
      value={userObject}
    >
      <CustomersList />
    </AppContent.Provider>
  );
}

export default App;

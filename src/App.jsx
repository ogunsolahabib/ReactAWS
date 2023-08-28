import React, { createContext, useContext } from "react";
import "./App.css";
import { useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Record } from "./models";
import useCurrentUser from "./customHooks/useCurrentUser";
import CustomersList from "./components/Records";
import Header from "./components/Header";

const AppContent = createContext();

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

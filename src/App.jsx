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



  const fetchUsers = async () => {
    try {
      const users = await DataStore.query(Record);
      console.log("Posts retrieved successfully!", users);
    } catch (error) {
      console.log("Error retrieving posts", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AppContent.Provider
      value={userObject}
    >
      <Header />

      {<CustomersList />}
    </AppContent.Provider>
  );
}

export default App;

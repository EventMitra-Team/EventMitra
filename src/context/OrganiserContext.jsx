import React, { createContext, useContext, useState } from "react";

const OrganiserContext = createContext();

export const OrganiserProvider = ({ children }) => {
  const [organisers, setOrganisers] = useState([]);

  return (
    <OrganiserContext.Provider value={{ organisers, setOrganisers }}>
      {children}
    </OrganiserContext.Provider>
  );
};

export const useOrganisers = () => {
  const context = useContext(OrganiserContext);
  if (!context) {
    throw new Error("useOrganisers must be used within OrganiserProvider");
  }
  return context;
};

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [totalConteo, setTotalConteo] = useState(0);
  const updateUser = (name) => {
    setUserName(name);
  };
  const updateTotalConteo = (count) => {
    setTotalConteo(count);
  };

  return (
    <UserContext.Provider
      value={{ userName, updateUser, totalConteo, updateTotalConteo }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

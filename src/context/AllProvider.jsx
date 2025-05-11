import { createContext, useState } from "react";

export const AllContext = createContext();
export const AllProvider = ({ children }) => {
  const [test, setTest] = useState("");
  return <AllContext.Provider value={{ test }}>{children}</AllContext.Provider>;
};

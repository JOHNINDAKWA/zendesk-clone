import { createContext, useContext, useState } from "react";

const MacroContext = createContext();

export const useMacro = () => useContext(MacroContext);

export const MacroProvider = ({ children }) => {
  const [subject, setSubject] = useState("");
  const [reply, setReply] = useState("");
  const [selectedMacro, setSelectedMacro] = useState(null);

  return (
    <MacroContext.Provider
      value={{
        subject,
        setSubject,
        reply,
        setReply,
        selectedMacro,
        setSelectedMacro,
      }}
    >
      {children}
    </MacroContext.Provider>
  );
};

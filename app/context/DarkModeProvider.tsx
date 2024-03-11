import React, { createContext, useContext, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

interface IMode {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DarkModeContext = createContext<IMode>({} as any);

const DarkModeProvider = ({ children }: IProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// useLogin custom hook for getting out Provider values

export const useDarkMode = () => useContext(DarkModeContext);

export default DarkModeProvider;

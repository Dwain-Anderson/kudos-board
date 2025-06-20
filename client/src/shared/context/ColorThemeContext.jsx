import { useState, createContext } from "react";

export const ColorThemeContext = createContext();

export default function ColorThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const updateColorTheme = () => {
    setDark((prev) => !prev)
  };

  return (
    <ColorThemeContext.Provider value={{ dark, updateColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

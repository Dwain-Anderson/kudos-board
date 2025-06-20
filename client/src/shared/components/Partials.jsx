import "./Partials.css";
import { useContext } from "react";
import { ColorThemeContext } from "../context/ColorThemeContext";

function Footer() {
  const { dark, updateColorTheme } = useContext(ColorThemeContext);

  const handleClick = (event) => {
    event.preventDefault();
    console.log("Clicked");
    console.log(dark);
    updateColorTheme();
    console.log(dark);
  }

  return (
    <footer>
      <button onclick={handleClick}>Toggle {dark ? "Dark" : "Light"} Mode</button>
      <p>© 2025 Kudos Board</p>
    </footer>
  );
}

function Header() {
  return (
    <header>
      <h1>Kudos</h1>
    </header>
  );
}

export { Header, Footer };

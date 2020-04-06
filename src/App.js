import React from "react";
import "./App.css";
import { GlobalProvider } from "./context/GlobalState";
//Components import
import { Header } from "./components/Header";
import { Lyrics } from "./components/Lyrics";

function App() {
  return (
    <GlobalProvider>
      <Header />
      <Lyrics />
    </GlobalProvider>
  );
}

export default App;

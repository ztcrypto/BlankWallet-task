import React from "react";
import AppState from "./context/background/AppState";
import MainContainer from "./views/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/App.css";

const App = () => {
  return (
    <AppState>
      <MainContainer></MainContainer>
    </AppState>
  );
};

export default App;

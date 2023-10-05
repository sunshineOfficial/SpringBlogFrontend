import React, {useState} from 'react';
import './App.css';
import {Outlet} from "react-router";
import {useOutletContext} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

interface AppContext {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

function App() {
  const [token, setToken] = useState<string>("");
  
  return (
    <>
      <Navbar loggedIn={token !== ""} />
      <div className="max-w-screen-xl mx-auto p-4">
        <Outlet context={{token, setToken}} />
      </div>
    </>
  );
}

export default App;

export function useToken() {
  return useOutletContext<AppContext>();
}

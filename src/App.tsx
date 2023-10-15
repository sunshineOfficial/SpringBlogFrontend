import React, {useEffect, useState} from 'react';
import './App.css';
import {Outlet} from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import {UserResponse} from "./Api/Interfaces/user";
import {RoleResponse} from "./Api/Interfaces/role";
import {getCurrentUser, getRoleById} from "./Api/api";

export interface AppContext {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  user: UserResponse | null;
  setUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
  role: RoleResponse | null;
  setRole: React.Dispatch<React.SetStateAction<RoleResponse | null>>;
}

/**
 * Основной компонент приложения.
 */
function App() {
  const [token, setToken] = useState<string>(window.localStorage.getItem("token") || "");
  const [user, setUser] = useState<UserResponse | null>(null);
  const [role, setRole] = useState<RoleResponse | null>(null);

  useEffect(() => {
    const getUserInit = async () => {
      const response = await getCurrentUser(token);

      if (typeof response !== "string" && response.status === 200) {
        setUser(response.data);

        const roleResponse = await getRoleById(response.data.roleId);

        if (typeof roleResponse !== "string" && roleResponse.status === 200) {
          setRole(roleResponse.data);
        }
      } else {
        setToken("");
        window.localStorage.setItem("token", "");
        setUser(null);
        setRole(null);
      }
    };

    getUserInit();
  }, [token]);

  const onLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setToken("");
    window.localStorage.setItem("token", "");
    window.location.reload();
  }
  
  return (
    <>
      <Navbar user={user} role={role} onLogoutClick={onLogoutClick} />
      <div className="max-w-screen-xl mx-auto p-4">
        <Outlet context={{token, setToken, user, setUser, role, setRole}} />
      </div>
    </>
  );
}

export default App;

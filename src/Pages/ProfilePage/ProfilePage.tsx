import React, {useEffect, useState} from "react";
import {useToken} from "../../App";
import { Navigate } from "react-router-dom";
import {UserResponse} from "../../Api/Interfaces/user";
import {getCurrentUser, getRoleById} from "../../Api/api";
import Profile from "../../Components/Profile/Profile";
import {RoleResponse} from "../../Api/Interfaces/role";

interface Props {
}

const ProfilePage = (props: Props) => {
  const { token } = useToken();
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
      }
    };

    getUserInit();
  }, [token]);
  
  if (token === "")
    return <Navigate replace to="/login" />
  
  return (
    <>
      { user && role && <Profile userResponse={user} roleResponse={role} /> }
    </>
  );
};

export default ProfilePage;

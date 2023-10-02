import React from "react";
import {useToken} from "../../App";
import { Navigate } from "react-router-dom";

interface Props {
}

const ProfilePage = (props: Props) => {
  const { token } = useToken();
  
  if (token === "")
    return <Navigate replace to="/login" />
  
  return (
    <div>ProfilePage</div>
  );
};

export default ProfilePage;

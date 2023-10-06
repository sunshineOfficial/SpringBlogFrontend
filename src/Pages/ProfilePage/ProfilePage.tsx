import React from "react";
import {useToken} from "../../App";
import { Navigate } from "react-router-dom";
import PageHeader from "../../Components/PageHeader/PageHeader";

interface Props {
}

const ProfilePage = (props: Props) => {
  const { token } = useToken();
  
  if (token === "")
    return <Navigate replace to="/login" />
  
  return (
    <PageHeader>Profile</PageHeader>
  );
};

export default ProfilePage;

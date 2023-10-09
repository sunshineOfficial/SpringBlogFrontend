import React from "react";
import {Navigate, useOutletContext} from "react-router-dom";
import Profile from "../../Components/Profile/Profile";
import {AppContext} from "../../App";

interface Props {
}

const ProfilePage = (props: Props) => {
  const { user, role } = useOutletContext<AppContext>();
  
  if (user === null)
    return <Navigate replace to="/login" />
  
  return (
    <>
      { user && role && <Profile userResponse={user} roleResponse={role} /> }
    </>
  );
};

export default ProfilePage;

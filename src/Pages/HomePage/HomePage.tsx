import React, {useEffect, useState} from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";
import {getAllPosts, getCurrentUser, getRoleById} from "../../Api/api";
import PostCardList from "../../Components/PostCardList/PostCardList";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import {PageResponse} from "../../Api/Interfaces/post";
import Button from "../../Components/Button/Button";
import {useToken} from "../../App";
import {Link} from "react-router-dom";
import {UserResponse} from "../../Api/Interfaces/user";
import {RoleResponse} from "../../Api/Interfaces/role";

interface Props {
}

const HomePage = (props: Props) => {
  const { token } = useToken();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [role, setRole] = useState<RoleResponse | null>(null);
  const [pageResponse, setPageResponse] = useState<PageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAllPostsInit = async () => {
      const response = await getAllPosts();

      if (typeof response !== "string") {
        if (response.status === 200) {
          setPageResponse(response.data);
        } else {
          setError(response.data.message);
        }
      } else {
        setError(response);
      }
    };

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

    if (token !== "") getUserInit();
    getAllPostsInit();
  }, [token]);
  
  return (
    <>
      <PageHeader>Home</PageHeader>
      { token !== "" && <Link to="/post/create" ><Button>Create post</Button></Link> }
      { error && <ErrorMessage>{error}</ErrorMessage> }
      { pageResponse && <PostCardList pageResponse={pageResponse} currentUser={user} role={role} /> }
    </>
  );
};

export default HomePage;

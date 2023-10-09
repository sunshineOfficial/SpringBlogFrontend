import React, {useEffect, useState} from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";
import {getAllPosts} from "../../Api/api";
import PostCardList from "../../Components/PostCardList/PostCardList";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import {PostPageResponse} from "../../Api/Interfaces/post";
import Button from "../../Components/Button/Button";
import {Link, useOutletContext} from "react-router-dom";
import {AppContext} from "../../App";

interface Props {
}

const HomePage = (props: Props) => {
  const { user, role } = useOutletContext<AppContext>();
  const [pageResponse, setPageResponse] = useState<PostPageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAllPostsInit = async () => {
      const response = await getAllPosts(0, 10, null, true);

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
    
    getAllPostsInit();
  }, []);
  
  return (
    <>
      <PageHeader>Home</PageHeader>
      { user !== null && <Link to="/post/create" ><Button>Create post</Button></Link> }
      { error && <ErrorMessage>{error}</ErrorMessage> }
      { pageResponse && <PostCardList pageResponse={pageResponse} currentUser={user} role={role} /> }
    </>
  );
};

export default HomePage;

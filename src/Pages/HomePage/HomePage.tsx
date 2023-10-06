import React, {useEffect, useState} from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";
import {getAllPosts} from "../../Api/api";
import PostCardList from "../../Components/PostCardList/PostCardList";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import {PageResponse} from "../../Api/Interfaces/post";
import Button from "../../Components/Button/Button";
import {useToken} from "../../App";
import {Link} from "react-router-dom";

interface Props {
}

const HomePage = (props: Props) => {
  const { token } = useToken();
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
    
    getAllPostsInit();
  }, []);
  
  return (
    <>
      <PageHeader>Home</PageHeader>
      { token !== "" && <Link to="/post/create" ><Button>Create post</Button></Link> }
      { error && <ErrorMessage>{error}</ErrorMessage> }
      { pageResponse && <PostCardList pageResponse={pageResponse} /> }
    </>
  );
};

export default HomePage;

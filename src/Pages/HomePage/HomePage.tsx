import React, {useEffect, useState} from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";
import {getAllPosts} from "../../Api/api";
import PostCardList from "../../Components/PostCardList/PostCardList";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import {PageResponse} from "../../Api/Interfaces/post";

interface Props {
}

const HomePage = (props: Props) => {
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
      <PageHeader>HomePage</PageHeader>
      { error && <ErrorMessage>{error}</ErrorMessage> }
      { pageResponse && <PostCardList pageResponse={pageResponse} /> }
    </>
  );
};

export default HomePage;

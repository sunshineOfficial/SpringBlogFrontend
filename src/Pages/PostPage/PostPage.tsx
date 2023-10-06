import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {PostResponse} from "../../Api/Interfaces/post";
import {getPostById} from "../../Api/api";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import Post from "../../Components/Post/Post";

interface Props {
}

const PostPage = (props: Props) => {
  const postId = Number(useParams()["id"]);
  const [postResponse, setPostResponse] = useState<PostResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPostByIdInit = async () => {
      const response = await getPostById(postId);

      if (typeof response !== "string") {
        if (response.status === 200) {
          setPostResponse(response.data);
        } else {
          setError(response.data.message);
        }
      } else {
        setError(response);
      }
    };

    getPostByIdInit();
  }, [postId]);
  
  return (
    <>
      { error && <ErrorMessage>{error}</ErrorMessage> }
      { postResponse && <Post postResponse={postResponse} /> }
    </>
  );
};

export default PostPage;

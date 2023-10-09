import React, {useEffect, useState} from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";
import {Navigate, useOutletContext} from "react-router-dom";
import {AppContext} from "../../App";
import {getAllComments, getAllPosts} from "../../Api/api";
import {PostPageResponse} from "../../Api/Interfaces/post";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import PostCardList from "../../Components/PostCardList/PostCardList";
import {CommentPageResponse} from "../../Api/Interfaces/comment";
import CommentCardList from "../../Components/CommentCardList/CommentCardList";

interface Props {
}

const ModeratorPage = (props: Props) => {
  const { user, role} = useOutletContext<AppContext>();
  const [postPageResponse, setPostPageResponse] = useState<PostPageResponse | null>(null);
  const [commentPageResponse, setCommentPageResponse] = useState<CommentPageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAllPostsInit = async () => {
      const response = await getAllPosts(0, 10, null, false);

      if (typeof response !== "string") {
        if (response.status === 200) {
          setPostPageResponse(response.data);
        } else {
          setError(response.data.message);
        }
      } else {
        setError(response);
      }
    };

    const getAllCommentsInit = async () => {
      const response = await getAllComments(0, 10, null, null, false);

      if (typeof response !== "string") {
        if (response.status === 200) {
          setCommentPageResponse(response.data);
        } else {
          setError(response.data.message);
        }
      } else {
        setError(response);
      }
    };

    getAllPostsInit();
    getAllCommentsInit();
  }, []);
  
  if (role === null || role.name === "USER")
    return <Navigate replace to="/" />
  
  return (
    <>
      <PageHeader>Unpublished posts</PageHeader>
      { error && <ErrorMessage>{error}</ErrorMessage> }
      { postPageResponse && <PostCardList pageResponse={postPageResponse} currentUser={user} role={role} /> }
      <PageHeader>Unpublished comments</PageHeader>
      { commentPageResponse && <CommentCardList pageResponse={commentPageResponse} currentUser={user} role={role} /> }
    </>
  );
};

export default ModeratorPage;

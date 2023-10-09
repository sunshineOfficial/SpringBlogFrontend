import React, {useEffect, useState} from "react";
import {Navigate, useOutletContext} from "react-router-dom";
import Profile from "../../Components/Profile/Profile";
import {AppContext} from "../../App";
import {PostPageResponse} from "../../Api/Interfaces/post";
import {CommentPageResponse} from "../../Api/Interfaces/comment";
import {getAllComments, getAllPosts} from "../../Api/api";
import PageHeader from "../../Components/PageHeader/PageHeader";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import PostCardList from "../../Components/PostCardList/PostCardList";
import CommentCardList from "../../Components/CommentCardList/CommentCardList";

interface Props {
}

const ProfilePage = (props: Props) => {
  const { user, role } = useOutletContext<AppContext>();
  const [postPageResponse, setPostPageResponse] = useState<PostPageResponse | null>(null);
  const [commentPageResponse, setCommentPageResponse] = useState<CommentPageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAllPostsInit = async () => {
      const response = await getAllPosts(0, 10, user?.id);

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
      const response = await getAllComments(0, 10, user?.id);

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
  
  if (user === null)
    return <Navigate replace to="/login" />
  
  return (
    <>
      { user && role && <Profile userResponse={user} roleResponse={role} /> }
      <PageHeader>My posts</PageHeader>
      { error && <ErrorMessage>{error}</ErrorMessage> }
      { postPageResponse && <PostCardList pageResponse={postPageResponse} currentUser={user} role={role} /> }
      <PageHeader>My comments</PageHeader>
      { commentPageResponse && <CommentCardList pageResponse={commentPageResponse} currentUser={user} role={role} /> }
    </>
  );
};

export default ProfilePage;

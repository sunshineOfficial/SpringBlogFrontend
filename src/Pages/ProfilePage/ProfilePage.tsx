import React, {useEffect, useState} from "react";
import {Navigate, useOutletContext} from "react-router-dom";
import Profile from "../../Components/Profile/Profile";
import {AppContext} from "../../App";
import {PostPageResponse} from "../../Api/Interfaces/post";
import {CommentPageResponse} from "../../Api/Interfaces/comment";
import {getAllComments, getAllPosts, getCurrentUserAvatar} from "../../Api/api";
import PageHeader from "../../Components/PageHeader/PageHeader";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import PostCardList from "../../Components/PostCardList/PostCardList";
import CommentCardList from "../../Components/CommentCardList/CommentCardList";
import Pagination from "../../Components/Pagination/Pagination";
import {useTranslation} from "react-i18next";

interface Props {
}

/**
 * Страница профиля пользователя.
 */
const ProfilePage = (props: Props) => {
  const { user, role, token } = useOutletContext<AppContext>();
  const [postPageResponse, setPostPageResponse] = useState<PostPageResponse | null>(null);
  const [commentPageResponse, setCommentPageResponse] = useState<CommentPageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [postPageNumber, setPostPageNumber] = useState<number>(0);
  const [commentPageNumber, setCommentPageNumber] = useState<number>(0);
  const [imageSource, setImageSource] = useState<string>("");
  const { t } = useTranslation();

  useEffect(() => {
    const getAllPostsInit = async () => {
      const response = await getAllPosts(postPageNumber, 10, user?.id);

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
      const response = await getAllComments(commentPageNumber, 10, user?.id);

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
    
    const getCurrentUserAvatarInit = async () => {
      const response = await getCurrentUserAvatar(token);

      if (typeof response !== "string") {
        if (response.status === 200) {
          setImageSource(URL.createObjectURL(response.data));
        } else {
          setError(response.data.message);
        }
      } else {
        setError(response);
      }
    };

    getAllPostsInit();
    getAllCommentsInit();
    getCurrentUserAvatarInit();
  }, [commentPageNumber, postPageNumber, token, user?.id]);
  
  if (user === null)
    return <Navigate replace to="/login" />
  
  return (
    <>
      { user && role && <Profile userResponse={user} roleResponse={role} imageSource={imageSource} /> }
      <PageHeader>{t("my_posts")}</PageHeader>
      { error && <ErrorMessage>{error}</ErrorMessage> }
      { postPageResponse && <PostCardList pageResponse={postPageResponse} currentUser={user} role={role} /> }
      { postPageResponse && <Pagination pageNumber={postPageNumber} totalPages={postPageResponse.totalPages} last={postPageResponse.last} setPageNumber={setPostPageNumber} /> }
      <PageHeader>{t("my_comments")}</PageHeader>
      { commentPageResponse && <CommentCardList pageResponse={commentPageResponse} currentUser={user} role={role} /> }
      { commentPageResponse && <Pagination pageNumber={commentPageNumber} totalPages={commentPageResponse.totalPages} last={commentPageResponse.last} setPageNumber={setCommentPageNumber} /> }
    </>
  );
};

export default ProfilePage;

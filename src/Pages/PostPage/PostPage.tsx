import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {PostResponse} from "../../Api/Interfaces/post";
import {createComment, getAllComments, getCurrentUserAvatar, getPostById, getPostImage} from "../../Api/api";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import Post from "../../Components/Post/Post";
import {CommentPageResponse} from "../../Api/Interfaces/comment";
import CommentCardList from "../../Components/CommentCardList/CommentCardList";
import CommentArea from "../../Components/CommentArea/CommentArea";
import {useOutletContext} from "react-router-dom";
import {AppContext} from "../../App";
import Pagination from "../../Components/Pagination/Pagination";
import {useTranslation} from "react-i18next";

interface Props {
}

/**
 * Страница поста.
 */
const PostPage = (props: Props) => {
  const { token, user, role } = useOutletContext<AppContext>();
  const postId = Number(useParams()["id"]);
  const [postPageResponse, setPostPageResponse] = useState<PostResponse | null>(null);
  const [commentPageResponse, setCommentPageResponse] = useState<CommentPageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [imageSource, setImageSource] = useState<string>("");
  const { t } = useTranslation();
  let commentContent = "";

  useEffect(() => {
    const getPostByIdInit = async () => {
      const response = await getPostById(postId);

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
      const response = await getAllComments(pageNumber, 10, null, postId, true);

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

    const getPostImageInit = async () => {
      const response = await getPostImage(postId);

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

    getPostByIdInit();
    getAllCommentsInit();
    getPostImageInit();
  }, [pageNumber, postId, token]);

  const onCreateCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await createComment({
      postId: postId,
      content: commentContent
    }, token);

    if (typeof response !== "string") {
      if (response.status === 200) {
        window.location.reload();
      } else {
        setError(response.data.message);
      }
    } else {
      setError(response);
    }
  }

  const onCreateCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    commentContent = e.target.value;
  }
  
  return (
    <>
      { error && <ErrorMessage>{error}</ErrorMessage> }
      { postPageResponse && <Post postResponse={postPageResponse} imageSource={imageSource} /> }
      <h3 className="text-3xl font-bold mb-3">{t("comments")}</h3>
      { commentPageResponse && <CommentCardList pageResponse={commentPageResponse} currentUser={user} role={role} /> }
      { commentPageResponse && <Pagination pageNumber={pageNumber} totalPages={commentPageResponse.totalPages} last={commentPageResponse.last} setPageNumber={setPageNumber} /> }
      { user !== null && <CommentArea onChange={onCreateCommentChange} onSubmit={onCreateCommentSubmit} /> }
    </>
  );
};

export default PostPage;

import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {PostResponse} from "../../Api/Interfaces/post";
import {createComment, getAllComments, getCurrentUser, getPostById, getRoleById} from "../../Api/api";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import Post from "../../Components/Post/Post";
import {CommentPageResponse} from "../../Api/Interfaces/comment";
import {UserResponse} from "../../Api/Interfaces/user";
import {RoleResponse} from "../../Api/Interfaces/role";
import {useToken} from "../../App";
import CommentCardList from "../../Components/CommentCardList/CommentCardList";
import CommentArea from "../../Components/CommentArea/CommentArea";

interface Props {
}

const PostPage = (props: Props) => {
  const { token } = useToken();
  const postId = Number(useParams()["id"]);
  const [postResponse, setPostResponse] = useState<PostResponse | null>(null);
  const [pageResponse, setPageResponse] = useState<CommentPageResponse | null>(null);
  const [user, setUser] = useState<UserResponse | null>(null);
  const [role, setRole] = useState<RoleResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  let commentContent = "";

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

    const getAllCommentsInit = async () => {
      const response = await getAllComments(0, 10, null, postId);

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

    getPostByIdInit();
    getAllCommentsInit();
    getUserInit();
  }, [postId, token]);

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
      { postResponse && <Post postResponse={postResponse} /> }
      <h3 className="text-3xl font-bold mb-3">Comments</h3>
      { pageResponse && <CommentCardList pageResponse={pageResponse} currentUser={user} role={role} /> }
      { token !== "" && <CommentArea onChange={onCreateCommentChange} onSubmit={onCreateCommentSubmit} /> }
    </>
  );
};

export default PostPage;

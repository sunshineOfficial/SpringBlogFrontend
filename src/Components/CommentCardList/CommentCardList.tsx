import React from "react";
import {UserResponse} from "../../Api/Interfaces/user";
import {RoleResponse} from "../../Api/Interfaces/role";
import {CommentPageResponse} from "../../Api/Interfaces/comment";
import {v4 as uuidv4} from "uuid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import CommentCard from "../CommentCard/CommentCard";

interface Props {
  pageResponse: CommentPageResponse;
  currentUser: UserResponse | null;
  role: RoleResponse | null;
}

/**
 * Список комментариев.
 * 
 * @param pageResponse объект, содержащий информацию о комментариях
 * @param currentUser  пользователь, находящийся в данный момент в системе
 * @param role         роль пользователя
 */
const CommentCardList = ({ pageResponse, currentUser, role }: Props) => {
  return (
    <div>
      {pageResponse.content.length > 0 ? (
        pageResponse.content.map((comment) => {
          return <CommentCard id={`comment${comment.id}`} key={uuidv4()} commentResponse={comment} currentUser={currentUser} role={role} />
        })
      ) : (
        <ErrorMessage>No comments!</ErrorMessage>
      )}
    </div>
  );
};

export default CommentCardList;

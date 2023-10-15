import React from "react";
import {PostPageResponse} from "../../Api/Interfaces/post";
import PostCard from "../PostCard/PostCard";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {v4 as uuidv4} from "uuid";
import {UserResponse} from "../../Api/Interfaces/user";
import {RoleResponse} from "../../Api/Interfaces/role";
import {useTranslation} from "react-i18next";

interface Props {
  pageResponse: PostPageResponse;
  currentUser: UserResponse | null;
  role: RoleResponse | null;
}

/**
 * Список постов.
 *
 * @param pageResponse объект, содержащий информацию о постах
 * @param currentUser  пользователь, находящийся в данный момент в системе
 * @param role         роль пользователя
 */
const PostCardList = ({ pageResponse, currentUser, role }: Props) => {
  const { t } = useTranslation();
  
  return (
    <div className="grid gap-6 grid-cols-3">
      {pageResponse.content.length > 0 ? (
        pageResponse.content.map((post) => {
          return <PostCard id={`post${post.id}`} key={uuidv4()} postResponse={post} currentUser={currentUser} role={role} />
        })
      ) : (
        <ErrorMessage>{t("no_posts")}</ErrorMessage>
      )}
    </div>
  );
};

export default PostCardList;

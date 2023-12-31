import React, {useEffect, useState} from "react";
import {PostResponse} from "../../Api/Interfaces/post";
import {Link, useOutletContext} from "react-router-dom";
import {deletePost, getUserById, publishPost} from "../../Api/api";
import {UserResponse} from "../../Api/Interfaces/user";
import {RoleResponse} from "../../Api/Interfaces/role";
import {AppContext} from "../../App";
import {useTranslation} from "react-i18next";

interface Props {
  id: string;
  postResponse: PostResponse;
  currentUser: UserResponse | null;
  role: RoleResponse | null;
}

/**
 * Карточка поста.
 *
 * @param id           идентификатор поста
 * @param postResponse объект, содержащий информацию о посте
 * @param currentUser  пользователь, находящийся в данный момент в системе
 * @param role         роль пользователя
 */
const PostCard = ({ id, postResponse, currentUser, role }: Props) => {
  const { token } = useOutletContext<AppContext>();
  const [user, setUser] = useState<UserResponse | null>(null);
  const { t } = useTranslation();
  
  let publishedText;
  if (postResponse.published) publishedText = t("published_at") + new Date(postResponse.publishedAt).toLocaleString();
  else publishedText = t("not_published");

  useEffect(() => {
    const getUserInit = async () => {
      const response = await getUserById(postResponse.userId);

      if (typeof response !== "string" && response.status === 200) {
        setUser(response.data);
      }
    };

    getUserInit();
  }, [postResponse.userId]);

  const onDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await deletePost(postResponse.id, token);
    window.location.reload();
  };

  const onPublishClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await publishPost(postResponse.id, token);
    window.location.reload();
  };
  
  return (
    <div id={id} key={id} className="max-w-sm mb-3 p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{postResponse.title}</h5>
      <p className="mb-3 font-normal text-gray-700">{t("author") + user?.username}<br/>{publishedText}</p>
      <Link to={`/post/${postResponse.id}`} className="mr-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
        {t("read")}
      </Link>
      { currentUser !== null && (currentUser?.id === user?.id || role?.name !== "USER") && 
          <>
              <Link to={`/post/update/${postResponse.id}`} className="mr-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                {t("update")}
              </Link>
              <button type="submit" onClick={onDeleteClick} className="mr-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                {t("delete")}
              </button>
          </>
      }
      { currentUser !== null && role?.name !== "USER" && !postResponse.published &&
          <>
              <button type="submit" onClick={onPublishClick} className="mr-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                {t("publish")}
              </button>
          </>
      }
    </div>
  );
};

export default PostCard;

import React, {useEffect, useState} from "react";
import {PostResponse} from "../../Api/Interfaces/post";
import {UserResponse} from "../../Api/Interfaces/user";
import {getUserById} from "../../Api/api";
import {useTranslation} from "react-i18next";

interface Props {
  postResponse: PostResponse;
}

/**
 * Блок поста.
 * 
 * @param postResponse объект, содержащий информацию о посте
 */
const Post = ({ postResponse }: Props) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const { t } = useTranslation();

  const createdAt = new Date(postResponse.createdAt);
  const updatedAt = new Date(postResponse.updatedAt);
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
  
  return (
    <>
      <h2 className="text-4xl font-extrabold">{postResponse.title} <small className="ml-2 font-semibold text-gray-500">{user?.username}</small></h2>
      <p className="text-gray-500">{t("author") + user?.firstName} {user?.lastName}</p>
      <p className="mb-3 text-gray-500">{t("created_at") + createdAt.toLocaleString()} {t("updated_at") + updatedAt.toLocaleString()} {publishedText}</p>
      <p className="mb-6 text-lg text-gray-500 md:text-xl">{postResponse.content}</p>
    </>
  );
};

export default Post;

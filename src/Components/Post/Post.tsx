import React, {useEffect, useState} from "react";
import {PostResponse} from "../../Api/Interfaces/post";
import {UserResponse} from "../../Api/Interfaces/user";
import {getUserById} from "../../Api/api";
import {useTranslation} from "react-i18next";
import PostImage from "../PostImage/PostImage";
import Button from "../Button/Button";
import {Link, useOutletContext} from "react-router-dom";
import {AppContext} from "../../App";

interface Props {
  postResponse: PostResponse;
  imageSource: string;
}

/**
 * Блок поста.
 *
 * @param postResponse объект, содержащий информацию о посте
 * @param imageSource  источник изображения
 */
const Post = ({ postResponse, imageSource }: Props) => {
  const {user } = useOutletContext<AppContext>();
  const [creator, setCreator] = useState<UserResponse | null>(null);
  const { t } = useTranslation();

  const createdAt = new Date(postResponse.createdAt);
  const updatedAt = new Date(postResponse.updatedAt);
  let publishedText;
  if (postResponse.published) publishedText = t("published_at") + new Date(postResponse.publishedAt).toLocaleString();
  else publishedText = t("not_published");

  useEffect(() => {
    const getCreatorInit = async () => {
      const response = await getUserById(postResponse.userId);

      if (typeof response !== "string" && response.status === 200) {
        setCreator(response.data);
      }
    };

    getCreatorInit();
  }, [postResponse.userId]);
  
  return (
    <>
      <h2 className="text-4xl font-extrabold">{postResponse.title} <small className="ml-2 font-semibold text-gray-500">{creator?.username}</small></h2>
      <p className="text-gray-500">{t("author") + creator?.firstName} {creator?.lastName}</p>
      <p className="mb-3 text-gray-500">{t("created_at") + createdAt.toLocaleString()} {t("updated_at") + updatedAt.toLocaleString()} {publishedText}</p>
      <PostImage source={imageSource} />
      { user?.id === postResponse.userId && <Link to={`/post/${postResponse.id}/image`} ><Button>{t("change_image")}</Button></Link> }
      <p className="mb-6 text-lg text-gray-500 md:text-xl">{postResponse.content}</p>
    </>
  );
};

export default Post;

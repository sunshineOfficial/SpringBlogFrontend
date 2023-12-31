import React, {useEffect, useState} from "react";
import {UpdatePostRequest} from "../../Api/Interfaces/post";
import {useNavigate, useOutletContext} from "react-router-dom";
import {getPostById, updatePost} from "../../Api/api";
import PageHeader from "../../Components/PageHeader/PageHeader";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import PostForm from "../../Components/PostForm/PostForm";
import {useParams} from "react-router";
import {AppContext} from "../../App";
import {useTranslation} from "react-i18next";

interface Props {
}

/**
 * Страница редактирования поста.
 */
const UpdatePostPage = (props: Props) => {
  const { token } = useOutletContext<AppContext>();
  const postId = Number(useParams()["id"]);
  const [formData, setFormData] = useState<UpdatePostRequest>({
    content: "", title: ""
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const getPostByIdInit = async () => {
      const response = await getPostById(postId);

      if (typeof response !== "string") {
        if (response.status === 200) {
          setFormData({ content: response.data.content, title: response.data.title });
        } else {
          setError(response.data.message);
        }
      } else {
        setError(response);
      }
    };

    getPostByIdInit();
  }, [postId]);

  const onUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await updatePost(postId, formData, token);

    if (typeof response !== "string") {
      if (response.status === 200) {
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } else {
      setError(response);
    }
  }

  const onUpdateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({...formData, [id]: value});
  }

  return (
    <>
      <PageHeader>{t("update_post")}</PageHeader>
      { error && <ErrorMessage>{error}</ErrorMessage> }
      <PostForm onSubmit={onUpdateSubmit} onChange={onUpdateChange} buttonName={t("update")} initTitle={formData.title} initContent={formData.content} hasUpload={false} />
    </>
  );
};

export default UpdatePostPage;

import React, {useState} from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";
import PostForm from "../../Components/PostForm/PostForm";
import {CreatePostRequest} from "../../Api/Interfaces/post";
import {useNavigate, useOutletContext} from "react-router-dom";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import {createPost} from "../../Api/api";
import {AppContext} from "../../App";
import {useTranslation} from "react-i18next";

interface Props {
}

/**
 * Страница создания поста.
 */
const CreatePostPage = (props: Props) => {
  const { token } = useOutletContext<AppContext>();
  const [formData, setFormData] = useState<CreatePostRequest>({
    content: "", title: "", image: null
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.image !== null) {
      const response = await createPost(formData, token);

      if (typeof response !== "string") {
        if (response.status === 200) {
          navigate("/");
        } else {
          setError(response.data.message);
        }
      } else {
        setError(response);
      }
    } else {
      setError(t("no_image"));
    }
  }

  const onCreateChange = (e: React.ChangeEvent<any>) => {
    const { id, value } = e.target;
    
    if (id === "image" && e.target.files) setFormData({...formData, image: e.target.files[0]});
    else setFormData({...formData, [id]: value});
  }
  
  return (
    <>
      <PageHeader>{t("create_post")}</PageHeader>
      { error && <ErrorMessage>{error}</ErrorMessage> }
      <PostForm onSubmit={onCreateSubmit} onChange={onCreateChange} buttonName={t("create")} />
    </>
  );
};

export default CreatePostPage;

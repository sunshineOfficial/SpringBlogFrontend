import React, {useState} from "react";
import {Navigate, useNavigate, useOutletContext} from "react-router-dom";
import {AppContext} from "../../App";
import {useTranslation} from "react-i18next";
import {changePostImage} from "../../Api/api";
import PageHeader from "../../Components/PageHeader/PageHeader";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import Button from "../../Components/Button/Button";
import {useParams} from "react-router";

interface Props {
}

const ChangePostImagePage = (props: Props) => {
  const { user, token } = useOutletContext<AppContext>();
  const postId = Number(useParams()["id"]);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (user === null)
    return <Navigate replace to="/login" />

  const onChangePostImageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (image !== null) {
      const response = await changePostImage(postId, image, token);

      if (typeof response !== "string") {
        if (response.status === 200) {
          navigate(`/post/${postId}`);
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

  const onChangePostImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "image" && e.target.files) setImage(e.target.files[0]);
  }

  return (
    <>
      <PageHeader>{t("change_image")}</PageHeader>
      { error && <ErrorMessage>{error}</ErrorMessage> }
      <form onSubmit={onChangePostImageSubmit}>
        <div className="mb-6">
          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">{t("upload_image")}</label>
          <input onChange={onChangePostImageChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5" id="image" type="file" />
        </div>
        <Button>{t("change_image")}</Button>
      </form>
    </>
  );
};

export default ChangePostImagePage;

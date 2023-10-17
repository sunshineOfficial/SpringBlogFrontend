import React, {useState} from "react";
import {Navigate, useNavigate, useOutletContext} from "react-router-dom";
import {AppContext} from "../../App";
import PageHeader from "../../Components/PageHeader/PageHeader";
import {useTranslation} from "react-i18next";
import Button from "../../Components/Button/Button";
import {changeAvatar, register} from "../../Api/api";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

interface Props {
}

const ChangeAvatarPage = (props: Props) => {
  const { user, token } = useOutletContext<AppContext>();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (user === null)
    return <Navigate replace to="/login" />

  const onChangeAvatarSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (avatar !== null) {
      const response = await changeAvatar(avatar, token);

      if (typeof response !== "string") {
        if (response.status === 200) {
          navigate("/profile");
        } else {
          setError(response.data.message);
        }
      } else {
        setError(response);
      }
    } else {
      setError(t("no_avatar"));
    }
  }

  const onChangeAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "avatar" && e.target.files) setAvatar(e.target.files[0]);
  }
  
  return (
    <>
      <PageHeader>{t("change_avatar")}</PageHeader>
      { error && <ErrorMessage>{error}</ErrorMessage> }
      <form onSubmit={onChangeAvatarSubmit}>
        <div className="mb-6">
          <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-gray-900">{t("upload_avatar")}</label>
          <input onChange={onChangeAvatarChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5" id="avatar" type="file" />
        </div>
        <Button>{t("change_avatar")}</Button>
      </form>
    </>
  );
};

export default ChangeAvatarPage;

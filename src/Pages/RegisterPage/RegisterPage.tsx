import React, {useState} from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";
import {RegisterRequest} from "../../Api/Interfaces/auth";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import RegisterForm from "../../Components/RegisterForm/RegisterForm";
import {register} from "../../Api/api";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface Props {
}

/**
 * Страница регистрации.
 */
const RegisterPage = (props: Props) => {
  const [formData, setFormData] = useState<RegisterRequest>({
    firstName: "", lastName: "", password: "", username: "", avatar: null
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.avatar !== null) {
      const response = await register(formData);

      if (typeof response !== "string") {
        if (response.status === 200) {
          navigate("/login");
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

  const onRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    if (id === "avatar" && e.target.files) setFormData({...formData, avatar: e.target.files[0]});
    else setFormData({...formData, [id]: value});
  }
  
  return (
    <>
      <PageHeader>{t("register")}</PageHeader>
      { error && <ErrorMessage>{error}</ErrorMessage> }
      <RegisterForm onSubmit={onRegisterSubmit} onChange={onRegisterChange} />
    </>
  );
};

export default RegisterPage;

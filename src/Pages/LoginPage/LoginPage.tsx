import React, {useEffect, useState} from "react";
import LoginForm from "../../Components/LoginForm/LoginForm";
import PageHeader from "../../Components/PageHeader/PageHeader";
import {login} from "../../Api/api";
import {LoginRequest} from "../../Api/Interfaces/auth";
import {useNavigate, useOutletContext} from "react-router-dom";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import {AppContext} from "../../App";

interface Props {
}

const LoginPage = (props: Props) => {
  const { setToken, user } = useOutletContext<AppContext>();
  const [formData, setFormData] = useState<LoginRequest>({
    username: "",
    password: ""
  });
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  
  const onLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const response = await login(formData);
    
    if (typeof response !== "string") {
      if (response.status === 200) {
        setToken(response.data.accessToken);
        window.localStorage.setItem("token", response.data.accessToken);
      } else {
        setError(response.data.message);
      }
    } else {
      setError(response);
    }
  }

  const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({...formData, [id]: value});
  }

  useEffect(() => {
    if (user !== null) navigate("/profile");
  }, [user]);
  
  return (
    <>
      <PageHeader>Login</PageHeader>
      { error && <ErrorMessage>{error}</ErrorMessage> }
      <LoginForm onSubmit={onLoginSubmit} onChange={onLoginChange} />
    </>
  );
};

export default LoginPage;

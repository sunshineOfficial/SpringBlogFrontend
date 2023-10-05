import React, {useState} from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";
import {RegisterRequest} from "../../Api/Interfaces/auth";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import RegisterForm from "../../Components/RegisterForm/RegisterForm";
import {register} from "../../Api/api";
import {Navigate, useNavigate} from "react-router-dom";

interface Props {
}

const RegisterPage = (props: Props) => {
  const [formData, setFormData] = useState<RegisterRequest>({
    firstName: "", lastName: "", password: "", username: ""
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const onRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const response = await register(formData);
    console.log(response);

    if (typeof response !== "string") {
      if (response.status === 200) {
        navigate("/login");
      } else {
        setError(response.data.message);
      }
    } else {
      setError(response);
    }
  }

  const onRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({...formData, [id]: value});
  }
  
  return (
    <>
      <PageHeader>RegisterPage</PageHeader>
      { error && <ErrorMessage>{error}</ErrorMessage> }
      <RegisterForm onSubmit={onRegisterSubmit} onChange={onRegisterChange} />
    </>
  );
};

export default RegisterPage;

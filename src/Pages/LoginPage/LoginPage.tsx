import React from "react";
import LoginForm from "../../Components/LoginForm/LoginForm";
import PageHeader from "../../Components/PageHeader/PageHeader";

interface Props {
}

const LoginPage = (props: Props) => {
  return (
    <>
      <PageHeader>Login</PageHeader>
      <LoginForm />
    </>
  );
};

export default LoginPage;

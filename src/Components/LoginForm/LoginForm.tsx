import React from "react";
import Button from "../Button/Button";
import {useTranslation} from "react-i18next";

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Форма аутентификации пользователя.
 * 
 * @param onSubmit событие, вызываемое при нажатии кнопки входа
 * @param onChange событие, вызываемое при изменении содержимого формы
 */
const LoginForm = ({ onSubmit, onChange }: Props) => {
  const { t } = useTranslation();
  
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">{t("username")}</label>
        <input onChange={onChange} type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder={t("username")} required />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">{t("password")}</label>
        <input onChange={onChange} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder="•••••••••" required />
      </div>
      <Button>{t("login")}</Button>
    </form>
  );
};

export default LoginForm;

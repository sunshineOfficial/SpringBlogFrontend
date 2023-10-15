import React from "react";
import Button from "../Button/Button";
import {useTranslation} from "react-i18next";

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  buttonName: string;
  initTitle?: string;
  initContent?: string;
}

/**
 * Форма для создания и редактирования поста.
 * 
 * @param onSubmit    событие, вызываемое при нажатии кнопки отправки
 * @param onChange    событие, вызываемое при изменении содержимого формы
 * @param buttonName  надпись на кнопке
 * @param initTitle   начальное значение заголовка поста
 * @param initContent начальное значение содержимого поста
 */
const PostForm = ({ onSubmit, onChange, buttonName, initTitle, initContent }: Props) => {
  const { t } = useTranslation();
  
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">{t("title")}</label>
        <input onChange={onChange} value={initTitle} type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder={t("title_placeholder")} required />
      </div>
      <div className="mb-6">
        <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">{t("content")}</label>
        <textarea onChange={onChange} value={initContent} id="content" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500" placeholder={t("content_placeholder")} required />
      </div>
      <Button>{buttonName}</Button>
    </form>
  );
};

export default PostForm;

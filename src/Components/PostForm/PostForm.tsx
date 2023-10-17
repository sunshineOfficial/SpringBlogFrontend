import React from "react";
import Button from "../Button/Button";
import {useTranslation} from "react-i18next";

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  buttonName: string;
  initTitle?: string;
  initContent?: string;
  hasUpload?: boolean;
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
const PostForm = ({ onSubmit, onChange, buttonName, initTitle, initContent, hasUpload = true }: Props) => {
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
      { hasUpload &&
          <div className="mb-6">
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">{t("upload_image")}</label>
              <input onChange={onChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5" id="image" type="file" />
          </div>
      }
      <Button>{buttonName}</Button>
    </form>
  );
};

export default PostForm;

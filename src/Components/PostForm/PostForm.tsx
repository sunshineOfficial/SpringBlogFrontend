import React from "react";
import Button from "../Button/Button";

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  buttonName: string;
  initTitle?: string;
  initContent?: string;
}

const PostForm = ({ onSubmit, onChange, buttonName, initTitle, initContent }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
        <input onChange={onChange} value={initTitle} type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder="New post" required />
      </div>
      <div className="mb-6">
        <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">Content</label>
        <textarea onChange={onChange} value={initContent} id="content" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500" placeholder="Write your thoughts here..." required />
      </div>
      <Button>{buttonName}</Button>
    </form>
  );
};

export default PostForm;

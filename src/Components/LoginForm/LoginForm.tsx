import React from "react";
import Button from "../Button/Button";

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm = ({ onSubmit, onChange }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input onChange={onChange} type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder="Username" required />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
        <input onChange={onChange} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder="•••••••••" required />
      </div>
      <Button>Submit</Button>
    </form>
  );
};

export default LoginForm;

import React from "react";
import Button from "../Button/Button";

interface Props {
}

const LoginForm = (props: Props) => {
  return (
    <form>
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder="john.doe@company.com" required />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder="•••••••••" required />
      </div>
      <Button>Submit</Button>
    </form>
  );
};

export default LoginForm;

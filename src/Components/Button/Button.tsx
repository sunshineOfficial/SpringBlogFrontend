import React from "react";

interface Props {
  children: any;
}

const Button = ({ children }: Props) => {
  return (
    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">{children}</button>
  );
};

export default Button;

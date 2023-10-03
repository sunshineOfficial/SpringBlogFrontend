import React from "react";

interface Props {
  children: any;
}

const ErrorMessage = ({ children }: Props) => {
  return (
    <div className="text-base text-red-600 mb-3">{children}</div>
  );
};

export default ErrorMessage;

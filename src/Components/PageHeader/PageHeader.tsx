import React from "react";

interface Props {
  children: any;
}

const PageHeader = ({ children }: Props) => {
  return (
    <h1 className="font-bold text-3xl mb-5">{children}</h1>
  );
};

export default PageHeader;

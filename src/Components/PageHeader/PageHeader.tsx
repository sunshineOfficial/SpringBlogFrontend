import React from "react";

interface Props {
  children: any;
}

/**
 * Заголовок страницы.
 * 
 * @param children объект, который должен быть внутри заголовка
 */
const PageHeader = ({ children }: Props) => {
  return (
    <h1 className="font-bold text-3xl mb-5">{children}</h1>
  );
};

export default PageHeader;

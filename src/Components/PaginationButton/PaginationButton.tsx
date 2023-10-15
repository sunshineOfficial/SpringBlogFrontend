import React from "react";

interface Props {
  number: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  isCurrent?: boolean;
}

/**
 * Кнопка для пагинации.
 * 
 * @param number        номер на кнопке
 * @param setPageNumber функция для смены номера текущей страницы
 * @param isCurrent     флаг, указывающий, является ли номер текущей страницей
 */
const PaginationButton = ({ number, setPageNumber, isCurrent = false }: Props) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPageNumber(number - 1);
  };
  
  if (isCurrent)
    return (
      <li>
        <button type="button" aria-current="page" onClick={onClick} className="flex items-center justify-center px-4 h-10 text-green-600 border border-gray-300 bg-green-50 hover:bg-green-100 hover:text-green-700">{number}</button>
      </li>
    );
  else 
    return (
      <li>
        <button type="button" onClick={onClick} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">{number}</button>
      </li>
    );
};

export default PaginationButton;

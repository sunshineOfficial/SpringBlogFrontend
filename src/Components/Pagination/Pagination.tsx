import React from "react";
import PaginationButton from "../PaginationButton/PaginationButton";
import {v4 as uuidv4} from "uuid";
import {useTranslation} from "react-i18next";

interface Props {
  pageNumber: number;
  totalPages: number;
  last: boolean;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Пагинация.
 * 
 * @param pageNumber    номер текущей страницы
 * @param totalPages    общее количество страниц
 * @param last          флаг, указывающий, является ли текущая страница последней
 * @param setPageNumber функция для смены номера текущей страницы
 */
const Pagination = ({ pageNumber, totalPages, last, setPageNumber }: Props) => {
  const { t } = useTranslation();
  
  const onPreviousClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPageNumber(pageNumber - 1);
  };

  const onNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPageNumber(pageNumber + 1);
  };
  
  let numbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    numbers[i - 1] = i;
  }
  
  return (
    <nav aria-label="Page navigation" className="my-4">
      <ul className="inline-flex -space-x-px text-base h-10">
        { pageNumber !== 0 &&
            <li>
                <button type="button" onClick={onPreviousClick} key={uuidv4()} className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">{t("previous")}</button>
            </li>
        }
        { numbers.map((n) => {
          return <PaginationButton key={uuidv4()} number={n} setPageNumber={setPageNumber} isCurrent={pageNumber + 1 === n} />
        })}
        { !last &&
            <li>
                <button type="button" onClick={onNextClick} key={uuidv4()} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">{t("next")}</button>
            </li>
        }
      </ul>
    </nav>
  );
};

export default Pagination;

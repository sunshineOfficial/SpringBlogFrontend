import React from "react";

interface Props {
  children: any,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

/**
 * Кнопка.
 * 
 * @param children объект, который должен быть внутри кнопки
 * @param onClick  событие, вызываемое при нажатии кнопки
 */
const Button = ({ children, onClick = undefined }: Props) => {
  return (
    <button type="submit" onClick={onClick} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-6">{children}</button>
  );
};

export default Button;

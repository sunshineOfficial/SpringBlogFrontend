import React from "react";
import {Link} from "react-router-dom";

interface Props {
  children: any;
  path: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

/**
 * Ссылка в навигационной панели.
 * 
 * @param children объект, который должен быть внутри ссылки
 * @param path     путь для ссылки
 * @param onClick  событие, вызываемое при нажатии на ссылку
 */
const NavbarLink = ({ children, path, onClick = undefined }: Props) => {
  return (
    <Link to={path} onClick={onClick} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0">{children}</Link>
  );
};

export default NavbarLink;

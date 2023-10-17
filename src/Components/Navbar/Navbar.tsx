import React from "react";
import {Link} from "react-router-dom";
import NavbarLink from "../NavbarLink/NavbarLink";
import {UserResponse} from "../../Api/Interfaces/user";
import {RoleResponse} from "../../Api/Interfaces/role";
import {useTranslation} from "react-i18next";

interface Props {
  user: UserResponse | null;
  role: RoleResponse | null;
  onLogoutClick: React.MouseEventHandler;
  onSwitchLanguageClick: React.MouseEventHandler;
}

/**
 * Навигационная панель.
 *
 * @param user                  пользователь, находящийся в данный момент в системе
 * @param role                  роль пользователя
 * @param onLogoutClick         событие, вызываемое при нажатии кнопки выхода из системы
 * @param onSwitchLanguageClick событие, вызываемое при нажатии кнопки смены языка
 */
const Navbar = ({ user, role, onLogoutClick, onSwitchLanguageClick }: Props) => {
  const { t } = useTranslation();
  
  return (
    <nav className="bg-green-200 border-gray-200 mb-3">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">SpringBlog</span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-green-200">
            <button type="button" onClick={onSwitchLanguageClick} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0">{t("switch_language")}</button>
            { user !== null ? (
              <>
                { role?.name !== "USER" &&
                    <li>
                        <NavbarLink path="/moderator">{t("moderator")}</NavbarLink>
                    </li>
                }
                { role?.name === "ADMIN" &&
                    <li>
                        <NavbarLink path="/admin">{t("admin")}</NavbarLink>
                    </li>
                }
                <li>
                  <NavbarLink path="/profile">{t("profile")}</NavbarLink>
                </li>
                <li>
                  <NavbarLink path="/" onClick={onLogoutClick}>{t("logout")}</NavbarLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavbarLink path="/login">{t("login")}</NavbarLink>
                </li>
                <li>
                  <NavbarLink path="/register">{t("register")}</NavbarLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;

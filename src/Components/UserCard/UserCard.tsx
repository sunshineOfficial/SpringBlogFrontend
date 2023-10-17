import React, {useEffect, useState} from "react";
import {UserResponse} from "../../Api/Interfaces/user";
import {useTranslation} from "react-i18next";
import {changeRole, deleteUser, getRoleById, getUserAvatar} from "../../Api/api";
import {useOutletContext} from "react-router-dom";
import {AppContext} from "../../App";
import {RoleResponse} from "../../Api/Interfaces/role";

interface Props {
  id: string;
  user: UserResponse;
}

/**
 * Карточка пользователя.
 * 
 * @param id   идентификатор карточки пользователя
 * @param user пользователь
 */
const UserCard = ({ id, user }: Props) => {
  const { token } = useOutletContext<AppContext>();
  const [role, setRole] = useState<RoleResponse | null>(null);
  const [avatarSource, setAvatarSource] = useState<string>("");
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  
  const isUser = role?.name === "USER";
  const isModerator = role?.name === "MODERATOR";
  const isAdmin = role?.name === "ADMIN";

  useEffect(() => {
    const getUserRoleInit = async () => {
      const response = await getRoleById(user.roleId);

      if (typeof response !== "string" && response.status === 200) {
        setRole(response.data);
      }
    };
    
    const getUserAvatarInit = async () => {
      const response = await getUserAvatar(user.id);

      if (typeof response !== "string" && response.status === 200) {
        setAvatarSource(URL.createObjectURL(response.data));
      }
    };
    
    getUserRoleInit();
    getUserAvatarInit();
  }, [user.id]);

  const onChangeRoleClick = async (e: React.MouseEvent<HTMLButtonElement>, roleId: number) => {
    await changeRole(user.id, roleId, token);
    window.location.reload();
  };
  
  const onDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await deleteUser(user.id, token);
    window.location.reload();
  };
  
  const onDropdownClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDropdownIsOpen(!dropdownIsOpen);
  }
  
  return (
    <div id={id} key={id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow mb-4">
      <div className="flex justify-end px-4 pt-4">
        <button id="dropdownButton" onClick={onDropdownClick} data-dropdown-toggle="dropdown" className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5" type="button">
          <span className="sr-only">Open dropdown</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
          </svg>
        </button>
        <div id="dropdown" className={`${dropdownIsOpen ? "" : "hidden "}z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
              <button type="button" onClick={(e) => onChangeRoleClick(e, 1)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" disabled={isUser}>{t("make_user")}</button>
            </li>
            <li>
              <button type="button" onClick={(e) => onChangeRoleClick(e, 2)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" disabled={isModerator}>{t("make_moderator")}</button>
            </li>
            <li>
              <button type="button" onClick={(e) => onChangeRoleClick(e, 3)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" disabled={isAdmin}>{t("make_admin")}</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={avatarSource} alt="Avatar"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900">{`${user.firstName} ${user.lastName}`}</h5>
        <span className="text-sm text-gray-500">{role?.name}</span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <button onClick={onDeleteClick} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

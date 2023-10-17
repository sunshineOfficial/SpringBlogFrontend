import React from "react";
import {UserResponse} from "../../Api/Interfaces/user";
import {RoleResponse} from "../../Api/Interfaces/role";
import {useTranslation} from "react-i18next";
import Avatar from "../Avatar/Avatar";

interface Props {
  userResponse: UserResponse;
  roleResponse: RoleResponse;
  imageSource: string;
}

/**
 * Блок профиля.
 *
 * @param userResponse пользователь
 * @param roleResponse роль пользователя
 * @param imageSource  источник изображения
 */
const Profile = ({ userResponse, roleResponse, imageSource }: Props) => {
  const { t } = useTranslation();
  
  return (
    <div className="mb-6">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">{t("hello")}, <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{userResponse.username}</span>!</h1>
      <Avatar source={imageSource} />
      <p className="text-gray-500 text-xl">{t("profile_name")}: <span className="font-semibold text-gray-900 underline decoration-green-500">{userResponse.firstName} {userResponse.lastName}</span></p>
      <p className="text-gray-500 text-xl">{t("role")}: <span className="font-semibold text-gray-900 underline decoration-green-500">{roleResponse.name}</span></p>
    </div>
  );
};

export default Profile;

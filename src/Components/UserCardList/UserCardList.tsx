import React from "react";
import {UserPageResponse} from "../../Api/Interfaces/user";
import UserCard from "../UserCard/UserCard";
import {v4 as uuidv4} from "uuid";

interface Props {
  userPage: UserPageResponse;
}

/**
 * Список пользователей.
 * 
 * @param userPage объект, содержащий информацию о пользователях
 */
const UserCardList = ({ userPage }: Props) => {
  return (
    <div>
      {userPage.content.map((user) => {
        return <UserCard id={`user${user.id}`} key={uuidv4()} user={user} />
      })}
    </div>
  );
};

export default UserCardList;

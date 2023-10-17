import React, {useEffect, useState} from "react";
import {Navigate, useOutletContext} from "react-router-dom";
import {AppContext} from "../../App";
import PageHeader from "../../Components/PageHeader/PageHeader";
import {useTranslation} from "react-i18next";
import {getAllUsers} from "../../Api/api";
import {UserPageResponse} from "../../Api/Interfaces/user";
import UserCardList from "../../Components/UserCardList/UserCardList";
import Pagination from "../../Components/Pagination/Pagination";

interface Props {
}

/**
 * Страница администратора.
 */
const AdminPage = (props: Props) => {
  const { role} = useOutletContext<AppContext>();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [userPage, setUserPage] = useState<UserPageResponse | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const getAllUsersInit = async () => {
      const response = await getAllUsers(pageNumber, 10);

      if (typeof response !== "string" && response.status === 200) {
        setUserPage(response.data);
      }
    };
    
    getAllUsersInit();
  }, [pageNumber]);

  if (role === null || role.name !== "ADMIN")
    return <Navigate replace to="/" />
  
  return (
    <>
      <PageHeader>{t("admin")}</PageHeader>
      { userPage && <UserCardList userPage={userPage} /> }
      { userPage && <Pagination pageNumber={pageNumber} totalPages={userPage.totalPages} last={userPage.last} setPageNumber={setPageNumber} /> }
    </>
  );
};

export default AdminPage;

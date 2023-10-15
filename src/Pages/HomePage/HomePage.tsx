import React, {useEffect, useState} from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";
import {getAllPosts} from "../../Api/api";
import PostCardList from "../../Components/PostCardList/PostCardList";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import {PostPageResponse} from "../../Api/Interfaces/post";
import Button from "../../Components/Button/Button";
import {Link, useOutletContext} from "react-router-dom";
import {AppContext} from "../../App";
import Pagination from "../../Components/Pagination/Pagination";
import {useTranslation} from "react-i18next";

interface Props {
}

/**
 * Главная страница.
 */
const HomePage = (props: Props) => {
  const { user, role } = useOutletContext<AppContext>();
  const [pageResponse, setPageResponse] = useState<PostPageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const { t } = useTranslation();

  useEffect(() => {
    const getAllPostsInit = async () => {
      const response = await getAllPosts(pageNumber, 9, null, true);

      if (typeof response !== "string") {
        if (response.status === 200) {
          setPageResponse(response.data);
        } else {
          setError(response.data.message);
        }
      } else {
        setError(response);
      }
    };
    
    getAllPostsInit();
  }, [pageNumber]);
  
  return (
    <>
      <PageHeader>{t("home")}</PageHeader>
      { user !== null && <Link to="/post/create" ><Button>{t("create_post")}</Button></Link> }
      { error && <ErrorMessage>{error}</ErrorMessage> }
      { pageResponse && <PostCardList pageResponse={pageResponse} currentUser={user} role={role} /> }
      { pageResponse && <Pagination pageNumber={pageNumber} totalPages={pageResponse.totalPages} last={pageResponse.last} setPageNumber={setPageNumber} /> }
    </>
  );
};

export default HomePage;

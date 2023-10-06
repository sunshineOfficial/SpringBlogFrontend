import React from "react";
import {PageResponse} from "../../Api/Interfaces/post";
import PostCard from "../PostCard/PostCard";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {v4 as uuidv4} from "uuid";

interface Props {
  pageResponse: PageResponse;
}

const PostCardList = ({ pageResponse }: Props) => {
  return (
    <div className="grid gap-6 grid-cols-3">
      {pageResponse.pageSize > 0 ? (
        pageResponse.content.map((post) => {
          return <PostCard id={`post${post.id}`} key={uuidv4()} postResponse={post} />
        })
      ) : (
        <ErrorMessage>No results!</ErrorMessage>
      )}
    </div>
  );
};

export default PostCardList;

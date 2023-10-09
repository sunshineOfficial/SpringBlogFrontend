import React from "react";
import {PostPageResponse} from "../../Api/Interfaces/post";
import PostCard from "../PostCard/PostCard";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {v4 as uuidv4} from "uuid";
import {UserResponse} from "../../Api/Interfaces/user";
import {RoleResponse} from "../../Api/Interfaces/role";

interface Props {
  pageResponse: PostPageResponse;
  currentUser: UserResponse | null;
  role: RoleResponse | null;
}

const PostCardList = ({ pageResponse, currentUser, role }: Props) => {
  return (
    <div className="grid gap-6 grid-cols-3">
      {pageResponse.content.length > 0 ? (
        pageResponse.content.map((post) => {
          return <PostCard id={`post${post.id}`} key={uuidv4()} postResponse={post} currentUser={currentUser} role={role} />
        })
      ) : (
        <ErrorMessage>No results!</ErrorMessage>
      )}
    </div>
  );
};

export default PostCardList;
